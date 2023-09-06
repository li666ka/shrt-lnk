import { Request, Response } from 'express';
import UrlsService from '../services/urls.service';
import { redis } from '../db/redis';
import chalk from 'chalk';

class UrlsController {
	public static async createOrGetShortenedUrl(
		req: Request<never, never, never, { url: string }>,
		res: Response<string>
	) {
		const { url: fullUrl } = req.query;
		const shortenedUrl = await UrlsService.createOrGetShortenedUrl(fullUrl);

		console.log(chalk.yellowBright('Data was taken from DB...'));

		const { url } = req;
		await redis.setex(url, 300, shortenedUrl);

		await showKeys();

		return res.send(shortenedUrl);
	}

	public static async getFullUrl(
		req: Request<never, never, never, { url: string }>,
		res: Response<string>
	) {
		const { url: shortUrl } = req.query;
		const fullUrl = await UrlsService.getFullUrl(shortUrl);

		console.log(chalk.yellowBright('Data was taken from DB...'));

		const { url } = req;
		await redis.setex(url, 300, fullUrl);

		await showKeys();

		return res.send(fullUrl);
	}
}

async function showKeys() {
	const keys = await redis.keys('*');
	console.log(keys);
}

export default UrlsController;
