import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

/* ADMIN REGISTER */
export const adminRegister = async (req,res)=>{ 
    try{
        const {
            email,
            name,
            password,
        } = req.body;

        let admin = await Admin.exists({email: email});

        if(admin) return res.status(400).json({ msg: "Admin already exists."});
        
        console.log(email,name,password);

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newAdmin = new Admin({
            email,
            name,
            password: passwordHash,
        });
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);//Devuelve el administrador recien creado en formato json al frontend
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

/* LOG IN */
export const adminLogin = async (req,res) => {
    try{
        const {email,password} = req.body;
        const admin = await Admin.findOne({email: email});
        if(!admin) return res.status(400).json({ msg: "User does not exist."});

        const isMatch = await bcrypt.compare(password,admin.password);// Compara la password recibida del frontend con la almacenada en MongoDB
        if(!isMatch) return res.status(500).json({msg: "Invalid credentials."});

        const token =jwt.sign({id: admin._id}, process.env.JWT_SECRET);// Crea un token con el id del usuario y la clave secreta definida en el archivo .env
        delete admin.password; // Elimina la password del usuario para que no se envie al frontend.
        res.status(200).json({ token,admin});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

/* LOG IN */
export const allAdmins = async (req,res) => {
    try{

        const admins = await Admin.find();

        res.status(200).json( admins);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}