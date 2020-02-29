//api_key
var apiKEY = "dN47xDe3nAYUGnI6SP6L7vdcOCQFqXel";
var baseURL = "https://api.giphy.com/v1/gifs/search?";

var limit = 10; //limit
//q

var topics = ["eagle", "linx", "flamingo"];

function loadTopics() {
  $(".list-container").empty();
  topics.forEach((element) => {
    var newButton = $("<button>");
    newButton.text(element);
    newButton.appendTo(".list-container");
  });
}

function embedGifs(gifArray) {
  $(".gif-container").empty();
  gifArray.forEach((element) => {
    var newDiv = $("<div>");
    var newGif = $("<img>");
    var newRating = $("<p>");

    newRating.text(element.rating);
    newGif.attr("src", element.images.original.url);
    newDiv.append(newRating);
    newDiv.append(newGif);
    newDiv.appendTo(".gif-container");
  });
}
function runQuery(animal) {
  var queryURL =
    baseURL + "q=" + animal + "&api_key=" + apiKEY + "&limit=" + limit;
  console.log(animal);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    embedGifs(response.data);
  });
}

$(window).on("load", function() {
  loadTopics();
  //Want new Animal
  $("form").submit(function(event) {
    var newAnimal = $("input")
      .first()
      .val();
    if (!topics.includes(newAnimal)) {
      topics.push(newAnimal);
      loadTopics();
    }
    $("#name").val("");
    event.preventDefault();
  });
});

$(document).on("click", "button", function() {
  console.log($(this).text());
  runQuery($(this).text());
});
