import fetch from "node-fetch";
import { DICTIONARY_API_KEY } from "../config/constants.js";

export const getWordData = async (word) => {
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${DICTIONARY_API_KEY}`;
  const response = await fetch(url);
  console.log(response);
  
  if (!response.ok) {
    throw new Error("Error fetching data from Merriam-Webster API");
  }

  const data = await response.json();
  console.log(`data: ${data}`);
  

  if (Array.isArray(data) && data.length > 0) {
    const wordData = data[0];
    const pronunciation = wordData.hwi?.prs?.[0]?.mw || "Not available";
    const audio = wordData.hwi?.prs?.[0]?.sound?.audio
      ? `https://media.merriam-webster.com/audio/prons/en/us/mp3/${wordData.hwi.prs[0].sound.audio[0]}/${wordData.hwi.prs[0].sound.audio}.mp3`
      : null;
    const partOfSpeech = wordData.fl || "Not available";
    const definitions = wordData.shortdef || [];
    const synonyms = wordData.syns?.map((syn) => syn.pt.map((entry) => entry[0])) || [];
    const antonyms = wordData.ants?.map((ant) => ant.pt.map((entry) => entry[0])) || [];

    return { word, pronunciation, audio, partOfSpeech, definitions,synonyms, antonyms  };
  } else {
    throw new Error("Word not found.");
  }
};
