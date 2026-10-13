const express = require('express');

const books = require('./booksdb.js');
const authUsers = require('./auth_users.js');

const isValid = authUsers.isValid;
const users = authUsers.users;

const public_users = express.Router();

// Task 6: Register a new user
public_users.post('/register', (req, res) => {
const username = req.body.username;
const password = req.body.password;

if (!username || !password) {
    return res.status(400).json({
        message: 'Username and password are required'
    });
}

if (isValid(username)) {
    return res.status(409).json({
        message: 'Username already exists'
    });
}

users.push({ username, password });

return res.status(200).json({
    message: 'User successfully registered. Now you can log in'
});

});

// Task 1: Get all books
public_users.get('/', (req, res) => {
return res.status(200).json(books);
});

// Task 2: Get book by ISBN
public_users.get('/isbn/:isbn', (req, res) => {
const isbn = req.params.isbn;

if (books[isbn]) {
    return res.status(200).json(books[isbn]);
}

return res.status(404).json({
    message: 'Book not found'
});

});

// Task 3: Get books by author
public_users.get('/author/:author', (req, res) => {
const author = req.params.author.toLowerCase();

const result = Object.keys(books)
    .filter(isbn => books[isbn].author.toLowerCase() === author)
    .map(isbn => books[isbn]);

return res.status(200).json(result);

});

// Task 4: Get books by title
public_users.get('/title/:title', (req, res) => {
const title = req.params.title.toLowerCase();

const result = Object.keys(books)
    .filter(isbn => books[isbn].title.toLowerCase() === title)
    .map(isbn => books[isbn]);

return res.status(200).json(result);

});

// Task 5: Get book reviews by ISBN
public_users.get('/review/:isbn', (req, res) => {
const isbn = req.params.isbn;

if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews || {});
}

return res.status(404).json({
    message: 'Book not found'
});

});

module.exports.general = public_users;
