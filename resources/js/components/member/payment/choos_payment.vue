<template>

  <div class="container">
      <h1 class="text-center">การชำระเงิน</h1>

        <h3 class="text-center mb-3">{{this.$cookie.get('name')}}</h3>

        <div class="payment_show_price mt-3">
        <p class="text-center h5">

            ยอดชำระในเดือน :  <br>
            จำนวน {{$store.getters.num_home}} หลัง <br>
            <b style="color:red; font-size:5rem;">{{$store.getters.total_money}} ฿</b>
        </p>
    </div>
    <label class="background-white mt-2 w-100">
        <div class="payment_internet_banking">
            <input id="radio_bank_bill" type="radio" name="radio_bank" value="2">
            Credit Card
            <img src="image/visa_mastercard.jpg" width="50rem" alt="" class="float-right">
        </div>
    </label>

    <label class="background-white w-100">
        <div class="payment_internet_banking">
            <input id="radio_bank_bill" checked type="radio" name="radio_bank" value="1">
            โอนเงินผ่านธนาคาร
        </div>
    </label>
    </div>
</template>

<script>
import {store} from '../../../store/index'
    export default {
      name: 'choos_payment',
      store,
      mounted:function(){

      },data(){
        return{

        }
      },
      methods:{

      },




    }
</script>
<style >


</style>
