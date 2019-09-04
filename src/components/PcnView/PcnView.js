import React, { Component } from 'react';
import { connect } from 'react-redux';
import PcnViewPart from '../PcnViewPart/PcnViewPart';

// Material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        margin: "auto",
    },
    table: {
        minWidth: 700,
        align: 'center',
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class PcnView extends Component {

    componentDidMount() {
        let data = {
            id: this.props.match.params.id,
            type: this.props.match.params.type
        };
        this.props.dispatch({ type: 'FETCH_PCN_INFO', payload: data });
        this.props.dispatch({ type: 'FETCH_PCN_PARTS', payload: data.id});
    }

    render() {
        const { classes } = this.props;
        return (
            <>
            <div className="pcnhead">
                <h2>Company Name Here</h2> 
                <h2>Product Change Notification</h2>
                <h2>{this.props.reduxStore.pcnInfo.id}</h2>
            </div>
            <div className="pcnaudience">
                <h3>Audience</h3>
                <p>{this.props.reduxStore.pcnInfo.audience}</p>
            </div>
            <div className="pcndate">
                <p>{this.props.reduxStore.pcnInfo.date}</p>
            </div>
            <div className="pcnbody">
                <h3>Description of Change</h3>
                <div className = "richbody" dangerouslySetInnerHTML={{
                    __html:
                    this.props.reduxStore.pcnInfo.change_description
                }}>
                </div>
                <div className="pcntable">
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow><CustomTableCell>Part Number</CustomTableCell><CustomTableCell>Part Name</CustomTableCell><CustomTableCell>Description</CustomTableCell></TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.reduxStore.pcnPart.map((part, i) => {
                                    return (<PcnViewPart key={i} part={part}/>);
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
                    <h3>Notes</h3>
                    <div className="richbody" dangerouslySetInnerHTML={{
                        __html:
                            this.props.reduxStore.pcnInfo.notes
                    }}>
                    </div>

            </div>

            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(withStyles(styles)(PcnView));
