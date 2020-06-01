<template>

    <div class="container" >
      <h1 class="text-center">แก้ไขรหัสผ่าน</h1><br>

      <div class="background-white">
        <form v-on:submit.prevent="checkpassword">
          <div class="form-group row">
                <label for="password" class="col-md-3 col-form-label text-md-right">รหัสผ่านเดิม : </label>

                <div class="col-md-7">
                    <!-- <input  type="password" class="form-control" v-model="o_password" > -->

                    <b-input class="form-control" @click="statenull"  type="password"v-model="o_password":state="validation_o_password" id="feedback-user"></b-input>
                    <b-form-invalid-feedback :state="validation_o_password">
                      {{validation_o_password_text}}
                    </b-form-invalid-feedback>


                </div>
            </div>

            <div class="form-group row">
                <label for="password" class="col-md-3 col-form-label text-md-right">รหัสผ่าน : </label>

                <div class="col-md-7">
                    <!-- <input  type="password" class="form-control" v-model="password" > -->
                    <b-input class="form-control" @click="statenull"  type="password" v-model="password":state="validation_password" id="feedback-user"></b-input>
                    <b-form-invalid-feedback :state="validation_password">
                      {{validation_password_text}}
                    </b-form-invalid-feedback>


                </div>
            </div>

            <div class="form-group row">
              <label for="password-confirm" class="col-md-3 col-form-label text-md-right">ยืนยันรหัสผ่าน :</label>

              <div class="col-md-7">
                <!-- <input   type="password" class="form-control" v-model="c_password" > -->
                <b-input class="form-control"  type="password"v-model="c_password":state="validation_c_password" id="feedback-user"></b-input>
                <b-form-invalid-feedback :state="validation_c_password">
                  รหัสผ่านไม่ตรงกัน
                  {{validation_c_password_text}}
                </b-form-invalid-feedback>
              </div>
            </div>


          <div class="mt-3" align=center>
                  <button type="submit" class="btn btn-outline-success btn_bg_white">
                    แก้ไขรหัสผ่าน
                  </button>
          </div>
          </form>
    </div>

    </div>


</template>

<script>


    export default {
      name: 'EditPassword',
      components:{

      },
      data(){
        return{
          o_password: "",
          password: "",
          c_password: "",
          validation_o_password:null,
          validation_c_password:null,
          validation_password:null,
          validation_o_password_text:"",
          validation_password_text:"",
          validation_c_password_text:""
        }
      },
      mounted:function(){

      },
      methods:{
        EditPassword(){
          this.$confirm(
            "คุณต้องการจะแก้ไขข้อมูลส่วนตัว ?",
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
                  id:this.$cookie.get('user_id'),
                  status:"1",
                  o_password: this.o_password,
                  password: this.password,
                  c_password: this.c_password
              };
              let list=[];
              axios.post(this.$store.getters.url+"api/RepasswordMember",formData,headers).then(response => {
                this.validation_o_password = true
                this.$alert(
                    "แก้ไขสำเร็จ",
                    "สำเร็จ",
                    "success",
                    {
                       confirmButtonText: "ตกลง",
                     }
                  ).then(() => this.$router.go());

              }).catch(error => {
                console.log(error.response);
                // console.log(error.response.data.password[0]);

                 if (error.response.data.password) {
                   this.validation_o_password_text = error.response.data.password[0]
                   this.validation_o_password = false
                 }
                 if (error.response.data.error.password) {
                   this.validation_password_text = error.response.data.error.password[0]
                   this.validation_password = false
                 }
                 if (error.response.data.error.o_password) {
                   this.validation_o_password_text = error.response.data.error.o_password[0]
                   this.validation_o_password = false
                 }
                 if (error.response.data.error.c_password) {
                   this.validation_c_password_text = error.response.data.error.c_password[0]
                   this.validation_c_password = false
                 }






              });
          }).catch(() => {
            console.log("OK not selected.");
          });
        },
        statenull(){
          this.validation_o_password = null
        },
        checkpassword(){
          if (this.password == this.c_password) {
            this.EditPassword();
          }else {
            this.validation_c_password = false
          }
        },

      }


    }
</script>
  <style>

  </style>
