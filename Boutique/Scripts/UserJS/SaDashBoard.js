$("document").ready(function (e) {
    BindTiles();
    parent.document.title = Pages.SaDashboard;

    //dsfdsf
    $("#hdfBoutiqueID").val('');

    BindAsyncBoutiqueDropDown();  

    BindBoutiqueAsyncLoad();
    $('#boutiqueTable').DataTable({
        "bPaginate": false,             //removing paging
    });

    //-----------*   Currency Dropdown * --------//
    $(".ddlCurrency").select2({
        placeholder: "Choose related Currency",
        allowClear: true,
        data: BindCurrencyDropdown()
    });

    $(".edit").live({
        click: function (e) {
          
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
        click: function (e)
           {
               $('#rowfluidDiv').hide();
               $('.alert-success').hide();
               $('.alert-error').hide();            
               var jsonResult = {};
               editedrow = $(this).closest('tr');
               var e = editedrow.attr("boutiqueID");
               var p = "Delete";
               DeleteCustomAlert('Are You Sure?', e, p);
               return false;
           }
       })

    $(".CancelClear").live({
        click: function (e) {// Clear controls
            clearControls();
            RemoveStyle();
        }
    })
    
    $(".CancelAdClear").live({
        click: function (e) {// Clear controls            
            ClearAdminControls();
            RemoveStyle();
        }
    })

    //$(".AddBoutique").({
    //   click: function (e) {// submit button click


    //   }
    //})
    $('input[type=text],input[type=password]').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').slideUp(1000);
    });
    $('textarea').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').slideUp(1000);
    });
    //$(".AddAdmin").live({
    //    click: function (e) {// submit button click

            BindBoutiqueAsyncLoad();//Gridbind
            BindAsyncBoutiqueDropDown();
          
    //    }
    //})
    
    $('#AppUserMainDiv').hide();
    
    $('#ExceptionMainDiv').hide();



});//document.ready


function BindCurrencyDropdown() {
    var jsonResult = {};
    var Loyalty = new Object();
    jsonResult = GetAllCurrency(Loyalty);
    if (jsonResult != undefined) {

        return jsonResult;
    }
}

function GetAllCurrency(Loyalty) {
    var ds = {};
    var table = {};
    var data = "{'loyaltyObj':" + JSON.stringify(Loyalty) + "}";
    ds = getJsonData(data, "../AdminPanel/Loyalty.aspx/GetAllCurrencyNameAndCode");
    table = JSON.parse(ds.d);
    return table;
}

function RemoveStyle()
{
    $('input[type=text],input[type=password],textarea').css({ background: 'white' });
    $('#ErrorBox,#ErrorBox1').slideUp(1000);
}
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
            BindAsyncBoutiqueDropDown();
            $('#rowfluidDiv').show();
            $('.alert-success').show();
            $('.alert-success strong').text(Messages.DeletionSuccessFull);

        }
        if (jsonResult == "2") {
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.existsBoutique);

        }
        if (jsonResult != "1" && jsonResult != "2") {
            BindBoutiqueAsyncLoad();//Gridbind
            BindAsyncBoutiqueDropDown();
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.DeletionFailure);
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

function BindAsyncBoutiqueDropDown() {
  
    $(".ddlboutiques").select2({
        data: BindAsyncBoutiques()//Boutiques dropdown binds only with id and text[key:value] mandatory
        , allowClear: true
        , placeholder: "Select a Boutique"
    });
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
        debugger;

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

        $(".ddlCurrency").val(Records.CurrencyCode).trigger("change");

       })
    $(".AddBoutique").text("Save");
    $("#editLabel").text("Edit Boutique");

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
    $("#editLabel").text("New Boutique");
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
function Validation() {
 

    $('#Displaydiv').remove();
    var AppVer = $('#txtAppVersion');
    var BoutiqueNam = $('#txtBouquetName');
    var StartYear = $('#txtStartYear');
    var AboutUs = $('#txtAboutus');
    var Location = $('#txtLocation');
    var Address = $('#txtAddress');
    var Phone = $('#txtPhone');
    var Timings = $('#txtTimings');
    var WorkDays = $('#txtWorkingDays');
    var container = [
        { id: BoutiqueNam[0].id, name: BoutiqueNam[0].name, Value: BoutiqueNam[0].value },
        { id: StartYear[0].id, name: StartYear[0].name, Value: StartYear[0].value },
        { id: Location[0].id, name: Location[0].name, Value: Location[0].value },
        { id: Address[0].id, name: Address[0].name, Value: Address[0].value },
        { id: Phone[0].id, name: Phone[0].name, Value: Phone[0].value },
    ];
   
    var j = 0;
    var Errorbox = document.getElementById('ErrorBox');
    var divs = document.createElement('div');
    divs.setAttribute("id", "Displaydiv");
    Errorbox.appendChild(divs);
    for (var i = 0; i < container.length;i++)
    {
        
        if (container[i].Value == "")
        {
            j = 1;
           
            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
            txtB.style.backgroundPosition = "95% center";
            txtB.style.backgroundRepeat = "no-repeat";
            //txtB.style.border = "5px solid Red!important";
            //txtB.style.backgroundColor = "#FFFEE1";
            Errorbox.style.paddingLeft = "30px";            
            
        }

        
        
    }
    if (j == '1')
    {

        var p = document.createElement('p');
        p.innerHTML = "* Some Fields Are Empty ! ";
        p.style.color = "Red";
        p.style.fontSize = "14px";       
        divs.appendChild(p);     
        return false;
    }
    if(j=='0')
    {
        $('#ErrorBox').hide();
        AddBoutiques();
        return true;
    }
    
}
function AddBoutiques()
{
   

    
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    var boutiquid = $("#hdfBoutiqueID").val();
    var result = "";
    var Boutique = new Object();
    if (boutiquid != "") {
        Boutique.BoutiqueID = boutiquid;
    }

    if ($(".ddlCurrency").val() != "") {
        Boutique.CurrencyCode = $(".ddlCurrency").val();
    }
 


    //Boutique.CurrencyCode = $("#idDdlCurrency").val();
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
        $('.alert-success strong').text(Messages.InsertionSuccessFull);

//---------- * Rebinding Boutique Dropdown * ------------//

        $(".ddlboutiques").select2('data', null);

        $(".ddlboutiques").select2({
            data: BindAsyncBoutiques()//Boutiques dropdown binds only with id and text[key:value] mandatory
        , allowClear: true
        , placeholder: "Select a Boutique"
        });
    }
    if (result != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').text(Messages.InsertionFailure);
    }

    clearControls();

    BindBoutiqueAsyncLoad();//Gridbind
}
function AdminValidation()
{
 
    $('#Displaydiv1').remove();
    var DdlBoutique = $('#idDdlboutiques');
    var Name = $('#txtUserName');
    var LoginName = $('#txtAdminLoginName');
    var Password = $('#txtAdminPass');
    var CPassword = $('#txtAdminConPass');
    var Email = $('#txtUserEmail');
    var Phone = $('#txtMobile');
    //var Timings = $('#txtTimings');
    //var WorkDays = $('#txtWorkingDays');
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
            //txtB.style.backgroundColor = "#FFFEE1";
            Errorbox.style.paddingLeft = "30px";

        }
        
       
    }
    if (Password[0].value != CPassword[0].value) {
        j = 1;
        var p = document.createElement('p');
        p.innerHTML = "Password Missmatch !";
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
function AddAdmin()
{
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
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
    if ($('#chkActive').is(':checked')) {
        Admin.IsActive = "true";
    }
    else {
        Admin.IsActive = "false";
    }
    result = InsertAdmin(Admin);
    if (result == "1") {
        $('#rowfluidDiv').show();
        $('.alert-success').show();
        $('.alert-success strong').text(Messages.InsertionSuccessFull);
    }
    if (result != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').text(Messages.InsertionFailure);
    }

    ClearAdminControls();
}

