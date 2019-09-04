import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';
import DashboardListItem from '../DashboardListItem/DashboardListItem';

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
    marginLeft: '25%',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: '2px',
    marginLeft: '25%'
  },
  tableCell: {
    color: 'white',
  }
})


class Dashboard extends Component {


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: this.props.reduxStore.user.id })
  }

  // // Change table row background color
  // changeColor = (user, index) => {
  //   if (this.props.reduxStore.user.id == user.id){
  //     return (<DashboardListItem key={user.id} user={user} />)
  //   } else{
  //     return (<></>);
  //   }
  // }
  // Change table row background color
  changeColor = (user, index) => {
    if (this.props.reduxStore.user.id == user.id) {
      return (<DashboardListItem key={user.id} user={user} />)
    } else {
      return (<></>);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <h1 className="welcome">Welcome, {this.props.reduxStore.user.username}!</h1>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className="filter">
              <TableCell>Filter: </TableCell>
              <TableCell><button>PENDING</button></TableCell>
              <TableCell><button>PUBLISHED</button></TableCell>
              <TableCell><button>ALL</button></TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Table className={classes.table}>
          <TableHead>
            <TableRow component="tr" scope="row" className="header">
              <TableCell className={classes.tableCell}>PCN#</TableCell>
              {/* <TableCell className={classes.tableCell}>Type</TableCell> */}
              <TableCell className={classes.tableCell}>Status</TableCell>
              <TableCell className={classes.tableCell}>Date</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxStore.getDashboard.map(item => <DashboardListItem key={item.id} item={item} />          
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
