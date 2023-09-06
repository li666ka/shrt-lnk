import { Request, Response } from 'express';
import { redis } from '../db/redis';
import chalk from 'chalk';

export async function cache(
	req: Request<never, never, never, { url: string }>,
	res: Response<string>,
	next: any
) {
	const { url } = req;
	const result = await redis.get(url);

	if (!result) return next();

	console.log(chalk.yellowBright('Data was taken from cache...'));

	return res.json(result);
}
