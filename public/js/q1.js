

$(document).ready(function () {
  $("#btn-enter").click(() => {
    var category = $("#category").val();

    var path = "/query1output-" + category;
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
