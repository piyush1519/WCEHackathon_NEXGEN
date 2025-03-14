import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const SynonymsAntonyms = () => {
  const [searchWord, setSearchWord] = useState("");
  const [wordData, setWordData] = useState(null);

  const handleChange = (e) => {
    setSearchWord(e.target.value);
  };

  const handleSearch = async () => {
    if (searchWord) {
      try {
        const response = await fetch(
          `https://api.datamuse.com/words?rel_syn=${searchWord}&rel_ant=${searchWord}`
        );
        const data = await response.json();

        // Filtering synonyms and antonyms from the response
        const synonyms = data
          .filter(item => item.tags && item.tags.includes("syn"))
          .map(item => item.word);

        const antonyms = data
          .filter(item => item.tags && item.tags.includes("ant"))
          .map(item => item.word);

        console.log("Synonyms:", synonyms);
        console.log("Antonyms:", antonyms);

        setWordData({
          word: searchWord,
          synonyms,
          antonyms,
        });

      } catch (error) {
        console.error("Error fetching word details:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FFF7D8 0%, #FDC32B 100%)",
        paddingTop: 8,
        paddingX: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "4px" }}>
          Search Antonyms and Synonyms
        </Typography>
        <TextField
          label="Enter the Word"
          variant="outlined"
          type="text"
          fullWidth
          required
          value={searchWord}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />

        <Button
          onClick={handleSearch}
          variant="contained"
          color="primary"
          sx={{
            "@media (max-width: 600px)": {
              fontSize: "0.8rem",
            },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Display Results */}
      {wordData && (
        <Box sx={{ marginTop: 4 }}>
          {/* Antonyms */}
          <Box>
            <Typography variant="h6">Antonyms</Typography>
            <ul style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
              {(wordData.antonyms || []).map((antonym, index) => (
                <li key={index}>
                  <Typography>English: {antonym}</Typography>
                </li>
              ))}
            </ul>
          </Box>

          {/* Synonyms */}
          <Box>
            <Typography variant="h6">Synonyms</Typography>
            {wordData.synonyms.length > 0 ? (
              <ul style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                {wordData.synonyms.map((synonym, index) => (
                  <li key={index}>
                    <Typography>English: {synonym}</Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No synonyms available</Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SynonymsAntonyms;
