const express = require('express');
let books = require("./booksdb.js");
const axios = require("axios");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
        users.push({ "username": username, "password": password});
        return res.status(200).json({ message: "User successfully login"});
    } else {
        return res.status(404).json({message: "User already exist!"})
    }
  }
  return res.status(404).json({message: "Unable to register user."})
});


//Getting all books using axios
async function getAllBooks() {
    try {
        let res = await axios.get("/");
        res.send(JSON.stringify(books, null, 4))
    } catch (err) {
        console.log(err);
    }
}
getAllBooks();

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4))
});

//Get book details based on ISBN using axios
async function getBookByISBN() {
    try {
        let res = await axios.get("/isbn/:isbn");
        const isbn = req.params.  isbn;
        res.send(books[isbn]);
    } catch (err) {
        console.log(err);
    }
}
getBookByISBN();

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);  
 });


 //Get book details based on author using axios
 async function getAuthoredBook() {
    try {
        let res = await axios.get("/author/:author");
        const author = req.params.author;
        const keys = Object.values(books);
        let authoredBook = keys.filter((book) => book.author === author);
        res.send(authoredBook);
    } catch (err) {
        console.log(err);
    }
}
getAuthoredBook();
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
   const author = req.params.author;
   const keys = Object.values(books);
   let authorBook = keys.filter((book) => book.author === author);
   res.send(authorBook);
});


// Get all books based on title using axios
async function getTitledBook() {
    try {
        let res = await axios.get("/title/:title");
        const title = req.params.title;
        const keys = Object.values(books);
        let titledBook = keys.filter((book) => book.title === title);
        res.send(titledBook);
    } catch (err) {
        console.log(err);
    }
}
getTitledBook();

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const keys = Object.values(books);
  let titledBook = keys.filter((book) => book.title === title);
  res.send(titledBook);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let bookReview = books[isbn].reviews;
  res.send(bookReview);
});

module.exports.general = public_users;
