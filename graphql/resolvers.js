const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Author = require("../models/Author");
const Book = require("../models/Book");
const User = require("../models/User");

const SECRET_KEY = process.env.JWT_SECRET

const resolvers = {
  Query: {
    getAuthors: async () => await Author.find(),
    getAuthor: async (_, { id }) => await Author.findById(id),
    getBooks: async () => await Book.find(),
    getBook: async (_, { id }) => await Book.findById(id),

   
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user.id);
    },
  },

  Mutation: {
   
    register: async (_, { input }) => {
      const { name, email, password } = input;

      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ id: newUser._id }, SECRET_KEY, {
        expiresIn: "7d",
      });

      return { token, user: newUser };
    },

    login: async (_, { input }) => {
      const { email, password } = input;

      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ id: user._id }, SECRET_KEY, {
        expiresIn: "7d",
      });

      return { token, user };
    },

    createAuthor: async (_, { input }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const author = new Author(input);
      return await author.save();
    },

    createBook: async (_, { input }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const book = new Book(input);
      return await book.save();
    },

    updateBook: async (_, { id, input }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return await Book.findByIdAndUpdate(id, input, { new: true });
    },

    deleteBook: async (_, { id }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      await Book.findByIdAndDelete(id);
      return "Book deleted successfully";
    },
  },

  Author: {
    books: async (parent) => await Book.find({ authorId: parent.id }),
  },

  Book: {
    author: async (parent) => await Author.findById(parent.authorId),
  },
};

module.exports = resolvers;