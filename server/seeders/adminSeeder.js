import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
import Admin from '../models/Admin.js';

let password = "test1234";

const salt = await bcrypt.genSalt();
const passwordHash = await bcrypt.hash(password,salt);

const adminSeeds = [
    {
        name: "Jhon Doe",
        email: "Jhon.doe@hotmail.com",
        password: passwordHash,
    },
    {
        name: "Jane Doe",
        email: "Jane.doe@gmail.com",
        password: passwordHash,
    },
    {
        name: "Marcos Silva",
        email: "marcos@hotmail.com",
        password: passwordHash,
    }
];


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,



}).then(async()=>{

    await Admin.deleteMany({});
    await Admin.insertMany(adminSeeds);
    console.log("Database Seeded!");



}).then(()=> {
    mongoose.connection.close();
    console.log("Database Connection Closed!");
}).catch((error) => console.log(`${error} did not connect`));