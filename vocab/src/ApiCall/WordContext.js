import React, { createContext, useState } from "react";

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWordDetails = async (word) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/word/${word}`);
      if (!response.ok) throw new Error("Word not found");

      const data = await response.json();
      setWordData(data);
    } catch (err) {
      setError(err.message);
      setWordData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WordContext.Provider value={{ wordData, loading, error, fetchWordDetails }}>
      {children}
    </WordContext.Provider>
  );
};
