﻿$("document").ready(function (e) {

    parent.document.title = Pages.Notifications;


    var LoginUserRole = getRole();
    $('#hdfRole').val(LoginUserRole[0]);


    BindNotificationsTable();
    BindPersonalisedNotifications();

    $('#NotificationTable').DataTable({
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],

        "fnPageChange": "next"
    });

    $('#PersonalisedNotificationTable').DataTable({
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],

        "fnPageChange": "next",
        "aaSorting": [[4, 'desc']]     //Sort with Name column
    });



    //Edit region drop downs-------------
    $(".Newsletterproducts").select2({
        allowClear: true,
        placeholder: "Choose products",
        data: BindNewsLetterProductDropdown()
    });



    $(".products").select2({
        placeholder: "Choose related product",
        allowClear: true,
        data: BindProductDropdown()
    });
    $(".categories").select2({
        allowClear: true,
        placeholder: "Choose related category",
        data: BindCategoryDropdown()//category dropdown binds only with id and text[key:value] mandatory
    });
    $(".template").select2({
        allowClear: true,
        placeholder: "Choose template",
        data: BindTemplateDropdown()
    });
    $(".audience").select2({
        allowClear: true,
        placeholder: "Choose audience",
        data: [{ id: 0, text: 'All' }]
    });
  



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

            Notification.NotificationID = editedrow.attr("NotificationID");
            jsonResult = GetNotification(Notification);
            if (jsonResult != undefined) {
                BindNotificationTextBoxes(jsonResult);
            }
            //Scroll page
            var offset = $('#editLabel').offset();
            offset.left -= 20;
            offset.top -= 20;
            $('html, body').animate({
                scrollTop: offset.top,
                scrollLeft: offset.left
            });
            return false;
        }
    })

    $(".Prsnlnotificationedit").live(
   {
       click: function (e) {

           debugger;

           $('#rowfluidDiv').hide();
           $('.alert-success').hide();
           $('.alert-error').hide();
           var jsonResult = {};
           editedrow = $(this).closest('tr');
           var Notification = new Object();

           Notification.NotificationID = editedrow.attr("NotificationID");

           jsonResult = GetNotification(Notification);
           if (jsonResult != undefined) {
               BindPersonalisedNotificationTextBoxes(jsonResult);
           }
           //Scroll page
           var offset = $('#PersonalisededitLabel').offset();
           offset.left -= 20;
           offset.top -= 20;
           $('html, body').animate({
               scrollTop: offset.top,
               scrollLeft: offset.left
           });
           return false;
       }
   })



    //Save button---------

    //Delete button---------
    $(".notificationdelete").live(
    {
        click: function (e) {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            editedrow = $(this).closest('tr');
            var e = editedrow.attr("NotificationID");
            var p = "";
            //if (confirm("Do you want to delete this notification ?") == true) {
            //    var jsonResult = {};
            //    editedrow = $(this).closest('tr');
            //    var Notification = new Object();

            //    Notification.NotificationID = editedrow.attr("NotificationID");
            //    result = DeleteNotification(Notification);
            //    if (result == "1") {
            //        $('#rowfluidDiv').show();
            //        $('.alert-success').show();

            //    }
            //    if (result != "1") {
            //        $('#rowfluidDiv').show();
            //        $('.alert-error').show();
            //    }
            //    BindNotificationsTable();
            //    $("#txtTitle").val("");
            //    $("#txtDescription").val("");
            //    $("#dateStartDate").val("");
            //    $("#dateEndDate").val("");
            //    $(".submitDetails").text("Save");
            //    $("#editLabel").text("New Notification");
            //    $("#hdfNotificationID").val('');
            //    $(".products").select2("val", "");
            //    $(".categories").select2("val", "");
            //    //Scroll page
            //    var offset = $('#rowfluidDiv').offset();
            //    offset.left -= 20;
            //    offset.top -= 20;
            //    $('html, body').animate({
            //        scrollTop: offset.top,
            //        scrollLeft: offset.left
            //    });
            //}
            DeleteCustomAlert('Are You Sure?', e, p);
            return false;
        }
    })



    $(".Prsnlnotificationdelete").live(
  {
      click: function (e) {
          $('#rowfluidDiv').hide();
          $('.alert-success').hide();
          $('.alert-error').hide();
          editedrow = $(this).closest('tr');
          var e = editedrow.attr("NotificationID");
          var p = "";

          DeleteCustomAlert('Are You Sure?', e, p);
          return false;
      }
  })

    //Newsletter checkbox
    //$(".checkDes").live(
    //    {
    //        click:function(e)
    //        {
    //            debugger;
    //            //MainImageClick(this);
    //        }
    //    })
    //Cancel button-----------
    $(".Cancel").live({
        click: function (e) {// Clear controls
            $("#txtTitle").val("");
            $("#txtDescription").val("");
            $("#dateStartDate").val("");
            $("#dateEndDate").val("");
            $(".submitDetails").text("Save");
            $("#editLabel").text("New Notification");
            $("#hdfNotificationID").val('');
            $(".products").select2("val", "");
            $(".categories").select2("val", "");
            RemoveStyle();
        }
    })


    $(".PersonalisedCancel").live({
        click: function (e) {// Clear controls

            ClearControlsOfPersonalNotifications();

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

            RemoveStyle();
        }
    })


    //
    //Style setting for client side Validation
    //CreatedBy Thomson

    $('input[type=text],input[type=password]').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    });
    $('textarea').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    });

    //var $eventSelect = $(".template");
    //$eventSelect.on("change", function (e) {
    //    $("#imageTemplate").find(".templateThump").remove();
    //    var span = document.createElement('span');
    //    span.innerHTML = ['<img class="templateThump" src="../img/Templates/notify1.png"',
    //                     '" title="', '"/>'].join('');
    //    document.getElementById('imageTemplate').insertBefore(span, null);
    //});

    var $eventPdtsSelect = $(".Newsletterproducts");
    //$eventPdtsSelect.click(function () {
    //    debugger;

    //});
    $eventPdtsSelect.on("change", function (e) {
        var ddlproduct=[];
        ddlproduct = $(".Newsletterproducts").val();
        debugger;
        $("#NewsLetterimagehold").find(".masonry-thumb").remove();
        for (var i = 0; i <= ddlproduct.length-1; i++) {
               // var productid = ddlproduct[ddlproduct.length - 1];
            BindAllProductImages(ddlproduct[i]);//binds  gallery with product under current boutique
        }
      
    });
    $eventPdtsSelect.on("select2:close", function (e) {
        debugger;
        "select2:close";
    });
    $eventPdtsSelect.on("select2:unselect", function (e) {
        debugger;
        var ddlproduct = this;
        //alert($(this).data.val());
        //var imgid = $(this).attr('productid');
        //imgid.$("#NewsLetterimagehold").find(".masonry-thumb").remove();
        $("#NewsLetterimagehold").find(".masonry-thumb").remove();
    });
    $eventPdtsSelect.on("select2:removing", function (e) {
        debugger;
        alert("removed");
    });

    var $eventTemplatesSelect = $(".template");

    $eventTemplatesSelect.on("change", function (e) {
        debugger;
        var ddlproduct = $(".template").val();

        if (ddlproduct != null) {
            BindTemplateImagesPreview(ddlproduct);
        }
    });
    //end styling client validation
    var $eventAudienceSelect = $(".audience");
    $eventAudienceSelect.on("change", function (e) {
        //debugger;
        //var UserMail = $(".audience").text();
        //UserMail = UserMail.trim();
        //if(UserMail=="All")
        //{
        //    GetAllNewsLetterEmailIds();
        //}
    });
    //mail sending
    $(".submitDetails").click(function () {
        debugger;
        var UserMail = $(".audience").text();
        UserMail = UserMail.trim();
        var MailSending = new Object();
        MailSending.audienceType = UserMail;
        //MailSending.recepientEmail = GetAllNewsLetterEmailIds();
        MailSending.MailSubject = "TiqueInn Deal";
        MailSending.mailNewsLetterID = $("#hdfNewsLetterID").val();
        SendNotificationMail(MailSending);
    });

    $(".saveDetails").click(function (){
        debugger;
        var result = "";
        var idval;
        var ImageInfo = [];
        var pdtIDs = [];
        var imageCount = 0;
        var UserMail = $(".audience").text();
        UserMail = UserMail.trim();
        $('#NewsLetterimagehold div').each(function (index) {
            //val.push($(this).attr('id'));
            var idval = $(this).attr('imageid');
            var pdtVal=$(this).attr('productid');
            //var chkflag = document.getElementsByClassName("checkDes").checked;
            //if (document.getElementById(pdtIDs[index]) != null) {
            //    var chkflag = document.getElementById(pdtIDs[index]).checked;
                //if (chkflag == true) {
                    imageCount = imageCount + 1;
                    ImageInfo.push(idval);
                    pdtIDs.push(pdtVal);
               //}
            //}                  
        });
        if (imageCount != 8) {
            CustomAlert("Please select 8 images for selected template!");
        }
        var Notification = new Object();
        Notification.TemplateID = $(".template").val();
        Notification.ImageIDs =ImageInfo;
        Notification.productIDs = pdtIDs;
        Notification.audienceMailType = UserMail;
        Notification.Description = $("#txtNewsletterDescription").val();
        result = InsertNewsLetter(Notification)
        if (result.status == "1")
        {
            $('#rowfluidDiv').show();
            $('.alert-success').show();
            $('.alert-error').hide();
            $("#hdfNewsLetterID").val(result.NewsLetterID);
        }
        if (result.status != "1") {
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.InsertionFailure);
        }
    })
    //Generate Preview
    $(".templatePreview").click(function () {
        MainImageClick(this);
    });
});



function ClearControlsOfPersonalNotifications() {
    $("#PersonalisedtxtTitle").val("");
    $("#PersonalisedtxtDescription").val("");
    $("#PersonaliseddateStartDate").val("");
    $("#PersonaliseddateEndDate").val("");

    $("#PersonalisededitLabel").text("New Notification");
    $("#hdfNotificationID1").val('');
    $("#ddlProducts").select2("val", "");
    $("#ddlCategories").select2("val", "");
    $(".Users").select2("val", "");


}


function BindPersonalisedNotifications() {
    var jsonResult = {};
    var Notify = new Object();
    jsonResult = GetPersonalisedNotifications(Notify);
    if (jsonResult != undefined) {
        FillPersonalisedNotificationTable(jsonResult);
    }
}

function GetPersonalisedNotifications(Notify) {
    var ds = {};
    var table = {};
    var data = "{'NotifyObj':" + JSON.stringify(Notify) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetPersonalisedNotifications");
    table = JSON.parse(ds.d);
    return table;
}

function FillPersonalisedNotificationTable(Records) {

    $("#PersonalisedNotificationTable").width("100%");

    $("tbody#PersonalisedNotificationrows tr").remove();            //Remove all existing rows for refreshing
    $.each(Records, function (index, Records) {
        var html = '<tr NotificationID="' + Records.NotificationID + '" BoutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Name + '</td><td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Title + '</td><td class="center">' + Records.Description + '</td><td class="center">' + ConvertJsonToDate(Records.StartDate) + '</td><td class="center">' + ConvertJsonToDate(Records.EndDate) + '</td><td class="center"><a class="btn btn-info Prsnlnotificationedit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger Prsnlnotificationdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>'
        $("#PersonalisedNotificationTable").append(html);
    })

}


function BindUserDropdown() {


    var jsonResult = {};
    var Users = new Object();
    jsonResult = GetAllUsers(Users);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}

function GetAllUsers(Users) {
    var ds = {};
    var table = {};
    var data = "{'usrObj':" + JSON.stringify(Users) + "}";
    ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetAllUserIDandName");
    table = JSON.parse(ds.d);
    return table;
}












//Generate preview


//------------Notification details table------------
function GetAllNewsLetterEmailIds()
{
    var jsonResult = {};
    var Notify = new Object();
    jsonResult = GetAllEmailsForNewsLetter(Notify);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}
function RemoveStyle() {
    $('input[type=text],input[type=password],textarea').css({ background: 'white' });
    $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3').hide(1000);
}
function DeleteItem(e, p) {
    var jsonResult = {};
    //editedrow = $(this).closest('tr');
    var Notification = new Object();
    Notification.NotificationID = e;
    result = DeleteNotification(Notification);
    if (result == "1") {
        $('#rowfluidDiv').show();
        $('.alert-success').show();
        $('.alert-success strong').text(Messages.DeletionSuccessFull);



    }
    if (result != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').text(Messages.DeletionFailure);

    }
    BindNotificationsTable();
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#dateStartDate").val("");
    $("#dateEndDate").val("");
    $(".submitDetails").text("Save");
    $("#editLabel").text("New Notification");
    $("#hdfNotificationID").val('');
    $(".products").select2("val", "");
    $(".categories").select2("val", "");

    $("#PersonalisedNotificationTable").dataTable().fnClearTable();
    $("#PersonalisedNotificationTable").dataTable().fnDestroy();

    BindPersonalisedNotifications();

    $('#PersonalisedNotificationTable').DataTable({
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],

        "fnPageChange": "next",
        "aaSorting": [[4, 'desc']]     //Sort with Name column
    });



    //Scroll page
    var offset = $('#rowfluidDiv').offset();
    offset.left -= 20;
    offset.top -= 20;
    $('html, body').animate({
        scrollTop: offset.top,
        scrollLeft: offset.left
    });
}

function BindNotificationsTable() {
    var jsonResult = {};
    var Notify = new Object();
    jsonResult = GetAllNotifications(Notify);
    if (jsonResult != undefined) {
        FillNotificationTable(jsonResult);
    }
}

function GetAllNotifications(Notify) {
    var ds = {};
    var table = {};
    var data = "{'NotifyObj':" + JSON.stringify(Notify) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/SelectAllNotificationsByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

function SendNotificationMail(MailSending) {
    debugger;
    var ds = {};
    var table = {};
    var data = "{'mailObj':" + JSON.stringify(MailSending) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/SendEmail");
    table = JSON.parse(ds.d);
    return table;
}
function FillNotificationTable(Records) {

    var checkrole = $('#hdfRole').val();
    if (checkrole == Roles.Manager) {
        $("thead#notificationthead tr").remove();
        var html = '<tr><th>Title</th> <th>Description</th> <th>Start Date</th> <th>End Date</th></tr> ';
        $("#notificationthead").append(html);

        $("tbody#notificationrows tr").remove();            //Remove all existing rows for refreshing
        $.each(Records, function (index, Records) {
            var html = '<tr NotificationID="' + Records.NotificationID + '" BoutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Title + '</td><td class="center">' + Records.Description + '</td><td class="center">' + ConvertJsonToDate(Records.StartDate) + '</td><td class="center">' + ConvertJsonToDate(Records.EndDate) + '</td></tr>'
            $("#NotificationTable").append(html);
        })

    }
    else {

        $("tbody#notificationrows tr").remove();            //Remove all existing rows for refreshing
        $.each(Records, function (index, Records) {
            var html = '<tr NotificationID="' + Records.NotificationID + '" BoutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Title + '</td><td class="center">' + Records.Description + '</td><td class="center">' + ConvertJsonToDate(Records.StartDate) + '</td><td class="center">' + ConvertJsonToDate(Records.EndDate) + '</td><td class="center"><a class="btn btn-info notificationedit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger notificationdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>'
            $("#NotificationTable").append(html);
        })

    }









}

//------------Dropdowns-----------------
function BindProductDropdown() {
    var jsonResult = {};
    var Notify = new Object();
    jsonResult = GetAllProducts(Notify);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}
function BindTemplateDropdown() {
    debugger;
    var jsonResult = {};
    var Notify = new Object();
    jsonResult = GetAllTemplateNames(Notify);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}
function BindNewsLetterProductDropdown() {
    var jsonResult = {};
    var Notify = new Object();
    jsonResult = GetAllProductsForNewsLetter(Notify);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}
function GetAllEmailsForNewsLetter(Notify)
{
    var ds = {};
    var table = {};
    var data = "{'notifyObj':" + JSON.stringify(Notify) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetAllNewsLetterEmails");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllProducts(Notify) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Notify) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductIDandName");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllTemplateNames(Notify) {
    var ds = {};
    var table = {};
    var data = "{'notifyObj':" + JSON.stringify(Notify) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetAllTemplateNameAndID");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllProductsForNewsLetter(Notify) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Notify) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductIDandNameForNewsLetter");
    table = JSON.parse(ds.d);
    return table;
}
function BindCategoryDropdown() {
    var jsonResult = {};
    var Notify = new Object();
    jsonResult = GetAllCategories(Notify);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}
function GetAllCategories(Notify) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Notify) + "}";
    ds = getJsonData(data, "../AdminPanel/Category.aspx/GetAllCategoryIDandName");
    table = JSON.parse(ds.d);
    return table;
}
//------------Insert--------------------
function InsertNotification(Notification) {
    var data = "{'notificationObj':" + JSON.stringify(Notification) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notifications.aspx/InsertNotification");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function InsertNewsLetter(Notification) {
    var data = "{'notificationObj':" + JSON.stringify(Notification) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notifications.aspx/AddNesLetterMailTrackingDetails");
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
        $(".products").val(Records.ProductID).trigger("change");
        $(".categories").val(Records.CategoryCode).trigger("change");
        $("#hdfNotificationID").val(Records.NotificationID);
    });
    $(".submitDetails").text("Save");
    $("#editLabel").text("Edit Notification");
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
function DeleteNotification(Notification) {
    var data = "{'notificationObj':" + JSON.stringify(Notification) + "}";

    var jsonResult = getJsonData(data, "../AdminPanel/Notifications.aspx/DeleteNotification");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

//Add Notification
function AddNotification() {
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $("#txtTitle").val($("#txtTitle").val().trim());
    $("#txtDescription").val($("#txtDescription").val().trim());
    var result = "";
    var Notification = new Object();
    Notification.NotificationID = $("#hdfNotificationID").val();

    if ($("#txtTitle").val() != "") {
        Notification.Title = $("#txtTitle").val();
    }
    else {

        return;
    }
    if ($("#dateStartDate").val() != "") {
        Notification.StartDate = $("#dateStartDate").val();
    }
    else {

        return;
    }
    if ($("#dateEndDate").val() != "") {
        Notification.EndDate = $("#dateEndDate").val();
    }
    else {

        return;
    }
    if ($("#dateStartDate").datepicker("getDate") > $("#dateEndDate").datepicker("getDate")) {

        return;
    }
    Notification.Description = $("#txtDescription").val();
    Notification.ProductID = $(".products").val();
    Notification.CategoryCode = $(".categories").val();

    result = InsertNotification(Notification);
    if (result == "1") {
        $('#rowfluidDiv').show();
        $('.alert-success').show();
        $('.alert-success strong').text(Messages.InsertionSuccessFull);
        BindNotificationsTable();
        $("#txtTitle").val("");
        $("#txtDescription").val("");
        $("#dateStartDate").val("");
        $("#dateEndDate").val("");
        $(".submitDetails").text("Save");
        $("#editLabel").text("New Notification");
        $("#hdfNotificationID").val('');
        $(".products").select2("val", "");
        $(".categories").select2("val", "");
    }
    if (result != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').text(Messages.InsertionFailure);
    }
    //Scroll page
    var offset = $('#rowfluidDiv').offset();
    offset.left -= 20;
    offset.top -= 20;
    $('html, body').animate({
        scrollTop: offset.top,
        scrollLeft: offset.left
    });
}

function BindTemplateImagesPreview(templateID) {
    debugger;
    var templ = $('#templatePreviewImagehold');
   

    //var span = document.createElement('span');
    //span.innerHTML = ['<img id="templateimage" class="masonry-thumb" src="" title=""/>'].join('');
    //document.getElementById('templatePreviewImagehold').insertBefore(span, null); 

    //var imgdes = document.getElementById('templateimage');
   // var file = "../ImageHandler/ImageServiceHandler.ashx?TemplateID=" + templateID;
   //   var html = ('<div class="masonry-thumb">'
    //  + '</div>');

    var iframe = document.createElement('iframe');
    iframe.className="PreviewTemplate"
    iframe.src = "../ImageHandler/ImageServiceHandler.ashx?TemplateID=" + templateID;
    var divUrl =    
    templ.append(iframe);
    //var TiqueImage = document.getElementById("content1");
    //TiqueImage.style.backgroundImage = ImageUrl;
    //TiqueImage.style.backgroundSize = 'cover';
    //TiqueImage.style.backgroundRepeat = 'no-repeat';
    //TiqueImage.style.backgroundPosition = 'center center';
      //templ.append(file);
    //var templateImages = {};
    //templateImages = AddSelectedImageTotemplate(Notificatio -n);
    //var imagedivholder = $('#templatePreviewImagehold');
    //var $mars = $('.templatePreviewholder');
    //var elems = $();
    //elems = elems.add(templateImages);
    //$mars.append(elems);
    //$mars.masonry('appended', elems);
}

function BindAllProductImages(productId) {
    var imagedivholder = $('#NewsLetterimagehold');
    var Product = new Object();
    Product.ProductID = productId;
    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllProductsImageDetailsForNewsLetter(Product);
    //$("#NewsLetterimagehold").find(".masonry-thumb").remove();

    for (var i = 0; i < totalimages.length; i++) {


        var html = ('<div class="masonry-thumb"  productid=' + totalimages[i].ProductID + ' imageid=' + totalimages[i].ImageID + '>'
        + '<a class="image-link" ImageID="' + totalimages[i].ImageID + '">'
        + '<img id="img' + i + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages[i].ImageID + '"></img>'
        + '<input id="' + totalimages[i].ProductID + '" class="checkDes" type="checkbox">'
        + '</a>' + '</div>');

        imagedivholder.append(html);


    }
}

function MainImageClick(checkedImage) {
    $(".PreviewTemplate").remove();
    $("#templatePreviewImagehold").find(".templatePreviewOuterDiv").remove();
    var ImageInfo = [];
    var idval;
    var pdtIDs = [];
    var imageCount = 0;
    pdtIDs = $('.Newsletterproducts').val();
    $('#NewsLetterimagehold div').each(function (index) {
        //val.push($(this).attr('id'));
        var idval = $(this).attr('imageid');
        //var chkflag = document.getElementsByClassName("checkDes").checked;
        if (document.getElementById(pdtIDs[index]) != null) {
            var chkflag = document.getElementById(pdtIDs[index]).checked;
            if (chkflag == true) {
                imageCount = imageCount + 1;
                ImageInfo.push(idval);
            }
            //if ($('input[type=checkbox]:checked')==='True') {

            //}

        }

    });
    if (imageCount != 8) {
        CustomAlert("Please select 8 images for selected template!");
    }
    debugger;
    var Notification = new Object();
    Notification.ImageIDs = ImageInfo;
    Notification.TemplateID = $(".template").val();
    Notification.Description = $("#txtNewsletterDescription").val();
    var totalimages = {};
    totalimages = AddSelectedImageTotemplate(Notification);
    var imagedivholder = $('#templatePreviewImagehold');
    var $mars = $('.templatePreviewholder');
    var elems = $();

    //var html = ('<div class="masonry-thumb"  productid=' + totalimages[i].ProductID + ' imageid=' + totalimages[i].ImageID + ' pname=' + totalimages[i].Name + ' pdescription=' + totalimages[i].Description + ' pprice=' + totalimages[i].Price + ' isoutstock=' + totalimages[i].IsOutOfStock + ' isactive=' + totalimages[i].IsActive + ' categories=' + totalimages[i].Categories + ' designers=' + totalimages[i].DesignerID + ' designerName=' + totalimages[i].DesignerName + ' discount=' + totalimages[i].Discount + '>'
    //+ '<a class="image-link" ImageID="' + totalimages[i].ImageID + '">'
    //+ '<img id="img' + i + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages[i].ImageID + '"></img>'
    //+ '</a><div class="productDetailsdiv"><span>' + totalimages[i].ProductNo + '</span><span class="">' + totalimages[i].Name + '</span><span>₹  ' + totalimages[i].Price + '</span><span>Off:₹ ' + totalimages[i].Discount + '</span></div>'
    //+ '</div>');

    elems = elems.add(totalimages);



    $mars.append(elems);
    $mars.masonry('appended', elems);
    //return html;
}
function AddSelectedImageTotemplate(Notification) {
    debugger;
    var ds = {};
    var table = {};
    var data = "{'notificationObj':" + JSON.stringify(Notification) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/AddSelectedImageToHtmlTemplate");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllProductsImageDetailsForNewsLetter(Product) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductImagesFornewsLetter");
    table = JSON.parse(ds.d);
    return table;
}

/////////////////////////////////////////////////////////////Basic Validation/////////////////////////////////////////////////////////////////////

//Basic Validation For New Notification
//CreatedBy Thomson
function NotificationValidation() {
    $('#Displaydiv').remove();
    var Title = $('#txtTitle');
    var Descrip = $('#txtDescription');
    var StDate = $('#dateStartDate');
    var EndDate = $('#dateEndDate');

    var container = [
        { id: Title[0].id, name: Title[0].name, Value: Title[0].value },
        { id: Descrip[0].id, name: Descrip[0].name, Value: Descrip[0].value },
        { id: StDate[0].id, name: StDate[0].name, Value: StDate[0].value },
        { id: EndDate[0].id, name: EndDate[0].name, Value: EndDate[0].value },
    ];

    var j = 0;
    var Errorbox = document.getElementById('ErrorBox');
    var divs = document.createElement('div');
    divs.setAttribute("id", "Displaydiv");
    Errorbox.appendChild(divs);
    for (var i = 0; i < container.length; i++) {

        if (container[i].Value == "") {
            j = 1;


            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
            txtB.style.backgroundPosition = "95% center";
            txtB.style.backgroundRepeat = "no-repeat";
            //txtB.style.backgroundColor = "#FFFEE1";
            Errorbox.style.paddingLeft = "30px";

        }



    }
    if (j == '1') {
        var p = document.createElement('p');
        p.innerHTML = "* Some Fields Are Empty ! ";
        p.style.color = "Red";
        p.style.fontSize = "14px";

        divs.appendChild(p);

        return false;
    }
    if (j == '0') {
        $('#ErrorBox').hide();
        AddNotification();
        return true;
    }
}