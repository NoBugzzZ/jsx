import { useEffect, useState } from 'react';
import { Query, Builder, BasicConfig, Utils as QbUtils } from 'react-awesome-query-builder';
import MaterialConfig from 'react-awesome-query-builder/lib/config/material';
import 'react-awesome-query-builder/lib/css/styles.css';
import 'react-awesome-query-builder/lib/css/compact_styles.css';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
  container: {
    // paddingTop:'10px'
  },
  filterbutton:{
    width:'100px'
  }
})

var _ = require('lodash');

const InitialConfig = MaterialConfig
const { conjunctions: { AND, OR } } = InitialConfig

const defaultConfig = {
  ...InitialConfig,
  conjunctions: {
    AND: {
      ...AND,
      mongoConj: '_and',
    },
    OR: {
      ...OR,
      mongoConj: '_or',
    }
  },
  operators: {
    equal: {
      label: '==',
      labelForFormat: '==',
      reversedOp: 'not_equal',
      cardinality: 1,
      formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `${field} ${opDef.labelForFormat} ${value}`,
      mongoFormatOp: (field, op, value) => ({ [field]: { '_eq': value } }),
    },
    not_equal: {
      label: '!=',
      labelForFormat: '!=',
      reversedOp: 'equal',
      cardinality: 1,
      formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `${field} ${opDef.labelForFormat} ${value}`,
      mongoFormatOp: (field, op, value) => ({ [field]: { '_neq': value } }),
    },
  },
  fields: {
    test: {
      label: 'test',
      type: 'text',
    },
  }
};

const queryValue = { "id": QbUtils.uuid(), "type": "group" };

const mapper = {
  string: "text",
  // number: "number",
  // integer: "number",
  // boolean: "boolean",
  link: "text",
}

const getFields = (resolvedSchema, sequence) => {
  var res = {}
  if (resolvedSchema.hasOwnProperty('properties')) {
    const { properties } = resolvedSchema
    sequence.forEach(seq => {
      if (seq in properties) {
        const { type } = properties[seq]
        if (type in mapper) {
          res[seq] = {
            label: seq,
            type: mapper[type]
          }
        }
      }
    })
  }
  return res
}

export default function QueryBuilder({ resolvedSchema, sequence, setFilter }) {
  const classes = useStyle()
  const [config, setConfig] = useState(defaultConfig)
  const [tree, setTree] = useState(QbUtils.checkTree(QbUtils.loadTree(queryValue), config))

  useEffect(() => {
    if (resolvedSchema && sequence) {
      const newConfig = _.cloneDeep(config)
      setConfig({ ...newConfig, fields: getFields(resolvedSchema, sequence) })
    }
  }, [resolvedSchema, sequence])

  const renderBuilder = (props) => (
    <div className="query-builder-container" style={{ padding: '10px' }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  )

  const renderResult = () => (
    <div className="query-builder-result">
      <div>Query string: <pre>{JSON.stringify(QbUtils.queryString(tree, config))}</pre></div>
      <div>MongoDb query: <pre>{JSON.stringify(QbUtils.mongodbFormat(tree, config))}</pre></div>
      {/* <div>SQL where: <pre>{JSON.stringify(QbUtils.sqlFormat(tree, config))}</pre></div> */}
      {/* <div>JsonLogic: <pre>{JSON.stringify(QbUtils.jsonLogicFormat(tree, config))}</pre></div> */}
    </div>
  )

  const onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    setTree(immutableTree);

    const jsonTree = QbUtils.getTree(immutableTree);
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  }

  return (
    <Paper elevation={1} className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Query
            {...config}
            value={tree}
            onChange={onChange}
            renderBuilder={renderBuilder}
          />
        </Grid>
        <Grid item xs={2}>
          <Button className={classes.filterbutton} style={{margin:'25px'}} variant="contained" onClick={() => {
            var filter = JSON.stringify(QbUtils.mongodbFormat(tree, config), null, 2)
            if (filter) {
              setFilter(filter.replace(/"([^"]+)":/g, '$1:'))
            }
          }}>过滤</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}