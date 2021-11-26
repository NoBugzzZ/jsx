import React from "react";
import Title from "../components/Title";
import Grid from "@material-ui/core/Grid";
import Editor from "@monaco-editor/react";
import FixedHeightContainer from "../components/FixedHeightContainer";
import CustomForm from "../components/Form/CustomForm";
import { DataModelReq } from "../requests";
import { resolveRef } from "../utils";

var _ = require('lodash');

export default function DataModelPreview({ id }) {

  const [schema, setSchema] = React.useState({});
  const [uiSchema, setUiSchema] = React.useState({});
  const [resolvedSchema,setResolvedSchema]=React.useState({})

  React.useEffect(() => {
    DataModelReq.getFromGrapgQL(id).then(data => {
      var { uischema, fieldschema } = data
      var newResolveSchema = resolveRef(_.cloneDeep(fieldschema))
      setSchema(fieldschema)
      setResolvedSchema(newResolveSchema)
      setUiSchema(uischema)
    })
  }, [])

  return (
    <div>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <FixedHeightContainer height={800}>
            <Title>SchemaEditor</Title>
            <p>schema</p>
            <Editor
              title="Schema"
              language="json"
              value={JSON.stringify(schema, null, "\t")}
              options={{ readOnly: true }}
            />
            <p>ui:schema</p>
            <Editor
              language="json"
              value={JSON.stringify(uiSchema, null, "\t")}
              options={{ readOnly: true }}
            />
          </FixedHeightContainer>
        </Grid>
        <Grid item xs={6}>
          <FixedHeightContainer height={800}>
            <Title>SchemaForm</Title>
            <CustomForm
              onSubmit={({ formData }) => {
                alert(
                  JSON.stringify(formData)
                );
              }}
              schema={resolvedSchema}
              uiSchema={uiSchema}
            />
          </FixedHeightContainer>
        </Grid>
      </Grid>
    </div>
  )
}