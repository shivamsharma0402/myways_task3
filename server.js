const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectDB = require('./configs/db');
const authRoutes = require('./routes/auth.routes');
const blogRoutes = require('./routes/blog.routes');

const errorHandler = require('./middlewares/errorHandler.middleware');

const app = express();

connectDB(process.env.MONGO_URI);


app.use(bodyParser.json());

app.use('/user',authRoutes);
app.use('/blogs',blogRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('=============SERVER STARTS==============' ));