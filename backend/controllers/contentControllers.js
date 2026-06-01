const Content=require("../models/content");
const axios=require("axios");
const moodMap={

    Happy:[35,10751],

    Exciting:[28,12],

    Dark:[27,80],

    Romantic:[10749],

    Emotional:[18],

    Mystery:[9648,53]

};
const typeMap={
    Movie:"movie",
    Show:"tv",
    Anime:"anime"
};
exports.getContent=async(req,res)=>{

    const search=req.query.search || "";
    const genre=req.query.genre || "";
    const mood=req.query.mood || "";
    const type=req.query.type || "";

    let url="";

    if(search){

        url=
`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_KEY}&query=${search}`;

    }

    else{

        const tmdbType=
        type==="Show" ? "tv" : "movie";

        let genres=[];

        if(genre){
            genres.push(genre);
        }

        if(mood && moodMap[mood]){
            genres.push(...moodMap[mood]);
        }

        url=
`https://api.themoviedb.org/3/discover/${tmdbType}?api_key=${process.env.TMDB_KEY}&with_genres=${genres.join(",")}`;

    }

    const response=
    await axios.get(url);

    res.json(response.data.results);

};

exports.getTrending=async(req,res)=>{
    const response=await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}`
    );
    res.json(response.data.results);

};
exports.getDetails=async(req,res)=>{

    const id=req.params.id;

    const response=await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
    );

    res.json(response.data);

};
exports.getGenres=async(req,res)=>{
    const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}`
    );
    res.json(response.data.genres);
}
