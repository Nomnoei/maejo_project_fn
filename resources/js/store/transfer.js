import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
        state:{
          url:'http://127.0.0.1:8000/',
          id_assignee:'',
          id_recipient:'',
          assignee:'',
          recipient:'',
          page:'',
          page_history:[],
          index:""

        },
        mutations:{ //เก็บ
          setAssignee(state,assignee){
            state.assignee = assignee
          },
          setAssigneeID(state,id_assignee){
            state.id_assignee = id_assignee
          },
          setRecipient(state,recipient){
            state.recipient = recipient
          },
          setRecipientID(state,id_recipient){
            state.id_recipient = id_recipient
          },
          setPage(state,page){
            state.page = page
          },
          setPageHistory(state,page_history){
            state.page_history = page_history
          },
          setIndex(state,index){
            state.index = index
          },

        },
        getters:{ //ส่ง
          id_assignee:state=>state.id_assignee,
          assignee:state=>state.assignee,
          id_recipient:state=>state.id_recipient,
          recipient:state=>state.recipient,
          page:state=>state.page,
          page_history:state=>state.page_history,
          index:state=>state.index,
          url:state=>state.url,

        }
});
