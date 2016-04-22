$("document").ready(function (e) {

  
    debugger;
    var jsonResult = {};
    jsonResult = GetAllBoutiques();
    //var table = {};
    //table = JSON.parse(jsonResult.d);
    //alert(table[0].StartedYear);
    //alert(table[1].Name);
    if (jsonResult != undefined)
    {
        BindBoutiqueTable(jsonResult);
    }


    //events

    $("#btnSaveBoutique").on({
        click: function (e) {// submit button click
            debugger;
            var jsonResults = {};
            jsonResults = GetAllBoutiques();
            if (jsonResults != undefined)
            {
                BindBoutiqueTable(jsonResults);
            }
           
        }
    })



  
});//document.ready



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

    var ds = {};
    var table = {};
    var data = "{}";
    ds = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/GetAllBoutiques");
    table = JSON.parse(ds.d);
    //alert(table[0].StartedYear);
    //alert(table[1].Name);
    return table;
}



function BindBoutiqueAsyncLoad()
{
    var jsonResults = {};
    jsonResults = GetAllBoutiques();
    if (jsonResults != undefined) {
        BindBoutiqueTable(jsonResults);
       
    }

}


function BindBoutiqueTable(Records) {
  
    $("#bouquetTable").find(".odd").remove();
    $("#bouquetTable").find(".myrows").remove();
    $.each(Records, function (index, Records) {
       var html = '<tr class="myrows"><td>' + Records.Name + '</td><td class="center">' + Records.AppVersion + '</td><td class="center">' + Records.Location + '</td><td class="center">' + Records.Phone + '</td><td class="center">' + Records.Timing + '</td><td class="center">' + Records.WorkingDays + '</td></td><td class="center"><a class="btn btn-success" href="#"><i class="halflings-icon white zoom-in"></i> </a><a class="btn btn-info" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
       $("#bouquetTable").append(html);
    })
   
}
