$("document").ready(function (e) {
    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';

    //var MIN_AMOUNT_TO_REDEEM = 500;
    //var MAX_DISCOUNT_PERCENTAGE=50;
    //var MONEY_TO_POINT_VALUE=10;

    //Customers table--------
    BindUserTable(boutiqueid);
    $('#UsersTable').DataTable( {
        "bPaginate": false,             //removing paging
    });

    //Loyalty settings loading------
    LoadLoyaltySettings(boutiqueid);
    var MIN_AMOUNT_TO_REDEEM = $("#hdfMIN_AMOUNT_TO_REDEEM").val();;
    var MAX_DISCOUNT_PERCENTAGE = $("#hdfMAX_DISCOUNT_PERCENTAGE").val();;
    var MONEY_TO_POINT_VALUE = $("#hdfMONEY_TO_POINT_VALUE").val();;
 
   

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
    //Entering purchase amount-------------
    var CurrentLoyalty;
    var CurrentPurchase;
    var redeemablePoints;
    var totalPoints;
   
    $('#txtcurrentPurchase').on('input', function (e) {
        if ($.isNumeric($('#txtcurrentPurchase').val()) && ($('#txtcurrentPurchase').val() > 0) && ($('#hdfUserID').val() != '')) {
            CurrentLoyalty = parseInt($('#txtLoyaltyPoints').text());
            CurrentPurchase = parseInt($('#txtcurrentPurchase').val());
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
        }
    });

    $('#txtcurrentPurchase').blur(function () {
        if (!$.isNumeric($('#txtcurrentPurchase').val()) || ($('#txtcurrentPurchase').val()<0)) {
            $('#txtcurrentPurchase').val('0');
        }
    });

    //Redeeming decision------------------
    $("#radioYes").live(
    {
        click: function (e) {
            if ($.isNumeric($('#txtcurrentPurchase').val()) && ($('#txtcurrentPurchase').val() > 0) && ($('#hdfUserID').val() != '')) {
                var Amount = CurrentPurchase - redeemablePoints;
                var Points = totalPoints - redeemablePoints;
                $("#netAmount").text((Amount).toLocaleString('en-IN'));
                $("#netPoints").text(Points);
            }
        }
    });

    $("#radioNo").live(
    {
        click: function (e) {
            if ($.isNumeric($('#txtcurrentPurchase').val()) && ($('#txtcurrentPurchase').val() > 0) && ($('#hdfUserID').val() != '')) {
                var Amount = CurrentPurchase;
                var Points = totalPoints;
                $("#netAmount").text((Amount).toLocaleString('en-IN'));
                $("#netPoints").text(Points);
            }
        }
    });

    //Save button---------
    $(".submitDetails").live(
    {
        click: function (e) {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

            var Loyalty = new Object();

            if ($("#txtcurrentPurchase").val() != "") {
                Loyalty.purchaseAmount = $('#txtcurrentPurchase').val();
                }
            else {
                    alert("Please enter purchase amount.");
                    return;
            }

            Loyalty.UserID = $('#hdfUserID').val();

            if ($("#radioYes").parent().hasClass('checked')) {
                if (confirm("Redeem and make transaction?") == true) {
                    Loyalty.Redeem = true;
                }
                else {
                    return;
                }
            }
            else if ($("#radioNo").parent().hasClass('checked')) {
                if (confirm("Purchase without redeeming?") == true) {
                    Loyalty.Redeem = false;
                }
                else {
                    return;
                }
            }
            else {
                alert("Please select whether to redeem or not.");
                return;
            }

            Loyalty.BoutiqueID = boutiqueid;
                        
            result = MakeTransaction(Loyalty);
            if (result == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                //Clearing fields
                $("#txtUserName").text('');
                $("#txtMobile").text('');
                $("#txtLoyalCardNo").text('');
                $("#txtLoyaltyPoints").text('');
                $("#hdfUserID").val('');
                $('#txtcurrentPurchase').val('');
                $("#radioYes").parent().removeClass('checked');
                $("#radioNo").parent().removeClass('checked');
                $("#existingPoints").text('');
                $("#pointsFromThisPurchase").text('');
                $("#totalPoints").text('');
                $("#redeemablePoints").text('');
                $("#netAmount").text('');
                $("#netPoints").text('');
                CurrentLoyalty = 0;
                CurrentPurchase = 0;
                redeemablePoints = 0;
                totalPoints = 0;
            }
            if (result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
            }

            // Scroll page
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
            //Clearing fields
            $("#txtUserName").text('');
            $("#txtMobile").text('');
            $("#txtLoyalCardNo").text('');
            $("#txtLoyaltyPoints").text('');
            $("#hdfUserID").val('');
            $('#txtcurrentPurchase').val('');
            $("#radioYes").parent().removeClass('checked');
            $("#radioNo").parent().removeClass('checked');
            $("#existingPoints").text('');
            $("#pointsFromThisPurchase").text('');
            $("#totalPoints").text('');
            $("#redeemablePoints").text('');
            $("#netAmount").text('');
            $("#netPoints").text('');
            CurrentLoyalty = 0;
            CurrentPurchase = 0;
            redeemablePoints = 0;
            totalPoints = 0;
            // Scroll page
            var offset = $('#customers').offset();
            offset.left -= 20;
            offset.top -= 20;
            $('html, body').animate({
                scrollTop: offset.top,
                scrollLeft: offset.left
            });
        }
    })
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
        $("#hdfMIN_AMOUNT_TO_REDEEM").val(Records.MinAmountForRedeem);
        $("#hdfMAX_DISCOUNT_PERCENTAGE").val(Records.MaxDiscountPercentage);
        $("#hdfMONEY_TO_POINT_VALUE").val(Records.MoneyToPoint);
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
//------------Saving--------------------
function MakeTransaction(Loyalty) {
    var data = "{'loyaltyObj':" + JSON.stringify(Loyalty) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Loyalty.aspx/MakeTransaction");
    var table = {};
    table = JSON.parse(jsonResult.d);
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