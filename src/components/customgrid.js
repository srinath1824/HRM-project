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

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'Date', name: 'Date' },
    { key: 'Name', name: 'Name' },
    { key: 'phone', name: 'Phone' },
    { key: 'Role', name: 'Role' },
    { key: 'Status', name: 'Status' },
    { key: 'resume', name: 'resume' },
    { key: 'details', name: 'Details' }
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
        this.setState({
            rows: filterData
        })
    }
    addprofile(e) {

        this.setState({
            addprofileclicked: true
        })
    }
    updateprofile(e) {

        this.setState({
            updateprofileclicked: true
        })
    }
    handelprofile = () => {
        this.setState({
            addprofileclicked: false,
            updateprofileclicked: false

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
            addresumesclicked:true
        })
    }

    logout() {
        this.setState({
            logout: true
        })
    }
    handelresume = () => {
        this.setState({
            addresumesclicked:false
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
    // uploadResume(index, file) {
    //     console.log(index,file);
    //     resume.forEach(z=> z.id == index ? (z.resume = file.name, z.details = (Math.floor(file.size/1024))+"Kb") : "")
    //     console.log(resume);
    //     this.filteredData(resume);
    // }
    uploadResume(index, file) {
        console.log(index,file);
        resume.forEach(z=> z.id == index ? (z.resume = file.name, z.details = (Math.floor(file.size/1024))+"Kb") : "")
        console.log(resume);
        this.filteredData(resume);
    }

    downloadResume(id){
        console.log(id);
        fetch(`http://172.16.75.99:8443/trp/getResumeById/${id}`)
            .then(t => {
                return t.blob().then( b => {
                    var a = document.createElement("a");        
                    a.href = URL.createObjectURL(b);
                    a.download = `${id}_file.docx`;
                    // a.setAttribute("download", id);
                    a.click();
                    alert("Downloaded successfully");
                });
            });
    }

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
            rows['details'] = details;
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
    render() {
        if (this.state.addprofileclicked) {
            return (
                <Profile addProfile={true} handelprofile={this.handelprofile} updateprofileflag={true}/>
            )
        }
        if (this.state.updateprofileclicked) {
            console.log(this.state.selectedIndexes, filterData[this.state.selectedIndexes]);
            return (
                // <Register handelregister={this.handelregister}/>
                // <Upload indexSelected={this.state.selectedIndexes} uploadResume={(index, file) => this.uploadResume(index, file)} handelresume={this.handelresume}/>
                //profileData={(data) => this.profileData(data)}
                //idSelected={this.state.data.id}
                <Profile idSelected={filterData[this.state.selectedIndexes]} updateprofileflag={false} handelprofile={this.handelprofile} />
            
                )
        }
        if (this.state.addresumesclicked) {
            return (
                <Upload bulkUpload={true} uploadResume={() => this.uploadResume()} handelresume={() => this.handelresume()}/>
            )
        }
        if(this.state.logout) {
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
                    id="id"
                    label="Enter Role"
                    // name="User Id"
                    name='role'
                    style={{marginLeft: '10px'}}
                    onChange={(e) => this.handleChange(e)}
                />
                <TextField
                    id="user_name"
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
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={(e) => this.addprofile(e)}>Add profile</Button>
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary" disabled= {!this.state.showButton} onClick={(e) => this.updateprofile(e)}>Update profile</Button>
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={(e) => this.addresumes(e)}>Resume Bulk upload</Button>
            <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={(e) => this.logout(e)}>Logout</Button>
        </div>
        <br/>
                <div className="grid">
                    <ReactDataGrid
                        columns={columns}
                        rowGetter={i => this.state.rows[i]}
                        rowsCount={this.state.rows.length}
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
