const User=require("../models/users");
const bcrypt=require("bcrypt");
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
res.json({message:"Login successful"});
};
