import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import PmDashboard from '../PmDashboard/PmDashboard';

class Dashboard extends Component {

    checkUser = () => {
        if( this.props.reduxStore.user.admin === 1 ){
            return <PmDashboard history={this.props.history} />;
        }
        else if( this.props.reduxStore.user.admin === 2 ){
            return <AdminDashboard/>;
        }
        else{
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <>
                {this.checkUser()}
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(Dashboard);
