<template>
<div class="container">
  <h1 class="text-center mb-3">โอนกรรมสิทธิ์ค่าขยะ</h1>
    <h3 class="text-center mb-3">ผู้รับกรรมสิทธิ์</h3>

      <div align=center class="transfer_show_user mb-3" id="divShow">{{$store.getters.recipient}}</div>
      <div class="input-group mb-3">

      <input type="text"  id="search" v-model="filter" class="form-control" placeholder="ค้นหา..." aria-label="Recipient's username" aria-describedby="button-addon2">
  </div>

  <div class="background-white">
    <b-table
    ref="selectableTable"
    selectable
    single
    :filter="filter"
     :hover="hover"
     :select-mode="selectMode"
     :fixed="fixed"
     :no-border-collapse="noCollapse"
     :items="items"
     :fields="fields"
     :head-variant="headVariant"
     :table-variant="tableVariant"
       @row-selected="onRowSelected"
   >
   <template v-slot:cell(index)="data">
     {{data.index}}
   </template>
 </b-table>
  </div>



<!-- {{$store.getters.index}} -->

</div>
</template>

<script>
export default {
    name: 'transfer_recipient',
    mounted: function() {
      this.data_member()
      this.deletememberlist()
      // console.log(this.items);
    },
    data() {
     return {
       fields: ['name', 'tel'],
       items: [],
         hover: true,
          filter: null,
         fixed: false,
         headVariant: 'dark',
         tableVariant: '',
         selectMode: 'single',
         noCollapse: false,
         recipient:null
     }
   },
    methods: {
      onRowSelected(items){
        this.selected = items
        console.log(this.selected);

          if (this.selected.length == 1) {
              this.recipient = this.selected[0].name
              this.$store.commit('setRecipient',this.recipient)
              this.$store.commit('setRecipientID',this.selected[0].id)
          }else {
              this.recipient = null
          }



      },
      data_member(){
        let headers = {
          headers: {
              "Content-Type":"application/json",
              Accept: "application/json",
              "X-Requested-With":"XMLHttpRequest",
              Authorization: "Bearer " + this.$cookie.get("token")
          }
        };
        axios.post(this.$store.getters.url+"api/member","",headers).then(response => {
              this.items = response.data.success;
              this.items.splice(this.$store.getters.index, 1)
              console.log(response.data.success);
              // console.log(this.items.splice(name, 1));
              // console.log(data.items);
        });
      },
      deletememberlist(){
        // this.items.splice(id, $store.getters.id_assignee);

      },
      computed: {
          sortOptions() {
            // Create an options list from our fields
            return this.fields
              .filter(f => f.sortable)
              .map(f => {
                return { text: f.label, value: f.key }
              })
          }
        },
    }


}
</script>
