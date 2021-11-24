import axios from "axios"
import { API_URL } from '../config'

const api=API_URL.DATA_MODEL

export default {
  async get(id) {
    // const data = mock.find(element => element.id === parseInt(id))
    // return data ? data : {}
    const { data } = await axios.request({
      url: api + id,
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    return data
  },
  async getFromGrapgQL(id) {
    const query = `{
      query_schemas{...}
    }`
    const { data } = await axios.post(api, query, {
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    const res = data[id]
    console.log(res)
    return res
  }
}


const mock = [
  {
    id: 1000,
    formschema: {
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
  },
  {
    id: 1001,
    formschema: {
      uischema: {
        "month": {
          "ui:widget": "date"
        },
        "appendix": {
          "ui:widget": "textarea"
        }
      },
      fieldschema: {
        "type": "object",
        "title": "现金流水",
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
          "month": {
            "type": "string",
            "title": "月份"
          },
          "amount": {
            "type": "number",
            "title": "金额"
          },
          "appendix": {
            "type": "string",
            "title": "备注"
          }
        }
      }
    }
  },
  {
    id: 1002,
    formschema: {
      fieldschema: {
        "type": "object",
        "title": "毛利",
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
          "cash": {
            "enum": [
              "是",
              "否"
            ],
            "type": "string",
            "title": "是否为现金支出"
          },
          "month": {
            "type": "string",
            "title": "月份"
          },
          "amount": {
            "type": "number",
            "title": "金额"
          },
          "salers": {
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
          "appendix": {
            "type": "string",
            "title": "备注"
          }
        }
      },
      uischema: {
        "cash": {
          "ui:widget": "radio"
        },
        "month": {
          "ui:widget": "date"
        },
        "appendix": {
          "ui:widget": "textarea"
        }
      }
    }
  },
  {
    id: 1003,
    formschema: {
      fieldschema: {
        "type": "object",
        "title": "发票",
        "properties": {
          "saler": {
            "type": "string",
            "title": "销售"
          },
          "company": {
            "enum": [
              "杰世欣",
              "骏岭",
              "其他"
            ],
            "type": "string",
            "title": "公司"
          },
          "appendix": {
            "type": "string",
            "title": "备注"
          },
          "invoiceDate": {
            "type": "string",
            "title": "开票日期"
          },
          "invoiceType": {
            "enum": [
              "正常开票",
              "借票",
              "开票+借票"
            ],
            "type": "string",
            "title": "开票类型",
            "default": "正常开票"
          },
          "productName": {
            "type": "string",
            "title": "产品名称"
          },
          "customerName": {
            "type": "string",
            "title": "客户姓名"
          },
          "invoiceAmount": {
            "type": "number",
            "title": "开票金额"
          },
          "invoiceNumber": {
            "type": "string",
            "title": "发票号码"
          },
          "invoiceCompany": {
            "type": "string",
            "title": "开票单位"
          }
        },
        "dependencies": {
          "invoiceType": {
            "oneOf": [
              {
                "properties": {
                  "invoiceType": {
                    "enum": [
                      "正常开票",
                      "借票"
                    ]
                  }
                }
              },
              {
                "properties": {
                  "duebill": {
                    "type": "object",
                    "title": "借票部分",
                    "properties": {
                      "invoiceAmount": {
                        "type": "number",
                        "title": "开票金额"
                      }
                    }
                  },
                  "invoiceType": {
                    "enum": [
                      "开票+借票"
                    ]
                  }
                }
              }
            ]
          }
        }
      },
      uischema: {
        "appendix": {
          "ui:widget": "textarea"
        },
        "invoiceDate": {
          "ui:widget": "date"
        }
      }
    }
  },
  {
    id: 1100,
    formschema: {
      fieldschema: {
        "type": "object",
        "title": "投标保证金",
        "properties": {
          "order": {
            "type": "string",
            "title": "编号"
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
            "title": "销售"
          },
          "amount": {
            "type": "number",
            "title": "金额"
          },
          "payDate": {
            "type": "string",
            "title": "预计收回时间"
          },
          "project": {
            "type": "string",
            "title": "项目名称"
          },
          "appendix": {
            "type": "string",
            "title": "备注"
          },
          "customer": {
            "type": "string",
            "title": "客户"
          },
          "applyDate": {
            "type": "string",
            "title": "申请时间"
          },
          "payCompany": {
            "enum": [
              "杰世欣",
              "骏岭",
              "其他"
            ],
            "type": "string",
            "title": "付款单位"
          },
          "recvCompany": {
            "type": "string",
            "title": "收款单位"
          }
        }
      },
      uischema: {
        "payDate": {
          "ui:wdiget": "date"
        },
        "appendix": {
          "ui:widget": "textarea"
        },
        "applyDate": {
          "ui:widget": "date"
        }
      }
    }
  },
  {
    id: 1101,
    formschema: {
      fieldschema: {
        "type": "object",
        "title": "现金流水",
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
          "month": {
            "type": "string",
            "title": "月份"
          },
          "amount": {
            "type": "number",
            "title": "金额"
          },
          "appendix": {
            "type": "string",
            "title": "备注"
          }
        }
      },
      uischema: {
        "month": {
          "ui:widget": "date"
        },
        "appendix": {
          "ui:widget": "textarea"
        }
      }
    }
  },
  {
    id: 1102,
    formschema: {
      fieldschema: {
        "type": "object",
        "title": "总经办支出",
        "properties": {
          "cash": {
            "enum": [
              "是",
              "否"
            ],
            "type": "string",
            "title": "是否为现金支出"
          },
          "month": {
            "type": "string",
            "title": "月份"
          },
          "usage": {
            "type": "string",
            "title": "用途"
          },
          "amount": {
            "type": "number",
            "title": "金额"
          },
          "appendix": {
            "type": "string",
            "title": "备注"
          }
        }
      },
      uischema: {
        "cash": {
          "ui:widget": "radio"
        },
        "month": {
          "ui:widget": "date"
        },
        "appendix": {
          "ui:widget": "textarea"
        }
      }
    }
  },
  {
    id: 1103,
    formschema: {
      fieldschema: {
        "type": "object",
        "title": "行政管理费用",
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
          "cash": {
            "enum": [
              "是",
              "否"
            ],
            "type": "string",
            "title": "是否为现金支出"
          },
          "month": {
            "type": "string",
            "title": "月份"
          },
          "amount": {
            "type": "number",
            "title": "金额"
          },
          "appendix": {
            "type": "string",
            "title": "备注"
          }
        }
      },
      uischema: {
        "cash": {
          "ui:widget": "radio"
        },
        "month": {
          "ui:widget": "date"
        },
        "appendix": {
          "ui:widget": "textarea"
        }
      }
    }
  },
]