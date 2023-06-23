import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import uuid from 'react-uuid';
import ReactTimeAgo from "react-time-ago";

const List = ({ products }) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 670 }} aria-label="simple table">
        <TableHead>
          <TableRow className="tableRow">
            <TableCell className="tableCell">מספר מזהה</TableCell>
            <TableCell className="tableCell">תמונה</TableCell>
            <TableCell className="tableCellUser">משתמש</TableCell>
            <TableCell className="tableCellDate">תאריך</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow key={uuid()}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.images[0]} alt="img" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell align="right" className="tableCell">
                {row.user.name}
              </TableCell>
              <TableCell align="right" className="tableCell">
                <ReactTimeAgo date={new Date(row.createdAt)} locale="he" />
              </TableCell>
              {row.status && <TableCell align="right" className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
