var express = require('express');
var router = express.Router();
var db = require('../../database/database')
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function(req, file, cb) {
        var fileFormat = file.originalname.split(".");
        var filename = 'product_' + Date.now() + "." + fileFormat[fileFormat.length - 1]
        cb(null, filename)
    }
})
var upload = multer({ storage: storage });

router.get('/list' , function(req,res,next){
    var _sql = 'select * from products_sort'
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        connection.query(_sql,function(err,result){
            res.render('backend/index',{
                title:'产品管理-产品列表',
                page:'productList',
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
        var sort = req.query.key.sort
        // 'select pl.*,ps.id from products_list pl left join products_sort ps on pl.sort_id = ps.id where 1 = 1'
        var _sql = 'select pl.*,ps.name as sort_name from products_list pl left join products_sort ps on pl.sort_id = ps.id where 1 = 1'
        if(title){
            _sql += ' and name like "%' + title +'%" '
        }
        if(sort){
            _sql += ` and sort_id = ${sort}`
        }
        console.log(_sql)
    }else{
        var _sql = 'select pl.*,ps.name as sort_name from products_list pl left join products_sort ps on pl.sort_id = ps.id where 1 = 1'
    }
    var page = Number(req.query.page)
    var limit = Number(req.query.limit)
    var _start = page*limit-limit
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        connection.query(_sql,function(err,result){
            console.log(result)
            var _length = result.length
            var _result = result.splice(_start,limit)
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

router.post('/addList' , function(req,res,next){
    var id = req.body.id
    var obj = {
        id:req.body.id,
        name:req.body.name,
        addSort:req.body.addSort,
        imgUrl:req.body.file,
        description:req.body.desc
    }

    db.on('connection',function(err){})
    if(!id){
        var _sql = 'insert into products_list (name,sort_id,img_url,detail) values (?,?,?,?)'
        var _sqlArr = [obj.name,obj.addSort,obj.imgUrl,obj.description]
    }else{
        var _sql = 'update products_list set name=?,sort_id=?,img_url=?,detail=? where id = ?'
        var _sqlArr = [obj.name,obj.addSort,obj.imgUrl,obj.description,id]
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

router.post('/deleteList' , function(req,res,next){
    var ids = req.body.ids
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        var _sql = 'delete from products_list where id in ('+ids+')';
        connection.query(_sql,function(err,result){
            if(result.affectedRows != 0){
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

router.get('/sort' , function(req,res,next){
    res.render('backend/index',{
        title:'产品管理-产品分类',
        page:'productSort',
        user:req.cookies.user
    })
})

router.get('/getSort' , function(req,res,next){
    if(req.query.key){
        var title = req.query.key.title
        var _sql = 'select * from products_sort where 1 = 1';
        if(title){
            _sql += ' and name like "%' + title +'%" '
        }
    }else{
        var _sql = 'select * from products_sort'
    }
    var page = Number(req.query.page)
    var limit = Number(req.query.limit)
    var _start = page*limit-limit
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        connection.query(_sql,function(err,result){
            var _length = result.length
            var _result = result.splice(_start,limit)
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

router.post('/addSort' , function(req,res,next){
    var id = req.body.id
    var obj = {
        id:req.body.id,
        name:req.body.name,
        imgUrl:req.body.file,
        description:req.body.desc
    }

    db.on('connection',function(err){})
    if(!id){
        var _sql = 'insert into products_sort (name,img_url,description) values (?,?,?)'
        var _sqlArr = [obj.name,obj.imgUrl,obj.description]
    }else{
        var _sql = 'update products_sort set name=?,img_url=?,description=? where id = ?'
        var _sqlArr = [obj.name,obj.imgUrl,obj.description,id]
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

router.post('/deleteSort' , function(req,res,next){
    var ids = req.body.ids
    db.on('connection',function(){})
    db.getConnection(function(err,connection){
        var _sql = 'delete from products_sort where id in ('+ids+')';
        connection.query(_sql,function(err,result){
            if(result.affectedRows != 0){
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

router.post('/uploadImg',upload.single('file'), function(req,res,next){
    var imgName = req.file.filename
    // var _url =  'http://'+req.headers.host+'/images/'+imgName
    var _url = '/images/'+imgName
    console.log(_url)
    res.send({
        code:200,
        url: _url
    })
})

module.exports = router;