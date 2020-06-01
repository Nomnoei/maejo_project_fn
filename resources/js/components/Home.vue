<template>

    <div class="container" >

      

      <member v-if="this.$cookie.get('status_user') == 1"></member>
      <officer v-if="this.$cookie.get('status_user') == 2"></officer>
      <admin v-if="this.$cookie.get('status_user') == 3"></admin>


        <!-- <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        I'm an example component...
                        <h2>{{this.$cookie.get('test')}}</h2>
                        <h2>{{this.$cookie.get('user_id')}}</h2>
                        <h2>{{this.$cookie.get('name')}}</h2>
                        <h2>{{this.$cookie.get('tel')}}</h2>
                        <h2>{{this.$cookie.get('status_user')}}</h2>
                        <a href="#" @click.prevent="logout"> Go to Logout</a>
                    </div>
                </div>
            </div>
        </div> -->

    </div>


</template>

<script>
import member from './member/index'
import admin from './admin/index'
import officer from './officer/index'
import {store} from '../store/index'

    export default {
      name: 'home',
      store,
      components:{
          officer,
          member,
          admin
      },
      mounted:function(){

      },
      methods:{

      }


    }
</script>
  <style>
      body{
        background:#EFEFEF;
      }
  </style>
