import { Marked } from "marked";

export const marked = new Marked();

export function getParsedMarkdown(markdown: string) {
	return marked.parse(markdown);
}
