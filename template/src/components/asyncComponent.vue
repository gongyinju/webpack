<template>
  <v-layout align-center justify-center>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>用户信息(全局状态，可以在远程组件中修改)</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field  v-model="user.userName" label="UserName" type="text"></v-text-field>
          <v-text-field label="CustomerId" v-model="user.customerId"></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>组件内部状态</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        {{haha}}<v-btn color="primary" v-on:click="increment()">组件内部状态改变</v-btn>
      </v-card-text>
    </v-card>
     <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>模块内部公共状态</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        {{statusTTT}}<v-btn color="primary" @click="changeStatus()">模块公共状态改变</v-btn>
      </v-card-text>
    </v-card>
    
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>异步获取产品</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
          <v-list two-line>
          <template v-for="(item, index) in products">
          <v-list-tile avatar ripple :key="item.productId">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.productId }}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{ item.productName }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ item.productColor }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index + 1 < products.length" :key="index"></v-divider>
        </template>
        </v-list>
   </v-card-text>
    </v-card>
      <router-link to="/async/list"><v-btn class="primary">到外部组件</v-btn></router-link>
      <router-link to="/"><v-btn class="success">返回</v-btn></router-link>
  </div>
  </v-flex>
</v-layout>
</template>

<script>
  export default {
    data: function(){
      return {
        haha: 1,
        products: []
      }
    },
    methods: {
      increment: function(){
        this.haha++;
      },
      changeStatus: function(){
        this.$store.commit('changeStatus')
      },
      loadData: function(){
        let self = this;
        this.$http('http://localhost:8080/mocks/product/list').then(function(res){
          self.products = res.data;
        })
      }
    },
    computed: {
      statusTTT () {
        return this.$store.state.async.status;
      },
      user () {
        return this.$store.state.user;
      }
    },
    watch: {

    },
    created: function(){
         let self = this;
        if(!self.$store.state.async){
        self.$store.registerModule('async',{
            state:{
              status: 1
            },
            getters: {

            },
            mutations: {
              changeStatus (state) {
                state.status += 2;
              }
            }
        });
      }
      this.loadData();
    }
  }
</script>