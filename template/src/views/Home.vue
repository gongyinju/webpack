<template>
  <div>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">customerId: {{user.customerId}}</div>
            </v-card-title>
            <v-card-text>
              <div>userName: {{user.userName}}</div>
            </v-card-text>
            <v-card-actions>
              <router-link to="/products"><v-btn flat dark>本地组件</v-btn></router-link>
              <router-link to="/async"><v-btn flat dark>项目外组件</v-btn></router-link>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    changeUser () {
      this.$store.commit('increment', {
        user: {
          userName: 'asdfasdf',
          customerId: '342134'
        }
      })
    },
    hehe () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
