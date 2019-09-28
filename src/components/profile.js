import React, { Component } from 'react';
import { Button, Container } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Upload from './upload';
import './profile.css';
import Grid from '@material-ui/core/Grid';
import Customgrid from './customgrid';

const Joi = require('joi');

let errors = {};
// let this.state.getResourceById = {};
class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upload:false,
      flag: false,
      postResult: false,
      getResourceById: {},
      files: {},
      states: [],
      CountryState: ''
    }

  }

singleResume = (resume) => {
  console.log(resume)
  this.setState({files: resume});
  this.setState({
    upload:false,
  });
  
}

uploadresume(value, fileInput, length){
  this.setState({
    upload:value,
  });
}

async componentWillMount() {
  await fetch('http://172.16.75.99:8443/trp/getStatesById/US')
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        // alert("States Saved Successfully");
        this.setState({
          states: result
        } )
      }
    ).catch(err => {
      console.log(err)
    })

  if(!this.props.updateprofileflag){
  console.log(this.props.idSelected);
  await fetch(`http://172.16.75.99:8443/trp/getResourceById/${this.props.idSelected.id}`)
      .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                //sessionStorage.setItem("data", JSON.stringify(result));
                //this.state.getResourceById = JSON.parse(sessionStorage.getItem("data"));
                //JSON.parse(sessionStorage.getItem("data"));
                this.setState({
                  getResourceById: result
                })
                console.log(this.state.getResourceById)
                return true
                // this.props.handelprofile();
              }
            ).catch(err => {
              console.log(err)
            })
}
}
async submit() {
    if(!this.props.updateprofileflag ?true : this.validate() ) {
      console.log("1111111111111111");
      // console.log(this.state.primaryPhone);
      await fetch("http://172.16.75.99:8443/trp/saveResource",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({
          createdUserId: sessionStorage.getItem('userId'),
          lastModifiedUserId: sessionStorage.getItem('userId'),
          resourceId: this.props.addProfile ? "" : this.props.idSelected.id,
          firstName: this.state.firstName  ? this.state.firstName :this.state.getResourceById.firstName  ,
          lastName: this.state.lastName  ?  this.state.lastName: this.state.getResourceById.lastName,
          resourceEmail: this.state.resourceEmail  ? this.state.resourceEmail:this.state.getResourceById.resourceEmail,
          street: this.state.street  ?  this.state.street: this.state.getResourceById.street,
          workAuthId: this.state.workAuthId  ?  this.state.workAuthId: this.state.getResourceById.workAuthId,
          city: this.state.city  ?  this.state.city: this.state.getResourceById.city,
          country: this.state.country  ?  this.state.country: this.state.getResourceById.country,
          skillsetName:this.state.skillsetName  ?  this.state.skillsetName: this.state.getResourceById.skillsetName,
          rate:this.state.rate  ?  this.state.rate: this.state.getResourceById.rate,
          apt:this.state.apt  ?  this.state.apt: this.state.getResourceById.apt,

          clientName:this. state.clientName ?  this.state.clientName:this.state.getResourceById.clientName,
          currProject: this.state.currProject  ? this.state.currProject:this.state.getResourceById.currProject,
          desiredPosition: this.state.desiredPosition  ? this.state.desiredPosition:this.state.getResourceById.desiredPosition,
          notes: this.state.notes  ? this.state.notes:this.state.getResourceById.notes,
          primaryPhone: this.state.primaryPhone  ? this.state.primaryPhone: this.state.getResourceById.primaryPhone,
          secPhone: this.state.secPhone  ? this.state.secPhone:this.state.getResourceById.secPhone,
          landLine: this.state.landLine  ? this.state.landLine:this.state.getResourceById.landLine,
          commStatus:this.state.commStatus  ? this.state.commStatus:this.state.getResourceById.commStatus,

          prevProject: this.state.prevProject  ? this.state.prevProject:this.state.getResourceById.prevProject,
          relocate: this.state.relocate  ? this.state.relocate:this.state.getResourceById.relocate,
          resourceExp: this.state.resourceExp  ? this.state.resourceExp:this.state.getResourceById.resourceExp,
          zip: this.state.zip  ? this.state.zip:this.state.getResourceById.zip,
          state: this.state.state ? this.state.state : this.state.getResourceById.state,
          resourceResumeDTO: {
            createdTs: new Date(),
            lastModifiedTs: new Date(),
            createdUserId: sessionStorage.getItem('userId'),
            lastModifiedUserId: sessionStorage.getItem('userId'),
            resumeDoc: this.state.files,
          }         
          
          }),

      })
      .then(res => res.json())
            .then(
              (result) => {
                console.log(result);
                alert("Profile Saved Successfully");
                this.setState({
                  postResult: true
                } )
                //this.props.handelprofile();

              }
            ).catch(err => {
              console.log(err)
            })
      }
    }
backtodatagrid(){
this.props.handelprofile();
}

async handleChange(e) {
  console.log(e.target.value);
  
  this.setState({
      [e.target.name] : e.target.value
  });
}

validate() {
  console.log(this.state);
  console.log(this.props.updateprofileflag);
  console.log(this.state.getResourceById);
  errors={};
  let valueflag = false;
  const valid = {
    FirstName: !this.props.updateprofileflag ? this.state.getResourceById.firstName :this.state.firstName,
    LastName: !this.props.updateprofileflag ? this.state.getResourceById.lastName : this.state.lastName,
    Email: !this.props.updateprofileflag ? this.state.getResourceById.resourceEmail : this.state.resourceEmail,
  }
  const schema = {
    FirstName: Joi.string().min(3).max(15).required().error(new Error("FirstName is required")),
    LastName: Joi.string().min(3).max(15).required().error(new Error("LastName is required")),
    Email: Joi.string().required().email({ minDomainAtoms: 2 }).error(new Error("Valid Email is required")),
};
Joi.validate(valid, schema, (err,value)=> {
  console.log(value);
  if(err) {
  console.log("Errorrrrrrr")
  errors["FirstName"] = err.message.includes("FirstName") ? err.message : "";
  errors["LastName"] = err.message.includes("LastName") ? err.message : "";
  errors["Email"] = err.message.includes("Email") ? err.message : "";
  console.log(err.message,errors);
  valueflag = false;
  this.setState({
    flag: valueflag
  })
  } else {
    console.log("33333333333");
    valueflag = true;
    this.setState({
      flag: valueflag
    })
  }
})
return valueflag;
}

// handleState(e) {
//   console.log(e.target.name);
//   this.setState({CountryState: e.target.value})
// }

render() {
  if(this.state.upload){
  return(
  <Upload bulkUpload={false} uploadresume={() => this.uploadresume()} singleResume={this.singleResume}/>
  )
  }

  if(this.state.postResult ) {
    return <Customgrid btn={true}/>
  }
  let stateValue = this.state.states.map(value => 
    <option 
    value={value.stateCd}
    defaultValue={!this.props.updateprofileflag  ? this.state.getResourceById.state : this.state.state}
    >{value.stateNm}</option>
)
    return (
      <div style={{backgroundColor: '#e0ebeb', textAlign: 'center'}}>
        <br/>
        <h1>{ this.props.addProfile ? "Add Profile" : "Update Profile"}</h1>
        <Grid container spacing={3}>
            <Grid item xs={6}>
              <label>First Name</label>
              <br/>
              <input
                  id="firstName"
                  label="First name*"
                  margin="normal"
                  onChange={(e) => this.handleChange(e)}
                  name="firstName"
                  variant="outlined"
                  placeholder="Enter Your Firstname"
                  defaultValue={!this.props.updateprofileflag  ? this.state.getResourceById.firstName : this.state.firstName}
            />
            <div className="errorMsg">{errors["FirstName"]}</div>
            <label>Last Name</label>
            <br/>
            <input
              id="LastName"
              label="Last name*"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="lastName"
              variant="outlined"
              placeholder="Enter Your Lastname"
              defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.lastName : this.state.lastName}
            />
            <div className="errorMsg">{errors["LastName"]}</div>
            <label>Email</label>
            <br/>
            <input
              id="Email"
              label="Email*"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="resourceEmail"
              variant="outlined"
              placeholder="Enter Your Email"
              defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.resourceEmail : this.state.resourceEmail}
            />
            <div className="errorMsg">{errors["Email"]}</div>
            <label>Primary Phone</label>
            <br/>
                <input
                  id="primaryPhone"
                  label="primaryPhone"
                  onChange={(e) => this.handleChange(e)}
                  margin="normal"
                  name="primaryPhone"
                  variant="outlined"
                  placeholder="Enter your primaryPhone no."
                  defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.primaryPhone : this.state.primaryPhone}
                />
              <br/>
              <label>Land Line Number</label>
            <br/>
              <input
                id="landLine"
                label="landLine"
                onChange={(e) => this.handleChange(e)}
                margin="normal"
                name="landLine"
                variant="outlined"
                placeholder="Enter your landline no."
                defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.landLine : this.state.landLine}
              />
              <br/> 
            
             <label>Enter Secondary Phone:  </label>
              <br/> 
             <input
              id="secPhone"
              label=" secPhone"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="secPhone"
              variant="outlined"
              placeholder="Enter your Street address"
              defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.secPhone : this.state.secPhone}
            />
            <br/>
            
            <label>Enter Apartment Number</label>
                <br/>
            <input
              id="apt"
              label="apt"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="apt"
              variant="outlined"
              placeholder="apt no."
              defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.apt : this.state.apt}
            />
            <br/>

              <label>Enter Street :  </label>
              <br/>
            <input
              id="street"
              label="street"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="street"
              variant="outlined"
              placeholder="Enter Street"
              defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.street : this.state.street}
            /> 
            <br/>            
            
              <label>Enter a City</label>
              <br/>
            <input
              id="city"
              label="city"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="city"
              variant="outlined"
              placeholder="Enter your city"
              defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.city : this.state.city}
            />
            <br/>
            
              <label>Select a State</label>
              <br/>
            <select name="state" 
            className="styled-select slate"
             onChange={(e) => this.handleChange(e)}
              placeholder="Select a State" >
              <option 
              // defaultValue={!this.props.updateprofileflag  ? this.state.getResourceById.state : this.state.state}
              value="None"
              >{!this.props.updateprofileflag ? this.state.getResourceById.state : "Select a state" }</option>
              {stateValue}
  
            </select>
            <br/>
            <label>Enter a Zip Code</label>
              <br/>
            <input
              id="Zip Code"
              label="Zip Code"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="zip"
              variant="outlined"
              placeholder="Enter your zipCode"
              defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.zip : this.state.zip}
            />
            
            <br/>
            <label>Enter a Country:  </label>
              <br/>
            <input
              id="Country/Region"
              label=" Country/Region:  "
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="country"
              variant="outlined"
              placeholder="Enter your  Country"
              defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.country : this.state.country}
            /> 

            </Grid>
            <Grid item xs={6}>
            <label>Current Project</label>
              <br/>
                <input
                  id="Current Project"
                  label="Current Project"
                  onChange={(e) => this.handleChange(e)}
                  margin="normal"
                  name="currProject"
                  variant="outlined"
                  placeholder="Enter your Role in Project"
                  defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.currProject : this.state.currProject}
                />
                <br/>
                <label>Previous Project</label>
                <br/>
                <input
                  id="Previous Project"
                  label="Previous Project"
                  onChange={(e) => this.handleChange(e)}
                  margin="normal"
                  name="prevProject"
                  variant="outlined"
                  placeholder="Enter your Role in Project"
                  defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.prevProject : this.state.prevProject}
                />
                <br/>
                <label>Client Name</label>
                <br/>
                <input
                  id="clientName"
                  label="clientName"
                  onChange={(e) => this.handleChange(e)}
                  margin="normal"
                  name="clientName"
                  variant="outlined"
                  placeholder="Client name"
                  defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.clientName : this.state.clientName}
                />
                <br/>
                <label>Relocate</label>
                <br/>
                <select className="styled-select slate" name="relocate" onChange={(e) => this.handleChange(e)}
                  placeholder="Select Relocation" 
                  defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.relocate : this.state.relocate}>
                  <option value="None">Relocate</option>  
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              <br/>
              <label>Work Authorization</label>
                <br/>
                <select className="styled-select slate"
                 name="workAuthId" 
                 onChange={(e) => this.handleChange(e)}
                  placeholder="Select a Work Authorization" 
                  defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.workAuthId : this.state.workAuthId}>
                  <option value="None">Work Authorization</option>  
                  <option value="H1">H1</option>
                  <option value="H4">H4</option>
                  <option value="B1">B1</option>
                  <option value="OPT">OPT</option>
                  <option value="CPT">CPT</option>
                </select>
              <br/>
              <label>Experience</label>
                <br/>
              <input
                id="Experience"
                label="Experience"
                onChange={(e) => this.handleChange(e)}
                margin="normal"
                name="resourceExp"
                variant="outlined"
                placeholder="Experience"
                defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.resourceExp : this.state.resourceExp}
              />
              <br/>
              <label>Rate</label>
                <br/>
              <input
                id="rate"
                label="rate"
                onChange={(e) => this.handleChange(e)}
                margin="normal"
                name="rate"
                variant="outlined"
                placeholder="rate"
                defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.rate : this.state.rate}
              />
              <br/>
              
              <label>Skills</label>
                <br/>
              <input
                id="skillsetName"
                label="skillsetName"
                onChange={(e) => this.handleChange(e)}
                margin="normal"
                name="skillsetName"
                variant="outlined"
                placeholder="Skills"
                defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.skillsetName : this.state.skillsetName}

              />
              <br/>
              <label>Desired Position</label>
                <br/>
              <input
              id="Desired Position"
              label="Desired Position"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="desiredPosition"
              variant="outlined"
              placeholder="Desired Position"
              defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.desiredPosition : this.state.desiredPosition}
            />
            <br/>
            <label>Communication Status</label>
                <br/>
            <input
              id="commStatus"
              label="commStatus"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="commStatus"
              variant="outlined"
              placeholder="Communication Status"
              defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.commStatus : this.state.commStatus}
            />
            <br/>
            
            <label>Notes</label>
                <br/>
            <input
              id="Notes"
              label="Notes"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="notes"
              variant="outlined"
              placeholder="Notes"
              defaultValue={!this.props.updateprofileflag ? this.state.getResourceById.notes : this.state.notes}
            />
            <br/>
            <Button style={{margin: '10px'}} variant="contained" component="span" onClick={(e) => this.uploadresume(true,null,null)}>
              Upload Resume
            </Button>
          </Grid>
        </Grid>
        <Button type="button" variant="contained" color="primary" onClick={(e) => this.backtodatagrid(e)}>
              Back
            </Button>
            <Button style={{marginLeft: "10px"}} type="submit" variant="contained" color="primary" onClick={(e) => this.submit(e)}>
              Submit
            </Button>
        <br/>
      </div>
    );
  }
}
export default Profile;
