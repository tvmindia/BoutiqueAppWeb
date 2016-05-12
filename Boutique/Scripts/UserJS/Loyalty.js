$("document").ready(function (e) {
    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';
    BindUserTable(boutiqueid);
    $('#UsersTable').dataTable();  


    //$('#UsersTable').dataTable({
    //    bServerSide: true,
    //    iDeferLoading: 10, 
    //    aaData: GetAllUsers(boutiqueid)
    //});
});
//------------User details table------------
function BindUserTable(boutiqueid) {
    var jsonResult = {};
    jsonResult = GetAllUsers(boutiqueid);
    if (jsonResult != undefined) {
        FillUserTable(jsonResult);
    }
}
function GetAllUsers(boutiqueid) {
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/Loyalty.aspx/GetAllUsers");
    table = JSON.parse(ds.d);
    return table;
}
function FillUserTable(Records) {
    $("tbody#userrows tr").remove();            //Remove all existing rows for refreshing
    $.each(Records, function (index, Records) {
        var html = '<tr><td>' + Records.Name + '</td><td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center">' + Records.LoyaltyCardNo + '</td><td class="center"><a class="btn btn-success" href="#"><i class="halflings-icon white eye-open"></i></a></td></tr>';
        //<a class="btn btn-info" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger" href="#"><i class="halflings-icon white trash"></i></a>
        $("#UsersTable").append(html);
    });
}
//---getting data as json-----//
function getJsonData(data, page) {
    var jsonResult = {};
    var req = $.ajax({
        type: "post",
        url: page,
        data: data,
        delay: 3,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json"

    }).done(function (data) {
        jsonResult = data;
    });
    return jsonResult;
}
function ConvertJsonToDate(jsonDate) {
    if (jsonDate != null) {
        var dateString = jsonDate.substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth();
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var monthNames = [
                      "Jan", "Feb", "Mar",
                      "Apr", "May", "Jun", "Jul",
                      "Aug", "Sep", "Oct",
                      "Nov", "Dec"
        ];
        var result = day + '-' + monthNames[month] + '-' + year;
        return result;
    }
}