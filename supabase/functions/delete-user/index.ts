import { corsHeaders } from "../_shared/cors";

console.log("Hello from Functions!");

Deno.serve(async req => {
	try {
		//Create instance of SupabaseClient
		const supabaseClient = createClient(
			Deno.env.get("SUPABASE_URL") ?? "",
			Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
		);

		// Get the authorization header from the request.
		// When you invoke the function via the client library
		// it will automatically pass the authenticated user's JWT.
		const authHeader = req.headers.get("Authorization");

		// Get JWT from auth header
		const jwt = authHeader.replace("Bearer ", "");

		// Get the user object
		const {
			data: { user }
		} = await supabaseClient.auth.getUser(jwt);

		if (!user) throw new Error("No user found for JWT!");

		//Call deleteUser method and pass user's ID
		const { data, error } = await supabaseClient.auth.admin.deleteUser(user.id);

		return new Response(JSON.stringify(data), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 200
		});
	} catch (error) {
		return new Response(JSON.stringify(error), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 400
		});
	}
});

// To invoke:
// curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
