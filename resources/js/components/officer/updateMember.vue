<template>
<div class="container">
  <h1 class="text-center">แก้ไขลูกบ้าน</h1><br>
  <div class="background-white">
    <div class="float-right" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="image/exclamation-mark.png" width="30rem" alt="">
      </div>
      <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#"  @click="dalete_member()">
                  <font style="color:red;">ลบบัญชีผู้ใช้คนนี้</font>
              </a>
      </div>

      <div class="form-group row">
                <label for="username" class="col-md-3 col-form-label text-md-right">ชื่อเข้าใช้งาน :</label>

                <div class="col-md-7">
                    <h4> {{this.username}} </h4>
                </div>
            </div>


              <div class="edit_password">
            <p>
              <button class="btn btn-warning" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                เปลี่ยนรหัสผ่าน
              </button>
            </p>
          </div>

          <div class="collapse" id="collapseExample">

                  <div class="form-group row">
                      <label for="password"  class="col-md-3 col-form-label text-md-right">รหัสผ่าน : </label>

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
                      <input id="name"  type="text" class="form-control" name="name" v-model="name" required autocomplete="name" autofocus>


                  </div>
              </div>

              <div class="form-group row">
                  <label for="phone" class="col-md-3 col-form-label text-md-right">เบอร์โทร : </label>

                  <div class="col-md-7">
                      <input id="phone" type="text" class="form-control " name="tel"  v-model="tel"  required autocomplete="phone">


                  </div>
              </div>

              <div class="mt-3">


           <b-button @click="modalShow = !modalShow" class="btn btn-success" >+ เพิ่มที่อยู่</b-button>

    <b-modal
    v-model="modalShow"
    title="เพิ่มที่อยู่"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
    >
      <div class="form-group row">
              <label for="recipient-name" class="col-md-3 col-form-label text-md-right">บ้านเลขที่ : </label>

              <div class="col-md-7">
                  <input type="text" v-model="new_house"  class="form-control" id="house">
              </div>
          </div>
          <div class="form-group row">
                  <label for="recipient-name" class="col-md-3 col-form-label text-md-right">ซอย : </label>

                  <div class="col-md-7">
                      <input type="text"  v-model="new_alley"  class="form-control" id="Alley">
                  </div>
              </div>
              <div class="form-group row">
                    <label for="message-text"  class="col-md-3 col-form-label text-md-right">ตำบล : '</label>
                    <div class="col-md-7">
                        <!-- select district -->
                         <b-form-select v-model="selected_new_district" :options="options_district"></b-form-select>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="recipient-name"  class="col-md-3 col-form-label text-md-right">หมู่บ้าน : </label>

                    <div class="col-md-7">
                      <!-- select village -->
                       <b-form-select v-model="selected_new_village" :options="options_village"></b-form-select>
                    </div>
                </div>

    </b-modal>



          <div  v-if="show" v-for="(home , index ) in address" :key="address.index">
          <hr>
            <div class="background-white mt-3">
              <div class="form-group row">
                      <label for="recipient-name" class="col-md-3 col-form-label text-md-right">บ้านเลขที่ : </label>

                      <div class="col-md-7">
                          <input type="text" name="house[]" v-model="home.house_num" class="form-control" id="house">
                      </div>
                  </div>
            </div>

            <div class="form-group row">
                    <label for="recipient-name" class="col-md-3 col-form-label text-md-right">ซอย : </label>

                    <div class="col-md-7">
                        <input type="text" name="Alley[]" v-model="home.alley" class="form-control" id="Alley">
                    </div>
                </div>

                <div class="form-group row">
                      <label for="message-text" class="col-md-3 col-form-label text-md-right">ตำบล : '</label>
                      <div class="col-md-7">
                          <!-- select district -->
                           <b-form-select v-model="home.district" :options="options_district"></b-form-select>
                      </div>
                  </div>

                  <div class="form-group row">
                      <label for="recipient-name" class="col-md-3 col-form-label text-md-right">หมู่บ้าน : </label>

                      <div class="col-md-7">
                        <!-- select village -->
                         <b-form-select v-model="home.moo" :options="options_village"></b-form-select>
                      </div>
                  </div>
                    <a href="#" @click.prevent="daelte_home(home.id)"  class="btn btn-secondary">ลบ </a>
                    <hr>
              </div>

        </div>
        <div class="mt-3" align=center>
                <button @click="edit_member" class="btn btn-outline-success btn_bg_white confirm_edit">
                    แก้ไข
                </button>
              </div>

  </div>
  <!-- {{new_house}}
  {{new_alley}}
  {{selected_new_district}}
  {{selected_new_village}} -->
</div>

</template>

<script>
export default {
    name: 'updateMember',
    mounted: function() {


      this.user_id = this.$cookie.get("user_id_edit");
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
          status : "1"
      };
      axios.post(this.$store.getters.url+"api/ThisMember",formData,headers).then(response => {
        // console.log(response.data.success[0].id);
        this.username = response.data.success[0].username;
        this.name = response.data.success[0].name;
        this.tel = response.data.success[0].tel;
        this.status = response.data.success[0].status;
      });
      axios.post(this.$store.getters.url+"api/ThisMemberAddress",formData,headers).then(response => {
        // console.log(response.data.success);
        this.address = response.data.success;
        this.show = true;

      });
    },
    data() {
        return {
          user_id:"",
          new_house:"",
          new_alley:"",
          selected_new_district:null,
          selected_new_village:null,
          modalShow: false,
          username:'',
          selected: null,
          name:"",
          tel:"",
          password:"",
          status_pass:null,
          c_password:"",
          status:"",
          address:[],
          show:false,
          status_pass_text:"",
          status_error:false,
          status_tel:null,
          status_tel_text:"",
        options_district: [
          { value: null, text: '--- เลือกตำบล ---' },
          { value: 'หนองหาร', text: 'หนองหาร' },
          { value: 'หนองจ๊อม', text: 'หนองจ๊อม' },
          { value: 'ป่าไผ่', text: 'ป่าไผ่' },
        ],
        options_village:[
          { value: null, text: '--- เลือกตำบล ---' },
          { value: 'บ้านแม่เตาไห', text: 'บ้านแม่เตาไห' },
          { value: 'บ้านป่าบง (บางส่วน)', text: '้านป่าบง (บางส่วน)' },
          { value: 'บ้านห้วยเกี๋ยง', text: 'บ้านห้วยเกี๋ยง' },
          { value: 'บ้านแม่โจ้', text: 'บ้านแม่โจ้' },
          { value: 'บ้านสหกรณ์นิคม', text: 'บ้านสหกรณ์นิคม' },
          { value: 'บ้านทุ่งป่าเก็ด', text: 'บ้านทุ่งป่าเก็ด' },
          { value: 'บ้านทุ่งหมื่นน้อย', text: 'บ้านทุ่งหมื่นน้อย' },
          { value: 'บ้านเกษตรใหม่ (บางส่วน)', text: 'บ้านเกษตรใหม่ (บางส่วน)' },
          { value: 'บ้าไร่สหกรณ์', text: 'บ้าไร่สหกรณ์' },
          { value: 'บ้านแม่โจ้ใหม่', text: 'บ้านแม่โจ้ใหม่' },
          { value: 'บ้านแพะป่าห้า (บางส่วน)', text: 'บ้านแพะป่าห้า (บางส่วน)' },
          { value: 'บ้านศรีสหกรณ์', text: 'บ้านศรีสหกรณ์' },
          { value: 'บ้านแม่แก้ดน้อย', text: 'บ้านแม่แก้ดน้อย' },
          { value: 'บ้านหลิ่งมื่น', text: 'บ้านหลิ่งมื่น' },
          { value: 'บ้านพัฒนาทรายแก้ว', text: 'บ้านพัฒนาทรายแก้ว' },
        ]
        }
    },
    methods: {

    resetModal(){
      this.new_house=""
      this.new_alley=""
      this.selected_new_district=null
      this.selected_new_village=null
    },
    handleOk(bvModalEvt) {
      // console.log(this.$cookie.get("user_id_edit"));
      // console.log(this.new_house);
      // console.log(this.new_alley);
      // console.log(this.selected_new_district);
      // console.log(this.selected_new_village);
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
          house_num : this.new_house,
          alley : this.new_alley,
          district : this.selected_new_district,
          moo : this.selected_new_village,
          status : "1",
          type_pay_id : "1"
      };
      axios.post(this.$store.getters.url+"api/AddOneAddress",formData,headers).then(response => {
        // console.log(response);
        this.$router.go();
      });

    },
    daelte_home(id){
      let headers = {
        headers: {
            "Content-Type":"application/json",
            Accept: "application/json",
            "X-Requested-With":"XMLHttpRequest",
            Authorization: "Bearer " + this.$cookie.get("token")
        }
      };
        let formData = {
          id : id
      };
      axios.post(this.$store.getters.url+"api/DeleteOneAddress",formData,headers).then(response => {
        // console.log(response);
        this.$router.go();
      });
    },
    dalete_member(){

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
              id : this.user_id,
              status : "1"
          };
          axios.post(this.$store.getters.url+"api/DeleteMember",formData,headers).then(response => {
            // console.log(response);
            this.$router.push("/Member");
          });

        })
        .catch(() => {
          console.log("OK not selected.");
        });


    },
    edit_member(){

      // this.$confirm(
      //   "คุณต้องการที่จะโอนกรรมสิทธิ์ค่าขยะ ?",
      //   "คำเตือน",
      //   "question"
      // )
      //   .then(() => {
      //   })
      //   .catch(() => {
      //     console.log("OK not selected.");
      //   });

      this.$confirm(
        "คุณต้องการที่จะแก้ไขสมาชิก ?",
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
                id : this.user_id,
                name:this.name,
                tel:this.tel,
                status : "1"
          };
          axios.post(this.$store.getters.url+"api/UpdateMember",formData,headers).then(response => {
            this.$alert(
                "แก้ไขสมาชิกสำเร็จ",
                "สำเร็จ",
                "success",
                {
                   confirmButtonText: "ตกลง",
                 }
              ).then(()=>this.$router.go());

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
                  id : this.user_id,
                  password: this.password,
                  c_password: this.c_password
            };
            axios.post(this.$store.getters.url+"api/repassword",formData,headers).then(response => {
              console.log(response);
              this.$alert(
                  "แก้ไขรหัสผ่านสำเร็จ",
                  "สำเร็จ",
                  "success",
                  {
                     confirmButtonText: "ตกลง",
                   }
                ).then();
// this.$router.go()
            }).catch(error => {
                console.log(error.response.data.error.password);
                if (error.response.data.error.password) {
                    // this.load = false;
                    this.status_pass = false
                    this.status_pass_text = error.response.data.error.password[0]
                    this.status_error = true
                }
                // if (error.response.data.error.tel) {
                //     // this.load = false;
                //     this.status_tel = false
                //     this.status_tel_text = error.response.data.error.tel[0]
                //     this.status_error = true
                // }
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
    }


}
</script>
<style>

</style>
