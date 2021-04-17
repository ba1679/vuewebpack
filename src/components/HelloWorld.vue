<template>
  <div class="hello">
    <a href="#" @click.prevent="signout"> 登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    signout(){
      const vm = this; //post為箭頭函式，因此需先將this存起來
      const api = `${process.env.APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        if(response.data.success){
          // 使用this.$router.push 可切換頁面的path
          vm.$router.push('/login');
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only
scoped代表樣式限制在此元件中 -->
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
