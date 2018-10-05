$(document).ready(function() {

    $("#gif-header").hide();

    var topics = ["Squirrel", "Milky Way", "Dugtrio", "Game of Thrones"];

    function makeBtn() {
        $(".btn-display").empty();

        for (i = 0; i < topics.length; i++) {
            var btnDiv = $("<button>");
            btnDiv.addClass("topic-btn btn btn-primary mx-1 mb-2");
            btnDiv.attr("data-name", topics[i]);
            btnDiv.text(topics[i]);
            $(".btn-display").append(btnDiv);
        };
    };

    $(document).on("click", ".topic-btn", function() {
        $("#gif-header").show();
        var topicName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=UZ25LXoQFwUYq1EepkpwCS2XICkZyWL9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            var result = response.data;
            console.log(result);

            for (j = 0; j < result.length; j++) {
                var gifDiv = $("<div class='mx-auto my-2'>");
                gifDiv.addClass("gif-container");

                var image = $("<img>");
                image.attr("src", result[j].images.fixed_height_still.url);
                image.addClass("gif");
                image.attr("data-static", result[j].images.fixed_height_still.url);
                image.attr("data-motion", result[j].images.fixed_height.url);
                image.attr("data-state", "static");

                var gifTitle = $("<p class='mt-2'>").text(result[j].title);
                var gifRating = $("<p class='mt-2' id='rating'>").text("Rating: " + result[j].rating);
                var gifSource = $("<p id='source'>").text("Source: " + result[j].source_tld);

                gifDiv.append(gifTitle);
                gifDiv.append(image);
                gifDiv.append(gifRating);
                gifDiv.append(gifSource);
                $(".gif-display").prepend(gifDiv);
            };
        });
    });

    $("#add-btn").on("click", function() {
        event.preventDefault();

        var inputTopic = $("#btn-input").val();
        if (inputTopic !== "") {
            topics.push(inputTopic);
            makeBtn();
        $("#btn-input").val("");
        };
    });

    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");

        if (state === "static") {
            $(this).attr("src", $(this).attr("data-motion"));
            $(this).attr("data-state", "motion");
        } else {
            $(this).attr("src", $(this).attr("data-static"));
            $(this).attr("data-state", "static");
        };
    });

    makeBtn();

});