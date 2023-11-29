import express from "express";
import todoModel from "./src/models/TodoModel.js"

const routes = express.Router();

// Methods for CRUD
routes.get("/", (req, res) => {
    todoModel.findAll({
        attributes: ["id", "task", "completed"]
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

routes.post("/complete/:id", async (req,res) => {
    const taskId = req.params.id
    try {
        const task = await todoModel.findByPk(taskId);
        if (task) {
            task.completed = !task.completed
            await task.save()
        }
        res.redirect("/")
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
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
        let completed = req.body.completed
        const todo = await todoModel.findByPk(id)

        await todo.update({
            task: task,
            completed: completed
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
