<template>
<div class="container">
    <h1 class="text-center mb-3">ประวัติชำระเงิน</h1>

 <h3 class="text-center">{{MonthYear}}</h3>
 <h3 class="text-center mb-3" style="color:#FF0000;">ยังไม่ได้จ่าย</h3>
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
   >
   <template v-slot:cell(ชื่อ)="row" class="mt-1">
       {{row.item.user_name}}
   </template>
   <template v-slot:cell(ราคา)="row" class="mt-1">
     <div style="color:#FF0000;">
       {{row.item.price}} ฿
     </div>
   </template>


   </b-table>
   </div>
   <div v-else>
      <h3 class="text-center">ไม่มียอดค้างชำระเงิน</h3>
   </div>
</div>
</div>
</template>

<script>
export default {
    name: 'payment_history',
    mounted: function() {
      this.day()
      this.data_pay()


      // PaymentHistoryAdmin

    },
    data() {
     return {
       fields: ['ชื่อ','ราคา'],
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
      table_show:true
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
          status:"3",
          Orstatus:"1"
        };

        axios.post(this.$store.getters.url+"api/HistoryPaid",formData,headers).then(response => {
          console.log(response);
          console.log(response.data.payments.length);
          let list = [];
          let name = "";
          var price = 0;
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
                                return false
                            }
                          }
                      }
                  });
                });
              });
              list.push({ชื่อ:name,ราคา:price,id:payments_g.payment_id,user_name:name ,price:price})
            });
          }else {
            this.table_show = false
          }
            this.items = list
            console.log(list);
        });
      }
    }


}
</script>
