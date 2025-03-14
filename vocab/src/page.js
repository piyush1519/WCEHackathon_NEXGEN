import React, { useContext, useState } from "react";
import { WordContext } from "./ApiCall/WordContext";
import WordDetails from "./components/WordDetails";
const Page = () => {
  const { wordData, loading, error, fetchWordDetails } = useContext(WordContext);
  const [inputWord, setInputWord] = useState("");

  const handleFetch = () => {
    fetchWordDetails(inputWord);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Word Details Finder</h1>
      <input
        type="text"
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
        placeholder="Enter a word"
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          marginRight: "10px",
        }}
      />
      <button
        onClick={handleFetch}
        style={{
          padding: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Get Details
      </button>

      {/* Loading and Error States */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Render WordDetails when wordData exists */}
      {wordData && <WordDetails wordData={wordData} />}
    </div>
  );
};

export default Page;
