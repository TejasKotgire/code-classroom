const express = require('express');
const dotenv = require('dotenv')
const connectDb = require('./db/connectDB.js')
const cors = require("cors");
const cookieParser = require('cookie-parser');
var compiler = require("compilex");
// var options = {stats : true};
// compiler.init(options);

const authRoutes = require('./routes/authRoutes.js');
const classroomRoutes = require('./routes/classroomRoutes.js');
const assignmentRoutes = require('./routes/assignmentRoutes.js');
const compilerRoutes = require('./routes/compilerRoutes.js');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
dotenv.config();
connectDb();

app.use('/api/auth', authRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/assignments', assignmentRoutes)
app.use('/compilecode', compilerRoutes)

PORT = process.env.PORT || 3001;


app.listen(PORT, ()=>{
    console.log("running on ", PORT)
})

compiler.flush(function(){
    console.log('All temporary files flushed !'); 
    });