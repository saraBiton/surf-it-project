// localhost:3000/login/
import { Router } from 'express';
import { checkLogin } from '../controllers/loginController.js';

const router = Router();

// router.route('/').post(async (req, res) => {
//     const { username, password } = req.body;
//     console.log(username);
//     console.log(password);
//     const result = await loginController.checkLogin(username, password);
//     console.log(result);
//     res.json(result);
// })
// router.route('/').post(async (req, res) => {
//     // const password= req.body;
//     // console.log(req.body);
//     const result = await checkLogin(req.body);
//     console.log(result);
//     res.json(result);
// })

export default router;
