const Receipe = require("../models/Receipe");

const mongoose = require('mongoose');

const ReceipeController = {
    index :async(req,res)=>{

        let limit = 6;
        let page = req.query.page || 1;
        console.log(page)

        let receipes = await Receipe
        
        .find()
        .skip((page-1) * limit)
        .limit(limit)
        
        .sort({createdAt : -1});

        let totalReceipesCount = await Receipe.countDocuments()
        let totalPagesCount = Math.ceil(totalReceipesCount/limit)
        console.log(totalPagesCount)
        let links ={
            nextPage :totalPagesCount==page?false:true,
            prevPage :page==1? false:true,
            currentPage : page,
            loopableLink :[]
      
        };
        
        for(let index = 0; index<totalPagesCount; index++){
            let number= index+1;
            links.loopableLink.push({number})
            
        }
        console.log(links)
        let response = {
            links,
            data : receipes
        }
        
        res.json(response)

    },

    store : async(req,res)=>{

       
            const {title,description,ingredients} = req.body;
        
            const receipe = await Receipe.create({
                title,
                description,
                ingredients

            })
       
        
            res.json(receipe)
       
        
    },
    show :async(req,res)=>{
        try{
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({mesg:"not a valid id"})

            }

            let receipe = await Receipe.findById(id)
            if (!receipe){
                return res.status(400).json({mesg:"receipe not found"})
            }
            res.json(receipe)

        }catch(e){
            return res.status(500).json({mesg:"internet server error"})
        }

    },
    delete :async(req,res)=>{
         try{
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({mesg:"not a valid id"})

            }

            let receipe = await Receipe.findByIdAndDelete(id)
            if (!receipe){
                return res.status(400).json({mesg:"receipe not found"})
            }
            res.status(200).json(receipe)

        }catch(e){
            return res.status(500).json({mesg:"internet server error"})
        }

    },
    update :async(req,res)=>{
        try{
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({mesg:"not a valid id"})

            }

            let receipe = await Receipe.findByIdAndUpdate(id,{
                ...req.body
            })
            if (!receipe){
                return res.status(400).json({mesg:"receipe not found"})
            }
            res.json(receipe);

        }catch(e){
            return res.status(500).json({mesg:"internet server error"})
        }

      


    }



  
  

};


module.exports= ReceipeController;