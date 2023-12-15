import { sanitize } from "~/lib/packages/dompurify";
import { marked } from "~/lib/packages/marked";
import type { Markdown } from "~/lib/types/markdown";

export const useMarkdownStore = defineStore("markdown", {
	state: () => ({
		markdown: {} as Markdown
	}),
	actions: {
		setCurrentMarkdown(markdown: Markdown) {
			this.markdown = markdown;
		}
	},
	getters: {
		getParsedMarkdown(state) {
			if (this.getMarkdownExistence) {
				return marked.parse((state.markdown.content as string) || "");
			}
		},
		getSanitazedParsedMarkdown() {
			// @ts-ignore
			return sanitize(this.getParsedMarkdown);
		},
		getMarkdownExistence(state) {
			return !!state.markdown?.id;
		}
	}
});
