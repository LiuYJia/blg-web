//列表
var layuiForm = null;
var layEdit = null;
var layEditIndex = null;
var table = null;
var _checkId = null;
var _sortArr = JSON.parse(result)
console.log(_sortArr)
layui.use('table', function(){
    table = layui.table;
    var $ = layui.$, active = {
        addNews: function(){ //新增
            handelLink(1)
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
            handelLink(2,data[0])
        },
        deleteNews: function(){ //删除
            var checkStatus = table.checkStatus('idnewsListTable'),data = checkStatus.data;
            if(data.length==0){
                layer.msg('请选择一条记录',{icon:5});
                return
            }
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


function handelLink(_type,checkData){
    var _html = `
        <div class="layui-form addnews" lay-filter="addnews">
            <div class="layui-form-item">
                <label class="layui-form-label">标题</label>
                <div class="layui-input-block">
                    <input type="text" name="title" value="" required  lay-verify="required" placeholder="请输入网站名称" autocomplete="off" class="layui-input">
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
                <div class="layui-input-block">
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
            var data = layuiForm.val("addnews");

            var content = layEdit.getContent(layEditIndex)
            console.log(content)
            if(!data.title ){
                layer.msg('请完善信息',{icon:5});
                return
            }

            if(_type == 2){
                data.id = _checkId
            }
            $.ajax({
                url:'/news/handelLink',
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
                    layuiForm.val("addnews", {
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