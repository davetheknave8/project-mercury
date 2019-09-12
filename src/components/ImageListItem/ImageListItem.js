import React, {Component} from 'react';
import {connect} from 'react-redux';

//Material-UI
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    image: {
        width: '75px',
        height: '50px',
        objectFit: 'cover',
        display: 'inline-block'
    }
})

class ImageListItem extends Component {
    render(){
        const {classes} = this.props;
        return(
            <>
                <img className={classes.image} src={this.props.image.image_url} />
            </>
        )
    }
}

export default withStyles(styles)(connect()(ImageListItem));
