var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){
    var _id = req.url.split('=')[1]
    db.on('connection',function(d){})
    db.getConnection(function(err,connection){
        var _sqlDetail = `select pl.*,ps.name as sort_name from products_list pl left join products_sort ps on pl.sort_id = ps.id where pl.id = ${_id}`
        console.log(_sqlDetail)
        var _sqlLink = 'select * from friend_link'
        connection.query(_sqlLink,function(err,linkArr){
            connection.query(_sqlDetail,function(err,detailMsg){
                res.render('frontend/fdetail', {
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