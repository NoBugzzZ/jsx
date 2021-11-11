import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DataModelReq, BusinessReq } from "../requests";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { navigate } from "hookrouter";

const basicTypes = ['string', 'number', 'integer', 'boolean', 'null']
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

export default function Business({ id }) {

  const [schema, setSchema] = useState(null)
  const [uiSchema, setUiSchema] = useState(null)
  const [heads, setHeads] = useState(null)
  const [sequence, setSequence] = useState(null)
  const [rows, setRows] = useState(null)

  useEffect(() => {
    DataModelReq.get(id).then(data => {
      var { formschema: { uischema, fieldschema } } = data
      fieldschema = fieldschema ? fieldschema : {}
      uischema = uischema ? uischema : {}
      setSchema(fieldschema)
      setUiSchema(uischema)

      const { res, sequence: seq } = getRowHead(fieldschema)
      setHeads(res)
      setSequence(seq)
    })
  }, [id])

  useEffect(() => {
    if (sequence) {
      BusinessReq.getAllFromDataModelId(id).then(data => {
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
          navigate(`/createbusiness/${id}`)
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
            const { id: formdataId, formdata } = row
            sequence.forEach((key) => {
              if (formdata.hasOwnProperty(key)) {
                cells.push(<TableCell key={key} align="center">{formdata[key]}</TableCell>)
              } else {
                cells.push(<TableCell key={key} align="center"></TableCell>)
              }
            })
            cells.push(
              <TableCell key='操作' align="center">
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => {
                    navigate(`/business/${formdataId}`)
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  onClick={() => {
                    BusinessReq.delete(formdataId).then(data => {
                      setRows(data)
                    })
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>)
            return (
              <TableRow key={formdataId}>
                {cells}
              </TableRow>)
          }) : null}
        </TableBody>
      </Table>
    </>
  )
}