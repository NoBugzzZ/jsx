import React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useEffect, useState } from "react";
// import { LinkReq } from "../../requests";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function (props) {
  const classes = useStyles();

  const [value, setValue] = React.useState('');
  // const [sourceData, setSourceData] = useState([])
  const [source, setSource] = useState('')
  const [key, setKey] = useState('')
  const [label, setLabel] = useState('')
  const [menuItems, setMenuItems] = useState([])

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value)
  };

  useEffect(() => {
    const { schema: { title, source, key }, label: name,value: formData } = props
    const label = title ? title : (name ? name : '')
    // const newValue = `${formData}` ? `${formData}` : ''
    setValue(formData)
    setKey(key)
    setLabel(label)
    setSource(source)
  }, [])

  useEffect(() => {
    if (source) {
      axios.request({
        url: source,
        method: 'get',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(({ data }) => {
        // setSourceData(data)
        setMenuItems(data.map(s => {
          return <MenuItem key={s[key]} value={s[key]}>{s[key]}</MenuItem>
        }))
      })
    }
  }, [source])

  // useEffect(() => {
  //   if (menuItems.length > 0) {
  //     const { value: formData } = props
  //     const newValue = formData ? formData : ''
  //     setValue(newValue)
  //   }
  // }, [menuItems])
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {menuItems}
        </Select>
      </FormControl>
    </>
  )
}