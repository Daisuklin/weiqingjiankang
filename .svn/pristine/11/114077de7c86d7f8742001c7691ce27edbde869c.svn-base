/**
 * Created by leimingtech-lhm on 2017/6/16.
 */

//数据类型转换
export function changeTwoDecimal_f (x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        return 0;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

//进度显示
export function progressSum(x,y){
    if(x==0){
        return 0;
    }else {
        return x/y;
    }
}