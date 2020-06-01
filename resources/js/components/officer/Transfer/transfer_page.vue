<template>
<div class="container">
  <h1 class="text-center mb-3">โอนกรรมสิทธิ์ค่าขยะ</h1>
  <div class="transfer_show_transferee">
        <div class="transfer_show_assign">
            <p class="text-center" style="color:#000;">
                ผู้โอนกรรมสิทธิ์ <br>
                <font style="color:#fff;">{{$store.getters.assignee}} </font>
            </p>
        </div>
        <div class="transfer_show_recipe">
            <p class="text-center" style="color:#000;">
                ผู้รับกรรมสิทธิ์ <br>
                <font style="color:#fff;">{{$store.getters.recipient}}</font>
            </p>
        </div>
        <div class="transfer_show_arrow">
            <img src="image/right-arrow.png" width="30rem" alt="">
        </div>
    </div>
    <form >
    <div class="background-white">
        <!-- <div class="transfer_bg_hover">

              <label class="btn transfer_btn_nsel_house" > -->
                  <!-- <input type="checkbox" name="house1"  autocomplete="off" > <!--style="opacity:0; position:absolute;"-->
                  <!-- <img src="image/house.png" width="20rem" alt="">
                  <font style="color:#5C5C5C;">555 ซอย 5 หมู่ 1 ตำบล 555</font>
              </label>
            </div>

            <div class="transfer_bg_hover">
              <label class="btn transfer_btn_nsel_house" > -->
                  <!-- <input type="checkbox" name="house2"  autocomplete="off"  style="opacity:0; position:absolute;"> <!--style="opacity:0; position:absolute;"-->
                  <!-- <img src="image/house.png" width="20rem" alt="">
                  <font style="color:#5C5C5C;">555 ซอย 2 หมู่ 5 ตำบล 555</font>
              </label>
              </div> -->

              <b-table
              align=center
              stacked
              :fixed="fixed"
               ref="selectableTable"
               selectable
               :hover="hover"
               :select-mode="selectMode"
               :items="items"
               @row-selected="onRowSelected"
                >

                <template v-slot:cell(add_id)="data">
                 <img src="image/house.png" width="20rem" alt=""><b>{{ data.value.add_id }}</b>
                </template>

          </b-table>

    </div>

        </form>
        <!-- {{$store.getters.id_assignee}} -->

</div>
</template>

<script>
export default {
    name: 'transfer_page',
    mounted: function() {
        this.address_data();
    },
    data() {
     return {
       items: [
         // { add_id:  'Doe' , address: "555 ซอย 2 หมู่ 5 ตำบล 555" },
         //  { add_id:  'Doe' , address: "555 ซอย 2 หมู่ 5 ตำบล 555" },
         //  { add_id:   'Kincade' ,  address: "555 ซอย 2 หมู่ 5 ตำบล 555" },
         //  { add_id: 'Partridge' ,  address: "555 ซอย 2 หมู่ 5 ตำบล 555" }

       ],
         hover: true,
          fixed: true,
         selectMode: 'multi',
         selected1: [],
         selectAll: false,
         page:[]

     }
   },
    methods: {
      onRowSelected(items){
        this.selected = items
        console.log(this.selected);
        // console.log(this.selected.length);
          if (this.selected.length > 0 ) {
              this.page = this.selected
              this.$store.commit('setPage',this.page)
          }else {
              this.page = null
          }



      },
      address_data(){
        let headers = {
          headers: {
              "Content-Type":"application/json",
              Accept: "application/json",
              "X-Requested-With":"XMLHttpRequest",
              Authorization: "Bearer " + this.$cookie.get("token")
          }
        };
        let formData = {
          user_id : this.$cookie.get("assigneeID"),
          status : "1"
        };
        axios.post(this.$store.getters.url+"api/ThisMemberAddress",formData,headers).then(response => {
              // this.items = response.data.success;
              let list=[];
              $.each(response.data.success, function(key, value) {
                   list.push({add_id:value.id,address:value.house_num +"ซอย"+ value.alley+" หมู่บ้าน "+value.moo+" ตำบล "+value.district});
                 });
                 this.items = list;

              // console.log(response.data.success[0].id);
              // console.log(list);

        });
      }


    },



}
</script>
<style>
    .active {
    background-color: #cef230;
    }
</style>
