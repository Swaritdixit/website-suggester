const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
const content=[  {
        title:"Glory",
        genre:["Action","Adventure"],
        mood:["Emotional","Epic"],
        type:["K-Drama"],
        rating:8.8,
        image:"images/glory.png",
        platforms:["Netflix","Viki"],
        description:"A gripping revenge drama."
    },

    {
        title:"Death Note",
        genre:["Mystery","Supernatural"],
        mood:["Dark","Suspenseful"],
        type:["Anime"],
        rating:9.0,
        image:"images/deathnote.png",
        platforms:["Netflix","Crunchyroll"],
        description:"A student discovers a deadly notebook."
    }
]
app.get("/",(req,res)=>{
    res.send("Backend Working");
});
app.get("/content",(req,res)=>{
    const genre=req.query.genre || "";
    const mood=req.query.mood || "";
    const type=req.query.type || "";
    const search=req.query.search || "";
    const filtered = content.filter(item =>
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