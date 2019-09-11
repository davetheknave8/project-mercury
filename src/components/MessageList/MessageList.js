import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import './MessageList.css'

class MessageList extends Component {

    navigate = (id) => {
        const type = id.substring(0, 3)
        this.props.history.push(`/${type}-view/${type}/${id}`)
    }

    checkStatus = (message, type) => {
        if( message.status === 'PUBLISHED' || message.status === 'DENIED'){
            if(type === 'unread'){
                return (<p className={'messagetext'} onClick={() => this.navigate(message.id)}>
                    {message.id} was denied on {Moment(message.message_time).format('MM/DD/YYYY')}
                </p>)
            }
            else if (type === 'read') {
                return (<p onClick={() => this.navigate(message.id)}>
                    {message.id} was {message.status.toLowerCase()} on {Moment(message.message_time).format('MM/DD/YYYY')}
                </p>)
            }
        }
    }

    render() {
        return (
            <>
                {this.checkStatus(this.props.message, this.props.type, this.props.key)}
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(MessageList);
