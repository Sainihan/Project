const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
let port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const { rmSync } = require("fs");
const { exit } = require("process");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "first_app",
  password: "1234",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
};
// Home Route
app.get("/", (req, res) => {
  let q = `select count(*) from user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      // console.log(result[0]["count(*)"]);
      // res.send("success");
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

app.get("/user", (req, res) => {
  //res.send("success request");
  let q = `select * from user `;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      //console.log(result[1]);
      let users = result;
      res.render("show.ejs", { users });
    });
  } catch (err) {
    res.send("some error in the Database");
  }
});

//Edit Route

app.get("/user/:id/edit", (req, res) => {
  // res.send("edit option enables");
  let { id } = req.params;
  // console.log(id);
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    res.send("some error in the DB");
  }
  // res.render("edit.ejs");
});

// update route

app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formpass, username: newusername } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formpass != user.password) {
        res.send("Wrong Password");
      } else {
        let q2 = `update user set username='${newusername} ' where id='${id}' `;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    res.send("some error in the DB");
  }
});
// Add new user

app.get("/user/new", (req, res) => {
  // res.send("added new user");
  res.render("new.ejs");
});

app.post("/user/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();

  //  query to add new user

  let q = `insert into user (id ,username , email, password) values ('${id}','${username}','${email}','${password}')`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      console.log("added new user");
      res.redirect("/user");
    });
  } catch (err) {
    res.send("some error in the DB");
  }
});

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  // res.send(" Deleting the user");
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("some error in the DB");
  }
});

app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);             // hoppscoth working fine
      let user = result[0];
      if (user.password != password) {
        res.send(" Wrong password  Go back and Try again !");
      } else {
        let q2 = ` delete from user where id = '${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;

          console.log(result);
          console.log(" User Deleted");
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    res.send("some error in the DB");
  }
});

app.listen(port, (req, res) => {
  console.log(`The server is running on the port ${port}`);
});
