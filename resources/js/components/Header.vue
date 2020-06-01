<template>
<div>
    <b-nav pills class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <div class="logo float-left">
                <a class="navbar-brand" @clik.prevent="home" href="/" style="font-size:1rem;">
                    <img src="image/logo.png" width="30rem" alt="">
                    <font style="color:#0684FA;">เทศบาลเมืองแม่โจ้</font>
                </a>
            </div>
            <div class="btn-group mt-1">
                <div class="notificationLink">



                    <div class="nofi_icon">
                        <span class="notification_count ">
                            <div>{{number_notifications}}</div>
                        </span>
                        <a href="#" v-click-outside="hide" @click="toggle" class="fas fa-bell mt-1" style="text-decoration: none;"> </a>

                    </div>

                </div>

                <!-- <div class="notificationContainer" v-if="show">
                    <div class="scroll_notification">

                        <div class="notofication_show">
                            <div class="dropdown-divider"></div>
                            <div class="notofication_info m-1">
                                <img src="image/cancel-mark.png">
                                <div class="notofication_font float-right">

                                    <a href="#">ถึงกำหนดจ่ายเงินเดือน มกราคม แล้ว ของบ้านเลขที่ 590</a>

                                    <div class="float-right">
                                        <i>666</i>
                                    </div>
                                </div>
                            </div>
                            <div style="clear:both;"></div>
                        </div>




                    </div>
                </div> -->

                <NotiFication v-if="show"/>

                <div class="border_partition"></div>
                <div class="btn-group">


                    <b-dropdown size="sm" variant="text" toggle-class="text-decoration-none" no-caret>
                        <template v-slot:button-content>
                            <font style="font-size:1rem;">เมนู</font>
                        </template>

                        <div v-if="this.$cookie.get('status_user') == 1">
                            <b-dropdown-item href="/EditProfile">แก้ไขข้อมูลส่วนตัว {{this.$cookie.get('status')}}</b-dropdown-item>
                            <b-dropdown-item href="/ChangeTypePayment">รูปแบบการชำระเงิน</b-dropdown-item>
                        </div>
                        <div v-else>
                            <b-dropdown-item href="/EditProfileOfficer">แก้ไขข้อมูลส่วนตัว {{this.$cookie.get('status')}}</b-dropdown-item>
                        </div>
                        <div class="dropdown-divider"></div>
                        <b-dropdown-item href="#" @click.prevent="logout">
                            <font style="color:#80A222;">ออกจากระบบ</font>
                        </b-dropdown-item>
                    </b-dropdown>




                    <!-- </div> -->
                </div>
            </div>
        </div>

    </b-nav>
    <div style="border:solid 0.35rem #CEF130"></div>
    <div style="border:solid 0.35rem #4AB884"></div>
</div>
</template>

<script>
// import {routes} from './../routes'
import ClickOutside from 'vue-click-outside'
  import NotiFication from './notification.vue'
export default {
    name: 'Header',
    components: {NotiFication},
    mounted:function(){
      this.num_notification()
      this.popupItem = this.$el
  },
    data() {
        return {
            show: false,
            number_notifications:0
        }
    },
    // routes,
    methods: {
            toggle () {
           this.show = !this.show

           //
           let headers = {
             headers: {
                 "Content-Type":"application/json",
                 Accept: "application/json",
                 "X-Requested-With":"XMLHttpRequest",
                 Authorization: "Bearer " + this.$cookie.get("token")
             }
           };
           let formData = {
             id : this.$cookie.get("user_id")
           };
           axios.post(this.$store.getters.url+"api/notifications_reset",formData,headers).then(response => {
             this.number_notifications = 0
                // console.log(response);
           });

         },

         hide () {
           this.show = false
         },


        logout() {

            this.$cookie.delete('token');
            this.$cookie.delete('test');
            this.$cookie.delete('user_id');
            this.$cookie.delete('name');
            this.$cookie.delete('tel');
            this.$cookie.delete('status_user');
            this.$router.go();

        },
        home() {
            this.$router.push("/");
        },

        num_notification(){
        let headers = {
          headers: {
              "Content-Type":"application/json",
              Accept: "application/json",
              "X-Requested-With":"XMLHttpRequest",
              Authorization: "Bearer " + this.$cookie.get("token")
          }
        };
          let formData = {
            user_id : this.$cookie.get('user_id')
        };
        var i = 0;
        axios.post(this.$store.getters.url+"api/NotiFication",formData,headers).then(response => {
          $.each(response.data.notifications, function(key, notifications) {
              if (notifications.status == "1") {
                  i++;
              }
          });
          this.number_notifications = i;
        });
      },

    },
    directives: {
 ClickOutside
}
}
</script>
<style
media="screen">
                .nofi_icon a {
                    color: #80A222;
                    font-size: 1.6rem;
                    text-decoration: none;
                }

                .nofi_icon a:hover {
                    color: #748F2B;
                }
                /* .dropdown-toggle-no-caret:after {
                  display: none !important;
                } */
            </style>
