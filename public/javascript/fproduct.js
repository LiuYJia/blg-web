layui.use(['element'], function(){
    var element = layui.element;
    //获取hash来切换选项卡，假设当前地址的hash为lay-id对应的值
    var layid = location.hash.replace(/^#productList=/, '');
    element.tabChange('productList', layid); //假设当前地址为：http://a.com#test1=222，那么选项卡会自动切换到“发送消息”这一项
  
    //监听Tab切换，以改变地址hash值
    element.on('tab(productList)', function(){
        console.log(111)
        console.log(this.getAttribute('lay-id'))
    });
});