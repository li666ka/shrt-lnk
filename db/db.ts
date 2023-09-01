import { Sequelize } from 'sequelize-typescript';
import dbConfig from './db.config';
import { Url } from '../models/url.model';

export const sequelize = new Sequelize(dbConfig);

class Db {
	public static async initDb() {
		sequelize.addModels([Url]);
		await sequelize.authenticate();
		await sequelize.sync();
	}
}

export default Db;
