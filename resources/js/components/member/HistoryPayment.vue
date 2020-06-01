<template>

  <div class="container">
    <h1 class="text-center mb-3">ประวัติชำระเงิน</h1>
    <div class="background-white">
        <b-table
         :hover="hover"
         :fixed="fixed"
         :no-border-collapse="noCollapse"
         :items="items"
         :fields="fields"
         :head-variant="headVariant"
         :table-variant="tableVariant"
       ></b-table>
    </div>

  </div>


</template>

<script>
    export default {
      name: 'HistoryPayment',
      mounted:function(){
        this.date_pay();
      },
      data() {
       return {
         fields: ['month', 'price'],
         items: [
            // { price: 600, month: 'มกราคม' },
            // { price: 700, month: 'กุมภาพันธ์' },
            // { price: 800, month: 'มีนาคม' },
            // { price: 100, month: 'เมษายน' }
          ],


           hover: true,
           fixed: false,
           headVariant: 'dark',
           tableVariant: '',
           noCollapse: false
       }
     },
      methods:{
          date_pay(){
            let list=[];
            var money = 0;
            let date = "";
            let month = "";
            let thai_month ="";
            let headers = {
              headers: {
                  "Content-Type":"application/json",
                  Accept: "application/json",
                  "X-Requested-With":"XMLHttpRequest",
                  Authorization: "Bearer " + this.$cookie.get("token")
              }
            };
            let formData = {
              user_id : this.$cookie.get("user_id")
            };
            axios.post(this.$store.getters.url+"api/history",formData,headers).then(response => {
              console.log(response);
            //   $.each(response.data.payments_num, function(key, payments_num) {
            //   $.each(response.data.address, function(key, address) {
            //         money = 0
            //     $.each(response.data.payment, function(key, payment) {
            //           if (payment.address_id == address.id) {
            //               money = money + Number(payment.price)
            //           }
            //       })
            //     })
            //     list.push({ money:money })
            //   // console.log(list);
            // })
            $.each(response.data.payments_num, function(key, payments_num) {
                  $.each(response.data.address, function(key, address) {
                        $.each(response.data.payment, function(key, payment) {
                          if (payments_num.date == payment.date) {
                              if (payment.address_id == address.id) {
                                    money = money+Number(payment.price)
                                    date = payment.date
                                    month = new Date(date).getMonth()

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
                                    thai_month = thai_month_arr[month];
                              }
                          }
                        })
                  })




              list.push({month:thai_month, price:money })
            })
            this.items = list
            console.log(this.items);
            });
          }
      }


    }
</script>
