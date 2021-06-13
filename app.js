var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const http = require("http");

var schema = buildSchema(`
  type Query {
    hello: String
    location: Location
  }
  type Location {
    name:String,
    address:String
    lat: Float,
    lng: Float,
  }
`);

var root = {
  hello: () => "Hello world!",
  location: () => ({
    name: "Tel-Aviv",
    address: "Rothschild 60",
    lat: 32.09,
    lng: 34.7818,
  }),
};
var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(8000, () => console.log("Now browse to localhost:8000/graphql"));
