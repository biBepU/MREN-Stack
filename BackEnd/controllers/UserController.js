const User = require("../models/User");

const mongoose = require('mongoose');

const createToken = require('../harper/createToken');
const cookieParser = require("cookie-parser");
const handlePhotoUpload = require('../harper/handlePhotoUpload')
const removeFile = require('../harper/removefile')
const UserController ={
    me: async(req,res)=>{
        return res.json(req.user)
    },
    login : async(req,res)=>{
      try{
        let {email,password} = req.body;
        let user = await User.logIn(email,password)

        //token create
        let token = createToken(user._id)
        res.cookie('jwt',token,{httpOnly:true,maxAge :3*24*60*60*1000}) //cookie create
        
        return res.json({user,token})//user+ token upload
      }catch(e){
        return res.status(400).json({error : e.message})
    }
    },

    register : async(req,res)=>{
        try{
            let {name,email,password} = req.body;

            let user =await User.register(name,email,password) // model register function

            // token create
            let token = createToken(user._id)
            res.cookie('jwt',token,{httpOnly:true,maxAge :3*24*60*60*1000}) //cookie create 
            return res.json({user,token}) //user+ token upload
        }catch(e){
            return res.status(400).json({error : e.message})
        }
    },
   
    logout : async(req,res)=>{

         
        res.cookie('jwt','',{maxAge :1})
        return res.json({message:'user logout'})

      },

      userIndex :async(req,res)=>{

        let limit = 10;
        let page = req.query.page || 1;
        console.log(page)

        let user = await User
        
        .find()
        .skip((page-1) * limit)
        .limit(limit)
        
        .sort({createdAt : -1});

        let totalUsersCount = await User.countDocuments()
        let totalPagesCount = Math.ceil(totalUsersCount/limit)
        console.log(totalPagesCount)
        let links ={
            nextPage :totalPagesCount == page?false:true,
            prevPage :page==1? false:true,
            currentPage : page,
            loopableLink :[]
      
        };
        
        for(let index = 0; index<totalPagesCount; index++){
            let number= index+1;
            links.loopableLink.push({number})
            
        }
       
        let response = {
            links,
            data : user
        }
        
        res.json(response)

    },
    delete :async(req,res)=>{
        try{
           let id = req.params.id;
           if(!mongoose.Types.ObjectId.isValid(id)){
               return res.status(400).json({mesg:"not a valid id"})

           }

           let user = await User.findByIdAndDelete(id)
           if (!user){
               return res.status(400).json({mesg:"user not found"})
           }
           res.status(200).json(user)

       }catch(e){
           return res.status(500).json({mesg:"internet server error"})
       }

   },
   update : async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Not a valid ID" });
        }

        const user = await User.findByIdAndUpdate(id, { ...req.body }, { new: true });
        
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Handle file removal if necessary
        if (req.file) {
            removeFile(__dirname + "/../public" + user.photo);
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
},


upload: async (req, res) => {
    
    await handlePhotoUpload(req, res, User);
  }
   

}





module.exports= UserController;