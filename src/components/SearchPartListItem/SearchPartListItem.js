import React, {Component} from 'react';
import {connect} from 'react-redux';

// Material-UI
import ListItem from '@material-ui/core/ListItem';

class SearchPartListItem extends Component {
    handleAddPart = () => {
        this.props.dispatch({type: 'ADD_PART', payload: {id: this.props.part.id, pcnId: this.props.pcnNumber}});
    }

    render(){
        return(
            <>
            <ListItem button divider onClick={(event) => this.handleAddPart(event)}>
                {this.props.part.number} {this.props.part.name}
            </ListItem>
            </>
        )
    }
}

export default connect()(SearchPartListItem);