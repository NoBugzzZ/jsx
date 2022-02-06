import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

export default function (props) {
  const [label, setLabel] = React.useState('')
  const [value, setValue] = React.useState('');
  const [options, setOptions] = React.useState([])

  React.useEffect(() => {
    const { schema: { title }, label: name, value: formData } = props
    const newLabel = title ? title : (name ? name : '')
    setLabel(newLabel)
    const newValue = formData ? formData : ''
    setValue(newValue)
  }, [props])

  const handleOnFocus = () => {
    let localsession = window.localStorage.getItem("jsx-cache")
    localsession = localsession ? localsession : '[]'
    localsession = JSON.parse(localsession)
    setOptions(localsession)
  }

  const handleOnBlur = () => {
    if (value.length !== 0 && value) {
      let isExist = false
      for (let i = 0; i < options.length; i++) {
        if (options[i].label === value) {
          isExist = true
          break
        }
      }
      if (!isExist) {
        let newOption = options.map(e => ({ ...e }))
        newOption.push({ label: value })
        let localsession = JSON.stringify(newOption)
        window.localStorage.setItem("jsx-cache", localsession)
      }
    }
  }

  return (
    <Autocomplete
      id="combo-box"
      freeSolo={true}
      value={value}
      inputValue={value}
      onInputChange={(event, newInputValue) => {
        setValue(newInputValue);
        props.onChange(newInputValue)
      }}
      onFocus={(e) => {
        handleOnFocus()
      }}
      onBlur={(e) => [
        handleOnBlur()
      ]}
      options={options.map((option) => option.label)}
      renderInput={(params) => <TextField {...params} variant="standard" label={label} />}
    />
  )
}