const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const port = 3000;
const connectDB = require('./db/connect');
require('dotenv').config();


const start = async () => {
    try {

        await connectDB(process.env.MONGO_URI);

        app.listen(port, console.log(`server is listening on port ${port}...`));
    } catch (error) {
        console.error('Error:', error);
    }
};
// Middleware
app.use(express.static('./frontend'))
app.use(express.json());

// Routes

app.use('/api/v1/tasks', tasks);

start();
