// *todo 訂單內容Modal
<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 渲染訂單列表 -->
    <h2 class="text-center mt-3">訂單列表</h2>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="80">姓名</th>
          <th width="80">Email</th>
          <th width="80">電話</th>
          <th>寄送地址</th>
          <th width="130">訂單資料</th>
          <th width="115">付款方式</th>
          <th width="100">是否付款</th>
          <th width="100">修改資料</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orderList" :key="item.id">
          <td>{{ item.user.name }}</td>
          <td>{{ item.user.email }}</td>
          <td>{{ item.user.tel }}</td>
          <td>{{ item.user.address }}</td>
          <td class="d-flex">
            <button
              class="btn btn-outline-primary btn-sm mr-1"
              @click="openProductModal(item)"
            >
              訂單內容
            </button>
          </td>

          <td>{{ item.payment_method }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else>未付款</span>
          </td>
          <td class="d-flex">
            <button
              class="btn btn-outline-primary btn-sm mr-1"
              @click="openModal(item)"
            >
              編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pages="pagination"
      @emitProductPage="getOrderList"
    ></Pagination>
    <!-- Modal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="name">訂購姓名</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="cacheOrder.user.name"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="address">寄送地址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      v-model="cacheOrder.user.address"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="tel">電話</label>
                    <input
                      type="tel"
                      class="form-control"
                      id="tel"
                      v-model="cacheOrder.user.tel"
                    />
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateOrder(cacheOrder.id)"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="orderProductsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>訂單內容</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- 使用table製作 待處理 -->
            <h5>訂單編號: {{ cacheOrder.id }}</h5>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">品名</th>
                  <th scope="col">數量</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">優惠碼</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cacheOrder.products" :key="item.id">
                  <th scope="row">{{ index }}</th>
                  <td>{{ item.product.title }}</td>
                  <td>{{ item.qty }} / {{ item.product.unit }}</td>
                  <td>{{ item.product.price | currency }}</td>
                  <td v-if="item.final_total">
                    {{ parseInt(item.final_total) | currency }}
                  </td>
                  <!-- <td v-if="item.coupon.code">{{ item.coupon.code }}</td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateOrder(cacheOrder.id)"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Pagination from "./Pagination";

export default {
  name: "OrderList",
  data() {
    return {
      orderList: [
        {
          create_at: "",
          id: "",
          is_paid: false,
          num: 1,
          products: {
            product: []
          },
          total: 0,
          user: {}
        }
      ],
      cacheOrder: {
        final_total: "",
        coupon: {
          code: ""
        },
        products: [],
        user: {}
      },
      products: [],
      pagination: {},
      isLoading: false
    };
  },
  components: {
    Pagination
  },
  methods: {
    getOrderList(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      let vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response);
        vm.orderList = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    openModal(item) {
      this.cacheOrder = Object.assign({}, item); //使用此方法避開物件傳參考
      // 透過click觸發modal開啟
      console.log(this.cacheOrder);
      $("#orderModal").modal("show");
    },
    openProductModal(item) {
      this.cacheOrder = { ...item };
      console.log(this.cacheOrder.coupon);
      $("#orderProductsModal").modal("show");
    },
    // 新增&編輯優惠券
    updateOrder(id) {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${id}`;
      let vm = this;
      this.$http
        .put(api, { data: vm.cacheOrder })
        .then(response => {
          if (response.data.success) {
            $("#orderModal").modal("hide");
            alert("成功修改");
            vm.getOrderList();
          }
        })
        .catch(err => {
          alert("修改失敗");
          console.log(err);
        });
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>
