/**
 * Created by admin on 2016/1/26.
 */
;
(function (window) {

    var Tool = function () {
        return new Tool.prototype.init();
    }
    var class2type = {};
    Tool.fn = Tool.prototype = {
        //构造函数
        init: function () {
            console.log('我是内部构造函数');
            return this;
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
    //全局工具方法
    Tool.extend({
        each: function (objArray, funName) {
            //功能: 用函数 funName 对数组 objArray 中的每个值进行处理一次，
            for (var i = 0; i < objArray.length; i++) {
                funName(i,objArray[i]);
            }
        },
        type:function(e) {
            if ( e == null ) {
                return String( e );
            }
            return typeof e === "object" || typeof e === "function" ?
            class2type[ toString.call(e) ] || "object" :
                typeof e;
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
        isNaN: function (e) {
            return e !== e;
        },
        isNumeric: function( obj ) {
            return !isNaN( parseFloat(obj) ) && isFinite( obj );
        }
    })
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

    Tool.getQueryString = function(Paras){
        return Tool.getQueryParas()[Paras]
    }

    Tool.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });
    Tool.fn.init.prototype = Tool.fn;
    window.Tool = window.$ = Tool;
})(window);

