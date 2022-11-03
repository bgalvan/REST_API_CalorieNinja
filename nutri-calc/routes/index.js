const { json } = require("express");
var express = require("express");
var router = express.Router();
var fooddata = require("../recipes.json");
var recipedata = require("../testdb.json");
const fs = require("fs");

console.log(fooddata);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
  // res.json(fooddata);
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/user/:id", function (req, res) {
  res.json(fooddata);
  console.log("request object", req);
  console.log("request params", req.params);
});

router.get("/vegetables", function (req, res) {
  res.render("veg", { name: "bobs nutrition" });
});

router.get("/vegdata", function (req, res) {
  res.json(fooddata);
});

router.post("/ingredient", function (req, res) {
  console.log("req body: ", req.body);
  var query = "";

  query += req.body.qty + " " + req.body.unit + " " + req.body.name;

  console.log("query", query);

  const request = require("request");
  request.get(
    {
      url: "https://api.calorieninjas.com/v1/nutrition?query=" + query,
      headers: {
        "X-Api-Key": "66bZo5YIpvKhFpDZBZGEXg==DFUYD4LespAwZPwk",
      },
    },

    function (error, response, body) {
      if (error) return console.error("Request failed:", error);
      else if (response.statusCode != 200)
        return console.error(
          "Error:",
          response.statusCode,
          body.toString("utf8")
        );
      else console.log(body);
      console.log("done");
      res.header("Access-Control-Allow-Origin", "*");
      var data = JSON.stringify(body);
      res.send(data);
    }
  );
});

router.post("/recipe", function (req, res) {
  console.log("posted", req.body);
  // var newData = JSON.stringify(req.body)
  fs.readFile("./recipes.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    var file = JSON.parse(data);
    file[file.length] = req.body;
    console.log(file);
    var newFile = JSON.stringify(file);
    fs.writeFile("./recipes.json", newFile, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
      res.header("Access-Control-Allow-Origin", "*");
      res.send("Recipe saved!");
    });
  });
});

router.get("/recipe", function (req, res) {
  fs.readFile("./recipes.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    var file = JSON.parse(data);
    res.send(file);
  });
});

//receives a recipe oject and get a nutrition info for all ingredients in recipe
// router.post("/ingred", function (req, res) {
//   console.log("req body: ", req.body);
//   var query = "";
//   for (var i = 0; i < req.body.ingredients.length; i++) {
//     var obj = req.body.ingredients[i];
//     console.log("ingredient " + i + " " + req.body.ingredients[i].name);
//     query +=
//       req.body.ingredients[i].qty +
//       " " +
//       req.body.ingredients[i].unit +
//       " " +
//       req.body.ingredients[i].name +
//       " ";
//   }
//   console.log("query", query);

//   const request = require("request");
//   request.get(
//     {
//       url: "https://api.calorieninjas.com/v1/nutrition?query=" + query,
//       headers: {
//         "X-Api-Key": "66bZo5YIpvKhFpDZBZGEXg==DFUYD4LespAwZPwk",
//       },
//     },

//     function (error, response, body) {
//       if (error) return console.error("Request failed:", error);
//       else if (response.statusCode != 200)
//         return console.error(
//           "Error:",
//           response.statusCode,
//           body.toString("utf8")
//         );
//       else console.log(body);
//       console.log("done");
//       res.send(body);
//     }
//   );
//   // res.header("Access-Control-Allow-Origin", "*");
// });

module.exports = router;
