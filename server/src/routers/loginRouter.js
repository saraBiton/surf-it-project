// localhost:3000/login/
import { Router } from 'express';


const router = Router();

// router.route('/').post(async (req, res) => {
//     const { username, password } = req.body;
//     console.log(username);
//     console.log(password);
//     const result = await loginController.checkLogin(username, password);
//     console.log(result);
//     res.json(result);
// })
router.route('/').post(async (req, res) => {
	const { username, password } = req.body;
	const result = await checkLogin({ username, password });
	console.log(result);
	res.json(result);
});

export { router };
