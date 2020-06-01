<template>
<div class="container">
    <h1 class="text-center mb-3">ข้อมูลพนักงาน</h1>
    <div align=center><a href="/CreateOfficer"><button type="button" class="btn btn-success mb-3" style="width:13.5rem;">+ เพิ่มลูกบ้าน</button></a></div>
    <input type="text" id="search" v-model="filter" name="search" class="form-control mb-3" placeholder="ค้นหา...">


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
    :busy="isBusy"
      @row-selected="onRowSelected"

   ><template v-slot:table-busy>
         <div class="text-center text-danger my-2">
           <b-spinner class="align-middle"></b-spinner>
           <strong>Loading...</strong>
         </div>
       </template></b-table>
</div>
  <!-- {{$store.getters.url}} -->

</div>
</template>

<script>
import {store} from '../../store/index'

export default {
    name: 'addMember',
    store,
    mounted: function() {
      if(this.$cookie.get('status_user') == 1 || this.$cookie.get('status_user') == 2){
          this.$router.push("/");
      }
      this.data_officer();
    },
    data() {
     return {
       fields: ['username','name', 'tel'],
       items: [],
         filter: null,
       hover: true,
      fixed: false,
      isBusy: true,
       headVariant: 'dark',
      tableVariant: '',
      noCollapse: false,
      selectMode: 'single',
      selected: [],
     }
   },
    methods: {
        data_officer(){

          let headers = {
            headers: {
                "Content-Type":"application/json",
                Accept: "application/json",
                "X-Requested-With":"XMLHttpRequest",
                Authorization: "Bearer " + this.$cookie.get("token")
            }
          };
          let formData = {
            status : "2"
          };
          axios.post(this.$store.getters.url+"api/officer",formData,headers).then(response => {
                this.items = response.data.user;
                this.isBusy = false
                // console.log(response.data.user);

          });

        },
        onRowSelected(items){
          this.selected = items
          // console.log(this.selected[0].id);
          this.$cookie.set('user_id_edit', this.selected[0].id, "30MIN");
            this.$router.push("/UpdateOfficer");
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
<style>
    body{
      background:#EFEFEF;
    }
</style>
