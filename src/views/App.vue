<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png">
    <vue-form-demo></vue-form-demo>
    <mls-common-demo
      @submit-form="submitForm"
      @form-change="formChange">
    </mls-common-demo>
  </div>
</template>

<script>
import vueFormDemo from '../components/VueForm.vue'
import mlsCommonDemo from '../components/mls-common-demo'
export default {
  name: 'App',
  components: {
    vueFormDemo,
    mlsCommonDemo,
  },
  data() {
    return {
      inputParams: {}
    }
  },
  methods: {
    submitForm(result) {
      console.log(result);
    },
    formChange(val) {
      this.inputParams = val;
      console.log(this.inputParams);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
