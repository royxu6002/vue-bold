<template>
  <div class="container mt-3 shipment-mixed">
    <!-- form 最好是用边栏弹出方式来实现-->
    <div class="active shipment-create col-3">
      <form @submit.prevent="createShipment">
        <div class="col-12">
          <small>Invoice ID</small>
          <select
            required="required"
            class="form-control"
            v-model="shipmentData.invoice_id"
          >
            <option value="">
              Select ID
            </option>
            <option
              v-for="(invoice, index) in invoicesData"
              :key="index"
              :value="invoice.id"
              >{{ invoice.id }} - {{ invoice.client.company }} -
              {{ invoice.to }}
            </option>
          </select>
        </div>
        <div class="col-12 form-group">
          <small>Delivery term</small>
          <input
            type="text"
            v-model="shipmentData.delivery_term"
            class="form-control"
          />
        </div>
        <div class="col-12 form-group">
          <small>Tracking no. </small>
          <input
            type="text"
            class="form-control"
            v-model="shipmentData.tracking_no"
          />
        </div>
        <div class="col-12 form-group">
          <small>Vessel</small
          ><input
            type="text"
            class="form-control"
            v-model="shipmentData.vessel"
          />
        </div>
        <div class="col-12 form-group">
          <small>Container_no</small
          ><input
            type="text"
            class="form-control"
            v-model="shipmentData.container_no"
          />
        </div>
        <div class="col-12 form-group">
          <small>Seal_no</small
          ><input
            type="text"
            class="form-control"
            v-model="shipmentData.seal_no"
          />
        </div>
        <div class="form-group col-12">
          <small>ETD</small
          ><input type="date" class="form-control" v-model="shipmentData.etd" />
        </div>
        <div class="form-group col-12">
          <small>ETA</small
          ><input type="date" class="form-control" v-model="shipmentData.eta" />
        </div>
        <button type="submit" class="btn btn-primary">Create</button>
      </form>
    </div>

    <div class="shipment-index col-9">
      <Nav />
      <div align="center"><small>每个快递号/海运运输, 在给客户之前需要先自己查询一遍</small></div>
      <table
        valign="top"
        cellspacing="10px 0"
        cellpadding="10px 0"
        width="100%"
        style="border-collapse:collapse"
      >
        <tr style="border-bottom: 1px solid #171218">
          <th>
            Id
          </th>
          <th>Invoice #</th>
          <th>Delivery Term</th>
          <th>Tracking No</th>
          <th>Vessel</th>
          <th>Container No.</th>
          <th>Seal No.</th>
          <th>ETD</th>
          <th>ETA</th>
          <th>OP.</th>
        </tr>
        <tr v-for="(shipData, index) in shipmentsData" :key="index">
          <td>{{ shipData.id }}</td>
          <td>
            <router-link
              :to="{ name: 'InvoiceShow', params: { id: shipData.invoice_id } }"
              >{{ shipData.invoice_id }}</router-link
            >
          </td>
          <td>{{ shipData.delivery_term }}</td>
          <td>{{ shipData.tracking_no }}</td>
          <td>{{ shipData.vessel }}</td>
          <td>{{ shipData.container_no }}</td>
          <td>{{ shipData.seal_no }}</td>
          <td>{{ shipData.etd }}</td>
          <td>{{ shipData.eta }}</td>
          <td>
            <span @click="deleteShipment(shipData.id)">
              <i class="iconfont icon-delete"></i
            ></span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      invoicesData: [],
      shipmentData: {},
      shipmentsData: []
    };
  },
  methods: {
    getInvoicesData() {
      axios
        .get(this.GLOBAL.baseUrl + "/invoice")
        .then(res => (this.invoicesData = res.data))
        .catch(err => alert(err));
    },
    getShipmentsData() {
      axios
        .get(this.GLOBAL.baseUrl + "/shipment")
        .then(res => (this.shipmentsData = res.data))
        .catch(err => alert(err));
    },
    createShipment() {
      axios
        .post(
          this.GLOBAL.baseUrl + "/shipment",
          qs.stringify(this.shipmentData)
        )
        .then(res => {
          alert(res.data.msg);
          this.$router.go(0);
        })
        .catch(err => alert(err));
    },
    deleteShipment(id) {
      if (window.confirm(`Are you sure to delete id=${id} shipment info?`)) {
        axios
          .delete(this.GLOBAL.baseUrl + "/shipment/" + id)
          .then(res => {
            alert(res.data.msg);
            this.$router.go(0);
          })
          .catch(err => alert(err));
      }
    }
  },
  created() {
    this.getInvoicesData();
    this.getShipmentsData();
  }
};
</script>
<style>
.shipment-mixed {
  display: flex;
}
</style>
