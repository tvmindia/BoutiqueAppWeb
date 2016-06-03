$("document").ready(function (e) {

    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';

    BindAsyncUserTable(boutiqueid);
    BindAsyncOwnerTable(boutiqueid);
    BindAsycDesignerTable(boutiqueid);

    $(".owneredit").live(
       {
           click: function (e) {
               $('#rowfluidDiv').hide();
               $('.alert-success').hide();
               $('.alert-error').hide();
               var jsonResult = {};
               editedrow = $(this).closest('tr');
               var Owners = new Object();
               Owners.BoutiqueID = boutiqueid;
               Owners.UserID = editedrow.attr("userID");
               Owners.OwnerID = editedrow.attr("ownerID");
               jsonResult = GetOwner(Owners);
               if (jsonResult != undefined) {

                   BindOwnerTextBoxes(jsonResult);
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
               User.BoutiqueID = boutiqueid;
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
             Designer.BoutiqueID = boutiqueid;
             Designer.DesignerID = editedrow.attr("designerID");

             jsonResult = GetDesigner(Designer);
             if (jsonResult != undefined) {

                 BindDesignerTextBoxes(jsonResult);
             }


             return false;
         }
     })



    $(".userdelete").live(
       {
           click: function (e) {

              
               $('#rowfluidDiv').hide();
               $('.alert-success').hide();
               $('.alert-error').hide();
               var jsonResult = {};
               editedrow = $(this).closest('tr');
               var User = new Object();
               User.BoutiqueID = boutiqueid;
               User.UserID = editedrow.attr("userID");
               jsonResult = DeleteUser(User);
               if (jsonResult != undefined) {
                   if (jsonResult == "1") {
                       BindAsyncUserTable(boutiqueid)//Gridbind
                       $('#rowfluidDiv').show();
                       $('.alert-success').show();
                   }
                   if (jsonResult != "1") {
                       BindAsyncUserTable(boutiqueid)//Gridbind
                       $('#rowfluidDiv').show();
                       $('.alert-error').show();
                   }
               }
               return false;
           }
       })


    $(".ownerdelete").live(
      {
          click: function (e) {

             
           
              $('#rowfluidDiv').hide();
              $('.alert-success').hide();
              $('.alert-error').hide();
              var jsonResult = {};
              editedrow = $(this).closest('tr');
              var Owners = new Object();
              Owners.BoutiqueID = boutiqueid;
              Owners.UserID = editedrow.attr("userID");
              Owners.OwnerID = editedrow.attr("ownerID");
              jsonResult = DeleteOwner(Owners);
              if (jsonResult != undefined) {
                  if (jsonResult == "1") {
                      BindAsyncOwnerTable(boutiqueid)//Gridbind
                      $('#rowfluidDiv').show();
                      $('.alert-success').show();
                  }
                  if (jsonResult != "1") {
                      BindAsyncOwnerTable(boutiqueid)//Gridbind
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
             Designer.BoutiqueID = boutiqueid;
             Designer.DesignerID = editedrow.attr("designerID");
           
             jsonResult = DeleteDesigner(Designer);
             if (jsonResult != undefined) {
                 if (jsonResult == "1") {
                     BindAsycDesignerTable(boutiqueid)//Gridbind
                     $('#rowfluidDiv').show();
                     $('.alert-success').show();
                 }
                 if (jsonResult != "1") {
                     BindAsycDesignerTable(boutiqueid)//Gridbind
                     $('#rowfluidDiv').show();
                     $('.alert-error').show();
                 }
             }
             return false;
         }
     })

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

    $(".CancelOwner").live({
        click: function (e) {// Clear controls
            clearOwnerControls();
        }
    })
   

    $(".CancelDesigner").live({
        click: function (e) {// Clear controls
            clearDesignerControls();
        }
    })


    $(".AddOwner").live({
        click: function (e) {// submit button click
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var result = "";
            var Owners = new Object();



            if ($("#hdfUserID").val() != "")
            {
                Owners.UserID = $("#hdfUserID").val();
            }
            else {
                alert("Please Select A User..");
                return;
            }
            Owners.BoutiqueID = boutiqueid;
            Owners.Name = $("#txtOwnerName").val();
            Owners.Address = $("#txtOwnerAddress").val();
            Owners.Phone = $("#txtPhone").val();
            Owners.Email = $("#txtOwnerEmail").val();
            Owners.DOB = $("#DOBDate").val();
           
            Owners.Gender = "Male";

            Owners.Profile = $("#txtProfile").val();
            Owners.OwnerID = $("#hdfOwnerID").val();
          
            result = InsertOwner(Owners);
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

function BindAsyncUserTable(boutiqueid)
{
    var jsonResult = {};
    jsonResult = GetAllUsers(boutiqueid);
    if (jsonResult != undefined) {
        BindUserTable(jsonResult);
    }
}

function BindAsycDesignerTable(boutiqueid)
{
    var jsonResult = {};
    jsonResult = GetAllDesigners(boutiqueid);
    if (jsonResult != undefined) {
        BindDesignerTable(jsonResult);
    }
}


function InsertOwner(Owners)
{
    var data = "{'ownersObj':" + JSON.stringify(Owners) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/People.aspx/InsertOwner");
    var table = {};
    table = JSON.parse(jsonResult.d);
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
function BindAsyncOwnerTable(boutiqueid)
{
   
    var jsonResult = {};
    jsonResult = GetAllOwners(boutiqueid);
    if (jsonResult != undefined) {
        BindOwnerTable(jsonResult);
    }

}

function GetAllOwners(boutiqueid)
{
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllOwners");
    table = JSON.parse(ds.d);
    return table;
}

function BindOwnerTable(Records)
{
    $("#OwnerTable").find(".ownerrows").remove();
    $.each(Records, function (index, Records) {
        var html = '<tr class="ownerrows" userID="' + Records.UserID + '"  ownerID="' + Records.OwnerID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info owneredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger ownerdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#OwnerTable").append(html);
    })
}


function BindDesignerTable(Records)
{
    $("#DesignerTable").find(".designerrows").remove();
    $.each(Records, function (index, Records) {
        var html = '<tr class="designerrows" designerID="' + Records.DesignerID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Profile + '</td><td class="center"><a class="btn btn-info designeredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger designerdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#DesignerTable").append(html);
    })
}

function GetAllUsers(boutiqueid) {

    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
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

function clearOwnerControls()
{

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $("#txtOwnerName").val('');
    $("#txtOwnerAddress").val('');
    $("#txtPhone").val('');
    $("#txtOwnerEmail").val('');
    $("#DOBDate").val('');
  //  $("#radioMale").val('');
    $("#txtProfile").val('');
    $("#hdfOwnerID").val('');
    $(".AddOwner").text("Save");
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

function GetOwner(Owner) {
    var ds = {};
    var table = {};
    var data = "{'ownersObj':" + JSON.stringify(Owner) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetOwner");
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


function BindOwnerTextBoxes(Records)
{
    $.each(Records, function (index, Records) {

        $("#txtOwnerName").val(Records.Name);
        $("#txtOwnerAddress").val(Records.Address);
        $("#txtPhone").val(Records.Mobile);
        $("#txtOwnerEmail").val(Records.Email);
        $("#DOBDate").val(ConvertJsonToDate(Records.DOB));
        $("#radioMale").val();
        $("#txtProfile").val(Records.Profile);
        $("#hdfOwnerID").val(Records.OwnerID);
    })
    $(".AddOwner").text("Modify");
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

function DeleteOwner(Owner) {
    var ds = {};
    var table = {};
    var data = "{'ownersObj':" + JSON.stringify(Owner) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/DeleteOwner");
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


function GetAllDesigners(boutiqueid) {

    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllDesigners");
    table = JSON.parse(ds.d);
    return table;
}