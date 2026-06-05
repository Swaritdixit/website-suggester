const axios=require("axios");
exports.getDetails = async (req,res)=>{
    try{

        const { id } = req.params;

        if(!/^\d+$/.test(id)){
            return res.status(400).json({
                message:"Invalid movie id"
            });
        }

        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
        );

        res.json(response.data);

    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message:"Server Error"
        });
    }
};