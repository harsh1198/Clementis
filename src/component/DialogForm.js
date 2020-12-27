import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useInput from './useInput';
import Axios from "axios";

const heading = {
    fontSize: '30px',
    color: 'green'
}

function DialogForm() {
    const [open, setOpen] = useState(false);
    const [firstname,bindFirstName, resetFirstName] = useInput('')
    const [lastname,bindLastName, resetLastName] = useInput('')
    const [emailid,bindEmailid, resetEmailid] = useInput('')
    const [bio,bindBio, resetBio] = useInput('')
    const [date,bindDate, resetDate] = useInput(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`)
    const [ferr,setferr] = useState(false);
    const [lerr,setlerr] = useState(false);
    const [eerr,seteerr] = useState(false);
    const [derr,setderr] = useState(false);
    const [berr,setberr] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitHandler = e => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(firstname==='') {
          e.preventDefault();
          setferr(true);
          setferr(firstname==='')
        }
        else if(lastname==='') {
          e.preventDefault();
          setlerr(true);
        }
        else if(emailid==='' || !pattern.test(emailid)) {
          console.log(emailid);
          e.preventDefault();
          seteerr(true);
        }
        else if(date==={date}) {
          e.preventDefault();
          setderr(true);
        }
        else if(bio==='') {
          e.preventDefault();
          setberr(true);
        }
        else {
            alert(`Hello ${firstname} ${lastname} ${emailid} ${bio} ${date}`);
            console.log(`Hello ${firstname} ${lastname} ${emailid} ${bio} ${date}`)
            Axios.post("http://localhost:3001/api/insert",
            {
              Firstname: firstname, 
              Lastname: lastname, 
              Emailid: emailid, 
              Dob: date, 
              Bio: bio
            }).then(() => {
              alert("Successfully Inserted!!")
            })
            resetFirstName()
            resetLastName()
            resetEmailid()
            resetDate()
            resetBio()
        }
    }

    return (
        <div>
            <Button style={heading} color="primary" onClick={handleClickOpen}>Create</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Clementis Form</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Short Form
              </DialogContentText>
              <div>
                  <TextField
                    autoFocus
                    id="outlined-basic" 
                    label="First Name" 
                    variant="outlined"
                    {...bindFirstName}
                    error={ferr && firstname===''}
                    helperText="Enter Your First Name"
                  />
                </div><br/>
                <div>
                  <TextField 
                    id="outlined-basic" 
                    label="Last Name" 
                    variant="outlined"
                    {...bindLastName}
                    error={lerr && lastname===''}
                    helperText="Enter Your Last Name"
                    />
                </div><br/>
                <div>
                  <TextField 
                    id="outlined-basic" 
                    label="Email ID" 
                    variant="outlined"
                    {...bindEmailid}
                    error={eerr && emailid===''}
                    helperText="Enter Your Email ID"
                    />
                </div><br/>
                <div>
                  <TextField
                    {...bindDate}
                    id="date"
                    label="DOB"
                    type="date"
                    // defaultValue="2017-05-24"
                    defaultValue={date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={derr && date==={date}}
                    helperText="Enter Your Proper DOB"
                  />
                </div><br/>
                <div>
                  <TextField
                    margin="dense"
                    id="name"
                    label="Short Bio"
                    type="text"
                    fullWidth
                    {...bindBio}
                    error={berr && bio===''}
                    helperText="Enter Your Short Bio"
                  />
                </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={submitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog><br/>
        </div>
    )
}
export default DialogForm;