import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import './SearchListItem.css';

const styles = theme => ({
    tableCell1: {
        textAlign: 'left',
        width: '15%',
    },
    tableCell2: {
        textAlign: 'left',
        width: '15%',
    },
    tableCell3: {
        textAlign: 'left',
        width: '25%',
    },
    tableCell4: {
        textAlign: 'left',
        width: '45%',
    },
});

class SearchListItem extends Component {

    goToLink = (event) => {
        this.props.history.push(`/pcn-view/${this.props.item.type}/${this.props.item.id}`)
        console.log('clicked link', event);
    }

    render() {

        let html = this.props.item.description;
        console.log(html);
        let div = document.createElement("div");
        div.innerHTML = html;
        console.log(div.innerText);

        const { classes } = this.props;
        return (
            <>
                <TableRow className="tc" align="center" onClick={() => this.goToLink()}>
                    <TableCell className={classes.tableCell1}>{this.props.item.id}</TableCell>
                    <TableCell className={classes.tableCell2}>{this.props.item.type}</TableCell>
                    <TableCell className={classes.tableCell3}>{this.props.item.date}</TableCell>
                    <TableCell className={classes.tableCell4}>{div.innerText}</TableCell>
                </TableRow>
            </>
        );
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore

});

export default withStyles(styles)(connect(mapStateToProps)(SearchListItem)); 