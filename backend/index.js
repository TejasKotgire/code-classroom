import express from 'express';
import dotenv from 'dotenv'

const app = express();

import userAuthRoutes from './routes/user_auth.route.js'
import adminAuthROutes from './routes/admin_auth.route.js'
import { connectDB } from './db/connectDB.js';

app.use('/api/auth', userAuthRoutes);
app.use('/api/auth', adminAuthROutes);

dotenv.config();

app.listen(3001, ()=>{
    connectDB();
    console.log("app running on port 3001");
})