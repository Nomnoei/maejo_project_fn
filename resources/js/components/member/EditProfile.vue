<template>

    <div class="container" >
          <h1 class="text-center">แก้ไขข้อมูลส่วนตัว</h1>
          <div align=center>
      <a href="/EditPassword"><button type="button" class="btn btn_bg_green_1 mb-3">แก้ไขรหัสผ่าน</button></a>
    </div>

  <div class="background-white">
<form v-on:submit.prevent="EditProfile">


      <div class="form-group row">
            <label for="username" class="col-md-3 col-form-label text-md-right">ชื่อเข้าใช้งาน : </label>

            <div class="col-md-7">
                {{this.$cookie.get('username')}}
                <!-- {{this.$cookie.get('user_id')}} -->
            </div>
        </div>

        <hr>

        <div class="form-group row">
              <label for="name" class="col-md-3 col-form-label text-md-right">ชื่อ-นามสกุล :</label>

              <div class="col-md-7">
                  <input v-model="name" id="name" type="text" class="form-control" required autocomplete="name">
              </div>
          </div>

          <div class="form-group row">
                <label for="phone" class="col-md-3 col-form-label text-md-right">เบอร์โทร :</label>
                <div class="col-md-7">
                    <input v-model="tel" id="phone" type="text" class="form-control"   required autocomplete="phone">
                </div>
            </div>

            <br>

            <div class="background-white">
      <div class="form-group row">
          <label for="password" class="col-md-3 col-form-label text-md-right">รหัสผ่านยืนยัน : </label>

          <div class="col-md-7">
              <!-- <input id="password" type="password" class="form-control" v-model="password" required autocomplete="new-password"> -->

              <b-input class="form-control" @click="statenull"  type="password" v-model="password":state="validation_password" id="feedback-user"></b-input>
              <b-form-invalid-feedback :state="validation_password">
                {{validation_password_text}}
              </b-form-invalid-feedback>


          </div>
      </div>
    </div>
    <div class="mt-3" align=center>
        <button type="submit" class="btn btn-outline-success btn_bg_white">
            บันทึกการแก้ไข
        </button>
    </div>
</form>

  </div>

    </div>


</template>

<script>


    export default {
      name: 'EditProfile',
      components:{

      },
      mounted:function(){
        this.data_address();
      },
      data(){
        return{
          name:"",
          tel:"",
          password:"",
          validation_password:null,
          validation_password_text:""
        }
      },
      methods:{
          data_address(){
          let headers = {
            headers: {
                "Content-Type":"application/json",
                Accept: "application/json",
                "X-Requested-With":"XMLHttpRequest",
                Authorization: "Bearer " + this.$cookie.get("token")
            }
          };
            let formData = {
              status:"1",
              username : this.$cookie.get('username')
          };
          let list=[];
          axios.post(this.$store.getters.url+"api/details",formData,headers).then(response => {
            // console.log(response.data.success[0].name);
            this.name = response.data.success[0].name
            this.tel = response.data.success[0].tel

          });
        },
        EditProfile(){
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
                  // username : this.$cookie.get('username')
                  name:this.name,
                  tel:this.tel,
                  password:this.password
              };
              let list=[];
              axios.post(this.$store.getters.url+"api/UpdateMemberOne",formData,headers).then(response => {
                this.validation_password = true
                this.$alert(
                    "แก้ไขสำเร็จ",
                    "สำเร็จ",
                    "success",
                    {
                       confirmButtonText: "ตกลง",
                     }
                  ).then(() => this.$router.go());

              }).catch(error => {

                 if (error.response.data.password.length > 0) {
                   this.validation_password_text = error.response.data.password[0]
                   this.validation_password = false
                 }
              });
          }).catch(() => {
            console.log("OK not selected.");
          });
        },
        statenull(){
          this.validation_password = null
        }

      }


    }
</script>
  <style>

  </style>
