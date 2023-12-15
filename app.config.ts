export default defineAppConfig({
	ui: {
		primary: "teal",
		gray: "cool",
		skeleton: {
			background: "bg-gray-100 dark:bg-gray-800"
		},
		card: {
			background: "dark:bg-zinc-950"
		},
		divider: {
			border: {
				base: "flex border-gray-200 dark:border-zinc-900"
			}
		},
		toggle: { active: "bg-white dark:bg-gray-800", inactive: "bg-gray-800 dark:bg-black" },
		input: {
			variant: {
				auth: "bg-transparent text-dark-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-700 caret-red-400"
			}
		},
		button: {
			variant: {
				authAlternative: "py-2 text-base flex justify-center bg-black dark:bg-white dark:text-black text-white"
			}
		}
	},
	colorMode: {
		preference: "light"
	}
});
