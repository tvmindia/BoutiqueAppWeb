$("document").ready(function (e) {
    parent.document.title = "Profile"; 

   
    debugger;
    var LoginUserRole = getRole();
    $('#hdfRole').val(LoginUserRole);
    debugger;

    BindAsyncOwnerTable();
    var jsonResult = {};
    jsonResult = GetBoutiques();
    if (jsonResult != undefined) {

        BindBoutiqueTextBoxes(jsonResult);
    }

    $(".CancelClear").live({
        click: function (e) {// Clear controls
            clearControls();
        }
    })

    $(".CancelOwner").live({
        click: function (e) {// Clear controls
            clearOwnerControls();
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

    $(".owneredit").live(
         {
             click: function (e) {
                 $('#rowfluidDiv').hide();
                 $('.alert-success').hide();
                 $('.alert-error').hide();
                 var jsonResult = {};
                 editedrow = $(this).closest('tr');
                 var Owners = new Object();
                 
                 Owners.UserID = editedrow.attr("userID");
                 Owners.OwnerID = editedrow.attr("ownerID");
                 jsonResult = GetOwner(Owners);
                 if (jsonResult != undefined) {

                     BindOwnerTextBoxes(jsonResult);
                 }


                 return false;
             }
         })

    //addboutique
    $(".AddBoutique").live({
        click: function (e) {// submit button click

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var boutiquid = $("#hdfBoutiqueID").val();
            var result = "";
            var Boutique = new Object();          

                Boutique.AppVersion = $("#txtAppVersion").val();
                Boutique.Name = $("#txtBouquetName").val();
                Boutique.StartedYear = $("#txtStartYear").val();
                Boutique.AboutUs = $("#txtAboutus").val();
                Boutique.Caption = $("#txtCaption").val();
                Boutique.Location = $("#txtLocation").val();
                Boutique.Address = $("#txtAddress").val();
                Boutique.Phone = $("#txtPhone").val();
                Boutique.Timing = $("#txtTimings").val();
                Boutique.WorkingDays = $("#txtWorkingDays").val();
                Boutique.FbLink = $("#txtFacebooklink").val();
                Boutique.InstagramLink = $("#txtInstatgramlink").val();

                result = InsertBoutique(Boutique);
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


    $(".AddOwner").live({
        click: function (e) {

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



});//end of document.ready


function getRole() {

    debugger;
    var table = {};
    var Role = new Object();
    table = GetLogin_Role(Role);
    return table;


}
function GetLogin_Role(Role) {
    debugger;

    var ds = {};
    var table = {};
    var data = "{'boutiqueObj':" + JSON.stringify(Role) + "}";
    ds = getJsonData(data, "../AdminPanel/Profile.aspx/Role");
    table = JSON.parse(ds.d);
    return table;
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
//---end of getting data as json -----//

function InsertBoutique(Boutique) {
    var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Profile.aspx/NewBoutique");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function GetBoutiques() {
    var ds = {};
    var Boutique = new Object();
    var table = {};
    var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
    ds = getJsonData(data, "../AdminPanel/Profile.aspx/BindBoutiqueDetails");
    table = JSON.parse(ds.d);
    return table;
}


function BindBoutiqueTextBoxes(Records) {
    $.each(Records, function (index, Records) {
        $("#txtAppVersion").val(Records.AppVersion);
        $("#txtBouquetName").val(Records.Name);
        $("#txtStartYear").val(Records.StartedYear);
        $("#txtAboutus").val(Records.AboutUs);
        $("#txtCaption").val(Records.Caption);
        $("#txtLocation").val(Records.Location);
        $("#txtAddress").val(Records.Address);
        $("#txtPhone").val(Records.Phone);
        $("#txtTimings").val(Records.Timing);
        $("#txtWorkingDays").val(Records.WorkingDays);
        $("#txtFacebooklink").val(Records.FBLink);
        $("#txtInstatgramlink").val(Records.InstagramLink);
        $("#hdfBoutiqueID").val(Records.BoutiqueID);
    })
   
}

function clearControls() {
    $("#txtAppVersion").val('');
    $("#txtBouquetName").val('');
    $("#txtStartYear").val('');
    $("#txtAboutus").val('');
    $("#txtCaption").val('');
    $("#txtLocation").val('');
    $("#txtAddress").val('');
    $("#txtPhone").val('');
    $("#txtTimings").val('');
    $("#txtWorkingDays").val('');
    $("#txtFacebooklink").val('');
    $("#txtInstatgramlink").val('');
    $('#rowfluidDiv').hide();
}

function BindOwnerTextBoxes(Records) {
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

function clearOwnerControls() {

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

function BindOwnerTable(Records) {
    debugger;
    $("#OwnerTable").find(".ownerrows").remove();   
   
    var checkrole = $('#hdfRole').val(); 
    if (checkrole == 'Manager')
    {
        var html = '<thead><tr><th>Owner Name</th><th>Mobile</th><th>Email</th></tr></thead>';
        $("#OwnerTable").append(html);
        $.each(Records, function (index, Records)
        {          
        var html = '<tr class="ownerrows" userID="' + Records.UserID + '"  ownerID="' + Records.OwnerID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td></tr>';
        $("#OwnerTable").append(html);
        })
    }
    else
    {
        var html = '<thead><tr><th>Owner Name</th><th>Mobile</th><th>Email</th></tr></thead>';
        $("#OwnerTable").append(html);
        $.each(Records, function (index, Records)
        {
        var html = '<tr class="ownerrows" userID="' + Records.UserID + '"  ownerID="' + Records.OwnerID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info owneredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger ownerdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#OwnerTable").append(html);
        })       
    }

}

function BindAsyncOwnerTable() {

    var jsonResult = {};
    var Owner = new Object();

    jsonResult = GetAllOwners(Owner);
    if (jsonResult != undefined) {
        debugger;
        BindOwnerTable(jsonResult);
    }

}

function InsertOwner(Owners) {
    var data = "{'ownersObj':" + JSON.stringify(Owners) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Profile.aspx/InsertOwner");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function DeleteOwner(Owner) {
    var ds = {};
    var table = {};
    var data = "{'ownersObj':" + JSON.stringify(Owner) + "}";
    ds = getJsonData(data, "../AdminPanel/Profile.aspx/DeleteOwner");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllOwners(Owner) {
    var ds = {};
    var table = {};
    var data = "{'OwnerObj':" + JSON.stringify(Owner) + "}";
    ds = getJsonData(data, "../AdminPanel/Profile.aspx/GetAllOwners");
    table = JSON.parse(ds.d);
    return table;
}

function GetOwner(Owner) {
    var ds = {};
    var table = {};
    var data = "{'ownersObj':" + JSON.stringify(Owner) + "}";
    ds = getJsonData(data, "../AdminPanel/Profile.aspx/GetOwner");
    table = JSON.parse(ds.d);
    return table;
}


