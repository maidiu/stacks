import { useState } from 'react';
import nlp from 'compromise';

export function useLineGenerator({ filterFn, topic = "romance", chunkSize = 2000 }) {
  const [line, setLine] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateLine = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://gutendex.com/books/?topic=${topic}&languages=en`);
      const data = await res.json();
      const count = data.count;

      const randomOffset = Math.floor(Math.random() * count);
      const offsetRes = await fetch(`https://gutendex.com/books/?topic=${topic}&languages=en&offset=${randomOffset}`);
      const offsetData = await offsetRes.json();

      const books = offsetData.results;
      const book = books[Math.floor(Math.random() * books.length)];

      const txtUrl = book.formats['text/plain; charset=utf-8']
        || book.formats['text/plain']
        || Object.entries(book.formats).find(([key]) => key.includes('text/plain'))?.[1];

      if (!txtUrl) {
        setLine("No usable text format found.");
        setLoading(false);
        return;
      }

      const txtRes = await fetch(`http://localhost:4000/proxy?url=${encodeURIComponent(txtUrl)}`);
      const fullText = await txtRes.text();

      const start = fullText.indexOf('*** START');
      const end = fullText.indexOf('*** END');
      const clean = fullText.slice(start, end);

      let filtered = [];
      let attempts = 0;

      while (filtered.length === 0 && attempts < 5) {
        attempts++;

        const sliceStart = Math.floor(Math.random() * (clean.length - chunkSize));
        const chunk = clean.slice(sliceStart, sliceStart + chunkSize);

        const doc = nlp(chunk);
        const sentences = doc.sentences().out('array');
        filtered = filterFn(sentences);
      }

      if (filtered.length === 0) {
        setLine("No suitable lines found after several tries.");
      } else {
        const picked = filtered[Math.floor(Math.random() * filtered.length)];
        setLine(picked.trim());
      }
    } catch (err) {
      console.error(err);
      setLine("Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { line, generateLine, loading };
}
