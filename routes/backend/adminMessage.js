var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var db = require('../../database/database')

router.get('/' , function(req,res,next){
    
    db.on('connection',function(err,connection){})

    db.getConnection(function(err,connection){
        var _sql = 'select * from admin'
        connection.query(_sql,function(err,result){
            res.render('backend/index', {
                title: '设置-个人资料',
                page:'adminMessage',
                user:req.cookies.user,
                result:JSON.parse(JSON.stringify(result))[0]
            });

            connection.release()
        })
    })
})

router.post('/' , function(req,res,next){

    var id = req.body.id
    var title = req.body.title
    var keywords = req.body.keywords
    var desc = req.body.desc
    var userName = req.body.userName
    var passWord = req.body.passWord1
    db.on('connection',function(err){})
    
    db.getConnection(function(err,connection){
        var _sql = 'update admin set home_title=?,home_keyword=?,home_description=?,name = ?,password = ? where id = ?';
        var md5 = crypto.createHash("md5");
        var newPass = md5.update(passWord).digest("hex");
        connection.query(_sql,[title,keywords,desc,userName,newPass,id],function(err,result){
            if(result.affectedRows==1){
                res.send({
                    code:200,
                    msg:'保存成功'
                })
            }else{
                res.send({
                    code:400,
                    msg:'保存错误'
                })
            }
            connection.release()
        })
    })
})

module.exports = router;