var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){
    res.render('backend/index',{
        title:'资讯中心',
        page:'news',
        user:req.cookies.user
    })
})


router.get('/getList' , function(req,res,next){
    if(req.query.key){
        var title = req.query.key.title
        var _sql = 'select * from news where 1 = 1';
        if(title){
            _sql += ' and title like "%' + title +'%" '
        }
    }else{
        var _sql = 'select * from news'
    }
    var page = Number(req.query.page)
    var limit = Number(req.query.limit)
    var _start = page*limit-limit
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        connection.query(_sql,function(err,result){
            var _length = result.length
            var _result = result.splice(_start,limit)
            _result.forEach(ele => {
                ele.time = new Date(ele.time).toLocaleString()
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

router.post('/handelLink' , function(req,res,next){
    var id = req.body.id
    var obj = {
        id:req.body.id,
        webName:req.body.webName,
        webUrl:req.body.webUrl,
        link:req.body.link,
        date:new Date(),
    }
    db.on('connection',function(err){})
    if(!id){
        var _sql = 'insert into news (web_name,web_url,connect_time,inter_link) values (?,?,?,?)'
        var _sqlArr = [obj.webName,obj.webUrl,obj.date,obj.link]

    }else{
        var _sql = 'update news set web_name=?,web_url=?,connect_time=?,inter_link=? where id = ?'
        var _sqlArr = [obj.webName,obj.webUrl,obj.date,obj.link,id]
    }
    db.getConnection(function(err,connection){
        connection.query(_sql,_sqlArr,function(err,result){
            if(err){
                console.log(err)
                return
            }
            if(result.affectedRows!=0){
                res.send({
                    code:200,
                    msg:'保存成功'
                })
            }else{
                res.send({
                    code:400,
                    msg:'保存失败'
                })
            }
            connection.release()
        })
    })
})

router.post('/delelte' , function(req,res,next){
    var ids = req.body.ids
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        var _sql = 'delete from friend_link where id in ('+ids+')';
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

module.exports = router;