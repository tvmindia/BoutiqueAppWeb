$("document").ready(function (e) {
  
    //BIND REGION

    BindAsyncUserTable();
    BindAsycDesignerTable();
    BindAsyncAdminsTable();
    BindAsyncManagersTable();
  
    //EDIT REGION

    $(".adminedit").live(
    {

        click: function (e) {
            debugger;
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
              debugger;
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
             var jsonResult = {};
             editedrow = $(this).closest('tr');
             var Designer = new Object();            
             Designer.DesignerID = editedrow.attr("designerID");
             jsonResult = GetDesigner(Designer);
             if (jsonResult != undefined) {

                 BindDesignerTextBoxes(jsonResult);
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
               var jsonResult = {};
               editedrow = $(this).closest('tr');
               var User = new Object();
               User.UserID = editedrow.attr("userID");
               jsonResult = DeleteUser(User);
               if (jsonResult != undefined) {
                   if (jsonResult == "1") {
                       BindAsyncUserTable()//Gridbind
                       $('#rowfluidDiv').show();
                       $('.alert-success').show();
                   }
                   if (jsonResult != "1") {
                       BindAsyncUserTable()//Gridbind
                       $('#rowfluidDiv').show();
                       $('.alert-error').show();
                   }
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
            var jsonResult = {};
            editedrow = $(this).closest('tr');
            var Admin= new Object();
            Admin.AdminID = editedrow.attr("AdminID");
            jsonResult = DeleteAdmin(Admin);
            if (jsonResult != undefined) {
                if (jsonResult == "1") {
                    BindAsyncAdminsTable();//Gridbind
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                }
                if (jsonResult != "1") {
                    BindAsyncAdminsTable();//Gridbind
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                }
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
          var jsonResult = {};
          editedrow = $(this).closest('tr');
          var Manager = new Object();
          Manager.AdminID = editedrow.attr("AdminID");
          jsonResult = DeleteManager(Manager); 
          if (jsonResult != undefined) {
              if (jsonResult == "1") {
                  BindAsyncAdminsTable();//Gridbind
                  $('#rowfluidDiv').show();
                  $('.alert-success').show();
              }
              if (jsonResult != "1") {
                  BindAsyncAdminsTable();//Gridbind
                  $('#rowfluidDiv').show();
                  $('.alert-error').show();
              }
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
             var jsonResult = {};
             editedrow = $(this).closest('tr');
             var Designer = new Object();            
             Designer.DesignerID = editedrow.attr("designerID");
           
             jsonResult = DeleteDesigner(Designer);
             if (jsonResult != undefined) {
                 if (jsonResult == "1") {
                     BindAsycDesignerTable()//Gridbind
                     $('#rowfluidDiv').show();
                     $('.alert-success').show();
                 }
                 if (jsonResult != "1") {
                     BindAsycDesignerTable()//Gridbind
                     $('#rowfluidDiv').show();
                     $('.alert-error').show();
                 }
             }
             return false;
         }
     })

    //cancel REGION

    $(".CancelAdmin").live({             
        click: function (e) {// Clear controls
             clearAdminControls();
        }
    })

    $(".CancelManager").live({
        click: function (e) {// Clear controls
            clearManagerControls();
        }
    })

    $(".CancelUser").live({
        click: function (e) {// Clear controls
            clearUserControls();
        }
    })   

    $(".CancelDesigner").live({
        click: function (e) {// Clear controls
            clearDesignerControls();
        }
    })
   
    //ADD ADMIN

    $(".AddAdmin").live({
        click: function (e) {// submit button click

            debugger;

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

            var result = "";
            var Admin = new Object();

            Admin.AdminID = $("#hdfAdminID").val();
           
            Admin.Name = $("#txtAdminName").val();
            Admin.Mobile = $("#txtMobileAdmin").val();
            Admin.LoginName = $("#txtAdminLoginName").val();
            Admin.Password = $("#txtAdminConPass").val();
            Admin.Email = $("#txtAdminEmail").val();
            Admin.DOB = $("#dateDOB").val();
            Admin.Anniversary = $("#dateAnniversary").val();
            
            // 
            if ($('#chkActiveAdmin').is(':checked')) {
                Admin.IsActive = "true";
            }
            else {
                Admin.IsActive = "false";
            }
         
         
            result = InsertAdmin(Admin);
            if (result == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
            }
            if (result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
            }

        }
    })


    $(".AddManager").live({
        click: function (e) {// submit button click

            debugger;

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

            var result = "";
            var Manager = new Object();

            Manager.AdminID = $("#hdfManagerID").val();

            Manager.Name = $("#txtManagerName").val();
            Manager.Mobile = $("#txtManagerMobile").val();
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
                $('#rowfluidDiv').show();
                $('.alert-success').show();
            }
            if (result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
            }

        }
    })

    $(".AddUser").live({
        click: function (e) {// submit button click
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

            var result = "";
            var User = new Object();
           
            User.UserID = $("#hdfUserID").val();
            User.BoutiqueID = boutiqueid;
            User.Name = $("#txtName").val();
            User.Mobile = $("#txtMobile").val();
            User.Email = $("#txtEmail").val();
            User.LoyaltyCardNo = parseInt($("#hdfCardNo").val(), 10); // you want to use radix 10
            // so you get a decimal number even with a leading 0 and an old browser
            
            // 
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
                $('#rowfluidDiv').show();
                $('.alert-success').show();
            }
            if (result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
            }

        }
    })
    
    $(".AddDesigner").live({
        click: function (e) {// submit button click
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

            var result = "";
            var Designer = new Object();
            if ($("#hdfDesignerID").val() != "")
            {
                Designer.DesignerID = $("#hdfDesignerID").val();
            }
          
          
            Designer.BoutiqueID = boutiqueid;
            Designer.Name = $("#txtDesignerName").val();
            Designer.Mobile = $("#txtDesignerMobile").val();
            Designer.Profile = $("#txtDesignerProfile").val();
                              
          
            result = InsertDesigner(Designer);
            if (result == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                BindAsycDesignerTable(boutiqueid);
            }
            if (result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                BindAsycDesignerTable(boutiqueid);
            }

        }
    })

    
});//end of document.ready



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
//---end of getting data as json -----//

function BindAsyncUserTable()
{
    var jsonResult = {};
    var Users = new Object();
    jsonResult = GetAllUsers(Users);
    if (jsonResult != undefined) {
        BindUserTable(jsonResult);
    }
}

function BindAsycDesignerTable()
{
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

function BindAdminsTable(Records) {
    //$("#UsersTable").find(".odd").remove();
    $("#AdministratorTable").find(".userrows").remove();
    $.each(Records, function (index, Records) {
        var html = '<tr class="userrows" userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info adminedit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger admindelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#AdministratorTable").append(html);
    })

}

function BindAsyncManagersTable() {
    var jsonResult = {};
    var Manager = new Object();
    jsonResult = GetAllManager(Manager);
    if (jsonResult != undefined) {
        BindManagerTable(jsonResult);
    }
}

function BindManagerTable(Records) {
    //$("#UsersTable").find(".odd").remove();
    $("#ManagerTable").find(".userrows").remove();
    $.each(Records, function (index, Records) {
        var html = '<tr class="userrows" userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info manageredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger managerdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#ManagerTable").append(html);
    })

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
    //$("#UsersTable").find(".odd").remove();
    $("#UsersTable").find(".userrows").remove();
    $.each(Records, function (index, Records) {
        var html = '<tr class="userrows" userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info useredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger userdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
    $("#UsersTable").append(html);
    })

}

function BindDesignerTable(Records)
{
    $("#DesignerTable").find(".designerrows").remove();
    $.each(Records, function (index, Records) {
        var html = '<tr class="designerrows" designerID="' + Records.DesignerID + '"><td>' + Records.Name + '</td>	<td class="center">' + (Records.Mobile != null ? Records.Mobile : "-") + '</td><td class="center">' + Records.Profile + '</td><td class="center"><a class="btn btn-info designeredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger designerdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#DesignerTable").append(html);
    })
}

function GetAllUsers(Users) {

    var ds = {};
    var table = {};
    var data = "{'Usersobj':" + JSON.stringify(Users) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllUsersByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
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

    debugger;

    var data = "{'ManagerObj':" + JSON.stringify(Manager) + "}";

    jsonResult = getJsonData(data, "../AdminPanel/People.aspx/AddManager");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function InsertDesigner(Designer)
{
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
    $("#txtManagerPass").val('');
    $("#txtManagerConPass").val('');
    $("#txtManagerEmail").val('');
    $("#chkActiveManager").val('');   
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $(".AddManager").text("Save");
}

function clearAdminControls() {

    $("#txtAdminName").val('');
    $("#txtMobileAdmin").val('');
    $("#txtAdminLoginName").val('');
    $("#txtAdminPass").val('');
    $("#txtAdminConPass").val('');
    $("#txtAdminEmail").val('');
    $("#chkActiveAdmin").val('');
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $(".AddAdmin").text("Save");
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
    $(".AddUser").text("Save");
}

function clearDesignerControls()
{
    $("#txtDesignerName").val('');
    $("#txtDesignerMobile").val(''); 
    $("#txtDesignerProfile").val('');
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $("#hdfDesignerID").val('');
    
    $(".AddDesigner").text("Save");

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

function BindUserTextBoxes(Records)
{    
    $.each(Records, function (index, Records) {
      
      
        $("#txtName").val(Records.Name);
        $("#txtMobile").val(Records.Mobile);
        $("#txtEmail").val(Records.Email);
       
        if (Records.Active='true')
        {
            // $("#chkActive").attr('checked', 'checked');
            // $(".chkActive").attr("checked", "checked
            $(".chkActive").prop('checked', true);
          
        }
        else
        {
            // $("#chkActive").removeAttr('checked');
            $(".chkActive").prop('checked', false);
        }
        $("#chkActive").val(Records.IsActive);
        $("#txtCaption").val(Records.Caption);
        $("#dateDOB").val(ConvertJsonToDate(Records.DOB));
        $("#dateAnniversary").val(ConvertJsonToDate(Records.Anniversary));
        $("#hdfUserID").val(Records.UserID);
        
        $("#hdfCardNo").val(Records.LoyaltyCardNo);
        $("#hdfBoutiqueID").val(Records.BoutiqueID);
    })
    $(".AddUser").text("Modify");
}

function BindAdminTextBoxes(Records) {
    $.each(Records, function (index, Records) {


        $("#txtAdminName").val(Records.Name);
        $("#txtMobileAdmin").val(Records.Mobile);
        $("#txtAdminEmail").val(Records.Email);    
        $("#txtAdminLoginName").val(Records.LoginName);

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
    $(".AddAdmin").text("Modify");
}

function BindManagerTextBoxes(Records) {
    $.each(Records, function (index, Records) {


        $("#txtManagerName").val(Records.Name);
        $("#txtManagerMobile").val(Records.Mobile);
        $("#txtManagerEmail").val(Records.Email);
        $("#txtManagerLoginName").val(Records.LoginName);

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
    $(".AddManager").text("Modify");
}

function BindDesignerTextBoxes(Records)
{
    $.each(Records, function (index, Records) {

        $("#txtDesignerName").val(Records.Name);
        $("#txtDesignerMobile").val(Records.Mobile);
        $("#txtDesignerProfile").val(Records.Profile);
        $("#hdfDesignerID").val(Records.DesignerID);
    })
    $(".AddDesigner").text("Modify");
}

function ConvertJsonToDate(jsonDate)
{
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

function DeleteUser(User)
{
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

function DeleteDesigner(Designer)
{
    var ds = {};
    var table = {};
    var data = "{'designerObj':" + JSON.stringify(Designer) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/DeleteDesigner");
    table = JSON.parse(ds.d);
    return table;
}