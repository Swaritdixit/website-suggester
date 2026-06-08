const Favourites=require('../models/favorite');
const axios=require('axios');
const {analyzeTaste}=require('../services/aiService');

exports.getRecommendations=async(req,res)=>{

    try{

        const favourites=
        await Favourites.find({
            user:req.user.userId
        });

        if(favourites.length===0){

            return res.json([]);

        }

        const aiResult=
        await analyzeTaste(favourites);

        let profile;

try{

profile = JSON.parse(aiResult);

}
catch(error){

console.log(
"AI JSON parse failed",
aiResult
);

return res.json([]);

}

        let recommendations=[];

        for(const keyword of profile.keywords){

            const response=
            await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${keyword}`
            );

            recommendations.push(
                ...response.data.results
            );

        }

        const uniqueRecommendations=
        [
            ...new Map(
                recommendations.map(
                    item=>[item.id,item]
                )
            ).values()
        ];

        res.json(uniqueRecommendations);

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error generating recommendations"
        });

    }

};