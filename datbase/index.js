let books = [
  {
    ISBN: "1234ONE",
    title: "The Lord of the Rings",
    author: [1],
    language: "en",
    pubDate: "2000-01-01",
    numOfPage: 100,
    category: ["Fantasy", "Adventure", "Action", "Thriller", "Horror"],
    publication: 1,
  },
  {
    ISBN: "1234TWO",
    title: "Harry Potter and the Philosopher's Stone",
    author: [2],
    language: "en",
    pubDate: "1997-01-01",
    numOfPage: 300,
    category: ["Fantasy", "Adventure", "Action", "Thriller"],
    publication: 1,
  }
  
];
let author = [
  {
    id: 1,
    name: "J. R. R. Tolkien",
    books: ["1234ONE"],
  },
  {
    id: 2,
    name: "J. K. Rowling",
    books: ["1234TWO"],
  }

];
let publication = [
  {
    id: 1,
    name: "HarperCollins Publication",
    books: ["1234ONE", "1234TWO"],
  },
  {
    id: 2,
    name: "Bloomsbury Publishing",
    books: [],
  }
];

module.exports = {
  books,
  author,
  publication,
};
