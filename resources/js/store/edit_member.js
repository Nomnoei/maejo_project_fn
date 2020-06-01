import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
        state:{
          user_id:'',
          url:'http://127.0.0.1:8000/',

        },
        mutations:{ //เก็บ
          setUser_id(state,user_id){
            state.user_id = user_id
          },


        },
        getters:{ //ส่ง
          user_id:state=>state.user_id,
          url:state=>state.url,


        }
});
