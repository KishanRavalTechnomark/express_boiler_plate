// models/post.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/dbconfig';
import Organization from './Organization';
import User from './User';


interface RoleAttributes {
	id: number;
	organizationId: number;
	name:string;
	isDelete: boolean;
	createdBy: number;
	createdAt:Date;
	updatedBy?: number;
	updatedAt?:Date
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> { }

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
	id: number;
	organizationId: number;
	name: string;
	isDelete: boolean;
	createdBy: number;
	createdAt: Date;
	updatedBy?: number | undefined;
	updatedAt?: Date | undefined;
}

Role.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		organizationId: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull:false,
			references: {
        model: Organization,
        key: 'id',
      },
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull:false
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
		tableName: 'roles',
		sequelize,
		timestamps:true
	}
);
export default Role;
