<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <div class="table-wrapper">
          <mls-common-table
            ref="mlsTable1"
            v-loading="loading"
            :data="tableDatas"
            :column="tableColumnConfig.column1"
            border
            :pagination="false"
            :total="paginationConfig.total"
            :page-size="paginationConfig.pageSize"
            :current-page.sync="paginationConfig.page"
            row-key="id"
            :hasRatioSelect="true"
            :max-height="300"
            @current-change="handleRatioChange" />
        </div>

        <div class="table-wrapper">
          <mls-common-table
            ref="mlsTable2"
            v-loading="loading"
            :data="tableDatas"
            :column="tableColumnConfig.column2"
            border
            pagination
            :total="paginationConfig.total"
            :page-size="paginationConfig.pageSize"
            :current-page.sync="paginationConfig.page"
            row-key="id"
            :hasSelectedSumary="true"
            :max-height="300"
            @selection-change="handleSelectionChange"
            @size-change="handleSizeChange"
            @p-current-change="handlePCurrentChange" />
        </div>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {MlsCommonTable} from 'mls-common-ui';
export default {
  components: {
    MlsCommonTable
  },
  props: {
    tableDatas: {
      type: Array,
      required: true,
      default: ()=> []
    },
    loading: {
      type: Boolean,
      default: false
    },
    paginationConfig: Object
  },
  data() {
    return {
      tableColumnConfig: {
        column1: [
          {
            type: 'index',
            align: 'center',
            width: 50,
            label: '序号'
          },
          {
            prop: 'date',
            label: '日期',
            align: 'center'
          },
          {
            prop: 'name',
            align: 'center',
            label: '姓名'
          },
          {
            prop: 'address',
            align: 'center',
            label: '地址'
          }
        ],
        column2: [
          {
            type: 'selection',
            align: 'center',
            label: '选择',
            width: 50
          },
          {
            type: 'index',
            align: 'center',
            width: 50,
            label: '序号'
          },
          {
            prop: 'date',
            align: 'center',
            label: '日期',
            showOverflowTooltip: true,
            sortable: true
          },
          {
            prop: 'name',
            align: 'center',
            label: '姓名',
            showOverflowTooltip: true,
            sortable: true
          },
          {
            prop: 'address',
            align: 'center',
            label: '地址',
            showOverflowTooltip: true,
            sortable: true
          }
        ]
      }
    }
  },
  methods: {
    handleRatioChange(val) {
      this.$emit('ratio-change', val)
    },
    handleSelectionChange(rows) {
      this.$emit('selection-change', rows)
    },
    handleSizeChange(size) {
      this.$emit('size-change', size);
    },
    handlePCurrentChange(page) {
      this.$emit('p-current-change', page)
    }
  }
}
</script>

<style lang="less" scoped>
  .table-wrapper {
    margin: 0 auto 50px;
  }
</style>