import { useState, useEffect } from 'react';
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';
import './CustomAppBar.css'
import { navigate } from 'hookrouter';
import { DataModelReq } from '../../requests';

var _ = require('lodash')

const toolbar = [
  {
    "type": "submenu",
    "title": "模型管理",
    "key": "模型管理",
    "childs": [
      {
        "type": "menuitem",
        "title": "数据模型",
        "key": "datamodellist",
        "page": "datamodellist"
      },
      {
        "type": "menuitem",
        "title": "流程模型",
        "key": "flowmodellist",
        "page": "flowmodellist"
      }
    ]
  },
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
        ]
      },
      {
        "type": "submenu",
        "title": "支出",
        "key": "支出",
        "childs": [
          {
            "type": "menuitem",
            "title": "行政管理支出",
            "key": "AdminFee",
            "page": "datamodel",
            "set":"AdminFeeSet"
          },
          {
            "type": "menuitem",
            "title": "总经办支出",
            "key": "ManageFee",
            "page": "datamodel",
            "set": "ManageFeeSet"
          },
          {
            "type": "menuitem",
            "title": "销售支出",
            "key": "SalerExpense",
            "page": "datamodel",
            "set":"SalerExpenseSet"
          },
        ]
      }
    ]
  },
  {
    "type": "menuitem",
    "title": "预存",
    "key": "Prestore",
    "page": "datamodel",
    "set":"PrestoreSet"
  },
  {
    "type": "menuitem",
    "title": "投标保证金",
    "key": "Bidbond",
    "page": "datamodel",
    "set": "BidbondSet"
  },
  {
    "type": "submenu",
    "title": "现金",
    "key": "现金",
    "childs": [
      {
        "type": "menuitem",
        "title": "现金收入",
        "key": "CashIncome",
        "page": "datamodel",
        "set":"CashIncomeSet"
      },
      {
        "type": "menuitem",
        "title": "现金支出",
        "key": "CashExpense",
        "page": "datamodel",
        "set":"CashExpenseSet"
      },
    ]
  },
  {
    "type": "menuitem",
    "title": "未确认款项",
    "key": "Unack",
    "page": "datamodel",
    "set":"UnackSet"
  }
]

const getAllDataModelMenuitem = (jsonData, path) => {
  let res = []
  jsonData.forEach((value, index) => {
    const { type, title, key } = value
    if (type === 'submenu') {
      let childs = getAllDataModelMenuitem(value.childs, [...path, index])
      res = [...res, ...childs]
    } else if (type === 'menuitem') {
      const { page,set } = value
      if (page === "datamodel") {
        res.push({
          path: [...path, index],
          title,
          key,
          set
        })
      }
    }
  })
  return res
}

const findPos = (auth, jsonData, path, index) => {
  if (path.length - 1 > index) {
    findPos(auth, jsonData[path[index]].childs, path, index + 1)
  } else if (path.length - 1 === index) {
    jsonData[path[index]] = { ...jsonData[path[index]], auth }
  }
}

const getMenu = (menu) => {
  var res = []
  menu.forEach((value, index) => {
    const { type, title, key } = value
    if (type === 'submenu') {
      res.push(<SubMenu title={title} key={key}>{getMenu(value.childs)}</SubMenu>)
    } else if (type === 'menuitem') {
      const { page, auth } = value
      if (page === "datamodel") {
        if (auth === true) {
          res.push(<MenuItem key={key} page={page ? page : ''}>{title}</MenuItem>)
        }
      } else {
        res.push(<MenuItem key={key} page={page ? page : ''}>{title}</MenuItem>)
      }
    }
  })
  return res
}

export default function CustomAppBar() {

  const [toolbarForAuth, setToolbarForAuth] = useState(toolbar)
  const [menu, setMenu] = useState(null)

  useEffect(() => {
    setMenu(getMenu(toolbarForAuth))
  }, [toolbarForAuth])

  useEffect(() => {
    const menuitems = getAllDataModelMenuitem(toolbar, [])
    const currentAuth=window.sessionStorage.getItem('auth')
    menuitems.forEach((menuitem) => {
      DataModelReq.isAccess(menuitem.set, currentAuth).then(data => {
        setToolbarForAuth(prev => {
          let newToolbarForAuth = _.cloneDeep(prev)
          findPos(data, newToolbarForAuth, menuitem.path, 0)
          return newToolbarForAuth
        })
      })
    })
  }, [])

  return (
    <Menu
      triggerSubMenuAction='hover'
      mode='horizontal'
      openAnimation="slide-up"
      onClick={(ctx) => {
        const { key, item: { props: { page } } } = ctx
        if (page === "datamodel") {
          navigate(`/datamodel/${key}`)
        } else {
          navigate(`/${page}`)
        }
      }}
    >
      <MenuItem key="homepage" page="">首页</MenuItem>
      {menu}
    </Menu>
  );
}