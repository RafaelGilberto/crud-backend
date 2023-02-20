import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

let data = [];

app.get("/welcome", (req, res) => {
  return res.status(200).json("Bem vindo!!!");
});

app.post("/create", (req, res) => {
  console.log(req.body);
  let entry = { ...req.body, id: uuidv4() };

  data.push(entry);
  return res.status(201).json(entry);
});

app.get("/", (req, res) => {
  console.log(data);
  return res.status(200).json(data);
});

app.get("/:id", (req, res) => {
  let { id } = req.params;

  let user = data.find((user) => user.id === id);

  return res.status(200).json(user);
});

app.delete("/:idUser", (req, res) => {
  let { idUser } = req.params;

  let filtered = data.filter((user) => user.id !== idUser);
  data = filtered;

  return res.status(200).json(data);
});

app.put("/:idUser", (req, res) => {
  let { idUser } = req.params;
  let index;
  let user = data.find((user, i) => {
    index = i;
    return user.id === idUser;
  });
  let updatedUser = { ...user, ...req.body };

  data[index] = updatedUser;
  return res.status(200).json(updatedUser);
});

app.listen(4000, () => {
  console.log("Server up and running on port:4000");
});
