export function escapeHtml(input: string) {
	if (typeof input !== "string") {
		return input;
	}

	return input.replace(/[&<>"'\/]/g, match => {
		switch (match) {
			case "&":
				return "&amp;";
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case '"':
				return "&quot;";
			case "'":
				return "&#39;";
			case "/":
				return "&#x2F;";
			default:
				return match;
		}
	});
}
