//sports array
var sports = ["Golf", "Basketball", "Baseball", "Football", "Soccer", "Tennis", "Cricket", "Ski", "Snowboard", "Skateboard", "Cycling", "Rugby", "Boxing", "Formula 1", "Snooker", "Hockey", "Volleyball", "Badminton", "Gymnastics", "Wrestling"];
//api key for giphy
var APIKey = "PX195iAvln0Y8Z14iANdffEwmEgv5axh"; 
//holds the topic on which the user has clicked
/* var topic = "dogs"; */
var limit = 10;
//ajax query
 /* var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + APIKey + "&limit=" + limit; */

//console.log("apikey: " + APIKey);
//console.log("queryURL: " + queryURL);

//generate our buttons
function makeButtons() {

  //variable to hold our button-holder id
  var buttons = $("#button-holder");

  //clears out our buttons so already added buttons don't append with each user addition
  buttons.empty();

  //generate our buttons and attach a name value
  for (var i = 0; i < sports.length; i++) {

    //hold our <button> tag in a variable
    var btn = $("<button>");

    //add class to our <button> element
    btn.addClass("gif-button");

    //add an attribute, data-name with values in our sports array
    btn.attr("data-name", sports[i]);

    //give each button the name corresponding to the index in our array
    btn.text(sports[i]);

    //append and add these buttons to our button-holder div
    buttons.append(btn);
    /* buttons.append(`<button>${sports[i]}</button>`);
    buttons.attr("data-name", sports[i]); */
  }

}

function displayGIF() {

  //variable to hold topic from clicked button
  var topic = $(this).attr("data-name");
  //ajax query url
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + APIKey + "&limit=" + limit;

  console.log("topic clicked: " + topic);

  //our ajax request
  $.ajax ({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);


    for (var j = 0; j < response.data.length; j++) {

      //create div to hold gif
      var gifDiv = $("<div class='gif'>");

      //store rating data
      var gifRating = response.data[j].rating;
  
      //create element to hold rating
      var pRating = $("<p>").text("Rating: " + gifRating);

      //display rating
      gifDiv.append(pRating);

      //gif url for image (still and active)
      var imgURLStill = response.data[j].images.fixed_width_small_still.url;
      var imgURLActive = response.data[j].images.fixed_width_small.url; 

      //img element to hold gif (still when they are first rendered to the page)
      var image = $("<img>");
      image.addClass("gif-data");
      image.attr("src", imgURLStill); 
      image.attr("data-state", "still");
      image.attr("data-still", imgURLStill);
      image.attr("data-active", imgURLActive);

      $("#gif-view").prepend(image);

    }

  });

  $(document).on("click", ".gif-data", function() {
    //gets our value from data-state
    var state = $(this).attr("data-state");

    var animate = $(this).attr("data-active");

    var still = $(this).attr("data-still");

    if(state == "still") {
      $(this).attr("src", animate);
      $(this).attr("data-state", "animate");
    }
    else if (state == "animate") {
      $(this).attr("src", still);
      $(this).attr("data-state", "still");
    }

  });

  
}

$("#find-gif").on("click", function (event) {

    // Preventing the submit button from trying to submit the form
    // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    event.preventDefault();

    //create variable and clear input field on key press or submit
    var inputField = $("#search-form");


    // Here we grab the text value from the input box
    var inputGIF = $("#input-gif").val().trim();

    //at first character of user input, uppercase the letter
    inputGIF = inputGIF.charAt(0).toUpperCase() + inputGIF.slice(1);


    //check to see if the input is null, or if the user request is already in the array. It not, push that to our sports array
    if (inputGIF != "" && sports.indexOf(inputGIF) == -1) {
      sports.push(inputGIF);
    }

    //reset input field after submit
    inputField[0].reset();

    //generate the buttons after user submits an additional gif to be added
    makeButtons();

    console.log(sports);

});

$(document).on("click", ".gif-button", displayGIF);

makeButtons();






/* $.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(response);
}); */