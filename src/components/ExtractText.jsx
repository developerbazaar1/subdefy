import React from "react";

function ExtractText({ htmlContent }) {
  // Create a function to extract text from HTML
  const extractTextFromHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // Extract text from HTML content
  const extractedText = extractTextFromHTML(htmlContent);

  return (
    <div>
      {/* Render the sanitized text */}
      <div dangerouslySetInnerHTML={{ __html: extractedText }} />
    </div>
  );
}

export default ExtractText;
