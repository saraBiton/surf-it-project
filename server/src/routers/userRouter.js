import { Router } from 'express';
import userControllers from '../controllers/userController.js';

const user_router = Router();

user_router.route('/').get(async (req, res) => {
	const result = await userControllers.getAllUsers();
	res.json(result);
}); 

user_router.route('/new').post(async (req, res) => {
	const obj = req.body;
	console.log("obj: ", obj);
	const result = await userControllers.addUser(obj);
	console.log(result);
	res.json(result);
});

user_router.route('/:id').get(async (req, res) => {
	const result = await userControllers.getUserById(req.params.id);
	res.json(result);
});

user_router.route('/:id/edit').put(async (req, res) => {
	const obj = req.body;
	const result = await userControllers.updateUser(req.params.id, obj);
	res.json(result);
});

user_router.route('/:id/delete').delete((req, res) => {
	const result = userControllers.deleteUser(req.params.id);
	res.json(result);
});

export { user_router };
