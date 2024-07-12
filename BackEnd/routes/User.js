const express = require('express');
const UserController = require('../controllers/UserController');
const handleErrormsg = require('../middleware/handleErrormsg');
const { body } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const UserAuthMiddleWare = require('../middleware/userAuthMiddleware');
const AuthMiddleWare = require('../middleware/authMiddleware')

const upload = require('../harper/upload')

router.get('/me',AuthMiddleWare,UserController.me)
router.post('/login',UserController.login)
router.post('/logout',UserController.logout)
router.post('/register',[
    body('name').notEmpty(),
    body('email').notEmpty(),
    
    //express valiadation 
    body('email').custom(async value => {
        const user = await User.findOne({email:value});
        if (user) {
          throw new Error('E-mail already in use');
        }
      }),
    body('password').notEmpty()
    ],
    handleErrormsg,
    UserController.register)


router.get('/usermanage',UserAuthMiddleWare('admin'),UserController.userIndex); 
  
router.delete('/usermanage/:id',UserAuthMiddleWare('admin'),UserController.delete);

router.get('/me',UserController.me)

router.patch('/:id',UserController.update)


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
handleErrormsg,UserController.upload)

module.exports = router;