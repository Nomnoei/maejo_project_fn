<template>

  <div id="main">
    <!-- {{this.$cookie.get('user_id')}} -->
    <Header v-if="this.$cookie.get('user_id')"></Header>
    <main class="py-4" v-if="this.$cookie.get('user_id')">
      <router-view></router-view>
    </main>

    <!-- <div v-if="!this.$cookie.get('user_id')">
      <router-view></router-view>
    </div> -->

    <login v-if="!this.$cookie.get('user_id')"></login>
    <!-- {{this.$store.getters.url}} -->

  </div>
</template>

<script>
  import login from './auth/login'
  import Header from './Header.vue'
  import {store} from '../store/index'

    export default {
      name: 'main-app',
      store,
      components: {Header,login},
      props: ['csrf'],
      mounted:function(){
        // if (!this.$cookie.get('user_id')) {
        //     this.$router.push("/login");
        // }
    }
  }
</script>
