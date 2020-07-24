layui.use(['carousel','element','form'], function(){
    var carousel = layui.carousel;
    var form = layui.form;
    form.render()
    //建造实例
    carousel.render({
      elem: '#fhome-carousel',
      width: '95%',
      height:'400px', 
      arrow: 'hover'
    });
});