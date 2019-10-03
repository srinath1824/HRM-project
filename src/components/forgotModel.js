import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import App from '../App';
import './forgotModel.css'

class ForgotModel extends Component {
    constructor() {
        super();
        this.state = {
            cancel: false,
            errormessage: ''
        };
        console.log(this.props)
    }

handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state);
    }
    
validateFrgtUsername() {
    console.log("submitted");
    console.log(this.state);
    // this.setState({
    //     errormessage:"Invalid security question or username entered."
    // });
fetch("http://172.16.75.99:8443/trp/forgotUserId",{
    
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
    },  body: JSON.stringify({
    securityQuestion: this.state.security_question,
    userEmail: this.state.security_email
    }),
})
.then(res => res.json())
.then(
    (result) => {  
    console.log(result) 
    if(result.responseCode.errorCode==="0"){
        this.props.handleUser();
    }
    else{this.setState({
        errormessage:"Invalid security question or email entered."
    })}
    }
).catch(err => {
    console.log(err)
})
}

validateFrgtPasswd() {
    console.log("submitted");
    console.log(this.state);
fetch("http://172.16.75.99:8443/trp/forgotPwd",{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
    },  body: JSON.stringify({
    securityQuestion: this.state.frgtpasswd_question,
    userId: this.state.security_userid
    }),
})
.then(res => res.json())
.then(
    (result) => {  
    console.log(result) 
    if(result.responseCode.errorCode==="0"){
        this.props.handleUser();
    }
    else{this.setState({
        errormessage:"Invalid security question or username entered."
    })}
    }
).catch(err => {
    console.log(err)
})
}
cancel() {
    this.setState({cancel: true})
}
render() {
    let forUser;
    let forPassword;
    if(this.state.cancel) {
        return(
            <App />
        )
    }
    if(this.props.forgotuser) {
        forUser =  (
            <div style={{textAlign: 'center'}}>
                <h1>Forgot Username</h1>
                <p style={{color: "red"}}>{this.state.errormessage}</p>

                <TextField
                    id="security_question"
                    label="Enter security question"
                    name="security_question"
                    onChange={(e) => this.handleChange(e)}
                    margin="normal"
                /><br/>
                <TextField
                    id="security_email"
                    label="Enter Email"
                    name="security_email"
                    onChange={(e) => this.handleChange(e)}
                    margin="normal"
                /><br/>
                <Button variant="contained" color="primary" onClick={() => this.validateFrgtUsername()}>
                    Submit
                </Button>
                <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={() => this.cancel()}>
                    Cancel
                </Button>
        </div>
        )
    }

    if(this.props.forgotpassword) {
        forPassword = (
        <div style={{textAlign: 'center'}}>
        <h1>Forgot Password</h1>
            <p style={{color: "red"}}>{this.state.errormessage}</p>
            <TextField
                id="security_question"
                label="Enter security question"
                name="frgtpasswd_question"
                onChange={(e) => this.handleChange(e)}
                margin="normal"
            /><br/>
            <TextField
                id="security_userid"
                label="Enter userid"
                name="security_userid"
                onChange={(e) => this.handleChange(e)}
                margin="normal"
            /><br/>
            <Button variant="contained" color="primary" onClick={() => this.validateFrgtPasswd()}>
                Submit
            </Button>
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={() => this.cancel()}>
                Cancel
            </Button>
            <br/>
        </div>)
    }
    return (
        <div>
            {forUser}
            {forPassword}
        </div>
        )
    }
}

export default ForgotModel;