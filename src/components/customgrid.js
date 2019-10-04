import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import Profile from './profile';
import Register from './register';
import Upload from './upload';
import App from '../App';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import axios from 'axios';
var Base64 = require('js-base64').Base64;

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'Date', name: 'Date' },
    { key: 'Name', name: 'Name' },
    { key: 'phone', name: 'Phone' },
    { key: 'Role', name: 'Role' },
    { key: 'Status', name: 'Status' },
    { key: 'resume', name: 'resume' },
    // { key: 'details', name: 'Details' }
]

const details = ['id','Date','Name','phone','Role','visa','status','resume','details']
let filterData = [];
let count = 0;
 let resume={};
let today = new Date();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log(today.getFullYear());
// let resume = [{ id: 0, Date: today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+"::"+time, Name: 'Mark', phone: 123456, Role: 'java', Visa: 'opt', Status: 'on bench', resume: '', details: '' },
//             { id: 1, Date: today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+"::"+time, Name: 'will', phone: 223456, Role: '.net', Visa: 'opt', Status: 'on project', resume: '', details: '' },
//             { id: 2, Date: today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+"::"+time, Name: 'kane', phone: 333456, Role: 'oracle', Visa: 'h1', Status: 'home project', resume: '', details: '' },
//             { id: 3, Date: today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+"::"+time, Name: 'peter', phone: 443456, Role: 'devops', Visa: 'h4', Status: 'on peoject', resume: '', details: '' },
//             { id: 4, Date: today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+"::"+time, Name: 'kin', phone: 123556, Role: 'db', Visa: 'gc', Status: 'consultancy', resume: '', details: '' },
//             { id: 5, Date: today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+"::"+time, Name: 'tin', phone: 123116, Role: 'hadoop', Visa: 'l1', Status: 'TC consultant', resume: '', details: '' },
//             { id: 6, Date: today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+"::"+time, Name: 'duffy', phone: 125556, Role: 'testing', Visa: 'stem opt', Status: '', resume: '', details: '' },
//             { id: 7, Date: today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+"::"+time, Name: 'sam', phone: 123499, Role: 'angular', Visa: 'opt', Status: 'on bench', resume: '', details: '' },
//             { id: 8, Date: today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+"::"+time, Name: 'ram', phone: 123475, Role: 'react', Visa: 'h1', Status: 'home project', resume: '', details: '' },
//             { id: 9, Date: today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+"::"+time, Name: 'krish', phone: 125556, Role: 'java', Visa: 'gc', Status: 'on bench', resume: '', details: '' }]
//comment
// let resume = [
//     {id: 0,Date: "28/08/2019", Name: 'Mark', phone: 123456, Role: 'java', Visa: 'opt', Status: 'on bench', resume: '', details: '' },
//     { id: 1,Date: "28/08/2019", Name: 'will', phone: 223456, Role: '.net', Visa: 'opt', Status: 'on project', resume: '', details: '' },
//     { id: 2,Date: "28/08/2019", Name: 'kane', phone: 333456, Role: 'oracle', Visa: 'h1', Status: 'home project', resume: '', details: '' }
// ]
class Customgrid extends Component {
    constructor(props) {
      //  count = 0;
        super(props)
        this.state = {
            username: "",
            rows: [],
            addprofileclicked: false,
            selectedIndexes:[],
            logout: false,
            data:{},
            newResume: false,
            oldResume: false,
            wip: false,
            showButton: false,
            profileData: {},
            showUpdate: false
        }
        //this.props.btn && search()
    }

    componentDidUpdate() {
        console.log("111111111111111111111");
        //this.search();
//count = 0;
    }

    componentWillReceiveProps() {
        console.log("222222222222222222222222")
    }
    profileData(data) {
        this.setState({profileData: data})
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    validate(e) {
        // const userRole = document.getElementById("id").value;
        // const username = document.getElementById("user_name").value
        console.log(this.state.rows);
        const userRole = this.state.role;
        const username = this.state.name;
        var result = this.state.rows.filter(function (v, i) {
            console.log(v.Name, v.Role, username, userRole);
            if(username && userRole) {
                return (((v.Name.toLowerCase()).includes(username.toLowerCase())) && 
                ((v.Role.toLowerCase()).includes(userRole.toLowerCase())));
            } else if(username && !userRole){
                return (((v.Name.toLowerCase()).includes(username.toLowerCase())))
            } else if(!username && userRole) {
                return ((v.Role.toLowerCase()).includes(userRole.toLowerCase()));
            }
            //return ((v["Name"] === username) || v.Role === userRole);
            
        })

        this.setState({
            rows: result
        })
    }
    clearsearch(e) {
        document.getElementById('role').value = '';
        document.getElementById('name').value = '';
        this.setState({
            rows: filterData
        })
    }
    addprofile(e) {
        // count = 0;
        this.setState({
            addprofileclicked: true
        })
    }
    updateprofile(e) {
        // count = 0;
        this.setState({
            updateprofileclicked: true
        })
    }
    handelprofile = () => {
        count = 0;
        this.setState({
            addprofileclicked: false,
            updateprofileclicked: false,
            selectedIndexes: []
        })
        
    }

    handelregister = () => {
        this.setState({
            updateprofileclicked: false,
            addprofileclicked: false,

        })
    }

    addresumes(e){
        this.setState({
            addresumesclicked:true,
            selectedIndexes: []
        })
    }

    logout() {
        this.setState({
            logout: true
        })
    }
    handelresume = () => {
        this.setState({
            addresumesclicked:false,
            selectedIndexes: []
        })

}
    onRowsSelected = rows => {
        count+=1;
        console.log(rows);
        this.setState({
        selectedIndexes: this.state.selectedIndexes.concat(
        rows.map(r => r.rowIdx)
        )
    });
    console.log(this.state.selectedIndexes);
    // if(this.state.selectedIndexes.length === 0) {
    if(count === 1) {
        this.setState({showButton: true});
    } else {
        this.setState({showButton: false});
    }
    };

    onRowsDeselected = rows => {
    count-=1;
    let rowIndexes = rows.map(r => r.rowIdx);

    this.setState({
        selectedIndexes: this.state.selectedIndexes.filter(
        i => rowIndexes.indexOf(i) === -1
        )
    });
    if(count === 1) {
        this.setState({showButton: true});
    } else {
        this.setState({showButton: false});
    }
    // this.setState({
    //     selectedIndexes: this.state.selectedIndexes.splice(this.state.selectedIndexes.indexOf(rowIndexes[0]),1)
    // });
    };
    newResume() {
        this.setState({newResume: true});
        //uncomment
        resume = this.state.data.newResourceDetailDTO.newResourceDetailList;
        console.log(resume);
        //  const resume = [
        //      {id: 0,Date: "28/08/2019", Name: 'Mark', phone: 123456, Role: 'java', Visa: 'opt', Status: 'on bench', resume: '', details: '' },
        //      { id: 1,Date: "28/08/2019", Name: 'will', phone: 223456, Role: '.net', Visa: 'opt', Status: 'on project', resume: '', details: '' },
        //      { id: 2,Date: "28/08/2019", Name: 'kane', phone: 333456, Role: 'oracle', Visa: 'h1', Status: 'home project', resume: '', details: '' }
        //  ]
        this.filteredData(resume);
    }
    wip() {
        this.setState({wip: true});
        //uncomment
    resume = this.state.data.wipResourceDetailDTO.wipResourceDetailList;
        this.filteredData(resume);
    }
    oldResume(){
        this.setState({oldResume: true});
        //uncomment
    resume = this.state.data.compResourceDetailDTO.compResourceDetailList;
        this.filteredData(resume);
    }

    uploadResume(index, file) {
        console.log(index,file);
        resume.forEach(z=> z.id == index ? (z.resume = file.name, z.details = (Math.floor(file.size/1024))+"Kb") : "")
        console.log(resume);
        this.filteredData(resume);
    }


   async downloadResume(id){
        console.log(id);
        let resumeRes = {};
        //----------
       await axios.get(`http://172.16.75.99:8443/trp/getResumeById/${id}`)
            .then(resume => {
                console.log(resume)
                resumeRes = resume;
            })
            .catch(err => {
                console.log(err);
            });
        let data = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + resumeRes.data.resumeDoc;
        console.log(data)
        console.log(resumeRes)
        //let mimeType = this.state.file.type;
        let fileName = resumeRes.data.resumeName;
        let encodedData = Base64.encode(data);
        console.log(fileName, encodedData);
        this.downloadURL(encodedData, fileName);
    };

    downloadURL = (data, fileName) => {
        console.log(data)
        let base64Data = Base64.decode(data)
        console.log(base64Data)
        var a;
        a = document.createElement('a');
        a.href = base64Data;
        a.download = fileName;
        document.body.appendChild(a);
        a.style = 'display: none';
        a.click();
        a.remove();
    };

    filteredData(fullData) {

        filterData = [];
        fullData.map(row=> {
        // fullData.map(singleRow=> {
            let rows = {}
            //uncomment all
            let {firstName, statusDTO, lastModifiedTs,resourceResumeDTOList, resourceId, primaryPhone, desiredPosition, resume, details} = row
            let resId = resourceResumeDTOList[0].resumeId;
            // console.log(resId);
            rows['Name'] = firstName;
            rows['Status'] = statusDTO.statusDesc;
            rows['Date'] = lastModifiedTs;
            rows['id'] = resourceId;
            rows['phone'] = primaryPhone;
            rows['Role'] = desiredPosition ? desiredPosition : 'N/A';
            rows['resume'] = resId && <CloudDownloadIcon onClick={() => this.downloadResume(resId)} fontSize="small"/>
            // rows['details'] = details;
            // rows['Name'] = singleRow.Name;
            // rows['Status'] = singleRow.Status;
            // rows['Date'] = singleRow.Date;
            // rows['id'] = singleRow.id;
            // rows['phone'] = singleRow.phone;
            // rows['Role'] = singleRow.Role;
            // rows['resume'] = singleRow.resume;
            // rows['details'] = singleRow.details;

            filterData.push(rows)
        });
        this.setState({rows: filterData})
    }

     componentDidMount() {
       let response =   new Promise(async(resolve, reject)=>{
        await fetch("http://172.16.75.99:8443/trp/searchResource",{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            },  body: JSON.stringify({}),
            })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if(result.responseCode.errorCode==="0"){
                    resolve(result);
                }
                else{
                    this.setState({errormessage:"Invalid User Id or Password."})
                }
                }
                )
            .catch(err => {
                console.log(err)
                this.setState({errormessage:"Something went wrong"})
                reject("Something went wrong");
            })
        })
        response.then(res => {
            this.setState({data: res})
            console.log(this.state.data)
        }).catch(err => {
            console.log(err)
            this.setState({errormessage:"Something went wrong"})
        })
        }

        search() {
            fetch("http://172.16.75.99:8443/trp/searchResource",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
                },  body: JSON.stringify({}),
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    if(result.responseCode.errorCode==="0"){
                        this.setState({data: result})
                        console.log(this.state.data)
                    }
                    else{
                        this.setState({errormessage:"Invalid User Id or Password."})
                    }
                    }
                    )
                .catch(err => {
                    console.log(err)
                    this.setState({errormessage:"Something went wrong"})
                })
            }
        
             componentWillMount() {
                let response =  new Promise(async(resolve, reject)=>{
                    await  fetch("http://172.16.75.99:8443/trp/searchResource",{
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'cache-control': 'no-cache',
                        },  body: JSON.stringify({}),
                        })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            if(result.responseCode.errorCode==="0"){
                                resolve(result);
                            }
                            else{
                                this.setState({errormessage:"Invalid User Id or Password."})
                            }
                            }
                            )
                        .catch(err => {
                            console.log(err)
                            this.setState({errormessage:"Something went wrong"})
                            reject("Something went wrong");
                        })
                    });

                    response.then(res => {
                        this.setState({data: res})
                        console.log(this.state.data)
                    }).catch(err => {
                        console.log(err)
                        this.setState({errormessage:"Something went wrong"})
                    })
               }


    render() {

        if (this.state.addprofileclicked) {
            // count = 0;
            return (
                <Profile addProfile={true} handelprofile={this.handelprofile} updateprofileflag={true}/>
            )
        }
        if (this.state.updateprofileclicked) {
            // count = 0;
            console.log(this.state.selectedIndexes, filterData[this.state.selectedIndexes]);
            console.log(this.state.data.newResourceDetailDTO.newResourceDetailList[this.state.selectedIndexes].resourceResumeDTOList[0].resumeId)
            return (
                // <Register handelregister={this.handelregister}/>
                // <Upload indexSelected={this.state.selectedIndexes} uploadResume={(index, file) => this.uploadResume(index, file)} handelresume={this.handelresume}/>
                //profileData={(data) => this.profileData(data)}
                //idSelected={this.state.data.id}
                
                <Profile resumeId={this.state.data.newResourceDetailDTO.newResourceDetailList[this.state.selectedIndexes].resourceResumeDTOList[0].resumeId} idSelected={filterData[this.state.selectedIndexes]} updateprofileflag={false} handelprofile={this.handelprofile} />
            
                )
        }
        if (this.state.addresumesclicked) {
            return (
                <Upload bulkUpload={true} uploadResume={() => this.uploadResume()} handelresume={() => this.handelresume()} search={() => this.search()}/>
            )
        }
        if(this.state.logout) {
//count=0;
            return(
                <App />
            )
        }

        return (
            <div>
            <br/>
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={() => this.newResume()}>New Resume</Button>
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={() => this.wip()}>Work in progress</Button>
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={() => this.oldResume()}>Old Resume</Button>
        <br/><br/><br/>
                <TextField
                    id="role"
                    label="Enter Role"
                    // name="User Id"
                    name='role'
                    style={{marginLeft: '10px'}}
                    onChange={(e) => this.handleChange(e)}
                />
                <TextField
                    id="name"
                    label="Enter Name"
                    // name="User name"
                    name = 'name'
                    style={{marginLeft: '10px'}}
                    onChange={(e) => this.handleChange(e)}
                />
                <Button type="submit" variant="contained" color="primary" onClick={(e) => this.validate(e)}>Search</Button>
                <br/><br/>
        <div>
            <Button type="submit" style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={(e) => this.clearsearch(e)}>Clear Search</Button>
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary" disabled={count>0 ? true : false} onClick={(e) => this.addprofile(e)}>Add Profile</Button>
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary"  disabled={(count>1 || count ===0) ? true : false} onClick={(e) => this.updateprofile(e)}>Update Profile</Button>
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={(e) => this.addresumes(e)}>Resume Bulk upload</Button>
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={(e) => this.logout(e)}>Logout</Button>
        </div>
        <br/>
                <div className="grid">
                    <ReactDataGrid
                        columns={columns}
                        rowGetter={i => this.state.rows[i]}
                        rowsCount={this.state.rows.length}
                        minHeight={700}
                        rowSelection={{
                            showCheckbox: true,
                            enableShiftSelect: false,
                            onRowsSelected: this.onRowsSelected,
                            onRowsDeselected: this.onRowsDeselected,
                            selectBy: {
                            indexes: this.state.selectedIndexes
                            }
                        }
                    }
                    />
                </div>
            </div>
        );
    }
}

export default Customgrid;
