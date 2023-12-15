import type { User } from "@supabase/supabase-js";
import { useState } from "#imports";
import { useSupabaseClient } from "./useSupabaseClient";

export const useSupabaseUser = () => {
	const supabase = useSupabaseClient();

	const user = useState<User | null>("supabase_user", () => null);

	supabase?.auth.getSession().then(({ data: { session } }) => {
		if (session) {
			if (JSON.stringify(user.value) !== JSON.stringify(session.user)) {
				user.value = session.user;
			}
		} else {
			user.value = null;
		}
	});

	return user as Ref<User | null>;
};
