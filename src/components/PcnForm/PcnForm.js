import React, {Component} from 'react';
import {connect} from 'react-redux';

//Material-UI
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({

})

class PcnForm extends Component {
    handleSubmit = (event) => {
        
    }

    render(){
        return(
            <>
            <form onSubmit={event => this.handleSubmit(event)}>
                <TextField label="Name"/>
            </form>
            </>
        )
    }
}

export default withStyles(styles)(connect()(PcnForm));