import DOMPurify from "dompurify";

export function sanitize(source: string) {
	return DOMPurify.sanitize(source);
}
