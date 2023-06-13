import { Router } from 'express';
import defibrilatorController from '../controllers/defibrilatorController.js';

const defibrilatorRouter = Router();

defibrilatorRouter.route('/').get(async (req, res) => {
	const result = await defibrilatorController.getAllDefibrillators();
	res.json(result);
});

defibrilatorRouter.route('/new').post(async (req, res) => {
	const obj = req.body;
	const result = await defibrilatorController.addDefibrilator(obj);
	console.log(result);
	res.json(result);
});

defibrilatorRouter.route('/:id').get(async (req, res) => {
	const result = await defibrilatorController.getDefibrilatorById(req.params.id);
	res.json(result);
});

defibrilatorRouter.route('/:id/edit').put(async (req, res) => {
	const obj = req.body;
	const result = await defibrilatorController.updateDefibrilator(req.params.id, obj);
	res.json(result);
});

defibrilatorRouter.route('/:id/delete').delete((req, res) => {
	const result = defibrilatorController.deleteDefibrilator(req.params.id);
	res.json(result);
});

export { defibrilatorRouter };
