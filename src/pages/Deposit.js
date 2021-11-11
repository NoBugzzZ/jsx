import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function Deposit() {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell align="center">项目</TableCell>
          <TableCell align="center">日期</TableCell>
          <TableCell align="center">发票号码/单号</TableCell>
          <TableCell align="center">销售人员</TableCell>
          <TableCell align="center">金额</TableCell>
          <TableCell align="center">联系人</TableCell>
          <TableCell align="center">备注</TableCell>
          <TableCell align="center">客户</TableCell>
          <TableCell align="center">操作</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

      </TableBody>
    </Table>
  )
}