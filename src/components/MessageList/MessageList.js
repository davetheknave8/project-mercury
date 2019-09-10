import React, { Component } from 'react';
import { connect } from 'react-redux';


class MessageList extends Component {

    checkStatus = (message) => {
        if (message.message_read === 0) {
            return (<li>
                {message.notification_message} -
            </li>)
        }
    }

    render() {
        return (
            <>
                {this.checkStatus(this.props.message)}
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(MessageList);
