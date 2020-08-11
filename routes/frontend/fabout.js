var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){

    db.on('connection',function(d){})

    db.getConnection(function(err,connection){
        var _sqlLink = 'select * from friend_link'
        var _sqlAbout = 'select * from company_msg where id = 1';
        connection.query(_sqlLink,function(err,linkArr){
            connection.query(_sqlAbout,function(err,aboutMsg){
                res.render('frontend/fabout', {
                    title: '关于我们',
                    page:'fabout',
                    linkArr:linkArr,
                    aboutMsg:aboutMsg[0]
                });
                connection.release()
            })
        })
    })
    
})

module.exports = router;