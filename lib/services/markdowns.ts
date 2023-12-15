import type { DeleteInput, GetInput, PostInput, PutInput } from "~/lib/validations/markdowns";

export async function getMarkdowns() {
	return await $fetch("/api/markdowns", {
		method: "GET"
	});
}

export async function getMarkdown(params: GetInput) {
	return await $fetch(`/api/markdowns/${params.id}`, {
		method: "GET"
	});
}

export async function createMarkdown(params: PostInput) {
	return await $fetch("/api/markdowns", {
		method: "POST",
		params
	});
}

export async function deleteMarkdown(params: DeleteInput) {
	return await $fetch("/api/markdowns", {
		method: "DELETE",
		params
	});
}

export async function updateMarkdown(params: PutInput) {
	return await $fetch("/api/markdowns", {
		method: "PUT",
		params
	});
}
