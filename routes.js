import express from "express";
import todoModel from "./src/models/TodoModel.js"

const routes = express.Router();

routes.get("/", (req, res) => {
    todoModel.findAll({
		attributes: ["id", "task"],
	})
	.then((result) => res.render('index', {task: result}))
	.catch(err => console.error(err))
})

routes.post("/", async (req, res) => {
    await todoModel.create({
		task: req.body.task
	})
	.then(() => res.redirect("/"))
	.catch(err => console.error(err))
})

routes.route("/edit/:id")
    .get(async (req, res) => {
        let id = req.params.id
        const todo = await todoModel.findByPk(id)
        
        res.render('edit.ejs', {todo: todo})
    })
    .post(async (req, res) => {
        let id = req.params.id
        let task = req.body.task
        const todo = await todoModel.findByPk(id)

        await todo.update({
            task: task
        })

        res.redirect('/')
    })

routes.get("/delete/:id", async (req, res) => {
    await todoModel.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(() => {
		res.redirect("/")
	})
	.catch(err => console.error(err))
})

export { routes as default };