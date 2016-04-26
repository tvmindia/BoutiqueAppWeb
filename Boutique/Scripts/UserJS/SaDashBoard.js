$("document").ready(function (e) {
    $("#hdfBoutiqueID").val('');
  
   // $('#rowfluidDiv').show();
   // $('.alert-error').show();
    var jsonResult = {};
    jsonResult = GetAllBoutiques();
    //var table = {};
    //table = JSON.parse(jsonResult.d);
    //alert(table[0].StartedYear);
    //alert(table[1].Name);
    if (jsonResult != undefined)
    {
        BindBoutiqueTable(jsonResult);
        BindDropDown(jsonResult);

    }
    //events


    $(".edit").live(
       {
           click: function (e) {
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

    $(".CancelClear").live({
        click: function (e) {// Clear controls

            clearControls();

        }
    })



    $(".AddBoutique").live({
        click: function (e) {// submit button click
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
            if (result!= "0")
            {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
            }
            if (result== "1")
            {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
            }
            
            BindBoutiqueAsyncLoad();//Gridbind
          
        }
    })

  
    $(".AddAdmin").live({
        click: function (e) {// submit button click

            debugger;
            var Admin = new Object();
            Admin.Name = $("#txtUserName").val();
            
            Admin.Mobile = $("#txtMobile").val();
            Admin.Email = $("#txtUserEmail").val();
            Admin.IsActive = "true";
            Admin.BoutiqueID = "470a044a-4dba-4770-bca7-331d2c0834ae";
          

            InsertAdmin(Admin);

            //var jsonResults = {};
            //jsonResults = GetAllBoutiques();
            //if (jsonResults != undefined)
            //{
            //    BindBoutiqueTable(jsonResults);
            //}

        }
    })
   


});//document.ready

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

function  InsertBoutique(Boutique)
{
    var data = "{'boutiqueobj':" + JSON.stringify(Boutique) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/NewBoutique");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}


function InsertAdmin(Admin) {
    var data = "{'userObj':" + JSON.stringify(Admin) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/NewAdmin");

}

function GetAllBoutiques() {

    var ds = {};
    var table = {};
    var data = "{}";
    ds = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/GetAllBoutiques");
    table = JSON.parse(ds.d);
    //alert(table[0].StartedYear);
    //alert(table[1].Name);
    return table;
}

function GetBoutiques(boutiqueid)
{
    var ds = {};
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
        var html = '<tr class="myrows" boutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Name + '</td><td class="center">' + Records.AppVersion + '</td><td class="center">' + Records.Location + '</td><td class="center">' + Records.Phone + '</td><td class="center">' + Records.Timing + '</td><td class="center">' + Records.WorkingDays + '</td></td><td class="center"><a class="btn btn-info Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
       $("#bouquetTable").append(html);
    })
   
}


function BindDropDown(Records)

{
    // $('.selectpicker').selectpicker();
    var i = 1;
    $.each(Records, function(index, Records)
    {
         // $select.append('<option id="' + Records.id + '">' + Records.name + '</option>');
        //  $option.append('<option id="' + Records.BoutiqueID + '">' + Records.Name + '</option>');
       
       
        //$select.append('<option id="' + Records.BoutiqueID + '">' + Records.Name + '</option>');
        $(".chzn-results").append('<li id="ddlBoutiques_chzn_o_'+i+'" class="active-result" style="" Boutiqueid="' + Records.BoutiqueID + '">' + Records.Name + '</li>');
        i++;
      //  $(".chzn-results").append('<li id="ddlBoutiques_chzn_o_0" class="active-result" style="" Boutiqueid="' + Records.BoutiqueID + '">' + Records.Name + '</li>');
        //<li id="selectError_chzn_o_1" class="active-result" style="">Option 2</li>
       // <li id="ddlBoutiques_chzn_o_0" class="active-result result-selected" style="">Select</li>
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
 }



