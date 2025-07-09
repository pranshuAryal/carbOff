import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import connectDB from './src/config/db.js';
import authRoutes from './routes'

const app = express();
app.use(express.json);
app.use(cors);


//connect to database
connectDB();


//routes
app.use('/signup',authRoutes)


