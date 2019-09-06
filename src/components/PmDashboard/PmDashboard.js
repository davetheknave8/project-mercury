import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PmDashboard.css';
import PmDashboardList from '../PmDashboardList/PmDashboardList';
import Nav from '../Nav/Nav';

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
  },
  welcome: {
    backgroundColor: '#666F99',
    marginTop: 0
  },
  welcomeText: {
    marginTop: 0,
    color: 'white',
    textAlign: 'right',
    fontWeight: 'lighter',
    marginRight: '1%'
  }
})


class PmDashboard extends Component {


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

  handlePending() {
    const data = {
      userId: this.props.reduxStore.user.id,
      status: 'PENDING'
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }

  handlePublished() {
    const data = {
      userId: this.props.reduxStore.user.id,
      status: 'PUBLISHED'
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }

  handleIncomplete() {
    const data = {
      userId: this.props.reduxStore.user.id,
      status: 'INCOMPLETE'
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }

  handleDenied() {
    const data = {
      userId: this.props.reduxStore.user.id,
      status: 'DENIED'
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }

  handleAll() {
    const data = {
      userId: this.props.reduxStore.user.id,
      status: ''
    }
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: data });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Nav history={this.props.history} />
        <div className={classes.welcome}>
          <h4 className={classes.welcomeText}>Product Manager Dashboard</h4>
        </div>
        <p className="welcome">Filter: &nbsp;&nbsp;
          <button onClick={() => this.handlePending()}>Pending</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => this.handlePublished()}>Published</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => this.handleIncomplete()}>Incomplete</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => this.handleDenied()}>Denied</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => this.handleAll()}>All</button>
        </p>
        <Table className={classes.table}>
          <TableHead>
            <TableRow component="tr" scope="row" className="header">
              <TableCell className={classes.tableCell}>PCN - #</TableCell>
              {/* <TableCell className={classes.tableCell}>Type</TableCell> */}
              <TableCell className={classes.tableCell}>Status</TableCell>
              <TableCell className={classes.tableCell}>Date</TableCell>
              <TableCell className={classes.tableCell}>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxStore.pmDashboard.map(item => <PmDashboardList key={item.id} item={item} history={this.props.history} />
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

export default withStyles(styles)(connect(mapStateToProps)(PmDashboard));
