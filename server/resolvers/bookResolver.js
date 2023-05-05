const { Book } = require("../models/Book");
const fs = require("fs");
// const { GraphQLUpload } = require('graphql-upload');

const bookResolver = {
    // Upload: GraphQLUpload,
  Mutation: {
    createBook: async (parent, { input, coverImage }) => {
        const newBook = new Book({ ...input });

        if (coverImage) {
          // Get the extension of the image file
          const extension = coverImage.filename.split(".").pop();
          // Generate a unique filename for the image
          const filename = `${newBook.id}.${extension}`;
          // Save the image file to the server folder
          await coverImage.createReadStream().pipe(fs.createWriteStream(`./public/images/${filename}`));
          // Update the book object with the image filename
          newBook.coverImage = filename;
        }
  
        await newBook.save();
        return newBook;
    },
    updateBook: async (parent, { id, type }) => {
        const book = await Book.findById(id);
        if (!book) {
          throw new Error(`Book with ID ${id} not found`);
        }
        console.log(id, type);
        Object.assign(book, {type});
        await book.save();
        return book;
    },
  },
  Query: {
    books: async () => {
      const books = await Book.find();
      return books;
    },
    book: async (parent, { id }) => {
      const book = await Book.findById(id);
      if (!book) {
        throw new Error("Book not found");
      }
      return book;
    },
  },
};

module.exports = { bookResolver };
