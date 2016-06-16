$("document").ready(function (e) {
    BindTiles();
    parent.document.title = Pages.SaDashboard;
    $(".ddlboutiques").select2({
        data: BindAsyncBoutiques()//Boutiques dropdown binds only with id and text[key:value] mandatory
       , allowClear: true
       , placeholder: "Select a Boutique"
    });

    //dsfdsf
    $("#hdfBoutiqueID").val('');

    //BindAsyncBoutiqueDropDown();  

    BindBoutiqueAsyncLoad();
    $('#boutiqueTable').DataTable({
        "bPaginate": false,             //removing paging
    });

 
    $(".edit").live({
        click: function (e) {
            debugger;
               $('#rowfluidDiv').hide();
               $('.alert-success').hide();
               $('.alert-error').hide();
               var jsonResult = {};
               editedrow = $(this).closest('tr');
               var Boutique = new Object();
               Boutique.BoutiqueID = editedrow.attr("boutiqueID");
               jsonResult = GetBoutiques(Boutique);
               if (jsonResult != undefined) {
                   BindBoutiqueTextBoxes(jsonResult);
               }
               var EditDiv = document.getElementById('NewBoutiqueSpan');
               EditDiv.style.boxShadow = '0 3px 20px #5BC0DE';
               $('html, body').animate({
                   scrollTop: $("#NewBoutiqueSpan").offset().top
               }, 500);
               return false;
               
           }
       })

    $(".Delete").live({    
        click: function (e) {
            debugger;
               $('#rowfluidDiv').hide();
               $('.alert-success').hide();
               $('.alert-error').hide();            
               var jsonResult = {};
               editedrow = $(this).closest('tr');
               var e = editedrow.attr("boutiqueID");
               var p = "";
               //var Boutique = new Object();
               //Boutique.BoutiqueID = editedrow.attr("boutiqueID");
               //jsonResult = DeleteBoutique(Boutique);
               //if (jsonResult != undefined) {
               //    if (jsonResult == "1") {
               //        BindBoutiqueAsyncLoad();//Gridbind
               //        $('#rowfluidDiv').show();
               //        $('.alert-success').show();
               //    }
               //    if (jsonResult != "1") {
               //        BindBoutiqueAsyncLoad();//Gridbind
               //        $('#rowfluidDiv').show();
               //        $('.alert-error').show();
               //    }
               //}
               DeleteCustomAlert('Are You Sure?', e, p);
               return false;
           }
       })

    $(".CancelClear").live({
        click: function (e) {// Clear controls
        clearControls();
        }
    })
    
    $(".CancelAdClear").live({
        click: function (e) {// Clear controls            
            ClearAdminControls();
        }
    })

    $(".AddBoutique").live({
        click: function (e) {// submit button click

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var boutiquid = $("#hdfBoutiqueID").val();
            var result = "";
            var Boutique = new Object();
            if (boutiquid != "")
            {
                Boutique.BoutiqueID = boutiquid;
            }

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
            if (result=="1")
            {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
            }
            if (result!= "1")
            {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
            }

            clearControls();
            
            BindBoutiqueAsyncLoad();//Gridbind
          
        }
    })
  
    $(".AddAdmin").live({
        click: function (e) {// submit button click
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

            debugger;
          
            var result = "";
            var Admin = new Object();
            if ($("#idDdlboutiques").val() != null) {
                Admin.BoutiqueID = $("#idDdlboutiques").val();
            }
            else {
                Admin.BoutiqueID = "";
            }

           
            Admin.Name = $("#txtUserName").val();
            Admin.LoginName = $("#txtAdminLoginName").val();
            Admin.Password = $("#txtAdminConPass").val();
            Admin.Mobile = $("#txtMobile").val();
            Admin.Email = $("#txtUserEmail").val();
           // 
                if($('#chkActive').is(':checked')) 
                 {
                    Admin.IsActive = "true";
                 }
                 else {
                    Admin.IsActive = "false";
                     }
                result=InsertAdmin(Admin);
                if (result == "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                }
                if (result != "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                }

                ClearAdminControls();

            //var jsonResults = {};
            //jsonResults = GetAllBoutiques();
            //if (jsonResults != undefined)
            //{
            //    BindBoutiqueTable(jsonResults);
            //}

        }
    })
    
    $('#AppUserMainDiv').hide();
    
    $('#ExceptionMainDiv').hide();



});//document.ready

function DeleteItem(e,p)
{
    debugger;
    var jsonResult = {};
    //editedrow = $(this).closest('tr');
    var Boutique = new Object();
    Boutique.BoutiqueID = e;
    jsonResult = DeleteBoutique(Boutique);
    if (jsonResult != undefined) {
        if (jsonResult == "1") {
            BindBoutiqueAsyncLoad();//Gridbind
            $('#rowfluidDiv').show();
            $('.alert-success').show();
        }
        if (jsonResult == "2") {
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.existsBoutique);

        }
        if (jsonResult != "1" && jsonResult != "2") {
            BindBoutiqueAsyncLoad();//Gridbind
            $('#rowfluidDiv').show();
            $('.alert-error').show();
        }
    }
}

function BindAsyncBoutiques() {
    var jsonResult = {};
    var Boutiques = new Object();
    jsonResult = GetAllBoutiquesIDandName(Boutiques);
    if (jsonResult != undefined) {
        return jsonResult;
     }
}




function GetAllBoutiques(Designers) {

    var ds = {};
    var table = {};
    var data = "{'designersObj':" + JSON.stringify(Designers) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllDesignerIDAndName");
    table = JSON.parse(ds.d);
    return table;
}

function  InsertBoutique(Boutique)
{
    var data = "{'boutiqueobj':" + JSON.stringify(Boutique) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/NewBoutique");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function BindAsyncBoutiqueDropDown() {//&&&&&&&&&&&&&&&&&&
    var jsonResult = {};
    jsonResult = GetAllBoutiquesDropDown();
    if (jsonResult != undefined) {
        return jsonResult;
    }
}

function DeleteBoutique(Boutique)
{   
    var data = "{'boutiquesObj':" + JSON.stringify(Boutique) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/DeleteBoutique");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function InsertAdmin(Admin) {
    debugger;
    var data = "{'AdminObj':" + JSON.stringify(Admin) + "}";
    jsonResult = getJsonData(data, "../AdminPanel//People.aspx/AddAdmin");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function GetAllBoutiquesIDandName(Boutiques) {
    var ds = {};
    var table = {};
    var data = "{'boutiquesObj':" + JSON.stringify(Boutiques) + "}";
    ds = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/GetAllBoutiqueIDandName");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllBoutiques() {
    var ds = {};
    var table = {};
    var data = "{}";
    ds = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/GetAllBoutiques");
    table = JSON.parse(ds.d);
    return table;
}

function GetBoutiques(Boutique)
{   
    var ds = {};
    var table = {};
    var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
    ds = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/BindBoutiqueDetails");
    table = JSON.parse(ds.d);
    return table;
}

function BindBoutiqueAsyncLoad()
{
    var jsonResults = {};
    jsonResults = GetAllBoutiques();
    if (jsonResults != undefined) {
        BindBoutiqueTable(jsonResults);             
    }
}

function BindBoutiqueTable(Records) {
 
   // $("#boutiqueTable").find(".odd").remove();
   

    $("tbody#Boutiquerows tr").remove();

    $.each(Records, function (index, Records) {
    
        var html = '<tr class="Boutiquerows" boutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Name + '</td><td class="center">' + Records.AppVersion + '</td><td class="center">' + Records.Location + '</td><td class="center">' + Records.Phone + '</td><td class="center">' + Records.Timing + '</td><td class="center">' + Records.WorkingDays + '</td></td><td class="center"><a class="btn btn-info Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger Delete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#boutiqueTable").append(html);
    })
   
}

function BindBoutiqueTextBoxes(Records)
{
    $.each(Records, function(index, Records)
    {      
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
    $(".AddBoutique").text("Modify");
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
    $("#hdfBoutiqueID").val('');
    $(".AddBoutique").text("Save");
    $('#rowfluidDiv').hide();
}

function ClearAdminControls()
{  
    $("#txtUserName").val('');
    $("#txtMobile").val('');
    $("#txtAdminLoginName").val('');
    $("#txtAdminPass").val('');
    $("#txtAdminConPass").val('');
    $("#txtUserEmail").val('');

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide(); 
}
function BindTiles()
{
    BindAppUsersTile();
}
function BindAppUsersTile()
{   
    var table = {};
    var User = new Object();
    table = GetAllUsers(User); 
    $("#UsersBadge").text(table.length);
    BindAppUserTable(table);    
}
function GetAllUsers(User) {
    var ds = {};
    var table = {};
    var data = "{'Usersobj':" + JSON.stringify(User) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllUsersByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}
function BindAppUserTable(Records) {
    $("tbody#AppUserrows tr").remove();
    $.each(Records, function (index, Records) {
        var html = '<tr class="AppUserrows" UserID="' + Records.UserID + '"><td>' + Records.Name + '</td><td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td></tr>';
        $("#AppUserTable").append(html);
    })
    
}

function BindBoutique() {
    $('#AppUserMainDiv').hide();
    $('#ExceptionMainDiv').hide();
    $('#AllBoutiquesMainDiv').show();
    var BoutiqueDiv = document.getElementById('BoutiqueRowFluid');
    BoutiqueDiv.style.boxShadow = '0 3px 20px #00A300';
    //$('html, body').animate({
    //    scrollTop: $("#BoutiqueRowFluid").offset().top
    //}, 500);
}
function BindUsers()
{
    $('#AllBoutiquesMainDiv').hide();
    $('#ExceptionMainDiv').hide();
    $('#AppUserMainDiv').show();
    var AppUserDiv = document.getElementById('AppUserRowFluid');
    AppUserDiv.style.boxShadow = '0 3px 20px #FFC40D';
    //$('html, body').animate({
    //    scrollTop: $("#AppUserRowFluid").offset().top
    //}, 500);
}
function BindException()
{
    $('#AllBoutiquesMainDiv').hide();
    $('#AppUserMainDiv').hide();
    $('#ExceptionMainDiv').show();
    var AppUserDiv = document.getElementById('ExcepyionRowFluid');
    AppUserDiv.style.boxShadow = '0 3px 20px #9F00A7';
    //$('html, body').animate({
    //    scrollTop: $("#ExcepyionRowFluid").offset().top
    //}, 500);
}


