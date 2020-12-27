const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'clemetis',
});

app.get('/', (req,res) => {
    // const sqlInsert="insert into form(FirstName,LastName,EmailId,DOB,Bio) values ('Harsh','Modi','harshmodi480@gmail.com','11-11-1998','Hello');"
    // db.query(sqlInsert, (error, result) => {
        
    // });
    res.send("Hello World");
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get',(req,res) => {

    const Firstname=req.body.Firstname
    const Lastname=req.body.Lastname
    const Emailid=req.body.Emailid
    const Dob=req.body.Dob
    const Bio=req.body.Bio

    const sqlSelect="select * from form;"
    db.query(sqlSelect, [Firstname,Lastname,Emailid,Dob,Bio], (error, result) => {
        res.send(result)
    });
});

app.post('/api/insert',(req,res) => {

    const Firstname=req.body.Firstname
    const Lastname=req.body.Lastname
    const Emailid=req.body.Emailid
    const Dob=req.body.Dob
    const Bio=req.body.Bio

    const sqlInsert="insert into form(FirstName,LastName,EmailId,DOB,Bio) values (?,?,?,?,?);"
    db.query(sqlInsert, [Firstname,Lastname,Emailid,Dob,Bio], (error, result) => {
        console.log(result)
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});