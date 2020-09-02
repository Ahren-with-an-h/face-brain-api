const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const PORT = process.env.PORT ? process.env.PORT : 3001;

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "26954321321321",
    database: "face-brain",
  },
});

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  // response.send(database.users);
  response.send("is working!")
});

app.post("/signin", (request, response) => {
  signin.handleSignin(request, response, db, bcrypt);
});

app.post("/register", (request, response) => {
  register.handleRegister(request, response, db, bcrypt);
});

app.get("/profile/:id", (request, response) => {
  profile.handleProfileGet(request, response, db);
});

app.put("/image", (request, response) => {
  image.handleImage(request, response, db);
});

app.post("/imageurl", (request, response) => {
  image.handleApiCall(request, response);
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
