import { Request, Response } from 'express';
import UrlsService from '../services/urls.service';
import { redisClient } from '../db/redis';

class UrlsController {
	public static async createOrGetShortenedUrl(
		req: Request<never, never, never, { url: string }>,
		res: Response<string>
	) {
		const { url: fullUrl } = req.query;
		const shortenedUrl = await UrlsService.createOrGetShortenedUrl(fullUrl);

		const { url } = req;
		await redisClient.setEx(url, 300, shortenedUrl);

		const keys = await redisClient.keys('*');
		console.log(keys);

		return res.send(shortenedUrl);
	}

	public static async getFullUrl(
		req: Request<never, never, never, { url: string }>,
		res: Response<string>
	) {
		const { url: shortUrl } = req.query;
		const fullUrl = await UrlsService.getFullUrl(shortUrl);

		const { url } = req;
		await redisClient.setEx(url, 300, fullUrl);

		const keys = await redisClient.keys('*');
		console.log(keys);

		return res.send(fullUrl);
	}
}
export default UrlsController;
