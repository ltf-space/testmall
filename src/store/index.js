import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    addList:[]
  },
  getters:{
    cartLength(state){
      return state.addList.length
    },
    addList(state){
      return state.addList
    },
    
  },
  mutations:{
    // addCounter(state,payLoad){
    //   console.log(payLoad)
    //   payLoad.count += 1;
    // },
    // addCart(state,payLoad){
    //   state.addList.push(payLoad)
    // }


    // addCart(state,payLoad){//context：上下文
    //   let oldProduct = null;
    //   for(let item of state.addList){//遍历
    //     if(item.iid === payLoad.iid){
    //       oldProduct = item
    //     }
    //   }
    //   if(oldProduct){
    //     oldProduct.count += 1;
    //   }else{
    //     payLoad.count = 1;
    //     payLoad.checked = true;
    //     state.addList.push(payLoad)
    //   }
    // }
  },
  actions:{
    addCart(context,payLoad){//context：上下文
      return new Promise((resolve,reject) => {
        let oldProduct = null;
        for(let item of context.state.addList){//遍历
          if(item.iid === payLoad.iid){
            oldProduct = item
          }
        }
        if(oldProduct){
          // context.commit('addCounter',oldProduct)//将方法提交到mutations中，在mutations中执行
          
          oldProduct.count += 1;
          resolve('加购成功');
        }else{
          payLoad.count = 1;
          // context.commit('addCart',payLoad)
          
          payLoad.checked = true;
          context.state.addList.push(payLoad)     
          resolve('已成功添加新商品');
        }
      })
      
    }
  }
})

export default store