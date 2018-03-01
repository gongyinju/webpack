<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="pink" dark>
          <v-toolbar-title>Product list</v-toolbar-title>
          <v-spacer></v-spacer>
          <router-link to="/">
            <v-btn>返回</v-btn>
          </router-link>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(item, index) in products">
            <v-list-tile
              avatar
              ripple
              :key="item.productId"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.productId }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.productName }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.productColor }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn @click="addProductToCart(item)">购买</v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < products.length" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
     <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">提示</v-card-title>
        <v-card-text>你点击了产品{{selected.productId}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      selected: {},
      products: [
        {
          productId: '11111111',
          productName: '一个假的产品名称',
          productColor: 'red'
        },
        {
          productId: '222222222',
          productName: 'sdafasfcsafdfasdfas',
          productColor: 'red'
        },
        {
          productId: '3333333333',
          productName: 'sadfasfdascccc',
          productColor: 'red'
        }
      ]
    }
  },
  methods: {
    addProductToCart (product) {
      this.selected = product
      this.dialog = true
    }
  }
}
</script>
