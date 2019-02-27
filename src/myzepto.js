require('./zepto/zepto');
require('./zepto/event');
require('./zepto/ajax');
window.Zepto = Zepto;
window.$ === undefined && (window.$ = Zepto);
module.exports = $;
