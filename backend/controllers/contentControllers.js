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
    Anime:"anime",
    KDrama:"tv"

};
exports.getContent=async(req,res)=>{
try{
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

}catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};

exports.getTrending=async(req,res)=>{

try{

const response=await axios.get(
`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_KEY}`
);

res.json(response.data.results);

}
catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};
exports.getDetails=async(req,res)=>{

try{

const id=req.params.id;

const media=
req.query.media || "movie";

const response=
await axios.get(
`https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.TMDB_KEY}`
);

res.json(response.data);

}
catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};
exports.getGenres=async(req,res)=>{
    const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}`
    );
    res.json(response.data.genres);
}
