import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: "./src/config/dev.env" });

const userName = process.env.DATA_BASE_USER;
const DBhost = process.env.DATA_BASE_HOST;
const DBname = process.env.DATA_BASE_NAME;
 
export const sequelDB = new Sequelize(DBname, userName, "", {
  host: DBhost,
  dialect: "mysql",
});


export const testConnection = async () => {
  try {
    await sequelDB.authenticate();
    console.log("DataBase Connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export const syncDB = async () => {
  try {
    await sequelDB.sync({
      alter: false,
      force: false,
    });
    console.log("DataBase Synchronized Successfully");
  } catch (error) {
    console.log("Unable to Synchronize the Database", error.message);
  }
};
