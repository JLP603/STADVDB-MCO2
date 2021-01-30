

$(document).ready(function () {
  $("#btn-enter").click(() => {
    var ctime = $("#checkin-time").val();

    var path = "/table1query1output-" + ctime;
    if (ctime == "") {
      alert("Please fill up the field");
    } else {
      $(location).attr("href", path);
    }
  });

  $("#back-btn").click(() => {
    $(location).attr("href", "/");
  });
});
