var Roles = {
    Manager: "Manager",
    Administrator: "Administrator",   
    SuperAdmin: "SuperAdmin"
    }


function getRole() {
    var table = {};
    var Role = new Object();
    table = GetLogin_Role(Role);
    return table;
}

function GetLogin_Role(Role) {
    var ds = {};
    var table = {};
    var data = "{'boutiqueObj':" + JSON.stringify(Role) + "}";
    ds = getJsonData(data, "../AdminPanel/Profile.aspx/Role");
    table = JSON.parse(ds.d);
    return table;
}

function postBlobAjax(formData, page) {

    //var request = new XMLHttpRequest();
    //request.open("POST", page);
    //request.send(formData);
    $.ajax({
        type: "POST",
        url: "../ImageHandler/PhotoUploadHandler.ashx",
        contentType: false,
        headers: { 'Cache-Control': 'no-cache' },
        async: false,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        traditional: true,

        success: function (data) {
            if (status != 'error') {
                //var my_path = "MediaUploader/" + status;
                // $("#myUploadedImg").attr("src", my_path);
                //alert(data);
            }
        },
        processData: false,

        error: function () {
            alert("Whoops something went wrong!");
        }
    });
}


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
        // "\/Date(1455561000000)\/".substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var date = day + "/" + month + "/" + year;
        return date;
    }
}


function AutoScrollToAlertBox()
{
    // Scroll page
    var offset = $('#rowfluidDiv').offset();
    offset.left -= 20;
    offset.top -= 20;
    $('html, body').animate({
        scrollTop: offset.top,
        scrollLeft: offset.left
    });
}