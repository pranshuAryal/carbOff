import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import env from "./config/env.js"
import connectDB from './config/db.js'

import authRoutes from './routes/auth.js'
import emissionRoutes from './routes/emission.js' 

const app = express();
app.use(express.json());
app.use(cors());


//connect to database
connectDB();


//routes
app.use('/auth', authRoutes);
app.use('/calculator',emissionRoutes)

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

