<template>
  <div class="status-checkbox-wrapper">
    <el-form-item
      :label="selectProps.title"
      :props="curNodePath"
      size="medium"
      :rules="[
          {
              validator(rule, value, callback) {
                  const errors = schemaValidate.validateFormDataAndTransformMsg({
                      formData: value,
                      schema: $props.rootSchema.properties[$props.curNodePath],
                      customFormats: $props.customFormats,
                      errorSchema: $props.errorSchema,
                      required: $props.rootSchema.required.includes($props.curNodePath),
                      propPath: $props.curNodePath
                  });
                  if (errors.length === 0) return callback();

                  return callback(errors[0].message);
              },
          }
      ]"
      :required="elItemRequired" >
      <el-row :gutter="16">
        <el-col :span="4">
          <el-checkbox 
            class="status-checkbox-item"
            v-model="checkAll"
            :indeterminate="indeterminate"
            @change="handleCheckAllChange">全选</el-checkbox>
        </el-col>
        <el-col :span="20">
          <el-checkbox-group v-model="checkModel" @change="handleCheckedStatesChange">
            <el-checkbox 
              v-for="item in selectProps.enums"
              :label="item.value"
              :key="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>

<script>
import { fieldProps, vueUtils, formUtils, schemaValidate } from '@lljj/vue-json-schema-form'
export default {
  name: 'StatusCheckbox',
  props: {
    ...fieldProps,
  },
  data() {
    return {
      schemaValidate,
      vueUtils,
      indeterminate: true,
      checkAll: false
    }
  },
  computed: {
    elItemRequired () {
      // 配置了 required 的属性提示小红点
      return this.rootSchema.required.indexOf(this.curNodePath) > -1;
    },
    selectProps () {
      return formUtils.getUiOptions({
        schema: this.schema,
        uiSchema: this.uiSchema
      })
    },
    curValue () {
      return vueUtils.getPathVal(this.rootFormData, this.curNodePath)
    },
    checkModel: {
      get () {
          return this.curValue
      },
      set (value) {
          vueUtils.setPathVal(this.rootFormData, vueUtils.computedCurPath('', this.curNodePath), value)
      }
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkModel = val ? this.selectProps.enums.map(item=> item.value) : [];
      this.indeterminate = false;
    },
    handleCheckedStatesChange(value) {
        console.log(value);
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.selectProps.enums.length;
        this.indeterminate = checkedCount > 0 && checkedCount < this.selectProps.enums.length;
    },
    setAllCheck() {
      this.checkAll = this.checkModel.length === this.selectProps.enums.length;
      this.indeterminate = this.checkModel.length > 0 && this.checkModel.length < this.selectProps.enums.length;
    }
  },
  mounted() {
    this.setAllCheck();
  }
}
</script>

<style lang="less" scoped>
  .status-checkbox-wrapper {
    width: 100%;
  }
  .status-checkbox-item {
    // margin-bottom: 15px;
  }
</style>