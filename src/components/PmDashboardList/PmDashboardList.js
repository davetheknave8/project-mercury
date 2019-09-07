import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PmDashboardList.css';
import moment from 'moment';

// Material UI Imports
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    table: {
        width: '50%',
        marginLeft: '25%'
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
        color: '#BF0000',
    },
    edit: {
        margin: theme.spacing.unit,
        fontSize: 32
    }
})


class PmDashboardList extends Component {

    handleClick = (event) => {
        this.props.history.push(`/${this.props.item.type}-view/${this.props.item.type}/${this.props.item.id}`);
    }

    deletePcn = () => {
        const data = {
            id: this.props.item.id,
            type: this.props.item.type,
            status: '',
            userId: this.props.reduxStore.user.id
        }
        this.props.dispatch({ type: 'DELETE_PCN', payload: data })
    }

    checkStatus = (item) => {
        const { classes } = this.props;
        let pcnInfo = this.props.reduxStore.pcnInfo;
        if (this.props.item.status === 'PUBLISHED') {
            return (<></>)
        }
        else {
            return (<><Button onClick={() => this.props.history.push(`/${this.props.item.type.toLowerCase()}-form/${this.props.item.id}`)}><EditIcon className={classes.edit} /></Button><Button onClick={() => this.deletePcn()}><DeleteForeverIcon className={classes.icon} /></Button></>)
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <TableRow className="tc" align="center">
                    <TableCell className={classes.tableCell} onClick={() => this.handleClick()}>{this.props.item.id}</TableCell>
                    <TableCell className={classes.tableCell} onClick={() => this.handleClick()}>{this.props.item.status}</TableCell>
                    <TableCell className={classes.tableCell} onClick={() => this.handleClick()}>{moment(this.props.item.date).format('MM/DD/YYYY')}</TableCell>
                    <TableCell className="column" className={classes.tableCell}>{this.checkStatus(this.props.item)}&nbsp;</TableCell>
                </TableRow>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(mapStateToProps)(PmDashboardList));
