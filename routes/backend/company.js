var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var db = require('../../database/database')

router.get('/' , function(req,res,next){
    
    db.on('connection',function(err,connection){})

    db.getConnection(function(err,connection){
        var _sql = 'select * from company_msg'
        connection.query(_sql,function(err,result){
            res.render('backend/index', {
                title: '设置-个人资料',
                page:'company',
                user:req.cookies.user,
                result:JSON.parse(JSON.stringify(result))[0]
            });

            connection.release()
        })
    })
})

router.post('/' , function(req,res,next){

    var id = req.body.id
    var companyName = req.body.companyName
    var address = req.body.address
    var email = req.body.email
    var postCode = req.body.postCode
    var phone = req.body.phone
    var detail = req.body.detail
    var idea = req.body.idea

    db.on('connection',function(err){})
    
    db.getConnection(function(err,connection){
        var _sql = 'update company_msg set company_name=?,address=?,email=?,post_code=?,phone=?,company_detail=?,company_idea=? where id = ?';
        connection.query(_sql,[companyName,address,email,postCode,phone,detail,idea,id],function(err,result){
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