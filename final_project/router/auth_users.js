const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    let userswithsamename = users.username === username;

    if (userswithsamename) {
        return false;
    } else {
        return true;
    }
}

const authenticatedUser = (username,password)=>{ 
    let validusers = users.filter((user) => user.username === username && user.password === password);
    if (validusers) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error Logging in"});
  }

  //Authenticate user
  if (authenticatedUser(username, password)) {
    //Generate JWT accessToken 
    let accessToken = jwt.sign({
        data: password
    }, 'access', {expiresIn: 60 * 60})

    req.session.authorization = {
        accessToken, username
    };
    return res.status(200).json({message: "User successfully logged in"})
  } else {
    return res.status(404).json({message: "Invalid Login. Check username and password."})
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
