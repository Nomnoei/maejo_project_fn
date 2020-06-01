<template>

  <div class="container">
    <h1 class="text-center">การชำระเงิน</h1>

    <div class="background-white" v-if="show">

    <b-table
    stacked
    :fixed="fixed"
     ref="selectableTable"
     selectable
     :hover="hover"
     :borderless="borderless"
     :select-mode="selectMode"
     :items="items"
     :fields="fields"
     :busy="isBusy"
     @row-selected="onRowSelected"
     thead-class="hidden_header"
      >

      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:cell(address)="row" class="mt-1">
        <img src="image/house.png" width="20rem" alt=""> {{row.item.address}}

      </template>
      <template v-slot:cell(price)="row" class="mt-1">
        <font style="color:red;" class="float-right mr-1"><b>{{row.item.price}} ฿</b></font>

      </template>

      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>



    </b-table>

    <div class="payment_show_price mt-3">
  <p class="text-center h5">
    ยอดชำระในเดือน : {{this.thai_month}} <br>
    จำนวน {{this.selected.length}} หลัง <br>
    <b style="color:red; font-size:5rem;">{{sum_price}} ฿</b>
  </p>
</div>


  </div>
  <div class="background-white" v-else>
          <div class="mt-2" align=center>
            <img src="image/no-stopping.png" alt="" width=100rem>
            <h3 class="mt-2">ไม่มีการค้างชำระเงิน</h3>
        </div>
      </div>
  </div>



    </div>


</template>

<script>
    export default {
      name: 'Payment',
      created(){
        this.data_address()
        // this.items = this.score
        this.get_month_th()
      },
      mounted:function(){

        // console.log(this.score);
        setTimeout(() => this.$refs.selectableTable.selectAllRows(), 800);

      },
      props: {

          }
      ,data(){
        return{
           fields: ['address','price','selected'],

        items: [
          // { id:"1" , address: "555 ซอย 7 หมู่ 5 ตำบล 555",price:50 },
          // { id:"2" , address: "555 ซอย 7 หมู่ 5 ตำบล 555",price:50 },
          // { id:"3" , address: "555 ซอย 7 หมู่ 5 ตำบล 555",price:50 },
          // { id:"4" , address: "555 ซอย 7 หมู่ 5 ตำบล 555",price:50 }

        ],
        // items:[],
        isBusy: true,
          thai_month:"",
          hover: true,
           borderless: true,
           fixed: true,
          selectMode: 'multi',
          selected: [],
          selectAll: false,
          show:true

        }
      },
      methods:{


          onRowSelected(items){
              this.selected = items
              this.$store.commit('setNum_home',this.selected.length)
              this.$store.commit('setTotal_money',this.sum_price)
              this.$store.commit('setData_pay',this.selected)
              // this.$refs.selectableTable.clearSelected()
              console.log(this.selected);

          },
          get_month_th(){
            var test = new Date().getMonth();

            let thai_month_arr = [
              "มกราคม",
               "กุมภาพันธ์",
               "มีนาคม",
               "เมษายน",
               "พฤษภาคม",
               "มิถุนายน",
               "กรกฎาคม",
               "สิงหาคม",
               "กันยายน",
               "ตุลาคม",
               "พฤศจิกายน",
               "ธันวาคม"
            ];
            this.thai_month = thai_month_arr[test];
            // console.log(thai_month_arr[test]);

          },
          data_address(){
            let headers = {
              headers: {
                  "Content-Type":"application/json",
                  Accept: "application/json",
                  "X-Requested-With":"XMLHttpRequest",
                  Authorization: "Bearer " + this.$cookie.get("token")
              }
            };
              let formData = {
                id : this.$cookie.get("user_id"),
                status_user: "1",
                status_address: "1",
                status_payments: "1",
                mode:"1"
            };
            let list=[];
            axios.post(this.$store.getters.url+"api/SelectPay",formData,headers).then(response => {
              $.each(response.data.payments, function(key, value) {
                  $.each(response.data.address, function(key, value2) {
                    if (value.address_id == value2.id) {
                      var price_total = Number(value.price) + Number(value.price_old)
                      list.push({id:value.payment_id,address_id:value.address_id,address:value2.house_num + " ซอย " +value2.alley+ " หมู่ " +value2.moo+ " ตำบล " +value2.district,price:price_total});
                    }
                   });
                 });
                 if (list.length == 0) {
                    this.show = false
                 }else {
                   this.items = list
                   this.isBusy = false
                 }


            });
            // this.$refs.selectableTable.selectAllRows()
          }


      },
      computed:{
        sum_price(){
          var sum = this.selected.reduce(function(value, data){
              return value + Number(data.price)
          },0);
          return sum
        }
      },



      updated(){

      }



    }
</script>
<style >

.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
/* background-color: #CEF130; */
}
.b-table-row-selected {
  /* background-color: #CEF130; */
}

</style>
