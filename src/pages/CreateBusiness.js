import { useState, useEffect } from "react"
import { DataModelReq, FlowModelReq, BusinessReq } from "../requests"
import CustomForm from "../components/Form/CustomForm";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Graph from '../components/Graph/Graph'
import { resolveRef } from "../utils";

var _ = require('lodash');

const graphOptions = {
  physics: {},
  interaction: {
    zoomView: false,
    dragNodes: false,
  },
};

export default function CreateBusiness({ schemaId }) {

  const [schema, setSchema] = useState({})
  const [uiSchema, setUiSchema] = useState({})
  const [resolvedSchema, setResolvedSchema] = useState({})

  const [flowModels, setFlowModels] = useState([])
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    DataModelReq.getFromGrapgQL(schemaId).then(data => {
      const { formschema: { uischema, fieldschema } } = data
      var newResolveSchema = resolveRef(_.cloneDeep(fieldschema))
      setSchema(fieldschema)
      setResolvedSchema(newResolveSchema)
      setUiSchema(uischema)
    })
  }, [schemaId])

  useEffect(() => {
    FlowModelReq.getAll().then(data => {
      setFlowModels(data)
    })
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper style={{ padding: '30px', margin: '30px' }} elevation={1}>
          <CustomForm
            schema={resolvedSchema}
            uiSchema={uiSchema}
            onSubmit={({ formData }) => {
              console.log(formData)
              BusinessReq.create(schema,formData).then(data=>{
                console.log(data)
                alert('创建成功')
              })
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ padding: '30px', margin: '30px', height: '400px' }} elevation={1}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                流程
              </InputLabel>
              <NativeSelect
                onChange={(e) => {
                  const flowModel = flowModels.find(flowModel => flowModel.id === e.target.value)
                  if (flowModel) {
                    const { lifecycle: { enkrino: { graph: selectedGraph, start } } } = flowModel
                    let newGraph = { ...selectedGraph }
                    newGraph.nodes = newGraph.nodes.map((item) => ({
                      ...item, label: item.name, color: "#CCFFFF"
                    }));
                    newGraph.edges = newGraph.edges.map((item) => ({
                      from: item.from,
                      to: item.to,
                      arrows: "to",
                    }));
                    setGraph(newGraph)
                  } else {
                    setGraph({ nodes: [], edges: [] })
                  }

                }}
                inputProps={{
                  name: 'schema',
                  id: 'age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                {flowModels.map(flowModel => {
                  const { id: flowModelId } = flowModel
                  return (<option key={flowModelId} value={flowModelId}>{flowModelId}</option>)
                })}
              </NativeSelect>
            </FormControl>
            <div style={{ height: '400px' }}>
              <Graph
                identifier={"customed-flow-graph"}
                graph={graph}
                options={graphOptions}
              />
            </div>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}