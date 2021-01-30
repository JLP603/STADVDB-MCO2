$(document).ready(function () {
  $("#btn-enter").click(() => {
    var category = $("#category-input").val();
    var path = "/table4queryoutput-" + category;
    if (category == "") {
      alert("Please fill up all the field");
    } else {
      $(location).attr("href", path);
    }
  });

  $("#back-btn").click(() => {
    $(location).attr("href", "/");
  });
});
