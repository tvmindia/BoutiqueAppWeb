//document.ready
$("document").ready(function (e) {

    parent.document.title = Pages.People;
    $('.AddUser').hide();
    //BIND REGION 

    var LoginUserRole = getRole();

    $('#hdfRole').val(LoginUserRole[0]);
    $('#hdfloginname').val(LoginUserRole[1]);

    var qrStr = window.location.search;
    if (qrStr != "") {

        qrStr = qrStr.split("?")[1].split("=")[1];
        if (qrStr == "users")
        {
            $('#myTab li:eq(3) a').tab('show');
            BindAsyncUserTable();
            $('#UsersTable').DataTable({
                "bPaginate": true,
                "iDisplayLength": 6,
                "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
                "fnPageChange": "next"
            });

        }
    }

    if (LoginUserRole[0] != Roles.Manager) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.     
            document.getElementById('fileUpload').addEventListener('change', handleFileSelect, false);
        }
        else {
            alert('The File APIs are not fully supported in this browser.');
        }
    }
    BindAsyncAdminsTable();
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
    //$('#UsersTable').DataTable({
    //    "bPaginate": true,
    //    "iDisplayLength": 6,
    //    "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],  
    //    "fnPageChange": "next"
    //});

    $("#idTabAdministrator").click(function (e) {
        try
        {
            BindAsyncAdminsTable();
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "People";
            ExceptionTrack.Method = "idTabAdministrator-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    });

    $("#idTabManagers").click(function (e) {
        try
        {
            BindAsyncManagersTable();
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "People";
            ExceptionTrack.Method = "idTabManagers-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    });

    $("#idTabDesigners").click(function (e) {
        try
        {
            BindAsycDesignerTable();
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "People";
            ExceptionTrack.Method = "idTabDesigners-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    });
    $("#idTabUsers").click(function (e) {
        try
        {
            BindAsyncUserTable();
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "People";
            ExceptionTrack.Method = "idTabUsers-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    });


    //EDIT REGION
    $(".adminedit").live(
    {
        click: function (e) {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var jsonResult = {};
            try
            {
                editedrow = $(this).closest('tr');
                var Admin = new Object();
                Admin.UserID = editedrow.attr("userID");
                jsonResult = GetAdmin(Admin);
                if (jsonResult != undefined) {
                    BindAdminTextBoxes(jsonResult);
                }
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "People";
                ExceptionTrack.Method = "adminedit-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
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
              try
              {
                  editedrow = $(this).closest('tr');
                  var Admin = new Object();
                  Admin.UserID = editedrow.attr("userID");
                  jsonResult = GetAdmin(Admin);
                  if (jsonResult != undefined) {
                      BindManagerTextBoxes(jsonResult);
                  }
              }
              catch(e)
              {
                  var ExceptionTrack = new Object();
                  ExceptionTrack.Description = e.message;
                  ExceptionTrack.Module = "People";
                  ExceptionTrack.Method = "manageredit-live";
                  ExceptionTrack.ErrorSource = "JavaScript";
                  ExceptionTrack.IsMobile = false;
                  InsertException(ExceptionTrack);
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
               try
               {
                   editedrow = $(this).closest('tr');
                   var User = new Object();
                   User.UserID = editedrow.attr("userID");
                   jsonResult = GetUser(User);
                   if (jsonResult != undefined) {
                       BindUserTextBoxes(jsonResult);
                   }
               }
               catch(e)
               {
                   var ExceptionTrack = new Object();
                   ExceptionTrack.Description = e.message;
                   ExceptionTrack.Module = "People";
                   ExceptionTrack.Method = "useredit-live";
                   ExceptionTrack.ErrorSource = "JavaScript";
                   ExceptionTrack.IsMobile = false;
                   InsertException(ExceptionTrack);
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
             try
             {
                 $('#fileUpload').replaceWith($('#fileUpload').clone());
                 if (window.File && window.FileReader && window.FileList && window.Blob)
                 {
                     //  Great success! All the File APIs are supported.     
                     document.getElementById('fileUpload').addEventListener('change', handleFileSelect, false);
                 }
                 else {
                     alert('The File APIs are not fully supported in this browser.');
                 }
         
          
                 var $el = $('#fileUpload');
                 $el.wrap('<form>').closest('form').get(0).reset();
                 $el.unwrap();
             
                 editedrow = $(this).closest('tr');
                 var Designer = new Object();
                 Designer.DesignerID = editedrow.attr("designerID");

                 var jsonResult = GetDesigner(Designer);
                 var ImageIsNull = jsonResult[1].IsDesignerImageNull;
                 if (jsonResult[0] != undefined) {

                     BindDesignerTextBoxes(jsonResult[0]);
                     GetDesignerImage(Designer.DesignerID, ImageIsNull)
                 }
             }
             catch(e)
             {
                 var ExceptionTrack = new Object();
                 ExceptionTrack.Description = e.message;
                 ExceptionTrack.Module = "People";
                 ExceptionTrack.Method = "designeredit-live";
                 ExceptionTrack.ErrorSource = "JavaScript";
                 ExceptionTrack.IsMobile = false;
                 InsertException(ExceptionTrack);
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
               try
               {
                   clearUserControls();
                   editedrow = $(this).closest('tr');
                   var e = editedrow.attr("userID");
                   var p = "User";
                   DeleteCustomAlert('Are You Sure?', e, p);
               }
               catch(e)
               {
                   var ExceptionTrack = new Object();
                   ExceptionTrack.Description = e.message;
                   ExceptionTrack.Module = "People";
                   ExceptionTrack.Method = "userdelete-live";
                   ExceptionTrack.ErrorSource = "JavaScript";
                   ExceptionTrack.IsMobile = false;
                   InsertException(ExceptionTrack);
               }
               return false;
           }
       })
    $(".admindelete").live(
    {
        click: function (e) {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            try
            {
                clearAdminControls();
                editedrow = $(this).closest('tr');
                var e = editedrow.attr("AdminID");
                var p = "Admin";
                DeleteCustomAlert('Are You Sure?', e, p);
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "People";
                ExceptionTrack.Method = "admindelete-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
            return false;
        }
    })
    $(".managerdelete").live(
  {
      click: function (e) {
          $('#rowfluidDiv').hide();
          $('.alert-success').hide();
          $('.alert-error').hide();
          try
          {
              clearManagerControls();
              editedrow = $(this).closest('tr');
              var e = editedrow.attr("AdminID");
              var p = "Manager";
              DeleteCustomAlert('Are You Sure?', e, p);
          }
          catch(e)
          {
              var ExceptionTrack = new Object();
              ExceptionTrack.Description = e.message;
              ExceptionTrack.Module = "People";
              ExceptionTrack.Method = "managerdelete-live";
              ExceptionTrack.ErrorSource = "JavaScript";
              ExceptionTrack.IsMobile = false;
              InsertException(ExceptionTrack);
          }
          return false;
      }
  })
    $(".designerdelete").live(
     {
         click: function (e) {

             $('#rowfluidDiv').hide();
             $('.alert-success').hide();
             $('.alert-error').hide();
             try
             {
                 clearDesignerControls();
                 editedrow = $(this).closest('tr');
                 var e = editedrow.attr("designerID");
                 var p = "Designer";
                 DeleteCustomAlert('Are You Sure?', e, p);
             }
             catch(e)
             {
                 var ExceptionTrack = new Object();
                 ExceptionTrack.Description = e.message;
                 ExceptionTrack.Module = "People";
                 ExceptionTrack.Method = "designerdelete-live";
                 ExceptionTrack.ErrorSource = "JavaScript";
                 ExceptionTrack.IsMobile = false;
                 InsertException(ExceptionTrack);
             }
             return false;
         }
     })

    //cancel REGION
    $(".CancelAdmin").live({
        click: function (e) {// Clear controls
            try
            {
                clearAdminControls();
                RemoveStyle();
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "People";
                ExceptionTrack.Method = "CancelAdmin-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
        }
    })
    $(".CancelManager").live({
        click: function (e) {// Clear controls
            try
            {
                clearManagerControls();
                RemoveStyle();
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "People";
                ExceptionTrack.Method = "CancelManager-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
        }
    })
    $(".CancelUser").live({
        click: function (e) {// Clear controls
            try
            {
                clearUserControls();
                RemoveStyle();
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "People";
                ExceptionTrack.Method = "CancelUser-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
        }
    })
    $(".CancelDesigner").live({
        click: function (e) {// Clear controls
            try
            {
                clearDesignerControls();
                RemoveStyle();
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "People";
                ExceptionTrack.Method = "CancelDesigner-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
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
    try
    {
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "DeleteItem";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function handleFileSelect(evt) {
    try
    {
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
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "handleFileSelect";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    //}
}


function BindAsyncUserTable() {
    try
    {
        var jsonResult = {};
        var Users = new Object();
        jsonResult = GetAllUsers(Users);
        if (jsonResult != undefined) {
            BindUserTable(jsonResult);
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindAsyncUserTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindAsycDesignerTable() {
    try
    {
        var jsonResult = {};
        var Designer = new Object();
        jsonResult = GetAllDesigners(Designer);
        if (jsonResult != undefined) {
            BindDesignerTable(jsonResult);
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindAsycDesignerTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindAsyncAdminsTable() {
    try
    {
        var jsonResult = {};
        var Admins = new Object();
        jsonResult = GetAllAdmins(Admins);
        if (jsonResult != undefined) {
            BindAdminsTable(jsonResult);
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindAsyncAdminsTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindAsyncManagersTable() {
    try
    {
        var jsonResult = {};
        var Manager = new Object();
        jsonResult = GetAllManager(Manager);
        if (jsonResult != undefined) {
            BindManagerTable(jsonResult);
        }
    }
    catch(e)
    {

        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindAsyncManagersTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}


function GetAllUsers(Users) {

    var ds = {};
    var table = {};
    try
    {
        var data = "{'Usersobj':" + JSON.stringify(Users) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllUsersByBoutiqueID");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "GetAllUsers";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function GetAllDesigners(Designer) {

    var ds = {};
    var table = {};
    try
    {
        var data = "{'Designerobj':" + JSON.stringify(Designer) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllDesigners");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "GetAllDesigners";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function GetAllManager(Manager) {

    var ds = {};
    var table = {};
    try
    {
        var data = "{'Managerobj':" + JSON.stringify(Manager) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllManager");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "GetAllManager";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function GetAllAdmins(Admins) {

    var ds = {};
    var table = {};
    try
    {
        var data = "{'Adminsobj':" + JSON.stringify(Admins) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllAdmins");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {

        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "GetAllAdmins";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}


function BindUserTable(Records) {

    try
    {
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindUserTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindDesignerTable(Records) {
    try
    {
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindDesignerTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindManagerTable(Records) {
    try
    {
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
    catch(e)
    {

        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindManagerTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindAdminsTable(Records) {

    try
    {
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindAdminsTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }


}


function InsertUser(User) {
    var table = {};
    try
    {
        var data = "{'userObj':" + JSON.stringify(User) + "}";

        jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/NewAdmin");
      
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "InsertUser";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;

}

function InsertAdmin(Admin) {
    var table = {};
    try
    {
        var data = "{'AdminObj':" + JSON.stringify(Admin) + "}";

        jsonResult = getJsonData(data, "../AdminPanel/People.aspx/AddAdmin");
   
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "InsertAdmin";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;

}

function InsertManager(Manager) {
    var table = {};
    try
    {
        var data = "{'ManagerObj':" + JSON.stringify(Manager) + "}";

        jsonResult = getJsonData(data, "../AdminPanel/People.aspx/AddManager");
   
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "InsertManager";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;

}

function InsertDesigner(Designer) {
    var table = {};
    try
    {
        var data = "{'designerObj':" + JSON.stringify(Designer) + "}";

        jsonResult = getJsonData(data, "../AdminPanel/People.aspx/InsertDesigner");
   
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "InsertDesigner";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
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
    $('#chkActiveManager').parent().addClass('checked');
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
    $('#chkActiveAdmin').parent().addClass('checked');
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
    try
    {
        var data = "{'userobj':" + JSON.stringify(User) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/GetUser");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "GetUser";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function GetAdmin(Admin) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'Adminobj':" + JSON.stringify(Admin) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/GetAdmin");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "GetAdmin";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function GetDesigner(Designer) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'designerobj':" + JSON.stringify(Designer) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/GetDesigner");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "GetDesigner";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function GetDesignerImage(DesignerID, ImageIsNull) {
    try
    {
        if ($("#list").find(".thumb") != null || $("#list").find(".thumb") != 'undefined') {
            $("#list").find(".thumb").remove();
        }
        var span = document.createElement('span');
        span.innerHTML = ['<img id="designerimage" class="thumb" src="" title=""/>'].join('');
        document.getElementById('list').insertBefore(span, null);

        var imgdes = document.getElementById('designerimage');
  
        imgdes.src = "../ImageHandler/ImageServiceHandler.ashx?DesignerId=" + DesignerID + "&forcebrowsernewimage=" + new Date().getTime();
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "GetDesignerImage";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return;

}


function BindUserTextBoxes(Records) {
    try
    {
        $.each(Records, function (index, Records) {

            $("#txtName").val(Records.Name);
            $("#txtMobile").val(Records.Mobile);
            $("#txtEmail").val(Records.Email);

            if (Records.Active === true) {
         
         
                $('#chkActive').parent().addClass('checked');
            }
            else {
                   
                $('#chkActive').parent().removeClass('checked');
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindUserTextBoxes";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindAdminTextBoxes(Records) {
    try
    {
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
            if (Records.Active === true) {
                     
                $('#chkActiveAdmin').parent().addClass('checked');
            }
            else {
                $('#chkActiveAdmin').parent().removeClass('checked');
            }
            $("#chkActiveAdmin").val(Records.IsActive);
            $("#hdfUserID").val(Records.UserID);
            $("#hdfCardNo").val(Records.LoyaltyCardNo);
            $("#hdfBoutiqueID").val(Records.BoutiqueID);
        })
        $(".AddAdmin").text("Save");
        $("#editAdminLabel").text("Edit Administrator");
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindAdminTextBoxes";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindManagerTextBoxes(Records) {
    try
    {
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
            if (Records.Active === true)
            {
                $('#chkActiveManager').parent().addClass('checked');
            }
            else
            {
                $('#chkActiveManager').parent().removeClass('checked');
            }
            $("#chkActiveManager").val(Records.IsActive);
            $("#hdfUserID").val(Records.UserID);
            $("#hdfCardNo").val(Records.LoyaltyCardNo);
            $("#hdfBoutiqueID").val(Records.BoutiqueID);
        })
        $(".AddManager").text("Save");
        $("#editManagerLabel").text("Edit Manager");
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindManagerTextBoxes";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindDesignerTextBoxes(JSONresult) {
    try
    {
        $("#txtDesignerName").val(JSONresult.Name);
        $("#txtDesignerMobile").val(JSONresult.Mobile);
        $("#txtDesignerProfile").val(JSONresult.Profile);
        $("#hdfDesignerID").val(JSONresult.DesignerID);

        $(".AddDesigner").text("Save");
        $("#editDesignerLabel").text("Edit Designer");
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "BindDesignerTextBoxes";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}


function DeleteUser(User) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'userObj':" + JSON.stringify(User) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/DeleteUser");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "DeleteUser";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function DeleteAdmin(Admin) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'AdminObj':" + JSON.stringify(Admin) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/DeleteAdmin");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "DeleteAdmin";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function DeleteManager(Manager) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'AdminObj':" + JSON.stringify(Manager) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/DeleteAdmin");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "DeleteManager";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function DeleteDesigner(Designer) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'designerObj':" + JSON.stringify(Designer) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/DeleteDesigner");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "DeleteDesigner";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

//Add New Admin
function AddAdmin() {
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();

    var result = "";
    try
    {
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "AddAdmin";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
//Add New Manager
function AddManager() {
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();

    var result = "";
    try
    {
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "AddManager";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
//Add New Designer
function AddDesigner()
{
   
    var boutique_id = getboutiqueID();
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    var result = "";
    try
    {
        var designame = $("#txtDesignerName").val();
        var designMobile = $("#txtDesignerMobile").val();
        var designProfile = $("#txtDesignerProfile").val();
        var loginuser = $("#LoginName").text();
        if ($("#hdfDesignerID").val() === "")//insert designer
        {
            var formData = new FormData();
            var file, img;

            if ((file = $('#fileUpload')[0].files[0]))
            {
                     
                var image = $('#fileUpload')[0].files[0];
                formData.append('designerimage', image, file.name);
                formData.append('BoutiqueId', boutique_id);
                formData.append('Name', designame);
                formData.append('profile', designProfile);
                formData.append('mobile', designMobile);
                formData.append('createdby', loginuser);
                formData.append('ActionTyp', 'DesignerInsert');
                result = postBlobAjax(formData, "../ImageHandler/PhotoUploadHandler.ashx");//calling handler to insert image and form values
                if (result == "1") {
                    clearDesignerControls();
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                    $('.alert-success strong').text(Messages.InsertionSuccessFull);
                    AutoScrollToAlertBox();
                    BindAsycDesignerTable();
                }
                if (result != "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                    $('.alert-error strong').text(Messages.InsertionFailure);
                    AutoScrollToAlertBox();
                    BindAsycDesignerTable();
                }
            }
            else//file not present in uploader
            {
                var Designer = new Object();
                Designer.Name = designame;
                Designer.Mobile = designMobile;
                Designer.Profile = designProfile
                result = InsertDesigner(Designer);//calling usual web method
                ///Alert method
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
                ///Alert method

            }//end of else
        }//end of insert
        if ($("#hdfDesignerID").val() != "") //update designer
        {
            var imgresult = "";
            var formData = new FormData();
            var file, img;
            var desigrid = $("#hdfDesignerID").val();
            if ((file = $('#fileUpload')[0].files[0]))//update with file
            {
                var image = $('#fileUpload')[0].files[0];
                formData.append('designerimage', image, file.name);
                formData.append('DesignerId', desigrid);
                formData.append('BoutiqueId', boutique_id);
                formData.append('Name', designame);
                formData.append('profile', designProfile);
                formData.append('mobile', designMobile);
                formData.append('updatedBy', loginuser);
                formData.append('ActionTyp', 'DesignerUpdate');
                result=postBlobAjax(formData, "../ImageHandler/PhotoUploadHandler.ashx");
                if (result == "1") {
                    clearDesignerControls();
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                    $('.alert-success strong').text(Messages.InsertionSuccessFull);
                    AutoScrollToAlertBox();
                    BindAsycDesignerTable();
                }
                if (result != "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                    $('.alert-error strong').text(Messages.InsertionFailure);
                    AutoScrollToAlertBox();
                    BindAsycDesignerTable();
                }
            }
            else//update without file
            {
                var Designer = new Object();
                Designer.DesignerID = desigrid;
                Designer.Name = designame;
                Designer.Mobile = designMobile;
                Designer.Profile = designProfile
                result = InsertDesigner(Designer);//calling usual web method which has update call also
                ///Alert method
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
                ///Alert method
            }
         
        }//end of update
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "AddDesigner";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
//Add New User
function AddUser()
{
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();

    var result = "";
    try
    {
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "AddUser";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

///////////////////////////////////////Basic Validation Function With Insert Function////////////////////////////////////////////////////////////
//CreatedBy Thomson
//Basic Client Side Validation and Insert For Admin Registration
function AdminValidation() {
    try
    {
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
                //null value check
                j = 1;
                Errorbox.style.borderRadius = "5px";
                Errorbox.style.display = "block";
                var txtB = document.getElementById(container[i].id);
                txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
                txtB.style.backgroundPosition = "95% center";
                txtB.style.backgroundRepeat = "no-repeat";         
                Errorbox.style.paddingLeft = "30px";

            }
            else
            {
                //logical check
                if(i==5)
                {
                    debugger;
                    var email = document.getElementById('txtAdminEmail');
                    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                    if (!filter.test(email.value)) {
                        //alert('Please provide a valid email address');
                        j = 1;
                        Errorbox.style.borderRadius = "5px";
                        Errorbox.style.display = "block";
                        var txtB = document.getElementById(container[i].id);
                        txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
                        txtB.style.backgroundPosition = "95% center";
                        txtB.style.backgroundRepeat = "no-repeat";
                        Errorbox.style.paddingLeft = "30px";


                      //  email.focus;
                        return false;
                    }
                }

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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "AdminValidation";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

//Basic Client Side Validation For Manager Registration

function ManagerValidation() {
    try
    {
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
            else {
                //logical check
                if (i == 5) {
                   
                    var email = document.getElementById('txtManagerEmail');
                    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                    if (!filter.test(email.value)) {
                        //alert('Please provide a valid email address');
                        j = 1;
                        Errorbox.style.borderRadius = "5px";
                        Errorbox.style.display = "block";
                        var txtB = document.getElementById(container[i].id);
                        txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
                        txtB.style.backgroundPosition = "95% center";
                        txtB.style.backgroundRepeat = "no-repeat";
                        Errorbox.style.paddingLeft = "30px";


                        //  email.focus;
                        return false;
                    }
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "ManagerValidation";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

//Basic Client Side Validation For Designer and User Registration

function DesignerValidate() {
    try
    {
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "DesignerValidate";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

//Basic Client Side Validation For Designer and User Registration
function UserValidate() {
    try
    {
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "UserValidate";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }

}

//----------------------- Email Validation Checking while new Administrator and Manager is created--------------//
function EmailValidation() {
  
    var value;
    try
    {
        if ($('#txtAdminEmail').val() != "") {
   
            var Email = $('#txtAdminEmail').val();
            value = 0;
        }
        else {
  
            $('#imgfail').hide();
            $('#imgsuccess').hide();
        }
        if ($('#txtManagerEmail').val() != "") {
    
            var Email = $('#txtManagerEmail').val();
            value = 1;
        }
        else {
      
            $('#imgfail1').hide();
            $('#imgsuccess1').hide();

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
                if (value == 1) {
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
            if (value == 1) {
                $('#imgfail1').show();
                $('#imgsuccess1').hide();
            }
            return false;
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "People";
        ExceptionTrack.Method = "EmailValidation";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return false;
}