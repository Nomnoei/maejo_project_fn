<template>
<div class="notificationContainer">
    <div class="scroll_notification">

        <div v-for="itme in itmes" v-if="numdata">


            <!-- <div class="notofication_show">
                <div class="dropdown-divider"></div>
                <div class="notofication_info m-1">
                    <img src="image/cancel-mark.png">
                    <div class="notofication_font float-right">

                        <a href="#">ถึงกำหนดจ่ายเงินเดือน มกราคม แล้ว ของบ้านเลขที่ 590</a>

                        <div class="float-right">
                            <i>5 นาที่</i>
                        </div>
                    </div>
                </div>
                <div style="clear:both;"></div>
            </div> -->

            <div class="notofication_show">
                <div class="dropdown-divider"></div>
                <div class="notofication_info m-1">


                    <img src="image/cancel-mark.png" v-if="itme.type == 1">
                    <img src="image/warning.png" v-if="itme.type == 2">
                    <img src="image/success.png" v-if="itme.type == 3">
                    <img src="image/exclamation-mark.png" v-if="itme.type == 4">
                    <img src="image/exclamation-mark.png" v-if="itme.type == 5">
                    <img src="image/warning.png" v-if="itme.type == 6">

                    <div class="notofication_font float-right">

                        <a href="/Payment"  v-if="itme.type == 1">{{itme.detail}}</a>
                        <a href="#" @click="TransferAgain(itme.whatever_id,itme.id)"  v-if="itme.type == 4">{{itme.detail}}</a>
                        <a href="#"  v-else>{{itme.detail}}</a>
                        <div class="float-right">

                            <i>{{itme.time_show}}่</i>

                        </div>
                    </div>
                </div>
                <div style="clear:both;"></div>
            </div>




        </div>
        <div v-else>
            <div class='notofication_show'>
                <div class='dropdown-divider'></div>
                <div class='notofication_info m-1'>
                    <h2 align=center>ไม่พบข้อมูล</h2>
                </div>
            </div>
            <div style='clear:both;'></div>
        </div>
    </div>



</div>
</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import {store} from '../store/index'
export default {
    name: 'NotiFication',
    store,
    // components: {Header,login},
    mounted: function() {
        this.data_notification()
    },
    data() {
        return {
            itmes: [],
            numdata: false
        }
    },
    methods: {
        data_notification() {
            let headers = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: "Bearer " + this.$cookie.get("token")

                }
            };
            let formData = {
                user_id: this.$cookie.get('user_id')
            };
            let list = [];
            let time_show = "";
            var i = 0;
            axios.post(this.$store.getters.url+"api/NotiFication", formData, headers).then(response => {
                console.log(response.data.notifications);
                var todate = new Date();
                var todateday = todate.getDate();
                var todatemonth = todate.getMonth();
                var todateyear = todate.getFullYear();
                var todatehours = todate.getHours();
                var todatemin = todate.getMinutes();
                var todateseconds = todate.getSeconds();

                $.each(response.data.notifications, function(key, notifications) {
                    time_show = "";
                    var fromdate = new Date(notifications.created_at);
                    var day = fromdate.getDate();
                    var month = fromdate.getMonth();
                    var year = fromdate.getFullYear();
                    var hours = fromdate.getHours();
                    var min = fromdate.getMinutes();
                    var seconds = fromdate.getSeconds();


                    var calyear = year - todateyear
                    var calmonth = month - todatemonth
                    var calday = day - todateday
                    var calhours = hours - todatehours
                    var calmin = min - todatemin

                    if (calday == 0 && calhours == 0) {
                        time_show = calmin + "นาที่";
                    } else if (calday == 0 && calhours != 0) {
                        time_show = calhours + "ซม";
                    } else if (calday == 1) {
                        time_show = "เมือวาน";
                    } else if (calday > 7) {
                        time_show = Number(calday % 7) + " สัปดาห"
                    } else if (calday != 0) {
                        time_show = calday + " วัน"
                    }


                    list.push({
                        id: notifications.id,
                        detail: notifications.detail,
                        status: notifications.status,
                        type: notifications.type,
                        user_id: notifications.user_id,
                        whatever_id: notifications.whatever_id,
                        created_at: notifications.created_at,
                        updated_at: notifications.updated_at,
                        time_show: time_show
                    });


                });
                this.itmes = list
                if (this.itmes.length == 0) {
                    this.numdata = false
                } else {
                    this.numdata = true
                }


                console.log(this.numdata);
            });
        },
        TransferAgain(payment_pics_id,id){
          // console.log(payment_pics_id);
          this.$cookie.set('TransferAgain', payment_pics_id, "30MIN");
          this.$cookie.set('notifications', id, "30MIN");
          this.$router.push("/TransferAgain")
        }
    },
    directives: {
   ClickOutside
 }
}
</script>
