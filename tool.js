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
            if(Tool.type(selector) == 'string'&&maybeID&&selector.split(" ").length<0){
                match = rquickExpr.exec( selector );
                //匹配ID 并转成数组
               this[0] = new Array(document.getElementById(match[2]));
            }else{
                this[0] = document.querySelectorAll(selector);
            }
            return this;
        },
        each: function( callback ) {
            return Tool.each(this[0], callback);
        },
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
            for (i = 0; i < elements.length; i++){
                if (callback.call(elements[i], i, elements[i]) === false) return elements
            }
        } else {
            for (key in elements)
                if (callback.call(elements[key], key, elements[key]) === false) return elements
        }
        return elements
    };
    Tool.map = function(elements, callback){
        var value, values = [], i, key;
        if (likeArray(elements))
            for (i = 0; i < elements.length; i++) {
                value = callback(elements[i], i)
                if (value != null) values.push(value)
            }
        else
            for (key in elements) {
                value = callback(elements[key], key)
                if (value != null) values.push(value)
            }
        return flatten(values)
    };
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
        isString:function(obj){
            return Tool.type(obj) == 'string' ? true : false;
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
    Tool.extend({
        /**
         * 传入需要去重的数组
         * @param arr
         * @returns {Array}
         */
       unique:function(arr) {
            var res = [],json = {};
            for(var i = 0; i < arr.length; i++){
                if(!json[arr[i]]){
                    res.push(arr[i]);
                    json[arr[i]] = true;
                }
            }
            var len=res.length, tmp;
            for(var i=0;i<len-1;i++){
                for(var j=0;j<len-1-i;j++){
                    if(res[j]>res[j+1]){
                        tmp = res[j];
                        res[j] = res[j+1];
                        res[j+1] = tmp;
                    }
                }
            }
            return res;
        },
        /**
         * 得到数组中的第一位数
         * @param arr
         * @returns {*}
         */
        first:function(arr){
            return arr[0];
        },
        /**
         * 默认得到除了最后一位的数组，传入参数得到除了末尾N个数的值
         * @param arr
         * @param n
         * @returns {*}
         */
        initial:function(arr,n){
            return Tool.isUndefined(n) ? arr.slice(0,arr.length - 1) : arr.slice(0,arr.length - n);
        },
        rest:function(arr,n){
            return Tool.isUndefined(n) ? arr.slice(1) : arr.slice(n);
        },
        /**
         * 返回数据中最后一位
         * @param arr
         * @param n
         * @returns {*}
         */
        last:function(arr,n){
            return arr[arr.length-1];
        },
        /**
         * 根据数组索引得到值
         * @param arr
         * @param n
         */
        get:function(arr,n){
            return arr[n];
        },
        /**
         * 返回除了自身数以外的数组
         * @param arr 传递的参数为索引
         * @param n
         */
        sibling:function(arr,n){
            var _arr = [];
            Tool.each(arr,function(i,v){
                if(i!=n){
                    _arr.push(v);
                }
            });
            return _arr;
        }
    });

    //日期扩展
    Tool.fn.init.prototype = Tool.fn;
    window.Tool = T = Tool;
})(window);