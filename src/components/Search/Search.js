import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchListItem from '../SearchListItem/SearchListItem'

//Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
//table cells information
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Nav from '../Nav/Nav'
import './Search.css';

const styles = {
    title: {
        margin: 'auto',
        textAlign: 'center',
    },
    root: {
        
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '35%',
    },
    header: {
        width: '80%',
        margin: 'auto',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '2px',
    },
    table: {
        overflow:'auto',
        height: '500px',
        borderWidth: '50px'
    },
    input: {
        marginLeft: 8,
        display: 'center',
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    tableCell1: {
        color: 'white',
        textAlign: 'left',
        width: '15%',
    },
    tableCell2: {
        color: 'white',
        textAlign: 'left',
        width: '10%',
    },
    tableCell3: {
        color: 'white',
        textAlign: 'left',
        width: '25%',
    },
    tableCell4: {
        color: 'white',
        textAlign: 'left',
        width: '50%',
    },
};

class Search extends Component {

    // grabs the pcn list of docs from the database
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PCN_LIST' });
    }
    //takes the search string and dispatches the request.
    handleChange = (event) => {
        this.props.dispatch({ type: 'GET_SEARCH', payload: event.target.value })
    };
    
    render() {

        const { classes } = this.props;

        return (
            <>
                <Nav history={this.props.history} />
                <h1 className={classes.title}>&nbsp;</h1>
                <h1 className={classes.title}>&nbsp;</h1>
                <Paper className={classes.root} elevation={1}>
                    <IconButton className={classes.iconButton} aria-label="Menu">
                    </IconButton>
                    <InputBase className={classes.input} placeholder="Search for PCN by #" onChange={(event) => this.handleChange(event)} />
                    <IconButton className={classes.iconButton} aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <h1 className={classes.title}>&nbsp;</h1>
                <div className={classes.table}>
                <Table className={classes.header}>
                    <TableHead>
                        <TableRow component="tr" scope="row" className="header">
                            <TableCell className={classes.tableCell1}>PCN - #</TableCell>
                            <TableCell className={classes.tableCell2}>Type</TableCell>
                            <TableCell className={classes.tableCell3}>Date</TableCell>
                            <TableCell className={classes.tableCell4}>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tBody}>
                        {this.props.reduxStore.getPcn.map(item =>
                            <SearchListItem key={item.id} item={item} history={this.props.history} />)}
                    </TableBody>
                </Table>
                </div>
            </>
        )
    }
}


const mapStateToProps = reduxStore => ({
    reduxStore
});

export default withStyles(styles)(connect(mapStateToProps)(Search));