// localhost:3000/login/
import { Router } from 'express';

const login_router = Router();

// router.route('/').post(async (req, res) => {
//     const { username, password } = req.body;
//     console.log(username);
//     console.log(password);
//     const result = await loginController.checkLogin(username, password);
//     console.log(result);
//     res.json(result);
// })
login_router.route('/').post(async (req, res) => {
	const { username, password } = req.body;
	const result = await checkLogin({ username, password });
	console.log(result);
	res.json(result);
});

export { login_router };
