import React, { Component } from 'react';
import './upload.css';
import { Button } from '@material-ui/core';


let fileupl = [];
class Upload extends Component {
constructor(props) {
super(props)
this.state = {
    upload: false,
    uploadMsg: false
}
}
submit(e) {

if(fileupl.length > 0) {
    console.log("submited")
    //comment this code
    // this.setState({uploadMsg: true})
    fetch('http://172.16.75.55:8081/trp/uploadResume', {
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Content-Disposition': 'form-data',
    },  body: JSON.stringify({
        userId: this.state.UserId,
        userPwd: this.state.Password
        //resumes to be uploaded
        }),
    })
    .then(res => res.json())
    .then(
    (result) => {
        console.log(result)
        if(result.responseCode.errorCode==="0"){
        console.log("Uploaded successfully");
        this.props.bulkUpload ? this.props.handelresume() : this.props.uploadresume(false,fileupl, fileupl.length);
        this.setState({uploadMsg: true})
        }
        else{
        console.log("Unable to upload");
    }}
    ).catch(err => {
    console.log(err)
    })

}
}

handleChange(e){
for(let i =0; i< e.target.files.length; i++) {
    fileupl.push(e.target.files[i]);
}
console.log(fileupl);
this.setState({upload: true})
}
backtodatagrid(e){
    this.props.bulkUpload ? this.props.handelresume() : this.props.uploadresume(false,null,null)
}

render() {
return (
    <div className="UploadApp">
        <h1>Upload Resume</h1>
        <br />
        <center>
        <label className="custom-file-upload">
            <input type="file" name="drag and drop" onChange={ (e) => this.handleChange(e) } multiple={this.props.bulkUpload}/>
            {!this.state.upload ? "Click here to Upload Resume" : fileupl[0].name}
        </label>
        <br /><br/>
        {this.state.uploadMsg ? "Uploaded Successfully" : ""}
        <br/>
        <Button variant="contained" color="primary" onClick={(e) => this.backtodatagrid(e)}>Back</Button>
        <Button variant="contained" style={{marginLeft: "10px"}} color="primary" disabled={!this.state.upload || this.state.uploadMsg} onClick={(e) => this.submit(e)} value="Submit">Upload</Button>
        </center>
    </div>
)
}
}
export default Upload;
