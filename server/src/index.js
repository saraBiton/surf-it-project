import { app } from './express.js';
import { sensor_ws_router } from './routers/ws/sensor-ws.js';
import { client_ws_router } from './routers/ws/client-ws.js';
import { user_router } from './routers/userRouter.js';
import { sensor_router } from './routers/sensorRouter.js';

app.use(sensor_ws_router);
app.use(client_ws_router);
app.use('/users', user_router);
app.use('/sensors', sensor_router);

export {
	app
};