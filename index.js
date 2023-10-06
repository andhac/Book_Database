const dbs = require("./datbase/index.js");
const bookModel = require("./datbase/books.js");
const express = require("express");
// console.log(dbs)
const app = express();
app.use(express.json());

//*************************************************************************************** */
//Adding Data to the database

// const book = new  bookModel({
//   ISBN: "IN01243",
//   title: "How to Be a God one",
//   author: [1],
//   language: "Sanskrit",
//   pubDate: "01-01-2000",
//   numPage: 69,
//   category: ["Fiction"],
//   publication: 1,
// })
// book.save()
// .then((book) => {
//   console.log("book saved")
// })
// .catch((err) => {
//   console.log('their is an '+ err)
// })

//*********************************************************************************************** */

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = require("./atlas_url.js");

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// const dbname = "Book_Api";
// const collection_name = "book";

// const connectToDatabase = async () => {
//   try {
//     await client.connect();
//     console.log(`Connected to the ${dbname} Database`);
//   } catch (err) {
//     console.log(`Error connecting to the database: ${err}`);
//   }
// };
// const documentFind = { ISBN: "1234THREE" };

// const main = async () => {
//   try {
//     await connectToDatabase();
//     // let result = await client
//     //   .db(dbname)
//     //   .collection(collection_name)
//     //   .findOne(documentFind);
//     // console.log("Data Found");
//     // console.log(result);
//   } catch (err) {
//     console.log(`Error connecting to the database: ${err}`);
//   } finally {
//     await client.close();
//   }
// };
// main();
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
app.get("/authors", (req, res) => {
  const getAllAuthors = dbs.author;
  return res.json(getAllAuthors);
});

//http://localhost:3000/author-id/1
app.get("/author-id/:id", (req, res) => {
  const { id } = req.params;
  const getSpecificAuthor = dbs.author.filter((author) => author.id == id);
  if (getSpecificAuthor.length === 0) {
    return res.json({ Error: `Author Not Found with this ID ${id}` });
  }
  return res.json(getSpecificAuthor);
});

//http://localhost:3000/author-isbn/1234ONE
app.get("/author-isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  const getSpecificAuthor = dbs.author.filter((author) =>
    author.books.includes(isbn)
  );
  if (getSpecificAuthor.length == 0) {
    return res.json({ Error: `Author Not Found with this ISBN ${isbn}` });
  }
  return res.json(getSpecificAuthor);
});

//http://localhost:3000/publications
app.get("/publications", (req, res) => {
  const getAllPublications = dbs.publication;
  return res.json(getAllPublications);
});

//http://localhost:3000/publication-id/1
app.get("/publication-id/:id", (req, res) => {
  const { id } = req.params;
  const getSpecificPublication = dbs.publication.filter(
    (publication) => publication.id == id
  );
  if (getSpecificPublication.length == 0) {
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
app.post("/author", (req, res) => {
  dbs.author.push(req.body);
  return res.json(dbs.author);
});

//http://localhost:3000/publication
app.post("/publication", (req, res) => {
  dbs.publication.push(req.body);
  return res.json(dbs.publication);
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

//Delte Api 
app.delete("/book-delete/:isbn",async (req,res)=>{
  const {isbn} = req.params;
  const deleteBook = await bookmodel.deleteOne({ISBN: isbn});
  if(deleteBook.deletedCount === 0){
    return res.json({Error: `Book Not Found with this ISBN ${isbn}`});
  }

  return res.json({
    bookDeleted: deleteBook,
    console: `Book was Deleted`,
  });
});


app.listen(3000, () => {
  console.log("Server Started");
});
