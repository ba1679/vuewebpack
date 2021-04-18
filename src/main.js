// 此檔為webpack的進入點
import Vue from "vue";
// vue-axios 套件
import axios from "axios";
import VueAxios from "vue-axios";
// loading套件
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
// bootstrap 的js
import "bootstrap"; //官方文件說明寫這樣就可載入,https://getbootstrap.com/docs/4.5/getting-started/webpack/

// 自行撰寫的程式
import App from "./App";
import router from "./router";
import "./bus";
import currencyFilter from "./filters/currency";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios); //套件使用use
Vue.component("Loading", Loading); //將此套件作為元件使用
Vue.filter("currency", currencyFilter);

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  router
});

// 切換頁面時做驗證，避免用戶透過網址切換畫面
router.beforeEach((to, from, next) => {
  // console.log("to", to, "from", from, "next", next);
  // 若要到達的頁面有meta.requiresAuth為true的話，進行驗證，沒有的話就直接放行
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`; //檢查用戶使否持續登入的api
    //在router函式內無法直接使用this.$http，要用axios取代
    axios.post(api).then(response => {
      // 若登入成功就到達下個頁面，失敗則回到login頁面
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    });
  } else {
    next();
  }
});
