
$(document).ready(function () {
    $("#btn-enter").click(() => {
        var state = $("#state").val();
        var category = $("#category").val();
        var day_of_week = $("#day_of_week").val();
        var path = "/query2output-" +state +"-"+ category +"-"+ day_of_week;
        if ( state == ""||category == ""||day_of_week == "")
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
