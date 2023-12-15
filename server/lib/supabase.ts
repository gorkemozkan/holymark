import { type SupabaseClient, type User, createClient } from "@supabase/supabase-js";
import { type H3Event, createError, getCookie } from "h3";

export const serverSupabaseClient = async <T>(event: H3Event): Promise<SupabaseClient<T>> => {
	const { supabase } = useRuntimeConfig().public;

	let supabaseClient = event.context._supabaseClient as SupabaseClient<T>;

	if (!supabaseClient) {
		supabaseClient = createClient(supabase.url, supabase.key, {
			auth: {
				detectSessionInUrl: false,
				persistSession: false,
				autoRefreshToken: false
			}
		});

		event.context._supabaseClient = supabaseClient;
	}

	const { data } = await supabaseClient.auth.getSession();

	if (data?.session?.user?.aud !== "authenticated") {
		const accessToken = getCookie(event, `${supabase.cookieName}-access-token`);
		const refreshToken = getCookie(event, `${supabase.cookieName}-refresh-token`);

		if (!accessToken || !refreshToken) {
			return supabaseClient;
		}

		await supabaseClient.auth.setSession({
			refresh_token: refreshToken,
			access_token: accessToken
		});
	}
	return supabaseClient;
};

export const serverSupabaseUser = async (event: H3Event): Promise<User | null> => {
	const client = await serverSupabaseClient(event);

	const {
		data: { user: supabaseUser },
		error
	} = await client.auth.getUser();
	if (error) {
		throw createError({ statusMessage: error?.message });
	}

	event.context._user = error ? null : supabaseUser;

	return event.context._user;
};
