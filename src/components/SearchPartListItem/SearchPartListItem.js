import React, {Component} from 'react';
import {connect} from 'react-redux';

// Material-UI
import ListItem from '@material-ui/core/ListItem';

class SearchPartListItem extends Component {
    handleAddPart = () => {
        if(this.props.type === 'PCN'){
            this.props.dispatch({type: 'ADD_PART', payload: {partId: this.props.part.id, id: this.props.pcnNumber, type: 'pcn'}});
        } else if(this.props.type === 'EOL'){
            this.props.dispatch({ type: 'ADD_PART', payload: { partId: this.props.part.id, id: this.props.eolNumber, type: 'eol' } });
        }
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