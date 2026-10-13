const axios = require('./final_project/node_modules/axios');

const BASE_URL = 'http://localhost:5000';

async function getAllBooks() {
    const response = await axios.get(`${BASE_URL}/`);
    console.log(response.data);
}

async function getBooksByISBN(isbn) {
    const response = await axios.get(`${BASE_URL}/isbn/${encodeURIComponent(isbn)}`);
    console.log(response.data);
}

async function getBooksByAuthor(author) {
    const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
    console.log(response.data);
}

async function getBooksByTitle(title) {
    const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
    console.log(response.data);
}

async function main() {
    try {
        const [task, ...args] = process.argv.slice(2);

        if (task === 'all') await getAllBooks();
        else if (task === 'isbn') await getBooksByISBN(args[0]);
        else if (task === 'author') await getBooksByAuthor(args.join(' '));
        else if (task === 'title') await getBooksByTitle(args.join(' '));
        else console.log('Use: node general.js all | isbn ISBN | author NAME | title TITLE');
    } catch (error) {
        console.error('Request failed:', error.message);
    }
}

main();
