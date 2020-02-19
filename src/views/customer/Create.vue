<template>
  <div class="container customer_create mt-3">
    <form @submit.prevent="sendCustomerData">
      <!-- <input type="hidden" name="_token"> -->
      <div class="form-group row">
        <div class="col-md-3">
          <label for="id">Id</label>
          <input type="text" readonly name="id" class="form-control" />
        </div>
        <div class="col-md-3">
          <label for="date">Is client</label>
          <div>
            <input name="is_client" type="checkbox" v-model="customer.is_client">
          </div>
        </div>
        <div class="col-md-3">
          <label for="sale">Sale</label>
          <input name="sale" class="form-control" v-model="customer.sale" />
        </div>

        <div class="col-md-3">
          <label for="rank">Rank</label>
          <input name="rank" class="form-control" v-model="customer.rank" />
        </div>
      </div>

      <div class="form-group">
        <label for="lead">Lead</label>
        <textarea
          class="form-control"
          name="lead"
          rows="3"
          v-model="customer.lead"
        ></textarea>
      </div>

      <div class="form-group row">
        <div class="col-md-6">
          <label for="company">Company</label>
          <input
            value=""
            name="company"
            class="form-control"
            v-model="customer.company"
          />
        </div>
        <div class="col-md-3">
          <label for="tel">Tel</label>
          <input name="tel" class="form-control" v-model="customer.tel" />
        </div>
        <div class="col-md-3">
          <label for="fax">Fax</label>
          <input
            value=""
            name="fax"
            class="form-control"
            v-model="customer.fax"
          />
        </div>
      </div>

      <div class="form-group row">
        <div class="col-md-6">
          <label for="address">Address</label>
          <input
            name="address"
            class="form-control"
            v-model="customer.address"
          />
        </div>
        <div class="col-md-6">
          <label for="website">Website</label>
          <input
            name="website"
            class="form-control"
            v-model="customer.website"
          />
        </div>
      </div>

      <div class="form-group row">
        <div class="col-md-4">
          <label for="person">Person</label>
          <input name="person" class="form-control" v-model="customer.person" />
        </div>
        <div class="col-md-4">
          <label for="position">Position</label>
          <input
            name="position"
            class="form-control"
            v-model="customer.position"
          />
        </div>
        <div class="col-md-4">
          <label for="country">Country</label>
          <input
            name="country"
            class="form-control"
            v-model="customer.country"
          />
        </div>
      </div>

      <div class="form-group row">
        <div class="col-md-4">
          <label for="email">Email</label>
          <input name="email" class="form-control" v-model="customer.email" />
        </div>
        <div class="col-md-4">
          <label for="mobile">Mobile</label>
          <input name="mobile" class="form-control" v-model="customer.mobile" />
        </div>
        <div class="col-md-4">
          <label for="whatsapp">Whatsapp</label>
          <input
            name="whatsapp"
            class="form-control"
            v-model="customer.whatsapp"
          />
        </div>
      </div>

      <div class="form-group row">
        <div class="col-md-4">
          <label for="qq">QQ</label>
          <input name="qq" class="form-control" v-model="customer.qq" />
        </div>
        <div class="col-md-4">
          <label for="wechat">Wechat</label>
          <input name="wechat" class="form-control" v-model="customer.wechat" />
        </div>
        <div class="col-md-4">
          <label for="skype">Skype</label>
          <input name="skype" class="form-control" v-model="customer.skype" />
        </div>
      </div>
      <div class="form-group">
        <label for="memo">Memo</label>
        <textarea
          class="form-control"
          name="memo"
          rows="4"
          v-model="customer.memo"
        ></textarea>
      </div>
      <button class="btn btn-success" type="submit">Create</button>
    </form>

  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "CustomerCreate",
  data() {
    return {
      customer: {
        id: '',
        sale: '',
        rank: '',
        is_client: '',
        lead: '',
        company: '',
        address: '',
        tel: '',
        fax: '',
        website: '',
        person: '',
        position: '',
        email: '',
        mobile: '',
        whatsapp: '',
        country: '',
        memo: '',
        qq: '',
        wechat: '',
        skype: ''
      }
    };
  },
  methods: {
    sendCustomerData() {
      if (!this.customer.email) return alert("please fill in customer profile");
      axios
        .post(this.GLOBAL.baseUrl + "/customer", qs.stringify(this.customer))
        .then(res => {
          if(res.status == 200) {
            alert(res.data.msg);
            this.$router.push({ name: "Customer" });
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>
<style>
.customer_create {
  background-color: azure;
}
</style>
