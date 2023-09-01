import 'dotenv/config';
import { Options } from 'sequelize/types/sequelize';

const { MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_USER, MYSQL_HOST, MYSQL_LOCAL_PORT } =
	process.env;

const dbConfig: Options = {
	database: MYSQL_DATABASE as string,
	username: MYSQL_USER as string,
	password: MYSQL_PASSWORD as string,
	host: MYSQL_HOST as string,
	dialect: 'mysql',
	port: MYSQL_LOCAL_PORT as unknown as number,
	logging: true,
};

export default dbConfig;
