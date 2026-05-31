const Content=require("../models/content");
exports.getContent=async(req,res)=>{
    const genre=req.query.genre || "";
    const mood=req.query.mood || "";
    const type=req.query.type || "";
    const search=req.query.search || "";
    const allContent = await Content.find();
    const filtered =  allContent.filter(item =>
    (item.title.toLowerCase().includes(search.toLowerCase())
    ||
    item.description.toLowerCase().includes(search.toLowerCase())
    )
    &&
    (genre === "" ||
    item.genre.some(g =>
        g.toLowerCase().includes(genre.toLowerCase())
    )   )
    &&
    (mood === "" ||
    item.mood.some(m =>
        m.toLowerCase().includes(mood.toLowerCase())
    )   )
    &&
    (type === "" ||
    item.type.some(t =>
        t.toLowerCase().includes(type.toLowerCase())
    ))
    );
    res.json(filtered);
};
exports.getTrending=async(req,res)=>{
    const trending=await Content.find().sort({rating:-1}).limit(4);
    res.json(trending);
};