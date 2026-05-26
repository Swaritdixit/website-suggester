const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
const Content=require("./models/content");
app.get("/",(req,res)=>{
    res.send("Backend Working");
});
app.get("/content",async (req,res)=>{
    const genre=req.query.genre || "";
    const mood=req.query.mood || "";
    const type=req.query.type || "";
    const search=req.query.search || "";
    const allContent = await Content.find();
    const filtered = await allContent.filter(item =>
    (
        item.title.toLowerCase().includes(search.toLowerCase())
        ||
        item.description.toLowerCase().includes(search.toLowerCase())
    )
    &&
    (
        genre === "" ||
        item.genre.some(g =>
            g.toLowerCase().includes(genre.toLowerCase())
        )
    )
    &&
    (
        mood === "" ||
        item.mood.some(m =>
            m.toLowerCase().includes(mood.toLowerCase())
        )
    )
    &&
    (
        type === "" ||
        item.type.some(t =>
            t.toLowerCase().includes(type.toLowerCase())
        ))
    );
    res.json(filtered);
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});