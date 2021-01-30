$(document).ready(function () {
  $("#btn-enter").click(() => {
    var user = $("#user-name").val();
    var business = $("#business-name").val();
    var path = "/table3query1output-" + user + "-" + business;
    if (user == "" || business == "") {
      alert("Please fill up all the fields");
    } else {
      $(location).attr("href", path);
    }
  });

  $("#back-btn").click(() => {
    $(location).attr("href", "/");
  });
});
