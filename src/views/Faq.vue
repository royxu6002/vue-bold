<template>
  <div class="faq container">
    <div class="form-group mt-3">
      <label for=""
        >I have questions and need to enquiry and please send email directly to
        info@comlibra.com</label
      >
      <input
        type="text"
        class="form-control"
        placeholder="please type questions inside of the input area"
        required
        @blur="filteredBy(question)"
        v-model="question"
      />
    </div>
    <br />
    <div v-for="(faq, index) in filteredFaqs" :key="index">
      <h6>Q: {{ faq.ask }}</h6>
      <p>A: {{ faq.answer }}</p>
      <hr />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Faq",
  data() {
    return {
      question: "",
      filteredFaqs: "",
      faqs: ""
    };
  },
  methods: {
    filteredBy(q) {
      let search = q.trim().toLowerCase();
      if (!search)
        return alert("please enter question you want to ask to get an answer");
      const answers = this.faqs.filter(faq => faq.ask.includes(search));
      if (answers.length == 0)
        return alert("sorry, we dont know what your are looking for");
      return (this.filteredFaqs = answers);
    }
  },
  created() {
    const baseUrl = "http://iot.test/api/v1/";
    axios
      .get(baseUrl + "faq")
      .then(res => {
        this.faqs = res.data;
      })
      .catch(err => {
        alert(err);
      });
  }
};
</script>
<style></style>
