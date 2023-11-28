import TodoModel from "../models/TodoModel.js";

function showAll(req, res) {
	TodoModel.findAll({
		attributes: ["id", "task"],
	})
	.then((result) => res.render('index', {task: result}))
	.catch(err => console.error(err))
}

async function addTask(req, res) {
	await TodoModel.create({
		task: req.body.task
	})
	.then(() => res.redirect("/"))
	.catch(err => console.error(err))
}

async function getTasktoUpdate(req,res) {
	const id = req.params.id

	try {
		const todo = await TodoModel.findByPk(id);
		if(!todo) return res.status(404).send('Todo not found');
		res.render('edit.ejs', { todo: todo });
	} catch (error) {
		res.status(500).send('Internal server error');
	}
}

async function updateTask(req, res) {
	let idtask = req.params.id
	let todo = req.body.task

	try{
		console.log(todo)
		await TodoModel.update({
			task: todo
		}, {
			where: { id: idtask }
		})

		if(!updatedTodo) return res.status(400).send('Todo not found');
		res.redirect("/")
	} catch (err) {
		console.error(err);
	}
}

async function deleteTask(req, res) {
	await TodoModel.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(() => {
		res.redirect("/")
	})
	.catch(err => console.error(err))
}

export default {showAll, addTask, getTasktoUpdate, updateTask, deleteTask}