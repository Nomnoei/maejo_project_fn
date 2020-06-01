<template>
<div class="container">
    <h1 class="text-center">การชำระเงิน</h1>
    <h3 class="text-center mb-3">{{this.$cookie.get('name')}}</h3>

    <div class="payment_show_price mt-3">
        <p class="text-center h5">

            ยอดชำระในเดือน : <br>
            จำนวน {{$store.getters.num_home}} หลัง <br>
            <b style="color:red; font-size:5rem;">{{$store.getters.total_money}} ฿</b>
        </p>
    </div>
    <div class="background-white mt-2">
        <div align="center">
            <promptpay-qr id="0979415323" :amount="$store.getters.total_money"></promptpay-qr>
        </div>
        <div class="h5 text-center">
            เพิ่มหลักฐานการชำระเงิน
        </div>
        <div class="h6 text-center">
            ธนาคารกสิกรไทย <font class="h5">{{ testingCode }}</font>


            <span class="btn btn-success btn_copy" @click.stop.prevent="copyTestingCode">
                <img src="image/copy.png">
            </span>
            <input type="hidden" id="testing-code" :value="testingCode">
        </div>



        <b-form-file v-model="file" :state="Boolean(file)" placeholder="รูปภาพ" drop-placeholder="วางไฟล์ภาพ" accept="image/*" @change="onFileChange"></b-form-file>
        <!-- <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
  <div class="mt-3">Selected szie: {{ file ? file.size : '' }}</div>
  <div class="mt-3">Selected ten: {{ file ? file.ten : '' }}</div> -->



        <br>
        <br>
        <div id="preview">
            <img v-if="url" :src="url" />
        </div>
    </div>

    <div align=center><button v-on:click="submitForm()" class="btn btn-outline-success mt-3 btn_bg_white" style="width:13.5rem;">
            <div>ส่งหลักฐาน</div>
        </button></div>



    <!-- {{$store.getters.data_pay}} -->

</div>
</template>

<script>
import {
    store
} from '../../../store/index'
export default {
    name: 'bank_transfer',
    store,
    mounted: function() {
        // this.data = this.$store.getters.data_pay
    },
    data() {
        return {
            url: null,
            file: null,
            testingCode: "123-456-789-0",
            data: []
        }
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
            // console.log(file);
        },
        copyTestingCode() {
            let testingCodeToCopy = document.querySelector('#testing-code')
            testingCodeToCopy.setAttribute('type', 'text')
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                alert('ทำการก็อปปี้เลขบัญชี ');
            } catch (err) {
                // alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        submitForm() {
          this.$confirm(
            "คุณต้องการส่งใบเสร็จชำรเงิน ?",
            "คำเตือน",
            "question"
          )
            .then(() => {
            let list = [];
            let momey = 0;
            $.each(this.$store.getters.data_pay, function(key, value) {
              momey =+ value.price
                list.push({
                    address_id: value.address_id,
                    payment_id: value.id,
                    price : momey,
                    status: "1"
                });
            });
            this.data = list
            console.log(this.data);


            let formData = new FormData();
            formData.append('file', this.file);

            let headers = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: "Bearer " + this.$cookie.get("token")
                }
            };
            axios.post(this.$store.getters.url+"api/ImageSlip", formData, headers).then(response => {
                let headers2 = {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: "Bearer " + this.$cookie.get("token")
                    }
                };
                let formData2 = {
                    data: this.data
                };
                axios.post(this.$store.getters.url+"api/UploadSlip", formData2, headers2).then(response => {
                    console.log(response);
                    this.$alert(
                        "ทำการโอนสำเร็จ",
                        "สำเร็จ",
                        "success",
                        {
                           confirmButtonText: "ตกลง",
                         }
                      ).then(() => this.$router.go());
                });
            });
          })
          .catch(() => {
            console.log("OK not selected.");
          });
        }

    },




}
</script>
<style >
#preview {
    display: flex;
    justify-content: center;
    align-items: center;
}

#preview img {
    max-width: 100%;
    max-height: 500px;
}
</style>
