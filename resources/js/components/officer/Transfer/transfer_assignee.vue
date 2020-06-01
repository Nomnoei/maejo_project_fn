<template>
<div class="container">
  <h1 class="text-center mb-3">โอนกรรมสิทธิ์ค่าขยะ</h1>
    <h3 class="text-center mb-3">ผู้โอนกรรมสิทธิ์</h3>

      <div align=center class="transfer_show_user mb-3" id="divShow">{{$store.getters.assignee}}</div>
      <div class="input-group mb-3">

      <input type="text" id="search" v-model="filter" class="form-control" placeholder="ค้นหา..." aria-label="Recipient's username" aria-describedby="button-addon2">
  </div>

  <div class="background-white">
      <b-table
      ref="selectableTable"
      :filter="filter"
      selectable
      single
       :hover="hover"
       :select-mode="selectMode"
       :fixed="fixed"
       :no-border-collapse="noCollapse"
       :items="items"
       :fields="fields"
       :head-variant="headVariant"
       :table-variant="tableVariant"
         @row-selected="onRowSelected"

     ></b-table>
  </div>







</div>
</template>

<script>
export default {
    name: 'transfer_assignee',
    mounted: function() {
      this.data_member();
    },
    data() {
     return {
       fields: ['name', 'tel'],
       items: [],
       filter: null,
         hover: true,
         fixed: false,
         headVariant: 'dark',
         tableVariant: '',
         selectMode: 'single',
         noCollapse: false,
         selected: [],
         assignee:null,
         id_assignee:null
     }
   },
    methods: {
      onRowSelected(items){
        this.selected = items
          if (this.selected.length == 1) {
              this.assignee = this.selected[0].name
              this.id_assignee = this.selected[0].id
              this.$cookie.set('assigneeID', this.id_assignee, "10MIN");
              this.$store.commit('setAssignee',this.assignee)
              this.$store.commit('setAssigneeID',this.id_assignee)
              this.$store.commit('setIndex',this.selected[0].index)
          }else {
              this.assignee = null
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
              // this.items = response.data.success;
              console.log(response.data.success);

              let list=[];
              $.each(response.data.success, function(key, value) {
                   list.push({id:value.id,name:value.name,tel:value.tel,index:key});
                 });
                 this.items = list;
                 console.log(list);
        });
      }
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
</script>
