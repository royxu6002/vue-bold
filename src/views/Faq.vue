<template>
  <div class="faq container pt-3">
    <Nav />
    <div class="form-group mt-3">
      <p> 
        <span>I have questions and need to enquiry and please send email directly to
          info@comlibra.com >></span>
        <router-link to="/faq/create" class="ml-2">Create a Faq list</router-link> 
      </p>
      <label for="">Please type one or two key words to fetch more answers</label>
      
      <input
        type="text"
        class="form-control"
        placeholder="please type questions inside of the input area"
        required
        @blur="filteredBy(question)"
        @focus="clearPreviousInput"
        v-model="question"
      />
    </div>
    <br />
    <div v-for="(faq, index) in filteredFaqs" :key="index">
      <h6>Q: {{ faq.ask }}</h6>
      <p>A: {{ faq.answer }}</p>
      <hr />
      <span v-if="!filteredBy">Sorry that we don't has answer for your question</span>
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
      if (!search) return alert("please enter question you want to ask to get an answer");
      const answers = this.faqs.filter(
        faq =>
          faq.ask.toLowerCase().includes(search) ||
          faq.answer.toLowerCase().includes(search) 
      );
      if (answers.length == 0)
        return alert("sorry, we dont know what your are looking for");
      return (this.filteredFaqs = answers);
    },
    clearPreviousInput(){
      this.question = '',
      this.filteredFaqs = ''
    }
  },
  created() {
    axios
      .get(this.GLOBAL.baseUrl + "/faq")
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
