// models/post.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/dbconfig';
import User from './User';

interface UserAttributes{
  id:number;
  title:string;
  content:string;
  userId:number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class Post extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
  public id!: number;
  public title!: string;
  public content!: string;
  public userId: number;

  public getUser!: any;

  // static associate(models: any) {
  //   Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  // }

}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId:{
      type: DataTypes.INTEGER.UNSIGNED,
    }
  },
  {
    tableName: 'posts',
    sequelize,
  }
);

export default Post;
