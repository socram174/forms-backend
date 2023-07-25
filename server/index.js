import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
//import userRoutes from './routes/users.js';
//import adminRoutes from './routes/admins.js';
import authRoutes from './routes/auth.js';
//import responseRoutes from './routes/responses.js';
//import formRoutes from './routes/form.js';
//import questionRoutes from './routes/question.js';
//import subtopicRoutes from './routes/subtopic.js';
//import componentRoutes from './routes/component.js';

// ROUTES
//app.use('/api/users',userRoutes);
//app.use('/api/admins',adminRoutes);
app.use('/api/auth',authRoutes);
//app.use('/api/responses', responseRoutes);
//app.use('/api/forms', formRoutes);
//app.use('/api/questions', questionRoutes);
//app.use('/api/subtopics', subtopicRoutes);
//app.use('/api/components', componentRoutes);


const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("Database Connected!"))
.then(()=>{
    app.listen(PORT,() => console.log(`Server Port: ${PORT}`));

})
.catch((error) => console.log(`${error} did not connect`))