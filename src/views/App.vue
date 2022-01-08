<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png">
    <vue-form-demo></vue-form-demo>
    <mls-common-demo
      ref="formDemo"
      @submit-form="submitForm"
      @form-change="formChange">
    </mls-common-demo>
    <mls-table-demo
      ref="tableDemo"
      :tableDatas="tableDatas"
      :loading="loading"
      :paginationConfig="paginationConfig"
      @ratio-change="ratioChange"
      @selection-change="handleSelectChange"
      @size-change="handleSizeChange"
      @p-current-change="handlePageChange" />
  </div>
</template>

<script>
import vueFormDemo from '../components/VueForm.vue'
import mlsCommonDemo from '../components/mls-common-demo'
import mlsTableDemo from '../components/mls-table-demo'
export default {
  name: 'App',
  components: {
    vueFormDemo,
    mlsCommonDemo,
    mlsTableDemo
  },
  data() {
    return {
      inputParams: {},
      tableDatas: [],
      paginationConfig: {
        pageSize: 10,
        total: 100,
        page: 1
      },
      loading: false
    }
  },
  methods: {
    createTableData (length) {
      this.loading = true
      let data = []
      for (let i = 0; i < length; i++) {
        data.push({
          id: Date.now() + i,
          date: '2016-05-02',
          name: `王小虎-${this.paginationConfig.page}-${i + 1}`,
          address: `上海市普陀区金沙江路 -${this.paginationConfig.page}-${i + 1} 弄`
        })
      }
      setTimeout(() => {
        this.tableDatas = data
        this.loading = false
      }, 2000)
    },
    submitForm(result) {
      console.log(result);
    },
    formChange(val) {
      this.inputParams = val;
      console.log(this.inputParams);
    },
    ratioChange(curRow) {
      console.log(curRow);
    },
    handleSelectChange(rows) {
      console.log(rows);
    },
    handleSizeChange(size) {
      this.paginationConfig.page = 1;
      this.createTableData(size);
    },
    handlePageChange(page) {
      this.paginationConfig.pageSize = 10;
      this.createTableData(this.paginationConfig.pageSize)
    }
  },
  mounted() {
    this.createTableData(this.paginationConfig.pageSize)
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
