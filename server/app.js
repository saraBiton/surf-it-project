import express from 'express';
import connectDB from './src/Config/db.js';
import userRouter from './src/routers/userRouter.js';
import sensorRouter from './src/routers/sensorRouter.js';
import loginRouter from './src/routers/loginRouter.js';
import cors from 'cors';
const app = express();
const port = 8000;
connectDB();
app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/sensors', sensorRouter);
app.use('/login', loginRouter);
app.listen(port, () => {
  console.log('server running...');
});
