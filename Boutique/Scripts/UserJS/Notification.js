$("document").ready(function (e) {

    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';
    BindNotificationsTable(boutiqueid);
});
function BindNotificationsTable(boutiqueid) {
    var jsonResult = {};
    jsonResult = GetAllNotifications(boutiqueid);
    if (jsonResult != undefined) {
        FillNotificationTable(jsonResult);
    }
}
function GetAllNotifications(boutiqueid) {
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetAllNotifications");
    table = JSON.parse(ds.d);
    return table;
}
function FillNotificationTable(Records) {
    $("#NotificationTable").find(".categoryrows").remove();
    $.each(Records, function (index, Records) {
        var html = '<tr><td>' + Records.Title + '</td><td class="center">' + Records.Description + '</td><td class="center">' + ConvertJsonToDate(Records.StartDate) + '</td><td class="center">'+ConvertJsonToDate(Records.EndDate)+'</td></tr>'
        $("#NotificationTable").append(html);
    })
}
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
function ConvertJsonToDate(jsonDate) {
    if (jsonDate != null) {
        var dateString = jsonDate.substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth() ;
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