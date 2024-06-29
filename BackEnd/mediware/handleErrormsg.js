const { validationResult } = require("express-validator");


const handleErrormsg =(req,res,next)=>{
        const result = validationResult(req);
        if (!result.isEmpty()){
        return res.status(404).json({error : result.mapped()})
        }else{
            next();
        }
}


module.exports = handleErrormsg;