const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
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
    const filtered =  allContent.filter(item =>
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
app.get("/trending",async(req,res)=>{
    const trending=await Content.find().sort({rating:-1}).limit(4);
    res.json(trending);
});
mongoose.connect(process.env.Mongo_DB)

.then(()=>{

    console.log("MongoDB Connected");

    app.listen(3000,()=>{

        console.log("Server is running on port 3000");

    });

})

.catch(err=>console.log(err));