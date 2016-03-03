/**
 * Created by admin on 2016/1/26.
 */
;
(function (window) {
    function likeArray(obj) { return typeof obj.length == 'number' }
    var document = window.document;
    var Tool = function (selector) {
        return new Tool.prototype.init(selector);
    }
    //匹配出省，市，区以及后面的字符串
    var regcity = /(.*)省(.*)市(.*)区(.*)/,
    rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    var class2type = {};
    Tool.fn = Tool.prototype = {
        //构造函数
        init: function (selector) {
            /**
             * 简单封装选择器对象
             * @type {NodeList}
             */
            var found,
                match,
                maybeID = selector[0] == '#',
                maybeClass = !maybeID && selector[0] == '.';
            if(Tool.type(selector) == 'string'&&maybeID){
                match = rquickExpr.exec( selector );
                //匹配ID 并转成数组
               this[0] = new Array(document.getElementById(match[2]));
            }else{
                this[0] = document.querySelectorAll(selector);
            }
            return this;
        }
        length: 0,
        size: function() {
        return this.length;
    },
        constructor: Tool,
        versions: "1.1.0",

    }
    Tool.extend = Tool.fn.extend = function () {
        var name, options,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length;
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    target[name] = options[name];
                }
            }
        }
        return target;
    }

    //对象扩展
    Tool.extend({
        //检索object拥有的所有可枚举属性的名称
        keys : function(obj){
            if(!Tool.isPlainObject(obj)) return [];
            var keys = [];
            for(p in obj){
                if(Tool.hasPrototype(obj,p)){
                    keys.push(p);
                }
            }
            return keys;
        },
        //返回Tool 工具参数自带所有方法
        key : function(obj){
            var ObejctKey = {};
            var obj = obj ? obj : Tool;
            for(p in obj){
                ObejctKey[p] = obj[p];
            }
            return ObejctKey;
        },
        //返回object对象所有的属性值。
        values : function(obj){
            if(!Tool.isPlainObject(obj)) return [];
            var values = [];
            for(p in obj){
                if(Tool.hasPrototype(obj,p)){
                    values.push(obj[p]);
                }
            }
            return values;
        },
    });
    Tool.each = function(elements, callback){
        var i, key;
        //如果是数组
        if (likeArray(elements)) {
            for (i = 0; i < elements.length; i++)
                if (callback.call(elements[i], i, elements[i]) === false) return elements
        } else {
            for (key in elements)
                if (callback.call(elements[key], key, elements[key]) === false) return elements
        }
        return elements
    }
   /* Tool.each = function (objArray, funName) {
            //功能: 用函数 funName 对数组 objArray 中的每个值进行处理一次，
            for (var i = 0; i < objArray.length; i++) {
                funName(i,objArray[i]);
            }
        }*/
    //Tool 类型检测
    Tool.extend({
        type:function(e) {
            if ( e == null ) {
                return String( e );
            }
            return typeof e === "object" || typeof e === "function" ?
            class2type[ toString.call(e) ] || "object" :
                typeof e;
        },
        //检测一个对象是否包含一个建
        /**
         *
         * @param object 需要判断的对象
         * @param name   需要是否存在的键 键参数需为字符串
         * @returns {boolean}
         * var stooge = {name: 'moe', age: 32}; Tool.hasPrototype(stooge,'name') // true
         */
        hasPrototype:function(object,name){
            if(Tool.isPlainObject(object)){
                return object.hasOwnProperty ? object.hasOwnProperty(name) : (name in object);
            }
        },
        //检测对象是否为空
        isEmptyObject: function( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
         },
        //判断是否是window对象
        isWindow: function( obj ) {
            return obj != null && obj == obj.window;
        },
        //判断是否是一个函数
        isFunction: function( obj ) {
            return jQuery.type(obj) === "function";
        },
        //判断是否是数组
        isArray: function (e) {
            return e instanceof Array;
        },
        //判断是否为空
        isNull: function (e) {
            return e === null;
        },
        //判断参数是否未赋值undefined
        isUndefined: function (e) {
            return e === void 0;
        },
        //判断是否无穷大
        isNaN: function (e) {
            return e !== e;
        },
        //判断是否是纯碎的数字
        isNumeric: function( obj ) {
            return !isNaN( parseFloat(obj) ) && isFinite( obj );
        },
        //判断object 是否是原生的DOM 元素
        isElement : function(obj) {
            return !!(obj && obj.nodeType === 1);
         },
        //判断是否是微信
        isWeiXin:function(){
            return /MicroMessenger/i.test(navigator.userAgent);
        },
        //测试对象是否是纯粹的对象
        isPlainObject: function( obj ) {
            //如果参数是对象类型 不是WINDOW对象 没有构造函数
            if(Tool.type(obj) === 'object'&&!Tool.isWindow(obj)&&obj.constructor){
                return true;
            }
                return false;
            
        }
        });
    Tool.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });
    //获取?后面所有参数
    Tool.getQueryParas = function() {
       var url = window.location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            console.log(strs)
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    //返回?后面指定的参数
    Tool.getQueryString = function(Paras){
        return Tool.getQueryParas()[Paras]
    }
    //字符操作扩展
    Tool.extend({
        /**
         *
         * @param number 需要填充的原数值
         * @param slice  需要填充几个数值
         * @param fill   填充的值 默认为字符串‘0’
         * @param beginSlice 大于几位数开始回填
         * @returns {string}
         * Tool.fill(2,3,0) // 002
         */
        fill:function (number, slice, fill, beginSlice) {
            var fills = '';
            var slice = slice ? slice : 2;
            var fill =  fill ? fill :'0';
            var beginSlice = beginSlice ? beginSlice : 0;
            //如果传进来的数小于需要延伸的数
            if (String(number).length < slice) {
                var fillLenght = slice - String(number).length;
                for (var i = 0; i < fillLenght; i++) {
                    fills += '' + fill;
                }
            }
            fills += number;
            return beginSlice > 0 ? fills.slice(0, beginSlice) : fills.slice(-slice);
        },
        /**
         * 返回截取字符串后面带点的数
         * @param str
         * @param number
         * @returns {string}
         * T.intercept('5222055',2) //52220.55
         */
        intercept:function(str,number){
            var number = number ? number : 2;
            var strBeofre = str.substring(0,str.length-number);
            var strAfter = str.substring(str.length-number);
            return strBeofre + '.' + strAfter;
        }
    });

    //数组操作的扩展

    Tool.fn.init.prototype = Tool.fn;
    window.Tool = T = Tool;
})(window);
//浏览器检测
;(function($){
  function detect(ua, platform){
    var os = this.os = {}, browser = this.browser = {},
      webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
      android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
      osx = !!ua.match(/\(Macintosh\; Intel /),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
      iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      win = /Win\d{2}|Windows/.test(platform),
      wp = ua.match(/Windows Phone ([\d.]+)/),
      touchpad = webos && ua.match(/TouchPad/),
      kindle = ua.match(/Kindle\/([\d.]+)/),
      silk = ua.match(/Silk\/([\d._]+)/),
      blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
      bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
      rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
      playbook = ua.match(/PlayBook/),
      chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
      firefox = ua.match(/Firefox\/([\d.]+)/),
      firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
      ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
      webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
      safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes
    if (browser.webkit = !!webkit) browser.version = webkit[1]

    if (android) os.android = true, os.version = android[2]
    if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
    if (wp) os.wp = true, os.version = wp[1]
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (bb10) os.bb10 = true, os.version = bb10[2]
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
    if (playbook) browser.playbook = true
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (silk) browser.silk = true, browser.version = silk[1]
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
    if (chrome) browser.chrome = true, browser.version = chrome[1]
    if (firefox) browser.firefox = true, browser.version = firefox[1]
    if (firefoxos) os.firefoxos = true, os.version = firefoxos[1]
    if (ie) browser.ie = true, browser.version = ie[1]
    if (safari && (osx || os.ios || win)) {
      browser.safari = true
      if (!os.ios) browser.version = safari[1]
    }
    if (webview) browser.webview = true

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
      (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
    os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
      (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
      (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
  }

  detect.call($, navigator.userAgent, navigator.platform)
  // make available to unit tests
  $.__detect = detect

})(Tool);