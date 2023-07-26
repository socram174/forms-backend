import express from "express";
import { editInformation } from "../controllers/admin.js"

const router = express.Router();

/* ADMIN */
router.post("/edit/:id", editInformation);



export default router;