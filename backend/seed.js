const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const Content=require("./models/content");
mongoose.connect(process.env.Mongo_DB)
.then(()=>console.log("Connected to MongoDB"));
const data=[{
    title:"Death Note",
    genre:["Mystery","Thriller"],
    mood:["Dark","Suspenseful"],
    type:["Anime"],
    rating:9,
    image:"images/deathnote.png",
    platforms:["Netflix","Crunchyroll"],
    description:"A genius student discovers a deadly notebook."
},

{
    title:"The Glory",
    genre:["Drama","Revenge"],
    mood:["Dark","Emotional"],
    type:["K-Drama"],
    rating:8.8,
    image:"images/glory.png",
    platforms:["Netflix"],
    description:"A revenge story against school bullies."
},

{
    title:"Modern Family",
    genre:["Comedy"],
    mood:["Happy","Light-hearted"],
    type:["TV Shows"],
    rating:8.5,
    image:"images/modernfamily.png",
    platforms:["Netflix","ABC"],
    description:"A hilarious family sitcom."
},

{
    title:"Interstellar",
    genre:["Sci-Fi","Adventure"],
    mood:["Emotional","Epic"],
    type:["Movies"],
    rating:8.9,
    image:"images/interstellar.png",
    platforms:["Netflix","Amazon Prime"],
    description:"A journey through space and time."
}

];
async function seedData(){
    await Content.deleteMany();
    await Content.insertMany(data);
    console.log("Data seeded successfully");
    mongoose.connection.close();
}
seedData();