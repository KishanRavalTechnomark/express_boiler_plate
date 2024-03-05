require("dotenv").config();
import { Sequelize, DataTypes, DatabaseError } from "sequelize";

const MYSQL_URL = `mysql://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?schema=public`;
const sequelize = new Sequelize(MYSQL_URL, {
  dialect: "mysql",
});

function connectDB(callback: Function) {
  sequelize
    .authenticate()
    .then(() => {
      console.log(
        "✅ Connection to Database has been established successfully."
      );
      callback(sequelize);
    })
    .catch((error: DatabaseError) => {
      console.log("error in connecting database", error);
    });
}

export { connectDB, sequelize, Sequelize, DataTypes };
