var layuiForm = null
layui.use(['carousel','element','form'], function(){
    var carousel = layui.carousel;
    layuiForm = layui.form;
    layuiForm.render()
    //建造实例
    carousel.render({
      elem: '#fhome-carousel',
      width: '95%',
      height:'400px', 
      arrow: 'hover'
    });
});


$('.contactSubmit').off('click').on('click',function(){
  var _data = layuiForm.val("contact");
  console.log(_data)
  var _reg1 = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
  if(!_reg1.test(_data.phone)){
    layer.msg('请输入正确的联系方式',{icon:2});
  }
  $.ajax({
    url:'/fcontact/submit',
    type:'post',
    data:_data,
    success:function(d){
        if(d.code==200){
          $('.fhome-contactForm input[name="name"]').val('')
          $('.fhome-contactForm input[name="phone"]').val('')
          $('.fhome-contactForm textarea').val('')
          layer.msg(d.msg,{icon:1});
        }else{
          layer.msg(d.msg,{icon:5});
        }
    }
  })
})