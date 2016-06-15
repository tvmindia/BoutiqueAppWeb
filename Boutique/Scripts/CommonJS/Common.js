var deleteReturn=false;
$("document").ready(function (e) {
 
    $(".DialogDeleteYes").live({
        click: function (e) {// Clear controls
            deleteReturn = true;
            //alert(deleteReturn);
            return true;
        }
    })
});//end of document.ready
var Roles = {
    Manager: "Manager",
    Administrator: "Administrator",   
    SuperAdmin: "SuperAdmin"
    }


var Messages = {
    exists:"The operation can’t be completed because the category is in use ."
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

    debugger;
    //var request = new XMLHttpRequest();
    //request.open("POST", page);
    //request.send(formData);

    $.ajax({
        type: "POST",
        url: page,
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

function DeleteCustomAlert(txt, e, p) {
    d = document;

    if (d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if (d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
    alertObj.style.visiblity = "visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode("Delete"));

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.className = "btnButton";
    btn.appendChild(d.createTextNode("No"));
    btn.href = "#";
    btn.focus();
    btn.onclick = function () { removeCustomAlert(); return false; }

    btnYes = alertObj.appendChild(d.createElement("a"));
    btnYes.id = "DeleteYesBtn";
    btnYes.className = "btnButton";
    btnYes.appendChild(d.createTextNode("Yes"));
    btnYes.href = "#";
    //btnYes.focus();
    //debugger;
    btnYes.onclick = function () { DeleteItem(e, p); removeCustomAlert(); return false; }

    alertObj.style.display = "block";

}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}


function CustomAlert(txt) {
    d = document;

    if (d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if (d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
    alertObj.style.visiblity = "visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode("Delete"));

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.className = "btnButton";
    btn.appendChild(d.createTextNode("OK"));
    btn.href = "#";
    btn.focus();
    btn.onclick = function () { removeCustomAlert(); return false; }

    alertObj.style.display = "block";

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

function ConfirmDelete()
{
    $('#myDeleteModal').modal('show');
    var html = '<div class="modal hide fade" id="myDeleteModal" aria-hidden="true" style="display: none;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button><h3>Delete</h3></div><div class="modal-body"><p>Are You Sure?</p></div><div class="modal-footer"><a href="#" class="btn btn-primary DialogDeleteYes">Yes</a><a href="#" class="btn" data-dismiss="modal">No</a></div></div>';
    $('#ConfirmDiv').append(html);
}

