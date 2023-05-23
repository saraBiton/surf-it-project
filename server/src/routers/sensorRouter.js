//localhost:3000/users/
import { Router } from 'express';
import sensorController from '../controllers/sensorController.js';
const router = Router();

router.route('/').get(async(req, res) => {
   const result = await sensorController.getAllSensors();
   res.json(result);
});

router.route('/:id').get(async(req, res) => {
    const result = await userControllers.getUserById(req.params.id);
    res.json(result);
});

router.route('/').post(async(req, res) => {
    const obj = req.body;
    const result = await sensorController.addSensor(obj);
    console.log(result)
    res.json(result);
});

router.route('/:id').put(async(req, res) => {
    const obj = req.body;
    const result = await userControllers.updateUser(obj, req.params.id);
    res.json(result);
});

router.route('/:id').delete((req, res) => {
    const result = userControllers.deleteUser(req.params.id);
    res.json(result);
})

export default router;