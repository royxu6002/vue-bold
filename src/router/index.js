import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
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
    path: "/quotation",
    name: "Quotation",
    component: () => import("../views/quotation/Quotation.vue")
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

export default router;
