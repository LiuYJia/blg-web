var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){
    var _id = req.url.split('=')[1]
    db.on('connection',function(d){})
    db.getConnection(function(err,connection){
        // var _sqlDetail = `select * from news where id = ${_id}`
        var _sqlDetail = `select pl.*,ps.name as sort_name from news pl left join products_sort ps on pl.sort = ps.id where pl.id = ${_id}`
        var _sqlLink = 'select * from friend_link'
        connection.query(_sqlLink,function(err,linkArr){
            connection.query(_sqlDetail,function(err,detailMsg){
                console.log(detailMsg)
                res.render('frontend/fnewsDetail', {
                    title: '新闻',
                    page:'fdetail',
                    linkArr:linkArr,
                    detailMsg:detailMsg[0]
                });
                connection.release()
            })
        })
    })

})

module.exports = router;