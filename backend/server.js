const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

const contentRoutes=require("./routes/contentRoutes");

const favouriteRoutes=require("./routes/favouriteRoutes");

const userRoutes=require("./routes/userRoutes");

const recommendationRoutes=require("./routes/recommendationRoutes");


app.use("/",userRoutes);
app.use("/",contentRoutes);
app.use("/",favouriteRoutes);
app.use("/",recommendationRoutes);


app.get("/",(req,res)=>{
    res.send("Backend Working");
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.Mongo_DB)
.then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => console.error(err));
const testRoutes=
require("./routes/testRoutes");

app.use(testRoutes);
const aiRoutes=require("./routes/aiRoutes");
app.use("/",aiRoutes);

const watchlistRoutes=require("./routes/watchlistRoutes");
app.use("/",watchlistRoutes);

const detailsRoutes=require("./routes/detailsRouter");
app.use("/",detailsRoutes);

app.get("/", (req,res)=>{
    res.send("Backend Working");
});