$("document").ready(function (e) {

    $(".ddlboutiques").select2({

        data: BindAsyncBoutiques()//Boutiques dropdown binds only with id and text[key:value] mandatory
       , allowClear: true
       , placeholder: "Select a Boutique"
    });


    $("#hdfBoutiqueID").val('');

    //BindAsyncBoutiqueDropDown();
   
    


    var jsonResult = {};
    jsonResult = GetAllBoutiques();
    if (jsonResult != undefined) {
        BindBoutiqueTable(jsonResult);

    }
    //CallingDropDown
    
   
    //CallingDropDown
   
    
   
    //events


    $(".edit").live(
       {
           click: function (e) {
               $('#rowfluidDiv').hide();
               $('.alert-success').hide();
               $('.alert-error').hide();
               var jsonResult = {};
               editedrow = $(this).closest('tr');
               var boutid = editedrow.attr("boutiqueID");
               jsonResult = GetBoutiques(boutid);
               if (jsonResult != undefined) {

                   BindBoutiqueTextBoxes(jsonResult);
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
            
            BindBoutiqueAsyncLoad();//Gridbind
          
        }
    })

  
    $(".AddAdmin").live({
        click: function (e) {// submit button click
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

            //var jsonResults = {};
            //jsonResults = GetAllBoutiques();
            //if (jsonResults != undefined)
            //{
            //    BindBoutiqueTable(jsonResults);
            //}

        }
    })
    
   


});//document.ready



function BindAsyncBoutiques() {
    var jsonResult = {};
    var Boutiques = new Object();
    jsonResult = GetAllBoutiquesIDandName(Boutiques);
    if (jsonResult != undefined) {
        return jsonResult;
     }
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
function DeleteBoutique(boutiqueid)
{
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/DeleteBoutique");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}


function InsertAdmin(Admin) {
    var data = "{'userObj':" + JSON.stringify(Admin) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/NewAdmin");
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

function GetBoutiques(boutiqueid)
{   var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
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
   // $("#bouquetTable").find(".dataTables_wrapper").remove();
    //$("#bouquetTable").removeClass("dataTables_wrapper");
    $("#bouquetTable").find(".odd").remove();
    $("#bouquetTable").find(".myrows").remove();
    $.each(Records, function (index, Records) {
      //  var html = '<tr class="row_1" idval="' + Record.id + '"  chid="' + Record.id + '"><td width="15%" align="center" valign="middle"><input type="hidden" class="m-wrap span12 hftxtManuItemId"   id="hftxtManuItemId" value="' + Record.FocusItemManufacture.id + '"><a class="edit" chid="' + Record.id + '" suggestcatlog="' + Record.SuggestedCatlog + '" annualvol="' + Record.AnnualVolume + '" releaseqty="' + Record.ReleaseQuantity + '" targetpriz="' + Record.TargetPrize + '" certificate="' + Record.CertificateId + '" itemDescription="' + Record.ItemDescription + '" href="#">' + Record.SuggestedCatlog + '</a></td><td width="18%" height="20" align="center" valign="middle"><input  type="text" id="txtManuCost' + index + '" class="m-wrap span12 txtManuCost"   placeholder=""></td><td width="14%" height="20" align="center" valign="middle"><input type="text" id="txtLeadTime' + index + '" class="m-wrap span12 txtLeadTime"  placeholder=""></td><td width="14%" height="20" align="center" valign="middle"><input type="text" id="txtToolCharge' + index + '" class="m-wrap span12 txtToolCharge"  placeholder=""></td><td width="14%" align="center" valign="middle"><input type="text" id="txtMinQty' + index + '" class="m-wrap span12 txtMinQty"  placeholder=""></td><td width="11%" align="center" valign="middle"><a class="attachment"><img src="/Contents/assets/img/icn_attachment.png" alt="attachment"></a></td></tr>';
        var html = '<tr class="myrows" boutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Name + '</td><td class="center">' + Records.AppVersion + '</td><td class="center">' + Records.Location + '</td><td class="center">' + Records.Phone + '</td><td class="center">' + Records.Timing + '</td><td class="center">' + Records.WorkingDays + '</td></td><td class="center"><a class="btn btn-info Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger Delete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
       $("#bouquetTable").append(html);
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
    $('.selectpicker').selectpicker('val', 'one');
    $('.selectpicker').selectpicker('refresh');
    $('.selectpicker').selectpicker();

    $("#txtUserName").val('');
    $("#txtMobile").val('');
    $("#txtUserEmail").val('');

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
 
 }




