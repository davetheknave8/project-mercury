import React, {Component} from 'react';

// Material-UI
import ListItem from '@material-ui/core/ListItem';

class SearchPartListItem extends Component {
    handleAddPart = () => {
        this.props.dispatch({type: 'ADD_PART', payload: {number: this.props.part.number}});
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

export default SearchPartListItem;