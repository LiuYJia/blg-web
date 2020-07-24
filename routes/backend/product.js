var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){
    res.render('backend/index',{
        title:'产品管理',
        page:'product',
        user:req.cookies.user
    })
})

module.exports = router;