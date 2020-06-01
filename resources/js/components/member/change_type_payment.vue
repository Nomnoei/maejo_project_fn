<template>

  <div class="container">
    <h1 class="text-center">รูปแบบการชำระเงิน</h1>
        <div class="background-white" align=center>
          <div class="h3 mt-3" style="color:red;">
        ***หากต้องการเปลี่ยนรูปแบบชำระเงินอีกครั้งต้อง <b><u>ชำระเงินในครั้งถัดไปก่อน</u></b>
    </div>

    <b-table
    stacked
    :fixed="fixed"
     :hover="hover"
     :borderless="borderless"
     :items="items"
     :fields="fields"
     thead-class="hidden_header"
      >

      <template v-slot:cell(address)="row" class="mt-1">
        <img src="image/house.png" width="20rem" alt=""> {{row.item.address}}

      </template>

      <template v-slot:cell(selected)="row">
        <div class="input-group mt-2">
                     <b-form-select v-model="row.item.selected" :options="options"></b-form-select>
                      </div>
      </template>



    </b-table>

<div align=center><a href="#"><button  @click.prevent="getdata" type="submit" class="btn btn-outline-success mt-3 btn_bg_white" style="width:13.5rem;">บันทึกรูปแบบ</button></a></div>
      <!-- {{items}} -->
    </div>
  </div>


</template>

<script>
    export default {
      name: 'change_type_payment',
      mounted:function(){
        this.data_home()
      },data(){
        return{
           fields: ['address','selected'],

        items: [
          // { id:"1" , address: "555 ซอย 7 หมู่ 5 ตำบล 555" , selected:'1' },

        ],
          hover: true,
           borderless: true,
           fixed: true,
          selected: null,
        options: [
          { value: null, text: 'หมวดหมู่' },
          { value: '1', text: '1 เดือน' },
          { value: '3', text: '3 เดือน' },
          { value: '6', text: '6 เดือน' },
          { value: '12', text: '12 เดือน'}
        ]

        }
      },
      methods:{
        getdata(){
          // console.log(this.items);
          this.$confirm(
            "คุณต้องการแก้ไขรูปแบบชำระเงิน ?",
            "คำเตือน",
            "question"
          )
            .then(() => {
              let headers = {
                headers: {
                    "Content-Type":"application/json",
                    Accept: "application/json",
                    "X-Requested-With":"XMLHttpRequest",
                    Authorization: "Bearer " + this.$cookie.get("token")
                }
              };
              let formData = {
                user_id : this.$cookie.get("user_id"),
                status : "1",
                items : this.items
              };
              // this.$store.getters.url+
              axios.post(this.$store.getters.url+"api/UpdatePayType",formData,headers).then(response => {
                this.$alert(
                    "แก้ไขรูปแบบชำระเงินสำเร็จ",
                    "สำเร็จ",
                    "success",
                    {
                       confirmButtonText: "ตกลง",
                     }
                  ).then(()=>this.$router.go());
              })
            })


        },
        data_home(){
          let list=[];
          let headers = {
            headers: {
                "Content-Type":"application/json",
                Accept: "application/json",
                "X-Requested-With":"XMLHttpRequest",
                Authorization: "Bearer " + this.$cookie.get("token")
            }
          };
          let formData = {
            user_id : this.$cookie.get("user_id"),
            status : "1"
          };
          // this.$store.getters.url+
          axios.post(this.$store.getters.url+"api/ThisMemberAddress",formData,headers).then(response => {
            console.log(response.data.success)
            $.each(response.data.success, function(key, address) {
                list.push({ id:address.id , address: address.house_num+" ซอย : "+address.alley+" หมู่ : "+address.moo+" ตำบล : "+address.district , selected:address.type_pay_id })
            })
            // console.log(list);
            this.items = list
          })
        },


      }


    }
</script>
