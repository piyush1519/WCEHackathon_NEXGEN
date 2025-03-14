import { getWordData } from "../services/dictionaryService.js";

export const fetchWordDetails = async (req, res) => {
  const { word } = req.params;
  try {
    const wordData = await getWordData(word);
   
    
    res.json(wordData);
  } catch (error) {
    console.error("Error fetching word details:", error);
    res.status(500).json({ error: "Failed to fetch word details" });
  }
};
