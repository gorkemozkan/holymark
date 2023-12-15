import type { EventHandlerRequest, H3Event } from "h3";
import { Markdown } from "~/lib/types/markdown";
import { serverSupabaseClient, serverSupabaseUser } from "~/server/lib/supabase";
import { Cache } from "~/server/utils/cache";

async function eventHandler(event: H3Event<EventHandlerRequest>) {
	const user = await serverSupabaseUser(event);

	const cache = new Cache(`${user?.id}:markdowns`);

	if (await cache.exists()) {
		const markdowns = (await cache.getAll()) as Markdown[];
		return {
			data: markdowns
		};
	}

	const supabase = await serverSupabaseClient(event);

	const supabasePromise = supabase
		.from("markdowns")
		.select("*")
		.eq("user_id", user?.id as string);

	const responsePromise = supabasePromise.then(async response => {
		if ((response.data || []).length > 0) {
			await cache.set(response.data);
		}

		return response;
	});

	const [supabaseResponse] = await Promise.all([supabasePromise, responsePromise]);

	return supabaseResponse;
}

export default defineWrappedResponseHandler({
	eventHandler
});
