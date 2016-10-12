$("document").ready(function (e) {
    BindTiles();
    parent.document.title = Pages.SaDashboard;

    $("#hdfBoutiqueID").val('');

    BindAsyncBoutiqueDropDown();  
    BindAsyncBranchDropDown();
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

    //-------------* boutiques Dropdown for Branches tab *-----------------------//
    $(".ddlboutiques").select2({
        data: BindAsyncBoutiques()//Boutiques dropdown binds only with id and text[key:value] mandatory
    , allowClear: true
    , placeholder: "Select a Boutique"
    });

    //-------------* boutiques Dropdown for Admin Tab *-----------------------//
    $(".ddlBoutiques").select2({
        data: BindAsyncBoutiques()//Boutiques dropdown binds only with id and text[key:value] mandatory
    , allowClear: true
    , placeholder: "Select a Boutique"
    });

    //-------------* Branches Dropdown *-----------------------//
    $(".ddlBranches").select2({
    allowClear: true
  , placeholder: "Select Branch"
    });

    //-------------* Boutique Edit *-----------------------//
    $(".boutiqueEdit").live({
        click: function (e) {
            RemoveStyle();

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

    //-------------* Boutique Delete *-----------------------//
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

    //-------------* Boutique Cancel *-----------------------//
    $(".CancelClear").live({
        click: function (e) {// Clear controls
            clearControls();
            RemoveStyle();
        }
    })
    
    //-------------* Branch Cancel *-----------------------//
    $(".CancelAdClear").live({
        click: function (e) {// Clear controls            
            ClearAdminControls();
            RemoveStyle();
        }
    })

    //-------------* Branch Delete *-----------------------//
    $(".branchDelete").live({
        click: function (e) {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var jsonResult = {};
            editedrow = $(this).closest('tr');
            var e = editedrow.attr("branchID");
            var p = "DeleteBranch";
            DeleteCustomAlert('Are You Sure?', e, p);
            return false;
        }
    })

    //-------------* Branch Edit *-----------------------//
    $(".branchedit").live({
        click: function (e) {
            debugger;
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var jsonResult = {};
            var branchID = "";
            editedrow = $(this).closest('tr');
            var Boutique = new Object();
            Boutique.BoutiqueID = $("#hdfBranchBoutique").val();
            Boutique.branchID = editedrow.attr("branchID");
            branchID = editedrow.attr("branchID");
            $("#hdfBranchID").val(branchID);
            jsonResult = SelectBranch(Boutique);
            if (jsonResult != undefined) {
                BindBranchTextBoxes(jsonResult);
            }
            var EditDiv = document.getElementById('NewBranchSpan');
            EditDiv.style.boxShadow = '0 3px 20px #5BC0DE';
            $('html, body').animate({
                scrollTop: $("#NewBranchSpan").offset().top
            }, 500);
            return false;

        }
    })

    //-------------* Admin Edit *-----------------------//
    $(".adminedit").live({
        click: function (e) {
            debugger;
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var jsonResult = {};
            var branchID = "";
            editedrow = $(this).closest('tr');
            var Admin = new Object();
           
            Admin.BoutiqueID = $("#ddlAdminGridBranchBoutique").val();
            Admin.UserID = editedrow.attr("UserID");
            $("#hdfUserId").val(Admin.UserID);
            Admin.branchID = editedrow.attr("branchID");
            branchID = editedrow.attr("branchID");
            $("#hdfBranchID").val(branchID);
            Admin.AdminID = editedrow.attr("AdminID");
            $("#hdfAdminId").val(Admin.AdminID);
            jsonResult = GetAdmin(Admin);
            if (jsonResult != undefined) {
                BindAdminTextBoxes(jsonResult);
            }
            var EditDiv = document.getElementById('NewBranchSpan');
            EditDiv.style.boxShadow = '0 3px 20px #5BC0DE';
            $('html, body').animate({
                scrollTop: $("#NewBranchSpan").offset().top
            }, 500);
            return false;

        }
    })

    //-------------* Admin Delete *-----------------------//
    $(".adminDelete").live({
        click: function (e) {
            debugger;
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            try {
                ClearAdminControls();
                editedrow = $(this).closest('tr');
                var e = editedrow.attr("AdminID");
                var p = "SaAdmin";
                DeleteCustomAlert('Are You Sure?', e, p);
            }
            catch (e) {
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

    //admin boutique change event
    var $eventBranchSelect = $(".ddlboutiques");
    $eventBranchSelect.on("change", function (e) {
        debugger;

        $("#txtBoutique").val("");
        $("#txtBranch").val("");
        $(".ddlBranches").select2({
            data: null
 , allowClear: true
 , placeholder: "Select Branch"
        });
        BindAsynAdminBranchDropdown();
    });
    
    $('input[type=text],input[type=password]').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').slideUp(1000);
    });
    $('textarea').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').slideUp(1000);
    });
            BindBoutiqueAsyncLoad();//Gridbind
            BindAsyncBoutiqueDropDown();
          
    $('#AppUserMainDiv').hide();
    
    $('#ExceptionMainDiv').hide();



});//document.ready

//----------Branch--------------//


function GetAdmin(Admin) {
    var ds = {};
    var table = {};
    try {
        var data = "{'Adminobj':" + JSON.stringify(Admin) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/GetAdmin");
        table = JSON.parse(ds.d);
    }
    catch (e) {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "SaDashboard";
        ExceptionTrack.Method = "GetAdmin";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

//---------- * Email Validation * --------------//
function ValidateEmail(e)
{
    debugger;
    var atpos = e.indexOf("@");
    var dotpos = e.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= e.length) {
        CustomAlert("Not a valid e-mail address");
        return false;
    }
}

function BindAsyncAdminsTable() {
    debugger;
    try {
        var jsonResult = {};
        var Admins = new Object();
        Admins.BoutiqueID = $("#hdfAdminBoutiqueId").val();
        Admins.branchId = $("#hdfAdminBranchId").val();
       
        jsonResult = GetAllAdmins(Admins);
        if (jsonResult != undefined) {
            BindAdminsTable(jsonResult);
        }
    }
    catch (e) {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "SADashboard";
        ExceptionTrack.Method = "BindAsyncAdminsTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function BindAdminsTable(Records)
{

    debugger;
    $("tbody#AdministratorRows tr").remove();

    $.each(Records, function (index, Records) {

        var html = '<tr class="AdministratorRows" branchID="' + Records.BranchID + '"UserID="' + Records.UserID + '"AdminID="' + Records.AdminID + '"><td>' + Records.Name + '</td><td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td></td><td class="center"><a class="btn btn-info adminedit" href="#" data-toggle="tooltip" data-placement="top"  title="Edit"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger adminDelete" href="#" data-toggle="tooltip" data-placement="top"  title="Delete"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#AdministratorTable").append(html);
    })
}

function GetAllAdmins(Admins) {

    var ds = {};
    var table = {};
    try {
        var data = "{'Adminsobj':" + JSON.stringify(Admins) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllAdmins");
        table = JSON.parse(ds.d);
    }
    catch (e) {

        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "SADashboard";
        ExceptionTrack.Method = "GetAllAdmins";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

//----------Delete Branch--------------//
function DeleteBranch(branchId)
{
    debugger;
    var jsonResult = {};
    var Boutique = new Object();
    if ($("#ddlGridBranchBoutique").val() != null) {
        Boutique.BoutiqueID = $("#ddlGridBranchBoutique").val();
    }
    else {
        Boutique.BoutiqueID = "";
    }
    Boutique.branchID = branchId;
    jsonResult = DeleteBoutiqueBranch(Boutique);
    if (jsonResult != undefined) {
        if (jsonResult == "1") {
            BindBranchAsyncLoad();//Gridbind
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
            BindBranchAsyncLoad();//Gridbind
            BindAsyncBoutiqueDropDown();
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.DeletionFailure);
        }
    }
}

//----------Delete Branch--------------//
function DeleteBoutiqueBranch(Boutique) {
    var data = "{'boutiquesObj':" + JSON.stringify(Boutique) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/DeleteBranch");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

//----------set dropdown values to hidden fields--------------//
function BindAdminHiddenFields()
{
    var boutiqueID = "";
    var branchId = "";
    var boutiqueName = "";
    var branchName = "";
    if ($("#ddlAdminGridBranchBoutique").val() != null) {
        boutiqueID = $("#ddlAdminGridBranchBoutique").val();
        $("#hdfAdminBoutiqueId").val(boutiqueID);
    }
    else {
        boutiqueID = "";
    }
    if ($("#idAdminBoutiqueBranches").val() != null) {
        branchId = $("#idAdminBoutiqueBranches").val();
        $("#hdfAdminBranchId").val(branchId);
    }
    else {
        branchId = "";
    }
    if ($(".ddlboutiques option:selected").text() != null)
    {
        boutiqueName = $(".ddlboutiques option:selected").text();
        $("#txtBoutique").val(boutiqueName);        
    }
    if ($(".ddlBranches option:selected").text() != null)
    {
        branchName = $(".ddlBranches option:selected").text();
        $("#txtBranch").val(branchName);
    }
    BindAsyncAdminsTable();
}

//----------Bind Branch Grid--------------//
function BindBranchGrid()
{
    debugger;
    var boutiqueID = "";
    var boutiqueName = "";
    if ($("#ddlGridBranchBoutique").val() != null) {
        boutiqueID = $("#ddlGridBranchBoutique").val();
    }
    else {
        boutiqueID = "";
    }
    $("#hdfBranchBoutique").val(boutiqueID);
    if ($(".ddlBoutiques option:selected").text() != null)
    {
        boutiqueName = $(".ddlBoutiques option:selected").text();
        $("#txtBoutiqueName").val(boutiqueName);
    }
   
    BindBranchAsyncLoad();
}

//----------Branch fields Validation before insertion--------------//
function BranchAddValidation() {
    debugger;
    if ($("#editBranchLabel").text() == "Edit Branch")
    {
        EditBranch();
    }
    else
    {
        AddBranch();
    }
    BindBranchAsyncLoad();
}

//----------Insert Branch--------------//
function AddBranch() {
    debugger;
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    var result = "";
    var Latitude = "";
    var Longitude = "";
    var branchCode = $("#txtBranchCode").val();
    var phone=$("#txtBranchPhone").val();
  
            var Boutique = new Object();
            Boutique.BoutiqueID = $("#hdfBranchBoutique").val();
            Latitude = $("#txtBranchLatitude").val();
            Longitude = $("#txtBranchLongitude").val();
            Boutique.branchCode = $("#txtBranchCode").val();
            Boutique.branchName = $("#txtBranchName").val();
            Boutique.branchLocation = $("#txtBranchLocation").val();
            Boutique.branchAddress = $("#txtBranchAddress").val();
            Boutique.branchPhone = $("#txtBranchPhone").val();
            Boutique.branchEmail = $("#txtBranchEmail").val();
            Boutique.branchCoordinate = Latitude + "," + Longitude;
            if ($('#chkBranchActive').is(':checked')) {
                Boutique.branchIsActive = "true";
            }
            else {
                Boutique.branchIsActive = "false";
            }

            if ((branchCode.length == 3) || (branchCode.length == 4))
            {
                result = InsertBranch(Boutique);
                if (result == "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                    $('.alert-success strong').text(Messages.InsertionSuccessFull);

                    //---------- * Rebinding Boutique Dropdown * ------------//

                    $(".ddlBoutiques").select2('data', null);

                    $(".ddlBoutiques").select2({
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

                ClearTextBoxes();

                BindBoutiqueAsyncLoad();//Gridbind
            }
            else
            {
                CustomAlert("Branchcode length should be 3 or 4");
            }
   
}

//----------Edit Branch--------------//
function EditBranch()
{
    debugger;
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    var result = "";
    var Latitude = "";
    var Longitude = "";
    var Boutique = new Object();
    Boutique.BoutiqueID = $("#hdfBranchBoutique").val();
    Boutique.branchID = $("#hdfBranchID").val();
    Latitude = $("#txtBranchLatitude").val();
    Longitude = $("#txtBranchLongitude").val();
    Boutique.branchCode = $("#txtBranchCode").val();
    Boutique.branchName = $("#txtBranchName").val();
    Boutique.branchLocation = $("#txtBranchLocation").val();
    Boutique.branchAddress = $("#txtBranchAddress").val();
    Boutique.branchPhone = $("#txtBranchPhone").val();
    Boutique.branchEmail = $("#txtBranchEmail").val();
    Boutique.branchCoordinate = Latitude + "," + Longitude;
    if ($('#chkBranchActive').is(':checked')) {
        Boutique.branchIsActive = "true";
    }
    else {
        Boutique.branchIsActive = "false";
    }
    result = UpdateBranch(Boutique);
    if (result == "1") {
        $('#rowfluidDiv').show();
        $('.alert-success').show();
        $('.alert-success strong').text(Messages.UpdationSuccessFull);

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

   

    BindBoutiqueAsyncLoad();//Gridbind
}

//----------Update Branch--------------//
function UpdateBranch(Boutique) {
    debugger;
    var data = "{'boutiqueobj':" + JSON.stringify(Boutique) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/EditBranch");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

//----------Insert Branch--------------//
function InsertBranch(Boutique) {
    debugger;
    var data = "{'boutiqueobj':" + JSON.stringify(Boutique) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/NewBranch");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}


function BindBranchAsyncLoad() {
    debugger;
    var jsonResults = {};
    var Boutique = new Object();
    if ($("#ddlGridBranchBoutique").val() != null) {
        Boutique.BoutiqueID = $("#ddlGridBranchBoutique").val();
    }
    else {
        Boutique.BoutiqueID = "";
    }
    jsonResults = GetAllBranches(Boutique);
    if (jsonResults != undefined) {
        BindBranchesTable(jsonResults);
    }
}

//----------Bind Branches Table--------------//
function BindBranchesTable(Records) {
    ClearTextBoxes();
    $("tbody#branchesRows tr").remove();
    $.each(Records, function (index, Records) {

        if (Records.Email == null || Records.Email == undefined)
        {
            Records.Email = "";
        }
        if (Records.IsActive=="1")
        {
            Records.IsActive = "Yes";
        }
        else
        {
            Records.IsActive = "No";
}
        var html = '<tr class="branchesRows" branchID="' + Records.BranchID + '"><td>' + Records.BranchCode + '</td><td class="center">' + Records.Name + '</td><td class="center">' + Records.Location + '</td><td class="center">' + Records.Phone + '</td><td class="center">' + Records.Email + '</td><td class="center">' + Records.IsActive + '</td></td><td class="center"><a class="btn btn-info branchedit" href="#" data-toggle="tooltip" data-placement="top"  title="Edit"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger branchDelete" href="#" data-toggle="tooltip" data-placement="top"  title="Delete"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#branchesTable").append(html);
    })

}

//----------Get All Branches--------------//
function GetAllBranches(Boutique) {
    var ds = {};
    var table = {};
    var data = "{'boutiqWebObj':" + JSON.stringify(Boutique) + "}";
    ds = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/GetAllBranches");
    table = JSON.parse(ds.d);
    return table;
}

//----------Select specific Branch based on boutique ID and Branch ID--------------//
function SelectBranch(Boutique) {
    var ds = {};
    var table = {};
    var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
    ds = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/SelectBranch");
    table = JSON.parse(ds.d);
    return table;
}

//----------Bind Branch TextBoxes--------------//
function BindBranchTextBoxes(Records) {
    var Coordinate = Records[0].Coordinate;
    var latitude = Coordinate.split(',')[0];
    var longitude = Coordinate.split(',')[1];
        $("#txtBranchCode").val(Records[0].BranchCode);
        $("#txtBranchName").val(Records[0].Name);
        $("#txtBranchLocation").val(Records[0].Location);
        $("#txtBranchAddress").val(Records[0].Address);
        $("#txtBranchPhone").val(Records[0].Phone);
        $("#txtBranchEmail").val(Records[0].Email);
        $("#txtBranchLatitude").val(latitude);
        $("#txtBranchLongitude").val(longitude);
        if (Records[0].IsActive == 1)
        {
            document.getElementById("chkBranchActive").checked = true;
        }
        else
        {
            document.getElementById("chkBranchActive").checked = false;
        }
        $("#editBranchLabel").text("Edit Branch");
}

//----------Clear All TextBoxes--------------//
function ClearTextBoxes()
{
    $("#txtBranchCode").val("");
    $("#txtBranchName").val("");
    $("#txtBranchLocation").val("");
    $("#txtBranchAddress").val("");
    $("#txtBranchPhone").val("");
    $("#txtBranchEmail").val("");
    $("#txtBranchLatitude").val("");
    $("#txtBranchLongitude").val("");
    $("#editBranchLabel").text("New Branch");
    document.getElementById("chkBranchActive").checked = true;
}

//----Boutique-------//

//----------Bind Currency DropDown--------------//
function BindCurrencyDropdown() {
    var jsonResult = {};
    var Loyalty = new Object();
    jsonResult = GetAllCurrency(Loyalty);
    if (jsonResult != undefined) {

        return jsonResult;
    }
}

//----------Get All Currency--------------//
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

//----------Delete SaAdmin--------------//
function DeleteSaAdmin(e,p)
{
    var Admin = new Object();
    var AdminBoutiqueId = $("#hdfAdminBoutiqueId").val();
    Admin.AdminID = e;
    Admin.BoutiqueID = AdminBoutiqueId;
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
//----------Delete Admin--------------//
function DeleteAdmin(Admin) {
    var ds = {};
    var table = {};
    try {
        var data = "{'AdminObj':" + JSON.stringify(Admin) + "}";
        ds = getJsonData(data, "../AdminPanel/People.aspx/DeleteAdmin");
        table = JSON.parse(ds.d);
    }
    catch (e) {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "SaDashboard";
        ExceptionTrack.Method = "DeleteAdmin";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function DeleteItem(e,p)
{
    debugger;
    var jsonResult = {};
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

function BindAsyncAdministrator()
{
    debugger;
    var jsonResult = {};
    var Boutiques = new Object();
    if ($("#ddlAdminGridBranchBoutique").val() != null) {
        Boutiques.BoutiqueID = $("#ddlAdminGridBranchBoutique").val();
    }
    else {
        Boutiques.BoutiqueID = "";
    }
    jsonResult = GetAllBranchIDandName(Boutiques);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}
function GetAllBranchIDandName(Boutiques) {
    var ds = {};
    var table = {};
    var data = "{'boutiquesObj':" + JSON.stringify(Boutiques) + "}";
    ds = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/GetAllBranchIDandName");
    table = JSON.parse(ds.d);
    return table;
}
function BindAsyncBoutiques() {
  debugger;
    var jsonResult = {};
    var Boutiques = new Object();
    jsonResult = GetAllBoutiquesIDandName(Boutiques);
    if (jsonResult != undefined) {
        //BindAsynAdminBranchDropdown();
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
        , placeholder: "Select Boutique"
    });
}
function BindAsynAdminBranchDropdown()
{
    debugger;
    
    if ($(".ddlboutiques option:selected").text() != "") {
        $(".ddlBranches").empty();
        var BoutiqueId = $(".ddlboutiques").val();
        $("#hdfAdminBoutiqueId").val(BoutiqueId);
        $(".ddlBranches").select2({
            data: BindAsyncAdministrator()//Boutiques dropdown binds only with id and text[key:value] mandatory
 , allowClear: true
 , placeholder: "Select Branch"
        });
        if($(".ddlBranches option:selected").text()!=null)
        {
            BindAdminHiddenFields();
    }
    }
    else
    {
        $(".ddlBranches").empty();
        $(".ddlBranches").select2({
       placeholder: "Select Branch"
    });
        BindAdminHiddenFields();
    }
   
}
function BindAsyncBranchDropDown() {

    $(".ddlBranches").select2({
         allowClear: true
        , placeholder: "Select Branch"
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
    debugger;
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

//----------Bind Boutique Table--------------//
function BindBoutiqueTable(Records) {
    $("tbody#Boutiquerows tr").remove();

    $.each(Records, function (index, Records) {
    
        var html = '<tr class="Boutiquerows" boutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Name + '</td><td class="center">' + Records.AppVersion + '</td><td class="center">' + Records.Location + '</td><td class="center">' + Records.Phone + '</td><td class="center">' + Records.Timing + '</td><td class="center">' + Records.WorkingDays + '</td></td><td class="center"><a class="btn btn-info boutiqueEdit" href="#" data-toggle="tooltip" data-placement="top"  title="Edit"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger Delete" href="#" data-toggle="tooltip" data-placement="top"  title="Delete"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#boutiqueTable").append(html);
    })
   
}

//----------Bind Boutique Textboxes--------------//
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

        $(".ddlCurrency").val(Records.CurrencyCode).trigger("change");

       })
    $(".AddBoutique").text("Save");
    $("#editLabel").text("Edit Boutique");

}

//----------Clear All Controls--------------//
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
    $(".ddlCurrency").val("").trigger("change");
}

//----------Clear Admin Controls--------------//
function ClearAdminControls()
{  
    $("#txtUserName").val('');
    $("#txtMobile").val('');
    $("#txtAdminLoginName").val('');
    $("#txtAdminPass").val('');
    $("#txtAdminConPass").val('');
    $("#txtUserEmail").val('');
    $("#hdfUserId").val('');
    $("#hdfAdminId").val('');

    $(".ddlboutiques").val("").trigger("change");
}

//----------Bind Tiles--------------//
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
}

function BindUsers()
{
    $('#AllBoutiquesMainDiv').hide();
    $('#ExceptionMainDiv').hide();
    $('#AppUserMainDiv').show();
    var AppUserDiv = document.getElementById('AppUserRowFluid');
    AppUserDiv.style.boxShadow = '0 3px 20px #FFC40D';
}

function BindException()
{
    $('#AllBoutiquesMainDiv').hide();
    $('#AppUserMainDiv').hide();
    $('#ExceptionMainDiv').show();
    var AppUserDiv = document.getElementById('ExcepyionRowFluid');
    AppUserDiv.style.boxShadow = '0 3px 20px #9F00A7';
}

//----------Boutique Fields Validation--------------//
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

//----------Add New Boutique--------------//
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
        $(".ddlBoutiques").select2({
            data: BindAsyncBoutiques()//Boutiques dropdown binds only with id and text[key:value] mandatory
 , allowClear: true
 , placeholder: "Select a Boutique"
        });

        $(".ddlCurrency").val("").trigger("change");
       
    }
    if (result != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').text(Messages.InsertionFailure);
    }

    clearControls();

    BindBoutiqueAsyncLoad();//Gridbind
    BindAsyncBoutiqueDropDown();
}

//----------Admin Fields Validation--------------//
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
//---------- * Add New Administrator * --------------//
function AddAdmin()
{
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    var result = "";
    var Admin = new Object();
    if ($("#ddlAdminGridBranchBoutique").val() != null) {
        Admin.BoutiqueID = $("#ddlAdminGridBranchBoutique").val();
    }
    else {
        Admin.BoutiqueID = "";
    }
    if ($("#idAdminBoutiqueBranches").val() != null)
    {
        Admin.branchId = $("#idAdminBoutiqueBranches").val();
    }
    else
    {
        Admin.branchId = "";
    }
    Admin.UserID = $("#hdfUserId").val();
    Admin.Name = $("#txtUserName").val();
    Admin.LoginName = $("#txtAdminLoginName").val();
    Admin.Password = $("#txtAdminConPass").val();
    Admin.Mobile = $("#txtMobile").val();
    Admin.Email = $("#txtUserEmail").val();
    Admin.AdminID = $("#hdfAdminId").val();
    
    if ($('#chkActive').is(':checked')) {
        Admin.IsActive = "true";
    }
    else {
        Admin.IsActive = "false";
    }
    result = InsertAdmin(Admin);
    debugger;
    if (result == "1") {
        $('#rowfluidDiv').show();
        $('.alert-success').show();
        $('.alert-success strong').text(Messages.InsertionSuccessFull);
    }
    if (result == "2") {
        $('#rowfluidDiv').show();
        $('.alert-success').show();
        $('.alert-success strong').text(Messages.UpdationSuccessFull);
    }
    if (result == "3")
    {
        CustomAlert("Login name already exists");
    }
    if (result == "4")
    {
        CustomAlert("EmailId already exists");
    }
    if ((result != "1")&&(result != "2")&&(result!="3")&&(result!="4")) {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').text(Messages.InsertionFailure);
    }
    BindAdminHiddenFields();
    ClearAdminControls();

}

//----------Bind Admin TextBoxes--------------//
function BindAdminTextBoxes(Records)
{
    $("#txtUserName").val(Records[0].Name);
    $("#txtMobile").val(Records[0].Mobile);
    $("#txtAdminLoginName").val(Records[0].LoginName);
    $("#txtUserEmail").val(Records[0].Email);
    if (Records[0].Active == 1) {
        document.getElementById("chkActive").checked = true;
    }
    else {
        document.getElementById("chkActive").checked = false;
    }
}

//----------Clear Admin Controls--------------//
function ClearAllControls()
{
    $("#txtUserName").val('');
    $("#txtMobile").val('');
    $("#txtAdminLoginName").val('');
    $("#txtAdminPass").val('');
    $("#txtAdminConPass").val('');
    $("#txtUserEmail").val('');
    $("#hdfUserId").val('');
    $("#hdfAdminId").val('');
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    clearControls();
}

//----------Branch Fields Validation--------------//
function BranchValidation() {


    $('#Displaydiv2').remove();
   var BranchCode= $("#txtBranchCode");
    var BranchName= $("#txtBranchName");
   var BranchLocation= $("#txtBranchLocation");
   var BranchAddress= $("#txtBranchAddress");
   var BranchPhone= $("#txtBranchPhone");
   var BranchEmail= $("#txtBranchEmail");
    var container = [
        { id: BranchCode[0].id, name: BranchCode[0].name, Value: BranchCode[0].value },
        { id: BranchName[0].id, name: BranchName[0].name, Value: BranchName[0].value },
        { id: BranchLocation[0].id, name: BranchLocation[0].name, Value: BranchLocation[0].value },
        { id: BranchAddress[0].id, name: BranchAddress[0].name, Value: BranchAddress[0].value },
        { id: BranchPhone[0].id, name: BranchPhone[0].name, Value: BranchPhone[0].value },
        { id: BranchEmail[0].id, name: BranchEmail[0].name, Value: BranchEmail[0].value },
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
        BranchAddValidation();
        return true;
    }

}
