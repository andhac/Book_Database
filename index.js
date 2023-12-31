const dbs = require("./datbase/index.js");
const bookModel = require("./datbase/books.js");
const authorModel = require("./datbase/author.js");
const publicationModel = require("./datbase/publication.js");
const express = require("express");
// console.log(dbs)
const app = express();
app.use(express.json());

let mongoose = require("mongoose");
let uri = require("./atlas_url.js");
const bookmodel = require("./datbase/books.js");
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the Database 🌍");
  });

//http://localhost:3000
app.get("/", (req, res) => {
  res.send("Welcome to my Book API");
});

//http://localhost:3000/books
app.get("/books", async (req, res) => {
  const getAllBooks = await bookModel.find();
  return res.json(getAllBooks);
});

//http://localhost:3000/book-isbn/1234THREE
app.get("/book-isbn/:isbn", async (req, res) => {
  const { isbn } = req.params;
  // const isbn = req.params.isbn; //same as above
  const getSpecificBook = await bookModel.findOne({ ISBN: isbn });
  if (getSpecificBook == null) {
    // remove . length === 0 because findOne not return array it return object
    return res.json({ Error: `Book Not Found with this ISBN${isbn}` });
  }
  return res.json(getSpecificBook);
});

//http://localhost:3000/book-cate/1234ONE
app.get("/book-cate/:category", async (req, res) => {
  const { category } = req.params;

  const getSpecificBook = await bookModel.find({ category: category }); //includes is used to check if the category is present in the array or not
  if (getSpecificBook.length === 0) {
    return res.json({ Error: `Book Not Found with this Category ${category}` });
  }
  return res.json(getSpecificBook);
});

//http://localhost:3000/authors
app.get("/authors", async (req, res) => {
  const getAllAuthors = await authorModel.find();
  return res.json(getAllAuthors);
});

//http://localhost:3000/author-id/1
app.get("/author-id/:id", async (req, res) => {
  const { id } = req.params;
  const getSpecificAuthor = await authorModel.findOne({ id: id });
  if (getSpecificAuthor == null) {
    return res.json({ Error: `Author Not Found with this ID ${id}` });
  }
  return res.json(getSpecificAuthor);
});

//http://localhost:3000/author-isbn/1234ONE
app.get("/author-isbn/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const getSpecificAuthor = await authorModel.find({ books: isbn });

  if (getSpecificAuthor.length == 0) {
    return res.json({ Error: `Author Not Found with this ISBN ${isbn}` });
  }
  return res.json(getSpecificAuthor);
});

//http://localhost:3000/publications
app.get("/publications", async (req, res) => {
  const getAllPublications = await publicationModel.find();
  return res.json(getAllPublications);
});

//http://localhost:3000/publication-id/1
app.get("/publication-id/:id", async (req, res) => {
  const { id } = req.params;
  const getSpecificPublication = await publicationModel.findOne({ id: id });
  if (getSpecificPublication == null) {
    return res.json({ Error: `Publication Not Found with this ID ${id}` });
  }
  return res.json(getSpecificPublication);
});

//POST API'S

//http://localhost:3000/book
app.post("/book", async (req, res) => {
  const addNewBook = await bookModel.create(req.body);
  return res.json({
    book: addNewBook,
    console: `Book was added`,
  });
});

//http://localhost:3000/author
app.post("/author", async (req, res) => {
  const addNewAuthor = await authorModel.create(req.body);
  return res.json({
    author: addNewAuthor,
    console: `Author was added`,
  });
});

//http://localhost:3000/publication
app.post("/publication", async (req, res) => {
  const addNewPublication = await publicationModel.create(req.body);
  return res.json({
    publication: addNewPublication,
    console: `Publication was added`,
  });
});

//PUT API'S
//http://localhost:3000/book-update/125H5
app.put("/book-update/:isbn", async (req, res) => {
  const { isbn } = req.params;

  const updateBook = await bookmodel.findOneAndUpdate(
    {
      ISBN: isbn,
    },
    req.body,
    {
      new: true,
    }
  );
  return res.json({
    bookUpdated: updateBook,
    console: `Book was updated`,
  });
});
//http://localhost:3000/author-update/3
app.put("/author-update/:id", async (req, res) => {
  const { id } = req.params;
  const updateAuthor = await authorModel.findOneAndUpdate(
    {
      id: id,
    },
    req.body,
    {
      new: true,
    }
  );
  return res.json({
    authorUpdate: updateAuthor,
    console: "Author Updated",
  });
});
//http://localhost:3000/publication-update/2
app.put("/publication-update/:id", async (req, res) => {
  const { id } = req.params;
  const updatePublication = await publicationModel.findOneAndUpdate(
    {
      id: id,
    },
    req.body,
    {
      new: true,
    }
  );
  return res.json({
    publicationUpdate: updatePublication,
    console: "Publication Updated",
  });
});

//Delte Api

//http://localhost:3000/book-delete/IN0123
app.delete("/book-delete/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const deleteBook = await bookmodel.deleteOne({ ISBN: isbn });
  if (deleteBook.deletedCount === 0) {
    return res.json({ Error: `Book Not Found with this ISBN ${isbn}` });
  }

  return res.json({
    bookDeleted: deleteBook,
    console: `Book was Deleted`,
  });
});
//http://localhost:3000/book-delete-author/125H5/2

app.delete("/book-delete-author/:isbn/:id", async (req, res) => {

  const { isbn, id } = req.params;
  const getSpecificBook = await bookmodel.findOne({ ISBN: isbn });
  if (getSpecificBook === null) {
    return res.json({ Error: `Book Not Found with this ISBN ${isbn}` });
  } else {
    getSpecificBook.author = getSpecificBook.author.filter(author => author != id);
    await getSpecificBook.save();
    const updateBook = await bookmodel.findOneAndUpdate(
      {
        ISBN: isbn,
      },
      getSpecificBook,
      {
        new: true,
      }
    );
    return res.json({
      bookUpdated: updateBook,
      console: `Book was updated`,
    });
  }
});

//
//http://localhost:3000/author-delete
app.delete("/author-delete/:id", async (req, res) => {
  const { id } = req.params;
  const deleteAuthor = await authorModel.deleteOne({ id: id });
  if (deleteAuthor.deletedCount == 0) {
    return res.json({ Error: `With id ${id} their is no author` });
  }
  return res.json({
    authorDeleted: deleteAuthor,
    console: "Author Was deleted",
  });
});

//http://localhost:3000/publication-delete
app.delete("/publication-delete/:id", async (req, res) => {
  const { id } = req.params;
  const deletePublication = await publicationModel.deleteOne({ id: id });
  if (deletePublication.deletedCount == 0) {
    return res.json({ Error: `With this id ${id} their is no publication` });
  }
  return res.json({
    publicationDelete: deletePublication,
    console: "Publication Deleted ",
  });
});

//404 Page

app.get("*", (req, res) => {
  res.send(`
        <div style="display: flex; height: 100vh; justify-content: center; align-items: center; color: red;">
          <h1>Sorry Page Not Found</h1>
        </div>
      `);
});
app.listen(3000, () => {
  console.log("Server Started");
});
