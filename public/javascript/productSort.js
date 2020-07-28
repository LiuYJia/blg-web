//列表
var layuiForm = null;
var table = null;
var _checkId = null;
var _imgUrl = null;

layui.use('table', function(){
    table = layui.table;
    var $ = layui.$, active = {
        addSort: function(){ //新增
            handelSort(1)
        },
        editSort: function(){ //编辑
            var checkStatus = table.checkStatus('idproductSortTable'),data = checkStatus.data;
            if(data.length==0){
                layer.msg('请选择一条记录',{icon:5});
                return
            }
            if(data.length>1){
                layer.msg('只能选择一条记录',{icon:5});
                return
            }
            handelSort(2,data[0])
        },
        deleteSort: function(){ //删除
            var checkStatus = table.checkStatus('idproductSortTable'),data = checkStatus.data;
            if(data.length==0){
                layer.msg('请选择一条记录',{icon:5});
                return
            }
            var arr = []
            data.forEach(e => {
                arr.push(e.id)
            });
            $.ajax({
                url:'/product/deleteSort',
                type:'post',
                data:{ids:arr.join(',')},
                success:function(d){
                    if(d.code==200){
                        layer.msg(d.msg,{icon:1});
                        table.reload('idproductSortTable', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                key: {
                                    title: ''
                                }
                            }
                        }, 'data');
                    }else{
                        layer.msg(d.msg,{icon:5});
                    }
                }
            })
        },
        reloadSort: function(){
            console.log(999)
            //执行重载
            table.reload('idproductSortTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: {
                        title: $('#productSortTitle').val()
                    }
                }
            }, 'data');
          }
    };
    
    $('.productSortTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $(".sel_scrq").parent().css('overflow', 'visible');

});


function handelSort(_type,checkData){
    var _html = `
        <div class="layui-form addSort" lay-filter="addSort">

            <div class="layui-form-item">
                <label class="layui-form-label">名称</label>
                <div class="layui-input-block">
                    <input type="text" name="name" value="" required  lay-verify="required" placeholder="请输入名称" autocomplete="off" class="layui-input">
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">图片</label>
                <div class="layui-input-block">
                    <button type="button" class="layui-btn" id="addSortImg">
                        <i class="layui-icon">&#xe67c;</i>选择文件
                    </button>
                </div>
            </div>
            <div class="uploadImg"></div>

            <div class="layui-form-item layui-form-text">
                <label class="layui-form-label">描述</label>
                <div class="layui-input-block">
                    <textarea name="desc" placeholder="请输入描述" class="layui-textarea"></textarea>
                </div>
            </div>

        </div>
    `;
    var _title = _type == 1 ? '新增' : '编辑';
    layer.open({
        title:_title,
        type: 1, 
        area: ['700px', '500px'],
        btn: ['保存', '取消'],
        content: _html,
        yes:function(layerindex){
            var data = layuiForm.val("addSort");
            data.file = _imgUrl

            if(!data.name || !_imgUrl || !data.desc){
                layer.msg('请完善信息',{icon:5});
                return
            }

            if(_type == 2){
                data.id = _checkId
            }

            $.ajax({
                url:'/product/addSort',
                type:'post',
                data:data,
                success:function(d){
                    if(d.code==200){
                        layer.close(layerindex)
                        layer.msg(d.msg,{icon:1});
                        table.reload('idproductSortTable', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                key: {
                                    title: ''
                                }
                            }
                        }, 'data');
                    }else{
                        layer.msg(d.msg,{icon:5});
                    }
                }
            })

            
        },
        success:function(){
            layui.use(['form','upload'], function(){
                layuiForm = layui.form;
                layuiForm.render()

                var upload = layui.upload;
   
                //执行实例
                var uploadInst = upload.render({
                    elem: '#addSortImg', //绑定元素
                    url: '/product/uploadImg', //上传接口
                    // accept: '',
                    done: function(res){
                        if(res.code == 200){
                            _imgUrl = res.url
                            $('.uploadImg').html(`<img src=${res.url}>`)
                        }
                    },
                    error: function(){

                    }
                });


                if(_type == 2){
                    console.log(checkData)
                    layuiForm.val("addSort", {
                       "name": checkData.name,
                       "desc": checkData.description
                    });
                    _imgUrl = checkData.img_url
                    $('.uploadImg').html(`<img src=${checkData.img_url}>`)
                   
                    _checkId = checkData.id
                }
            });
        }
    });
}