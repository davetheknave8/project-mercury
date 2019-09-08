import React, {Component} from 'react';
import {connect} from 'react-redux';

//Material-UI
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

//Icon
import DeleteIcon from '@material-ui/icons/Delete';

class PartListItem extends Component {
    handleDelete = () => {
        this.props.dispatch({type: 'DELETE_PCN_PART', payload: {id: this.props.part.id, pcnId: this.props.pcnId, type: this.props.type}})
    }

    render(){
        return(
            <>
            <TableRow>
                <TableCell>{this.props.part.number}</TableCell>
                <TableCell>{this.props.part.name}</TableCell>
                <TableCell>{this.props.part.description}</TableCell>
                <TableCell>{this.props.part.replacement_number}</TableCell>
                <TableCell><Button onClick={() => this.handleDelete()} color="secondary"><DeleteIcon /></Button></TableCell>
            </TableRow>
            </>
        )
    }
}

export default connect()(PartListItem);