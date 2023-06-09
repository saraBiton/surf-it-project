// localhost:3000/login/
import { Router } from 'express';
import userController from '../controllers/userController.js'
const login_router = Router();


login_router.route('/').post(async (req, res) => {
	console.log("body", req.body)
	const { firstName, lastName, password } = req.body;
	const result = await userController.checkLogin( firstName, lastName, password );
	console.log("result", result);
	res.json(result);
});

export { login_router };
