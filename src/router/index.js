// 官方文件
import Vue from "vue";
import VueRouter from "vue-router";
// 自訂元件
// import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/pages/Login";
import Dashboard from "@/components/Dashboard";
import Products from "@/components/pages/Products";
Vue.use(VueRouter);

// 輸出到main.js
export default new VueRouter({
  routes: [
    {
      // 避免用戶在網址換輸入，若用戶不是輸入我們定義的path則導向login頁面
      path: "*",
      redirect: "/login"
    },
    // {
    //   name: "HelloWorld",
    //   path: "/",
    //   component: HelloWorld
    // },
    {
      name: "Login",
      path: "/login", //路徑使用小寫
      component: Login
    },
    {
      name: "Dashboard",
      path: "/admin",
      component: Dashboard,
      // 巢狀router
      children: [
        {
          name: "Products",
          path: "products", //路徑使用小寫
          component: Products,
          //路由訊息，代表需驗證
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});
