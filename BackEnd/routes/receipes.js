const express = require('express');

const {body} = require('express-validator');

const ReceipeController = require('../controllers/ReceipeController');

const handleErrormsg = require('../middleware/handleErrormsg');

const upload = require('../harper/upload')





const router = express.Router();



router.get('',ReceipeController.index);


router.post('',[
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('ingredients').notEmpty().isArray({min :2})
    ],handleErrormsg,
    ReceipeController.store)

router.get('/:id',ReceipeController.show)

router.delete('/:id',ReceipeController.delete)


router.patch('/:id',ReceipeController.update)



router.post('/:id/upload',[
    upload.single('photo'),
    body('photo').custom((value,{req})=>{
        if(!req.file){
            throw new Error("photo is required")
        }
        if(!req.file.mimetype.startsWith('image')){
            
            throw new Error ('photo must be image')
        }
        return true;
    })

],
handleErrormsg,ReceipeController.upload)




module.exports = router;