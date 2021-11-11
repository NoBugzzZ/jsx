import React from 'react';
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';
import './CustomAppBar.css'
import { navigate } from 'hookrouter';

export default function CustomAppBar() {

  return (
    <Menu
      triggerSubMenuAction='hover'
      mode='horizontal'
      openAnimation="slide-up"
      onClick={({key}) => { navigate(`/datamodel/${key}`)}}
    // onOpenChange={(value) => { console.log('onOpenChange', value) }}
    >
      <SubMenu title="财务" key="财务">
        <SubMenu title="收入" key="收入">
          <MenuItem key="1000">预存</MenuItem>
          <MenuItem key="1001">现金</MenuItem>
          <MenuItem key="1002">毛利</MenuItem>
          <MenuItem key="1003">发票</MenuItem>
          {/* <MenuItem key="1004">回款</MenuItem> */}
        </SubMenu>
        <SubMenu title="支出" key="支出">
          <MenuItem key="1100">保证金</MenuItem>
          <MenuItem key="1101">现金工资</MenuItem>
          <MenuItem key="1102">公司支出</MenuItem>
          <MenuItem key="1103">行政管理费用</MenuItem>
        </SubMenu>
      </SubMenu>
      {/* <SubMenu title="财务" key="财务">
        <SubMenu title="收入" key="收入">
          <MenuItem key="deposit">预存</MenuItem>
          <MenuItem key="cash">现金</MenuItem>
          <MenuItem key="grossprofit">毛利</MenuItem>
          <MenuItem key="bill">发票</MenuItem>
          <MenuItem key="refund">回款</MenuItem>
        </SubMenu>
        <SubMenu title="支出" key="支出">
          <MenuItem key="margin">保证金</MenuItem>
          <MenuItem key="salary">现金工资</MenuItem>
          <MenuItem key="expenditure">公司支出</MenuItem>
          <MenuItem key="administration">行政管理费用</MenuItem>
        </SubMenu>
      </SubMenu> */}
    </Menu>
  );
}