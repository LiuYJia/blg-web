var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){

    db.on('connection',function(d){})

    db.getConnection(function(err,connection){
        var _sql = 'select * from products_sort where isbase = 1';
        connection.query(_sql,function(err,result){
            res.render('frontend/fhome', {
                title: '首页',
                page:'fhome',
                result:result
            });
            connection.release()
        })
    })

    
})

module.exports = router;