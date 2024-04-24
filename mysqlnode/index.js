const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const methodoverride = require("method-override");
app.use(methodoverride("_method"));
app.use(express.urlencoded({ extended : true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'afroz',
    password: 'mysql@00123'
  });

app.get("/",(req,res)=>{
  let p = `select count(*) from nodejs`;
   try {
      connection.query(p,(err,result)=>{
        if (err) throw err;
        let count = result[0]["count(*)"];
       res.render("home",{count});
      })
     } catch (err) {
      res.send("some err in db");
     }
});


app.get("/user",(req,res)=>{
  let p = `select * from nodejs`;
  try {
    connection.query(p,(err,users)=>{
      if (err) throw err;
      // console.log(result);
      // res.send(result);
      res.render("show",{users});
    })
   } catch (err) {
    res.send("some err in db");
   }
})

app.get("/user/:id/edit",(req,res)=>{
  let {id} = req.params;
  let p = `select * from nodejs where id='${id}'`;
  try {
    connection.query(p,(err,result)=>{
      if (err) throw err;
     let user = result[0];
      res.render("edit",{user});
    })
   } catch (err) {
    res.send("some err in db");
   }
});
app.get("/user/:id/delete",(req,res)=>{
  let {id} = req.params;
  console.log(id);
  res.render("delete")
});
app.patch("/user/:id",(req,res)=>{
  let {id} = req.params;
  let {password:formpassword,username:newusername} = req.body;
  let p = `select * from nodejs where id='${id}'`;
  try {
    connection.query(p,(err,result)=>{
      if (err) throw err;
     let user = result[0];
     if (formpassword != user.password) {
         res.send("worng password");
     }
     else{
      let p2 = `update nodejs set username='${newusername}' where id='${id}'`;
        connection.query(p2,(err,result)=>{
          if (err) throw err;
          res.send(result);
        })
     }
    });
   } catch (err) {
    res.send("some err in db");
   }
});
app.listen(port,(err)=>{
  console.log('connected');
})













 // try {
    //   connection.query(p,[data],(err,result)=>{
    //     if (err) throw err;
    //     console.log(result);
    //     console.log(result.length);
    //   })
    //  } catch (err) {
      
    //  }
    //  connection.end();


 // let createRandomUser = () => {
  //   return [
  //      faker.string.uuid(),
  //      faker.internet.userName(),
  //      faker.internet.email(),
  //      faker.internet.password(),
  //   ]
  // };