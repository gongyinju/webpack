<template>
  <div>
  <span>外部组件公共状态：{{statusTTT}}</span>
  <v-btn @click="changeStatus()">更新状态</v-btn>
                  <v-form>
                  <v-text-field  v-model="user.userName" label="UserName" type="text"></v-text-field>
                  <v-text-field label="CustomerId" v-model="user.customerId"></v-text-field>
                </v-form>
  <ul>
  <li v-for="item in products">
    <p>productName: {{item.productName}}</p>
    <p>productId: {{item.productId}}</p>
  </li>
  </ul>
  <router-link to="/async">返回</router-link>
  </div>
</template>

<script>
  export default {
    data: function(){
    return {
      products: []
    }
    },
    methods: {
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