$(document).ready(function () {
  $("#btn-enter").click(() => {
    var year = $("#year-input").val();
    var month = $("#month-input").val();
    var day = $("#day-input").val();
    var path = "/table3query2output-" + year + "-" + month + "-" + day;
    if (year == "" || month == "" || day == "") {
      alert("Please fill up all the fields");
    } else {
      $(location).attr("href", path);
    }
  });

  $("#back-btn").click(() => {
    $(location).attr("href", "/");
  });
});
