var jref = require('json-ref-lite')

const resolveRef = (schema) => {
  // return jref.resolve(schema)
  if(schema.hasOwnProperty('$ref')){
    delete schema['$ref']
    schema['type']='link'
  }else{
    const {type}=schema
    if(type==='object'){
      for(var key in schema.properties){
        schema.properties[key]=resolveRef(schema.properties[key])
      }
    }else if(type==='array'){
      schema.items=resolveRef(schema.items)
    }else{

    }
  }
  return schema
}

const getReponse = (schemaProperties,resolvedSchemaProperties)=>{
  let response = ''
  for (let key in schemaProperties) {
    if(schemaProperties[key].hasOwnProperty('$ref')){
      const k=resolvedSchemaProperties[key].value==='id'?'_id':resolvedSchemaProperties[key].value
      response = response +key +'{\n  ' + k + '\n}\n'
    }else{
      if (schemaProperties[key].type == 'object') {
        response = response + key + '{\n' + getReponse(schemaProperties[key].properties) + '}'
      }else if(schemaProperties[key].type==='array'){
        // response = response + key + 
        if(schemaProperties[key].items.hasOwnProperty('$ref')){
          const k=resolvedSchemaProperties[key].items.value==='id'?'_id':resolvedSchemaProperties[key].items.value
          response = response +key +'{\n  ' + k + '\n}\n'
        }else{

        }
      }else{
        if(key==='id'){
          
        }else{
          response = response + key + '\n'
        }
      }
    }
  }
  return response
}

export { resolveRef, getReponse }