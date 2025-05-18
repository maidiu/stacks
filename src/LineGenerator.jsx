import React, { useState } from 'react';
import { QuoteGetter } from './QuoteGetter'; // Adjust path as needed

export default function LineGenerator(props) {
  const [loading, setLoading] = useState(false);
  const [line, setLine] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    const res = await QuoteGetter(props.type);
    setLine(res.line); // assuming `res.quote` is a string
    setLoading(false);
  };

  return (
    <div className="line-generator">
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : `Get ${props.type} line`}
      </button>
      {line && <p className="reference-line">“{line}.”</p>}
    </div>
  );
}
