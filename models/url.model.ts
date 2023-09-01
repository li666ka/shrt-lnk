import {
	Table,
	Column,
	PrimaryKey,
	AllowNull,
	DataType,
	Model,
} from 'sequelize-typescript';

@Table
export class Url extends Model {
	@PrimaryKey
	@Column(DataType.STRING)
	declare fullUrl: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare shortUrl: string;
}
