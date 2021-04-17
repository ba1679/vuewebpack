<template>
  <div>
    <!-- 固定顯示的部分使用元件&標籤載入 -->
    <Navbar></Navbar>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <!-- <Sidebar/> 也可以 -->
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <!-- 會隨著用戶點擊而顯示不同頁面，則用router-view呈現 -->
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Alert from "./AlertMessage";

export default {
  components: {
    Sidebar,
    Navbar,
    Alert
  },
  created() {
    // 讀取cookie語法
    const tokenCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hsinToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //axios語法，將cookie往後端發送
    this.$http.defaults.headers.common.Authorization = tokenCookie;
  }
};
</script>
