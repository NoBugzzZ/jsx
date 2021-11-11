import { useState, useEffect } from "react"
import { BusinessReq } from "../requests"
import Form from "@rjsf/material-ui"
import { Paper } from "@mui/material"

export default function Business({ id }) {

  const [schema, setSchema] = useState({})
  const [uiSchema, setUiSchema] = useState({})
  const [formData, setFormData] = useState({})

  useEffect(() => {
    BusinessReq.get(id).then(data => {
      console.log(data)
      const { formdata, lifecycle: { schema: { uischema, fieldschema } } } = data
      setFormData(formdata)
      setSchema(fieldschema)
      setUiSchema(uischema)
    })
  }, [id])

  return (
    <Paper style={{ padding: '30px', margin: '30px' }} elevation={1}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
      />
    </Paper>
  )
}