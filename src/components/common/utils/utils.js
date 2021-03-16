export function debounce(func,delay){//防抖动，减少图片加载
  let timer = null;
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}

export function formatDate(date, fmt) {//利用正则表达式确定时间格式
  // y+ ：至少含有一个y
  // y*：0个或者多个y
  // y?：0个或者一个y
  if (/(y+)/.test(fmt)) {//RegExp.$1代表获取到的y+
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

