import React, { Component } from 'react';
import './upload.css';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { fstat } from 'fs';
import fs from 'fs'
import rp from 'request-promise';

let fileupl = [];
class Upload extends Component {
constructor(props) {
super(props)
this.state = {
    upload: false,
    uploadMsg: false,
    files: {}
}
}
submit() {

    let formData = new FormData();
    for(const file of this.state.files) {
        // un comment this
        formData.append("resumes", file);
        //

        //-----try this---------------
        // let reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = (e) => {
        //     console.log(e.target.result);
        //     formData.append("resumes", e.target.result);
        // }
        //--------------------
    }
    if(this.props.bulkUpload) {
        fetch('http://172.16.75.99:8443/trp/uploadResume', {
        method: 'POST',
        body: formData
    }).then(res => res.json())
    .then(
    (result)=> {
        console.log("updated successfully");
        console.log(result);
        // this.props.bulkUpload ? this.props.handelresume() : this.props.uploadresume(false,formData, formData.length);
        this.props.bulkUpload && this.props.handelresume();
        this.setState({uploadMsg: true})
    }).catch(err => {
        console.log(err);
    })
    } else {
        let files = this.state.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = (e) => {
            console.log(e.target.result);
            this.props.singleResume(e.target.result);
        }
    }
    
}

handleChange(e){
    var input = e.target.files;
    this.setState({
        files: input
    })
//console.log(fileupl);
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
            <input type="file" id="inpfile" encType="multipart/form-data"  onChange={ (e) => this.handleChange(e) } multiple={this.props.bulkUpload}/>
            {!this.state.upload ? "Click here to Upload Resume" : 'file uploaded'}
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


