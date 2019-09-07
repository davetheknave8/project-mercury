import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminDashboard.css';
import AdminDashboardList from '../AdminDashboardList/AdminDashboardList';
import Nav from '../Nav/Nav';

// Material UI Imports
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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
        color: 'white',
        marginTop: 0,
        textAlign: 'right',
        fontWeight: 'lighter',
        marginRight: '1%'
    },
})

class AdminDashboard extends Component {

    state = {
        status: 'empty'
    }

    componentDidMount() {
        const data = {
            // userId: this.props.reduxStore.user.id,
            status: ''
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data })
    }

    ifPending() {
        if(this.state.status == 'PENDING'){
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                backgroundColor: '#D6E4FF',
                fontSize: '10px'}} onClick={() => this.handlePending()}>Pending</Button>;
        } else {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px'}} onClick={() => this.handlePending()}>Pending</Button>;
        }
    }

    ifPublished() {
        if (this.state.status == 'PUBLISHED') {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#D6E4FF',
            }} onClick={() => this.handlePublished()}>Published</Button>;
        } else {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px'
            }} onClick={() => this.handlePublished()}>Published</Button>;
        }
    }

    ifIncomplete() {
        if (this.state.status == 'INCOMPLETE') {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#D6E4FF',
            }} onClick={() => this.handleIncomplete()}>Incomplete</Button>;
        } else {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px'
            }} onClick={() => this.handleIncomplete()}>Incomplete</Button>;
        }
    }

    ifDenied() {
        if (this.state.status == 'DENIED') {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#D6E4FF',
            }} onClick={() => this.handleDenied()}>Denied</Button>;
        } else {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px'
            }} onClick={() => this.handleDenied()}>Denied</Button>;
        }
    }

    ifAll() {
        if (this.state.status == '') {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
                backgroundColor: '#D6E4FF',
            }} onClick={() => this.handleAll()}>All</Button>;
        } else {
            return <Button size="small" variant="outlined" style={{
                textTransform: 'none',
                fontSize: '10px',
            }} onClick={() => this.handleAll()}>All</Button>;
        }
    }

    handlePending() {
        this.setState({status: 'PENDING'});
        const data = {
            // userId: this.props.reduxStore.user.id,
            status: 'PENDING'
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data });
    }

    handlePublished() {
        this.setState({ status: 'PUBLISHED' });
        const data = {
            // userId: this.props.reduxStore.user.id,
            status: 'PUBLISHED'
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data });
    }

    handleIncomplete() {
        this.setState({ status: 'INCOMPLETE' });
        const data = {
            // userId: this.props.reduxStore.user.id,
            status: 'INCOMPLETE'
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data });
    }

    handleDenied() {
        this.setState({ status: 'DENIED' });
        const data = {
            // userId: this.props.reduxStore.user.id,
            status: 'DENIED'
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data });
    }

    handleAll() {
        this.setState({ status: '' });
        const data = {
            // userId: this.props.reduxStore.user.id,
            status: ''
        }
        this.props.dispatch({ type: 'FETCH_ADMIN_DASHBOARD', payload: data });
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Nav history={this.props.history} />
                <div className={classes.welcome}>
                    <h4 className={classes.welcomeText}>Admin Dashboard</h4>
                </div>
                <p className="welcome">Filter: &nbsp;&nbsp;
                    <Button onClick={() => this.handlePending()}>{this.ifPending(this.props.status)}</Button>
                    &nbsp;
                    <Button onClick={() => this.handlePublished()}>{this.ifPublished(this.props.status)}</Button>
                    &nbsp;
                    <Button onClick={() => this.handleIncomplete()}>{this.ifIncomplete(this.props.status)}</Button>
                    &nbsp;
                    <Button onClick={() => this.handleDenied()}>{this.ifDenied(this.props.status)}</Button>
                    &nbsp;
                    <Button onClick={() => this.handleAll()}>{this.ifAll(this.props.status)}</Button>
                </p>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow component="tr" scope="row" className="header">
                            <TableCell className={classes.tableCell}>PCN - #</TableCell>
                            <TableCell className={classes.tableCell}>Status</TableCell>
                            <TableCell className={classes.tableCell}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.reduxStore.adminDashboard.map(item => <AdminDashboardList key={item.id} item={item} history={this.props.history} />
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

export default withStyles(styles)(connect(mapStateToProps)(AdminDashboard));
