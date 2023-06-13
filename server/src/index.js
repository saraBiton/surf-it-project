/**
 * טעינת כל הראוטרים לאפליקציה
 */

import { app } from './express.js';
import { sensor_ws_router } from './routers/ws/sensor-ws.js';
import { client_ws_router } from './routers/ws/client-ws.js';
import { sensor_router } from './routers/sensorRouter.js';
import { login_router } from './routers/loginRouter.js';
import { user_router } from './routers/userRouter.js';
import { defibrilator_router } from './routers/defibrilatorRouter.js';
import sensorController from './controllers/sensorController.js';

// הפעלת רנדומציית מיקום סנסורים
sensorController.SetRandomCoordinatesForAll();

app.use(sensor_ws_router);
app.use(client_ws_router);
app.use('/users', user_router);
app.use('/sensors', sensor_router);
app.use('/login', login_router);
app.use('/defibrilator',defibrilator_router);

app.use((err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}

	res.status(500);
	res.json({ error_code: err.code, message: err.message });
	console.error(err.stack);
});

export { app };
