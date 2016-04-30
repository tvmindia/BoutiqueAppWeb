$("document").ready(function (e) {

    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';


    var jsonResult = {};
    jsonResult = GetAllUsers(boutiqueid);
    if (jsonResult != undefined) {
        BindUserTable(jsonResult);
    }



   
    $(".edit").live(
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

    $(".Delete").live(
       {
           click: function (e) {
               $('#rowfluidDiv').hide();
               $('.alert-success').hide();
               $('.alert-error').hide();
               var jsonResult = {};
               editedrow = $(this).closest('tr');
               var boutid = editedrow.attr("boutiqueID");
               jsonResult = DeleteBoutique(boutid);
               if (jsonResult != undefined) {
                   if (jsonResult == "1") {
                       BindBoutiqueAsyncLoad();//Gridbind
                       $('#rowfluidDiv').show();
                       $('.alert-success').show();
                   }
                   if (jsonResult != "1") {
                       BindBoutiqueAsyncLoad();//Gridbind
                       $('#rowfluidDiv').show();
                       $('.alert-error').show();
                   }
               }
               return false;
           }
       })


    $(".CancelUser").live({
        click: function (e) {// Clear controls
            clearUserControls();
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





function BindUserTable(Records) {
    //$("#UsersTable").find(".odd").remove();
    $("#UsersTable").find(".myrows").remove();
    $.each(Records, function (index, Records) {
    var html = '<tr class="userrows" userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger Delete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
    $("#UsersTable").append(html);
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


function GetUser(User) {
    var ds = {};
    var table = {};
    var data = "{'userobj':" + JSON.stringify(User) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetUser");
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