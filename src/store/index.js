import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    addList:[]
  },
  mutations:{
    // addCounter(state,payLoad){
    //   console.log(payLoad)
    //   payLoad.count += 1;
    // },
    // addCart(state,payLoad){
    //   state.addList.push(payLoad)
    // }


    addCart(state,payLoad){//context：上下文
      let oldProduct = null;
      for(let item of state.addList){//遍历
        if(item.iid === payLoad.iid){
          oldProduct = item
        }
      }
      if(oldProduct){
        oldProduct.count += 1;
      }else{
        payLoad.count = 1;
        state.addList.push(payLoad)
      }
    }
  },
  // actions:{
  //   addCart(context,payLoad){//context：上下文
  //     let oldProduct = null;
  //     for(let item of state.addList){//遍历
  //       if(item.iid === payLoad.iid){
  //         oldProduct = item
  //       }
  //     }
  //     if(oldProduct){
  //       context.commit('addCounter',oldProduct)//将方法提交到mutations中，在mutations中执行
  //     }else{
  //       payLoad.count = 1;
  //       context.commit('addCart',payLoad)
  //     }
  //   }
  // }
})

export default store