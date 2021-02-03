$(document).ready(function () {
    //might change the line below
    $("#btn-enter").click(function (e) { 
        
        var category = $("#category").val();
        var path = "/query3output-" + category;
        if (category == "") {
            alert("Please fill up the field");
          } else {
            $(location).attr("href", path);
          }
    });
    $("#back-btn").click(() => {
        $(location).attr("href", "/");
      });
});