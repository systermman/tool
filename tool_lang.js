/**
 * Created by apple on 16/7/21.
 */
/**
 * 字面量对象扩展
 */
;(function(Tool){
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
})(Tool);