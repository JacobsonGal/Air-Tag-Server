var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const http = require("http");

var schema = buildSchema(`
  type Query {
    location(id:Int!): Location
    locations: [Location]
    createLocation(name:String,address:String,lat:Float,lng:Float): [Location]
    deleteLocation(id:Int!):[Location]
    deleteLocations:[Location]
  }

  type Location {
    id:Int!
    name:String!
    address:String!
    sound:Boolean!
    lat: Float!
    lng: Float!
  }
`);
let locations = [
  {
    id: 1,
    name: "Tel-Aviv",
    address: "Rothschild 60",
    sound: false,
    lat: 32.09,
    lng: 34.7818,
  },
  {
    id: 2,
    name: "Rishon-Le-Zion",
    address: "Hertel 100",
    sound: false,
    lat: 31.99,
    lng: 34.7818,
  },
  {
    id: 3,
    name: "Holon",
    address: "Levi 5",
    sound: false,
    lat: 32.01,
    lng: 34.7818,
  },
  {
    id: 4,
    name: "Herteliya",
    address: "Brosh 10",
    sound: false,
    lat: 32.15,
    lng: 34.8511,
  },
];
var root = {
  location: ({ id }) => {
    console.log("Get location by id");
    return locations.find((location) => location.id === id);
  },
  locations: () => {
    console.log("Get All Locations");
    return locations;
  },
  createLocation: ({ name, address, lat, lng }) => {
    console.log("Create Location");
    console.log({ name, address, lat, lng });
    locations.push({
      id: locations.length + 1,
      name: name,
      address: address,
      sound: false,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });
    console.log(locations);
    return locations;
  },
  deleteLocation: ({ id }) => {
    console.log("Delete Location by id ");
    locations = locations.filter((x) => {
      return x.id != id;
    });
    return locations;
  },
  deleteLocations: () => {
    locations = [];
    return locations;
  },
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
