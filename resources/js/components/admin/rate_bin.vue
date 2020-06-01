<template>
<div class="container">
    <h1 class="text-center mb-3">อัตราค่าเก็บขยะ</h1>

    <div class="mb-3" align=center>
    <button type="button" class="btn btn-success" v-b-modal.my-modal>
      เปลี่ยนอัตราค่าเก็บขยะ
    </button>

    <b-modal id="my-modal"
    title="เปลี่ยนอัตราค่าเก็บขยะ"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk">

    <b-form-input type="text"  placeholder="เปลี่ยนอัตราค่าเก็บขยะ" class="form-control" v-model="rate" @keypress="isNumber($event)"></b-form-input>
  </b-modal>
  </div>

  <div class="rate_bin_present mb-3">
  <h4 class="text-center mt-2">อัตราปัจจุบัน : {{this.rate}}</h4>

</div>

<h3 class="text-center mb-3">ประวัติอัตราค่าเก็บขยะย้อนหลัง</h3>
<div class="background-white">
    <b-table
    ref="selectableTable"
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
    name: 'rate_bin',
    mounted: function() {
      this.date_rate_bins();
      if(this.$cookie.get('status_user') == 1 || this.$cookie.get('status_user') == 2){
          this.$router.push("/");
      }
    },
    data() {
     return {
       fields: ['อัตราค่าเก็บขยะ','วันที่เปลี่ยนแปลง'],
       items: [],
       hover: true,
      fixed: false,
       headVariant: 'dark',
      tableVariant: '',
      noCollapse: false,
      rate:'',
      rateState: null,
     }
   },
    methods: {
      resetModal() {
       this.rate = ''
       this.rateState = null
     },
     handleOk(bvModalEvt) {

        console.log(this.rate);
// RatePrice
      let headers = {
        headers: {
            "Content-Type":"application/json",
            Accept: "application/json",
            "X-Requested-With":"XMLHttpRequest",
            Authorization: "Bearer " + this.$cookie.get("token")
        }
      };
        let formData = {
          rate_price : this.rate
      };
      axios.post(this.$store.getters.url+"api/AddRatePrice",formData,headers).then(response => {
        console.log(response);
        // this.$router.push("/Officer");
      });
      },
      isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },
    date_rate_bins(){
      let headers = {
        headers: {
            "Content-Type":"application/json",
            Accept: "application/json",
            "X-Requested-With":"XMLHttpRequest",
            Authorization: "Bearer " + this.$cookie.get("token")
        }
      };
        let formData = {

      };
      axios.get(this.$store.getters.url+"api/RatePrice","",headers).then(response => {
        this.rate = response.data.success[0].rate_price
        // console.log(response.data.success);
        let list=[];
        $.each(response.data.success, function(key, value) {
          var currentDate = new Date(value.created_at).toLocaleString()
             list.push({อัตราค่าเก็บขยะ:value.rate_price,วันที่เปลี่ยนแปลง:currentDate,index:key});
           });
           this.items = list;
           // console.log(list);
      });



           // console.log(currentDate);
           // var test = new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth()}-${(new Date()).getDate()}`)
           var test = new Date().getMonth();

           // var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');
           console.log(test);
    }
    }


}
</script>
