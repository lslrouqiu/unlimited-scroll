# 无限加载下拉滚动条
1. 技术选型(js,zepto,vue)
    - 原生的js获取，操作dom不方便；
    - 由于是移动端的插件，ios的onscroll事件不能实时触发，所以应采用touchstart，touchmove，touchend等一系列事件来完成滚动，故采用对移动端事件支持更好的zepto来完成插件。

2. 参数介绍
```
{

    onRefresh:function(){
    //若upscroll为true则必需，上拉刷新函数，需要返回一个promise函数，加载成功调用resolve({num:插入个数,str:要插入的html})，失败时调用reject();

        var str = "";
        var num = 5;
        for (var i = 0 ; i < 20 ; i++) {
            str += '<li>'+ j++ +'</li>'
        }
        return Promise.resolve({num,str});
    },
    onLoad:function(){
    //必需，下拉加载函数，需要返回一个promise函数，加载成功调用resolve({num:插入个数,str:要插入的html})，失败时调用reject();
        var str = "";
        var num = 5;
        for (var i = 0 ; i < 20 ; i++) {
            str += '<li>'+ j++ +'</li>'
        }
        return Promise.resolve({num,str});
    },
    scrollDom:"#myList",//必选，页面的scroll加载区域
    autoLoad:true,//可选，在scroll区域没有超过高度时是否自动加载
    height: 100 //可选，container的高度，若没填则为屏幕高度
    upscroll: false, //可选，是否需要上拉加载，默认false
    percentage: 0.2,  //可选，可以刷新时，手指下滑距离和屏幕大小的比例，默认0.2
    upHeight: 100,      //可选，刷新下拉时，元素下移的基础距离,默认100
    downHeight: 300     //可选，滑动到距离底部多少距离时开始加载,默认300
}
```

3. 性能优化
    - 使用requestAnimationFrame来避免touchmove事件触发过快，做到函数节流，保证一帧内只执行一次touchmove事件
    - 每次页面加载时，每次展示五个高度的内容，其余内容可将里面的子元素置为空，并设置height防止高度坍塌。
