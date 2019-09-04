import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PmDashboard.css';
import PmDashboardList from '../PmDashboardList/PmDashboardList';

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
    margin: 'auto',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: '2px',
  },
  tableCell: {
    color: 'white',
  }
})


class Dashboard extends Component {


  componentDidMount() {
    const data = {
      userId: this.props.reduxStore.user.id,
      status: ''
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data })
  }

  // // Change table row background color
  // changeColor = (user, index) => {
  //   if (this.props.reduxStore.user.id == user.id){
  //     return (<DashboardListItem key={user.id} user={user} />)
  //   } else{
  //     return (<></>);
  //   }
  // }

  handlePublished() {
    console.log('handlePublished');
    //this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: this.props.reduxStore.user.id });
  }

  handlePending() {
    console.log('handlePending');
    //this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: this.props.reduxStore.user.id });
  }

  handleInProgress() {
    console.log('handleInProgress');
    //this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: this.props.reduxStore.user.id });
  }

  handleDenied() {
    console.log('handleDenied', this.props.reduxStore.item);
    const data = {
      userId: this.props.reduxStore.user.id,
      status: 'denied'
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }

  handleAll() {
    console.log('handleAll', this.props.reduxStore.user.id);
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: this.props.reduxStore.user.id });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <h1 className="welcome">Welcome, {this.props.reduxStore.user.username}!</h1>
        <p className="welcome">Filter: &nbsp;&nbsp;<button onClick={() => this.handlePublished()}>Published</button>&nbsp;&nbsp;&nbsp;<button onClick={() => this.handlePending()}>Pending</button>&nbsp;&nbsp;&nbsp;<button onClick={() => this.handleInProgress()}>In Progress</button>&nbsp;&nbsp;&nbsp;<button onClick={() => this.handleDenied()}>Denied</button>&nbsp;&nbsp;&nbsp;<button onClick={() => this.handleAll()}>All</button></p>
        <Table className={classes.table}>
          <TableHead>
            <TableRow component="tr" scope="row" className="header">
              <TableCell className={classes.tableCell}>PCN#</TableCell>
              {/* <TableCell className={classes.tableCell}>Type</TableCell> */}
              <TableCell className={classes.tableCell}>Status</TableCell>
              <TableCell className={classes.tableCell}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxStore.getDashboard.map(item => <PmDashboardList key={item.id} item={item} />
            )}
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
