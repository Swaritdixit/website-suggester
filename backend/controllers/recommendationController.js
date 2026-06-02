const Favourites=require('../models/favorite');
const axios=require('axios');
exports.getRecommendations=async(req,res)=>{
    const favourites=await Favourites.find({
        userId:req.user.userId
    });
    if(favourites.length===0){
        return res.status(200).json({
            recommendations:[]
        });
    }
    const genreCount={};
    for(const item of favourites)
    {
        try{
            const response=await axios.get(`https://api.themoviedb.org/3/${item.mediaType}/${item.tmdbId}?api_key=${process.env.TMDB_KEY}`);
            response.data.genres.forEach(genre=>{
                genreCount[genre.id]=(genreCount[genre.id] || 0)+1;
            });
        }
        catch(error){
            console.error('Error fetching TMDB data:', error);
        }
    }
    const topGenres=Object.entries(genreCount)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,3)
    .map(item=>item[0]);
    const recommendations=
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&with_genres=${topGenres.join(",")}`);
    res.json(recommendations.data.results);
};
    