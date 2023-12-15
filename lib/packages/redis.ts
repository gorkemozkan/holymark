import Redis from "ioredis";

export default new Redis(process.env.UPSTASH_REDIS as string, { connectTimeout: 10000 });
