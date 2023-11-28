import express from "express";
import bodyParser from "body-parser";
import routes from "./routes.js";
import sequelize from "./src/database.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes);

sequelize.authenticate().then(async () => {
	await sequelize.sync(() => console.log('Banco funcionando'));
	app.listen(3000, () => console.log("Servidor funcionando"));
}) .catch(err => console.error(err));
