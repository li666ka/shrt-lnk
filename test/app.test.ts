import request from 'supertest';
import app from '../app';
import Redis from 'ioredis-mock';

describe('API Tests', () => {
	const redis = new Redis({
		host: 'localhost',
		port: 6379, // Test Redis port
		db: 1, // Use a different database for testing
	});

	// Before each test
	beforeEach(async () => {
		// Clear the test database
		await redis.flushdb();
	});

	const url = 'https://www.npmjs.com/';
	it('should return 200 OK', async () => {
		const response = await request(app).get('/short-url').query({ url });
		expect(response.status).toBe(200);

		const cacheData = await redis.get(`short-url?url=${url}`);
		expect(typeof cacheData === 'string').toBeTruthy();
		redis.quit();
	});

	// Add more test cases as needed
});
