// Initial array of movies
var topics = ["true and the rainbow kingdom", "daniel tiger's neighborhood", "peppa pig", "spongebob", "dc superhero girls", "adventure time", "miraculous: tales of ladybug & cat noir"];
// Function for displaying movie data
function renderButtons() {
  $("#buttonsArea").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.html(topics[i]);
    button.addClass("btn btn-outline-info");
    button.attr("id", "tv-btn");
    button.attr("tv-title", topics[i]);
    $("#buttonsArea").append(button);
  }
}

function displayGifs() {
  var kidShow = $(this).attr("tv-title");
  console.log(kidShow);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + kidShow + "&api_key=lb4ddbE3zf1cAxrSCXEBGncgTdDPtfGx&limit=10";

  // Creating an AJAX call for that GET and returns th reponse object fron the query url
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    var response = response.data;

    //creates div that contains a still image gif and rating info for each response item
    for (var i = 0; i < response.length; i++) {
      var gifDiv = $("<div>");
      gifDiv.addClass = ("gifDiv");

      var rating = response[i].rating;
      var p = $("<p>").html("Rating: " + rating)
      p.addClass("text");

      var gifImage = $("<img>");
      gifImage.addClass("gif");
      gifImage.attr("src", response[i].images.fixed_height_still.url);
      gifImage.attr("data-still", response[i].images.fixed_height_still.url);
      gifImage.attr("data-animate", response[i].images.fixed_height.url);
      gifImage.attr("data-state", "still");

      gifDiv.append(p);
      gifDiv.append(gifImage);
      $("#mainArea").prepend(gifDiv);
    };
  });
}

//when the submit button is clicked, the input value is pushed to the topics array and rendered into a new button
$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  var newShow = $("#userInput").val().trim();

console.log(topics.includes(newShow));

if (!topics.includes(newShow)) {
  topics.push(newShow);
  renderButtons();
} else{
   alert("I already exist!");
};
  
});

//listens for a click of any button with an id of gif-btn, then performs the displayGif function
$(document).on("click", "#tv-btn", displayGifs);

//starts and stops the animated gif 
$(document).on("click", ".gif", function() {
  var state = $( this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

renderButtons();


