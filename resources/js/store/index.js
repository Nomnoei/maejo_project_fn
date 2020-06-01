import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
        state:{
          url:'http://127.0.0.1:8000/',
          success:'',
          user_id:'',
          name:'',
          tel:'',
          status:'',
          user_id_re:'',
          num_home:'',
          total_money:'',
          pay_date:'',
          data_pay:[]
        },
        mutations:{ //เก็บ
          setUrl(state,url){
            state.url = url
          },
          setSuccess(state,success){
            state.success = success
          },
          setUser_id(state,user_id){
            state.user_id = user_id
          },
          setUser_id_re(state,user_id_re){
            state.user_id_re = user_id_re
          },
          setName(state,name){
            state.name = name
          },
          setTel(state,tel){
            state.tel = tel
          },
          setStatus(state,status){
            state.status = status
          },
          setNum_home(state,num_home){
            state.num_home = num_home
          },
          setTotal_money(state,total_money){
            state.total_money = total_money
          },
          setPay_date(state,pay_date){
            state.pay_date = pay_date
          },
          setData_pay(state,data_pay){
            state.data_pay = data_pay
          }
        },
        getters:{ //ส่ง
          url:state=>state.url,
          success:state=>state.success,
          user_id:state=>state.user_id,
          name:state=>state.name,
          tel:state=>state.tel,
          status:state=>state.status,
          num_home:state=>state.num_home,
          total_money:state=>state.total_money,
          data_pay:state=>state.data_pay,
          pay_date:state=>state.pay_date
        }
});
