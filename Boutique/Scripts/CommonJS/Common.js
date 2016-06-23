
var deleteReturn = false;

//-----------*  document.ready * ---------------//

$("document").ready(function (e) {

    $(".DialogDeleteYes").live({
        click: function (e) {// Clear controls
            deleteReturn = true;
            //alert(deleteReturn);
            return true;
        }
    })
});


//---* Order Status Notification * ---//

var OrderStatusNotification = {
    OrderReady: "Your order is ready for PickUp. Your Order Number is : $ ",
    OrderWithProducts: "Order is placed with $ Products. Your Order Number is : # ",
    OrderWithOutProducts: "Order is placed. Your Order Number is : $ ",
    OrderUpdateWithProducts: "Newly $ products are added to your Order. Your Order Number is : # "
}

//--------------* Roles * ---------------//

var Roles = {
    Manager: "Manager",
    Administrator: "Administrator",   
    SuperAdmin: "SuperAdmin"
    }
//--------------* Pages * ---------------//
var Pages = {
    People: "People",
    Profile: "Boutique Profile",
    SaDashboard: "SA DashBoard",
    Dashboard: "DashBoard",
    Category: "Category",
    Login: "Login",
    Loyalty: "Loyalty",
    Notifications: "Notifications",
    LoyaltySettings: "Loyalty Settings",
    OrderStatus: "Order Status",
    Products: "Products",
    ProductsReview:"Products Review"
}

//--------------* Messages * ---------------//
var Messages = {

    exists: "The operation can’t be completed because the category is in use .",
    existsBoutique: "The operation can’t be completed because the Boutique is in use .",

    Html5:"The File APIs are not fully supported in this browser.",

    MandatoryFields: "Please fill out all the fields",
    EmailInstruction: "Please check your email for a message with verification code.Your code is 4 digit long . We sent code to ",
    VerificationCodeMismatch: "Passwords does not match. Please confirm passwords are Same",
    InvalidEmailID: "Enter A valid Email-ID",
    TimeExpired: "Time expired",
    IncorrectVerificationCode: "Verification Code is invalid",
    ErrorNumber: "ErrorNumber=",
    Imagesupport: "The Image Is not Supporting Save a new one",

    ExceptionMsgCaption: "Exception!",
    SuccessMsgCaption: "Success!",
    WarningMsgCaption: "Warning!",
    InsertionFailureMsgCaption: "Somthing Wrong try Again!",
    FailureMsgCaption: "Failure!",
    AlreadyExistsMsgCaption: "Already exists!",
    Confirm:"Please Confirm!",

    LoginSuccess: "Successfully logged in",
    InsertionSuccessFull: "Successfully Inserted",
    UpdationSuccessFull: "Successfully Updated",
    DeletionSuccessFull: "Deleted Successfully",
    SuccessfulUpload: "Successfully Uploaded",
    SavedSuccessfull: "Successfully Saved!",

    LoginFailed: "User Name / Password is wrong!",
    InsertionFailure: "Not Successfuly Saved Try Again",
    UpdationFailure: "Edit Failed Try Again Later",
    Warning: "Warning Msg ",
    DeletionFailure: "Deletion Not Successful ",
    SavingFailure: "Saving Not Successful ",
    AlreadyUsedForDeletion: "Already used . Can't be deleted",
    AlreadyUsedForUpdation: "Already used . Can't be changed"
}

function IsCategoryExists() {
    debugger;

    var table = {};
    var Category = new Object();
    Category.CategoryCode = $('#txtCatCode').val();
    table = IsCategory_Exists(Category);
    return table;
}

function IsCategory_Exists(Category) {
    debugger;
    var ds = {};
    var table = {};
    var data = "{'CategoryObj':" + JSON.stringify(Category) + "}";
    ds = getJsonData(data, "../AdminPanel/Category.aspx/CheckCategories");
    table = JSON.parse(ds.d);
    return table;
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
    var jsonResult = {};
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
            jsonResult = data;
        },
        processData: false,

        error: function () {
            alert("Whoops something went wrong!");
        }
    });
    return jsonResult;
}

function DeleteCustomAlert(txt, e, p) 
{
  
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

    //h1 = alertObj.appendChild(d.createElement("h1"));
    //h1.appendChild(d.createTextNode("Delete"));
    var img1 = document.createElement('img');
    img1.setAttribute("src", "../img/Default/Warn.png");
    img1.setAttribute("class", "alertImage");
    alertObj.appendChild(img1);
    msg = alertObj.appendChild(d.createElement("p"));
    //'<img class="alertImage" src="../img/Default/Warning.png" /><br />';
    
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.className = "noButton";
    btn.appendChild(d.createTextNode("No"));
    btn.href = "#";
    btn.focus();
    btn.onclick = function () { removeCustomAlert(); return false; }

    btnYes = alertObj.appendChild(d.createElement("a"));
    btnYes.id = "DeleteYesBtn";
    btnYes.className = "yesButton";
    btnYes.appendChild(d.createTextNode("Yes"));
    btnYes.href = "#";
    //btnYes.focus();
   
    if (p == "ProductImage") {
        btnYes.onclick = function () { DeleteProductImage(e, p); removeCustomAlert(); return false; }
    }
    else {
        btnYes.onclick = function () { DeleteItem(e, p); removeCustomAlert(); return false; }
    }

    alertObj.style.display = "block";

    $("#alertBox").animate({ top: '50px' });
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
    alertObj.id = "alert";
    if (d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
    alertObj.style.visiblity = "visible";

    
    var img1 = document.createElement('img');
    img1.setAttribute("src", "../img/Default/Warn.png");
    img1.setAttribute("class", "alertImage");
    alertObj.appendChild(img1);
    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.className = "noButton";
    btn.appendChild(d.createTextNode("OK"));
    btn.href = "#";
    btn.focus();
    btn.onclick = function () { removeCustomAlert(); return false; }

    alertObj.style.display = "block";
    $("#alert").animate({ top: '50px' });
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

