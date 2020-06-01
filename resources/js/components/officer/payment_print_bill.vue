<template>

    <div class="container" >
      <h2 class="text-center mb-3">พิมพ์ใบเรียกชำระเงิน</h2>

      <div class="btn btn_bg_green_1 float-left off_check" @click="selectAllRows">
            เลือกทั้งหมด
        </div>

        <div class="float-right">
            <a href="#"><button  @click="generateReport" class="btn btn-success" align=right>พิมพ์ที่เลือก</button></a>
        </div>

        <br><br>
        <div v-if="showNoDate">


        <div class="background-white">
        <b-table
        stacked
        :fixed="fixed"
         ref="selectableTable"
         selectable
         :hover="hover"
         :borderless="borderless"
         :select-mode="selectMode"
         :fields="fields"
         :items="items"
         @row-selected="onRowSelected"
          >
        </b-table>

        </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="background-white">
      <h1>ไม่พบข้อมูล</h1>
      </div>
      </div>
    </div>

    <vue-html2pdf :show-layout="false" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" filename="FileBill" :pdf-quality="2" pdf-format="a4" pdf-orientation="portrait" pdf-content-width="800px"
      @progress="onProgress($event)" @hasStartedGeneration="hasStartedGeneration()" @hasGenerated="hasGenerated($event)" ref="html2Pdf">
        <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div v-for="pay in id">




            <div class="container">
                <br><br><br>
                <div class="info floatright">
                    <div align=right style="margin-top:12px;">
                        พิมพ์ใบเรียกชำระเงิน
                    </div>
                    <div style="margin-top:27px;" align=right>
                        เลขที่ : {{pay.payment_id}} <br>

                        วันที่ {{pay.date}}
                    </div>
                </div>
                <div class="header" align=left>
                    <img src="image/logo_2.png"> <br><br>
                    สำนักงานเทศบาลเมืองแม่โจ้ ต.หนองหาร อ.สันทราย จ.เชียงใหม่ 50290 <br>
                    โทรศัพท์ 053-498621
                </div>
                <div class="data_user">
                    เรียกเก็บไปยัง: <br>
                    {{pay.name}} <br>

                    <br>
                    {{pay.tel}}
                </div>
                <div class="data_show">
                    <table width="100%" class="border1">
                      <div>
                          <div>
                        <tr align=center class="border1">
                            <th width="650px" class="border1">คำอธิบาย</th><th class="border1" width="130px">จำนวนเงิน</th>
                        </tr>
                          </div>
                        </div>

                        <div v-for="data in datas">
                            <div v-if="pay.payment_id == data.payment_id">
                        <tr class="border1">
                            <td width="650px" class="border1">
                                <font style="margin-left:5px;">{{data.address}} <br> เงินค่าเก็บขยะทั้งหมด {{data.type_pay_id}} เดือน</font> <br>
                            </td>
                            <td align=right class="border1"  width="130px">
                                <font style="margin-right:3px;">{{data.price}}</font>
                            </td>
                        </tr>

                        <tr class="border1">
                            <td width="650px" class="border1">
                                <font style="margin-left:5px;">ยอดค้างชำระ {{data.type_pay_id}} เดือนที่แล้วของ<br> {{data.address}} </font> <br>
                            </td>
                            <td align=right class="border1"  width="130px">
                                <font style="margin-right:3px;">{{data.price_old}}</font>
                            </td>
                        </tr>


                      </div>
                  </div>

                  <div>
                      <div>
                        <tr class="border1">
                            <td align=right class="border1" width="650px">ผลรวม</td>
                            <td align=right class="border1" width="130px"><font style="margin-right:3px;">{{pay.total_money}}</font></td>
                        </tr>
                      </div>
                  </div>

                    </table>
                </div>
                <br><br>
                <h3 align=center>เทศบาลเมืองแม่โจ้ ขอขอบคุณที่ให้ความร่วมมือ</h3>

            </div>
            <div class="page-break"></div>
          </div>
        </section>

    </vue-html2pdf>
</div>
</template>

<script>

  import VueHtml2pdf from 'vue-html2pdf'
    export default {
      name: 'PaymentPrintBill',

      components:{
        VueHtml2pdf
      },
      mounted:function(){
        if(this.$cookie.get('status_user') == 1){
            this.$router.push("/");
        }
        this.data_pay();
      },
      data(){
        return{
          fields: ['name', 'tel'],
        items: [
          // { name: "xxxxxxxxxxxxxxxx", tel: "0900000000", },
        ],
          hover: true,
           borderless: true,
           fixed: true,
          selectMode: 'multi',
          selected: [],
          selectAll: false,
          datas: [],
          id: [],
          showNoDate :true
        }
      },
      methods:{
        onRowSelected(items){
          let list= [];
          $.each(items, function(key, items) {
            list.push({payment_id:items.payment_id})
          })
          this.selecteddata = list
          // console.log(this.selecteddata);
        },
        selectAllRows(){
          if (this.selectAll == false) {
            this.$refs.selectableTable.selectAllRows();
            this.selectAll = true
          }else {
            this.$refs.selectableTable.clearSelected()
            this.selectAll = false
          }

        },
        data_pay(){
          let headers = {
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "X-Requested-With": "XMLHttpRequest",
                  Authorization: "Bearer " + this.$cookie.get("token")
              }
          };
          let formData = {
            status:"1",
            Orstatus:"3"
          };
          let list = [];
          let list2 = [];
          let name = "";
          let tel ="";

          axios.post(this.$store.getters.url+"api/NotPayData", formData, headers).then(response => {
            // console.log(response.data.payments.length);
            if (response.data.payments.length == 0) {
              this.showNoDate = false
                return false
            }
              $.each(response.data.payments_g, function(key, payments_g) {
                name = "";
                  $.each(response.data.payments, function(key, payments) {
                      if (payments_g.payment_id == payments.payment_id) {
                          $.each(response.data.AddressMember, function(key, AddressMember) {
                            if (payments.address_id == AddressMember.id) {
                              $.each(response.data.user, function(key, user) {
                                if (user.id == AddressMember.user_id) {
                                  name = user.name
                                  tel = user.tel
                                }
                              })
                            }
                          })
                      }
                  })
                    list.push({payment_id:payments_g.payment_id , name:name,tel:tel})
                    // list2.push({payment_id:payments_g.payment_id})
              })
              this.items = list
              // this.payment_id = list2
              // console.log(this.payment_id);

          })


        },
        generateReport() {
          if (!this.selecteddata) {
            return false
          }
          this.data_bill();
            this.$refs.html2Pdf.generatePdf()
        },
        onProgress(e) {

        },
        hasStartedGeneration() {

        },
        hasGenerated(e) {

        },
        data_bill() {

            let headers = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: "Bearer " + this.$cookie.get("token")
                }
            };
            let formData = {
                // id : [{"1"}]
                payment_id: this.selecteddata
            };
            let list = [];
            let list2 = [];
            var total_money = 0;
            let nameuser = "";
            let teluser = "";
            let date = "";
            axios.post(this.$store.getters.url+"api/bill", formData, headers).then(response => {
                // console.log(response.data);
                // console.log(response.data.payments);
                // console.log(response.data.id.payment_id);
                // console.log(response.data.AddressMember);
                // console.log(response.data.user);
                $.each(response.data.id.payment_id, function(key, payment_id) {
                  total_money = 0
                  teluser = ""
                  nameuser = ""
                  date = ""
                    $.each(response.data.payments, function(key, payments) {
                        if (payment_id.payment_id == payments.payment_id) {
                          total_money = total_money + (Number(payments.price) + Number(payments.price_old))
                          date = payments.date
                            $.each(response.data.AddressMember, function(key, AddressMember) {
                                if (payments.address_id == AddressMember.id) {

                                    $.each(response.data.user, function(key, user) {
                                        if (AddressMember.user_id == user.id) {
                                          nameuser = user.name
                                          teluser = user.tel
                                            list.push({
                                                payment_id: payment_id.payment_id,
                                                price: payments.price,
                                                price_old: payments.price_old,
                                                address: AddressMember.house_num + " ซอย :" + AddressMember.alley + " หมู่บ้าน : " + AddressMember.moo + " ตำบล :  " + AddressMember.district,
                                                name:user.name,
                                                tel:user.tel,
                                                type_pay_id:AddressMember.type_pay_id,
                                                total_money:total_money
                                            });

                                        }
                                    })
                                }
                            });
                        }
                    });
                    list2.push({payment_id: payment_id.payment_id,total_money:total_money,name:nameuser,tel:teluser,date:date})
                });
                // console.log(list);
                // console.log(list2);
                this.datas = list
                this.id = list2
                // console.log(this.datas);
                // console.log(this.id);
            });

        }

      }


    }
</script>
  <style>
      body{
        background:#EFEFEF;
      }
  </style>
