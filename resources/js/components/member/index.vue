<template>

  <div class="container">
    <div class="background-white-img">
          <img src="image/img_bin.png" class="rounded mx-auto d-block" alt="Responsive image">
      </div>

        <h1 align=center class="mt-3">การบริการ</h1>

        <div class="select_menu_member">
          <div class=""></div>

          <div class="menu_button">
              <a href="/Payment">
                  <img src="image/k-payment-gateway.jpg" class="rounded mx-auto d-block" alt="Responsive image">
                  <h3>ชำระเงิน</h3>
                  <h5>ชำระค่าบริการเก็บขยะ</h5>
              </a>
          </div>

          <div class="menu_button">
              <a href="/HistoryPayment">
                  <img src="image/Come-to-know-each-bank-account-type696x344-696x344.jpg" class="rounded mx-auto d-block" alt="Responsive image">
                  <h3>ประวัติชำระเงิน</h3>
                  <h5>เรียกดูประวัติชำระเงินย้อนหลัง</h5>
              </a>
          </div>

          <div class=""></div>
      </div>


  </div>


</template>

<script>
    export default {
      name: 'member',
      mounted:function(){

      },
      methods:{

      }


    }
</script>
