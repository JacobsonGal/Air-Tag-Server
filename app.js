var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const http = require("http");

var schema = buildSchema(`
  type Query {
    hello: String
    getPost:Post
  }
  type Post {
    id: Int,
    title:String
  }
`);

var root = {
  hello: () => "Hello world!",
  getPost: () => ({ id: 1, title: "hello world" }),
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

// const hostname = "127.0.0.1";
// const port = 9000;
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World\n");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}`);
// });
