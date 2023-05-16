import Table from '@mui/joy/Table';
import {Sheet} from "@mui/joy";

// TODO see if we can change this to Grid
function ResultTable({records}) {
  return (<Sheet sx={{height: 400, overflow: 'auto'}}>
    <Table aria-label="basic table" stickyHeader>
      <thead>
      <tr>
        {columns.map(c => <th key={c.field}>{c.headerName}</th>)}
      </tr>
      </thead>
      <tbody>
      {records.map(record => <tr>
        {columns.map(c => <td>{record[c.field]}</td>)}
      </tr>)}
      </tbody>
    </Table>
  </Sheet>)
}

const columns = [
  {
    field: 'Employee File Number',
    headerName: 'Employee File Number',
  },
  {
    field: 'Projected Date',
    headerName: 'Projected Date',
  },
  {
    field: 'Destination Ship',
    headerName: 'Destionation Ship',
  },
  {
    field: 'Employee Name',
    headerName: 'Employee Name',
  },
  {
    field: 'Travel Date',
    headerName: 'Travel Date',
  },
  {
    field: 'From',
    headerName: 'Flying From',
  },
  {
    field: 'To',
    headerName: 'Flying To',
  },
  {
    field: 'Predicted Cost',
    headerName: 'Predicted Cost',
  },
  {
    field: 'Actual Cost',
    headerName: 'Actual Cost',
  }
];

export default ResultTable;
