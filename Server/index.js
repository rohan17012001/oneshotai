import API from './routes/API.js'
import express from 'express';
import connectDB from './config/db.js';
import { Login, Register } from './controllers/LoginController.js';
// console.log(process.env.DBURL);
connectDB();
const app = express({mergeParams: true});
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', API);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
