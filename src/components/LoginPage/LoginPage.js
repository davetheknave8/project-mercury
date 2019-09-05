import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';

//Material-ui
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  label:{
    color:'white',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 200,
    overFlow: "auto",
  },
  button:{
    backgroundColor: 'white',
    textAlign: 'center',
    width: '30%',
  },
  header:{
    color:'white',
    textAlign: 'center',
  }
})


class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    this.props.history.push('/dashboard');
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <>
        <Nav />
        <div>
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}
          <form className="login-form" onSubmit={this.login}>
            <h1 className={classes.header}>Login</h1>
            <div className={classes.label}>
              
                <TextField
                  label="User Name"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              
            </div>
            <div className={classes.label}>
              
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              
            </div>
            <div className={classes.button}>
              <Button 
                color="primary"
                className="log-in"
                type="submit"
                name="submit"
                value="Log In"
              >"Log In"</Button>
           </div>
          </form>
          <center>
            {/* <button
              type="button"
              className="link-button"
              onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
            >
              Register
            </button> */}
          </center>
        </div>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
