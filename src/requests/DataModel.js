import axios from "axios"
import { API_URL } from '../config'
import { getRandomInt } from "../utils"
const api = API_URL.GRAPHQL
const createURL = API_URL.CREATE

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
    const allData=data[Object.keys(data)[0]]
    var res = allData.find(e=>e.fieldschema.nodeType===id)
    console.log(res)
    return res
  },
  async getAllFromGrapgQL() {
    const query = `{
      query_schemas{...}
    }`
    const { data } = await axios.post(api, query, {
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    var res = data[Object.keys(data)[0]]
    console.log(res)
    return res
  },
  async createDataModel(formschema) {
    const res = await axios.request({
      url: createURL + '/schemas',
      method: 'POST',
      data: formschema,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(res)
    return res
  },
  async isAccess(id, auth) {
    console.log(id)
    const query = `{
      query_schemas{...}
    }`
    const { data } = await axios.post(api, query, {
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    const allData=data[Object.keys(data)[0]]
    var schema = allData.find(e=>e.fieldschema.nodeType===id)
    const schemaAuth=schema.auth
    if(schemaAuth&&schemaAuth===auth){
      return true
    }
    return false
  }
}

const auths = [
  "saler", "manager", "engineer", "assitsaler"
]
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
        "title": "????????????",
        "properties": {
          "fee": {
            "enum": [
              "??????",
              "?????????",
              "?????????",
              "?????????",
              "?????????",
              "??????"
            ],
            "type": "string",
            "title": "??????"
          },
          "date": {
            "type": "string",
            "title": "??????"
          },
          "order": {
            "type": "string",
            "title": "????????????/??????"
          },
          "saler": {
            "enum": [
              "??????",
              "?????????",
              "??????",
              "?????????",
              "?????????",
              "??????",
              "?????????",
              "?????????",
              "?????????",
              "?????????",
              "??????",
              "?????????",
              "??????",
              "?????????",
              "?????????1"
            ],
            "type": "string",
            "title": "????????????"
          },
          "amount": {
            "type": "number",
            "title": "??????"
          },
          "contact": {
            "type": "string",
            "title": "?????????"
          },
          "appendix": {
            "type": "string",
            "title": "??????"
          },
          "customer": {
            "type": "string",
            "title": "??????"
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
        "title": "????????????",
        "properties": {
          "fee": {
            "enum": [
              "??????",
              "?????????",
              "?????????",
              "?????????",
              "?????????",
              "??????"
            ],
            "type": "string",
            "title": "??????"
          },
          "month": {
            "type": "string",
            "title": "??????"
          },
          "amount": {
            "type": "number",
            "title": "??????"
          },
          "appendix": {
            "type": "string",
            "title": "??????"
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
        "title": "??????",
        "properties": {
          "fee": {
            "enum": [
              "??????",
              "?????????",
              "?????????",
              "?????????",
              "?????????",
              "??????"
            ],
            "type": "string",
            "title": "??????"
          },
          "cash": {
            "enum": [
              "???",
              "???"
            ],
            "type": "string",
            "title": "?????????????????????"
          },
          "month": {
            "type": "string",
            "title": "??????"
          },
          "amount": {
            "type": "number",
            "title": "??????"
          },
          "salers": {
            "enum": [
              "??????",
              "?????????",
              "??????",
              "?????????",
              "?????????",
              "??????",
              "?????????",
              "?????????",
              "?????????",
              "?????????",
              "??????",
              "?????????",
              "??????",
              "?????????",
              "?????????1"
            ],
            "type": "string",
            "title": "????????????"
          },
          "appendix": {
            "type": "string",
            "title": "??????"
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
        "title": "??????",
        "properties": {
          "saler": {
            "type": "string",
            "title": "??????"
          },
          "company": {
            "enum": [
              "?????????",
              "??????",
              "??????"
            ],
            "type": "string",
            "title": "??????"
          },
          "appendix": {
            "type": "string",
            "title": "??????"
          },
          "invoiceDate": {
            "type": "string",
            "title": "????????????"
          },
          "invoiceType": {
            "enum": [
              "????????????",
              "??????",
              "??????+??????"
            ],
            "type": "string",
            "title": "????????????",
            "default": "????????????"
          },
          "productName": {
            "type": "string",
            "title": "????????????"
          },
          "customerName": {
            "type": "string",
            "title": "????????????"
          },
          "invoiceAmount": {
            "type": "number",
            "title": "????????????"
          },
          "invoiceNumber": {
            "type": "string",
            "title": "????????????"
          },
          "invoiceCompany": {
            "type": "string",
            "title": "????????????"
          }
        },
        "dependencies": {
          "invoiceType": {
            "oneOf": [
              {
                "properties": {
                  "invoiceType": {
                    "enum": [
                      "????????????",
                      "??????"
                    ]
                  }
                }
              },
              {
                "properties": {
                  "duebill": {
                    "type": "object",
                    "title": "????????????",
                    "properties": {
                      "invoiceAmount": {
                        "type": "number",
                        "title": "????????????"
                      }
                    }
                  },
                  "invoiceType": {
                    "enum": [
                      "??????+??????"
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
        "title": "???????????????",
        "properties": {
          "order": {
            "type": "string",
            "title": "??????"
          },
          "saler": {
            "enum": [
              "??????",
              "?????????",
              "??????",
              "?????????",
              "?????????",
              "??????",
              "?????????",
              "?????????",
              "?????????",
              "?????????",
              "??????",
              "?????????",
              "??????",
              "?????????",
              "?????????1"
            ],
            "type": "string",
            "title": "??????"
          },
          "amount": {
            "type": "number",
            "title": "??????"
          },
          "payDate": {
            "type": "string",
            "title": "??????????????????"
          },
          "project": {
            "type": "string",
            "title": "????????????"
          },
          "appendix": {
            "type": "string",
            "title": "??????"
          },
          "customer": {
            "type": "string",
            "title": "??????"
          },
          "applyDate": {
            "type": "string",
            "title": "????????????"
          },
          "payCompany": {
            "enum": [
              "?????????",
              "??????",
              "??????"
            ],
            "type": "string",
            "title": "????????????"
          },
          "recvCompany": {
            "type": "string",
            "title": "????????????"
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
        "title": "????????????",
        "properties": {
          "fee": {
            "enum": [
              "??????",
              "?????????",
              "?????????",
              "?????????",
              "?????????",
              "??????"
            ],
            "type": "string",
            "title": "??????"
          },
          "month": {
            "type": "string",
            "title": "??????"
          },
          "amount": {
            "type": "number",
            "title": "??????"
          },
          "appendix": {
            "type": "string",
            "title": "??????"
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
        "title": "???????????????",
        "properties": {
          "cash": {
            "enum": [
              "???",
              "???"
            ],
            "type": "string",
            "title": "?????????????????????"
          },
          "month": {
            "type": "string",
            "title": "??????"
          },
          "usage": {
            "type": "string",
            "title": "??????"
          },
          "amount": {
            "type": "number",
            "title": "??????"
          },
          "appendix": {
            "type": "string",
            "title": "??????"
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
        "title": "??????????????????",
        "properties": {
          "fee": {
            "enum": [
              "??????",
              "?????????",
              "?????????",
              "?????????",
              "?????????",
              "??????"
            ],
            "type": "string",
            "title": "??????"
          },
          "cash": {
            "enum": [
              "???",
              "???"
            ],
            "type": "string",
            "title": "?????????????????????"
          },
          "month": {
            "type": "string",
            "title": "??????"
          },
          "amount": {
            "type": "number",
            "title": "??????"
          },
          "appendix": {
            "type": "string",
            "title": "??????"
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