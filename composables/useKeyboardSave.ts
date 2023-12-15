export function useKeyboardSave(action: () => void) {
	function handler(event: KeyboardEvent) {
		if (event.metaKey && event.key === "s") {
			event.preventDefault();
			action();
		}
	}

	onMounted(() => {
		document.addEventListener("keydown", handler);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("keydown", handler);
	});
}
