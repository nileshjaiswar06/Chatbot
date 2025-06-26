import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

const router = express.Router();

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_SECRET })
);

router.post('/generate', async (req, res) => {
  console.log("Image generate endpoint hit!");
  const { prompt } = req.body;
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512"
    });
    res.json({ url: response.data.data[0].url });
  } catch (err) {
    res.status(500).json({ error: 'Image generation failed' });
  }
});

export default router;