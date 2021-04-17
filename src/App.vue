<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
  // created() {
  //   // api及api_path最好宣告在環境變數內(config/dev.env.js)
  //   //https://www.npmjs.com/package/vue-axios vue-axios語法
  //   // 環境變數的使用語法: process.env.變數名稱
  //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
  //   this.$http.get(api).then(response => {
  //     console.log(response.data);
  //   });
  // }
};
</script>

<style lang="scss">
// '~'代表node_modules路徑 最後的bootstrap.scss 附檔名可省略
// @import "~bootstrap/scss/bootstrap"; 也可另外獨立出來寫在assets/all.scss裡面
//這邊import的是bootstrap的樣式部分
@import "./assets/all";
</style>
