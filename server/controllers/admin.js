import Admin from '../models/Admin.js';

/* Edit admin data */
export const editInformation = async (req,res) => {
    try{
        const adminId = req.params.id;
        const {name,email} = req.body;
        console.log(name);
        console.log(email);
        const admin = await Admin.findById(adminId);
        if(!admin) return res.status(400).json({ msg: "User does not exist."});


        admin.name = name;
        admin.email = email;
        admin.save();
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}