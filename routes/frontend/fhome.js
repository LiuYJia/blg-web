var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){
    db.on('connection',function(d){})
    db.getConnection(function(err,connection){
        var _sqlSort = 'select * from products_sort where isbase = 1';
        var _sqlAbout = 'select * from company_msg where id = 1';
        var _sqlNews = 'select * from news order by time desc limit 6';
        var _sqlKeywords = 'select home_title,home_keyword,home_description from admin where id = 1';
        var _sqlLink = 'select * from friend_link'
        var _sqlCompany= 'select * from company_msg where id = 1'
        connection.query(_sqlSort,function(err,sortArr){
            connection.query(_sqlAbout,function(err,aboutMsg){
                connection.query(_sqlNews,function(err,newsList){
                    connection.query(_sqlKeywords,function(err,pageMsg){
                        connection.query(_sqlLink,function(err,linkArr){
                            connection.query(_sqlCompany,function(err,companyMsg){
                                console.log(companyMsg)
                                res.render('frontend/fhome', {
                                    title: '首页',
                                    page:'fhome',
                                    sortArr:sortArr,
                                    aboutMsg:aboutMsg[0],
                                    newsList:newsList,
                                    pageMsg:pageMsg[0],
                                    linkArr:linkArr,
                                    companyMsg:companyMsg[0]
                                });
                                connection.release()
                            })
                        })
                    })
                })
            })
        })
    })
})

module.exports = router;