//api_key
var apiKEY = "dN47xDe3nAYUGnI6SP6L7vdcOCQFqXel";
var baseURL = "https://api.giphy.com/v1/gifs/search?";

var limit = 10; //limit
var search = "cheeseburgers"; //q

var queryURL =
  baseURL + "api_key=" + apiKEY + "&limit=" + limit + "&q=" + search;

var topics = ["eagle", "linx", "flamingo"];

function loadTopics() {
  $(".list-container").empty();
  topics.forEach((element) => {
    var newButton = $("<button>");
    newButton.text(element);
    newButton.appendTo(".list-container");
  });
}
$(window).on("load", function() {
  loadTopics();
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
  $("form").submit(function(event) {
    console.log(
      $("input")
        .first()
        .val()
    );
    event.preventDefault();
  });
});

$(document).on("click", "button", function() {
  console.log($(this).text());
});
