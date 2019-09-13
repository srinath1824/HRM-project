import React, { Component } from 'react';
import { Modal } from "react-bootstrap";
import { Button, Container, Typography, TextField, Link } from '@material-ui/core';
import App from '../App';
import './forgotModel.css'

class ForgotModel extends Component {
    constructor() {
        super();
        this.state = {
            cancel: false
        };
    }

handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    }
    
validateFrgtUsername() {
fetch("http://172.16.75.99:8443/trp/forgotUserId",{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
    },  body: JSON.stringify({
    securityQuestion: this.state.security_question,
    userId: this.state.security_email
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
        errormessage:"Invalid security question or email entered."
    })}
    }
).catch(err => {
    console.log(err)
})
}

validateFrgtPasswd() {
fetch("http://172.16.75.99:8443/trp/forgotPwd",{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
    },  body: JSON.stringify({
    securityQuestion: this.state.security_question,
    userId: this.state.security_username
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
    if(this.state.cancel) {
        return(
            <App />
        )
    }
    return (
        <div>
        <Modal className='modal-dialog' show={this.props.forgotuser} onHide={() => this.handleClose()}>
        <Modal.Title><h1>Forgot Username</h1></Modal.Title>
        <Modal.Header />
        <Modal.Body className='modal-content'>
        <TextField
            id="security_question"
            label="Enter security question"
            name="security_question"
            onChange={(e) => this.handleChange(e)}
            margin="normal"
        />
        <TextField
            id="security_username"
            label="Enter Username"
            name="security_username"
            onChange={(e) => this.handleChange(e)}
            margin="normal"
        />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="contained" color="primary" onClick={() => this.validateFrgtUsername()}>
            Submit
        </Button>
        <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={() => this.cancel()}>
            Cancel
        </Button>
        </Modal.Footer>
    </Modal>
    <Modal show={this.props.forgotpassword} onHide={() => this.handlePasswdClose()}>
        <Modal.Title><h1>Forgot Password</h1></Modal.Title>
        <Modal.Header />
        <Modal.Body>
        <TextField
            id="security_question"
            label="Enter security question"
            name="security_question"
            onChange={(e) => this.handleChange(e)}
            margin="normal"
        />
        <TextField
            id="security_username"
            label="Enter email"
            name="security_email"
            onChange={(e) => this.handleChange(e)}
            margin="normal"
        />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="contained" color="primary" onClick={() => this.validateFrgtPasswd()}>
            Submit
        </Button>
        <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={() => this.cancel()}>
            Cancel
        </Button>
        </Modal.Footer>
        </Modal>
        </div>
        )
    }
}

export default ForgotModel;