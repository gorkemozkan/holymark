import type { EventHandlerRequest, H3Event } from "h3";
import { Markdown } from "~/lib/types/markdown";
import { type PutInput } from "~/lib/validations/markdowns";
import { serverSupabaseClient, serverSupabaseUser } from "~/server/lib/supabase";
import { Cache } from "~/server/utils/cache";
import { type Database } from "~/types/supabase";
import { escapeHtml } from "~/utils/strings";

async function eventHandler(event: H3Event<EventHandlerRequest>) {
	const query = getQuery<PutInput>(event);

	const user = await serverSupabaseUser(event);

	const cache = new Cache(`${user?.id}:markdowns`);

	if (await cache.exists()) {
		const cachedMarkdowns = await cache.getAll();

		const markdowns = cachedMarkdowns.map((markdown: Markdown) => {
			if (markdown.id === query.id) {
				if (query.title) {
					markdown.title = query.title;
				}

				if (query.content) {
					markdown.content = query.content;
				}
			}

			return markdown;
		});

		await cache.set(markdowns);
	}

	const supabase = await serverSupabaseClient<Database>(event);

	return await supabase
		.from("markdowns")
		.update({
			...query,
			title: escapeHtml(query.title)
		})
		.eq("id", query.id)
		.select();
}

export default defineWrappedResponseHandler({
	eventHandler
});
