import 'dotenv/config';
import chalk from 'chalk';
import app from './app';
import { redisClient } from './db/redis';
import Db from './db/db';

const port: number = Number(process.env.PORT) || 4000;

(async () => {
	try {
		await Db.initDb();
	} catch (err: unknown) {
		console.log(chalk.red('Something wrong with db!'));
		return;
	}
	console.log(chalk.blue('Database was initialized successfully!'));
	// await Db.seedData();
	await redisClient.connect();
	app.listen(port, () => {
		console.log(chalk.green(`Server is listening on port ${port}...`));
	});
})();
