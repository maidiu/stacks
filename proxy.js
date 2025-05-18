// proxy.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { refQuoteGetter } from './src/refQuoteGetter.js';
import { readFileSync } from 'fs';

const app = express();
app.use(cors());

refQuoteGetter();

app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url || !url.startsWith('https://www.gutenberg.org')) {
    return res.status(400).send('Invalid or missing URL.');
  }

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch text.');
  }
});

app.get("/referenceQuote", (req, res) => {
  const data = readFileSync("./src/referencequotes.json", "utf-8");
  res.json(JSON.parse(data));
});

app.get("/fictionQuote", (req, res) => {
  const data = readFileSync("./src/fictionquotes.json", "utf-8");
  res.json(JSON.parse(data));
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Proxy running at http://localhost:${PORT}`);
});
