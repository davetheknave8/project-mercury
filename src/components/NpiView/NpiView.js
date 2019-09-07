import React, { Component } from 'react';
import { connect } from 'react-redux';
import PcnViewPart from '../PcnViewPart/PcnViewPart';
import Nav from '../Nav/Nav';
import Moment from 'moment';

// Material UI
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

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#c9cbd1',
        color: 'black',
    },
    body: {
        fontSize: 12,
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
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        margin: "auto",
        border: '1px solid black',
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
        padding: '10px',
    },
    pcndate: {
        
    },
    pcnbackground: {
        backgroundColor: '#f5f5f5',
    },
    pcnform: {
        width: '50%',
        margin: 'auto',
        fontSize: '.765em',
    },
    pcndescription: {
        backgroundColor: 'white',
        margin: 'auto',
        border: '1px solid black',
        padding: '10px',
        textAlign: 'justify',
    },
    richbody: {
        textAlign: 'justify',
    },
    audiencerichbody: {
        textAlign: 'center',
    },
    images: {
        paddingTop: '20px',
        paddingBottom: '20px',
        width: '100%',
        margin: 'auto',
        textAlign: 'center',
    },
    image: {
        border: '1px solid black',
        marginRight: '15px',
        height: '200px',
        cursor: 'pointer',
        objectFit: 'cover',
    },
    pcnbuttons: {
        width: '100%',
        margin: 'auto',
        textAlign: 'right',
    },
    cell: {
        borderBottom: '1px solid black',
    },
    leftrightbottom: {
        borderLeft: '1px solid black',
        borderRight: '1px solid black',
        borderBottom: '1px solid black',
    },
});

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        textAlign: 'center',
    };

}

function getImageModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        textAlign: 'center',
        width: 'auto',
        height: 'auto',
    };

}

class NpiView extends Component {

    state = {
        open: false,
        message: '',
        openImage: false,
        image: '',
        alt: '',
    };

    componentDidMount() {
        let data = {
            id: this.props.match.params.id,
            type: this.props.match.params.type
        };
        this.props.dispatch({ type: 'FETCH_PCN_INFO', payload: data });
        this.props.dispatch({ type: 'FETCH_PCN_PARTS', payload: data });
        this.props.dispatch({ type: 'FETCH_PCN_IMAGES', payload: data });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleOpenImage = (imageURL, imageAlt) => {
        this.setState({ image: imageURL });
        this.setState({ alt: imageAlt });
        this.setState({ openImage: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCloseImage = () => {
        this.setState({ openImage: false });
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
                return <Button size='small' variant='contained' className={classes.button} color='secondary' onClick={() => this.props.history.push(`/pcn-form/${pcnInfo.id}`)}>Edit</Button>
            }
        }
        else if( this.props.reduxStore.user.admin === 2 ){
            if( pcnInfo.status === 'PENDING' ){
                return (
                    <>
                    <Button size='small' variant='contained' className={classes.button} color='primary' onClick={() => this.reviewPCN('PUBLISHED')}>Approve</Button>
                    <Button size='small' variant='contained' className={classes.button} color='secondary' onClick={this.handleOpen}>Deny</Button>
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
                        <p>{Moment(this.props.reduxStore.pcnInfo.date).format('MM/DD/YYYY')}</p>
                    </div>
                    </div>
                        <div className={classes.pcnaudience}>
                        <h4>Audience</h4>
                            <div className={classes.audiencerichbody} dangerouslySetInnerHTML={{
                                __html:
                                    this.props.reduxStore.pcnInfo.audience
                            }}>
                        </div>
                    </div>
                    <h4>Description of Change</h4>
                    <div className={classes.richbody}>
                        <div className={classes.pcndescription}dangerouslySetInnerHTML={{
                            __html:
                            this.props.reduxStore.pcnInfo.change_description
                        }}>
                        </div>
                        <div className="pcntable">
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow><CustomTableCell>Part Number</CustomTableCell><CustomTableCell className={classes.leftrightbottom}>Part Name</CustomTableCell><CustomTableCell>Description</CustomTableCell></TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.reduxStore.pcnPart.map((part, i) => {
                                            return (<PcnViewPart key={i} part={part}/>);
                                        })}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                            <h4>Notes</h4>
                            <div className={classes.richbody} dangerouslySetInnerHTML={{
                                __html:
                                    this.props.reduxStore.pcnInfo.notes
                            }}>
                            </div>
                    </div>
                    <div className={classes.images}>
                            {this.props.reduxStore.pcnImage.map((image, i) => {
                                return (<img className={classes.image} src={image.image_url} alt={image.figure} key={i} onClick={() => this.handleOpenImage(image.image_url, image.figure)}></img>);
                            })}
                    </div>
                    <div className={classes.pcnbuttons}>
                        <Button variant='contained' size='small' className={classes.button} onClick={() => this.props.history.push('/dashboard')}>Home</Button>
                        {this.renderButton()}

                        <Modal
                            aria-labelledby="Deny PCN"
                            aria-describedby="Modal to input a reason for denying PCN"
                            open={this.state.open}
                            onClose={this.handleClose}
                            >
                            <div style={getModalStyle()} className={classes.paper}>
                                <Typography variant="h6" id="modal-title">Notes</Typography>
                                <textarea value={this.state.message} onChange={(event) => this.handleChangeFor(event, 'message')} rows='4' cols='50'></textarea>
                                <br/>
                                <Button size='small' color='secondary' onClick={() => this.reviewPCN('DENIED')}>Deny</Button>
                                <Button size='small' onClick={() => this.handleClose()}>Return</Button>
                            </div>
                        </Modal>

                        <Modal
                            aria-labelledby="View image"
                            aria-describedby="Modal to view image in full size"
                            open={this.state.openImage}
                            onClose={this.handleCloseImage}
                            >
                            <div style={getImageModalStyle()} className={classes.paper}>
                                <img src={this.state.image} alt={this.state.alt}></img>
                                <p>{this.state.alt}</p>
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

export default connect(mapStateToProps)(withStyles(styles)(NpiView));
