import React, {Component} from 'react';
import {connect} from 'react-redux';

//Material-UI
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    form: {
        width: '60%',
        margin: 'auto'
    }
})

class PcnForm extends Component {
    state = {
        newPcn: {
            date: 'yyyy-MM-dd'
        }
    }

    handleChange = (event, propToChange) => {
        this.setState({newPcn: {...this.state.newPcn, propToChange: event.target.value}})
    }

    handleSubmit = (event) => {
        
    }

    render(){
        const {classes} = this.props;
        return(
            <>
            <form className={classes.form} onSubmit={event => this.handleSubmit(event)}>
                <TextField type="date" label="Date:" value={this.state.newPcn.date} />
                <TextField value='000-000' label="PCN #:" disabled />
            </form>
            </>
        )
    }
}

export default withStyles(styles)(connect()(PcnForm));