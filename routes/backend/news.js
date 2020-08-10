var express = require('express');
var router = express.Router();
var db = require('../../database/database')

router.get('/' , function(req,res,next){

    var _sql = 'select * from products_sort where isbase = 0'
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        connection.query(_sql,function(err,result){
            res.render('backend/index',{
                title:'资讯中心',
                page:'news',
                user:req.cookies.user,
                result:result
            })
            connection.release()
        })
    })
    
})


router.get('/getList' , function(req,res,next){
    if(req.query.key){
        var title = req.query.key.title
        var _sql = 'select pl.*,ps.name as sort_name from news pl left join products_sort ps on pl.sort = ps.id where 1 = 1'
        // var _sql = 'select * from news where 1 = 1';
        if(title){
            _sql += ' and title like "%' + title +'%" '
        }
    }else{
        var _sql = 'select pl.*,ps.name as sort_name from news pl left join products_sort ps on pl.sort = ps.id'
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

router.post('/addNews' , function(req,res,next){
    var id = req.body.id
    var obj = {
        id:req.body.id,
        name:req.body.title,
        addnewsSort:req.body.addnewsSort,
        content:req.body.content,
        contentTxt:req.body.contentTxt,
        time:new Date()
    }
    db.on('connection',function(err){})
    if(!id){
        var _sql = 'insert into news (title,sort,content,time,content_txt) values (?,?,?,?,?)'
        var _sqlArr = [obj.name,obj.addnewsSort,obj.content,obj.time,obj.contentTxt]
    }else{
        var _sql = 'update news set title=?,sort=?,content=?,time=?,content_txt=? where id = ?'
        var _sqlArr = [obj.name,obj.addnewsSort,obj.content,obj.time,obj.contentTxt,id]
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
        var _sql = 'delete from news where id in ('+ids+')';
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