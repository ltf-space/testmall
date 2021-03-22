import Toast from './Toast'
const obj = {}
obj.install = function(Vue){
  // 1 创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2 new的方式，根据组件构造器，创建一个组件对象
  const toast = new toastContrustor()
  // 3 将组件对象挂载到某一个元素
  toast.$mount(document.createElement('div'))  
  // 4 $el对应的就是这个div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast;
}
export default obj