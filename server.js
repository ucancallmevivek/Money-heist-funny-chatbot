require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL_NAME = "mistralai/Mistral-7B-v0.1"; // Change model if needed

if (!API_KEY) {
    console.error("❌ Missing Hugging Face API Key! Add it in .env file.");
    process.exit(1);
}

app.post("/generate", async (req, res) => {
    const userQuery = req.body.query || "Tell me something funny";

    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${MODEL_NAME}`,
            { inputs: userQuery },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Extract generated response
        const resultText =
            response.data?.generated_text || response.data?.[0]?.generated_text || "Professor has no words! 🤔";

        res.json({ response: resultText });
    } catch (error) {
        console.error("Hugging Face API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ response: "Professor is stuck in a vault! 🔒😂" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
