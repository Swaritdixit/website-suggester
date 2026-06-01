const User=require("../models/users");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
exports.signup=async(req,res)=>
{
    try{
        const {username,email,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            username,
            email,
            password:hashedPassword
        });
        res.json({message:"User created successfully"});
    }
    catch(error){
        res.status(500).json({message:"Error creating user"});
    };
}
exports.login=async(req,res)=>
{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
}
const match=await bcrypt.compare(password,user.password);
if(!match){
    return res.status(400).json({message:"Invalid password"});
}
const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);
res.json({message:"Login successful",token});
};
