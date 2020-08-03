//列表
var layuiForm = null;
var layEdit = null;
var layEditIndex = null;
var table = null;
var _checkId = null;
var _sortArr = JSON.parse(result)

layui.use('table', function(){
    table = layui.table;
    var $ = layui.$, active = {
        addNews: function(){ //新增
            handelNews(1)
        },
        editNews: function(){ //编辑
            var checkStatus = table.checkStatus('idnewsListTable'),data = checkStatus.data;
            if(data.length==0){
                layer.msg('请选择一条记录',{icon:5});
                return
            }
            if(data.length>1){
                layer.msg('只能选择一条记录',{icon:5});
                return
            }
            handelNews(2,data[0])
        },
        deleteNews: function(){ //删除
            var checkStatus = table.checkStatus('idnewsListTable'),data = checkStatus.data;
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
                        url:'/news/delelte',
                        type:'post',
                        data:{ids:arr.join(',')},
                        success:function(d){
                            if(d.code==200){
                                layer.msg(d.msg,{icon:1});
                                table.reload('idnewsListTable', {
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
        reloadNews: function(){
            //执行重载
            table.reload('idnewsListTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: {
                        title: $('#newsListTitle').val()
                    }
                }
            }, 'data');
          }
    };
    
    $('.newsListTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $(".sel_scrq").parent().css('overflow', 'visible');

});


function handelNews(_type,checkData){
    var _html = `
        <div class="layui-form addnews" lay-filter="addnews">
            <div class="layui-form-item">
                <label class="layui-form-label">标题</label>
                <div class="layui-input-block">
                    <input type="text" name="title" value="" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">分类</label>
                <div class="layui-input-block addnewsSort">
                    <select name="addnewsSort" lay-filter="addnewsSort" id="addnewsSort" class="layui-select">
                    </select>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">内容</label>
                <div class="layui-input-block addnewsContent">
                    <textarea id="addNews" style="display: none;"></textarea>
                </div>
            </div>
        </div>
    `;
    var _title = _type == 1 ? '新增' : '编辑';
    layer.open({
        title:_title,
        type: 1, 
        area: ['900px', '600px'],
        btn: ['保存', '取消'],
        content: _html,
        yes:function(layerindex){
            
            $('.addnewsContent iframe').contents().find("body").html("<p>是大哥说声</p><p>当时是烦得很</p><p>都是谁</p>")



            var data = layuiForm.val("addnews");

            var content = layEdit.getContent(layEditIndex)
            console.log(content)
            if(!data.title || !data.addnewsSort || !content){
                layer.msg('请完善信息',{icon:5});
                return
            }
            data.content = content
            console.log(data)
            if(_type == 2){
                data.id = _checkId
            }
            $.ajax({
                url:'/news/addNews',
                type:'post',
                data:data,
                success:function(d){
                    if(d.code==200){
                        layer.close(layerindex)
                        layer.msg(d.msg,{icon:1});
                        table.reload('idnewsListTable', {
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
            layui.use(['form','layedit'], function(){
                layuiForm = layui.form;

                layEdit = layui.layedit;
                layEditIndex = layEdit.build('addNews'); //建立编辑器


                var _sortHtml = '<option value=""></option>'
                _sortArr.forEach(function(ele){
                    var _item = `<option value="${ele.id}">${ele.name}</option>`
                    _sortHtml += _item
                })
                $('.addnewsSort select').html(_sortHtml)

                layuiForm.render()


                if(_type == 2){
                    console.log(checkData)
                    layuiForm.val("addnews", {
                       "title": checkData.title,
                       "addnewsSort": checkData.sort
                    });

                    setTimeout(() => {
                        $('.addnewsContent iframe').contents().find("body").html(checkData.content)
                    }, 200);
                    
                    _checkId = checkData.id
                }
            });
        }
    });
}