import React, { useEffect } from 'react';
import CustomAppBar from './components/CustomAppBar/CustomAppBar'
import Route from './Route'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { makeStyles } from "@mui/styles";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { navigate } from 'hookrouter';

const useStyle = makeStyles({
  login: {
    padding: '0px',
    backgroundColor: '#F3F5F7',
    height: '54px',
    borderBottom: '1px solid #d9d9d9',
    fontSize: '25px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

function Layout() {
  const classes = useStyle()
  const [loginFlag, setLoginFlag] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (auth) => {
    setAnchorEl(null);
    if (auth) {
      if (auth === 'logout') {
        window.sessionStorage.removeItem('auth')
        setLoginFlag('登录')
      } else {
        window.sessionStorage.setItem('auth', auth)
        setLoginFlag(auth)
      }
      navigate('/')
      window.location.reload()
    }
  };
  useEffect(() => {
    const currentAuth=window.sessionStorage.getItem('auth')
    console.log(currentAuth,typeof currentAuth)
    if(currentAuth){
      setLoginFlag(currentAuth)
    }else{
      setLoginFlag('登录')
    }
  }, [])

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={10}>
          <CustomAppBar />
        </Grid>
        <Grid item xs={2}>
          <div className={classes.login}>
            <Button
              id="basic-button"
              color="inherit"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {loginFlag}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => { handleClose() }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => { handleClose('saler') }}>saler</MenuItem>
              <MenuItem onClick={() => { handleClose('manager') }}>manager</MenuItem>
              <MenuItem onClick={() => { handleClose('logout') }}>退出</MenuItem>
            </Menu>
          </div>
        </Grid>
      </Grid>
      <Route />
    </div>
  )
}

export default Layout