const{GoogleGenAI}=require("@google/genai");
const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});
exports.analyzeTaste=async(favourites)=>{
    const favoriteTitles=favourites.map(item=>item.title).join(",");
   const prompt=`
Analyze these favorites:

${favoriteTitles}

Return ONLY JSON.

{
    "genres":[],
    "themes":[],
    "keywords":[]
}
`;
const response=await ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents:prompt
});
return response.text;
};