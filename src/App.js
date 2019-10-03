import React from 'react';
import { Button, Container, Typography, TextField, Link } from '@material-ui/core';
import Register from './components/register';
import Customgrid from './components/customgrid';
import ForgotModel from './components/forgotModel';

let errors = {username: "",password: ""};
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      showLogin: true,
      is_valid_user:false,
      password: "",
      formIsValid: false,
      register: false,
      forgotuser: false,
      forgotpassword: false,
      errormessage: ""
    }
  }
  

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  switch(e) {
    this.logincontent();
    if (e === "login") {
      this.setState({
        showLogin: true
      })

    }
    else {
      this.setState({
        showLogin: false
      })
    }
  }

  registration(value) {
    this.setState({
      register: value
    })
  }

  async validate() {

    // //comment this
    this.setState({
      is_valid_user: true
    });
    // //-------------------
    let flag = false;
    console.log(this.state)
    this.state.username === "" ?
      errors.username = "Please enter your Username." : errors={}
    this.state.password === "" ? errors.password= "Please enter your Password." : errors={}

    Object.keys(errors).length > 0 ? flag = true : flag = true;

    if(flag) {
    await fetch("http://172.16.75.99:8443/trp/login",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },  body: JSON.stringify({
        userId: this.state.username,
        userPwd: this.state.password
        }),
    })
    .then(res => res.json())
    .then(
      (result) => {  
        console.log(result) 
        if(result.responseCode!==null){
          sessionStorage.setItem('userId',this.state.username);
          this.setState({
            is_valid_user: true
          })
        }
        else{this.setState({
          errormessage:"Invalid User Id or Password."
        })}
      }
    ).catch(err => {
      console.log(err)
    })
  }
}

handleForgotUsername() {
    this.setState({forgotuser: true});
}

handleForgotPassword() {
  this.setState({forgotpassword: true});
}

handleClose() {
  this.setState({ forgotuser: false });
}

handlePasswdClose() {
  this.setState({ forgotpassword: false });
}

handleUser() {
  this.setState({is_valid_user: true});
}

  render() {
    if(this.state.register) {
      return (
        <Register registration={() => this.registration()}/>
      )
    }

    if(this.state.is_valid_user){
      return(
        <div>
          <Customgrid/>
          </div>
      )
    }

  return (
    <React.Fragment>
      {this.state.forgotuser || this.state.forgotpassword ? 
      
      <ForgotModel
        forgotuser={this.state.forgotuser}
        forgotpassword = {this.state.forgotpassword} 
        handleUser = {() => this.handleUser()}
        /> :
        <Container maxWidth="sm">
        <br /><br /><br />
        <Typography variant="h4" component="h2" color="textPrimary">
          Sign In
        </Typography>
            <br />
            <div style={{color: 'red'}}>{this.state.errormessage}</div>
            <TextField
              id="username"
              label="Enter Username"
              name="username"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
            />
            <div style={{color: 'red'}}>{errors.username}</div>
            <br />
            <TextField
              id="password"
              label="Enter password"
              name="password"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
            />
            <div style={{color: 'red'}}>{errors.password}</div>
            <br />
            <div onClick={() => this.handleForgotUsername()}>
              <label style={{display: 'inline-block', textDecoration: 'underline', cursor: 'pointer', color: 'blue'}}>Forgot Username</label>
            </div>
            <div onClick={() => this.handleForgotPassword()}>
              <label style={{display: 'inline-block', textDecoration: 'underline', cursor: 'pointer', color: 'blue'}}>Forgot Password</label>
            </div>
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={() => this.validate()}>
              Submit
            </Button>
            <Link 
            style={{marginLeft: '20px'}} 
            component="button"
            variant="body2"
            onClick={() => this.registration(true)}>Register Now</Link>
            <br />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

      </Container> }
    </React.Fragment>
  )};
}

export default App
