import type { EventHandlerRequest, H3Event } from "h3";
import { Markdown } from "~/lib/types/markdown";
import { serverSupabaseClient, serverSupabaseUser } from "~/server/lib/supabase";
import { Cache } from "~/server/utils/cache";
import { type Database } from "~/types/supabase";

async function eventHandler(event: H3Event<EventHandlerRequest>) {
	const { params } = event.context;

	const user = await serverSupabaseUser(event);

	const cache = new Cache(`${user?.id}:markdowns`);

	if (await cache.exists()) {
		const markdowns = await cache.getAll();
		const markdown = markdowns.find((markdown: Markdown) => {
			return markdown.id === params?.id;
		});

		return {
			data: markdown as Markdown
		};
	}

	const supabase = await serverSupabaseClient<Database>(event);

	const supabasePromise = supabase
		.from("markdowns")
		.select("*")
		.eq("user_id", user?.id as string)
		.eq("id", params?.id as string)
		.single();

	const responsePromise = supabasePromise.then(async response => {
		await cache.set(response.data);
		return response;
	});

	const [supabaseResponse] = await Promise.all([supabasePromise, responsePromise]);

	return supabaseResponse;
}

export default defineWrappedResponseHandler({
	eventHandler
});
