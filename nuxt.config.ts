export default defineNuxtConfig({
	modules: ["@nuxt/ui", "@pinia/nuxt", "nuxt-typed-router"],
	imports: {
		dirs: ["./lib/types", "./lib/validations"]
	},
	runtimeConfig: {
		public: {
			baseUrl: process.env.APP_URL,
			supabase: {
				url: process.env.SUPABASE_URL,
				key: process.env.SUPABASE_KEY,
				redirectOptions: {
					login: "/auth/login",
					callback: "/confirm",
					exclude: ["/", "/auth*", "/changelog"]
				},
				cookieName: "auth",
				cookieOptions: {
					maxAge: 100 * 365 * 24 * 60 * 60, // 100 years, never expires
					sameSite: "strict",
					secure: true
				},
				clientOptions: {
					auth: {
						flowType: "pkce"
					}
				}
			}
		}
	},
	routeRules: {
		"/": { prerender: true },
		"/auth/**": { prerender: true },
		"/dashboard": { ssr: false },
		"/markdown/**": { ssr: false },
		"/changelog/**": { ssr: false },
	},
	router: {
		options: {
			scrollBehaviorType: "smooth"
		}
	},
	colorMode: {
		preference: "light",
		fallback: "light"
	},
	tailwindcss: {
		cssPath: "~/assets/tailwind.css",
		config: {
			darkMode: "media"
		},
		viewer: false
	},
	css: ["~/assets/md-preview.css", "~/assets/transitions.css"],
	ui: {
		icons: ["mdi", "simple-icons"]
	},
	devtools: { enabled: false },
	app: {
		baseURL: "/",
		head: {
			htmlAttrs: {
				lang: "en"
			},
			link: [
				{ rel: "canonical", href: "https://www.holymark.co" },
				{ rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
				{ rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }
			],
			meta: [
				{ name: "author", content: "Görkem" },
				{ property: "og:type", content: "website" },
				{ property: "og:locale", content: "en_US" },
				{ property: "og:type", content: "website" },
				{ name: "robots", content: "index, follow" },
				{ property: "og:image", content: "/og-landing.png" },
				{ property: "og:url", content: "https://www.holymark.co" },
				{ property: "og:title", content: "The Markdown Preview App" },
				{
					name: "keywords",
					content:
						"Markdown Viewer, Live Markdown Preview, Markdown Preview Tool, Online Markdown Viewer, Markdown Editor with Preview, Markdown Preview Online"
				},
				{
					property: "og:description",
					content:
						"Powerful and intuitive Markdown editor that provides a seamless real-time preview. Elevate your writing experience with our innovative Markdown editor, designed for efficiency and clarity."
				},
				{
					name: "twitter:description",
					content:
						"Explore the power of holymark, the dynamic markdown editor that offers a seamless side-by-side preview and editing experience. Effortlessly edit, preview, and export Markdown content for an enhanced writing and publishing journey."
				},

				{
					name: "description",
					content:
						"Explore the power of holymark, the dynamic markdown editor that offers a seamless side-by-side preview and editing experience. Effortlessly edit, preview, and export Markdown content for an enhanced writing and publishing journey."
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				{
					charset: "utf-8"
				}
			]
		}
	}
});
