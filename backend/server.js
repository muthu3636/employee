const express = require("express");
const bodyParser=require("body-parser");
const cors =require("cors");

const mysql=require("mysql2")
const app=express();
const port=process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'muthumysql',
    database: 'employee_database',
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connected to the MySql database');
});
// app.post('/employee',(req,res) => {
//     const employeeData = req.body;
//     const sql = 'INSERT INTO employee SET ?';
//     db.query(sql, employeeData, (err,result) => {
//         if(err){
//             console.error('Error inserting employee:',err);
//             res.status(500).send('Error inserting employee')
//         }
//         else{
//             console.log('Employee inserted successfully:',result);
//             res.status(200).send('Employee inserted successfully');
//         }
//     });
// });
db.connect((err) => {
    if (err) {
      console.log("Error in MySQL connection", err);
    } else {
      console.log("Success");
    }
  });
  app.post('/submit', (req, res) => {
      const { empname, empId, department, dob, gender, phonenumber, salary } = req.body;
    db.query('INSERT INTO employee_details(empname, empId, department, dob, gender, phonenumber, salary) VALUES (?,?,?,?,?,?,?)', [empname, empId, department, dob, gender,phonenumber, salary], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('internal error');
      } else {
        console.log("1 record inserted");
        res.status(200).json({ message: 'Form submitted successfully' });
      }
    });
  });
app.listen(port,()=>{
    console.log("Listening Port : "+port);    
});