<template>
  <div class="vue-from-demo">
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <vue-form
          v-model="formData"
          :schema="schema"
          :ui-schema="uiSchema"
          :error-schema="errorSchema"
          :custom-formats="customFormats"
          :form-props="formProps">
        </vue-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueForm from '@lljj/vue-json-schema-form';
export default {
  name: 'vue-from-demo',
  components: {
    VueForm,
  },
  data() {
    return {
      formData: {},
      schema: {
        title: 'VUE-Form Demo',
        type: 'object',
        required: ['userName', 'age', 'price'],
        properties: {
          userName: {
            type: 'string',
            title: '用户名',
          },
          age: {
            type: 'number',
            title: '年龄'
          },
          bio: {
            type: 'string',
            title: '签名',
            minLength: 10,
            default: '知道的越多、就知道的越少',
          },
          price: {
            type: 'string',
            title: '价格',
            description: '请输入数字，最多保留两位小数点，最大值999999.99',
            format: 'price'
          }
        }
      },
      uiSchema: {
        userName: {
          'ui:placeholder': '请输入用户名'
        },
        age: {
          'ui:placeholder': '请输入年龄'
        },
        bio: {
          'ui:options': {
            placeholder: '请输入你的签名',
            type: 'textarea',
            rows: 1
          }
        },
        price: {
          'ui:placeholder': '请输入数字，最多保留两位小数点，最大值999999.99'
        }
      },
      errorSchema: {
        userName: {
          'err:options': {
            required: '请输入用户名'
          }
        },
        age: {
          'err:options': {
            required: '请输入年龄'
          }
        },
        price: {
          'err:options': {
            required: '请输入价格',
            format: '最多保留两位小数点，最大值999999.99'
          }
        }
      },
      formProps: {
          layoutColumn: 1, // 1 2 3 ，支持 1 2 3 列布局，如果使用inline表单这里配置无效
          inline: false, // 行内表单模式，建议：开启时labelPosition不要配置top, antd不要配置labelCol wrapperCol
          inlineFooter: false, // 如果想要保存按钮和表单元素一行显示，需要配置 true
          labelSuffix: '：', // label后缀
          labelPosition: 'top', // 表单域标签的位置
          isMiniDes: false, // 是否优先mini形式显示描述信息（label文字和描述信息同行显示）
      },
      customFormats: { // 自定义校验规则
        price(value) {
          return value !== '' && /^[0-9]\d*$|^\d+(\.\d{1,2})$/.test(value) && value >= 0 && value <= 999999.99
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
