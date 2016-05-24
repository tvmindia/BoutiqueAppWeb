$("document").ready(function (e) {
    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';
    LoadLoyaltySettings(boutiqueid);
    //Log table--------
    
    BindLoyaltyLogTable(boutiqueid);
    
    $('#LoyaltyLogTable').DataTable({        
        "aaSorting": [[8,'desc']],      //Sort with Date coloumn
        "bPaginate": false,             //removing paging
    });

    $('#txtMoneyToPointPercentage').blur(function () {             //Validation
        if (!$.isNumeric($('#txtMoneyToPointPercentage').val()) || ($('#txtMoneyToPointPercentage').val() < 0)) {
            $('#txtMoneyToPointPercentage').val('1');
        }
        else if (($('#txtMoneyToPointPercentage').val() >100)) {
            $('#txtMoneyToPointPercentage').val('100');
        }
    });
    $('#txtMinPurchaseAmount').blur(function () {             //Validation
        if (!$.isNumeric($('#txtMinPurchaseAmount').val()) || ($('#txtMinPurchaseAmount').val() < 0)) {
            $('#txtMinPurchaseAmount').val('0');
        }
    });
    $('#txtMaxDiscountPercentage').blur(function () {             //Validation
        if (!$.isNumeric($('#txtMaxDiscountPercentage').val()) || ($('#txtMaxDiscountPercentage').val() < 0)) {
            $('#txtMaxDiscountPercentage').val('1');
        }
        else if (($('#txtMaxDiscountPercentage').val() > 100)) {
            $('#txtMaxDiscountPercentage').val('100');
        }
    });
    //Save settings button---------
    $(".saveSettings").live(
    {
        click: function (e) {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var result = "";
            var Loyalty = new Object();
            Loyalty.BoutiqueID = boutiqueid;
            if ($("#txtMoneyToPointPercentage").val() != "") {
                Loyalty.MoneyValuePercentage = $("#txtMoneyToPointPercentage").val();
            }
            else {
                alert("Please enter Money to Points Percentage.");
                return;
            }
            if ($("#txtMinPurchaseAmount").val() != "") {
                Loyalty.MinAmountForRedeem = $("#txtMinPurchaseAmount").val();
            }
            else {
                alert("Please enter Minimum Purchase Amount for Redeem.");
                return;
            }
            if ($("#txtMaxDiscountPercentage").val() != "") {
                Loyalty.MaxDiscountPercentage = $("#txtMaxDiscountPercentage").val();
            }
            else {
                alert("Please enter Maximum Discount Percentage.");
                return;
            }

            result = InsertLoyaltySettings(Loyalty);
            if (result == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                LoadLoyaltySettings(boutiqueid);
            }
            if (result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
            }
            //Scroll page
            var offset = $('#rowfluidDiv').offset();
            offset.left -= 20;
            offset.top -= 20;
            $('html, body').animate({
                scrollTop: offset.top,
                scrollLeft: offset.left
            });
        }
    })
    //Cancel button-----------
    $(".Cancel").live({
        click: function (e) {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            //Clearing fields to old values
            LoadLoyaltySettings(boutiqueid);
        }
    })
});
//------------Load Loyalty settings------------
function LoadLoyaltySettings(boutiqueid) {
    var jsonResult = {};
    jsonResult = GetLoyaltySettings(boutiqueid);
    if (jsonResult != undefined) {
        SetLoyaltySettings(jsonResult);
    }
}
function GetLoyaltySettings(boutiqueid) {
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/Loyalty.aspx/GetLoyaltySettings");
    table = JSON.parse(ds.d);
    return table;
}
function SetLoyaltySettings(Records) {
    $.each(Records, function (index, Records) {
        $("#txtMinPurchaseAmount").val(Records.MinAmountForRedeem);
        $("#txtMaxDiscountPercentage").val(Records.MaxDiscountPercentage);
        $("#txtMoneyToPointPercentage").val(Records.MoneyToPoint);        
    });
}
//------------Update Loyalty Settings------------
function InsertLoyaltySettings(Loyalty) {
    var data = "{'loyaltyObj':" + JSON.stringify(Loyalty) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/LoyaltySettings.aspx/UpdateLoyaltySettings");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//------------Loyalty Log details table------------
function BindLoyaltyLogTable(boutiqueid) {
    var jsonResult = {};
    jsonResult = GetLoyaltyLog(boutiqueid);
    if (jsonResult != undefined) {
        FillLoyaltyLogTable(jsonResult);
    }
}
function GetLoyaltyLog(boutiqueid) {
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/LoyaltySettings.aspx/GetLoyaltyLog");
    table = JSON.parse(ds.d);
    return table;
}
function FillLoyaltyLogTable(Records) {
    $("tbody#rows tr").remove();            //Remove all existing rows for refreshing
    $.each(Records, function (index, Records) {
        var html='<tr LoyaltyLogID="' + Records.LoyaltyLogID + '" BoutiqueID="' + Records.BoutiqueID +'"><td>'+Records.Name+'</td><td>'+ Records.LoyaltyCardNo +'</td><td>'+ Records.Mobile +'</td><td>'+ Records.AmountPaid +'</td><td>'+ Records.DebitPoints +'</td><td>'+ Records.CreditPoints +'</td><td>'+ Records.LoyaltyPoints + '</td><td>'+ Records.MoneyValuePercentage +'</td><td>'+ ConvertJsonToDate(Records.CreatedDate)+'</td></tr>';
        $("#LoyaltyLogTable").append(html);
    });
}
//---getting data as json-----//
function getJsonData(data, page) {
    var jsonResult = {};
    var req = $.ajax({
        type: "post",
        url: page,
        data: data,
        delay: 3,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json"

    }).done(function (data) {
        jsonResult = data;
    });
    return jsonResult;
}
function ConvertJsonToDate(jsonDate) {
    if (jsonDate != null) {
        var dateString = jsonDate.substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth();
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var monthNames = [
                      "Jan", "Feb", "Mar",
                      "Apr", "May", "Jun", "Jul",
                      "Aug", "Sep", "Oct",
                      "Nov", "Dec"
        ];
        var hour = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var result = day + '-' + monthNames[month] + '-' + year ;
        var time = currentTime.toLocaleTimeString().toLowerCase();
        result += "\t|\t" + time;
        return result;
    }
}