import 'dotenv/config';
import chalk from 'chalk';
import app from './app';
import { redis } from './db/redis';
import Db from './db/db';

const port: number = Number(process.env.PORT) || 4000;

(async () => {
	try {
		await Db.init();
	} catch (err: unknown) {
		console.log(chalk.red('Something wrong with db!'));
		return;
	}
	console.log(chalk.bgBlue('Database was initialized successfully!'));
	// await Db.seedData();
	// await redis.connect();
	app.listen(port, () => {
		console.log(chalk.bgGreen(`Server is listening on port ${port}...`));
	});
})();
