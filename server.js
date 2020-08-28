const port = 3001;
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");
const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "26954321321321",
    database: "face-brain",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });

app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "jessica",
      password: "peaches",
      email: "jessica@gmail.com",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "sara",
      password: "nectarines",
      email: "sara@gmail.com",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "john@gmail.com",
    },
  ],
};

app.get("/", (request, response) => {
  response.send(database.users);
});

app.post("/signin", (request, response) => {
  for (let i = 0; i < database.users.length; i++) {
    if (
      request.body.email === database.users[i].email &&
      request.body.password === database.users[i].password
    ) {
      response.json(database.users[i]);
      return;
    }
  }
  response.status(400).json("error logging in");
});

app.post("/register", (request, response) => {
  const { name, email, password } = request.body;
  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then((user) => {
      response.json(user[0]);
    })
    .catch((err) => response.status(400).json("unable to register"));
});

app.get("/profile/:id", (request, response) => {
  const { id } = request.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        response.json(user[0]);
      } else {
        response.status(400).json("error getting user");
      }
    })
    .catch((err) => res.status(400).json("Not found"));
});

app.put("/image", (request, response) => {
  const { id } = request.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      response.json(entries[0]);
    })
    .catch(err => response.status(400).json("unable to set entries"))
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
