var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){

    db.on('connection',function(d){})

    db.getConnection(function(err,connection){
        var _sqlLink = 'select * from friend_link'
        connection.query(_sqlLink,function(err,linkArr){
            res.render('frontend/fnews', {
                title: '新闻',
                page:'fnews',
                linkArr:linkArr
            });
            connection.release()
        })
    })

})

module.exports = router;