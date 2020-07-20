var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){

    res.render('backend/index', {
        title: '友情链接',
        page:'friendLink',
        user:'admin'
    });
    return
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        var _sql = 'select * from article_sort';
        connection.query(_sql,function(err,result){
            res.render('backend/index', {
                title: '友情链接',
                page:'friendLink',
                user:req.cookies.user,
                result:result
            });
            connection.release()
        })
    })
})

router.get('/getList' , function(req,res,next){
    // if(req.query.key){
    //     var title = req.query.key.title
    //     var sort = req.query.key.sort
    //     var _sql = 'select al.*,sort.sort from article_list al left join article_sort sort on al.sort_id = sort.id  where 1 = 1';
    //     if(title){
    //         _sql += ' and title like "%' + title +'%" '
    //     }
    //     if(sort){
    //         _sql += ' and sort_id = "'+sort+'" '
    //     }
    // }else{
    //     var _sql = 'select al.*,sort.sort from article_list al left join article_sort sort on al.sort_id = sort.id '
    // }
    var _sql = 'select * from friend_link'
    var page = Number(req.query.page)
    var limit = Number(req.query.limit)
    var _start = page*limit-limit
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        connection.query(_sql,function(err,result){
            console.log(result)
            var _length = result.length
            var _result = result.splice(_start,limit)
            _result.forEach(ele => {
                ele.date = new Date(ele.date).toLocaleString()
            });
            res.send({
                code: 0,
                msg: "success",
                count: _length,
                data: _result
            })
            connection.release()
        })
    })
})

router.post('/delelte' , function(req,res,next){
    var ids = req.body.ids
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        var _sql = 'delete from article_list where id in ('+ids+')';
        connection.query(_sql,function(err,result){
            if(result.affectedRows!=0){
                res.send({
                    code:200,
                    msg: '删除成功'
                })
            }else{
                res.send({
                    code:400,
                    msg: '删除失败'
                })
            }
            connection.release()
        })
    })
})

module.exports = router;