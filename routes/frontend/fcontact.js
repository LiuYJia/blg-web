var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){
    db.on('connection',function(d){})
    db.getConnection(function(err,connection){
        var _sqlLink = 'select * from friend_link'
        var _sqlCompany= 'select * from company_msg where id = 1'
        connection.query(_sqlLink,function(err,linkArr){
            connection.query(_sqlCompany,function(err,companyMsg){
                res.render('frontend/fcontact', {
                    title: '联系我们',
                    page:'fcontact',
                    linkArr:linkArr,
                    companyMsg:companyMsg[0]
                });
                connection.release()
            })
        })
    })
})

router.post('/submit' , function(req,res,next){
    var obj = {
        name:req.body.name,
        phone:req.body.phone,
        desc:req.body.desc
    }
    db.on('connection',function(err){})
    var _sql = 'insert into feedback (name,phone,suggestion) values (?,?,?)'
    var _sqlArr = [obj.name,obj.phone,obj.desc]
    db.getConnection(function(err,connection){
        connection.query(_sql,_sqlArr,function(err,result){
            if(err){
                console.log(err)
                return
            }
            if(result.affectedRows!=0){
                res.send({
                    code:200,
                    msg:'提交成功'
                })
            }else{
                res.send({
                    code:400,
                    msg:'提交失败'
                })
            }
            connection.release()
        })
    })
})


module.exports = router;