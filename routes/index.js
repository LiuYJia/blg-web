var express = require('express');
var router = express.Router();

/**
 * 前端路由
 */
router.use('/', require('./frontend/fhome'));// 主页

router.use('/fproduct', require('./frontend/fproduct'));// 产品列表

// router.use('/about', require('./frontend/about'));// 关于我们

// router.use('/fnews', require('./frontend/news'));// 资讯中心

// router.use('/contact', require('./frontend/contact'));// 联系我们

/**
 * 后台路由
 */
router.use('/login', require('./backend/login'));// 登陆

router.use('/home', require('./backend/bhome'));// 主页

router.use('/product', require('./backend/product'));// 产品管理

router.use('/news', require('./backend/news'));// 资讯中心

router.use('/friendLink', require('./backend/friendLink'));// 友情链接

router.use('/adminMessage', require('./backend/adminMessage'));// 个人资料

router.use('/error', require('./backend/error'));// 404

//管理系统请求验证来源以及是否登陆
// router.get('*',function(req,res,next){

//     console.log('*****bbbbbbb*****')
//     console.log(req.headers)
//     console.log('*****bbbbbbb*****')

//     // if(req.headers.host!='59.110.66.89:3000'){
//     //     res.redirect('/error')
//     // }

//     //已登录则匹配管理系统路由
//     var _isLogin = req.cookies.user
//     if(_isLogin){
//         next()
//     }else{
//         res.redirect('/login')
//     }
    
// })

module.exports = router;