$("document").ready(function (e) {

    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';
    BindNotificationsTable(boutiqueid);

    //Edit button--------
    $(".notificationedit").live(
    {
        click: function (e) {

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var jsonResult = {};
            editedrow = $(this).closest('tr');
            var Notification = new Object();
            Notification.BoutiqueID = boutiqueid;
            Notification.NotificationID = editedrow.attr("NotificationID");
            jsonResult = GetNotification(Notification);
            if (jsonResult != undefined) {
                BindNotificationTextBoxes(jsonResult);
            }
            return false;
        }
    })
    //Save button---------
    $(".submitDetails").live(
    {
        click: function (e) {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var result = "";
            var Notification = new Object();
            Notification.BoutiqueID = boutiqueid;
            if ($("#txtTitle").val() != "") {
                Notification.Title = $("#txtTitle").val();
            }
            else {
                alert("Please enter user name....");
                return;
            }
            if ($("#dateStartDate").val() != "") {
                Notification.StartDate = $("#dateStartDate").val();
            }
            else {
                alert("Please select start date....");
                return;
            }
            if ($("#dateEndDate").val() != "") {
                Notification.EndDate = $("#dateEndDate").val();
            }
            else {
                alert("Please select end date....");
                return;
            }
            Notification.Description = $("#txtDescription").val();
            Notification.ProductID = "";// $("#txtOwnerAddress").val();
            Notification.CategoryCode = "";//$("#txtPhone").val();
            
            result = InsertNotification(Notification);
            if (result == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                BindNotificationsTable(boutiqueid);
                $("#txtTitle").val("");
                $("#txtDescription").val("");
                $("#dateStartDate").val("");
                $("#dateEndDate").val("");
            }
            if (result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
            }
        }
    })
    //Delete button---------
    $(".notificationdelete").live(
    {
        click: function (e) {

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            if (confirm("Do you want to delete this notification ?") == true) {
                var jsonResult = {};
                editedrow = $(this).closest('tr');
                var Notification = new Object();
                Notification.BoutiqueID = boutiqueid;
                Notification.NotificationID = editedrow.attr("NotificationID");
                result = DeleteNotification(Notification);
                if (result == "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();

                }
                if (result != "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                }
                BindNotificationsTable(boutiqueid);
                $("#txtTitle").val("");
                $("#txtDescription").val("");
                $("#dateStartDate").val("");
                $("#dateEndDate").val("");
            }          
            return false;
        }        
    })
    //Cancel button-----------
    $(".Cancel").live({
        click: function (e) {// Clear controls
            $("#txtTitle").val("");
            $("#txtDescription").val("");
            $("#dateStartDate").val("");
            $("#dateEndDate").val("");
            $(".submitDetails").text("Modify");
        }
    })
});
//------------Notification details table------------
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
    $("tbody#notificationrows tr").remove();            //Remove all existing rows for refreshing
    $.each(Records, function (index, Records) {
        var html = '<tr NotificationID="' + Records.NotificationID + '" BoutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Title + '</td><td class="center">' + Records.Description + '</td><td class="center">' + ConvertJsonToDate(Records.StartDate) + '</td><td class="center">' + ConvertJsonToDate(Records.EndDate) + '</td><td class="center"><a class="btn btn-info notificationedit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger notificationdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>'
        $("#NotificationTable").append(html);
    })
}
//------------Insert--------------------
function InsertNotification(Notification) {
    var data = "{'notificationObj':" + JSON.stringify(Notification) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notifications.aspx/InsertNotification");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//------------Edit--------------------
function BindNotificationTextBoxes(Records) {
    $.each(Records, function (index, Records) {
        $("#txtTitle").val(Records.Title);
        $("#txtDescription").val(Records.Description);
        $("#dateStartDate").val(ConvertJsonToDate(Records.StartDate));
        $("#dateEndDate").val(ConvertJsonToDate(Records.EndDate));

    });
    $(".submitDetails").text("Modify");
}
function GetNotification(Notification) {
    var ds = {};
    var table = {};
    var data = "{'notificationObj':" + JSON.stringify(Notification) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetNotificationByID");
    table = JSON.parse(ds.d);
    return table;
}
//---------------Delete---------------------
function DeleteNotification(Notification)
{
    var data = "{'notificationObj':" + JSON.stringify(Notification) + "}";

    var jsonResult = getJsonData(data, "../AdminPanel/Notifications.aspx/DeleteNotification");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
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