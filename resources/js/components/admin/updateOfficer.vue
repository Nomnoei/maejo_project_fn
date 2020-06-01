<template>
<div class="container">
  <h1 class="text-center">แก้ไขลูกบ้าน</h1><br>
  <div class="background-white">
    <div class="float-right" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="image/exclamation-mark.png" width="30rem" alt="">
      </div>
      <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#"  @click="dalete_officer">
                  <font style="color:red;">ลบบัญชีผู้ใช้คนนี้</font>
              </a>
      </div>

      <div class="form-group row">
                <label for="username"  class="col-md-3 col-form-label text-md-right">ชื่อเข้าใช้งาน :</label>

                <div class="col-md-7">
                    <h4> {{this.username}} </h4>
                </div>
            </div>


              <div class="edit_password">
            <p>
              <button class="btn btn-warning"  type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                เปลี่ยนรหัสผ่าน
              </button>
            </p>
          </div>

          <div class="collapse" id="collapseExample">

                  <div class="form-group row">
                      <label for="password" class="col-md-3 col-form-label text-md-right">รหัสผ่าน : </label>

                      <div class="col-md-7">
                        <b-form-input type="password"  @click.prevent="cancel_state_pass" id="input-invalid" :state="status_pass" class="form-control" v-model="password" required autocomplete="new-password"></b-form-input>
                        <b-form-invalid-feedback id="input-live-feedback">
                          <div v-if="!status_error">
                            รหัสผ่านไม่ตรงกัน
                          </div>
                          <div v-else>
                            {{status_pass_text}}
                          </div>
                        </b-form-invalid-feedback>

                      </div>
                  </div>

                  <div class="form-group row">
                    <label for="password-confirm" class="col-md-3 col-form-label text-md-right">'ยืนยันรหัสผ่าน :</label>

                    <div class="col-md-7">
                      <input id="password-confirm" v-model="c_password" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                    </div>
                  </div>

                  <div align=center>

                    <input type="button" @click="repassword" class="btn btn-success mb-3" value="แก้ไขรหัสผ่าน">
                  </div>
              </div>



                <div class="form-group row">
                  <label for="name" class="col-md-3 col-form-label text-md-right">ชื่อ-นามสกุล : </label>

                  <div class="col-md-7">
                      <input id="name" type="text" class="form-control" name="name" v-model="name" required autocomplete="name" autofocus>


                  </div>
              </div>

              <div class="form-group row">
                  <label for="house" class="col-md-3 col-form-label text-md-right">ที่อยู่  :</label>
                  <div class="col-md-7">
                      <textarea v-model="house" rows="8" cols="80" class="form-control"></textarea>
                  </div>
              </div>

              <div class="form-group row">
                  <label for="phone" class="col-md-3 col-form-label text-md-right">เบอร์โทร : </label>

                  <div class="col-md-7">
                      <input id="phone" type="text" class="form-control " name="tel"  v-model="tel"  required autocomplete="phone">

                  </div>
              </div>


              <div class="mt-3">


        </div>
        <div class="mt-3" align=center>
                <button class="btn btn-outline-success btn_bg_white confirm_edit" @click="edti_officer">
                    แก้ไข
                </button>
              </div>

  </div>
</div>

</template>

<script>
export default {
    name: 'updateMember',
    mounted: function() {
      if(this.$cookie.get('status_user') == 1 || this.$cookie.get('status_user') == 2){
          this.$router.push("/");
      }
      this.data_officer();
    },
    data() {
        return {
          name:"",
          tel:"",
          house:"",
          password:"",
          c_password:"",
          username:"",
          status_pass:null,
          status_pass_text:"",
          status_error:false,
        }
    },
    methods: {
      data_officer(){
        let headers = {
          headers: {
              "Content-Type":"application/json",
              Accept: "application/json",
              "X-Requested-With":"XMLHttpRequest",
              Authorization: "Bearer " + this.$cookie.get("token")
          }
        };
          let formData = {
            user_id : this.$cookie.get("user_id_edit"),
            status : "2"

        };
        axios.post(this.$store.getters.url+"api/ThisOfficer",formData,headers).then(response => {
          console.log(response.data);
          this.name = response.data.success[0].name
          this.tel = response.data.success[0].tel
          this.username = response.data.success[0].username
          this.house = response.data.address[0].house
        });
      },
      edti_officer(){

        this.$confirm(
          "คุณต้องการที่จะลบสมาชิก ?",
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
                user_id : this.$cookie.get("user_id_edit"),
                name: this.name,
                tel: this.tel,
                status: "2"

            };
            axios.post(this.$store.getters.url+"api/updateThisOfficer",formData,headers).then(response => {
              console.log(response.data);
            });

          })
          .catch(() => {
            console.log("OK not selected.");
          });



      },
      repassword(){
        // console.log(this.password);
        // console.log(this.c_password);
        if (this.password == this.c_password) {
          this.$confirm(
            "คุณต้องการที่จะแก้ไขรหัสผ่านสมาชิก ?",
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
                    id : this.$cookie.get("user_id_edit"),
                    password: this.password,
                    c_password: this.c_password
              };
              axios.post(this.$store.getters.url+"api/repassword",formData,headers).then(response => {
                // console.log(response);
                this.$alert(
                    "แก้ไขรหัสผ่านสำเร็จ",
                    "สำเร็จ",
                    "success",
                    {
                       confirmButtonText: "ตกลง",
                     }
                  ).then(() => this.status_pass = true);
              }).catch(error => {
                  console.log(error.response.data.error.password);
                  if (error.response.data.error.password) {
                      // this.load = false;
                      this.status_pass = false
                      this.status_pass_text = error.response.data.error.password[0]
                      this.status_error = true
                  }

              });

              })
            .catch(() => {
              console.log("OK not selected.");
            });
        }else {
          this.status_pass = false;
        }
      },
      cancel_state_pass(){
          this.status_pass = null;
      },

      dalete_officer(){

        this.$confirm(
          "คุณต้องการที่จะลบพนักงาน ?",
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
                id : this.$cookie.get("user_id_edit"),
                status : "2",
                status_update_user : "4",
                status_update_address : "2"
            };
            axios.post(this.$store.getters.url+"api/DeleteOfficer",formData,headers).then(response => {
              // console.log(response);
              this.$router.push("/Officer");
            });

          })
          .catch(() => {
            console.log("OK not selected.");
          });


      }

    }


}
</script>
<style>

</style>
