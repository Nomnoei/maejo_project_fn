<template>
<div class="container">
    <h1 class="text-center">การชำระเงิน</h1>
    <h3 class="text-center mb-3">ชื่อ {{this.$cookie.get('name')}}</h3>

    <div class="payment_show_price mt-3">
            <p class="text-center h5"> ยอดชำระในเดือน {{this.month}} : จำนวน {{this.num_home}} หลัง <br>   <b style="color:red; font-size:5rem;">{{this.price}} ฿</b> </p>
    </div>

    <div class="background-white mt-2">
            <div class="h5   text-center">
                เพิ่มหลักฐานการชำระเงิน
            </div>
            <div class="h6 text-center">
                ธนาคารกสิกรไทย 123-4-56789-0
            </div>
    </div>

    <div class="input-group">
                  <div class="custom-file mt-2">
                    <b-form-file v-model="file" :state="Boolean(file)" placeholder="รูปภาพ" drop-placeholder="วางไฟล์ภาพ" accept="image/*" @change="onFileChange"></b-form-file>
                      <!-- <label class="custom-file-label" for="inputGroupFile01">เพิ่มรูปภาพ</label> -->
                  </div>



              </div>
              <br>
              <br>
              <div id="preview">
                  <img v-if="url" :src="url" />
              </div>
              <div align=center><button v-on:click="submitForm()" class="btn btn-outline-success mt-3 btn_bg_white" style="width:13.5rem;">
                      <div>ส่งหลักฐาน</div>
                  </button></div>
              <!-- {{this.$cookie.get('TransferAgain')}} -->
</div>
</template>

<script>
export default {
    name: 'TransferAgain',
    mounted: function() {
      this.datapay();
    },
    data() {
        return {
          url: null,
          file: null,
          price:0,
          num_home:0,
          month:"",
          data:[]
        }
    },
    methods: {
      onFileChange(e) {
          const file = e.target.files[0];
          this.url = URL.createObjectURL(file);
          // console.log(file);
      },
      datapay(){
        let headers = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                Authorization: "Bearer " + this.$cookie.get("token")
            }
        };
        let formData = {
            id: this.$cookie.get('TransferAgain'),
            status_pay_pic:"3"
        };
        let list = [];
        let time_show = "";
        var i = 0;
        axios.post(this.$store.getters.url+"api/TransferAgain", formData, headers).then(response => {
          console.log(response.data);
          this.price = response.data.paymentsgroupBy[0].sum
          this.num_home = response.data.paymentsgroupBy[0].total
          let pay_month = new Date(response.data.PaymentPic[0].created_at)

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

          this.month = thai_month_arr[pay_month.getMonth()]
          this.data = response.data.PaymentPic
        });

      },
      submitForm(){
        this.$confirm(
          "คุณต้องการส่งใบเสร็จชำรเงิน ?",
          "คำเตือน",
          "question"
        )
          .then(() => {
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
                  data: this.data,
                  id: this.$cookie.get('TransferAgain'),
                  user_id:this.$cookie.get('user_id'),
                  notifications:this.$cookie.get('notifications')
              };
              axios.post(this.$store.getters.url+"api/UpdateSlip", formData2, headers2).then(response => {
                  this.$router.push("/")
              })
            })

          })



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
