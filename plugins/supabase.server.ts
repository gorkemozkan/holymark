import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin({
	name: "supabase",
	enforce: "pre",
	async setup() {
		const { supabase } = useRuntimeConfig().public;

		const accessToken = useCookie(`${supabase.cookieName}-access-token`).value;
		const refreshToken = useCookie(`${supabase.cookieName}-refresh-token`).value;

		const supabaseClient = createClient(supabase.url, supabase.key, {
			auth: {
				flowType: supabase.clientOptions.auth?.flowType,
				detectSessionInUrl: false,
				persistSession: false,
				autoRefreshToken: false
			}
		});

		if (accessToken && refreshToken) {
			const { data } = await supabaseClient.auth.setSession({
				refresh_token: refreshToken,
				access_token: accessToken
			});

			if (data?.user) {
				useSupabaseUser().value = data.user;
			}
		}

		return {
			provide: {
				supabase: {
					client: supabaseClient
				}
			}
		};
	}
});
