import React, {Component} from 'react';
import { connect } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
class SearchList extends Component {

    render(){
        const { classes } = this.props;
        return(
            <>
            <TableRow align="center">
            <TableCell className={classes.tableCell}>{this.props.type}</TableCell> 
            <TableCell className={classes.tableCell}>{this.props.number}</TableCell>
            <TableCell className={classes.tableCell}>{this.props.date}</TableCell>
            <TableCell className={classes.tableCell}>{this.props.description}</TableCell>
            </TableRow>
            </>
        );
    }
}
export default SearchList; 