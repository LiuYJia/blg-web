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
        connection.query(_sqlSort,function(err,sortArr){
            connection.query(_sqlAbout,function(err,aboutMsg){
                connection.query(_sqlNews,function(err,newsList){
                    connection.query(_sqlKeywords,function(err,pageMsg){
                        connection.query(_sqlLink,function(err,linkArr){
                            console.log(newsList)
                            res.render('frontend/fhome', {
                                title: '首页',
                                page:'fhome',
                                sortArr:sortArr,
                                aboutMsg:aboutMsg,
                                newsList:newsList,
                                pageMsg:pageMsg,
                                linkArr:linkArr
                            });
                            connection.release()
                        })
                    })
                })
            })
        })
    })
})

router.get('/link' , function(req,res,next){
    
    var _url = req.url.split('=')[1]
    res.location(`http://${_url}`)
    // res.redirect(301,`http://${_url}`)
    
})


module.exports = router;