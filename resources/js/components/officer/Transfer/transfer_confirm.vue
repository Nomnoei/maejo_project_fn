<template>
<div class="container">
<h1 class="text-center mb-3">โอนกรรมสิทธิ์ค่าขยะ</h1>

<div class="container">
    <div class="background-white">
        <div class="transfer_confirm_show_transferee" align=center>
            <font style="color:#555555;" class="h5">{{$store.getters.assignee}} </font>
            <img src="image/right-arrow.png" width="20rem" alt="">
            <font style="color:#555555;" class="h5">{{$store.getters.recipient}}</font>
        </div>
    </div>
    <hr>
    <h4 class="text-center">ที่อยู่ในการโอน</h4>


<!-- loop -->
  <div v-for="data in $store.getters.page" :key="data.index">
  <br>
      <div class="background-white" >
        <div class="transfer_confirm_show_transferee" align=center>
            <font style="color:#555555;" class="h6">{{data.address}}</font>
          </div>
      </div>
    </div>



    <div align=center><a href="#"><button type="button" @click.prevent="add_transfer" class="btn btn-outline-success mt-3 btn_bg_white" style="width:8rem;">ยืนยัน</button></a></div>
</div>

</div>
</template>


<script>

export default {
    name: 'transfer_confirm',
    mounted: function() {
      this.page = this.$store.getters.page
      // console.log(this.page);
    },
    data() {
        return {
          page:[]
        }
    },
    methods: {

      add_transfer(){

          console.log(this.page);


    this.$confirm(
      "คุณต้องการที่จะโอนกรรมสิทธิ์ค่าขยะ ?",
      "คำเตือน",
      "question"
    )
      .then(() => {

        let headers = {
          headers: {
              "Content-Type":"application/json",
              Accept: "application/json",
              "X-Requested-With":"XMLHttpRequest",
              Authorization: "Bearer " + this.$cookie.get("token")
          }
        };
        let formData = {
          assignee: this.$store.getters.id_assignee,
          recipient: this.$store.getters.id_recipient,
          data : this.page
        };
        axios.post(this.$store.getters.url+"api/AddTransfer",formData,headers).then(response => {
              console.log(response.data.success);
              this.$alert(
                  "ทำการโอนสำเร็จ",
                  "สำเร็จ",
                  "success",
                  {
                     confirmButtonText: "ตกลง",
                   }
                ).then(() => this.$router.go());

        });

      })
      .catch(() => {
        console.log("OK not selected.");
      });








      },




    }


}
</script>
