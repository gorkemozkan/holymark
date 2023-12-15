import type { EventHandlerRequest, H3Event } from "h3";
import { type PostInput } from "~/lib/validations/markdowns";
import { serverSupabaseClient, serverSupabaseUser } from "~/server/lib/supabase";
import { Cache } from "~/server/utils/cache";
import { type Database } from "~/types/supabase";
import { escapeHtml } from "~/utils/strings";

async function eventHandler(event: H3Event<EventHandlerRequest>) {
	const query = getQuery<PostInput>(event);

	const user = await serverSupabaseUser(event);

	const supabase = await serverSupabaseClient<Database>(event);

	const response = await supabase
		.from("markdowns")
		.insert([{ title: escapeHtml(query.title), user_id: user?.id as string }])
		.select()
		.single();

	const cache = new Cache(`${user?.id}:markdowns`);

	if (await cache.exists()) {
		const markdown = await cache.getAll();
		markdown.push({ ...response.data, title: escapeHtml(response.data?.title as string) });
		await cache.set(markdown);
	}

	return response;
}

export default defineWrappedResponseHandler({
	eventHandler
});
