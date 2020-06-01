<template>





<div class="container">


<transferPageHistoryView
      v-if="step"

    />
  <div align=center><button v-if="step" type="button" @click.prevent="black" class="btn btn-outline-success mt-3 btn_bg_white" style="width:8rem;">กลับ</button></div>

<div v-if="!step">



  <h1 class="text-center mb-3">ประวัติการโอนกรรมสิทธิ์ค่าขยะ</h1>

  <div class="input-group mb-3">
        <input type="text" id="search" v-model="filter"  class="form-control" placeholder="ค้นหา..." aria-label="Recipient's username" aria-describedby="button-addon2">

    </div>
    <div class="background-white">
        <b-table
          ref="selectableTable"
        :select-mode="selectMode"
          selectable
          :filter="filter"
         :hover="hover"
         :fixed="fixed"
         :no-border-collapse="noCollapse"
         :items="items"
         :fields="fields"
         @row-selected="onRowSelected"
         :head-variant="headVariant"
         :table-variant="tableVariant"
         responsive="sm"
       ></b-table>
          <!-- selectable -->
    </div>
</div>

</div>

</template>

<script>

import transferPageHistoryView from './Transfer/transfer_page_history_view'
import {store} from '../../store/transfer';
export default {
    name: 'transfer_page_history',
    store,
    mounted: function() {
      if(this.$cookie.get('status_user') == 1){
          this.$router.push("/");
      }
        this.data_Transfer()
    },
    components:{
      transferPageHistoryView
    },
    data() {
     return {
       fields: ['Assignee','Receive', 'Day'],
       items: [
          { day: '2020-03-12', name1: 'Dickerson' ,name2:'patiaprn'},
          { day: '2020-03-12', name1: 'Larsen',name2:'harnpha' }
        ],

        filter: null,
         hover: true,
         fixed: false,
         headVariant: 'dark',
         tableVariant: '',
         noCollapse: false,

         step: false,
         selectMode: 'single',
         selecteddata: [],
         transfer:[],
         transferHistories:[]
     }
   },
    methods: {
        onRowSelected(items){
          this.selecteddata = items
          console.log(this.selecteddata);
          this.$store.commit('setPageHistory',this.selecteddata)
          this.step = true;
        },

        data_Transfer(){
          let headers = {
            headers: {
                "Content-Type":"application/json",
                Accept: "application/json",
                "X-Requested-With":"XMLHttpRequest",
                Authorization: "Bearer " + this.$cookie.get("token")
            }
          };
          let formData = {
            status : "1"
          };
          // this.$store.getters.url+
          axios.post(this.$store.getters.url+"api/showTransferOfficer",formData,headers).then(response => {
                this.transfer = response.data.transfer;
                this.transferHistories = response.data.transferHistories;
                // console.log(response.data.user);
                // console.log(this.transfer);
                // console.log(this.transferHistories);
                let list=[];
                let list2=[];
                let list3=[];
                $.each(response.data.transfer, function(key, value) {
                  $.each(response.data.transferHistories, function(key, value2) {
                    if (value.id_show == value2.id_show) {
                      list.push({id_show:value2.id_show,user_id_receive:value2.user_id_receive,user_id_transfer:value2.user_id_transfer,created_at:value2.created_at});
                      return false
                    }
                   });
                });
                  $.each(list, function(key, value) {
                    $.each(response.data.user, function(key, value2) {
                      if (value.user_id_transfer == value2.id) {
                          list2.push({id_show:value.id_show,user_id_receive:value.user_id_receive,user_id_transfer:value2.name,created_at:value.created_at});
                          return false
                      }
                      });
                   });
                   $.each(list2, function(key, value) {
                     $.each(response.data.user, function(key, value2) {
                       if (value.user_id_receive == value2.id) {
                          var currentDate = new Date(value.created_at).toLocaleString()
                           list3.push({id_show:value.id_show,Receive:value2.name,Assignee:value.user_id_transfer,Day:currentDate});
                           return false
                       }
                       });
                    });


                this.items = list3;
                // console.log(list);
                // console.log(list2);
                // console.log(list3);
          });
        },


        black(){
            this.step = false;
        }
    },
    computed: {
        sortOptions() {
          // Create an options list from our fields
          return this.fields
            .filter(f => f.sortable)
            .map(f => {
              return { text: f.label, value: f.key }
            })
        }
      },


}
</script>
