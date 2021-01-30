$(document).ready(function () {
    $("#btn_enter").click(function (e) { 

        var business_name = $("#business_name").val();


        var path = "/table2query2output-" + business_name

        if  (business_name != ""){
            
            $(location).attr("href", path);
        }
        else {
            alert("Please fill up all the field")
        }
    });
});