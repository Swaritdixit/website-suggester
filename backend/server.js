const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Backend Working");
});

app.get("/test",(req,res)=>{
    res.send("TEST WORKING");
});

const contentRoutes=require("./routes/contentRoutes");
const favouriteRoutes=require("./routes/favouriteRoutes");
const userRoutes=require("./routes/userRoutes");
const recommendationRoutes=require("./routes/recommendationRoutes");
const testRoutes=require("./routes/testRoutes");
const aiRoutes=require("./routes/aiRoutes");
const watchlistRoutes=require("./routes/watchlistRoutes");

app.use("/",userRoutes);
app.use("/",contentRoutes);
app.use("/",favouriteRoutes);
app.use("/",recommendationRoutes);
app.use("/",testRoutes);
app.use("/",aiRoutes);

app.use("/watchlist",watchlistRoutes);

const PORT=process.env.PORT || 3000;

mongoose.connect(process.env.Mongo_DB)
.then(()=>{
    console.log("MongoDB Connected");

    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err=>console.error(err));