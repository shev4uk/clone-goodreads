const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
// const { resolvers } = require("./resolvers/resolvers");
const { bookResolver } = require('./resolvers/bookResolver');
const { userResolver } = require('./resolvers/userResolver');
const { typeDefs } = require("./models/typeDefs");


const MONGO_URI = "mongodb://127.0.0.1:27017/goodreads";

// Database connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch(err => {
    console.log(err);
    console.log(err.message);
  });

const server = new ApolloServer({ 
  typeDefs, 
  resolvers: [userResolver, bookResolver]
});

startStandaloneServer(server, {
  listen: { port: 5000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});