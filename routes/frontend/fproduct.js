var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){

    var _id = req.url.split('=')[1]
    
    db.on('connection',function(d){})
    db.getConnection(function(err,connection){
        var _sqlLink = 'select * from friend_link'
        var _sqlSort = 'select * from products_sort where isbase = 1'
        connection.query(_sqlLink,function(err,linkArr){
            connection.query(_sqlSort,function(err,sortArr){
                var _renderId = _id?_id:sortArr[0].id
                var _productSql = `select * from products_list where sort_id = ${_renderId}`
                connection.query(_productSql,function(err,productArr){
                    res.render('frontend/fproduct', {
                        title: '产品',
                        page:'fproduct',
                        linkArr:linkArr,
                        sortArr:sortArr,
                        productArr:productArr,
                        renderId:_renderId
                    });
                })
                
                connection.release()
            })
        })
    })

})

module.exports = router;