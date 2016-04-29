$("document").ready(function (e) {
    
    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';

    
    var jsonResult = {};
    jsonResult = GetBoutiques(boutiqueid);
    if (jsonResult != undefined) {

        BindBoutiqueTextBoxes(jsonResult);
    }


    $(".CancelClear").live({
        click: function (e) {// Clear controls
            clearControls();
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
            if (boutiquid != "") {
                Boutique.BoutiqueID = boutiquid;

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

function InsertBoutique(Boutique) {
    var data = "{'boutiqueobj':" + JSON.stringify(Boutique) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/NewBoutique");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function GetBoutiques(boutiqueid) {
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/BindBoutiqueDetails");
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
