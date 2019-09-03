import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Dashboard.css';

// Material UI Imports
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  table: {
    width: '50%',
    marginLeft: '25%'
  }
})


class Dashboard extends Component {

  render() {
    const {classes} = this.props;
    return (
      <>
        <h1 className="welcome">Welcome, {this.props.reduxStore.user.username}!</h1>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>PCN #</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Submitted</TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell>Filter: </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>000-000</TableCell>
              <TableCell>Needs Review</TableCell>
              <TableCell>08/27/2019</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>000-001</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>08/27/2019</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>000-002</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>08/27/2019</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
