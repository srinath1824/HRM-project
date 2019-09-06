import React from 'react';
import { Button, Container, Typography, TextField, Link } from '@material-ui/core';

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
      register: false
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

  validate() {

    // this.setState({
    //   is_valid_user: true
    // });
    console.log(this.state)
    this.state.username === "" ?
      errors.username = "Please enter your Username." : errors={}
    this.state.password === "" ? errors.password= "Please enter your Password." : errors={}

    Object.keys(errors).length > 0 ? this.setState({formIsValid: false}) : this.setState({formIsValid: true})

    if(this.state.formIsValid) {
    fetch("http://172.16.75.112:8080/trp/login",{
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
        if(result.responseCode.errorCode==="0"){
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

  render() {
    
  return (
    <React.Fragment>
        <Container maxWidth="sm">
        <br /><br /><br />
        <Typography variant="h4" component="h2" color="textPrimary">
          Sign In
        </Typography>
            <br />
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
            <a href="#">Forgot Password</a>
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={() => this.validate()}>
              Submit
            </Button>
            <Link 
            style={{marginLeft: '20px'}} 
            component="button"
            variant="body2"
            onClick={() => {  }}>Register Now</Link>
            <br />
            <br/>
        </Container>
    </React.Fragment>
  )};
}

export default App
