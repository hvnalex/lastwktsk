import React, { useState, useEffect, useMemo, useCallback, useReducer } from "react";
import "./App.css";

const MAX_CHAR = 200;

const initialState = { text: "", count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_TEXT":
      return { text: action.payload, count: action.payload.length };
    default:
      return state;
  }
}

const useCharacterCount = (initialValue) => {
  const [state, dispatch] = useReducer(reducer, { text: initialValue, count: initialValue.length });

  const updateText = useCallback((text) => {
    if (text.length <= MAX_CHAR) {
      dispatch({ type: "UPDATE_TEXT", payload: text });
    }
  }, []);

  return { ...state, updateText };
};

const CharacterCounter = () => {
  const { text, count, updateText } = useCharacterCount("");
  const warning = useMemo(() => count >= MAX_CHAR * 0.9, [count]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container">
      <h2>Real-Time Character Counter</h2>
      <textarea
        value={text}
        onChange={(e) => updateText(e.target.value)}
        placeholder="Type something..."
      />
      <p className={`counter ${warning ? "warning" : ""}`}>{count}/{MAX_CHAR}</p>
      <div className="progress-bar">
        <div style={{ width: `${(count / MAX_CHAR) * 100}%` }} className="progress" />
      </div>
      <button onClick={copyToClipboard}>Copy to Clipboard</button>
    </div>
  );
};

export default CharacterCounter;
