<template>
<div id="test">

    <button @click="generateReport">print</button>



    <vue-html2pdf :show-layout="false" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" filename="haha" :pdf-quality="2" pdf-format="a4" pdf-orientation="portrait" pdf-content-width="800px"
      @progress="onProgress($event)" @hasStartedGeneration="hasStartedGeneration()" @hasGenerated="hasGenerated($event)" ref="html2Pdf">
        <section slot="pdf-content">
          <div class="container">
            <div v-for="item in items">


            <br>
            <div class="floatright">
                ใบเสร็จรับเงิน
            </div>
              <div class="clearfloat"></div>

              <div class="header" align=center>
                <br>
                  <img src="image/logo_2.png"> <br><br>
                  สำนักงานเทศบาลเมืองแม่โจ้ ต.หนองหาร อ.สันทราย จ.เชียงใหม่ 50290 <br>
                  โทรศัพท์ 053-498621
              </div>
              <div class="info" style="margin-top:5px;">
                  <div class="floatright">
                    เลขที่ : 2 <br>
                    วันที่ 02/03/2020
                  </div>

              <div class="floatleft">
                  ได้รับเงินจาก {{item.name}} โทร. {{item.tel}}
              </div>
              <div class="clearfloat"></div>
            </div>
            <br><br>
              <div class="data_show">
                  <table style="margin-top:5px;"class="border1" width="100%">
                    <div>


                    <tr align=center class="border1" >
                    <th  class="border1" width="650px">รายการ</th>
                    <th class="border1" width="130px">จำนวนเงิน</th>
                </tr>
                </div>
                <div v-for="data in address">

                <tr class="border1">
                <td width="650px">
                    <font style="margin-left:5px;">ค่าเก็บขยะทั้งหมด {{data.type}} เดือน</font> <br>
                    <font style="margin-left:5px;"> {{data.address}}</font>
                </td>
                <td align=right class="border1" width="130px">
                    <font style="margin-right:3px;">
                        {{data.price}}
                    </font>
                </td>
              </tr>

            </div>

            <div>

              <tr class="border1">
                <td align=right width="650px">ผลรวม</td>
                <td align=right class="border1" width="130px">
                    <font style="margin-right:3px;">{{item.total_money}}.00</font>
                </td>
              </tr>
      </div>
                  </table>
              </div>
              <div class="" align=right style="margin-top:5px;">
            <br><br>
              ...............…..............................................................….ผู้รับเงิน
          </div>
          </div>
          </div>
        </section>

    </vue-html2pdf>


</div>
</template>

<script>
// import defaultVFS from '../../defaultVFS';

import jsPDF from 'jspdf';
import VueHtml2pdf from 'vue-html2pdf'
// import KanitFont from './Kanit-Regular.ttf';
export default {
    components: {
        VueHtml2pdf
    },
    mounted: function() {
        // this.data_bill()
        this.data_PrintReceipt()
    },
    data() {
        return {
          items1:[],
          address:[],
        }
    },
    methods: {
        generateReport() {
            this.$refs.html2Pdf.generatePdf()
        },
        onProgress(e) {

        },
        hasStartedGeneration() {

        },
        hasGenerated(e) {

        },
        data_PrintReceipt() {

        },
        data_PrintReceipt(){
          let list=[];
          let list2=[];
          var total_money = 0;
          let name=""
          let tel =""
          let headers = {
            headers: {
                "Content-Type":"application/json",
                Accept: "application/json",
                "X-Requested-With":"XMLHttpRequest",
                Authorization: "Bearer " + this.$cookie.get("token")
            }
          };
          let formData = {
            id : "2",
            date:"2020-05-25",
            status:"4",
            status_user:"1"
          };
          axios.post("http://127.0.0.1:8000/api/PrintReceipt",formData,headers).then(response => {
                console.log(response.data);
                $.each(response.data.payments, function(key, payments) {
                  name = ""
                  tel =""
                  total_money = 0
                  $.each(response.data.AddressMembers, function(key, AddressMembers) {
                      if (payments.address_id == AddressMembers.id) {
                        $.each(response.data.user, function(key, user) {
                            if (AddressMembers.user_id == user.id) {
                              name = user.name
                              tel =user.tel
                              total_money = total_money + Number(payments.price);
                              list2.push({id:payments.payment_id,address:AddressMembers.house_num+" ซอย : "+AddressMembers.alley+" หมู่บ้าน : "+AddressMembers.moo+" ตำบล : "+AddressMembers.district,price:payments.price,type:AddressMembers.type_pay_id})
                            }
                          })
                      }
                  })
                  list.push({id:payments.payment_id,date:payments.date,name:name,tel:tel,total_money:total_money})
                })
                this.items = list
                this.address = list2
                console.log(this.items);
                console.log(this.address);
          });
        }
    }
}
</script>
<style>
    .header {}

      .header img {
          margin-top: 30px;
          width: 25rem;
      }

.container {
    width: 100%;
    height: auto;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    /* border: solid 1px red; */
}

.info {
  height: 65px;

}

.floatright {
    float: right;
}

.data_user {
    margin-top: 20px;
}

.data_show {
    margin-top: 20px;
}
.clearfloat {
          clear: both;
      }

/* .table_1 table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
        } */

.border1 {
    border: 1px solid black;
    border-collapse: collapse;
}

.header img {
    margin-top: 10px;
    width: 15rem;
}

.page-break {
    page-break-after: always;
}

@font-face {
    font-family: 'Kanit';
    font-style: normal;
    font-weight: normal;
    src: url("{{ public_path('fonts/Kanit-Regular.ttf') }}") format('truetype');
}

@font-face {
    font-family: 'Kanit';
    font-style: normal;
    font-weight: bold;
    src: url("{{ public_path('fonts/Kanit-Bold.ttf') }}") format('truetype');
}
</style>
