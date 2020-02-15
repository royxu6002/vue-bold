<template>
  <div class="faq_create container mt-3">
    <form @submit.prevent="sendFaqData">
      <div class="form-group">
        <label for="">Questions</label>
        <input
          type="text"
          name="ask"
          placeholder="Favorite asked question"
          class="form-control"
          v-model="faq.ask"
          required
        />
      </div>
      <div class="form-group">
        <label for="">Answer</label>
        <textarea
          rows="4"
          name="answer"
          class="form-control"
          v-model="faq.answer"
          placeholder="Please type into answer for the faq"
          required
        ></textarea>
      </div>
      <button class="btn btn-primary" type="submit">Create FAQ</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "FaqCreate",
  data() {
    return {
      faq: {}
    };
  },
  methods: {
    sendFaqData() {
      if(!this.faq.ask || !this.faq.answer) alert("pleast fill ask and answer area");
      axios
        .post(this.GLOBAL.baseUrl + "/faq", qs.stringify(this.faq))
        .then(res => {
          if(res.status == 200) {
            this.$router.push({name: "Faq"});
          }
        })
        .catch(err => {
          alert(err);
        })
    }
  }
};
</script>
