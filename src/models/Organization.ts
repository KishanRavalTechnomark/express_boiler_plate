// models/post.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/dbconfig';
import User from './User';
import Department from './Department';
import Process from './Process';
import Designation from './Designation';
import Location from './Location';
import Gender from './Gender';
import Roles from './Role';

export interface OrganizationAttributes {
	id: number;
	name:string;
	isActive:boolean;
	isDefault:string;
	isDelete: boolean;
	createdBy: number;
	createdAt:Date;
	updatedBy?: number;
	updatedAt?:Date
}

interface OrganizationCreationAttributes extends Optional<OrganizationAttributes, 'id'> { }

class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes> implements OrganizationAttributes {
	id: number;
	name: string;
	isActive: boolean;
	isDefault: string;
	isDelete: boolean;
	createdBy: number;
	createdAt: Date;
	updatedBy?: number | undefined;
	updatedAt?: Date | undefined;
}

Organization.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
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
			allowNull:true,
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
		tableName: 'organizations',
		sequelize,
		timestamps: true
	}
);


// //Department
// Organization.hasMany(Department,{foreignKey:'organizationId'});

// //Process
// Organization.hasMany(Process,{foreignKey:'organizationId'});

// // Designation
// Organization.hasMany(Designation,{foreignKey:'organizationId'})

// //Location
// Organization.hasMany(Location,{foreignKey:'organizationId'})

// //Gender
// Organization.hasMany(Gender,{foreignKey:'organizationId'});

// //Roles
// Organization.hasMany(Roles,{foreignKey:'organizationId'});

export default Organization;
