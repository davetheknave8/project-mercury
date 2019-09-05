import React, {Component} from 'react';

//Material-UI
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class PartListItem extends Component {
    render(){
        return(
            <>
            <TableRow>
                <TableCell>{this.props.part.number}</TableCell>
                <TableCell>{this.props.part.name}</TableCell>
                <TableCell>{this.props.part.description}</TableCell>
            </TableRow>
            </>
        )
    }
}

export default PartListItem;