const Book = require("../models/Book");

const resolvers = {
  Query: {
    getBooks: async () => await Book.find(),
    getBook: async (_, { id }) => await Book.findById(id),
  },

  Mutation: {
    createBook: async (_, { input }) => {
      const newBook = new Book(input);
      await newBook.save();
      return newBook;
    },
    updateBook: async (_, { id, input }) => {
      return await Book.findByIdAndUpdate(id, input, { new: true });
    },
    deleteBook: async (_, { id }) => {
      await Book.findByIdAndDelete(id);
      return "Book deleted successfully";
    },
  },
};

module.exports = resolvers;