import { useMutation } from "@tanstack/vue-query";

interface ErrorResponse {
	error: Error;
}

export function useSupabaseForm<T>(handler: () => Promise<T>) {
	const toast = useToast();

	return useMutation({
		mutationFn: async () => {
			const response = await handler();

			if ((response as ErrorResponse).error) {
				throw createError((response as ErrorResponse).error);
			}

			return response;
		},
		onError: error => {
			toast.add({
				id: "supabase_form_error",
				icon: "i-heroicons-exclamation-circle",
				title: "Error",
				color: "red",
				description: error.message
			});
		},
		onSuccess: () => {
			toast.add({
				id: "supabase_form_success",
				icon: "i-heroicons-check",
				title: "Success"
			});
		}
	});
}
