import fetch from "node-fetch";
import { SPEECHIFY_API_BASE_URL, SPEECHIFY_API_KEY, VOICE_ID } from "../config/constants.js";

export const generateSpeech = async (text) => {
  const response = await fetch(`${SPEECHIFY_API_BASE_URL}/v1/audio/speech`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SPEECHIFY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: `<speak>${text}</speak>`,
      voice_id: VOICE_ID,
      audio_format: "mp3",
    }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const responseData = await response.json();
  return Buffer.from(responseData.audio_data, "base64");
};
