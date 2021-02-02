$(document).ready(function () {
    $("#btn_enter").click(function (e) { 

        var city = $("#city").val();
        var category = $("#category").val();
        var day_of_week = $("#day_of_week").val();
        var time = $("#time").val();
        var path = "/query4output-" + city +"-"+ category +"-"+ day_of_week +"-"+ time

        if  (city != ""||category != ""||day_of_week != ""||time != ""){
            
            $(location).attr("href", path);
        }
        else {
            alert("Please fill up all the field")
        }
    });
});