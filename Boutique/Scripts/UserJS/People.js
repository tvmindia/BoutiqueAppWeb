
//document.ready
$("document").ready(function (e) {

    parent.document.title = Pages.People;
    $('.AddUser').hide();
    //BIND REGION 

    var LoginUserRole = getRole();

    $('#hdfRole').val(LoginUserRole[0]);
    $('#hdfloginname').val(LoginUserRole[1]);

    if (LoginUserRole[0] != Roles.Manager) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.     
            document.getElementById('fileUpload').addEventListener('change', handleFileSelect, false);
        }
        else {
            alert('The File APIs are not fully supported in this browser.');
        }
    }

    BindAsyncUserTable();
    BindAsycDesignerTable();
    BindAsyncAdminsTable();
    BindAsyncManagersTable();

    $('#AdministratorTable').DataTable({
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
        "fnPageChange": "next"           //removing paging
    });
    $('#ManagerTable').DataTable({
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
        "fnPageChange": "next"            //removing paging
    });
    $('#DesignerTable').DataTable({
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
        "fnPageChange": "next"          //removing paging
    });
    $('#UsersTable').DataTable({
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],  
        "fnPageChange": "next"
    });

    //EDIT REGION
    $(".adminedit").live(
    {
        click: function (e) {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var jsonResult = {};
            editedrow = $(this).closest('tr');
            var Admin = new Object();
            Admin.UserID = editedrow.attr("userID");
            jsonResult = GetAdmin(Admin);
            if (jsonResult != undefined) {
                BindAdminTextBoxes(jsonResult);
            }
            return false;
        }
    })
    $(".manageredit").live(
      {
          click: function (e) {
              $('#rowfluidDiv').hide();
              $('.alert-success').hide();
              $('.alert-error').hide();
              var jsonResult = {};
              editedrow = $(this).closest('tr');
              var Admin = new Object();
              Admin.UserID = editedrow.attr("userID");
              jsonResult = GetAdmin(Admin);
              if (jsonResult != undefined) {
                  BindManagerTextBoxes(jsonResult);
              }
              return false;
          }
      })
    $(".useredit").live(
       {
           click: function (e) {
               $('.AddUser').show();
               $(".AddUser").text("Save");
               $('#rowfluidDiv').hide();
               $('.alert-success').hide();
               $('.alert-error').hide();
               var jsonResult = {};
               editedrow = $(this).closest('tr');
               var User = new Object();
               User.UserID = editedrow.attr("userID");
               jsonResult = GetUser(User);
               if (jsonResult != undefined) {
                   BindUserTextBoxes(jsonResult);
               }
               return false;
           }
       })
    $(".designeredit").live(
     {
         click: function (e) {

             $('#rowfluidDiv').hide();
             $('.alert-success').hide();
             $('.alert-error').hide();


             editedrow = $(this).closest('tr');
             var Designer = new Object();
             Designer.DesignerID = editedrow.attr("designerID");

             var jsonResult = GetDesigner(Designer);
             var ImageIsNull = jsonResult[1].IsDesignerImageNull;
             if (jsonResult[0] != undefined) {

                 BindDesignerTextBoxes(jsonResult[0]);
                 GetDesignerImage(Designer.DesignerID, ImageIsNull)
             }



             return false;
         }
     })

    //DELETE REGION
    $(".userdelete").live(
       {
           click: function (e) {
               $('#rowfluidDiv').hide();
               $('.alert-success').hide();
               $('.alert-error').hide();
               clearUserControls();
               editedrow = $(this).closest('tr');
               var e = editedrow.attr("userID");
               var p = "User";
               DeleteCustomAlert('Are You Sure?', e, p);
               return false;
           }
       })
    $(".admindelete").live(
    {
        click: function (e) {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            clearAdminControls();
            editedrow = $(this).closest('tr');
            var e = editedrow.attr("AdminID");
            var p = "Admin";
            DeleteCustomAlert('Are You Sure?', e, p);
            return false;
        }
    })
    $(".managerdelete").live(
  {
      click: function (e) {
          $('#rowfluidDiv').hide();
          $('.alert-success').hide();
          $('.alert-error').hide();
          clearManagerControls();
          editedrow = $(this).closest('tr');
          var e = editedrow.attr("AdminID");
          var p = "Manager";
          DeleteCustomAlert('Are You Sure?', e, p);
          return false;
      }
  })
    $(".designerdelete").live(
     {
         click: function (e) {

             $('#rowfluidDiv').hide();
             $('.alert-success').hide();
             $('.alert-error').hide();
             clearDesignerControls();
             editedrow = $(this).closest('tr');
             var e = editedrow.attr("designerID");
             var p = "Designer";
             DeleteCustomAlert('Are You Sure?', e, p);
             return false;
         }
     })

    //cancel REGION
    $(".CancelAdmin").live({
        click: function (e) {// Clear controls
            clearAdminControls();
            RemoveStyle();
        }
    })
    $(".CancelManager").live({
        click: function (e) {// Clear controls
            clearManagerControls();
            RemoveStyle();
        }
    })
    $(".CancelUser").live({
        click: function (e) {// Clear controls
            clearUserControls();
            RemoveStyle();
        }
    })
    $(".CancelDesigner").live({
        click: function (e) {// Clear controls
            clearDesignerControls();
            RemoveStyle();
        }
    })   
 
    //Style setting for client side Validation
    //CreatedBy Thomson

    $('input[type=text],input[type=password]').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3').slideUp(1000);
    });
    $('textarea').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').slideUp(1000);
    });

    //end styling client validation

});
//end of document.ready

function RemoveStyle() {
    $('input[type=text],input[type=password],textarea').css({ background: 'white' });
    $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3').slideUp(1000);
}

function DeleteItem(e,p)
{
    var jsonResult = {};
    //editedrow = $(this).closest('tr');
    if (p == "User")
    {
        var User = new Object();
        User.UserID = e;
        jsonResult = DeleteUser(User);
        if (jsonResult != undefined) {
            if (jsonResult == "1") {
                BindAsyncUserTable()//Gridbind
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text(Messages.DeletionSuccessFull);
                AutoScrollToAlertBox();
            }
            if (jsonResult != "1") {
                BindAsyncUserTable()//Gridbind
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text(Messages.DeletionFailure);
                AutoScrollToAlertBox();
            }
        }
    }
    if(p=="Admin")
    {
        var Admin = new Object();
        Admin.AdminID = e;
        jsonResult = DeleteAdmin(Admin);
        if (jsonResult != undefined) {
            if (jsonResult == "1") {
                BindAsyncAdminsTable();//Gridbind
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text(Messages.DeletionSuccessFull);
                AutoScrollToAlertBox();
            }
            if (jsonResult != "1") {
                BindAsyncAdminsTable();//Gridbind
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text(Messages.DeletionFailure);
                AutoScrollToAlertBox();
            }
        }
    }
    if(p=="Manager")
    {
        var Manager = new Object();
        Manager.AdminID = e;
        jsonResult = DeleteManager(Manager);
        if (jsonResult != undefined) {
            if (jsonResult == "1") {
                BindAsyncManagersTable();//Gridbind
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text(Messages.DeletionSuccessFull);
                AutoScrollToAlertBox();
            }
            if (jsonResult != "1") {
                BindAsyncManagersTable();//Gridbind
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text(Messages.DeletionFailure);
                AutoScrollToAlertBox();
            }
        }
    }
    if(p=="Designer")
    {
        var Designer = new Object();
        Designer.DesignerID = e;

        jsonResult = DeleteDesigner(Designer);
        if (jsonResult != undefined) {
            if (jsonResult == "1") {
                BindAsycDesignerTable()//Gridbind
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text(Messages.DeletionSuccessFull);
                AutoScrollToAlertBox();
            }
            if (jsonResult != "1") {
                BindAsycDesignerTable()//Gridbind
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text(Messages.DeletionFailure);
                AutoScrollToAlertBox();
            }
        }
    }
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    $("#list").find(".thumb").remove();
    // Loop through the FileList and render image files as thumbnails.
    var f;
    f = files[0];
    //for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
        //continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
        return function (e) {
            // Render thumbnail.
            var span = document.createElement('span');
            span.innerHTML = ['<img class="thumb" src="', e.target.result,
                             '" title="', escape(theFile.name), '"/>'].join('');
            document.getElementById('list').insertBefore(span, null);
        };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
    //}
}


function BindAsyncUserTable() {
    var jsonResult = {};
    var Users = new Object();
    jsonResult = GetAllUsers(Users);
    if (jsonResult != undefined) {
        BindUserTable(jsonResult);
    }
}

function BindAsycDesignerTable() {
    var jsonResult = {};
    var Designer = new Object();
    jsonResult = GetAllDesigners(Designer);
    if (jsonResult != undefined) {
        BindDesignerTable(jsonResult);
    }
}

function BindAsyncAdminsTable() {
    var jsonResult = {};
    var Admins = new Object();
    jsonResult = GetAllAdmins(Admins);
    if (jsonResult != undefined) {
        BindAdminsTable(jsonResult);
    }
}

function BindAsyncManagersTable() {
    var jsonResult = {};
    var Manager = new Object();
    jsonResult = GetAllManager(Manager);
    if (jsonResult != undefined) {
        BindManagerTable(jsonResult);
    }
}


function GetAllUsers(Users) {

    var ds = {};
    var table = {};
    var data = "{'Usersobj':" + JSON.stringify(Users) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllUsersByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllDesigners(Designer) {

    var ds = {};
    var table = {};
    var data = "{'Designerobj':" + JSON.stringify(Designer) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllDesigners");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllManager(Manager) {

    var ds = {};
    var table = {};
    var data = "{'Managerobj':" + JSON.stringify(Manager) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllManager");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllAdmins(Admins) {

    var ds = {};
    var table = {};
    var data = "{'Adminsobj':" + JSON.stringify(Admins) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllAdmins");
    table = JSON.parse(ds.d);
    return table;
}


function BindUserTable(Records) {

    var checkrole = $('#hdfRole').val();
    var lname = $('#hdfloginname').val();
    if (checkrole == Roles.Manager) {
        $("thead#Usersthead tr").remove();
        var html = ' <tr><th>Name</th><th>Mobile</th><th>Profile</th></tr> ';
        $("#Usersthead").append(html);
        $("tbody#Usersrows tr").remove();
        $.each(Records, function (index, Records) {          
            var html = '<tr userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td></tr>';
            $("#UsersTable").append(html);
        })
    }
    else {       
        $("tbody#Usersrows tr").remove();
        $.each(Records, function (index, Records) {       
            var name = Records.Name;
            if (Records.Name == lname ) {
                var html = '<tr userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info useredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger " disabled="disabled" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
                $("#UsersTable").append(html);
            }
            else {
                var html = '<tr userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info useredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger userdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
                $("#UsersTable").append(html);
            }
        })
    }
}

function BindDesignerTable(Records) {
    var checkrole = $('#hdfRole').val();
    if (checkrole == Roles.Manager) {

        $("thead#Designthead tr").remove();
        var html = ' <tr><th>Name</th><th>Mobile</th><th>Profile</th></tr> ';
        $("#Designthead").append(html);
        $("tbody#Designerrows tr").remove();
        $.each(Records, function (index, Records) {
            var html = '<tr designerID="' + Records.DesignerID + '"><td>' + Records.Name + '</td>	<td class="center">' + (Records.Mobile != null ? Records.Mobile : "-") + '</td><td class="center">' + Records.Profile + '</td></tr>';
            $("#DesignerTable").append(html);
        })
    }
    else {

        $("tbody#Designerrows tr").remove();
        $.each(Records, function (index, Records) {
            var html = '<tr designerID="' + Records.DesignerID + '"><td>' + Records.Name + '</td>	<td class="center">' + (Records.Mobile != null ? Records.Mobile : "-") + '</td><td class="center">' + Records.Profile + '</td><td class="center"><a class="btn btn-info designeredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger designerdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
            $("#DesignerTable").append(html);
        })

    }
}

function BindManagerTable(Records) {
    var checkrole = $('#hdfRole').val();
    if (checkrole == Roles.Manager) {
        $("thead#managerthead tr").remove();
        var html = ' <tr><th>Name</th><th>Mobile</th><th>Email</th></tr> ';
        $("#managerthead").append(html);
        $("tbody#Managerrows tr").remove();
        $.each(Records, function (index, Records) {
            var html = '<tr userID="' + Records.UserID + '" AdminID="' + Records.AdminID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td></tr>';
            $("#ManagerTable").append(html);
        })
    }
    else {
        $("tbody#Managerrows tr").remove();
        $.each(Records, function (index, Records) {
                    var html = '<tr userID="' + Records.UserID + '" AdminID="' + Records.AdminID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info manageredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger managerdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
                $("#ManagerTable").append(html);     
        })
    }
}

function BindAdminsTable(Records) {

    var checkrole = $('#hdfRole').val();
    var lname = $('#hdfloginname').val();
    if (checkrole == Roles.Manager) {
        $("thead#thead tr").remove();
        var html = '<tr><th>Name</th><th>Mobile</th><th>Email</th></tr> ';
        $("#thead").append(html);
        $("tbody#Adminrows tr").remove();
        $.each(Records, function (index, Records) {
            var html = '<tr userID="' + Records.UserID + '" AdminID="'+Records.AdminID +'" ><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td></tr>';
            $("#AdministratorTable").append(html);
        })
    }
    else {
        $("tbody#Adminrows tr").remove();
        $.each(Records, function (index, Records) {           
            if (Records.LoginName == lname) {
                var html = '<tr userID="' + Records.UserID + '"  AdminID="' + Records.AdminID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info adminedit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger " disabled="disabled" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
                $("#AdministratorTable").append(html);
            }
            else {
                var html = '<tr userID="' + Records.UserID + '"  AdminID="' + Records.AdminID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info adminedit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger admindelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
                $("#AdministratorTable").append(html);
            }
        })
    }



}


function InsertUser(User) {

    var data = "{'userObj':" + JSON.stringify(User) + "}";

    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/NewAdmin");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function InsertAdmin(Admin) {

    var data = "{'AdminObj':" + JSON.stringify(Admin) + "}";

    jsonResult = getJsonData(data, "../AdminPanel/People.aspx/AddAdmin");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function InsertManager(Manager) {

    var data = "{'ManagerObj':" + JSON.stringify(Manager) + "}";

    jsonResult = getJsonData(data, "../AdminPanel/People.aspx/AddManager");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function InsertDesigner(Designer) {
    var data = "{'designerObj':" + JSON.stringify(Designer) + "}";

    jsonResult = getJsonData(data, "../AdminPanel/People.aspx/InsertDesigner");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}


function clearManagerControls() {
    $("#txtManagerName").val('');
    $("#txtManagerMobile").val('');
    $("#txtManagerLoginName").val('');
    $("#lblManagerLoginName").text('');
    $("#lblManagerLoginName").hide();
    $("#txtManagerLoginName").show();


    $("#txtManagerPass").val('');
    $("#txtManagerConPass").val('');
    $("#txtManagerEmail").val('');
    $("#chkActiveManager").val('');
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $(".AddManager").text("Save");
    $("#hdfAdminID").val('');
    $("#hdfUserID").val('');
    $("#editManagerLabel").text("New Manager");
    $('#imgfail1').hide();
    $('#imgsuccess1').hide();
    $("#hdfEmailEditVerify").val('');
    $("#hdfCardNo").val('');
    $("#hdfMobile").val('');
}

function clearAdminControls() {

    $("#txtAdminName").val('');
    $("#txtMobileAdmin").val('');
    $("#txtAdminLoginName").val('');
    $("#lblAdminLoginName").text('');
    $("#lblAdminLoginName").hide();
    $("#txtAdminLoginName").show();
    

    $("#txtAdminPass").val('');
    $("#txtAdminConPass").val('');
    $("#txtAdminEmail").val('');
    $("#chkActiveAdmin").val('');
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $(".AddAdmin").text("Save");
    $("#hdfAdminID").val('');
    $("#hdfUserID").val('');
    $("#editAdminLabel").text("New Administrator");
    $('#imgfail').hide();
    $('#imgsuccess').hide();
    $("#hdfEmailEditVerify").val('');
    $("#hdfCardNo").val('');
    $("#hdfMobile").val('');
    
}

function clearUserControls() {

    $("#txtName").val('');
    $("#txtMobile").val('');
    $("#txtEmail").val('');
    $("#chkActive").val('');
    $("#dateDOB").val('');
    $("#dateAnniversary").val('');
    $('#rowfluidDiv').hide();
   
    $('.alert-success').hide();
    $('.alert-error').hide();
  
    $('.AddUser').hide();

    $("#hdfUserID").val('');
    $("#hdfCardNo").val('');
    $("#hdfMobile").val('');
}

function clearDesignerControls() {
    $("#txtDesignerName").val('');
    $("#txtDesignerMobile").val('');
    $("#txtDesignerProfile").val('');
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $("#hdfDesignerID").val('');
    $("#list").find(".thumb").remove();
    
    $("#editDesignerLabel").text("New Designer");

}


function GetUser(User) {
    var ds = {};
    var table = {};
    var data = "{'userobj':" + JSON.stringify(User) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetUser");
    table = JSON.parse(ds.d);
    return table;
}

function GetAdmin(Admin) {
    var ds = {};
    var table = {};
    var data = "{'Adminobj':" + JSON.stringify(Admin) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetAdmin");
    table = JSON.parse(ds.d);
    return table;
}

function GetDesigner(Designer) {
    var ds = {};
    var table = {};
    var data = "{'designerobj':" + JSON.stringify(Designer) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetDesigner");
    table = JSON.parse(ds.d);
    return table;
}

function GetDesignerImage(DesignerID, ImageIsNull) {
   
    if ($("#list").find(".thumb") != null || $("#list").find(".thumb") != 'undefined') {
        $("#list").find(".thumb").remove();
    }
    var span = document.createElement('span');
    span.innerHTML = ['<img id="designerimage" class="thumb" src="" title=""/>'].join('');
    document.getElementById('list').insertBefore(span, null);

    var imgdes = document.getElementById('designerimage');
    imgdes.src = "../ImageHandler/ImageServiceHandler.ashx?DesignerId=" + DesignerID;
    //if (ImageIsNull == "0") {
    //    $("#list").find(".thumb").remove();
    //    var span = document.createElement('span');
    //    span.innerHTML = ['<img id="designerimage" class="thumb" src="../img/no-user-image.gif" title=""/>'].join('');
    //    document.getElementById('list').insertBefore(span, null);
    //}
    return;

}


function BindUserTextBoxes(Records) {
    $.each(Records, function (index, Records) {

        $("#txtName").val(Records.Name);
        $("#txtMobile").val(Records.Mobile);
        $("#txtEmail").val(Records.Email);

        if (Records.Active = 'true') {
            // $("#chkActive").attr('checked', 'checked');
            // $(".chkActive").attr("checked", "checked
            $(".chkActive").prop('checked', true);

        }
        else {
            // $("#chkActive").removeAttr('checked');
            $(".chkActive").prop('checked', false);
        }
        $("#chkActive").val(Records.IsActive);
        $("#txtCaption").val(Records.Caption);
        $("#dateDOB").val(ConvertJsonToDate(Records.DOB));
        $("#dateAnniversary").val(ConvertJsonToDate(Records.Anniversary));
        $("#hdfUserID").val(Records.UserID);

        $("#hdfMobile").val(Records.Mobile);
        $("#hdfCardNo").val(Records.LoyaltyCardNo);
        $("#hdfBoutiqueID").val(Records.BoutiqueID);
    })

}

function BindAdminTextBoxes(Records) {
    $.each(Records, function (index, Records) {
        $("#txtAdminName").val(Records.Name);
        $("#txtMobileAdmin").val(Records.Mobile);
        $("#txtAdminEmail").val(Records.Email);
        $("#hdfEmailEditVerify").val(Records.Email);
        $("#txtAdminLoginName").val(Records.LoginName);
        $("#lblAdminLoginName").text(Records.LoginName);

        $("#lblAdminLoginName").show();
        $("#txtAdminLoginName").hide();
      
        $("#hdfMobile").val(Records.Mobile);
        $("#hdfAdminID").val(Records.AdminID);
        if (Records.Active = 'true') {
            // $("#chkActive").attr('checked', 'checked');
            // $(".chkActive").attr("checked", "checked
            $("#chkActiveAdmin").prop('checked', true);

        }
        else {
            // $("#chkActive").removeAttr('checked');
            $("#chkActiveAdmin").prop('checked', false);
        }
        $("#chkActiveAdmin").val(Records.IsActive);
        // $("#txtCaption").val(Records.Caption);


        $("#hdfUserID").val(Records.UserID);
        $("#hdfCardNo").val(Records.LoyaltyCardNo);
        $("#hdfBoutiqueID").val(Records.BoutiqueID);
    })
    $(".AddAdmin").text("Save");
    $("#editAdminLabel").text("Edit Administrator");
}

function BindManagerTextBoxes(Records) {
    $.each(Records, function (index, Records) {

        $("#txtManagerName").val(Records.Name);
        $("#txtManagerMobile").val(Records.Mobile);
        $("#txtManagerEmail").val(Records.Email);
        $("#hdfEmailEditVerify").val(Records.Email);

        $("#txtManagerLoginName").val(Records.LoginName);
        $("#lblManagerLoginName").text(Records.LoginName);

        $("#lblManagerLoginName").show();
        $("#txtManagerLoginName").hide();

        $("#hdfMobile").val(Records.Mobile);
        $("#hdfAdminID").val(Records.AdminID);
        if (Records.Active = 'true') {
            // $("#chkActive").attr('checked', 'checked');
            // $(".chkActive").attr("checked", "checked
            $("#chkActiveManager").prop('checked', true);

        }
        else {
            // $("#chkActive").removeAttr('checked');
            $("#chkActiveManager").prop('checked', false);
        }
        $("#chkActiveManager").val(Records.IsActive);
        //$("#txtCaption").val(Records.Caption);


        $("#hdfUserID").val(Records.UserID);
        $("#hdfCardNo").val(Records.LoyaltyCardNo);
        $("#hdfBoutiqueID").val(Records.BoutiqueID);
    })
    $(".AddManager").text("Save");
    $("#editManagerLabel").text("Edit Manager");
}

function BindDesignerTextBoxes(JSONresult) {

    $("#txtDesignerName").val(JSONresult.Name);
    $("#txtDesignerMobile").val(JSONresult.Mobile);
    $("#txtDesignerProfile").val(JSONresult.Profile);
    $("#hdfDesignerID").val(JSONresult.DesignerID);

    $(".AddDesigner").text("Save");
    $("#editDesignerLabel").text("Edit Designer");
}


function DeleteUser(User) {
    var ds = {};
    var table = {};
    var data = "{'userObj':" + JSON.stringify(User) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/DeleteUser");
    table = JSON.parse(ds.d);
    return table;
}

function DeleteAdmin(Admin) {
    var ds = {};
    var table = {};
    var data = "{'AdminObj':" + JSON.stringify(Admin) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/DeleteAdmin");
    table = JSON.parse(ds.d);
    return table;
}

function DeleteManager(Manager) {
    var ds = {};
    var table = {};
    var data = "{'AdminObj':" + JSON.stringify(Manager) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/DeleteAdmin");
    table = JSON.parse(ds.d);
    return table;
}

function DeleteDesigner(Designer) {
    var ds = {};
    var table = {};
    var data = "{'designerObj':" + JSON.stringify(Designer) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/DeleteDesigner");
    table = JSON.parse(ds.d);
    return table;
}

//Add New Admin
function AddAdmin() {
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();

    var result = "";
    var Admin = new Object();
    if ($("#hdfAdminID").val() != "")
    {
        Admin.UserID = $("#hdfUserID").val();
        Admin.AdminID = $("#hdfAdminID").val();
    }
    Admin.Name = $("#txtAdminName").val();
    Admin.Mobile = $("#txtMobileAdmin").val();
    if (Admin.Mobile != $("#hdfMobile").val())
    {
        Admin.isVerified = "false";
    } 
    Admin.LoginName = $("#txtAdminLoginName").val();
    Admin.Password = $("#txtAdminConPass").val();
    Admin.Email = $("#txtAdminEmail").val();
    Admin.DOB = $("#dateDOB").val();
    Admin.Anniversary = $("#dateAnniversary").val();
    if ($('#chkActiveAdmin').is(':checked'))
    {
        Admin.IsActive = "true";
    }
    else
    {
        Admin.IsActive = "false";
    }
    result = InsertAdmin(Admin);
    if (result == "1") {
        clearAdminControls();
        $('#rowfluidDiv').show();      
        $('.alert-success').show();
        $('.alert-success strong').text(Messages.InsertionSuccessFull);
        BindAsyncAdminsTable();
        BindAsyncUserTable();
        AutoScrollToAlertBox();
    }
    if (result != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').text(Messages.InsertionFailure);
        BindAsyncAdminsTable();
        BindAsyncUserTable();
        AutoScrollToAlertBox();
    }
}
//Add New Manager
function AddManager() {
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();

    var result = "";
    var Manager = new Object();

    if ($("#hdfAdminID").val() != "") {
        Manager.UserID = $("#hdfUserID").val();
        Manager.AdminID = $("#hdfAdminID").val();
    }

    Manager.Name = $("#txtManagerName").val();
    Manager.Mobile = $("#txtManagerMobile").val();

    if (Manager.Mobile != $("#hdfMobile").val()) {
        Manager.isVerified = "false";
    }
    Manager.LoginName = $("#txtManagerLoginName").val();
    Manager.Password = $("#txtManagerConPass").val();
    Manager.Email = $("#txtManagerEmail").val();
    Manager.DOB = $("#dateDOB").val();
    Manager.Anniversary = $("#dateAnniversary").val();

    // 
    if ($('#chkActiveManager').is(':checked')) {
        Manager.IsActive = "true";
    }
    else {
        Manager.IsActive = "false";
    }

     
    result = InsertManager(Manager);
    if (result == "1") {
        clearManagerControls();
        $('#rowfluidDiv').show();
        $('.alert-success').show();
        $('.alert-success strong').text(Messages.InsertionSuccessFull);
        BindAsyncManagersTable();
        BindAsyncUserTable();
        AutoScrollToAlertBox();
    }
    if (result != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').text(Messages.InsertionFailure);
        BindAsyncManagersTable();
        BindAsyncUserTable();
        AutoScrollToAlertBox();
    }
}
//Add New Designer
function AddDesigner()
{
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();

    var result = "";
    var Designer = new Object();
    if ($("#hdfDesignerID").val() != "") {
        Designer.DesignerID = $("#hdfDesignerID").val();
    }

    Designer.Name = $("#txtDesignerName").val();
    Designer.Mobile = $("#txtDesignerMobile").val();
    Designer.Profile = $("#txtDesignerProfile").val();

    result = InsertDesigner(Designer);
    if (result.DesignerID != null) {

        var imgresult = "";
        //imageupload
        var _URL = window.URL || window.webkitURL;
        var formData = new FormData();
        var file, img;


        if ((file = $('#fileUpload')[0].files[0])) {
            img = new Image();
            img.onload = function () {
                var image = $('#fileUpload')[0].files[0];


                formData.append('files', image, file.name);
                formData.append('', Designer.DesignerID);
               
            };
            
            var image = $('#fileUpload')[0].files[0];
            formData.append('files', image, file.name);
            formData.append('DesignerId', result.DesignerID);
            formData.append('BoutiqueId', result.BoutiqueID);
            formData.append('Name', result.Name);
            formData.append('profile', result.Profile);
            formData.append('mobile', result.Mobile);
            formData.append('updatedBy', result.userName)
        }

       
        postBlobAjax(formData, "../AdminPanel/People.aspx/InserDesignerImage");
    }
    
    if (result.status == "1") {
        clearDesignerControls();
        $('#rowfluidDiv').show();
        $('.alert-success').show();
        $('.alert-success strong').text(Messages.InsertionSuccessFull);
        AutoScrollToAlertBox();
        BindAsycDesignerTable();
    }
    if (result.status != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').text(Messages.InsertionFailure);
        AutoScrollToAlertBox();
        BindAsycDesignerTable();
    }
}
//Add New User
function AddUser()
{
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();

    var result = "";
    var User = new Object();

    User.UserID = $("#hdfUserID").val();
    if (User.UserID != null) {
        User.Name = $("#txtName").val();
        User.Mobile = $("#txtMobile").val();
        User.Email = $("#txtEmail").val();
        User.LoyaltyCardNo = parseInt($("#hdfCardNo").val(), 10); // you want to use radix 10
        // so you get a decimal number even with a leading 0 and an old browser
        if (User.Mobile != $("#hdfMobile").val()) {
            User.isVerified = "false";
        }
        if ($('#chkActive').is(':checked')) {
            User.IsActive = "true";
        }
        else {
            User.IsActive = "false";
        }
        User.DOB = $("#dateDOB").val();
        User.Anniversary = $("#dateAnniversary").val();
        result = InsertUser(User);
        if (result == "1") {
            clearUserControls();
            BindAsyncUserTable();
            BindAsyncAdminsTable();
            BindAsyncManagersTable();

            $('#rowfluidDiv').show();
            $('.alert-success').show();
            $('.alert-success strong').text(Messages.InsertionSuccessFull);
            AutoScrollToAlertBox();
            $('.AddUser').hide();
        }
        if (result != "1") {
            BindAsyncUserTable();
            BindAsyncAdminsTable();
            BindAsyncManagersTable();
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.InsertionFailure);
            AutoScrollToAlertBox();
        }
    }
}

///////////////////////////////////////Basic Validation Function With Insert Function////////////////////////////////////////////////////////////
//CreatedBy Thomson
//Basic Client Side Validation and Insert For Admin Registration
function AdminValidation() {
  
    $('#Displaydiv1').remove();  
    var Name = $('#txtAdminName');
    var LoginName = $('#txtAdminLoginName');
    var Password = $('#txtAdminPass');
    var CPassword = $('#txtAdminConPass');
    var Email = $('#txtAdminEmail');
    var Phone = $('#txtMobileAdmin');
  
    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
        { id: LoginName[0].id, name: LoginName[0].name, Value: LoginName[0].value },
        { id: Password[0].id, name: Password[0].name, Value: Password[0].value },
        { id: CPassword[0].id, name: CPassword[0].name, Value: CPassword[0].value },
        { id: Phone[0].id, name: Phone[0].name, Value: Phone[0].value },
        { id: Email[0].id, name: Email[0].name, Value: Email[0].value }
    ];

    var j = 0;
    var Errorbox = document.getElementById('ErrorBox1');
    var divs = document.createElement('div');
    divs.setAttribute("id", "Displaydiv1");
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
            Errorbox.style.paddingLeft = "30px";

        }

    }  

    if ($("#hdfAdminID").val() == "") {

        if (Email[0].name != "") {        
            var result = EmailValidation();
            if (result == true) {
                var p = document.createElement('p');
                p.innerHTML = "Email Id already Exists! ";
                p.style.color = "Red";
                p.style.fontSize = "14px";
                divs.appendChild(p);
                j = 1
            }
        }
    }
    if (Password[0].value != CPassword[0].value) {
        j = 1;
        var p = document.createElement('p');
        p.innerHTML = "Password Missmatch";
        p.style.color = "Red";
        p.style.fontSize = "14px";
        divs.appendChild(p);
        Errorbox.style.borderRadius = "5px";
        Errorbox.style.display = "block";
        var txtB = document.getElementById('txtAdminPass');
        txtB.style.backgroundColor = "#f2dede";
        var txtB1 = document.getElementById('txtAdminConPass');
        txtB1.style.backgroundColor = "#f2dede";
        Errorbox.style.paddingLeft = "30px";
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
        $('#ErrorBox1').hide();
        AddAdmin()
        return true;
    }
}

//Basic Client Side Validation For Manager Registration

function ManagerValidation() {    
    $('#Displaydiv').remove(); 
    var Name = $('#txtManagerName');
    var LoginName = $('#txtManagerLoginName');
    var Password = $('#txtManagerPass');
    var CPassword = $('#txtManagerConPass');
    var Email = $('#txtManagerEmail');
    var Phone = $('#txtManagerMobile');
 
    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
        { id: LoginName[0].id, name: LoginName[0].name, Value: LoginName[0].value },
        { id: Password[0].id, name: Password[0].name, Value: Password[0].value },
        { id: CPassword[0].id, name: CPassword[0].name, Value: CPassword[0].value },
        { id: Phone[0].id, name: Phone[0].name, Value: Phone[0].value },
        { id: Email[0].id, name: Email[0].name, Value: Email[0].value }
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
            Errorbox.style.paddingLeft = "30px";
        }

    }
    if (Password[0].value != CPassword[0].value) {
        j = 1;
        var p = document.createElement('p');
        p.innerHTML = "Password Missmatch";
        p.style.color = "Red";
        p.style.fontSize = "14px";
        divs.appendChild(p);
        Errorbox.style.borderRadius = "5px";
        Errorbox.style.display = "block";
        var txtB = document.getElementById('txtAdminPass');
        txtB.style.backgroundColor = "#f2dede";
        var txtB1 = document.getElementById('txtAdminConPass');     
        Errorbox.style.paddingLeft = "30px";
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
        AddManager()
        return true;
    }
}

//Basic Client Side Validation For Designer and User Registration

function DesignerValidate() {
    $('#Displaydiv').remove();
    var Name = $('#txtDesignerName');  
    var Phone = $('#txtDesignerMobile');

    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
        { id: Phone[0].id, name: Phone[0].name, Value: Phone[0].value }
    ];

    var j = 0;
    var Errorbox = document.getElementById('ErrorBox2');
    var divs = document.createElement('div');
    divs.setAttribute("id", "Displaydiv2");
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
        $('#ErrorBox2').hide();
        AddDesigner();
        return true;
    }
}

//Basic Client Side Validation For Designer and User Registration
function UserValidate() {
    $('#Displaydiv').remove();
    var Name = $('#txtName');
    //var Email = $('#txtOwnerEmail');
    //var Address = $('#txtOwnerAddress');
    var Phone = $('#txtMobile');
    //{ id: Email[0].id, name: Email[0].name, Value: Email[0].value },
    //{ id: Address[0].id, name: Address[0].name, Value: Address[0].value },
    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value },        
        { id: Phone[0].id, name: Phone[0].name, Value: Phone[0].value }
    ];

    var j = 0;
    var Errorbox = document.getElementById('ErrorBox3');
    var divs = document.createElement('div');
    divs.setAttribute("id", "Displaydiv3");
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
        $('#ErrorBox3').hide();
        AddUser();
        return true;
    }

}

//----------------------- Email Validation Checking while new Administrator and Manager is created--------------//
function EmailValidation() {  
    var value;
    if ($('#txtAdminEmail').val() != "") {
        var Email = $('#txtAdminEmail').val();
        value = 0;
    }
    else {
        var Email = $('#txtManagerEmail').val();
       value = 1;
    }

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (emailReg.test(Email)) {
        var ds = {};
        var table = {};
        var Users = new Object();
        Users.Email = Email;

        var data = "{'UserObj':" + JSON.stringify(Users) + "}";
        ds = getJsonData(data, "../AdminPanel/Login.aspx/EmailValidation");
        table = JSON.parse(ds.d);
        if (table === 1) {
            if ($("#hdfEmailEditVerify").val() != Email) {         
                if (value == 0) {
                    $('#imgfail').show();
                    $('#imgsuccess').hide();
                }
                else {
                    $('#imgfail1').show();
                    $('#imgsuccess1').hide();
                }
            }
            //Email is Invalid 
            return true;
        }
        if (table == 0) {          
             if (value == 0)     {
                 $('#imgsuccess').show();
                 $('#imgfail').hide();
            }
            else {
                 $('#imgsuccess1').show();
                 $('#imgfail1').hide();
             }
        //Email is Valid Continue 
            return false;
        }
    }
    else {
        if (value == 0) {
            $('#imgfail').show();
            $('#imgsuccess').hide();
        }
        else {
            $('#imgfail1').show();
            $('#imgsuccess1').hide();
        }
        return false;
    }
    return false;
}
