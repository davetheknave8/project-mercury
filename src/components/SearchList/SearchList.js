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
            <TableCell className={classes.tableCell}>helloo</TableCell> 
            <TableCell className={classes.tableCell}>hello</TableCell>
            <TableCell className={classes.tableCell}>hello</TableCell>
            </TableRow>
            </>
        );
    }
}
export default SearchList; 