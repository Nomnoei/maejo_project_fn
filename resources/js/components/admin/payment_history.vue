<template>
<div class="container">
  <div v-if="show===1">


    <h1 class="text-center mb-3">ประวัติชำระเงิน</h1>

     <b-form-select  id="search" v-model="filter"  :options="options_month"></b-form-select>
     <br><br>

<div class="background-white">
    <b-table
    ref="selectableTable"
    :hover="hover"
    :fixed="fixed"
    :no-border-collapse="noCollapse"
    :items="items"
    :fields="fields"
    :filter="filter"
    :head-variant="headVariant"
    :table-variant="tableVariant"
   >

   <template v-slot:cell(จ่ายแล้ว)="row" class="mt-1">
      <a href="#" @click="show_pay(row.item.date)" class="btn btn-success text-decoration-none" style="color:#fff;"> {{row.item.pay}} </a>
   </template>
   <template v-slot:cell(ยังไม่ได้จ่าย)="row" class="mt-1">
    <a href="#" @click="show_not_pay(row.item.date)" class="btn btn-danger text-decoration-none" style="color:#fff;"> {{row.item.Npay}} </a>
   </template>
   </b-table>
</div>
</div>

<HistoryPaid v-if="show===2" />
<HistoryNotPay v-if="show===3"/>
  <div align=center><button v-if="show===2" @click.prevent="black"  class="btn btn-outline-success mt-3 btn_bg_white" style="width:13.5rem;">
    กลับ
  </button>
  </div>
  <div align=center><button v-if="show===3" @click.prevent="black"  class="btn btn-outline-success mt-3 btn_bg_white" style="width:13.5rem;">
    กลับ
  </button>
  </div>
</div>
</template>

<script>
import HistoryPaid from './payment_history/history_paid'
import HistoryNotPay from './payment_history/history_notpay'
import {store} from '../../store/index'
export default {
    name: 'payment_history',
    store,
    components:{
      HistoryPaid,
      HistoryNotPay
    },
    mounted: function() {
      this.data_paymen()
      if(this.$cookie.get('status_user') == 1 || this.$cookie.get('status_user') == 2){
          this.$router.push("/");
      }


      // PaymentHistoryAdmin

    },
    data() {
     return {
       fields: ['เดือน','จ่ายแล้ว','ยังไม่ได้จ่าย'],
       sortBy: '',
       items: [
         // {เดือน: 'มกราคม 2020',จ่ายแล้ว: '1',ยังไม่ได้จ่าย: '0'},
         // {เดือน: 'กุมภาพันธ 2020์',จ่ายแล้ว: '1',ยังไม่ได้จ่าย: '0'},
         // {เดือน: 'มีนาคม 2020',จ่ายแล้ว: '0',ยังไม่ได้จ่าย: '1'}
       ],
       selected_month:null,
       options_month:[
         { value: null, text: '--- เลือกเดือน ---' },
         { value: '01', text: 'มกราคม' },
         { value: '02', text: 'กุมภาพันธ์' },
         { value: '03', text: 'มีนาคม' },
         { value: '04', text: 'เมษายน' },
         { value: '05', text: 'พฤษภาคม' },
         { value: '06', text: 'มิถุนายน' },
         { value: '07', text: 'กรกฎาคม' },
         { value: '08', text: 'สิงหาคม' },
         { value: '09', text: 'กันยายน' },
         { value: '10', text: 'ตุลาคม' },
         { value: '11', text: 'พฤศจิกายน' },
         { value: '12', text: 'ธันวาคม' },
       ],
       hover: true,
      fixed: false,
       headVariant: 'dark',
      tableVariant: '',
      noCollapse: false,
      rate:'',
      rateState: null,
      show:1,
      filter:null
     }
   },
    methods: {
      data_paymen(){
        let list = [];
        let list2 = [];
        let list3 = [];
        let list4 = [];
        let pay = 0;
        let Npay = 0;
        let headers = {
          headers: {
              "Content-Type":"application/json",
              Accept: "application/json",
              "X-Requested-With":"XMLHttpRequest",
              Authorization: "Bearer " + this.$cookie.get("token")
          }
        };
        axios.get(this.$store.getters.url+"api/PaymentHistoryAdmin","",headers).then(response => {

          // console.log(response.data);
          $.each(response.data.num, function(key, num) {
            let pay = 0;
            let Npay = 0;
            $.each(response.data.payments, function(key, payments) {
              if (num.date == payments.date) {
                  if(payments.status == 2 || payments.status == 4){
                    pay++;
                    // console.log(payments);
                    // console.log("pay"+pay);
                  }
                  if(payments.status == 1 || payments.status == 3){
                    Npay++;
                    // console.log(payments);
                    // console.log("Npay"+Npay);
                  }
                }
            });
            list.push({ date: num.date , Npay:Npay , pay:pay})
          });

          // console.log(list);
          $.each(list, function(key, list) {
            // var currentDate = new Date(list.date).toLocaleString()
            var test = new Date(list.date).getMonth();
            var test2 = new Date(list.date).getYear();
            var Year = test2 + 1900;
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
            var Month = thai_month_arr[test];

            let MonthYear = Month + " " +Year;
              list2.push({ เดือน:MonthYear , จ่ายแล้ว:list.pay , ยังไม่ได้จ่าย:list.Npay , date: list.date , Npay:list.Npay , pay:list.pay })
              // console.log(Month + " ปี " +Year);
          });
          console.log(list2);
          this.items = list2

        });
      },
      show_pay(date){
        this.show = 2;
        this.$store.commit('setPay_date',date)
        // console.log("จ่าย"+date);
      },
      black(){
        this.show = 1;
      },
      show_not_pay(date){
        // console.log("ไม่จ่าย"+date);
        this.show = 3;
        this.$store.commit('setPay_date',date)
      },
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
