import uniqid from 'uniqid';
import { Url } from '../models/url.model';

class UrlsService {
	public static async createOrGetShortenedUrl(url: string): Promise<string> {
		const foundUrl: Url | null = await Url.findOne({ where: { fullUrl: url } });
		if (foundUrl) {
			const { shortUrl } = foundUrl;
			return shortUrl;
		}
		const shortenedUrl: string = this.createShortenedUrl();
		const { shortUrl } = await Url.create({ fullUrl: url, shortUrl: shortenedUrl });

		return shortUrl;
	}

	public static async getFullUrl(shortUrl: string): Promise<string> {
		const url: Url | null = await Url.findOne({ where: { shortUrl: shortUrl } });

		if (!url) throw new Error(`There is no full url for ${shortUrl}`);

		return url.fullUrl;
	}

	public static createShortenedUrl(): string {
		return 'https://sht-lnk/' + uniqid();
	}
}

export default UrlsService;
