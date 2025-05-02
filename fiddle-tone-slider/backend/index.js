const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
const cache = new NodeCache({ stdTTL: 300 }); // cache for 5 minutes

app.use(cors());
app.use(express.json());

app.post('/tone', async (req, res) => {
  const { text, tone } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text cannot be empty.' });
  }

  const cacheKey = `${text}-${tone}`;
  if (cache.has(cacheKey)) {
    return res.json({ result: cache.get(cacheKey) });
  }

  try {
    const prompt = `Rewrite the following text in a ${tone} tone:\n\n"${text}"`;
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-small',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const result = response.data.choices[0].message.content;
    cache.set(cacheKey, result);
    res.json({ result });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: 'Tone conversion failed.',
      details: err.message,
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
