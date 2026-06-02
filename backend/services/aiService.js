const{GoogleGenAI}=require("@google/genai");
const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});
exports.analyzeTaste=async(favourites)=>{
    const favouriteTitles=favourites.map(item=>item.title).join("\n");
    const prompt=`
    Analyze this user's entertainment preferences.
    Favorites:

${favoriteTitles}

Return ONLY valid JSON.

{
    "genres":[],
    "themes":[],
    "keywords":[]
}
`;
const response=await ai.models.generateContent({
    model:"gemini-2.5-flash",
    content:prompt,
});
return response.text;
}