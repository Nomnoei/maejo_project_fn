<template>
<div class="container">

    <h1 class="text-center">เลือกยืนยันการชำระเงิน</h1>
    <div class="background-white">

<div v-if="show_text">


        <b-table stacked :fixed="fixed" :items="items" :fields="fields" hover :borderless="borderless" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected">




            <template v-slot:cell(show_details)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>

            </template>

            <template v-slot:row-details="row">
                <b-card>
                    <b-button size="sm" class="btn btn-danger" @click="cancel(row.item.id , row.item.user_id )">ใบเสร็จไม่ถูกต้อง</b-button>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b></b></b-col>
                        <!-- <b-col>{{ row.item.id }}</b-col> -->
                    </b-row>

                    <!-- <b-row class="mb-2"> -->
                    <div align=center class="mb-3">
                        <b-img v-bind:src="row.item.src" v-bind="mainProps" alt="Responsive image"></b-img>
                    </div>
                    <!-- </b-row> -->

                    <div v-for="data in row.item.detiil" :key="detiil.index">
                        <hr>
                        ที่อยู่ {{data.address}} ราคา {{data.price}}
                        <hr>
                    </div>
                </b-card>
            </template>
            <template v-slot:cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                    <span aria-hidden="true">&check;</span>
                    <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                    <span aria-hidden="true">&nbsp;</span>
                    <span class="sr-only">Not selected</span>
                </template>
            </template>
        </b-table>
        </div>
        <div v-else>
          <h3 class="text-center">ไม่มีการชำระเงิน</h3>
        </div>

    </div>

    <br>

    <div align=center><input type="button"  v-if="show_text" @click="payment_confirm" class="btn btn-outline-success btn_bg_white" style="width:13.5rem;" value="ยืนยันการชำระเงิน"></div>

</div>
</template>

<script>
export default {
    name: 'PaymentConfirm',
    mounted: function() {
        if (this.$cookie.get('status_user') == 1) {
            this.$router.push("/");
        }
        this.data_address();

        // console.log(this.selecteddata.length);
    },
    data() {
        return {
            mainProps: {
                width: '300%',
                class: 'my-5'
            },
            fields: ['first_name', 'pay', 'show_details', 'selected'],
            items: [
                // { first_name: 'Dickerson', pay: '100฿' ,id: 1 , src:'http://127.0.0.1:8050/slip/php8898.tmp.jpg'
                // , detiil:[{address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "80"  },
                // {address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "80"  }] },
                //
                //
                // { first_name: 'Larsen', pay: '200฿' , id: 2 , src:'http://127.0.0.1:8050/slip/php1386.tmp.jpg'
                // , detiil:[{address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "80fgh"  },
                // {address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "80sfd"  }]},
                //
                //
                // { first_name: 'Jami', pay: '100฿' , id: 3 ,  src:'',
                //  detiil:[{address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "1000"  },
                // {address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "0111"  }]}
            ],
            detiil: [
                // {address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "80" , id: 1 },
                // {address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "80" , id: 1 },
                // {address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "90" , id: 2 },
                // {address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "10" , id: 2 },
                // {address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "20" , id: 2 },
                // {address: "8887 ซอย - หมู่บ้าน บ้านแพะป่าห้า (บางส่วน) ตำบล หนองหาร" , price : "1000" , id: 3 }
            ],
            selecteddata: [],
            borderless: true,
            fixed: true,
            show_text:true
        }
    },
    methods: {
        onRowSelected(items) {
            this.selecteddata = items
            console.log(this.selecteddata);
        },
        data_address() {
            let headers = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: "Bearer " + this.$cookie.get("token")
                }
            };
            let formData = {
                status_user: "1",
                status_address: "1",
                status_payments: "3",
            };
            let list1 = [];
            let list2 = [];
            let list3 = [];
            let list4 = [];
            let detiil = [];
            axios.post(this.$store.getters.url+"api/SelectPayAll", formData, headers).then(response => {
                // console.log(response);
                if (response.data.PaymentPic.length == 0) {
                  this.show_text = false
                }

                $.each(response.data.payments_g, function(key, payments_g) {
                    $.each(response.data.PaymentPic, function(key, pic) {
                        if (payments_g.id == pic.id) {
                            list1.push({
                                id: payments_g.id,
                                price: payments_g.total,
                                scr: pic.picture,
                                payment_id: pic.payment_id,
                                address_id: pic.address_id
                            });
                            return false
                        }
                    });
                });
                // console.log(list1);
                $.each(list1, function(key, list1) {
                    $.each(response.data.address, function(key, address) {
                        if (list1.address_id == address.id) {
                            list2.push({
                                id: list1.id,
                                price: list1.price,
                                scr: list1.scr,
                                payment_id: list1.payment_id,
                                address_id: list1.address_id,
                                user_id: address.user_id
                            })
                            return false
                        }

                    });
                });
                // console.log(list2);

                $.each(list2, function(key, list2) {
                    $.each(response.data.user, function(key, user) {
                        if (list2.user_id == user.id) {
                            list3.push({
                                id: list2.id,
                                price: list2.price,
                                scr: list2.scr,
                                payment_id: list2.payment_id,
                                user_id: list2.user_id,
                                user_name: user.name
                            })
                            return false
                        }
                    });
                });

                // console.log(list3);
                let url = this.$store.getters.url
                $.each(list3, function(key, list2) {
                    let data_address = [];
                    $.each(response.data.PaymentPic, function(key, PaymentPic) {
                        if (list2.id == PaymentPic.id) {
                            $.each(response.data.address, function(key, address) {
                                if (PaymentPic.address_id == address.id) {
                                    data_address.push({
                                        Payment_id: PaymentPic.payment_id,
                                        address_id: address.id,
                                        address: "ที่อยู่ " + address.house_num + "ซอย " + address.alley + "หมู่บ้าน  " + address.moo + "ตำบล " + address.district,
                                        price: PaymentPic.price
                                    });
                                    // return false
                                }
                            });
                        }
                    });
                    list4.push({
                        id: list2.id,
                        pay: list2.price,
                        src: url+"slip/" + list2.scr,
                        payment_id: list2.payment_id,
                        user_id: list2.user_id,
                        first_name: list2.user_name,
                        detiil: data_address
                    })
                });
                // console.log(this.items);
                // console.log(list4);
                this.items = list4

            });
        },
        payment_confirm(){
          if (this.selecteddata.length == 0) {
            return false
          }
          this.$confirm(
            "คุณต้องการที่จะยืนยันการชำระเงิน ?",
            "คำเตือน",
            "question"
          )
            .then(() => {

          let headers = {
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "X-Requested-With": "XMLHttpRequest",
                  Authorization: "Bearer " + this.$cookie.get("token")
              }
          };
          let formData = {
            data: this.selecteddata
          };
          axios.post(this.$store.getters.url+"api/PaymentConfirm", formData, headers).then(response => {
            console.log(response);
            this.$alert(
                "ทำการยืนยันการชำระเงินเสร็จสิ้น",
                "สำเร็จ",
                "success",
                {
                   confirmButtonText: "ตกลง",
                 }
              ).then(() => this.$router.go());
          });
          });
        },
        cancel(payment_id,user_id){
          this.$confirm(
            "คุณต้องการที่จะ... ?",
            "คำเตือน",
            "question"
          )
            .then(() => {
              // console.log(payment_id + " <---> " + user_id);
              let headers = {
                  headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      "X-Requested-With": "XMLHttpRequest",
                      Authorization: "Bearer " + this.$cookie.get("token")
                  }
              };
              let formData = {
                payment_id:payment_id,
                user_id:user_id
              };
              axios.post(this.$store.getters.url+"api/CancelPayment", formData, headers).then(response => {
                this.$alert(
                    "ทำการยืนยันการชำระเงินเสร็จสิ้น",
                    "สำเร็จ",
                    "success",
                    {
                       confirmButtonText: "ตกลง",
                     }
                  ).then(()=> this.makeToast('success'));
              });


            });

        },
        makeToast(variant = null) {
        this.$bvToast.toast('Toast body content', {
          title: `Variant ${variant || 'default'}`,
          variant: variant,
          solid: true
        })
        this.$router.go();
      }
    }


}
</script>
