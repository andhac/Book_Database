const db = require("./datbase/index.js");
const express = require("express");
// console.log(db)
const app = express();
app.use(express.json());

//http://localhost:3000
app.get("/", (req, res) => {
  res.send("Welcome to my Book API");
});

//http://localhost:3000/books
app.get("/books", (req, res) => {
  const getAllBooks = db.books;
  return res.json(getAllBooks);
});

//http://localhost:3000/book-isbn/1234ONE
app.get("/book-isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  // const isbn = req.params.isbn; //same as above
  const getSpecificBook = db.books.filter((book) => book.ISBN == isbn);
  if (getSpecificBook.length === 0) {
    return res.json({ Error: `Book Not Found with this ISBN${isbn}` });
  }
  return res.json(getSpecificBook);
});

//http://localhost:3000/book-cate/1234ONE
app.get("/book-cate/:category", (req, res) => {
  const { category } = req.params;

  const getSpecificBook = db.books.filter((book) =>
    book.category.includes(category)
  ); //includes is used to check if the category is present in the array or not
  if (getSpecificBook.length === 0) {
    return res.json({ Error: `Book Not Found with this Category ${category}` });
  }
  return res.json(getSpecificBook);
});

//http://localhost:3000/authors
app.get("/authors", (req, res) => {
  const getAllAuthors = db.author;
  return res.json(getAllAuthors);
});

//http://localhost:3000/author-id/1
app.get("/author-id/:id", (req, res) => {
  const { id } = req.params;
  const getSpecificAuthor = db.author.filter((author) => author.id == id);
  if (getSpecificAuthor.length === 0) {
    return res.json({ Error: `Author Not Found with this ID ${id}` });
  }
  return res.json(getSpecificAuthor);
});

//http://localhost:3000/author-isbn/1234ONE
app.get("/author-isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  const getSpecificAuthor = db.author.filter((author) =>
    author.books.includes(isbn)
  );
  if (getSpecificAuthor.length == 0) {
    return res.json({ Error: `Author Not Found with this ISBN ${isbn}` });
  }
  return res.json(getSpecificAuthor);
});

//http://localhost:3000/publications
app.get("/publications", (req, res) => {
  const getAllPublications = db.publication;
  return res.json(getAllPublications);
});

//http://localhost:3000/publication-id/1
app.get("/publication-id/:id", (req, res) => {
  const { id } = req.params;
  const getSpecificPublication = db.publication.filter(
    (publication) => publication.id == id
  );
  if (getSpecificPublication.length == 0) {
    return res.json({ Error: `Publication Not Found with this ID ${id}` });
  }
  return res.json(getSpecificPublication);
});

//POST API'S

//http://localhost:3000/book
app.post("/book", (req, res) => {
console.log(req.body)
  db.books.push(req.body);
  return res.json(db.books);
});

//http://localhost:3000/author
app.post("/author",(req,res)=>{
  db.author.push(req.body)
  return res.json(db.author)
})

//http://localhost:3000/publication
app.post("/publication",(req,res)=>{
  db.publication.push(req.body)
  return res.json(db.publication)
})

app.listen(3000, () => {
  console.log("Server Started");
});
