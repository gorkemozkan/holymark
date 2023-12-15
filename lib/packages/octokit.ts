import { Octokit } from "octokit";

interface Query {
	page?: number;
	per_page?: number;
}

const options = {
	owner: "gorkemozkan",
	repo: "holymark",
	headers: {
		"X-GitHub-Api-Version": "2022-11-28"
	}
};

const octokit = new Octokit({
	auth: process.env.GITHUB_AT
});

export async function listCommits(query: Query) {
	const response = await octokit.request("GET /repos/{owner}/{repo}/commits", {
		...query,
		...options
	});

	const data = response.data.map(dataItem => {
		return {
			commit: {
				message: dataItem.commit.message,
				author: {
					name: dataItem.commit.author?.name
				}
			},
			author: {
				avatar_url: dataItem.author?.avatar_url
			}
		};
	});

	return { ...response, data };
}

export async function getReleases(query: Query) {
	const response = await octokit.request("GET /repos/{owner}/{repo}/releases", {
		...options,
		...query
	});

	const data = response.data.map(dataItem => {
		return {
			id: dataItem.id,
			version: dataItem.tag_name,
			createdAt: dataItem.created_at
		};
	});

	return { ...response, data };
}

export async function getRelease(query: { release_id: number }) {
	return await octokit.request("GET /repos/{owner}/{repo}/releases/{release_id}", {
		...options,
		...query
	});
}
