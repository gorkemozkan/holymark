import { type Input, array, maxLength, minLength, number, object, optional, string, uuid } from "valibot";

const id = string([uuid()]);
const content = optional(string());
const title = string("Your title must be a string.", [
	minLength(1, "Please enter a title"),
	maxLength(32, "Title cannot be more than 32 characters.")
]);

export const GetSchema = object({
	id
});

export const DeleteSchema = object({
	id
});

export const GetAllSchema = object({
	page: number()
});

export const PostSchema = object({
	title
});

export const PutSchema = object({
	title,
	id,
	content
});

export const MarkdownSchema = array(
	object({
		id,
		title,
		content,
		created_at: string(),
		user_id: string([uuid()])
	})
);

export type GetInput = Input<typeof GetSchema>;
export type PutInput = Input<typeof PutSchema>;
export type PostInput = Input<typeof PostSchema>;
export type DeleteInput = Input<typeof DeleteSchema>;
export type GetAllInput = Input<typeof GetAllSchema>;
