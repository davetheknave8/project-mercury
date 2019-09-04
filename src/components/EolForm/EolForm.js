import React, {Component} from 'react';
import {connect} from 'react-redux';
import PartListItem from '../PartListItem/PartListItem';

//React Quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

//Material-UI
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import AddIcon from '@material-ui/icons/AddCircle';

const styles = theme => ({
    form: {
        width: '60%',
        margin: 'auto',
        marginTop: '5%',
        backgroundColor: '#3D3D5C',
        paddingBottom: '7%',
    },
    description: {
        margin: 'auto',
        marginTop: '3%',
        width: '80%',
        backgroundColor: 'white'
    },
    cell: {
        padding: 4,
        
    },
    table: {
        backgroundColor: 'white',
        width: '80%',
        margin: 'auto',
        marginBottom: '1%'
    },
    label: {
        color: 'white',
        marginLeft: '10%'
    },
    notesLabel: {
        color: 'white'
    },
    date: {
        marginLeft: '2%',
        backgroundColor: 'white'
    },
    number: {
        float: 'right',
        marginRight: '2%',
        backgroundColor: 'white',        
    },
    topElements: {
        backgroundColor: '#A3A8C2',
        marginRight: '10%',
        marginLeft: '10%',
        paddingTop: '3%',
        paddingBottom: '3%',
        marginBottom: '1%'
    },
    formHeader: {
        color: 'white',
        textAlign: 'center',
        paddingBottom: '5%',
        fontWeight: 'lighter',
        paddingTop: '3%'
    },
    notes: {
        backgroundColor: 'white',
        marginTop: '3%'
    },
    audience: {
        display: 'inline-block',
        marginRight: '10%',
        color: 'white',
        width: '35%',
        textAlign: 'left',
        marginLeft: '10%'
    },
    notesDiv: {
        float: 'left',
        width: '35%',
        marginLeft: '10%',
        display: 'inline-block'
    },
    userDiv: {
        marginTop: '5%',
        marginLeft: '25%', 
        marginRight: '25%',
        backgroundColor: 'white',
        padding: '2%'
    },
    userName: {
        marginLeft: '20%',
        width: '60%'
    },
    contactInfo: {
        marginLeft: '20%',
        marginTop: '5%',
        width: '60%'
    },
    userHeader: {
        marginTop: '0',
        fontWeight: 'lighter',
        textAlign: 'center',
        marginBottom: '5%'
    },
    submitBtn: {
        float: 'right',
        marginRight: '10%',
        marginTop: '2%'
    },
    audienceIn: {
        backgroundColor: 'white',
        width: '100%',
        marginTop: '2.5%',
    }
})

let length = 0;

class EolForm extends Component {
    state = {
        newEol: {
            date: 'yyyy-MM-dd',
            description: '<p></p>',
            lastTimeBuyDate: 'yyyy-MM-dd', // TODO add database 
            lastTimeShipDate: 'yyyy-MM-dd',
            //audience: '<p><p>',
        },
        newPart: {
            name: '',
            description: '',
            number: '',
            pcnNumber: this.props.match.params.id,
            replacementNumber: '',
        },
        descriptionLength: 2000
    }
    
    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_CURRENT_PARTS', payload: {pcnId: this.props.match.params.id}})
    }
    handleChange = (event, propToChange) => {
        console.log(propToChange);
        if(propToChange !== 'description' && propToChange !== 'notes' && propToChange !== 'audience'){
            this.setState({
                newEol: {
                    ...this.state.newEol, 
                    [propToChange]: event.target.value}
            })
        } else {
            this.setState({
                newEol: {
                    ...this.state.newEol, 
                    [propToChange]: event}
            })
            console.log(this.state);
        }
        let html = this.state.newEol.description;
        console.log(html);
        let div = document.createElement("div");
        div.innerHTML = html;
        console.log(div.innerText);
        length = div.innerText.length;
        this.setState({descriptionLength: 2000})
        this.setState({descriptionLength: this.state.descriptionLength -= length})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.newEol);
        this.props.dispatch({type: 'EDIT_PCN', payload: this.state.newEol});
    }
    // sends newpart with replacment number.
    handleSubmitPart = (event) => {
        console.log('submit part');
        this.props.dispatch({type: 'CREATE_PART', payload: this.state.newPart})
        this.setState({newPart: {name: '', number: '', description: '', replacementNumber: ''}})
    }

    handleChangePart = (event, propToChange) => {
        this.setState({newPart: {...this.state.newPart, [propToChange]: event.target.value}})
    }

    render(){
        const {classes} = this.props;
        return(
            <>
            <form className={classes.form} onSubmit={event => this.handleSubmit(event)}>
                <h1 className={classes.formHeader}>EOL Form</h1>
                <div className={classes.topElements}>
                    <TextField className={classes.date} type="date" label="Date:" onChange={event => this.handleChange(event, 'date')} InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <TextField className={classes.number} value='000-000' label="PCN #:" disabled />
                </div>
                <br />
                <label className={classes.label}>Description of Change: ({this.state.descriptionLength} characters remaining.)</label>
                <br />
                <ReactQuill className={classes.description}
                onChange={event => this.handleChange(event, 'description')}
                 />
                <br />
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Part Affected</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Replacement Part</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.reduxStore.currentPcnParts ? this.props.reduxStore.currentPcnParts.map(part => <PartListItem part={part} />) : <></>}
                        <TableRow>
                            <TableCell className={classes.cell}><TextField onChange={event => this.handleChangePart(event, 'number')} placeholder="Add Part #..." /></TableCell>
                            <TableCell className={classes.cell}><TextField  onChange={event => this.handleChangePart(event, 'name')} placeholder="Add Name..." /></TableCell>
                            <TableCell className={classes.cell}><TextField  onChange={event => this.handleChangePart(event, 'description')} placeholder="Add Description..." /></TableCell>
                            <TableCell className={classes.cell}><TextField  onChange={event => this.handleChangePart(event, 'replacementNumber')} placeholder="Add Replacement Part Number..."/></TableCell>
                            <TableCell className={classes.cell}><AddIcon style={{cursor: 'pointer'}} onClick={event => this.handleSubmitPart(event)} /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <div>
                    <div className={classes.notesDiv}>
                        <label className={classes.notesLabel}>Notes: </label>
                        <ReactQuill className={classes.notes}
                        onChange={event => this.handleChange(event, 'notes')} />
                    </div>
                    <div className={classes.audience}>
                        <label>Audience:</label>
                        <br />
                        <ReactQuill className={classes.audienceIn} placeholder="Add Audience..." onChange={(event) => this.handleChange(event, 'audience') } />                        
                    </div>
                </div>
                <br />
                <div className={classes.audience}>
                    <label className={classes.notesLabel}>EOL Dates</label>
                    <br/>
                    <TextField className={classes.date} type="date" label="Last Time Buy:" onChange={(event) => this.handleChange(event, 'lastTimeBuyDate')}  InputLabelProps={{
                        shrink: true,
                    }}/>
                    <TextField className={classes.date} type="date" label="Last Time Ship:" onChange={(event) => this.handleChange(event, 'lastTimeShipDate')}  InputLabelProps={{
                        shrink: true,
                    }}/>
                </div>
                <div className={classes.audience}>
                    
                </div>
                <div className={classes.userDiv}>
                    <h3 className={classes.userHeader}>Contact Info</h3>
                    <TextField className={classes.userName} value={this.props.reduxStore.user.username} label="Name" disabled />
                    <br />
                    <TextField className={classes.contactInfo} label="Email" value="placeholder email" disabled />
                </div>
                <br />
                <Button variant="contained" size="large" className={classes.submitBtn} type="submit">Submit</Button>
            </form>
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(EolForm));