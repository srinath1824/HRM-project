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
        formData.append("resumes", file);
    }
    fetch('http://172.16.75.99:8443/trp/uploadResume', {
        method: 'POST',
        body: formData
    }).then(res => res.json())
    .then(
      (result)=> {
        console.log("updated successfully");
        console.log(result);
        this.props.bulkUpload ? this.props.handelresume() : this.props.uploadresume(false,fileupl, fileupl.length);
        this.setState({uploadMsg: true})
    }).catch(err => {
        console.log(err);
    })
   

//     var options = {
//         method: 'POST',
//         uri: 'http://172.16.75.99:8443/trp/uploadResume',
//         headers: {
//             // "contentType": "multipart/form-data",
//             // "Content-Disposition": "form-data",
//             // "name":"resumes"            
//         },
//         formData: {
//             name: 'resumes',
//             file: {
//                 value: this.state.files
//             }
//         },
//       //  json: true // Automatically stringifies the body to JSON
//     };
// // if(Object.keys(this.state.files).length > 0) {
//     console.log("submited");
//     console.log(this.state.files);
//     //comment this code
//     // this.setState({uploadMsg: true})
//     rp(options)
//     // fetch()
//     .then(
//     (result) => {
//         console.log(result)
//         if(result.status===200){
//         console.log("Uploaded successfully");
//         this.props.bulkUpload ? this.props.handelresume() : this.props.uploadresume(false,fileupl, fileupl.length);
//         this.setState({uploadMsg: true})
//         }
//         else{
//         console.log("Unable to upload");
//     }}
//     ).catch(err => {
//     console.log(err)
//     })

// }
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


