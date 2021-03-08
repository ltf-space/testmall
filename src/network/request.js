import axios from 'axios'

export function request(config){
        const instance = axios.create({
            baseURL:'http://123.207.32.32:8000',
            timeout:5000
        })
        

        //axios拦截器
        // axios.interceptors.request.use()//全局拦截

        //局部拦截
        instance.interceptors.request.use(config =>{
            return config
        },err => {
            // console.log(err);
        })

        instance.interceptors.response.use(res => {
            return res.data//只返回data数据
        },err => {
            // console.log(err);
        })
        
        return instance(config)//内部就是promise的形式
}
