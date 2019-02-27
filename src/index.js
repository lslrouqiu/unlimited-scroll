
// import $ from './myzepto'
require('./myzepto');
require('./raf')
;(function ($) {
    function unlimitedScroll(element, options) {
      const defaluts = {
        loadHeight: 0,
        upscroll: false, //是否需要上拉加载
        isSrolling: false, //页面是否正在移动
        startY: 0, //开始滑动时的位置
        percentage: 0.2,  //可以刷新时，手指下滑距离和屏幕大小的比例
        upDivId: 'upText',
        downDivId: 'downText',
        upHeight: 100,      //刷新下拉时，元素下移的基础距离
        downHeight: 300     //滑动到距离底部多少距离时开始加载
      }
      //将插件的默认参数及用户定义的参数合并到一个新的obj里
      let settings = $.extend({}, defaluts, options);
      let domCache = [];
      let screenDom = {
        begin: 0,
        end: 0,
        height: 0,
        scrollTop: 0
      };

      //将dom jquery对象赋值给插件，方便后续调用
      let $element = $(element);

      let addId = 0;
      //初始化调用一下

      this.initParam = function() {
        if (settings.upscroll) {
          $element.prepend('<div id = "' + settings.upDivId + '" style = "display:none">下拉刷新</div>');
        }
        if (settings.height) {
         $element.height(settings.height);
          $element.css('overflow-y', 'scroll')
        } else {
         $element.css('height', '100vh').css('overflow-y', 'scroll')
        }
        if (settings.autoLoad) {
          autoLoad();
        }
      };

      this.bindEvent =  function () {
        let flag = false;
        const maxHeight = $element.height()
        const elementHeight = maxHeight * 5;
        /**
        * touchstart事件，获取初始位置
        **/
        function touchStartEvent(e) {
          settings.startY = e.touches[0].clientY;
        }
        /**
         * touchmove事件，在移动过程中，根据移动的距离来更新相应的内容
         **/
        function touchMoveEvent(e) {
          settings.currentY = e.touches[0].clientY - settings.startY;
          const scrollTop = getScrollTop(element);
          const per = settings.currentY / window.screen.height;
          const translate = per * settings.upHeight;
          let i = 0;

          if (!flag) {
            requestAnimationFrame(() => {
              if (settings.currentY > 0) {
                //手指往下滑
                if (scrollTop == 0 && settings.upscroll) {
                  $('#' + settings.upDivId).show();
                  //页面处于最顶部
                  if (per >= settings.percentage) {
                    //滑动到可以刷新的范围
                    $('#' + settings.upDivId).text('释放刷新').show();

                  } else {
                    $('#' + settings.upDivId).text('下拉刷新').show();
                  }
                  $element.css('transform', 'translate(0,' + translate + 'px)')
                }
              }
              flag = false;
            })
            flag = true;
          }

        }
        /**
         * touchend事件，获得最终位置，并进行相关操作
         **/
        function touchEndEvent(e) {
          const scrollDom = settings.scrollDom;
          const currentY = settings.currentY;
          const per = currentY / window.screen.height;
          const scrollTop = getScrollTop(element);
          if (currentY > 0) {
            if (scrollTop == 0 && settings.upscroll) {
              if (per >= settings.percentage) {
                $('#' + settings.upDivId).text('正在刷新...');
                settings.onRefresh().then((resolve) => {
                  let $addDom = $('<div class = "scroll-container" id = "page-' + addId + '">' + resolve.str + '</div>');
                  $(scrollDom).prepend($addDom);
                  let domHeight = $addDom.height();
                  domCache.unshift({ id: "page-" + addId, height: domHeight, src: resolve.str })
                  if (screenDom.height >= elementHeight && elementHeight - screenDom.height + domCache[screenDom.end].height < domHeight) {
                    let endElement = domCache[screenDom.end+1];
                    screenDom.height += (domHeight - endElement.height);
                    $("#" + endElement.id).empty();
                  } else {
                    screenDom.end++;
                    screenDom.height += domHeight;
                  }
                  screenDom.scrollTop = 0;
                  addId++;
                  $('#' + settings.upDivId).text('刷新成功,更新了' + resolve.num + '条数据');
                }).catch((e) => {
                  $('#' + settings.upDivId).text('刷新失败...');
                  $element.css('transition', '330ms').css('transform', 'translate(0,0)');
                });
              }
              setTimeout(function () {
                $('#' + settings.upDivId).hide();
                $element.css('transition', '330ms').css('transform', 'translate(0,0)');
              }, 1000);
            } else {
              let top = scrollTop - screenDom.scrollTop;
              const endElement = domCache[screenDom.end];
              if(screenDom.begin >0){
                if(screenDom.height - top - endElement.height >= 3 * maxHeight){
                  $("#" + endElement.id).empty();
                  screenDom.end --;
                  screenDom.height -= endElement.height;
                }
                if(top < 2 * maxHeight){
                  screenDom.begin--;
                  const beginElement = domCache[screenDom.begin];
                  $("#" + beginElement.id).html(beginElement.src);
                  screenDom.scrollTop -= beginElement.height;
                  screenDom.height +=beginElement.height;
                }
              }

            }
          } else {
            let top = scrollTop - screenDom.scrollTop;
            const beginHeight = domCache[screenDom.begin].height;
            if (domCache.length-1 > screenDom.end) {
              if (top > maxHeight * 2) {
                if (screenDom.height - top < 3 * maxHeight) {
                  screenDom.end++;
                  const endElement = domCache[screenDom.end];
                  $("#" + endElement.id).html(endElement.src);
                  screenDom.height += endElement.height;

                }
                if (top - beginHeight >= 2 * maxHeight) {
                  $("#" + domCache[screenDom.begin].id).height(beginHeight).empty();
                  screenDom.begin++;
                  screenDom.scrollTop += beginHeight;
                  screenDom.height -= beginHeight;
                }
              }

            } else {
              if (getToBottom(element) <= settings.downHeight) {
                settings.onLoad().then((resolve) => {
                  if (resolve.num == 0) {
                    $element.append('<div id = "' + settings.downDivId + '">加载完毕</div>');
                    setTimeout(function () {
                      $('#' + settings.downDivId).remove();
                    }, 1000);
                  } else {
                    let $addDom = $('<div class = "scroll-container" id = "page-' + addId + '">' + resolve.str + '</div>');
                    $(scrollDom).append($addDom);
                    let addHeight = $addDom.height();
                    domCache.push({ id: "page-" + addId, height: addHeight, src:  resolve.str })
                    addId++;
                    if (screenDom.height >= elementHeight && elementHeight - screenDom.height + domCache[screenDom.begin].height < domHeight) {
                      let beginElement = domCache[screenDom.begin];
                      screenDom.height += (addHeight - beginElement.height);
                      $("#" + beginElement.id).height(beginElement.height).empty();
                      screenDom.begin++;
                      screenDom.end++;
                      screenDom.scrollTop += beginElement.height;
                    } else {
                      screenDom.end++;
                      screenDom.height += addHeight;
                    }
                  }
                }).catch((e) => {
                  $element.append('<div id = "' + settings.downDivId + '">加载失败</div>');
                  setTimeout(function () {
                    $('#' + settings.downDivId).remove();
                  }, 1000);
                });
              }
            }
          }
        }
        $element.on('touchstart', touchStartEvent);
        $element.on('touchmove', touchMoveEvent);
        $element.on('touchend', touchEndEvent);
      };

      function autoLoad() {
        let us = this;
        const scrollDom = settings.scrollDom
        if ($(scrollDom).prop('scrollHeight') < $element.height()) {
          settings.onLoad().then((resolve) => {
            if (resolve.num == 0) {
              $element.append('<div id = "' + settings.downDivId + '">加载完毕</div>');
              setTimeout(function () {
                $('#' + settings.downDivId).remove();
              }, 1000);
            } else {
              let $addDom = $('<div class = "scroll-container" id = "page-' + addId + '">' + resolve.str + '</div>');
              $(scrollDom).append($addDom);
              let domHeight = $addDom.height();
              domCache.push({ id: "page-" + addId, height: domHeight, src:  resolve.str })
              screenDom.height += domHeight;
              addId++;
            }
          }).catch(() => {
            $element.append('<div id = "' + settings.downDivId + '">加载失败</div>');
            setTimeout(function () {
              $('#' + settings.downDivId).remove();
            }, 1000);
          });
        }
      }

      function getScrollTop(e) {
        if (e == window) {
          return document.documentElement.scrollTop || document.body.scrollTop;
        }
        return e.scrollTop;
      }

      function getToBottom(e) {
        if (e == window) {
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          return document.documentElement.scrollHeight - document.documentElement.clientHeight - scrollTop;
        }
        return e.scrollHeight - e.clientHeight - e.scrollTop;
      }

    }
    unlimitedScroll.prototype.init = function () {
      let us = this;
      us.initParam();
      us.bindEvent();
    };



  $.fn.unlimitedScroll = function (options) {
    this.each(function () {
      let us =  new unlimitedScroll(this, options);
      us.init()
    })
  };

})(Zepto);
