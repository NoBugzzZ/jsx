import { useState, useEffect } from 'react';
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';
import './CustomAppBar.css'
import { navigate } from 'hookrouter';

const toolbar = [
  {
    "type": "submenu",
    "title": "财务",
    "key": "财务",
    "childs": [
      {
        "type": "submenu",
        "title": "收入",
        "key": "收入",
        "childs": [
          {
            "type": "menuitem",
            "title": "预存",
            "key": 1000
          },
          {
            "type": "menuitem",
            "title": "现金",
            "key": 1001
          },
          {
            "type": "menuitem",
            "title": "毛利",
            "key": 1002
          }
        ]
      },
      {
        "type": "submenu",
        "title": "支出",
        "key": "支出",
        "childs": [
          {
            "type": "menuitem",
            "title": "公司支出",
            "key": 1003
          },
          {
            "type": "menuitem",
            "title": "保证金",
            "key": 1004
          },
          {
            "type": "menuitem",
            "title": "现金工资",
            "key": 1005
          },
          {
            "type": "menuitem",
            "title": "行政管理费用",
            "key": 1006
          },
          {
            "type": "menuitem",
            "title": "客户支出",
            "key": 1007
          },
          {
            "type": "menuitem",
            "title": "销售支出",
            "key": 1008
          },
        ]
      }
    ]
  },
  {
    "type": "submenu",
    "title": "其他",
    "key": "其他",
    "childs": [
      {
        "type": "menuitem",
        "title": "发票",
        "key": 1009
      },
      {
        "type": "menuitem",
        "title": "回款",
        "key": 1010
      },
      {
        "type": "menuitem",
        "title": "销售人员",
        "key": 1011
      }
    ]
  }
]

const getMenu = (menu) => {
  var res=[]
  menu.forEach((value)=>{
    const {type,title,key}=value
    if(type==='submenu'){
      res.push(<SubMenu title={title} key={key}>{getMenu(value.childs)}</SubMenu>)
    }else if(type==='menuitem'){
      res.push(<MenuItem key={key}>{title}</MenuItem>)
    }
  })
  return res
}

export default function CustomAppBar() {

  const [menu, setMenu] = useState(null)

  useEffect(() => {
    setMenu(toolbar)
  }, [])

  return (
    <Menu
      triggerSubMenuAction='hover'
      mode='horizontal'
      openAnimation="slide-up"
      onClick={({ key }) => {
        if (key === 'homepage') {
          navigate('/')
        } else {
          navigate(`/datamodel/${key}`)
        }
      }}
    >
      <MenuItem key="homepage">首页</MenuItem>
      {menu ? getMenu(menu) : null}
      {/* <SubMenu title="财务" key="财务">
        <SubMenu title="收入" key="收入">
          <MenuItem key="1000">预存</MenuItem>
          <MenuItem key="1001">现金</MenuItem>
          <MenuItem key="1002">毛利</MenuItem>
          <MenuItem key="1003">发票</MenuItem>
        </SubMenu>
        <SubMenu title="支出" key="支出">
          <MenuItem key="1100">保证金</MenuItem>
          <MenuItem key="1101">现金工资</MenuItem>
          <MenuItem key="1102">公司支出</MenuItem>
          <MenuItem key="1103">行政管理费用</MenuItem>
        </SubMenu>
      </SubMenu>
      <SubMenu title="其他" key="其他">
        <MenuItem key="1000">发票</MenuItem>
        <MenuItem key="1000">回款</MenuItem>
      </SubMenu> */}
    </Menu>
  );
}