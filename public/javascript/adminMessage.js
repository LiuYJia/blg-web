layui.use('form', function(){
    var form = layui.form;
    form.on('submit(adminMessageSave)', function(data){
        if(data.field.passWord1 != data.field.passWord2){
            layer.msg('两次密码不一致', {icon: 5});
            return;
        }

        $.ajax({
            type:'post',
            url:'/adminMessage',
            data:data.field,
            success:function(d){
                if(d.code==200){
                    layer.msg('保存成功', {icon: 1});
                }else{
                    layer.msg(d.msg, {icon: 5});
                }
            }
        });
        //自定义验证规则
        form.verify({
            username: function(value){
                if(value.length == 0){
                    return '请输入用户名';
                }
            },
            password1: function(value){
                if(value.length == 0){
                    return '请输入密码';
                }
            },
            password2: function(value){
                if(value.length == 0){
                    return '请再次输入密码';
                }
            }
            // userPassword: [
            //     /^[\S]{6,12}$/,
            //     '密码必须6到12位，且不能出现空格'
            // ]
        });
    });
});
