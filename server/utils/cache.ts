import redis from "~/lib/packages/redis";

export class Cache {
	public key: string;

	constructor(key: string) {
		this.key = key;
	}

	async getAll() {
		const { data } = await redis.hgetall(this.key);
		return JSON.parse(data);
	}

	async exists() {
		return !!(await redis.exists(this.key));
	}

	async set<T>(data: T) {
		return await redis.hset(this.key, { data: JSON.stringify(Array.isArray(data) ? data : [data]) });
	}

	async del() {
		return await redis.del(this.key);
	}
}
