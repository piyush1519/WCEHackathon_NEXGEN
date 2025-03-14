import { generateSpeech } from "../services/ttsService.js";

export const convertTextToSpeech = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const audioBuffer = await generateSpeech(text);
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", "inline; filename=speech.mp3");
    res.send(audioBuffer);
  } catch (error) {
    console.error("Error converting text to speech:", error);
    res.status(500).json({ error: "Failed to convert text to speech" });
  }
};
