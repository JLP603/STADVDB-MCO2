$(document).ready(function () {
    $("#home-btn").click(() => {
      $(location).attr("href", "/");
    });
  
    $("#again-btn").click(() => {
      $(location).attr("href", "/query3");
    });
  });
  