<template>
<div class="container">
      <h1 class="text-center">เพิ่มพนักงาน</h1><br>
      <div class="background-white">
        <div class="form-group row">
              <label for="username" class="col-md-3 col-form-label text-md-right">ชื่อเข้าใช้งาน :</label>

              <div class="col-md-7">
                  <!-- <input id="username" type="username" class="form-control" v-model="username" required autocomplete="username" autofocus> -->
                  <b-form-input type="text"  id="input-invalid" class="form-control" v-model="username" required autocomplete="username" autofocus></b-form-input>

              </div>
          </div>

          <div class="form-group row">
              <label for="password" class="col-md-3 col-form-label text-md-right">รหัสผ่าน : </label>

              <div class="col-md-7">
                <b-form-input type="password"  @click.prevent="cancel_state_pass" id="input-invalid" :state="status_pass" class="form-control" v-model="password" required autocomplete="new-password"></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">รหัสผ่านไม่ตรงกัน</b-form-invalid-feedback>

              </div>
          </div>

          <div class="form-group row">
                <label for="password-confirm" class="col-md-3 col-form-label text-md-right">ยืนยันรหัสผ่าน : </label>

                <div class="col-md-7">
                    <input id="password-confirm" type="password" class="form-control" v-model="password_confirmation" required autocomplete="new-password">
                </div>
            </div>

            <hr>

            <div class="form-group row">
              <label for="name" class="col-md-3 col-form-label text-md-right">ชื่อ-นามสกุล :
              </label>

              <div class="col-md-7">
                  <input id="name" type="text" class="form-control" v-model="name"  required autocomplete="name">


              </div>
          </div>

          <div class="form-group row">
              <label for="house" class="col-md-3 col-form-label text-md-right">ที่อยู่  :</label>
              <div class="col-md-7">
                  <textarea v-model="house" rows="8" cols="80" class="form-control"></textarea>
              </div>
          </div>

          <div class="form-group row">
                <label for="phone" class="col-md-3 col-form-label text-md-right">เบอร์โทร :</label>
                <div class="col-md-7">
                    <input id="phone" type="text" class="form-control" v-model="tel" required autocomplete="phone">
                </div>
            </div>

      </div>
      <div class="mt-3" align=center>
        <button @click.prevent="addofficer" class="btn btn-outline-success btn_bg_white">
            เพิ่ม
        </button>
    </div>

</div>

</template>

<script>
export default {
    name: 'createOfficer',
    mounted: function() {
      if(this.$cookie.get('status_user') == 1 || this.$cookie.get('status_user') == 2){
          this.$router.push("/");
      }
    },

    data() {
        return {
            username:"",
            password:"",
            password_confirmation:"",
            name:"",
            house:"",
            status_pass:null,
            tel:""
        }
    },
    methods: {


      addofficer(){
          if (this.password == this.password_confirmation && (this.password != "" || this.password_confirmation !="")) {
        this.$confirm(
          "คุณต้องการที่จะเพิ่มพนักงาน ?",
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
                name:this.name ,
               tel: this.tel,
               username: this.username,
               password: this.password,
               house: this.house
              };

              axios.post(this.$store.getters.url+"api/RegisterOfficer",formData,headers).then(response => {
                console.log(response.data.success);
                    this.$alert(
                        "เพิ่มสมาชิกสำเร็จ",
                        "สำเร็จ",
                        "success",
                        {
                           confirmButtonText: "ตกลง",
                         }
                      ).then(()=>
                      this.$router.go()
                    );

              });

          })
          .catch(() => {
            console.log("OK not selected.");
          });
        }else {
          this.status_pass = false;
          // console.log("error password");
        }


      },
      cancel_state_pass(){
          this.status_pass = null;
      },
    }
}
</script>
<style>
body {

}
</style>
