import React, { Component } from 'react';
import { connect } from 'react-redux';
import PcnViewPart from '../PcnViewPart/PcnViewPart';
import Nav from '../Nav/Nav';

// Material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';

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
        width: '60%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        margin: "auto",
    },
    table: {
        margin: 'auto',
        align: 'center',
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    pcnheader: {
        margin: 'auto',
        textAlign: 'center',
    },
    pcnaudience: {
        backgroundColor: 'white',
        width: '40%',
        margin: 'auto',
        textAlign: 'center',
        padding: '1px',
    },
    pcndate: {
        
    },
    pcnbackground: {
        backgroundColor: '#f5f5f5',
    },
    pcnform: {
        width: '70%',
        margin: 'auto',
    }
});

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class PcnView extends Component {

    state = {
        open: false,
        message: '',
    };

    componentDidMount() {
        let data = {
            id: this.props.match.params.id,
            type: this.props.match.params.type
        };
        this.props.dispatch({ type: 'FETCH_PCN_INFO', payload: data });
        this.props.dispatch({ type: 'FETCH_PCN_PARTS', payload: data.id});
    }

    handleOpen = () => {
        console.log('handleOpen')
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChangeFor = (event, propToChange) => {
        this.setState({
            [propToChange]: event.target.value
        })
    }

    reviewPCN = (action) => {
        const data = {
            id: this.props.reduxStore.pcnInfo.id,
            status: action,
            message: this.state.message,
        }
        this.props.dispatch({ type: 'REVIEW_PCN', payload: data });
        this.handleClose();
        this.props.history.push('/dashboard');
    }

    renderButton = () => {
        const { classes } = this.props;
        let pcnInfo = this.props.reduxStore.pcnInfo;
        if( this.props.reduxStore.user.admin === 1 ){
            if( pcnInfo.status === 'INCOMPLETE' || pcnInfo.status === 'PENDING' || pcnInfo.status === 'DENIED'){
                return <Button variant='contained' className={classes.button} color='secondary' onClick={() => this.props.history.push(`/pcn-form/${pcnInfo.id}`)}>Edit</Button>
            }
        }
        else if( this.props.reduxStore.user.admin === 2 ){
            if( pcnInfo.status === 'PENDING' ){
                return (
                    <>
                    <Button variant='contained' className={classes.button} color='primary' onClick={() => this.reviewPCN('PUBLISHED')}>Approve</Button>
                    <Button variant='contained' className={classes.button} color='secondary' onClick={this.handleOpen}>Deny</Button>
                    </>
                )
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <>
            <div className={classes.pcnbackground}>
            <Nav history={this.props.history} />
                <div className={classes.pcnform}>
                        <div className={classes.pcnheader}>
                        {/* <h2>Company Name Here</h2> 
                        <h2>Product Change Notification</h2> */}
                        <h2>{this.props.reduxStore.pcnInfo.id}</h2>
                    <div className={classes.pcndate}>
                        <p>{this.props.reduxStore.pcnInfo.date}</p>
                    </div>
                    </div>
                        <div className={classes.pcnaudience}>
                        <h4>Audience</h4>
                        <p>{this.props.reduxStore.pcnInfo.audience}</p>
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
                    <div className="pcnbuttons">
                        <Button variant='contained' className={classes.button} onClick={() => this.props.history.push('/dashboard')}>Home</Button>
                        {this.renderButton()}
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}
                            >
                            <div style={getModalStyle()} className={classes.paper}>
                                <Typography variant="h6" id="modal-title">Notes</Typography>
                                <textarea value={this.state.message} onChange={(event) => this.handleChangeFor(event, 'message')} rows='4' cols='50'></textarea>
                                <br/>
                                <Button color='secondary' onClick={() => this.reviewPCN('DENIED')}>Deny</Button>
                                <Button onClick={() => this.handleClose()}>Return</Button>
                            </div>
                        </Modal>
                    </div>
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
