var express = require('express');
var router = express.Router();

router.get('/' , function(req,res,next){
    res.render('backend/error',{
        title:'404',
        page:'404'
    })
})

module.exports = router;