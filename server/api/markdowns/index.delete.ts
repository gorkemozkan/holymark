import type { EventHandlerRequest, H3Event } from "h3";
import { Markdown } from "~/lib/types/markdown";
import { type DeleteInput } from "~/lib/validations/markdowns";
import { serverSupabaseClient, serverSupabaseUser } from "~/server/lib/supabase";
import { Cache } from "~/server/utils/cache";
import { type Database } from "~/types/supabase";

async function eventHandler(event: H3Event<EventHandlerRequest>) {
	const query = getQuery<DeleteInput>(event);

	const user = await serverSupabaseUser(event);

	const cache = new Cache(`${user?.id}:markdowns`);

	if (await cache.exists()) {
		const cachedMarkdowns = await cache.getAll();
		const markdowns = cachedMarkdowns.filter((markdown: Markdown) => markdown.id !== query.id);
		markdowns.length > 0 ? await cache.set(markdowns) : await cache.del();
	}

	const supabase = await serverSupabaseClient<Database>(event);

	return await supabase.from("markdowns").delete().eq("id", query.id);
}

export default defineWrappedResponseHandler({
	eventHandler
});
