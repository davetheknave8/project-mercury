import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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


  

class SearchListItem extends Component {
  
    render(){

        let html = this.props.item.description;
            console.log(html);
        let div = document.createElement("div");
            div.innerHTML = html;
            console.log(div.innerText);

        const { classes } = this.props;
            return(
                <>
                <TableRow align="center">
                    <TableCell className={classes.tableCell}><Link>{this.props.item.id}</Link></TableCell> 
                    <TableCell className={classes.tableCell}>{this.props.item.type}</TableCell>
                    <TableCell className={classes.tableCell}>{this.props.item.date}</TableCell>
                    <TableCell className={classes.tableCell}>{div.innerText}</TableCell>
                </TableRow>
                </>
            );
    }
}

const mapStateToProps = reduxStore =>({
    reduxStore 

});

export default  withStyles(styles)(connect(mapStateToProps)(SearchListItem)); 