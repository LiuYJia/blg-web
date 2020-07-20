//列表
layui.use('table', function(){

    var table = layui.table;
    var $ = layui.$, active = {
        add: function(){ //新增
            console.log(999)
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
            console.log(data)
        },
        delete: function(){ //删除
            var checkStatus = table.checkStatus('idfriendLinkListTable'),data = checkStatus.data;
            if(data.length==0){
                layer.msg('请选择一条记录',{icon:5});
                return
            }
            var arr = []
            data.forEach(e => {
                arr.push(e.id)
            });
            console.log(data)
            $.ajax({
                url:'/friendLinkList/delelte',
                type:'post',
                data:{ids:arr.join(',')},
                success:function(d){
                    console.log(d)
                    if(d.code==200){
                        layer.msg(d.msg,{icon:1});
                        table.reload('idfriendLinkListTable', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                key: {
                                    title: '',
                                    sort: ''
                                }
                            }
                        }, 'data');
                    }else{
                        layer.msg(d.msg,{icon:5});
                    }
                }
            })
        },
        reload: function(){
            //执行重载
            table.reload('idfriendLinkListTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: {
                        title: $('#friendLinkListTitle').val(),
                        // sort:$('#friendLinkListSort').val()
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