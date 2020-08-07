var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){

    // db.on('connection',function(d){})

    // db.getConnection(function(err,connection){
    //     var _sql = 'select * from test';
    //     connection.query(_sql,function(err,result){
            
    //         connection.release()
    //     })
    // })

    res.render('frontend/fcontact', {
        title: '联系我们',
        page:'fcontact'
    });

})

module.exports = router;