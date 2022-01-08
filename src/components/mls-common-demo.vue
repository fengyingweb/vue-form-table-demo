<template>
  <div class="mls-common-wrapper">
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <mls-common-form
          ref="mlsForm"
          v-model="formData"
          :schema="schema"
          :uiSchema="uiSchema"
          :errorSchema="errorSchema"
          :formProps="formProps"
          :customFormats="customFormats"
          :hasExpand="true"
          :buttonGroupPosition="'right'"
          @change="formChange"
          @customEmitEvent="onCustomEmitEvent"
          @on-submit="formSubmit"
          @on-validation-failed="validateFailed">
          <template #buttonGroup>
            <div class="button-group-wrapper">
              <el-button type="primary" @click="clickSearch">查询</el-button>
              <el-button type="info" plain>取消</el-button>
            </div>
          </template>
        </mls-common-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {MlsCommonForm} from 'mls-common-ui';
import 'mls-common-ui/lib/@yueyun/mls-common-ui.css';

export default {
  components: {
    MlsCommonForm,
  },
  data() {
    return {
      formData: {},
      schema: {
        title: 'MLS Common Form Demo',
        type: 'object',
        required: ['userName', 'age', 'sex', 'likes', 'price', 'goods', 'dateTimeRange', 'dateTime'],
        properties: {
          userName: {
            type: 'string',
            title: '用户名',
          },
          age: {
            type: 'number',
            title: '年龄'
          },
          sex: {
            type: 'string',
            title: '性别',
            enum: ['boy', 'girl'],
            enumNames: ['男', '女']
          },
          likes: {
            type: 'array',
            title: '爱好',
            items: {
              type: 'string',
              enum: ['move', 'music', 'ball'],
              enumNames: ['电影', '音乐', '篮球']
            },
            uniqueItems: true
          },
          xueli: {
            type: 'string',
            title: '学历',
            enum: ['boshi', 'shuoshi', 'benke', 'dazhuan', 'zhongzhuan', 'gaozhong', 'chuzhong', 'xiaoxue'],
            enumNames: ['博士', '硕士', '本科', '大专', '中专', '高中', '初中', '小学']
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
          },
          goods: {
            type: 'string',
            title: '商品'
          },
          tasks: {
            "type": "array",
            "title": "Tasks",
            "items": {
                "type": "object",
                "required": [
                    "title"
                ],
                "properties": {
                    "title": {
                        "type": "string",
                        "title": "任务标题",
                        "description": "A sample title"
                    },
                    "details": {
                        "type": "string",
                        "title": "任务详情",
                        "description": "Enter the task details"
                    },
                    "done": {
                        "type": "boolean",
                        "title": "Done?",
                        "default": false
                    }
                }
            }
          },
          dateTimeRange: {
            title: "日期时间区间选择",
            type: "array",
            format: "date-time",
            default: ['2022-01-08 16:30:00', '2022-01-15 08:00:00'],
            items: {
                "type": "string"
            }
          },
          dateTimeRangeNumber: {
              title: "日期时间区间选择（number时间戳）",
              type: "array",
              format: "date-time",
              items: {
                  type: "number"
              }
          },
          dateRange: {
            title: "日期区间选择",
            type: "array",
            format: "date",
            items: {
                "type": "string"
            }
          },
          dateRangeNumber: {
              title: "日期区间选择（number时间戳）",
              type: "array",
              format: "date",
              items: {
                  "type": "number"
              }
          },
          dateTime: {
            title: "日期时间",
            type: "string",
            format: "date-time",
            default: '2022-01-08 16:30:00'
          },
          dateTimeNumber: {
              title: "日期时间（时间戳）",
              type: "number",
              format: "date-time"
          },
          date: {
            title: "日期",
            type: "string",
            format: "date"
          },
          dateNumber: {
              title: "日期（时间戳）",
              type: "number",
              format: "date"
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
        sex: {
          'ui:widget': 'RadioWidget'
        },
        likes: {
          'ui:widget': 'CheckboxesWidget'
        },
        xueli: {
          'ui:placeholder': '请选择学历',
          'ui:widget': 'SelectWidget'
        },
        bio: {
          'ui:canBeClose': true,
          'ui:hidden': false,
          'ui:options': {
            placeholder: '请输入你的签名',
            type: 'textarea',
            rows: 1
          }
        },
        price: {
          'ui:placeholder': '请输入数字，最多保留两位小数点，最大值999999.99',
          'ui:canBeClose': true,
          'ui:hidden': false,
        },
        goods: {
          'ui:canBeClose': true,
          'ui:hidden': false,
          'ui:field': 'SearchField',
          'ui:options': {
            placeholder: '请输入或选择商品'
          }
        },
        tasks: {
          'ui:canBeClose': true,
          'ui:hidden': false,
            "items": {
                "details": {
                    "ui:options": {
                        "type": "textarea"
                    }
                }
            }
        },
        dateTimeRange: {
          'ui:options': {
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间'
          }
        },
        dateTime: {
          'ui:options': {
            placeholder: '请选择日期时间'
          }
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
        sex: {
          'err:options': {
            required: '请选择性别'
          }
        },
        likes: {
          'err:options': {
            required: '请勾选爱好'
          }
        },
        price: {
          'err:options': {
            required: '请输入价格',
            format: '最多保留两位小数点，最大值999999.99'
          }
        },
        goods: {
          'err:options': {
            required: '请输入或选择商品'
          }
        },
        dateTimeRange: {
          'err:options': {
            required: '请选择开始时间和结束时间'
          }
        },
        dateTime: {
          'err:options': {
            required: '请选择日期时间'
          }
        }
      },
      formProps: {
          layoutColumn: 3, // 1 2 3 ，支持 1 2 3 列布局，如果使用inline表单这里配置无效
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
  },
  methods: {
    async clickSearch() {
      console.log(this.$refs.mlsForm); // formSubmit
      const result = await this.$refs.mlsForm.formSubmit();
      this.$emit('submit-form', result);
    },
    formChange(val) {
      this.$emit('form-change', val)
    },
    onCustomEmitEvent(params) {
      if (params.emitEvent === 'searchFieldSearch') {
        
      } else {
        
      }
    },
    formSubmit(params) {
      console.log('success:', params);
    },
    validateFailed(params) {
      console.log('fail:', params);
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>