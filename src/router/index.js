import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("../views/login/Login.vue")
  },
  {
    path: "/faq",
    name: "Faq",
    component: () => import("../views/Faq.vue")
  },
  {
    path: "/faq/create",
    name: "FaqCreate",
    component: () => import("../views/faq/Create.vue")
  },
  {
    path: "/customer",
    name: "Customer",
    component: () => import("../views/Customer.vue")
  },
  {
    path: "/client",
    name: "Client",
    component: () => import("../views/customer/Client.vue")
  },
  {
    path: "/customer/:id",
    name: "CustomerShow",
    component: () => import("../views/customer/Show.vue")
  },
  {
    path: "/customer/create",
    name: "CustomerCreate",
    component: () => import("../views/customer/Create.vue")
  },
  {
    path: "/customer/:id/edit",
    name: "CustomerEdit",
    component: () => import("../views/customer/Edit.vue")
  },
  {
    path: "/invoice",
    name: "Invoice",
    component: () => import("../views/Invoice.vue")
  },
  {
    path: "/invoice/create",
    name: "InvoiceCreate",
    component: () => import("../views/invoice/Create.vue")
  },
  {
    path: "/invoice/:id",
    name: "InvoiceShow",
    component: () => import("../views/invoice/Show.vue")
  },
  {
    path: "/invoice/:id/edit",
    name: "InvoiceEdit",
    component: () => import("../views/invoice/Edit.vue")
  },
  // 在 invoice 模型中添加 type 字段, 区分 invoice 和 quotation
  {
    path: "/quotation/:id",
    name: "QuotationShow",
    component: () => import("../views/quotation/Show.vue")
  },
  {
    path: "/quotationpacking/:id",
    name: "QuotationPackingShow",
    component: () => import("../views/quotation/PackingShow.vue")
  },
  {
    path: "/sampleinvoice/:id",
    name: "SampleInvoiceShow",
    component: () => import("../views/invoice/sample/Show.vue")
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: () => import("../views/transaction/Transaction.vue")
  },
  {
    path: "/transaction/create",
    name: "TransactionCreate",
    component: () => import("../views/transaction/Create.vue")
  },
  {
    path: "/transaction/:id/edit",
    name: "TransactionEdit",
    component: () => import("../views/transaction/Edit.vue")
  },
  {
    path: "/commercialinvoice/:id",
    name: "CommercialInvoice",
    component: () => import("../views/invoice/documents/CI.vue")
  },
  {
    path: "/packinglist/:id",
    name: "PackingList",
    component: () => import("../views/invoice/documents/PL.vue")
  },
  {
    path: "/invoice/:id/purchase/create",
    name: "PurchaseCreate",
    component: () => import("../views/invoice/purchase/Create.vue")
  },
  {
    path: "/invoice/:id/purchase/update",
    name: "PurchaseUpdate",
    component: () => import("../views/invoice/purchase/Update.vue")
  },
  {
    path: "/invoice/:id/purchase/show",
    name: "PurchaseShow",
    component: () => import("../views/invoice/purchase/Show.vue")
  },
  {
    path: "/shipment",
    name: "Shipment",
    component: () => import("../views/shipment/Shipment.vue")
  },
  {
    path: "/price",
    name: "Price",
    component: () => import("../views/price/Price.vue")
  },
  {
    path: "/stock",
    name: "StockIndex",
    component: () => import("../views/stock/Index.vue")
  },
  {
    path: "/stock/create",
    name: "StockCreate",
    component: () => import("../views/stock/Create.vue")
  },
  {
    path: "/stock/:id",
    name: "StockShow",
    component: () => import('../views/stock/Show.vue')
  },
  {
    path: "/stock/:id/edit",
    name: "StockEdit",
    component: () => import("../views/stock/Edit.vue")
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/Test.vue"),
    children: [
      {
        path: "sidebar",
        name: "Sidebar",
        component: () => import("../views/test/Sidebar.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  // 如果是登录 login, 直接放行
  if (to.path === "/login") return next();
  // 如果不是登录, 从 sessionStorage 获取 token,
  let token = window.sessionStorage.getItem('cle_api_token'); 
  // 拿不到 token, 返回登录
  if (!token) return next("/login");
  // 拿到 token, 直接放行
  next();
})

export default router;
