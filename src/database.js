import { Sequelize } from "sequelize";
import "dotenv/config";

// const dbName = process.env.DB_NAME;
// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;
// const dbHost = process.env.DB_HOST;

// const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: './db.sqlite'
	// host: dbHost,
});

export default sequelize;
