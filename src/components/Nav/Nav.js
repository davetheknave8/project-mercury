import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

//Material-UI Icons
import UserIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

//Material-UI
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  settingsBtn: {
    float: 'left',
    color: 'white',
    paddingRight: '0%',
    paddingLeft: '0%',
    paddingTop: '13%',
    paddingBottom: '13%'
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
})

class Nav extends Component{
  state = {
    open: null,
    show: false
  }

  handleOpenSettings = event => {
    this.setState({open: event.currentTarget})
  }

  handleClose = () => {
    this.setState({open: null})
  }

  handleOpenChangePassword = () => {
    this.setState({
      show: true
    })
  }

  handleCloseChangePassword = () => {
    this.setState({
      show: false
    })
  }

  handleSubmitNewPassword = event => {
    this.setState({show: false})
    console.log(this.state.newPassword);
  }

  handleChange = (event, propToChange) => {
    this.setState({newPassword: {...this.state.newPassword, [propToChange]: event.target.value}})
  }

  render(){
    const {classes} = this.props;
    return(
      <div className="nav">
        <Link to="/home">
          <h2 className="nav-title">Project Mercury</h2>
        </Link>
        <div className="nav-right">
          {!this.props.user.id ?
          <Link className="nav-link" to="/home">Login/Register</Link> : <></>}
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {this.props.user.id && (
            <>
              <Button onClick={event => this.handleOpenSettings(event)}size="small" className={classes.settingsBtn}>
                <SettingsIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.open}
                open={Boolean(this.state.open)}
                onClose={this.handleClose}>
                  <MenuItem onClick={this.handleOpenChangePassword}>Change Password</MenuItem>
              </Menu>
              <Modal
              open={this.state.show}
              onClose={this.handleCloseChangePassword}>
                <div className={classes.paper} style={{top: '20%', left: '35%'}}>
                  <Typography style={{textAlign: 'center'}}>Change Password</Typography>
                  <form onSubmit={event => this.handleSubmitNewPassword(event)}>
                    <TextField type="password" onChange={event => this.handleChange(event, 'currentPassword')} label="Current Password" />
                    <br />
                    <TextField type="password" onChange={event => this.handleChange(event, 'newPassword')} label="New Password" />
                    <br />
                    <TextField type="password" onChange={event => this.handleChange(event, 'reenterPassword')} label="Re-enter New Password" />
                    <br />
                    <Button type="submit">Submit</Button>
                  </form>
                </div>
              </Modal>
              <Link className="nav-link" to="/dashboard">
                <UserIcon />
              </Link>
            </>
          )}
          {/* Always show this link since the about page is not protected */}
          <Link className="nav-link" to="/search">
            <SearchIcon />
          </Link>
          {this.props.user.id && (
            <LogOutButton className="nav-link" />
          )}
        </div>
      </div>
    )
  }
};


// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default withStyles(styles)(connect(mapStateToProps)(Nav));
