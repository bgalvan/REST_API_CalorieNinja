var express = require("express");
var router = express.Router();
const DB = require("../services/DB");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  // await DB("users").insert({ id: 4, name: "Joe" });
  // await DB("users").insert({ id: 4, name: "Joe" });
  const users = await DB("users").select(["id", "name"]);
  return res.json(users);
});

router.get("/1", async function (req, res, next) {
  // await DB("recipes").insert({ id: 1, title: "food" });
  const food = await DB("recipes").select(["id", "title"]);
  return res.json(food);
});

router.post("/1", async function (req, res, next) {
  console.log(req);
  var message = " Hi ";
  res.send(message);
  // await DB("recipes").insert({ id: 1, title: "food" });
  // const food = await DB("recipes").select(["id", "title"]);
  // return res.json(food);
});

module.exports = router;
