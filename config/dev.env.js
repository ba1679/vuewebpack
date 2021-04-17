"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

// 在此宣告的環境變數，單引號裡面必須再包雙引號，變數名稱習慣使用大寫
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH: '"https://vue-course-api.hexschool.io"', //API伺服器路徑
  CUSTOMPATH: '"hsinhui"' //所申請的api path
});
