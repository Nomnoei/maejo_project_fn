<template>
<div class="container">
    <h1 class="text-center mb-3">ข้อมูลสมาชิก</h1>
    <div class="mb-2" align=center>
        <a href="/Transfer"><button type="button" class="btn btn_bg_green_1">โอนกรรมสิทธิ์</button></a>
        <a href="/TransferHistory"><button type="button" class="btn btn_bg_green_1">ประวัติการโอน</button></a>
    </div>
    <div align=center><a href="/CreateMember"><button type="button" class="btn btn-success mb-3" style="width:13.5rem;">+ เพิ่มลูกบ้าน</button></a></div>
    <input type="text" id="search" v-model="filter"  name="search" class="form-control mb-3" placeholder="ค้นหา...">

<div class="background-white">
    <b-table
    ref="selectableTable"
    selectable
    single
    :hover="hover"
    :select-mode="selectMode"
    :fixed="fixed"
    :no-border-collapse="noCollapse"
    :items="items"
    :fields="fields"
    :filter="filter"
    :head-variant="headVariant"
    :table-variant="tableVariant"
      @row-selected="onRowSelected"
      :keyword="keyword"
       :busy="isBusy"
   >

<template v-slot:table-busy>
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </template>
 </b-table>
</div>
  <!-- {{$store.getters.url}} -->

  <b-col sm="7" md="6" class="my-1" v-if="show">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
</div>
</template>

<script>
import {store} from '../../store/index'

export default {
    name: 'addMember',
    store,
    mounted: function() {
      // console.log($store.getters.url);
      if(this.$cookie.get('status_user') == 1){
          this.$router.push("/");
      }
      this.totalRows = this.items.length
      this.data_member()
    },
    data() {
     return {
       fields: ['name', 'tel'],
       items: [],
       keyword: '',
       isBusy: true,
        filter: null,
        perPage: 5,
        currentPage: 1,
        totalRows: 1,
         hover: true,
         fixed: false,
         headVariant: 'dark',
         tableVariant: '',
         noCollapse: false,
         selectMode: 'single',
        selected: [],
        show:false
     }
   },
    methods: {
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
            this.isBusy = false
                this.items = response.data.success;
                // console.log(response.data.success.length);
                if (response.data.success.length > this.perPage) {
                    this.show = true
                }
          });
        },
        onRowSelected(items){
            this.selected = items
            this.$cookie.set('user_id_edit', this.selected[0].id, "30MIN");
            this.$router.push('/EditMember')
            // console.log(this.selected[0].id);
            // this.$store.commit('setAssignee',this.assignee)
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
      // onFiltered(filteredItems) {
      //   // Trigger pagination to update the number of buttons/pages due to filtering
      //   this.totalRows = filteredItems.length
      //   this.currentPage = 1
      // }


}
</script>
<style>
    body{
      background:#EFEFEF;
    }
</style>
