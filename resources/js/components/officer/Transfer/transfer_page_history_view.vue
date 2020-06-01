<template>
<div class="container">
<h1 class="text-center mb-3">โอนกรรมสิทธิ์ค่าขยะ</h1>

<div class="container">
    <div class="background-white">
        <div class="transfer_confirm_show_transferee" align=center>
            <font style="color:#555555;" class="h5">{{this.$store.getters.page_history[0].Assignee}} </font>
            <img src="image/right-arrow.png" width="20rem" alt="">
            <font style="color:#555555;" class="h5">{{this.$store.getters.page_history[0].Receive}}</font>
        </div>
    </div>
    <hr>
    <h4 class="text-center">ที่อยู่ในการโอน</h4>

  <div v-for="data in datas" :key="data.index">
    <div class="background-white">
        <div class="transfer_confirm_show_transferee" align=center>
            <font style="color:#555555;" class="h6">{{data.address}}</font>
        </div>
    </div>
    <br>
  </div>

<!-- loop -->
<!--
    <div class="background-white">
        <div class="transfer_confirm_show_transferee" align=center>
            <font style="color:#555555;" class="h6">555 ซอย 5 หมู่ 1 ตำบล 555</font>
        </div>
    </div>
    <br>

    <div class="background-white">
        <div class="transfer_confirm_show_transferee" align=center>
            <font style="color:#555555;" class="h6">555 ซอย 7 หมู่ 5 ตำบล 555</font>
        </div>
    </div>
    <br>
     -->
<!-- - -->

    <!-- <div align=center><button type="button" @click.prevent="black" class="btn btn-outline-success mt-3 btn_bg_white" style="width:8rem;">กลับ</button></div> -->
</div>

  <!-- <h1 v-for="(fruit, index) in $store.getters.user_id" :key="`$store.getters.user_id-${index}`"></h1> -->
  <!-- {{$store.getters.user_id}} -->

</div>
</template>

<script>
import {store} from '../../../store/transfer';
export default {
    name: 'transfer_page_history_view',
    store,
    mounted: function() {
      this.data = this.$store.getters.page_history
      // console.log(this.$store.getters.page_history[0].id_show);
      this.address_data();
    },
    data() {
        return {
          datas:[]
        }
    },
    methods: {
      black(){
        this.$router.go();
      },
      address_data(){
        let headers = {
          headers: {
              "Content-Type":"application/json",
              Accept: "application/json",
              "X-Requested-With":"XMLHttpRequest",
              Authorization: "Bearer " + this.$cookie.get("token")
          }
        };
        let formData = {
          user_id : this.$store.getters.page_history[0].id_show
        };
        axios.post(this.$store.getters.url+"api/TransferAddress",formData,headers).then(response => {
            // console.log(response.data.transfer);
              let list=[];
              $.each(response.data.transfer, function(key, value) {
                   $.each(response.data.address, function(key, value2) {
                     if(value.address_id == value2.id){
                       list.push({address:value2.house_num + " ซอย "+value2.alley+ " หมู่ " +value2.moo+ " ตำบล " + value2.district});
                     }
                      });
                 });
                 this.datas = list;
                 console.log(this.datas);
        });
      }
    }


}
</script>
