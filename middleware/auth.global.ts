export default defineNuxtRouteMiddleware((to, from) => {
	const user = useSupabaseUser();

	const config = useRuntimeConfig().public.supabase;
	const { login, callback, exclude } = config.redirectOptions;

	const isExcluded = [...(exclude as string[]), login, callback].some(path => {
		const regex = new RegExp(`^${path.replace(/\*/g, ".*")}$`);
		return regex.test(to.path);
	});

	if (isExcluded) {
		return;
	}

	if (!user.value?.id) {
		return navigateTo(login);
	}
});
