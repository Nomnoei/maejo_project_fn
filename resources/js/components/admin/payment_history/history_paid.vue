<template>
<div class="container">
    <h1 class="text-center mb-3">ประวัติชำระเงิน</h1>

 <h3 class="text-center">{{MonthYear}}</h3>
 <h3 class="text-center mb-3" style="color:#80A222;">จ่ายแล้ว</h3>
     <input type="text" id="search"  name="search" class="form-control mb-3" placeholder="ค้นหา...">


<div class="background-white">
  <div v-if="table_show">


    <b-table
    ref="selectableTable"
    :hover="hover"
    :fixed="fixed"
    :no-border-collapse="noCollapse"
    :items="items"
    :fields="fields"
    :head-variant="headVariant"
    :table-variant="tableVariant"
    selectable
    :select-mode="selectMode"
    @row-selected="onRowSelected"
   >


   <template v-slot:cell(ชื่อ)="row" class="mt-1">
       {{row.item.user_name}}
   </template>
   <template v-slot:cell(ราคา)="row" class="mt-1">
     <div style="color:#80A222;">
       {{row.item.price}} ฿
     </div>
   </template>
   <template v-slot:cell(พิมพ์ใบเสร็จ)="row" class="mt-1">
    <!-- {{row.item.pay}} -->
    <img src="image/print.png" width=6%>
   </template>

   </b-table>
   </div>
   <div v-else>
         <h3 class="text-center">ไม่มีการชำระเงิน</h3>
   </div>
</div>

<vue-html2pdf :show-layout="false" :enable-download="true" :preview-modal="true" :paginate-elements-by-height="1400" filename="FileBill" :pdf-quality="2" pdf-format="a4" pdf-orientation="portrait" pdf-content-width="800px"
  @progress="onProgress($event)" @hasStartedGeneration="hasStartedGeneration()" @hasGenerated="hasGenerated($event)" ref="html2Pdf">
    <section slot="pdf-content">
        <!-- PDF Content Here -->
        <div class="container">
          <div v-for="item in items1">


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
                  <th  class="border1" width="90%">รายการ</th>
                  <th class="border1" width="130px">จำนวนเงิน</th>
              </tr>
              </div>
              <div v-for="data in address">

              <tr class="border1">
              <td width="90%">
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
              <td align=right width="90%">ผลรวม</td>
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
import VueHtml2pdf from 'vue-html2pdf'
export default {
    name: 'payment_history',
    components: {
        VueHtml2pdf
    },
    mounted: function() {
      this.day()
      this.data_pay()


      // PaymentHistoryAdmin

    },
    data() {
     return {
       fields: ['ชื่อ','ราคา','พิมพ์ใบเสร็จ'],
       items: [
         // {เดือน: 'มกราคม 2020',จ่ายแล้ว: '1',ยังไม่ได้จ่าย: '0'},
         // {เดือน: 'กุมภาพันธ 2020์',จ่ายแล้ว: '1',ยังไม่ได้จ่าย: '0'},
         // {เดือน: 'มีนาคม 2020',จ่ายแล้ว: '0',ยังไม่ได้จ่าย: '1'}
       ],

       hover: true,
      fixed: false,
       headVariant: 'dark',
      tableVariant: '',
      noCollapse: false,
      rate:'',
      rateState: null,
      MonthYear:'',
      table_show:true,
      selectMode: 'single',
      selected: [],
      id:"",
      date:"",
      items1:[],
      addressaddress:[],
     }
   },
    methods: {
      day(){
        var test = new Date(this.$store.getters.pay_date).getMonth();
        var test2 = new Date(this.$store.getters.pay_date).getYear();
        var Year = test2 + 1900;
        let thai_month_arr = [
          "มกราคม",
           "กุมภาพันธ์",
           "มีนาคม",
           "เมษายน",
           "พฤษภาคม",
           "มิถุนายน",
           "กรกฎาคม",
           "สิงหาคม",
           "กันยายน",
           "ตุลาคม",
           "พฤศจิกายน",
           "ธันวาคม"
        ];
        var Month = thai_month_arr[test];

        let MonthYear = Month + " " +Year;
        this.MonthYear = MonthYear;
      },
      data_pay(){
        let headers = {
          headers: {
              "Content-Type":"application/json",
              Accept: "application/json",
              "X-Requested-With":"XMLHttpRequest",
              Authorization: "Bearer " + this.$cookie.get("token")
          }
        };
        let formData = {
          date:this.$store.getters.pay_date,
          status:"2",
          Orstatus:"4"
        };

        axios.post(this.$store.getters.url+"api/HistoryPaid",formData,headers).then(response => {
          // console.log(response);
          // console.log(response.data.payments.length);
          let list = [];
          let name = "";
          var price = 0;
          let date = "";
          if (response.data.payments.length > 0) {
            $.each(response.data.payments_g, function(key, payments_g) {
              let name = "";
              let price = 0;
              $.each(response.data.payments, function(key, payments) {
                $.each(response.data.AddressMember, function(key, AddressMember) {
                  $.each(response.data.User, function(key, User) {
                      if (payments_g.payment_id == payments.payment_id) {
                          if (payments.address_id == AddressMember.id) {
                            if (AddressMember.user_id == User.id) {
                              price = Number(price) + (Number(payments.price) + Number(payments.price_old))
                              name = User.name
                              date = payments.date
                                return false
                            }
                          }
                      }
                  });
                });
              });
              list.push({ชื่อ:name,ราคา:price,id:payments_g.payment_id,user_name:name ,price:price,date:date})
            });
            this.items = list
          }else {
            this.table_show = false
          }
            // console.log(list);
        });
      },
      onRowSelected(item){
        this.selected = item
        // console.log(item);
        this.id = item[0].id
        this.date = item[0].date
        this.data_PrintReceipt()
        // console.log(this.id);
        this.$refs.html2Pdf.generatePdf()
      },
      onProgress(e) {

      },
      hasStartedGeneration() {

      },
      hasGenerated(e) {

      },
      data_PrintReceipt(){
        let list=[];
        let list2=[];
        var total_money = 0;
        let name=""
        let tel =""
        let id_pay = ""
        let date_pay = ""
        let headers = {
          headers: {
              "Content-Type":"application/json",
              Accept: "application/json",
              "X-Requested-With":"XMLHttpRequest",
              Authorization: "Bearer " + this.$cookie.get("token")
          }
        };
        let formData = {
          id : this.id,
          date:this.date,
          status:"4",
          status_user:"1"
        };
        axios.post(this.$store.getters.url+"api/PrintReceipt",formData,headers).then(response => {
              console.log(response.data);
              $.each(response.data.payments_g, function(key, payments_g) {
                $.each(response.data.payments, function(key, payments) {
                  name = ""
                  tel =""


                  $.each(response.data.AddressMembers, function(key, AddressMembers) {
                      if (payments.address_id == AddressMembers.id) {
                        $.each(response.data.user, function(key, user) {
                            if (AddressMembers.user_id == user.id) {
                              name = user.name
                              tel =user.tel
                              id_pay = payments.payment_id
                              date_pay = payments.date
                              total_money = total_money + Number(payments.price);
                              list2.push({id:payments.payment_id,address:AddressMembers.house_num+" ซอย : "+AddressMembers.alley+" หมู่บ้าน : "+AddressMembers.moo+" ตำบล : "+AddressMembers.district,price:payments.price,type:AddressMembers.type_pay_id})
                            }
                          })
                            // list.push({id:payments.payment_id,date:payments.date,name:name,tel:tel,total_money:total_money})
                          // list2.push({id:payments.payment_id,address:AddressMembers.house_num+" ซอย : "+AddressMembers.alley+" หมู่บ้าน : "+AddressMembers.moo+" ตำบล : "+AddressMembers.district,price:payments.price,type:AddressMembers.type_pay_id})
                      }
                  })

                })
                  list.push({id:id_pay,date:date_pay,name:name,tel:tel,total_money:payments_g.sum})
              })

              this.items1 = list
              this.address = list2
              // console.log(this.items1);
              // console.log(this.address);
        });
      }
    }


}
</script>
