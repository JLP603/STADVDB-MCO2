
$(document).ready(function () {
    $("#btn-enter").click(() => {
        var state_input = $("#state_input").val();
        var category_input = $("#category_input").val();
        var day_of_week_input = $("#day_of_week_input").val();
        var path = "/query2output-" + day_input +"-"+ category_input +"-"+ day_of_week_input;
        if ( state_input == ""||category_input == ""||day_of_week_input == "")
        {
            alert("Please fill up the field");
        }
        else
        {
            $(location).attr("href", path);
        }
    });

    $("#back-btn").click(() => {
      $(location).attr("href", "/");
    });
});
