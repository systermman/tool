/**
 * Created by apple on 16/7/21.
 */
/**
 * 数组操作扩展
 */
;(function(Tool){
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
        },
        /**
         * 将数组转换为对象
         * @param list
         * @param values
         * @returns {{}}
         */
        object:function(list, values) {
            var result = {};
            for (var i = 0, length = list && list.length; i < length; i++) {
                if (values) {
                    result[list[i]] = values[i];
                } else {
                    result[list[i][0]] = list[i][1];
                }
            }
            return result;
        },
        /**
         * 随机从数组中选择一个元素
         * @param {Array} target 目标数组
         * @return {Array}
         */
        random:function (arr){
            return arr[Math.floor(Math.random() * arr.length)];
        },
        /**
         * 对数组进行洗牌
         * @param {Array} target 目标数组
         * @return {Array}
         */
        shuffle:function(arr){
            var j, x, i = arr.length;
            while(i > 0){
                j = Math.floor(Math.random() * i--);
                x = arr[i];
                arr[i] = arr[j];
                arr[j] = x;
            }
            return arr;
        }
    });
})(Tool);