const express = require("express");
require("dotenv").config();
const { ApolloServer} = require('apollo-server-express')
const typeDefs = require('./typedef');
const resolvers = require('./resolver')

async function startServer(){

  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app }); //by default takes /graphql
  
  //for any other routes
  app.use((req,res)=>{
    res.send("hello from express apollo server")
  })
  app.listen(5000, () => {
    console.log("server running");
  });
}
startServer();





