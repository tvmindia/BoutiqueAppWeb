
//---getting data as json-----//
function getJsonData(data, page) {
    var jsonResult = {};
    // $("#loadingimage").show();
    var req = $.ajax({
        type: "post",
        url: page,
        data: data,
        delay: 3,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function (data) {
      
        //     $("#loadingimage").hide();
        jsonResult = data;
    });
    return jsonResult;
}
//---end of getting data as json -----//




function GetAllBoutiques() {
   
    //url: "../Stock/StockOut.aspx/GetIssueHD",
    var Id = 5;
    var data = "{'ChildId':" + JSON.stringify(Id) + "}";
   
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/GetAllBoutiques");
    return jsonResult;
  
}
