// models/post.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/dbconfig';
import Organization from './Organization';
import Department from './Department';
import Process from './Process';
import Location from './Location';
import Gender from './Gender';
import Role from './Role';
import Designation from './Designation';

export interface UserAttributes {
	id: number;
	organizationId: number | null;
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	gender: number  | null;
	location: number | null;
	employeeCode: string ;
	department: number | null;
	process: number | null;
	role: number | null;
	designation: number | null;
	isAprrover: string;
	rightToRequistion: string;
	requistionInAMonth: string;
	startDate: Date
	endDate: Date;
	password: string;
	emailConfirmed: boolean;
	rememberMe: boolean;
	ssoLogin: boolean;
	isDepartmentHead: boolean;
	isReportingManager: boolean;
	isActive: boolean;
	isDelete: boolean;
	deletedOn?:Date;
	createdBy?: number | null;
	createdAt?:Date;
	updatedBy?: number | null;
	updatedAt?:Date
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
	id: number ;
	organizationId: number | null;
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	gender: number | null;
	location: number | null;
	employeeCode: string ;
	department: number | null;
	process: number | null;
	role: number | null;
	designation: number | null;
	isAprrover: string;
	rightToRequistion: string;
	requistionInAMonth: string;
	startDate: Date;
	endDate: Date;
	password: string;
	emailConfirmed: boolean;
	rememberMe: boolean;
	ssoLogin: boolean;
	isDepartmentHead: boolean;
	isReportingManager: boolean;
	isActive: boolean;
	isDelete: boolean;
	deletedOn?: Date | undefined;
	createdBy?: number | null | undefined;
	createdAt?: Date | undefined;
	updatedBy?: number | null | undefined;
	updatedAt?: Date | undefined;
	
	
}

///
//		Allow Null in Foreign key is set to "TRUE"; 
///

User.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		organizationId: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: true,
			references:{
				model:Organization,
				key:'id'
			}
		},
		firstName: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		middleName: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		phoneNumber: {
			type: DataTypes.STRING(15),
			allowNull: false
		},
		gender: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: true,
			references:{
				model:Gender,
				key:'id'
			}
		},
		location: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: true,
			references:{
				model:Location,
				key:'id'
			}
		},
		employeeCode: {
			type: DataTypes.STRING(50),
			allowNull:false,
		},
		department: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull:true,
			references:{
				model:Department,
				key:'id'
			}
		},
		process: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: true,
			references:{
				model:Process,
				key:'id'
			}
		},
		role: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: true,
			references:{
				model:Role,
				key:'id'
			}
		},
		designation: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: true,
			references:{
				model:Designation,
				key:'id'
			}
		},
		isAprrover: {
			type: DataTypes.STRING(3),
			allowNull:false,
		},
		rightToRequistion: {
			type: DataTypes.STRING(3),
			allowNull:false,
		},
		requistionInAMonth: {
			type: DataTypes.STRING(15),
			allowNull:false,
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull:false,
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull:false,
		},
		password: {
			type: DataTypes.STRING(500),
			allowNull:false,
		},
		emailConfirmed: {
			type: DataTypes.BOOLEAN,
			allowNull:false,
			defaultValue:false,
		},
		rememberMe: {
			type: DataTypes.BOOLEAN,
			allowNull:false,
			defaultValue:false,
		},
		ssoLogin: {
			type: DataTypes.BOOLEAN,
			allowNull:false,
			defaultValue:false,
		},
		isDepartmentHead: {
			type: DataTypes.BOOLEAN,
			allowNull:false,
			defaultValue:false,
		},
		isReportingManager: {
			type: DataTypes.BOOLEAN,
			allowNull:false,
			defaultValue:false,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull:false,
			defaultValue:false
		},
		isDelete: {
			type: DataTypes.BOOLEAN,
			allowNull:false,
			defaultValue:false,
		},
		createdBy: {
			type:DataTypes.BIGINT.UNSIGNED,
			allowNull:true,
			references:{
				model:'users',
				key:'id'
			}
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
		tableName: 'users',
		sequelize,
		timestamps: true
	}
);

// //Designation
// User.hasOne(Designation,{foreignKey:'createdBy'})
// User.hasOne(Designation,{foreignKey:'updatedBy'})

// //Organization 
// User.hasOne(Organization,{foreignKey:'createdBy'})
// User.hasOne(Organization,{foreignKey:'updatedBy'})
// // User.belongsTo(Organization,{foreignKey:'organizationId'});


// //Department
// User.hasOne(Department,{foreignKey:'createdBy'})
// User.hasOne(Department,{foreignKey:'updatedBy'})

// //Process
// User.hasOne(Process,{foreignKey:'createdBy'})
// User.hasOne(Process,{foreignKey:'updatedBy'})

// //Location
// User.hasOne(Location,{foreignKey:'createdBy'})
// User.hasOne(Location,{foreignKey:'updatedBy'})


// //Gender
// User.hasOne(Gender,{foreignKey:'createdBy'})
// User.hasOne(Gender,{foreignKey:'updatedBy'})


// //Roles
// User.hasOne(Role,{foreignKey:'createdBy'})
// User.hasOne(Role,{foreignKey:'updatedBy'})


export default User;
