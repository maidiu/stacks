import React, { useRef } from "react";

function ExpandingTextarea() {
  const textRef = useRef();

  const handleInput = () => {
    const el = textRef.current;
    el.style.height = "auto";             // reset height
    el.style.height = el.scrollHeight + "px"; // set to scroll height
  };

  return (
    <textarea
      ref={textRef}
      id='text-input'
      className="expanding-box"
      placeholder="It was a dark and stormy night..."
      onInput={handleInput}
      rows={3}
    />
  );
}

export default ExpandingTextarea;
