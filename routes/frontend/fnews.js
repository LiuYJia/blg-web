var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){

    db.on('connection',function(d){})

    db.getConnection(function(err,connection){
        var _id = req.url.split('=')[1]
        var _sqlSort = 'select * from products_sort where isbase = 0';
        var _sqlLink = 'select * from friend_link'
        var _sqlNews = 'select * from news where 1 = 1';
        if(_id){
            _sqlNews += ` and sort = ${_id}`
        }
        var _sqlKeywords = 'select home_title,home_keyword,home_description from admin where id = 1';
        connection.query(_sqlLink,function(err,linkArr){
            connection.query(_sqlNews,function(err,newsList){
                connection.query(_sqlSort,function(err,sortArr){
                    connection.query(_sqlKeywords,function(err,pageMsg){
                        res.render('frontend/fnews', {
                            title: '新闻',
                            page:'fnews',
                            linkArr:linkArr,
                            newsList:newsList,
                            sortArr:sortArr,
                            pageMsg:pageMsg[0],
                            renderId:_id
                        });
                        connection.release()
                    })
                })
                
            })
            
        })
    })

})

module.exports = router;