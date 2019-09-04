import React, {Component} from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    tableCell: {
      width: '20%',
      padding: 'auto',
      marginLeft: theme.spacing.unit,
    },
  
  });


class SearchList extends Component {

    render(){
        const { classes } = this.props;
        return(
            <>
            <TableRow align="center">
            <TableCell className={classes.tableCell}>{this.props.item.id}</TableCell> 
            <TableCell className={classes.tableCell}>{this.props.item.type}</TableCell>
            <TableCell className={classes.tableCell}>{this.props.item.date}</TableCell>
            <TableCell className={classes.tableCell}>{this.props.item.description}</TableCell>
            </TableRow>
            </>
        );
    }
}

const mapStateToProps = reduxStore =>({
    reduxStore 

});
export default  withStyles(styles)(connect(mapStateToProps)(SearchList)); 