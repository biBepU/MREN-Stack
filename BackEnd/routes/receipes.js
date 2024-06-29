const express = require('express');

const {body} = require('express-validator');

const ReceipeController = require('../controllers/ReceipeController');

const handleErrormsg = require('../mediware/handleErrormsg');

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




module.exports = router;