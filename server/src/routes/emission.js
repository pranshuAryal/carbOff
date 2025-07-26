import express from "express";
import { createEmission} from "../controller/emission.js";

const router = express.Router();

router.post('/emission', createEmission); 

export default router