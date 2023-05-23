
import connectDB from './src/Config/db.js';
import { app } from './src/index.js';

const PORT = 8000;

(async () => {
	await connectDB();

	app.listen(PORT, () => {
		console.log(`server running on port ${PORT}...`);
	});
})();
