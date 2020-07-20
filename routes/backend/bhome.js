var express = require('express');
var db = require('../../database/database')
var router = express.Router();

router.get('/' , function(req,res,next){
    res.render('backend/index',{
        title:'首页',
        page:'home',
        user:'admin'
        // user:req.cookies.user
    })
})

router.get('/historyAccess',function(req,res){
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        connection.query('select * from history_access',function(err,result){
            if(err){
                res.send({
                    code:400,
                    result:[]
                })
                return;
            }
            res.send({
                code:200,
                result:result
            })
            connection.release()
        })
    })
})

module.exports = router;