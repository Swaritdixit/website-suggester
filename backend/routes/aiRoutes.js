const express=require("express");
const router=express.Router();
const auth=require("../middleware/auth");
const {getTasteProfile,askAI}=require("../controllers/aiController");
router.get("/taste-profile",auth,getTasteProfile);
router.post("/ask-ai",auth,askAI);
module.exports=router;