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

module.exports = router;