<template>
<div class="container">
    <h1 class="text-center">เพิ่มลูกบ้าน</h1>

        <!-- <form> -->
          <div class="background-white">
            <div class="form-group row">
                <label for="name" class="col-md-3 col-form-label text-md-right">ชื่อ-นามสกุล : </label>

                <div class="col-md-7">
                    <!-- <input id="name"  class="form-control" v-model="name" required autocomplete="name" autofocus> -->
                    <b-form-input type="text"  @click.prevent="cancel_state_user" id="input-invalid" :state="status_user" class="form-control" v-model="name" required autocomplete="name" autofocus></b-form-input>
                </div>
            </div>

            <div class="form-group row">
                <label for="phone" class="col-md-3 col-form-label text-md-right">เบอร์โทร : </label>

                <div class="col-md-7">
                    <!-- <input id="tel" type="text" class="form-control" v-model="tel" required autocomplete="tel"> -->
                    <b-form-input type="text"  @click.prevent="cancel_state_tel" id="input-invalid" :state="status_tel" class="form-control" v-model="tel" required autocomplete="tel" ></b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                        {{status_tel_text}}
                    </b-form-invalid-feedback>
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-md-3 col-form-label text-md-right">รหัสผ่าน : </label>

                <div class="col-md-7">
                    <!-- <input id="input-invalid" :state="false" type="password" class="form-control" v-model="password" required autocomplete="new-password"> -->
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
    <label for="password-confirm" class="col-md-3 col-form-label text-md-right" >ยืนยันรหัสผ่าน : </label>

    <div class="col-md-7">
        <input id="password-confirm" type="password" class="form-control" v-model="password_confirmation" required autocomplete="new-password">
    </div>
</div>

</div>
  <!-- {{-- --------------------------------------------------------เพิ่มข้อมูลที่อยู่-------------------------------------------------------- --}} -->


<div class="background-white mt-3">
  <div class="form-group row">
      <label for="recipient-name" class="col-md-3 col-form-label text-md-right">บ้านเลขที่ : </label>

      <div class="col-md-7">
          <input type="text" name="house" v-model="house"  class="form-control" id="house">
      </div>
  </div>
  <div class="form-group row">
          <label for="recipient-name" class="col-md-3 col-form-label text-md-right">ซอย : </label>

          <div class="col-md-7">
              <input type="text" name="Alley"  v-model="Alley" class="form-control" id="Alley">
          </div>
      </div>

      <div class="form-group row">
      <label for="message-text" class="col-md-3 col-form-label text-md-right">ตำบล : </label>

      <div class="col-md-7">
        <b-form-select v-model="selected_district" :options="options_district"></b-form-select>
      </div>
  </div>


  <div class="form-group row">
        <label for="recipient-name" class="col-md-3 col-form-label text-md-right">หมู่บ้าน : </label>

        <div class="col-md-7">
          <!-- select village -->
           <b-form-select v-model="selected_village" :options="options_village"></b-form-select>
        </div>
    </div>




</div>
<div class="mt-3">
          <button type="button" @click.prevent="addhome" class="btn btn-success">
              + เพิ่มที่อยู่
          </button>
        </div>

        <!-- <div v-if="show" v-for="home in homes">
            {{homes}}
        </div> -->






        <div class="background-white mt-3" v-if="show" v-for="(home , index ) in homes" :key="homes.index">
          <div class="form-group row">
                      <label for="recipient-name" class="col-md-3 col-form-label text-md-right" style="font-size:1.3rem;">บ้านเลขที่ :</label>

                      <div class="col-md-7">
                        <input type="text" name="house" :value="home.house" class="form-control"  style="border:none; background:#fff; font-size:1.3rem;" disabled>
                      </div>
                  </div>

          <div class="form-group row">
            <label for="recipient-name" class="col-md-3 col-form-label text-md-right" style="font-size:1.3rem;">ซอย :</label>

                <div class="col-md-7">
                    <input type="text" name="Alley" :value="home.Alley"  class="form-control" style="border:none; background:#fff; font-size:1.3rem;" disabled>
          </div>
        </div>
        <div class="form-group row">
            <label for="recipient-name" class="col-md-3 col-form-label text-md-right" style="font-size:1.3rem;">หมู่บ้าน :</label>

            <div class="col-md-7">
                <input type="text" name="moo" :value="home.district"  class="form-control" style="border:none; background:#fff; font-size:1.3rem;" disabled>
            </div>
        </div>

        <div class="form-group row">
          <label for="message-text" class="col-md-3 col-form-label text-md-right" style="font-size:1.3rem;">ตำบล :</label>

          <div class="col-md-7">
              <input type="text" name="district" :value="home.village"  class="form-control" style="border:none; background:#fff; font-size:1.3rem;" disabled>
          </div>

      </div>

        <div style="height:2.35rem">
            <a href="#" class="btn btn-secondary float-left"v-on:click="deletehome(index)">ลบ</a>
        </div>

        <!-- {{index}} -->
        </div>




        <!-- /-///////////////////////////// -->



  <div class="mt-3" align=center>
        <button @click="AddMember" class="btn btn-outline-success btn_bg_white">
              เพิ่ม
          </button>
          </div>
  <!-- </form> -->


<b-overlay :show="load" no-wrap>
</b-overlay>
</div>

</template>

<script>
export default {
    name: 'addMember',
    mounted: function() {
      if(this.$cookie.get('status_user') == 1){
          this.$router.push("/");
      }
    },

    data() {
        return {
          name:'',
          tel:'',
          password:'',
          password_confirmation:'',
          show:false,
          load:false,
          Alley:'',
          house:'',
          selected_district: null,
          selected_village: null,
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
        ],
        status_user:null,
        status_tel:null,
        status_pass:null,
        status_pass_text:"",
        status_tel_text:"",
        status_error:false,
        homes:[],
        user:[],
        token:null
        }
    },
    methods: {
      addhome(){
        // console.log("OK");
          this.homes.push({ Alley: this.Alley ,  house: this.house , district: this.selected_district , village: this.selected_village});
          this.Alley = null;
          this.house =null;
          this.selected_district = null;
          this.selected_village = null;
          this.show = true;
      },
      deletehome(index){
        this.homes.splice(index, 1);
      },
      AddMember(){


        if (this.password == this.password_confirmation) {

          if (this.name == "" || this.tel == "" || this.password == "" || this.password_confirmation == "") {
              console.log("null1");
              this.status_user = false
              this.status_tel = false
              this.status_pass = false
              return
          }

          if ((this.house == "" || this.Alley == "" || this.selected_district == null || this.selected_village == null)&& this.homes == null) {
              console.log("null2");
              return
          }else if(this.homes.length > -1){
            // console.log("ok");
          }




          if (this.homes.length == 0) {
              // console.log(this.homes.length);
                    // this.homes =
                this.homes.push({ Alley: this.Alley ,  house: this.house , district: this.selected_district , village: this.selected_village});
          }
          else if (this.homes.length > 0 && (this.house != "" && this.Alley != "" && this.selected_district != null && this.selected_village != null)) {
                this.homes.push({ Alley: this.Alley ,  house: this.house , district: this.selected_district , village: this.selected_village});
                this.Alley = '';
                this.house ='';
                this.selected_district = null;
                this.selected_village = null;
                this.show = true;

          }
            this.insert_member();

        }else {
          this.status_pass = false;
          console.log("error password");
        }

      },
      cancel_state_pass(){
          this.status_pass = null;
      },
      cancel_state_user(){
          this.status_user = null;
      },
      cancel_state_tel(){
          this.status_tel = null;
      },
      insert_member(){
                    this.load = true;
                   // axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
                     // console.log(response.config.headers);
                     // this.token = response.config.headers;
                     // this.user.push({name:this.name , tel: this.tel, password: this.password , address:this.homes});
                     let formData = {
                       name:this.name ,
                      tel: this.tel,
                      password: this.password,
                      address:this.homes
                     };

                     let headers = {
                       headers: {
                           "Content-Type":"application/json",
                           Accept: "application/json",
                           "X-Requested-With":"XMLHttpRequest",
                           Authorization: "Bearer " + this.$cookie.get("token")
                       }
                     };
                     axios.post(this.$store.getters.url+"api/RegisterMember",formData,headers).then(response => {
                         // console.log(response);

                           this.$alert(
                               "เพิ่มสมาชิกสำเร็จ",
                               "สำเร็จ",
                               "success",
                               {
                                  confirmButtonText: "ตกลง",
                                }
                             ).then(()=>this.$router.go());

                     }).catch(error => {
                        // console.log(error.response.data.error);
                        if (error.response.data.error.password) {
                            this.load = false;
                            this.status_pass = false
                            this.status_pass_text = error.response.data.error.password[0]
                            this.status_error = true
                        }

                        if (error.response.data.error.tel) {
                            this.load = false;
                            this.status_tel = false
                            this.status_tel_text = error.response.data.error.tel[0]
                            this.status_error = true
                        }
                     });
      }
    }
}
</script>
<style>
body {
    background: #EFEFEF;
}
</style>
