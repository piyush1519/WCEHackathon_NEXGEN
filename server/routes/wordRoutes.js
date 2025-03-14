import express from "express";
import { fetchWordDetails } from "../controllers/wordcontroller.js"; 

const router = express.Router();

router.get("/:word", fetchWordDetails);

export default router;
