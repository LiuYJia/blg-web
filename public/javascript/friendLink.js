//列表
var layuiForm = null;
var table = null;
var _checkId = null;

layui.use('table', function(){
    table = layui.table;
    var $ = layui.$, active = {
        add: function(){ //新增
            handelLink(1)
        },
        edit: function(){ //编辑
            var checkStatus = table.checkStatus('idfriendLinkListTable'),data = checkStatus.data;
            if(data.length==0){
                layer.msg('请选择一条记录',{icon:5});
                return
            }
            if(data.length>1){
                layer.msg('只能选择一条记录',{icon:5});
                return
            }
            handelLink(2,data[0])
        },
        delete: function(){ //删除
            var checkStatus = table.checkStatus('idfriendLinkListTable'),data = checkStatus.data;
            if(data.length==0){
                layer.msg('请选择一条记录',{icon:5});
                return
            }
            layer.open({
                title:'提示',
                btn: ['确定', '取消'],
                content: '您确定删除吗？',
                yes:function(index, layero){
                    var arr = []
                    data.forEach(e => {
                        arr.push(e.id)
                    });
                    $.ajax({
                        url:'/friendLink/delelte',
                        type:'post',
                        data:{ids:arr.join(',')},
                        success:function(d){
                            if(d.code==200){
                                layer.msg(d.msg,{icon:1});
                                table.reload('idfriendLinkListTable', {
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
                no:function(index, layero){
                    layer.close(index)
                }
            });
        },
        reload: function(){
            //执行重载
            table.reload('idfriendLinkListTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: {
                        title: $('#friendLinkListTitle').val()
                    }
                }
            }, 'data');
          }
    };
    
    $('.friendLinkListTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $(".sel_scrq").parent().css('overflow', 'visible');

});


function handelLink(_type,checkData){
    var _html = `
        <div class="layui-form addFriendLink" lay-filter="addFriendLink">
            <div class="layui-form-item">
                <label class="layui-form-label">网站名称</label>
                <div class="layui-input-block">
                    <input type="text" name="webName" value="" required  lay-verify="required" placeholder="请输入网站名称" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">网址</label>
                <div class="layui-input-block">
                    <input type="text" name="webUrl" value="" required  lay-verify="required" placeholder="请输入网址" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">是否互链</label>
                <div class="layui-input-block">
                    <input type="radio" name="link" value="1" title="是">
                    <input type="radio" name="link" value="0" title="否">
                </div>
            </div>
        </div>
    `;
    var _title = _type == 1 ? '新增' : '编辑';
    layer.open({
        title:_title,
        type: 1, 
        area: ['500px', '300px'],
        btn: ['保存', '取消'],
        content: _html,
        yes:function(layerindex){
            var data = layuiForm.val("addFriendLink");
            if(!data.webName || !data.webUrl || !data.link){
                layer.msg('请完善信息',{icon:5});
                return
            }

            if(_type == 2){
                data.id = _checkId
            }
            $.ajax({
                url:'/friendLink/handelLink',
                type:'post',
                data:data,
                success:function(d){
                    if(d.code==200){
                        layer.close(layerindex)
                        layer.msg(d.msg,{icon:1});
                        table.reload('idfriendLinkListTable', {
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
            layui.use('form', function(){
                layuiForm = layui.form;
                layuiForm.render()
                if(_type == 2){
                    layuiForm.val("addFriendLink", {
                       "webName": checkData.web_name,
                       "webUrl": checkData.web_url,
                       "link": checkData.Inter_link == '是' ?  1 : 0
                    });

                    _checkId = checkData.id
                }
            });
        }
    });
}