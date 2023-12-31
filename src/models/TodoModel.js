import sequelize from "../database.js";
import { DataTypes } from "sequelize";

const List = sequelize.define('todoList', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},

	task: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	completed: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	}
});

export default List