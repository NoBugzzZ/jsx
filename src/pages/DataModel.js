import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DataModelReq, BusinessReq } from "../requests";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { navigate } from "hookrouter";
import { resolveRef } from "../utils";

var _ = require('lodash');

const basicTypes = ['string', 'number', 'integer', 'boolean', 'null','link']
// const arrayType = 'array'
// const objectType = 'object'

const getRowHead = ({ properties }) => {
  var res = []
  var sequence = []
  if (properties) {
    for (var p in properties) {
      const { type, title } = properties[p]
      const findType = basicTypes.find(e => e === type)
      if (findType) {
        res.push(<TableCell key={title} align="center">{title}</TableCell>)
        sequence.push(p)
      }
    }
    res.push(<TableCell key='操作' align="center">操作</TableCell>)
  }
  return { res, sequence }
}

export default function DataModel({ schemaId }) {

  const [schema, setSchema] = useState(null)
  const [uiSchema, setUiSchema] = useState(null)
  const [heads, setHeads] = useState(null)
  const [sequence, setSequence] = useState(null)
  const [rows, setRows] = useState(null)
  const [resolvedSchema,setResolvedSchema]=useState(null)

  useEffect(() => {
    setSchema(null)
    setUiSchema(null)
    setHeads(null)
    setSequence(null)
    setRows(null)
    setResolvedSchema(null)

    // DataModelReq.get(schemaId).then(data => {
    //   var { formschema: { uischema, fieldschema } } = data
    //   var newResolveSchema = resolveRef(_.cloneDeep(fieldschema))
    //   setSchema(fieldschema)
    //   setResolvedSchema(newResolveSchema)
    //   setUiSchema(uischema)
    //   const { res, sequence: seq } = getRowHead(newResolveSchema)
    //   setHeads(res)
    //   setSequence(seq)
    // })
    DataModelReq.getFromGrapgQL(schemaId).then(data => {
      var { formschema: { uischema, fieldschema } } = data
      var newResolveSchema = resolveRef(_.cloneDeep(fieldschema))
      setSchema(fieldschema)
      setResolvedSchema(newResolveSchema)
      setUiSchema(uischema)
      const { res, sequence: seq } = getRowHead(newResolveSchema)
      setHeads(res)
      setSequence(seq)
    })
  }, [schemaId])

  useEffect(() => {
    if (sequence) {
      BusinessReq.getFromGraphQL(schema,resolvedSchema).then(data=>{
        setRows(data)
      })
    }
  }, [sequence])

  return (
    <>
      <IconButton
        aria-label="add"
        color="primary"
        style={{ width: '100px', backgroundColor: 'blue', borderRadius: '5px', margin: '10px' }}
        onClick={() => {
          navigate(`/createbusiness/${schemaId}`)
        }}
      >
        <AddIcon style={{ color: 'white' }} fontSize="small" />
      </IconButton>
      <Table size="small">
        <TableHead>
          <TableRow>
            {heads}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows ? rows.map(row => {
            var cells = []
            sequence.forEach((key) => {
              if (row.hasOwnProperty(key)) {
                if(schema.properties[key].hasOwnProperty('$ref')){
                  const k=resolvedSchema.properties[key].value==='id'?'_id':resolvedSchema.properties[key].value
                  cells.push(<TableCell key={key} align="center">{row[key][k]}</TableCell>)
                }else{
                  cells.push(<TableCell key={key} align="center">{row[key]}</TableCell>)
                }
              } else {
                if(key==='id'){
                  cells.push(<TableCell key={key} align="center">{row['_id']}</TableCell>)
                }else{
                  cells.push(<TableCell key={key} align="center"></TableCell>)
                }
                
              }
            })
            cells.push(
              <TableCell key='操作' align="center">
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => {
                    navigate(`/business/${schemaId}/${row['_id']}`)
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  onClick={() => {
                    // BusinessReq.delete(formdataId).then(data => {
                    //   setRows(data)
                    // })
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>)
            return (
              <TableRow key={row['_id']}>
                {cells}
              </TableRow>)
          }) : null}
        </TableBody>
      </Table>
    </>
  )
}