require('dotenv').config(); 

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return { user };
      } catch (err) {
        console.error("Invalid token");
      }
    }
    return {};
  },
});



server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});