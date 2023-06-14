import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import bikeImage  from '../../assets/images/bikeImage.png'
import profileImage  from '../../assets/images/profileImage.jpg'
import uuid from 'react-uuid';
import ReactTimeAgo from 'react-time-ago'
import './lastRentTable.scss';

const LastRentTable = (props) => {
  const status = props.status === 'reject' ? 
                <TableCell className='viewButtonReject' align="right">נדחה</TableCell> :
                props.status === 'approve' ?
                <TableCell className='viewButtonApprove' align="right">אושר</TableCell> :
                <TableCell className='viewButtonPending' align="right">..ממתין</TableCell>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >{props.name}</TableCell>
            <TableCell align="right">תאריך</TableCell>
            <TableCell align="right">סטטוס</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, i) => (
            <TableRow
              key={uuid()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {props.type === 'user' ? (
                <TableCell component="th" scope="row">
                {row?.productId?.details?.title}
                <img className='cellImg' src={row?.productId?.images[0] || bikeImage} alt='img' />
              </TableCell>
              ) : (
                <TableCell component="th" scope="row">
                {row?.fromUser?.name}
                <img className='cellImg' src={profileImage} alt='img' />
              </TableCell>
              )
              }
              <TableCell align="right">{<ReactTimeAgo date={new Date(row.createdAt)} locale="he"/>}</TableCell>
              {status}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LastRentTable;