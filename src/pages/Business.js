import { useState, useEffect } from "react"
import { BusinessReq, DataModelReq } from "../requests"
import CustomForm from '../components/Form/CustomForm'
import { Paper } from "@mui/material"
import { resolveRef, transformType } from "../utils";

var _ = require('lodash');

const traverse = (schemaProperties, resolvedSchemaProperties, formData) => {
  for (let key in schemaProperties) {
    if (schemaProperties[key].hasOwnProperty('$ref')) {
      const k = resolvedSchemaProperties[key].key === 'id' ? '_id' : resolvedSchemaProperties[key].key
      formData[key] = formData[key][k]
    } else {
      if (schemaProperties[key].type === 'object') {
        traverse(schemaProperties[key].properties, resolvedSchemaProperties[key].properties, formData[key])
      } else if (schemaProperties[key].type === 'array') {
        if (schemaProperties[key].items.hasOwnProperty('$ref')) {
          const k = resolvedSchemaProperties[key].items.key === 'id' ? '_id' : resolvedSchemaProperties[key].items.key
          formData[key] = formData[key].map(e => e[k])
        } else {

        }
      } else {
        if (key === 'id') {
          formData['id'] = formData['_id']
        } else {
        }
      }
    }
  }
}

export default function Business({ schemaId, id }) {
  const [schema, setSchema] = useState({})
  const [uiSchema, setUiSchema] = useState({})
  const [formData, setFormData] = useState({})
  const [resolvedSchema, setResolvedSchema] = useState({})

  useEffect(() => {
    DataModelReq.getFromGrapgQL(schemaId).then(data => {
      var { uischema, fieldschema } = data
      var newResolvedSchema = resolveRef(_.cloneDeep(fieldschema))
      newResolvedSchema=transformType(_.cloneDeep(newResolvedSchema))
      setSchema(fieldschema)
      setResolvedSchema(newResolvedSchema)
      setUiSchema(uischema)
      BusinessReq.getFromGraphQLById(id, fieldschema, newResolvedSchema).then(res => {
        var newFormData = _.cloneDeep(res)
        traverse(fieldschema.properties, newResolvedSchema.properties, newFormData)
        setFormData(newFormData)
      })
    })
  }, [schemaId])

  return (
    <Paper style={{ padding: '30px', margin: '30px' }} elevation={1}>
      <CustomForm
        schema={resolvedSchema}
        uiSchema={uiSchema}
        formData={formData}
        onSubmit={({ formData }) => {
          alert(
            JSON.stringify(formData)
          );
        }}
      />
    </Paper>
  )
}