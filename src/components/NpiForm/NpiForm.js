import React, {Component} from 'react';
import {connect} from 'react-redux';
import PartListItem from '../PartListItem/PartListItem';
import Nav from '../Nav/Nav';
import SearchPartListItem from '../SearchPartListItem/SearchPartListItem';

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
import List from '@material-ui/core/List';

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
    },
    label: {
        color: 'white',
        marginLeft: '10%'
    },
    product: {
        textAlign:'center',
        marginLeft: '9%',
        width: '40%',
        backgroundColor: 'white'
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
        // backgroundColor: '#A3A8C2',
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
        marginTop: '3%',
    },
    audience: {
        display: 'block',
        width: '60%',
        textAlign: 'left',
        marginLeft: '20%',
        marginTop: '3%',
    },
    audienceLabel: {
        color: 'white'
    },
    notesDiv: {
        width: '60%',
        marginLeft: '20%',
        display: 'block',
        marginTop: '3%',
        
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
    }
})

let length = 0;

class NpiForm extends Component {
    state = {
        newNpi: {
            date: '',
            product:'',
            description: '',
            number: '',
            audience: '',
            type: 'npi',
            notes: ''
        },
        newPart: {
            name: '',
            description: '',
            number: '',
            npiNumber: this.props.match.params.id,
            type: 'npi'
        },
        searching: false,
        descriptionLength: 2000,
        description: ''
    }

    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_CURRENT_PARTS', payload: {id: this.props.match.params.id, type: 'npi'}})
        this.props.dispatch({type: 'FETCH_CURRENT_NPI', payload: this.props.match.params.id})
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.reduxStore.currentNpiReducer !== this.props.reduxStore.currentNpiReducer){
            this.setState({
                newNpi: {
                    date: this.props.reduxStore.currentNpiReducer.date,
                    description: this.props.reduxStore.currentNpiReducer.description,
                    number: this.props.reduxStore.currentNpiReducer.id,
                    audience: this.props.reduxStore.currentNpiReducer.audience,
                    type: 'NPI',
                    notes: this.props.reduxStore.currentNpiReducer.notes} 
                })
        }
    }

    handleChange = (event, propToChange) => {
        console.log(propToChange);
        if(propToChange !== 'description' && propToChange !== 'notes' && propToChange !== 'audience'){
            this.setState({newNpi: {...this.state.newNpi, [propToChange]: event.target.value}})
        } else {
            this.setState({newNpi: {...this.state.newNpi, [propToChange]: event}})
            console.log(this.state);
        }
        let html = this.state.newNpi.description;
        console.log(html);
        let div = document.createElement("div");
        div.innerHTML = html;
        console.log(div.innerText);
        length = div.innerText.length;
        this.setState({descriptionLength: 2000})
        this.setState({descriptionLength: this.state.descriptionLength - length})
    }

    handleSubmit = (event) => {
        let data = {
            id: this.props.reduxStore.user.id,
            newNpi: this.state.newNpi
        }
        event.preventDefault();
        console.log(this.state.newNpi);
        this.props.dispatch({type: 'EDIT_NPI', payload: data});
        this.props.history.push('/dashboard');
    }

    handleSubmitPart = (event) => {
        console.log('submit part');
        this.props.dispatch({type: 'CREATE_PART', payload: this.state.newPart})
        this.setState({newPart: {name: '', number: '', description: ''}})
    }

    handleChangePart = (event, propToChange) => {
        this.setState({newPart: {...this.state.newPart, [propToChange]: event.target.value}})
    }

    handleSearchPartChange = (event) => {
        console.log(event.target.value.length)
        if(event.target.value.length < 2){
            this.setState({searching: false})
        } else{
            this.setState({searching: true})
        }
        console.log(this.state.searching);
        this.props.dispatch({type: 'SEARCH_PARTS', payload: {query: event.target.value}})
    }

    render(){
        const {classes} = this.props;
        console.log(this.props.reduxStore.currentNpiReducer.description)
        console.log('this.state.newNpi.product', this.state.newNpi.product);
        return(
            <>
            <Nav history={this.props.history} />
            <form className={classes.form} onSubmit={event => this.handleSubmit(event)}>
                <h1 className={classes.formHeader}>NPI Form</h1>
                <div className={classes.topElements}>
                    <TextField className={classes.date} value={this.state.newNpi.date} type="date" label="Date:" onChange={event => this.handleChange(event, 'date')} InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <TextField className={classes.product} value={this.state.newNpi.product} label="Product Name" onChange={event => this.handleChange(event, 'product')} />
                    <TextField className={classes.number} value={this.props.match.params.id} label="NPI #:" disabled />
                </div>
                <br />
                <label className={classes.label}>Description: ({this.state.descriptionLength} characters remaining.)</label>
                <br />
                <ReactQuill className={classes.description}
                onChange={event => this.handleChange(event, 'description')}
                value={this.state.newNpi.description || ''}
                 />
                <br />
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Part Affected</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TextField variant="outlined" label="Search Part #'s" onChange={event => this.handleSearchPartChange(event)} />
                        </TableRow>
                        <List>
                            {this.state.searching ? this.props.reduxStore.searchPartReducer.map(part => <SearchPartListItem type='NPI' npiNumber={this.props.match.params.id} part={part} />) : <></> }
                        </List>
                        {this.props.reduxStore.currentPartsReducer ? this.props.reduxStore.currentPartsReducer.map(part => <PartListItem part={part} />) : <></>}
                        <TableRow>
                            <TableCell className={classes.cell}><TextField value={this.state.newPart.number} onChange={event => this.handleChangePart(event, 'number')} placeholder="Add Part #..." /></TableCell>
                            <TableCell className={classes.cell}><TextField value={this.state.newPart.name} onChange={event => this.handleChangePart(event, 'name')} placeholder="Add Name..." /></TableCell>
                            <TableCell className={classes.cell}><TextField value={this.state.newPart.description} onChange={event => this.handleChangePart(event, 'description')} placeholder="Add Description..." /></TableCell>
                            <TableCell className={classes.cell}><AddIcon style={{cursor: 'pointer'}} onClick={event => this.handleSubmitPart(event)} /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <div>
                    <div className={classes.notesDiv}>
                        <label className={classes.notesLabel}>Notes: </label>
                        <br />
                        <ReactQuill className={classes.notes}
                        onChange={event => this.handleChange(event, 'notes')}
                        value={this.state.newNpi.notes || ''} />
                    </div>
                    <div className={classes.audience}>
                        <label className={classes.audienceLabel}>Audience:</label>
                        <br />
                        <br />
                        <ReactQuill value={this.state.newNpi.audience || ''} className={classes.audienceIn} onChange={event => this.handleChange(event, 'audience') } />                        
                    </div>
                </div>
                <br />
                <div className={classes.userDiv}>
                    <h3 className={classes.userHeader}>Contact Info</h3>
                    <TextField className={classes.userName} value={this.props.reduxStore.user.username} label="Name" disabled />
                    <br />
                    <TextField className={classes.contactInfo} label="Email" value={this.props.reduxStore.user.email} disabled />
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

export default withStyles(styles)(connect(mapReduxStoreToProps)(NpiForm));