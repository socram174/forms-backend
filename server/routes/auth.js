import express from "express";
import { adminLogin,adminRegister, allAdmins } from "../controllers/auth.js"

const router = express.Router();

/* ADMIN */
router.post("/login/admin", adminLogin);
router.post("/register/admin", adminRegister);
router.get("/", allAdmins);


export default router;