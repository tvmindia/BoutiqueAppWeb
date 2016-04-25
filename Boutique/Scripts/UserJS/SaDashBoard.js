$("document").ready(function (e) {

  
    debugger;
    var jsonResult = {};
    jsonResult = GetAllBoutiques();
    //var table = {};
    //table = JSON.parse(jsonResult.d);
    //alert(table[0].StartedYear);
    //alert(table[1].Name);
    if (jsonResult != undefined)
    {
        BindBoutiqueTable(jsonResult);
    }
    //events
    $(".AddBoutique").live({
        click: function (e) {// submit button click

            debugger;
            var Boutique = new Object();
            Boutique.AppVersion = $("#txtAppVersion").val();
            Boutique.Name = $("#txtBouquetName").val();
            Boutique.StartedYear = $("#txtStartYear").val();
            Boutique.AboutUs = $("#txtAboutus").val();
          
            InsertBoutique(Boutique);
            
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
    var data = "{'NewBoutique':" + JSON.stringify(Boutique) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/NewBoutique");

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
  
    $("#bouquetTable").find(".odd").remove();
    $("#bouquetTable").find(".myrows").remove();
    $.each(Records, function (index, Records) {
      //  var html = '<tr class="row_1" idval="' + Record.id + '"  chid="' + Record.id + '"><td width="15%" align="center" valign="middle"><input type="hidden" class="m-wrap span12 hftxtManuItemId"   id="hftxtManuItemId" value="' + Record.FocusItemManufacture.id + '"><a class="edit" chid="' + Record.id + '" suggestcatlog="' + Record.SuggestedCatlog + '" annualvol="' + Record.AnnualVolume + '" releaseqty="' + Record.ReleaseQuantity + '" targetpriz="' + Record.TargetPrize + '" certificate="' + Record.CertificateId + '" itemDescription="' + Record.ItemDescription + '" href="#">' + Record.SuggestedCatlog + '</a></td><td width="18%" height="20" align="center" valign="middle"><input  type="text" id="txtManuCost' + index + '" class="m-wrap span12 txtManuCost"   placeholder=""></td><td width="14%" height="20" align="center" valign="middle"><input type="text" id="txtLeadTime' + index + '" class="m-wrap span12 txtLeadTime"  placeholder=""></td><td width="14%" height="20" align="center" valign="middle"><input type="text" id="txtToolCharge' + index + '" class="m-wrap span12 txtToolCharge"  placeholder=""></td><td width="14%" align="center" valign="middle"><input type="text" id="txtMinQty' + index + '" class="m-wrap span12 txtMinQty"  placeholder=""></td><td width="11%" align="center" valign="middle"><a class="attachment"><img src="/Contents/assets/img/icn_attachment.png" alt="attachment"></a></td></tr>';
        var html = '<tr class="myrows" boutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Name + '</td><td class="center">' + Records.AppVersion + '</td><td class="center">' + Records.Location + '</td><td class="center">' + Records.Phone + '</td><td class="center">' + Records.Timing + '</td><td class="center">' + Records.WorkingDays + '</td></td><td class="center"><a class="btn btn-info Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
       $("#bouquetTable").append(html);
    })
   
}


function BindEvents() {
    $(document).ready(function() {
        alert("Albert");
        $(".Edit").live(
       {
           click: function (e) {
               debugger;
               editedrow = $(this).closest('tr');
               var boutid = editedrow.attr("boutiqueID");
               GetBoutiques(boutid);

               alert(boutid);
               return false;
           }

       })


        });
    }