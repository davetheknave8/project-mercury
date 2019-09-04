import React, { Component } from 'react';
import { connect } from 'react-redux';

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


class DashboardListItem extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_DASHBOARD', payload: this.props.reduxStore.user.id })
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <TableRow align="center">
                    <TableCell className={classes.tableCell}>{this.props.item.id}</TableCell>
                    {/* <TableCell className={classes.tableCell}>{this.props.item.type}</TableCell> */}
                    <TableCell className={classes.tableCell}>{this.props.item.status}</TableCell>
                    <TableCell className={classes.tableCell}>{this.props.item.date}</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell className={classes.tableCell}>{this.props.user.number}</TableCell>
                    <TableCell className={classes.tableCell}>{this.props.user.type}</TableCell>
                    <TableCell className={classes.tableCell}>{this.props.user.status}</TableCell>
                    <TableCell className={classes.tableCell}>{this.props.user.date}</TableCell>
                </TableRow>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(mapStateToProps)(DashboardListItem));
