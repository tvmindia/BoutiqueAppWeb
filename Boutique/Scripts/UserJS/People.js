$("document").ready(function (e) {

    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';


    var jsonResult = {};
    jsonResult = GetAllUsers(boutiqueid);
    if (jsonResult != undefined) {
        BindUserTable(jsonResult);
    }



   



    $(".CancelClear").live({
        click: function (e) {// Clear controls
            clearControls();
        }
    })

    
});//end of document.ready



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





function BindUserTable(Records) {
    //$("#UsersTable").find(".odd").remove();
    $("#UsersTable").find(".myrows").remove();
    $.each(Records, function (index, Records) {
      
       // var html = '<tr class="myrows" boutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Name + '</td><td class="center">' + Records.AppVersion + '</td><td class="center">' + Records.Location + '</td><td class="center">' + Records.Phone + '</td><td class="center">' + Records.Timing + '</td><td class="center">' + Records.WorkingDays + '</td></td><td class="center"><a class="btn btn-info Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger Delete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        var html = '<tr class="userrows" userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td></tr>';
        $("#UsersTable").append(html);
    })

}



function GetAllUsers(boutiqueid) {

    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllUsersByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}
