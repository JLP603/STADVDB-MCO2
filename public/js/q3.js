$(document).ready(function () {
    $("#btn-enter").click(function (e) { 
        
        var category = $("#category").val();
        var path = "/query3output-" + category;
        if  (category != ""){
            
            $(location).attr("href", path);
        }
        else {
            alert("Please fill up all the field")
        }
    });
});