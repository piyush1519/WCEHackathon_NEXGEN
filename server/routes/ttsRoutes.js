import express from "express";
import { convertTextToSpeech } from "../controllers/ttsController.js";

const router = express.Router();

router.post("/convert-text-to-speech", convertTextToSpeech);

export default router;
