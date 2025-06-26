import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';
config();
const router = express.Router();
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPEN_AI_SECRET }));
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
    }
    catch (err) {
        console.error("DALL·E error:", err); // <--- Add this line
        res.status(500).json({ error: 'Image generation failed' });
    }
});
export default router;
//# sourceMappingURL=image-routes.js.map