const Favorite = require("../models/Favorite");
const { analyzeTaste } = require("../services/aiService");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

exports.getTasteProfile = async (req, res) => {

    try {

        const favourites = await Favorite.find({
            userId: req.user.userId
        });

        if (favourites.length === 0) {

            return res.json({
                genres: [],
                themes: [],
                keywords: []
            });

        }

        const result =
        await analyzeTaste(favourites);

        res.json(
            JSON.parse(result)
        );

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error generating taste profile"
        });

    }

};

exports.askAI = async (req, res) => {

    try {

        const { prompt } = req.body;

        if (!prompt) {

            return res.status(400).json({
                message: "Prompt is required"
            });

        }

        const favourites =
        await Favorite.find({
            userId: req.user.userId
        });

        const favouriteTitles =
        favourites
            .map(item => item.title)
            .join(", ");

        const response =
        await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: `

You are an entertainment recommendation expert.

User favourites:
${favouriteTitles}

User request:
${prompt}

Recommend 5 movies, anime, TV shows, or K-dramas.

For each recommendation provide:
1. Title
2. Type
3. Short reason

`

        });

        res.json({

            answer: response.text

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error processing AI request"
        });

    }

};