<template>
<div class="container">

  <transferAssignee v-if="step===1"></transferAssignee>
  <transferRecipient v-if="step===2"></transferRecipient>
  <transferPage v-if="step===3"></transferPage>
  <transferConfirm v-if="step===4"></transferConfirm>



  <br>
  <div align=center>

        <div v-if="!$store.getters.assignee == ''">
            <button @click.prevent="next" class="btn btn-outline-success mb-3 btn_bg_white" style="width:13.5rem;" v-if="step === 1">ดำเนินการต่อ</button>
        </div>
        <div v-if="!$store.getters.recipient == ''">
            <button @click.prevent="next" class="btn btn-outline-success mb-3 btn_bg_white" style="width:13.5rem;" v-if="step === 2">ดำเนินการต่อ</button>
        </div>
        <div v-if="!$store.getters.page == ''">
            <button @click.prevent="next" class="btn btn-outline-success mb-3 btn_bg_white" style="width:13.5rem;" v-if="step === 3">ดำเนินการต่อ</button>
        </div>



    <!-- <button @click.prevent="black" class="btn btn-outline-danger mb-3 btn_bg_white" style="width:13.5rem;" v-if="step>1">กลับ</button> -->

    <button @click.prevent="black" class="btn btn-outline-danger mb-3 btn_bg_white" style="width:13.5rem;" v-if="step>1">กลับ</button>


  </div>
</div>
</template>

<script>
    import transferAssignee from './Transfer/transfer_assignee'
    import transferConfirm from './Transfer/transfer_confirm'
    import transferPage from './Transfer/transfer_page'
    import transferRecipient from './Transfer/transfer_recipient'
    import {store} from '../../store/transfer'
export default {
    name: 'Transfer',
    store,
    mounted: function() {
      if(this.$cookie.get('status_user') == 1){
          this.$router.push("/");
      }
    },
    components:{
        transferAssignee,
        transferConfirm,
        transferPage,
        transferRecipient
    },
    data() {
     return {
       step: 1,
       myInput:true
     }
   },
    methods: {
        next(){
          this.step = this.step === 4 ? 1 :this.step + 1;
        },
        black(){
          this.step = this.step !== 4 ? 1 :this.step - 1;

          console.log(this.step);
        }
    }


}
</script>
