const getQuery = (ingredients) => {
  var query = "";
  for (var i = 0; i < ingredients.length; i++) {
    var obj = ingredients[i];
    console.log("ingredient " + i + " " + ingredients[i].name);
    query +=
      ingredients[i].qty +
      " " +
      ingredients[i].unit +
      " " +
      ingredients[i].name +
      " ";
  }
  console.log("query", query);
  return query;
};
