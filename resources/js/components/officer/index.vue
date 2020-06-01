<template>
<div class="container">
    <div class="background-white-img">
        <img src="image/img_bin.png" class="rounded mx-auto d-block" alt="Responsive image">
    </div>

    <h1 align=center class="mt-3">การจัดการ</h1>

    <div class="select_menu_officer">

        <div class="menu_button">
            <a href="/PaymentConfirm">
                <img src="image/accept-credit-card-payments.jpg" class="rounded mx-auto d-block" alt="Responsive image">
                <h3>ยืนยันการชำระเงิน</h3>
                <h5>ยืนยันหลักฐานที่ลูกบ้านส่งมา</h5>
            </a>
        </div>
        <div class="menu_button">
            <a href="/PaymentPrintBill">
                <img src="image/future_payment_methods-compressor-1.jpg" class="rounded mx-auto d-block" alt="Responsive image">
                <h3>พิมพ์ใบเรียกชำระเงิน</h3>
                <h5>พิมพ์ไบเรียกชำระเงิน</h5>
            </a>
        </div>

        <div class="menu_button">
            <a href="/Member">
                <img src="image/31959252_2085646881703756_3499604962701213696_n.jpg" class="rounded mx-auto d-block" alt="Responsive image">
                <h3>ข้อมูลลูกบ้าน</h3>
                <h5>จัดการข้อมูลของลูกบ้าน</h5>
            </a>
        </div>

    </div>


</div>
</template>

<script>
export default {
    name: 'officer',
    mounted: function() {

    },
    methods: {

    }


}
</script>
