import { Request, Response } from 'express';
import { redisClient } from '../db/redis';

export async function cache(
	req: Request<never, never, never, { url: string }>,
	res: Response<string>,
	next: any
) {
	const { url } = req;
	const result = await redisClient.get(url);

	if (!result) return next();
	return res.json(result);
}
