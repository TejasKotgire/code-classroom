const express = require('express');
const dotenv = require('dotenv')
const connectDb = require('./db/connectDB.js')
const cors = require("cors");
const cookieParser = require('cookie-parser');


const authRoutes = require('./routes/authRoutes.js');
const classroomRoutes = require('./routes/classroomRoutes.js');
const assignmentRoutes = require('./routes/assignmentRoutes.js');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
dotenv.config();
connectDb();

app.use('/api/auth', authRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/assignments', assignmentRoutes)

PORT = process.env.PORT || 3001;


app.listen(PORT, ()=>{
    console.log("running on ", PORT)
})