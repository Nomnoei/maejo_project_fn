<template>

  <div class="container">

        <SelectPay  v-if="step===1"></SelectPay>
        <ChoosPayment v-if="step===2" />
        <BankTransfer v-if="step===3"/>

        <div v-if="show">
        <div align=center><button v-if="step!==3" @click.prevent="next" type="submit" class="btn btn-outline-success mt-3 btn_bg_white" style="width:13.5rem;">
        <div v-if="step===1">
              ชำระเงิน
        </div>
        <div v-if="step===2">
          ดำเนินการต่อ
        </div>
        </button></div>
        </div>

    </div>


</template>

<script>
import SelectPay from './payment/select_pay'
import ChoosPayment from './payment/choos_payment'
import BankTransfer from './payment/bank_transfer'
    export default {
      name: 'Payment',
      mounted:function(){
        this.data_address()


      },components:{
              SelectPay,
              ChoosPayment,
              BankTransfer
          },
          data(){
        return{
           step: 1,
           items:[],
           show:true
        }
      },
      methods:{
        next(){
          this.step = this.step === 4 ? 1 :this.step + 1;
          console.log(this.step);
        },
        black(){
          this.step = this.step !== 4 ? 1 :this.step - 1;
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
               // console.log(list);
               if (list.length == 0) {
                  this.show = false
               }



          });
          // this.$refs.selectableTable.selectAllRows()
        }


      },
      computed:{

      }



    }
</script>
<style >


</style>
