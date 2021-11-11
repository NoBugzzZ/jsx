export default {
  async getAllFromDataModelId(id) {
    return mock
  },
  async delete(id){
    mock=mock.filter(e=>e.id!==id)
    return mock
  },
  async get(id){
    return mock.find(e=>e.id===parseInt(id))
  }
}

var mock = [
  {
    id: 1000,
    formdata:
    {
      "fee": "利润",
      "date": "2020-01-01",
      "order": "1121211111",
      "saler": "陆珺",
      "amount": 1212,
      "contact": "李四",
      "appendix": "备注",
      "customer": "客户"
    },
    lifecycle:{
      schema:{
        uischema: {
          "date": {
            "ui:widget": "date"
          },
          "appendix": {
            "ui:widget": "textarea"
          }
        },
        fieldschema: {
          "type": "object",
          "title": "预存记录",
          "properties": {
            "fee": {
              "enum": [
                "利润",
                "差旅费",
                "招待费",
                "投标费",
                "服务费",
                "其他"
              ],
              "type": "string",
              "title": "项目"
            },
            "date": {
              "type": "string",
              "title": "日期"
            },
            "order": {
              "type": "string",
              "title": "发票号码/单号"
            },
            "saler": {
              "enum": [
                "陆珺",
                "阮枫林",
                "钱昊",
                "许万羽",
                "苟家铭",
                "苏井",
                "王梦瀚",
                "王冬雨",
                "沈红扬",
                "李倍铭",
                "朱鸣",
                "周欢欢",
                "周坚",
                "刘丽君",
                "余文林1"
              ],
              "type": "string",
              "title": "销售人员"
            },
            "amount": {
              "type": "number",
              "title": "金额"
            },
            "contact": {
              "type": "string",
              "title": "联系人"
            },
            "appendix": {
              "type": "string",
              "title": "备注"
            },
            "customer": {
              "type": "string",
              "title": "客户"
            }
          }
        }
      }
    }
  },
  {
    id: 1001,
    formdata:
    {
      "fee": "服务费",
      "date": "2020-01-01",
      "order": "1121211111",
      "saler": "许万羽",
      "amount": 1212,
      "contact": "李四",
      "appendix": "备注",
      "customer": "客户"
    },
    lifecycle:{
      schema:{
        uischema: {
          "date": {
            "ui:widget": "date"
          },
          "appendix": {
            "ui:widget": "textarea"
          }
        },
        fieldschema: {
          "type": "object",
          "title": "预存记录",
          "properties": {
            "fee": {
              "enum": [
                "利润",
                "差旅费",
                "招待费",
                "投标费",
                "服务费",
                "其他"
              ],
              "type": "string",
              "title": "项目"
            },
            "date": {
              "type": "string",
              "title": "日期"
            },
            "order": {
              "type": "string",
              "title": "发票号码/单号"
            },
            "saler": {
              "enum": [
                "陆珺",
                "阮枫林",
                "钱昊",
                "许万羽",
                "苟家铭",
                "苏井",
                "王梦瀚",
                "王冬雨",
                "沈红扬",
                "李倍铭",
                "朱鸣",
                "周欢欢",
                "周坚",
                "刘丽君",
                "余文林1"
              ],
              "type": "string",
              "title": "销售人员"
            },
            "amount": {
              "type": "number",
              "title": "金额"
            },
            "contact": {
              "type": "string",
              "title": "联系人"
            },
            "appendix": {
              "type": "string",
              "title": "备注"
            },
            "customer": {
              "type": "string",
              "title": "客户"
            }
          }
        }
      }
    }
  },

]