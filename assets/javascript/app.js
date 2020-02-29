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
    newDiv.addClass("gifDiv");

    var newGif = $("<img>");
    var newRating = $("<p>");

    newRating.text(element.rating);
    newGif.attr("src", element.images.original_still.url);
    newGif.attr("data-still-url", element.images.original_still.url);
    newGif.attr("data-animate-url", element.images.original.url);
    newGif.attr("data-status", "still");

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

$(document).on("click", "img", function() {
  if ($(this).attr("data-status") === "still") {
    $(this).attr("src", $(this).data("animate-url"));
    $(this).attr("data-status", "animate");
  } else {
    $(this).attr("src", $(this).data("still-url"));
    $(this).attr("data-status", "still");
  }
});
