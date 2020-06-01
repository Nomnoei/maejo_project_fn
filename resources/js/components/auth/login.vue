<template>
  <div>


<div v-if="user.length">
    <div v-for="(name , index) in user" :key="index">
      <em v-text="name.name"></em><br>
    </div>
</div>

<!-- <h2>แสดง tel = {{this.$cookie.get('test')}}</h2> -->

  <div class="container"  v-if="!user.length">

    <div align=center>
        <div class="login_screen rounded">
          <div class="h2 login_header mb-4">
                    เทศบาลเมืองแม่โจ้
          </div>
            <div class="login_screen_inside">
              <img src="image/logo.png" width="120rem" alt="" align=center><br><br>
                <form  v-on:submit.prevent="login_api">
                  <div class="form-group">
                          <input id="username" type="text" class="form-control"  v-model="username"  required autocomplete="username" placeholder="ชื่อผู้ใช้" autofocus>

                          <!-- <span class="invalid-feedback" role="alert">
                              <strong>{{ $message }}</strong>
                          </span> -->

                      </div>
                      <div class="form-group">
                            <input type="password" class="form-control" id="password" placeholder="รหัสผ่าน" v-model="password" required autocomplete="current-password">
                            <!-- @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror -->
                        </div>
                        <div class="form-group form-check">
                          <input type="checkbox" class="form-check-input" id="remember">
                          <label class="form-check-label" for="exampleCheck1">จดจำฉัน</label>
                      </div>
                      <div align=center>
                            <button type="submit" class="btn btn-success" id="btn_submit" style="width:10rem;">เข้าสู่ระบบ</button><br>
                        </div>
                </form>
                <br>
                <h6 style="color:red" v-if="!loginText">Username หรือ Password ไม่ถูกต้อง</h6>
            </div>
        </div>
    </div>

  </div>
  <loginImg />

  <b-overlay :show="show" no-wrap>
  </b-overlay>
</div>
</template>

<script>

 import loginImg from './login-img'
import {store} from '../../store/index'
    export default {
      store,
      components:{
          loginImg
      },

      data(){
        return{
          // fromData:{
            user:[],
            username:'',
            password:'',
            show: false,
            loginText:true
          // }

          // csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
      },
        methods:{

          login_api(){
              this.show = true;
            // axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {

              axios.post(this.$store.getters.url+'api/login',{ username:this.username,password:this.password }).then(response => {
                          // console.log(response.data.success);
                          this.$cookie.set('token', response.data.success.token, 1);
                          this.$cookie.set('username', response.data.success.username, 1);
                          this.$cookie.set('user_id', response.data.success.user_id, 1);
                          this.$cookie.set('name', response.data.success.name, 1);
                          this.$cookie.set('tel', response.data.success.tel, 1);
                          this.$cookie.set('status_user', response.data.success.status_user, 1);
                            this.$router.go();

                                // this.getUser();


                         }).catch(error => {
                            console.log("error");
                            this.show = false;
                            this.loginText = false;
                         });
            // }).catch(error => {
            //   console.log("error");
            //   this.show = false;
            //   this.loginText = false;
            // });
          },





          // login_api(){
          //
          //
          //   axios.post('http://127.0.0.1:8000/api/login',{
          //               username:this.username_text,
          //               password:this.password_text
          //             }).then(response => {
          //               console.log(response.data.success);
          //                 this.$store.commit('setSuccess',response.data.success.success)
          //                 this.$store.commit('setUser_id',response.data.success.id)
          //                 this.$store.commit('setName',response.data.success.name)
          //                 this.$store.commit('setTel',response.data.success.tel)
          //                 this.$store.commit('setStatus',response.data.success.status)
          //
          //
          //              //ไปหน้าต่อไป
          //
          //
          //              // console.log(response.data.success.success);
          //
          //           }).catch(error =>{
          //
          //
          //
          //             console.log(error);
          //           });
          //
          // }
        },
        mounted:function(){
          if (this.$cookie.get('user_id')) {
              this.$router.push("/");

              // console.log(this.$cookie.get('user_id'));
          }
      }
    }
</script>
