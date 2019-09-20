import React, { Component } from 'react'
import App from '../App';
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default class Register extends Component {
    constructor() {
    super();
    this.state = {
        fields: {},
        errors: {},
        is_valid_user:false,
        cancel: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
    };
    handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
        fields
    });
    }
    async submituserRegistrationForm(e) {
    // comment this code
    // this.setState({is_valid_user: true});
    //--------------------------
    e.preventDefault();
    if (this.validateForm()) {
        //comment this code
        // let emptyFields = {};
        // emptyFields["FirstName"] = "";
        // emptyFields["LastName"] = "";
        // emptyFields["username"] = "";
        // emptyFields["emailid"] = "";
        // emptyFields["mobileno"] = "";
        // emptyFields["password"] = "";
        // this.setState({fields:emptyFields});
        alert("Form submitted");
        await fetch("http://172.16.75.99:8443/trp/register",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
        },  
        body: JSON.stringify({
            firstName: this.state.fields.FirstName,
            lastName: this.state.fields.LastName,
            phone: this.state.fields.mobileno,
            userEmail: this.state.fields.emailid,
            securityQuestion: "what is you home address?",
            userId: this.state.fields.username,
            userPwd:this.state.fields.password,
            // need to implement registered as source or recruter
            }),

        })  
        .then(res => res.json())
            .then(
                (result) => {  
                console.log(result) 
                this.setState({
                    is_valid_user: true
                } )
                }
            ).catch(err => {
                console.log(err)
            })
        }
}

    validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["FirstName"]) {
        formIsValid = false;
        errors["FirstName"] = "*Please enter your FirstName.";
    }

    if (typeof fields["FirstName"] !== "undefined") {
        if (!fields["FirstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["FirstName"] = "*Please enter alphabet characters only.";
        }
    }

    if (!fields["LastName"]) {
        formIsValid = false;
        errors["LastName"] = "*Please enter your LastName.";
    }

    if (typeof fields["LastName"] !== "undefined") {
        if (!fields["LastName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["LastName"] = "*Please enter alphabet characters only.";
        }
    }

    if (!fields["username"]) {
        formIsValid = false;
        errors["username"] = "*Please enter your username.";
    }

    if (typeof fields["username"] !== "undefined") {
        if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "*Please enter alphabet characters only.";
        }
    }

    if (!fields["emailid"]) {
        formIsValid = false;
        errors["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
        }
    }

    if (!fields["mobileno"]) {
        formIsValid = false;
        errors["mobileno"] = "*Please enter your mobile no.";
    }

    if (typeof fields["mobileno"] !== "undefined") {
        if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["mobileno"] = "*Please enter valid mobile no.";
        }
    }

    if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
        }
    }

    this.setState({
        errors: errors
    });
    return formIsValid;


    }

    canclebtn() {
        this.props.registration(false);
    }


render() {
    if(this.state.is_valid_user){
    return(
        <div>
        <App/>
        </div>
    )
    }
    const errorMsg = {
        color: '#cc0000',
        marginBottom: '12px'
    }
    return (

    <div className='Signup-form'>
        
        <form method="post"  name="userRegistrationForm" >
        
        <Grid container justify = "center">
            <Grid justify = "center" item xs={3}>
            <h2 style={{display: 'block', left: '50%',position: 'relative'}}>Registration page</h2>
                <TextField
                    id="outlined-name"
                    label="FirstName"
                    name="FirstName"
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
            <div style={errorMsg}>{this.state.errors.FirstName}</div>
            <TextField
                    id="outlined-name"
                    label="LastName"
                    name="LastName"
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <div style={errorMsg}>{this.state.errors.LastName}</div>

            <TextField
                id="outlined-name"
                label="Mobile no."
                name="mobileno"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
            />
            <div style={errorMsg}>{this.state.errors.mobileno}</div>
        </Grid>
        
            <Grid justify = "center" item xs={3}>
            <br/><br/><br/>
            <TextField
                id="outlined-name"
                label="Emailid"
                name="emailid"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
            />
            <div style={errorMsg}>{this.state.errors.emailid}</div>

            <TextField
                id="outlined-name"
                label="Username"
                name="username"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
            />
            <div style={errorMsg}>{this.state.errors.username}</div>

            <TextField
                id="outlined-name"
                label="Password"
                name="password"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
            />
            <div style={errorMsg}>{this.state.errors.password}</div>
            <InputLabel htmlFor="age-native-simple">Register as</InputLabel>
            <Select
                native
                onChange={this.handleChange}
                inputProps={{
                name: 'registered',
                }}
            >
        <option value="" />
        <option value={10}>Sourcer</option>
        <option value={20}>Recruter</option>
        </Select>
        </Grid>
            </Grid>
            <br/>
            <Button style={{display: 'inline-block', left: '42%',position: 'relative'}} variant="contained" color="primary" onClick={() => this.canclebtn()}>
                Cancel
            </Button>
            <Button style={{display: 'inline-block', left: '42%', marginLeft: '10px', position: 'relative'}} onClick={(e)=>this.submituserRegistrationForm(e)} variant="contained" color="primary">
                Register
            </Button>
        </form>
    </div>
        );
    }
}
