import axios from "axios"
import { create } from "lodash"
import { getReponse, getReponseForOne } from "../utils"
import { API_URL } from "../config"

const api = API_URL.GRAPHQL

export default {
  async getAllFromDataModelId(id) {
    return mock
  },
  async delete(id) {
    mock = mock.filter(e => e.id !== id)
    return mock
  },
  async get(id) {
    return mock.find(e => e.id === parseInt(id))
  },
  async getFromGraphQL(schema, resolvedSchema,filter='') {
    var { nodeType } = schema
    nodeType = nodeType.substring(0, 1).toLowerCase() + nodeType.substring(1)
    const response = getReponse(schema.properties, resolvedSchema.properties)
    var query=''
    if(filter){
      query=`{
        query_${nodeType}_list(where:
          ${filter}
        ){
          _id
          ${response}
        }
      }`
    }else{
      query = `{
        query_${nodeType}_list{
          _id
          ${response}
        }
      }`
    }
    console.log(query)
    const { data } = await axios.post(api, query, {
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    console.log(data)
    if (data) {
      return data[Object.keys(data)[0]]
    } else {
      return []
    }

  },
  async getFromGraphQLById(id, schema, resolvedSchema) {
    var { nodeType } = schema
    nodeType = nodeType.substring(0, 1).toLowerCase() + nodeType.substring(1)
    const response = getReponseForOne(schema.properties, resolvedSchema.properties)
    const query = `{
      query_${nodeType}(_id:"${id}"){
        _id
        ${response}
      }
    }`
    console.log(query)
    const { data } = await axios.post(api, query, {
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    console.log(data)
    return data[Object.keys(data)[0]]
  },
  async create(schema, formData) {
    var { nodeType } = schema
    nodeType = nodeType.substring(0, 1).toLowerCase() + nodeType.substring(1)
    const query = `{
      create_${nodeType}(
        data:${JSON.stringify(formData, null, 2).replace(/"([^"]+)":/g, '$1:')}
        ){
        _id
      }
    }`
    console.log(query)
    const { data } = await axios.post(api, query, {
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    console.log(data)
    return data
  },
  async getSource(schema) {

  },
}

var mock = [
  {
    id: 1000,
    formdata:
    {
      "fee": "??????",
      "date": "2020-01-01",
      "order": "1121211111",
      "saler": "??????",
      "amount": 1212,
      "contact": "??????",
      "appendix": "??????",
      "customer": "??????"
    },
    lifecycle: {
      schema: {
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
    }
  },
  {
    id: 1001,
    formdata:
    {
      "fee": "?????????",
      "date": "2020-01-01",
      "order": "1121211111",
      "saler": "?????????",
      "amount": 1212,
      "contact": "??????",
      "appendix": "??????",
      "customer": "??????"
    },
    lifecycle: {
      schema: {
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
    }
  },

]