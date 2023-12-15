import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin({
	name: "supabase",
	enforce: "pre",
	async setup() {
		const user = useSupabaseUser();

		const { supabase } = useRuntimeConfig().public;

		const supabaseClient = createClient(supabase.url, supabase.key, supabase.clientOptions);

		const accessToken = useCookie(`${supabase.cookieName}-access-token`, supabase.cookieOptions);
		const refreshToken = useCookie(`${supabase.cookieName}-refresh-token`, supabase.cookieOptions);
		const providerToken = useCookie(`${supabase.cookieName}-provider-token`, supabase.cookieOptions);
		const providerRefreshToken = useCookie(`${supabase.cookieName}-provider-refresh-token`, supabase.cookieOptions);

		supabaseClient.auth.onAuthStateChange((event, session) => {
			if (session) {
				if (JSON.stringify(user.value) !== JSON.stringify(session.user)) {
					user.value = session.user;
				}
			} else {
				user.value = null;
			}

			if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
				accessToken.value = session?.access_token;
				refreshToken.value = session?.refresh_token;

				if (session?.provider_token) {
					providerToken.value = session.provider_token;
				}

				if (session?.provider_refresh_token) {
					providerRefreshToken.value = session.provider_refresh_token;
				}
			}

			if (event === "SIGNED_OUT") {
				accessToken.value = null;
				refreshToken.value = null;
				providerToken.value = null;
				providerRefreshToken.value = null;
			}
		});

		await supabaseClient.auth.getSession();

		return {
			provide: {
				supabase: {
					client: supabaseClient
				}
			}
		};
	}
});
