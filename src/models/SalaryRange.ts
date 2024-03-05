// models/post.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/dbconfig';
import Organization from './Organization';

interface SalaryRangeAttributes {
	id: number;
	organizationId: number;
	name: string;
	isActive:boolean;
	isDefault:string;
	isDelete: boolean;
	createdBy: number;
	createdAt:Date;
	updatedBy?: number;
	updatedAt?:Date
}

interface SalaryRangeCreationAttributes extends Optional<SalaryRangeAttributes, 'id'> { }

class SalaryRange extends Model<SalaryRangeAttributes, SalaryRangeCreationAttributes> implements SalaryRangeAttributes {
	id: number;
	organizationId: number;
	name: string;
	isActive: boolean;
	isDefault: string;
	isDelete: boolean;
	createdBy: number;
	createdAt: Date;
	updatedBy?: number | undefined;
	updatedAt?: Date | undefined;
}

SalaryRange.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		organizationId: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull:false,
			references:{
				model:Organization,
				key:'id',
			}
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull:false
		},
		isActive: {
			type:DataTypes.BOOLEAN,
			allowNull:false,
			defaultValue:false,
		},
		isDefault: {
			type:DataTypes.STRING(3),
			allowNull:false,
		},
		isDelete: {
			type:DataTypes.BOOLEAN,
			allowNull:false,
			defaultValue:false,
		},
		createdBy: {
			type:DataTypes.BIGINT.UNSIGNED,
			allowNull:false,
			references: {
        model: 'users',
        key: 'id',
      },
		},
		createdAt: {
			type:DataTypes.DATE,
			allowNull:false
		},
		updatedBy:{
			type:DataTypes.BIGINT.UNSIGNED,
			allowNull:true,
			references: {
        model: 'users',
        key: 'id',
      },
		},
		updatedAt:{
			type:DataTypes.DATE,
			allowNull:true,
		}
	},
	{
		tableName: 'salary_ranges',
		sequelize,
		timestamps:true,
	}
);

export default SalaryRange;
