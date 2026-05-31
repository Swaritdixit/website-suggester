const express=require("express");
const router=express.Router();
const {
    getContent,
    getTrending
}
=require("../controllers/contentControllers");
router.get("/content",getContent);
router.get("/trending",getTrending);
module.exports=router;