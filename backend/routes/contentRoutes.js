const express=require("express");
const router=express.Router();
const {
    getContent,
    getTrending,
    getDetails,
    getGenres
}
=require("../controllers/contentControllers");
router.get("/content",getContent);
router.get("/trending",getTrending);
router.get("/details/:id",getDetails);
router.get("/genres",getGenres);
module.exports=router;