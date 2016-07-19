$("document").ready(function (e) {

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

    $(".Users").select2({
        placeholder: "Choose user",
        allowClear: true,
        data: BindUserDropdown()
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

            RemoveValidationStyle();
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
});
    //end styling client validation

    //--Personalised notification related functions

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

    function BindPersonalisedNotificationTextBoxes(Records) {
        $.each(Records, function (index, Records) {
          
            $(".Users").val(Records.UserID).trigger("change");

            $("#PersonalisedtxtTitle").val(Records.Title);
            $("#PersonalisedtxtDescription").val(Records.Description);
            $("#PersonaliseddateStartDate").val(ConvertJsonToDate(Records.StartDate));
            $("#PersonaliseddateEndDate").val(ConvertJsonToDate(Records.EndDate));
            $("#ddlProducts").val(Records.ProductID).trigger("change");
            $("#ddlCategories").val(Records.CategoryCode).trigger("change");
            $("#hdfNotificationID1").val(Records.NotificationID);
        });

        $("#PersonalisededitLabel").text("Edit Notification");
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
    function RemoveStyle() {
        $('input[type=text],input[type=password],textarea').css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3').hide(1000);
    }

    function RemoveValidationStyle()
    {
        $('input[type=text],input[type=password],textarea').css({ background: 'white' });
        $('#ErrorBox,#PersonalisedErrorBox,#PersonalisedDisplaydiv,#ErrorBox1,#ErrorBox2,#ErrorBox3').hide(1000);
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
    function GetAllProducts(Notify) {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Notify) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductIDandName");
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

    function AddPersonalisedNotification() {


        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();
        $("#PersonalisedtxtTitle").val($("#PersonalisedtxtTitle").val().trim());
        $("#PersonalisedtxtDescription").val($("#PersonalisedtxtDescription").val().trim());
        var result = "";
        var Notification = new Object();

        if ($(".Users").val() != "") {
            Notification.UserID = $(".Users").val();
        }
        else {
            return;
        }

        Notification.NotificationID =  $("#hdfNotificationID1").val();

        if ($("#PersonalisedtxtTitle").val() != "") {
            Notification.Title = $("#PersonalisedtxtTitle").val();
        }
        else {

            return;
        }
        if ($("#PersonaliseddateStartDate").val() != "") {
            Notification.StartDate = $("#PersonaliseddateStartDate").val();
        }
        else {

            return;
        }
        if ($("#PersonaliseddateEndDate").val() != "") {
            Notification.EndDate = $("#PersonaliseddateEndDate").val();
        }
        else {

            return;
        }
        //if ($("#PersonaliseddateStartDate").datepicker("getDate") > $("#PersonaliseddateEndDate").datepicker("getDate")) {

        //    return;
        //}
        Notification.Description = $("#PersonalisedtxtDescription").val();
        Notification.ProductID = $("#ddlProducts").val();
        Notification.CategoryCode = $("#ddlCategories").val();

        result = InsertNotification(Notification);
        if (result == "1") {
            $('#rowfluidDiv').show();
            $('.alert-success').show();
            $('.alert-success strong').text(Messages.InsertionSuccessFull);

            ClearControlsOfPersonalNotifications();

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

    function PersoanlisedNotificationValidation() {

        $('#Displaydiv').remove();
        var Title = $('#PersonalisedtxtTitle');
        var Descrip = $('#PersonalisedtxtDescription');
        var StDate = $('#PersonaliseddateStartDate');
        var EndDate = $('#PersonaliseddateEndDate');

        var container = [
            { id: Title[0].id, name: Title[0].name, Value: Title[0].value },
            { id: Descrip[0].id, name: Descrip[0].name, Value: Descrip[0].value },
            { id: StDate[0].id, name: StDate[0].name, Value: StDate[0].value },
            { id: EndDate[0].id, name: EndDate[0].name, Value: EndDate[0].value },
        ];

        var j = 0;
        var Errorbox = document.getElementById('PersonalisedErrorBox');
        var divs = document.createElement('div');
        divs.setAttribute("id", "ErrorBox");
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
            $('#PersonalisedErrorBox').hide();
            AddPersonalisedNotification();
            return true;
        }
    }
