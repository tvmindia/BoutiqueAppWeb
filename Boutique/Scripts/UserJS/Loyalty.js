$("document").ready(function (e) {
    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';

    var MIN_AMOUNT_TO_REDEEM = 500;
    var MAX_DISCOUNT_PERCENTAGE=50;
    var MONEY_TO_POINT_VALUE=10;

    BindUserTable(boutiqueid);
    $('#UsersTable').DataTable( {
        "bPaginate": false,             //removing paging
    } );

    //Selecting user--------
    $(".userselect").live(
    {
        click: function (e) {

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var jsonResult = {};
            editedrow = $(this).closest('tr');
            var User = new Object();
            User.BoutiqueID = boutiqueid;
            User.UserID = editedrow.attr("UserID");
            jsonResult = GetUserDetails(User);
            if (jsonResult != undefined) {
                BindUserTextBoxes(jsonResult);
            }
            //Scroll page
            var offset = $('#DetailSection').offset();
            offset.left -= 20;
            offset.top -= 20;
            $('html, body').animate({
                scrollTop: offset.top,
                scrollLeft: offset.left
            });
            $('#txtcurrentPurchase').focus(); //to directly enter the amount            
            //Clearing fields
            $('#txtcurrentPurchase').val('');
            $("#radioYes").parent().removeClass('checked');
            $("#radioNo").parent().removeClass('checked');
            $("#existingPoints").text('');
            $("#pointsFromThisPurchase").text('');
            $("#totalPoints").text('');
            $("#redeemablePoints").text('');
            $("#netAmount").text('');
            $("#netPoints").text('');
            CurrentLoyalty=0;
            CurrentPurchase=0;
            redeemablePoints=0;
            totalPoints=0;
            return false;
        }
    })
        
    var CurrentLoyalty;
    var CurrentPurchase;
    var redeemablePoints;
    var totalPoints;
    $('#txtcurrentPurchase').on('input', function (e) {

        CurrentLoyalty = parseInt($('#txtLoyaltyPoints').text());
        CurrentPurchase=parseInt($('#txtcurrentPurchase').val());
        var pointsFromThisPurchase = Math.floor(CurrentPurchase * MONEY_TO_POINT_VALUE / 100);
        totalPoints = CurrentLoyalty + pointsFromThisPurchase;       
        if (CurrentPurchase >= MIN_AMOUNT_TO_REDEEM) {
            var max = CurrentPurchase * MAX_DISCOUNT_PERCENTAGE / 100; //maximum discountable amount
            if (CurrentLoyalty >= max) {
                redeemablePoints = max;
            }
            else {
                redeemablePoints = CurrentLoyalty;
            }
        }
        else {
            redeemablePoints = 0
        }
        redeemablePoints = Math.floor(redeemablePoints);

        $("#radioYes").parent().removeClass('checked');
        $("#radioNo").parent().removeClass('checked');
        $("#netAmount").text('');
        $("#netPoints").text('');

        $("#existingPoints").text(CurrentLoyalty);
        $("#pointsFromThisPurchase").text(pointsFromThisPurchase);
        $("#totalPoints").text(totalPoints);       
        $("#redeemablePoints").text(redeemablePoints);
    });

    $('#txtcurrentPurchase').blur(function () {
        if (!$.isNumeric($('#txtcurrentPurchase').val()) || ($('#txtcurrentPurchase').val()<0)) {
            $('#txtcurrentPurchase').val('0');
        }
    });

    $("#radioYes").live(
    {
        click: function (e) {
            var Amount=CurrentPurchase-redeemablePoints;
            var Points=totalPoints-redeemablePoints;
            $("#netAmount").text(Amount);
            $("#netPoints").text(Points);
        }
    });

    $("#radioNo").live(
    {
        click: function (e) {
            var Amount = CurrentPurchase;
            var Points = totalPoints;
            $("#netAmount").text(Amount);
            $("#netPoints").text(Points);
        }
    });
});


//------------User details table------------
function BindUserTable(boutiqueid) {
    var jsonResult = {};
    jsonResult = GetAllUsers(boutiqueid);
    if (jsonResult != undefined) {
        FillUserTable(jsonResult);
    }
}
function GetAllUsers(boutiqueid) {
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/Loyalty.aspx/GetAllUsers");
    table = JSON.parse(ds.d);
    return table;
}
function FillUserTable(Records) {
    $("tbody#userrows tr").remove();            //Remove all existing rows for refreshing
    $.each(Records, function (index, Records) {
        var html = '<tr UserID="' + Records.UserID + '" BoutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Name + '</td><td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center">' + Records.LoyaltyCardNo + '</td><td class="center"><a class="btn btn-success userselect" href="#"><i class="halflings-icon white eye-open"></i></a></td></tr>';
        //<a class="btn btn-info" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger" href="#"><i class="halflings-icon white trash"></i></a>
        $("#UsersTable").append(html);
    });
}
//------------Details screen populating---------------
function BindUserTextBoxes(Records) {
    $.each(Records, function (index, Records) {
        $("#txtUserName").text(Records.Name);
        $("#txtMobile").text(Records.Mobile);
        $("#txtLoyalCardNo").text(Records.LoyaltyCardNo);
        $("#txtLoyaltyPoints").text((Records.LoyaltyPoints == null ? 0 : Records.LoyaltyPoints));       
        $("#hdfUserID").val(Records.UserID);
    });
}
function GetUserDetails(User) {
    var ds = {};
    var table = {};
    var data = "{'userObj':" + JSON.stringify(User) + "}";
    ds = getJsonData(data, "../AdminPanel/Loyalty.aspx/GetUserByID");
    table = JSON.parse(ds.d);
    return table;
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
        var result = day + '-' + monthNames[month] + '-' + year;
        return result;
    }
}