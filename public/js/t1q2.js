
$(document).ready(function () {
    $("#btn-enter").click(() => {
        var day_input = $("#day_input").val();
        var path = "/table1query2output-" + day_input;
        if ( day_input == "")
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
