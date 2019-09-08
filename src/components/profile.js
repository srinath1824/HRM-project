import React, { Component } from 'react';
import { Button, Container } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Upload from './upload';
import './profile.css';
import Grid from '@material-ui/core/Grid';


const Joi = require('joi');

let errors = {};
let updateData = {};
class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upload:false,
      flag: false,
      postResult: false,
      getResourceById: {}
    }

  }
uploadresume(value, fileInput, length){
  this.setState({
    upload:value,
  });
  if(length === 1) {
  }

}

async componentWillMount() {
  if(this.props.updateprofileflag){

  console.log(this.props.idSelected);
  await fetch(`http://172.16.75.112:8081/trp/getResourceById/${this.props.idSelected.id}`)

      .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                sessionStorage.setItem("data", JSON.stringify(result));
                updateData = JSON.parse(sessionStorage.getItem("data"));

                //JSON.parse(sessionStorage.getItem("data"));
                this.setState({
                  getResourceById: JSON.parse(sessionStorage.getItem("data"))
                })
                console.log(updateData)
                return true
                // this.props.handelprofile();
              }
            ).catch(err => {
              console.log(err)
            })
}
}
async submit() {
    if(this.props.updateprofileflag ?true : this.validate() ) {
      console.log("1111111111111111");
      await fetch("http://172.16.75.112:8081/trp/saveResource",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({
          createdUserId: sessionStorage.getItem('userId'),
          lastModifiedUserId: sessionStorage.getItem('userId'),
          firstName: this.props.updateprofileflag  ?this.state.firstName :updateData.firstName  ,
          lastName: this.props.updateprofileflag  ?  this.state.lastName: updateData.lastName,
          resourceEmail: this.props.updateprofileflag  ? this.state.resourceEmail:updateData.resourceEmail,
          city: this.props.updateprofileflag  ?  this.state.city: updateData.city,
          clientName:this.props.updateprofileflag  ?  this.state.clientName:updateData.clientName,
          currProject: this.props.updateprofileflag  ? this.state.currProject:updateData.currProject,
          desiredPosition: this.props.updateprofileflag  ? this.state.desiredPosition:updateData.desiredPosition,
          notes: this.props.updateprofileflag  ? this.state.notes:updateData.notes,
          primaryPhone: this.props.updateprofileflag  ? this.state.primaryPhone: updateData.primaryPhone,
          landLine: this.props.updateprofileflag  ? this.state.landLine:updateData.landLine,
          prevProject: this.props.updateprofileflag  ? this.state.prevProject:updateData.prevProject,
          relocate: this.props.updateprofileflag  ? this.state.relocate:updateData.relocate,
          resourceExp: this.props.updateprofileflag  ? this.state.resourceExp:updateData.resourceExp,
          zip: this.props.updateprofileflag  ? this.state.zip:updateData.zip,
          }),

      })
      .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                this.setState({
                  postResult: true
                } )
                this.props.handelprofile();
              }
            ).catch(err => {
              console.log(err)
            })
      }
    }
backtodatagrid(){
this.props.handelprofile();
}

handleChange(e) {
  this.setState({
    [e.target.name] : e.target.value
  });
}

validate() {
  errors={};
  let valueflag = false;
  const valid = {
    FirstName: this.state.firstName,
    LastName: this.state.lastName,
    Email: this.state.resourceEmail,
  }
  const schema = {
    FirstName: Joi.string().min(5).max(15).required().error(new Error("FirstName is required")),
    LastName: Joi.string().min(5).max(15).required().error(new Error("LastName is required")),
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

render() {
  if(this.state.upload){
   return(
    <Upload bulkUpload={false} uploadresume={() => this.uploadresume()}/>
   )
  }
  
    return (
      <div style={{backgroundColor: '#e0ebeb', textAlign: 'center'}}>
        <br/>
        <h1>{ this.props.addProfile ? "Add Profile" : "Update Profile"}</h1>
        <Container fixed>

        <Grid container spacing={3}>
            <Grid item xs={6}>
              
              <input
                  id="firstName"
                  label="First name*"
                  margin="normal"
                  onChange={(e) => this.handleChange(e)}
                  name="firstName"
                  variant="outlined"
                  placeholder="Enter Your Firstname"
                  defaultValue={this.props.updateprofileflag  ? updateData.firstName : updateData.firstName}
            />
            <div className="errorMsg">{errors["FirstName"]}</div>

            <input
              id="LastName"
              label="Last name*"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="lastName"
              variant="outlined"
              placeholder="Enter Your Lastname"
              defaultValue={this.props.updateprofileflag ? updateData.lastName : this.state.lastName}
            />
            <div className="errorMsg">{errors["LastName"]}</div>

            <input
              id="Email"
              label="Email*"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="resourceEmail"
              variant="outlined"
              placeholder="Enter Your Email"
              defaultValue={this.props.updateprofileflag ? updateData.resourceEmail : this.state.resourceEmail}
            />
            <div className="errorMsg">{errors["Email"]}</div>

                <input
                  id="primaryPhone"
                  label="primaryPhone"
                  onChange={(e) => this.handleChange(e)}
                  margin="normal"
                  name="primaryPhone"
                  variant="outlined"
                  placeholder="Enter your primaryPhone no."
                  defaultValue={this.props.updateprofileflag ? updateData.primaryPhone : this.state.primaryPhone}
                />
              <br/>
              <input
                id="landLine"
                label="landLine"
                onChange={(e) => this.handleChange(e)}
                margin="normal"
                name="landLine"
                variant="outlined"
                placeholder="Enter your landline no."
                defaultValue={this.props.updateprofileflag ? updateData.landLine : this.state.landLine}
              />
              <br/>
            <select name="state" className="styled-select slate" onChange={(e) => this.handleChange(e)}
              placeholder="Select a State" >
              <option value="None">Select a state</option>
              <option value="TN">Tennessee</option>
              <option value="WS">Washington</option>
              <option value="MEX">Mexico</option>
            </select>
            <br/>
            <input
              id="city"
              label="city"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="city"
              variant="outlined"
              placeholder="Enter your city"
              defaultValue={this.props.updateprofileflag ? updateData.city : this.state.city}
            />
            <br/>
            <input
              id="Zip Code"
              label="Zip Code"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="zip"
              variant="outlined"
              placeholder="Enter your zipCode"
              defaultValue={this.props.updateprofileflag ? updateData.zip : this.state.zip}
            />
            
            </Grid>
            <Grid item xs={6}>
              
                <input
                  id="Current Project"
                  label="Current Project"
                  onChange={(e) => this.handleChange(e)}
                  margin="normal"
                  name="currProject"
                  variant="outlined"
                  placeholder="Enter your Project"
                  defaultValue={this.props.updateprofileflag ? updateData.currProject : this.state.currProject}
                />
                <br/>
                <input
                  id="Previous Project"
                  label="Previous Project"
                  onChange={(e) => this.handleChange(e)}
                  margin="normal"
                  name="prevProject"
                  variant="outlined"
                  placeholder="Desired Position"
                  defaultalue={this.props.updateprofileflag ? updateData.prevProject : this.state.prevProject}
                />
                <br/>
                <input
                  id="clientName"
                  label="clientName"
                  onChange={(e) => this.handleChange(e)}
                  margin="normal"
                  name="clientName"
                  variant="outlined"
                  placeholder="Client name"
                  defaultalue={this.props.updateprofileflag ? updateData.clientName : this.state.clientName}
                />
                <br/>

                <select className="styled-select slate" name="relocate" onChange={(e) => this.handleChange(e)}
                  placeholder="Select a State" 
                  defaultalue={this.props.updateprofileflag ? updateData.relocate : this.state.relocate}>
                  <option value="None">Relocate</option>  
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              <br/>

              <input
                id="Experience"
                label="Experience"
                onChange={(e) => this.handleChange(e)}
                margin="normal"
                name="resourceExp"
                variant="outlined"
                placeholder="Experience"
                defaultValue={this.props.updateprofileflag ? updateData.resourceExp : this.state.resourceExp}
              />
              <br/>
              <input
                id="Skills"
                label="Skills"
                onChange={(e) => this.handleChange(e)}
                margin="normal"
                name="Skills"
                variant="outlined"
                placeholder="Skills"
              />
              <br/>
              <input
              id="Desired Position"
              label="Desired Position"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="desiredPosition"
              variant="outlined"
              placeholder="Desired Position"
              defaultValue={this.props.updateprofileflag ? updateData.desiredPosition : this.state.desiredPosition}
            />
            <br/>
            <input
              id="Notes"
              label="Notes"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="notes"
              variant="outlined"
              placeholder="Notes"
              defaultValue={this.props.updateprofileflag ? updateData.notes : this.state.notes}
            />
            <br/>
            <Button style={{margin: '10px'}} variant="contained" component="span" onClick={(e) => this.uploadresume(true,null,null)}>
              Upload Resume
            </Button>
          </Grid>
        </Grid>
        <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="full-width contained primary button group"
        >
        <Button type="button" variant="contained" color="primary" onClick={(e) => this.backtodatagrid(e)}>
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={(e) => this.submit(e)}>
          Submit
        </Button>
        </ButtonGroup>
        <br/>
        </Container>
      </div>

    );
  }
}
export default Profile;
