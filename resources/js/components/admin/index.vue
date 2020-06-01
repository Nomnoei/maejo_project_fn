<template>
<div class="container">
    <div class="background-white-img">
        <img src="image/img_bin.png" class="rounded mx-auto d-block" alt="Responsive image">
    </div>

    <h1 align=center class="mt-3">การจัดการ</h1>

    <div class="select_menu">

      <div class="menu_button">
              <a href="/PaymentHistoryAdmin">
                  <img src="image/Come-to-know-each-bank-account-type696x344-696x344.jpg" class="rounded mx-auto d-block" alt="Responsive image">
                  <h3>ประวัติชำระเงิน</h3>
                  <h5>เรียกดูประวัติชำระ & ค้างชำระ</h5>
              </a>
          </div>


          <div class="menu_button">
                  <a href="/Member">
                      <img src="image/31959252_2085646881703756_3499604962701213696_n.jpg" class="rounded mx-auto d-block" alt="Responsive image">
                      <h3>ข้อมูลลูกบ้าน</h3>
                      <h5>จัดการข้อมูลของลูกบ้าน</h5>
                  </a>
              </div>


              <div class="menu_button">
                    <a href="/Officer">
                        <img src="image/8602.jpg" class="rounded mx-auto d-block" alt="Responsive image">
                        <h3>ข้อมูลพนักงาน</h3>
                        <h5>จัดการข้อมูลของพนักงาน</h5>
                    </a>
                </div>
                <div class="menu_button">
                <a href="/RateBin">
                    <img src="image/money-2.png" class="rounded mx-auto d-block" alt="Responsive image">
                    <h3>อัตราค่าเก็บขยะ</h3>
                    <h5>กำหนดอัตราค่าเก็บขยะ</h5>
                </a>
            </div>

    </div>


</div>
</template>

<script>
export default {
    name: 'admin',
    mounted: function() {

    },
    methods: {

    }


}
</script>
