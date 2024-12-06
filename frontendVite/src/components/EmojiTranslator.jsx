import React, { useState, useEffect } from "react";

// Emoji mapping for AZERTY keyboard
const emojiKeyboard = {
  row1: ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
  row2: ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
  row3: ["w", "x", "c", "v", "b", "n"],
};

// Emoji dictionary mapped to letters
const emojiDictionary = {
  a: "😀",
  z: "😂",
  e: "😍",
  r: "🤔",
  t: "😎",
  y: "🤯",
  u: "😱",
  i: "🤩",
  o: "😴",
  p: "🥳",
  q: "😇",
  s: "🤪",
  d: "😏",
  f: "😳",
  g: "🤭",
  h: "😌",
  j: "🤬",
  k: "🥺",
  l: "💕",
  m: "🌟", // Change 'm' to a new emoji (e.g., "🌟")
  w: "🤓",
  x: "😈",
  c: "🤡",
  v: "💩",
  b: "👻",
  n: "🤖",
};

const EmojiTranslator = () => {
  const [inputText, setInputText] = useState(""); // Text with emojis
  const [actualText, setActualText] = useState(""); // Original text without emojis
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Handle letter addition and emoji conversion
  const addLetter = (letter) => {
    const emoji = emojiDictionary[letter.toLowerCase()];
    if (emoji) {
      setInputText((prev) => prev + emoji); // Display emoji in input
      setActualText((prev) => prev + letter); // Store actual letter for label
    }
  };

  // Handle text input change (manual editing)
  const handleTextChange = (e) => {
    const text = e.target.value;

    // Prevent remapping of input text to incorrect emojis
    setInputText(text);

    const convertedActualText = Array.from(text)
      .map((char) => {
        // Find corresponding letter for each character
        const foundLetter = Object.keys(emojiDictionary).find(
          (key) => emojiDictionary[key] === char
        );
        return foundLetter ? foundLetter : char; // Return letter or original char if not an emoji
      })
      .join("");

    setActualText(convertedActualText);
  };

  // Physical keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isInputFocused) {
        const letter = e.key.toLowerCase();

        if (emojiDictionary[letter]) {
          e.preventDefault(); // Prevent default action to avoid double input
          addLetter(letter); // Add emoji if the letter is in the emoji dictionary
        } else if (e.key === " ") {
          // Handle space separately to preserve both text and emoji
          setInputText((prev) => prev + " ");
          setActualText((prev) => prev + " ");
        }
      }
    };

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInputFocused]);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "1rem",
        backgroundColor: "#f1f1f1",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Emoji Translator
      </h1>

      {/* Label displaying actual text */}
      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        Actual Text:
        <span style={{ fontWeight: "bold", marginLeft: "0.5rem" }}>
          {actualText}
        </span>
      </label>

      {/* Text Input */}
      <input
        type="text"
        value={inputText}
        onChange={handleTextChange}
        placeholder="Type letters..."
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        style={{
          width: "100%",
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginBottom: "1rem",
          fontSize: "1rem",
        }}
        autoFocus
      />

      {/* Emoji Display */}
      <div
        style={{
          padding: "0.5rem",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          minHeight: "50px",
          fontSize: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        {inputText || "Emoji translation will appear here"}
      </div>

      {/* Emoji Keyboard */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {Object.keys(emojiKeyboard).map((rowKey) => (
          <div
            key={rowKey}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.25rem",
            }}
          >
            {emojiKeyboard[rowKey].map((letter) => (
              <button
                key={letter}
                onClick={() => addLetter(letter)}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "1.5rem",
                  transition: "transform .2s, box-shadow .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow =
                    "0px 4px 10px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {emojiDictionary[letter]}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1rem", color: "#6b7280", textAlign: "center" }}>
        💡 Tip: You can also use your physical keyboard to type and generate
        emojis!
      </div>
    </div>
  );
};

export default EmojiTranslator;
