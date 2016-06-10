﻿$("document").ready(function (e) {
    
    parent.document.title = "People";
    $('.AddUser').hide();
    //BIND REGION
    
    var LoginUserRole = getRole();
    $('#hdfRole').val(LoginUserRole);
   
    if (LoginUserRole != 'Manager') {
     
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
        "bPaginate": false,             //removing paging
    });
    $('#ManagerTable').DataTable({
        "bPaginate": false,             //removing paging
    });
    $('#DesignerTable').DataTable({
        "bPaginate": false,             //removing paging
    });
    $('#UsersTable').DataTable({
        "bPaginate": false,             //removing paging
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
             if (confirm("You are about to Delete Category!..")) {
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
            if (User.UserID != null) {
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
                        //  formData.append('file', $('#productfile')[0].files[0]);
                        //postBlobAjax(formData, "../ImageHandler/ImageServiceHandler.ashx");
                    };
                    //  img.onerror = function () {
                    //   alert("Not a valid file:" + file.type);
                    //  };
                    // img.src = _URL.createObjectURL(file);
                    var image = $('#fileUpload')[0].files[0];
                    formData.append('files', image, file.name);
                    formData.append('DesignerId',result.DesignerID);
                    formData.append('BoutiqueId', result.BoutiqueID);
                    formData.append('Name', result.Name);
                    formData.append('profile', result.Profile);
                    formData.append('mobile', result.Mobile);
                    formData.append('updatedBy', result.userName)
                    
                }

                //imageupload
                // formData.append('prod', 88888);
                //  formData.append('ismain', 77777);
                postBlobAjax(formData, "../AdminPanel/People.aspx/InserDesignerImage");
            }
           // var HttpContext = new Object();
          //  HttpContext.files = formData;
          //  var data = "{'context':" + JSON.stringify(HttpContext) + "}";

           // jsonResult = getJsonData(data, "../AdminPanel/People.aspx/InserDesignerImage");
           // getJsonData()
            if (result.status == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                BindAsycDesignerTable();
            }
            if (result.status != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                BindAsycDesignerTable();
            }

        }
    })

});//end of document.ready

//post File/blog to Server

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
//post File/blog to Server


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
        // "\/Date(1455561000000)\/".substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var date = day + "/" + month + "/" + year;
        return date;
    }
}


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
    debugger;
    var checkrole = $('#hdfRole').val();
    if (checkrole == 'Manager') {
        debugger;
        $("thead#Usersthead tr").remove();
        var html = ' <tr><th>Name</th><th>Mobile</th><th>Profile</th></tr> ';
        $("#Usersthead").append(html);
        $("tbody#Designerrows tr").remove();
        debugger;
        $.each(Records, function (index, Records) {
            var html = '<tr userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td></tr>';
            $("#UsersTable").append(html);
        })
    }
    else
    {
        $("tbody#Designerrows tr").remove();
        $.each(Records, function (index, Records) {
            debugger;
            var html = '<tr userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info useredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger userdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
            $("#UsersTable").append(html);
        })

    }

}

function BindDesignerTable(Records)
{
    var checkrole = $('#hdfRole').val();
    if (checkrole == 'Manager') {
        debugger;
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
        debugger;
        $("tbody#Designerrows tr").remove();
        $.each(Records, function (index, Records) {
            var html = '<tr designerID="' + Records.DesignerID + '"><td>' + Records.Name + '</td>	<td class="center">' + (Records.Mobile != null ? Records.Mobile : "-") + '</td><td class="center">' + Records.Profile + '</td><td class="center"><a class="btn btn-info designeredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger designerdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
            $("#DesignerTable").append(html);
        })

    }
}

function BindManagerTable(Records) {
    debugger;
    var checkrole = $('#hdfRole').val();
    if (checkrole == 'Manager') {
        debugger;
        $("thead#managerthead tr").remove();
        var html = ' <tr><th>Name</th><th>Mobile</th><th>Email</th></tr> ';
        $("#managerthead").append(html);
        $("tbody#Managerrows tr").remove();
        $.each(Records, function (index, Records) {
            var html = '<tr userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td></tr>';
            $("#ManagerTable").append(html);
        })
    }
    else
    {
        debugger;
        $("tbody#Managerrows tr").remove();
        $.each(Records, function (index, Records) {
            var html = '<tr userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info manageredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger managerdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
            $("#ManagerTable").append(html);
        })

    }
}

function BindAdminsTable(Records) {
   
    var checkrole = $('#hdfRole').val();
    if (checkrole == 'Manager') {

        $("thead#thead tr").remove();
        var html = '<tr><th>Name</th><th>Mobile</th><th>Email</th></tr> ';
        $("#thead").append(html);
        $("tbody#Adminrows tr").remove();
        
        $.each(Records, function (index, Records) {
            var html = '<tr userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td></tr>';
            $("#AdministratorTable").append(html);
        })
       
    }
    else {   
       
        $("tbody#Adminrows tr").remove();       
        $.each(Records, function (index, Records) {
            var html = '<tr userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info adminedit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger admindelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
            $("#AdministratorTable").append(html);
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
    $("#list").find(".thumb").remove();
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
function GetDesignerImage(DesignerID,ImageIsNull) {
 
    if ($("#list").find(".thumb") != null || $("#list").find(".thumb") != 'undefined') {
        $("#list").find(".thumb").remove();
    }
        var span = document.createElement('span');
        span.innerHTML = ['<img id="designerimage" class="thumb" src="" title=""/>'].join('');
        document.getElementById('list').insertBefore(span, null);

       var imgdes= document.getElementById('designerimage');
       imgdes.src = "../ImageHandler/ImageServiceHandler.ashx?DesignerId=" + DesignerID;
      
       if (ImageIsNull == "0")
       {
           $("#list").find(".thumb").remove();
           var span = document.createElement('span');
           span.innerHTML = ['<img id="designerimage" class="thumb" src="../img/no-user-image.gif" title=""/>'].join('');
           document.getElementById('list').insertBefore(span, null);
       }
    return;
   
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

function BindDesignerTextBoxes(JSONresult)
{
   
    $("#txtDesignerName").val(JSONresult.Name);
    $("#txtDesignerMobile").val(JSONresult.Mobile);
    $("#txtDesignerProfile").val(JSONresult.Profile);
    $("#hdfDesignerID").val(JSONresult.DesignerID);
  
    $(".AddDesigner").text("Modify");
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