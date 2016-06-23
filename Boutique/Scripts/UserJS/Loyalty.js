$("document").ready(function (e) {
    parent.document.title = Pages.Loyalty
    var LoginUserRole = getRole();
    $('#hdfCurrencyCode').val(LoginUserRole[2]); //-- Set currency code (accessed from UA) to hiddenfield

//-----Transaction review Table :START-------//

    BindLoyaltyLogTable();

    $('#LoyaltyLogTable').DataTable({
        "aaSorting": [[8, 'desc']],      //Sort with Date coloumn
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
        "fnPageChange": "next"
    });

//----- END : Transaction review Table-------//

//-----------*   Currency Dropdown * --------//
    $(".Currency").select2({
        placeholder: "Choose related Currency",
        allowClear: true,
        data: BindCurrencyDropdown()
    });

    $(".Currency > option").each(function () {   //SET desfault selected option for currency 'select2'

        var symbol = this.value.split(',')[1];
        var currencyType = this.value.split(',')[0];

        if (currencyType == $('#hdfCurrencyCode').val())
        {
            $('#hdfCurrencyCode').val($('#hdfCurrencyCode').val() + "," + symbol);

            $("select").val($('#hdfCurrencyCode').val()).trigger("change");  //set   default selected option
            return false;
        }

    });

    $('.Currency').select2() //Item changed event of currency 'select2'
        .on("change", function (e) {
            debugger;
            
            var amount = $("#txtcurrentPurchase").val();

            if ($("#netAmount").text != "" && amount >0) {

            var symbol = $(".Currency").val().split(',')[1];
            var currencyType = $(".Currency").val().split(',')[0];

            $("#netAmount").text(symbol+" "+(amount).toLocaleString(currencyType));
            }
        });

//-----------*END:   Currency Dropdown * --------//


    //Customers table--------
    BindUserTable();
    $('#UsersTable').DataTable( {
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],

        "fnPageChange": "next"
    });

    //Loyalty settings loading------
    LoadLoyaltySettings();
    var MIN_AMOUNT_TO_REDEEM = $("#hdfMIN_AMOUNT_TO_REDEEM").val();;
    var MAX_DISCOUNT_PERCENTAGE = $("#hdfMAX_DISCOUNT_PERCENTAGE").val();;
    var MONEY_TO_POINT_VALUE = $("#hdfMONEY_TO_POINT_VALUE").val();;
 
   

    //Selecting user--------
    $(".userselect").live(
    {
        click: function (e) {

            //$("select").val("en-IN,₹").trigger("change");  //set india as default selected option

            if ($('#hdfCurrencyCode').val() != "") {
                $("select").val($('#hdfCurrencyCode').val()).trigger("change"); //set  default selected option
            }


            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var jsonResult = {};
            editedrow = $(this).closest('tr');
            var User = new Object();
         
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
            //Points calculation
            var pointsFromThisPurchase = Math.floor(CurrentPurchase * MONEY_TO_POINT_VALUE / 100);
            totalPoints = CurrentLoyalty + pointsFromThisPurchase;
            if (CurrentPurchase >= MIN_AMOUNT_TO_REDEEM) {                  //minimum purchase amount should be satisfied
                var max = CurrentPurchase * MAX_DISCOUNT_PERCENTAGE / 100;  //maximum discountable amount
                if (CurrentLoyalty >= max) {                                
                    redeemablePoints = max;                                 //Avoiding debiting poits more that maximum discountable
                }
                else {
                    redeemablePoints = CurrentLoyalty;                      //Debiting full loyalty points
                }
            }
            else {
                redeemablePoints = 0
            }
            redeemablePoints = Math.floor(redeemablePoints);
            //Clearing fields
            $("#radioYes").parent().removeClass('checked');
            $("#radioNo").parent().removeClass('checked');
            $("#netAmount").text('');
            $("#netPoints").text('');
            //Showing calculations
            $("#existingPoints").text(CurrentLoyalty);
            $("#pointsFromThisPurchase").text(pointsFromThisPurchase);
            $("#totalPoints").text(totalPoints);
            $("#redeemablePoints").text(redeemablePoints);
        }
    });

    $('#txtcurrentPurchase').blur(function () {             //Validation
        if (!$.isNumeric($('#txtcurrentPurchase').val()) || ($('#txtcurrentPurchase').val()<0)) {
            $('#txtcurrentPurchase').val('0');
        }
    });

    //Redeeming decision------------------
    $("#radioYes").live(
    {
        click: function (e) {
            debugger;

            if ($.isNumeric($('#txtcurrentPurchase').val()) && ($('#txtcurrentPurchase').val() > 0) && ($('#hdfUserID').val() != '')) {
                var Amount = CurrentPurchase - redeemablePoints;
                var Points = totalPoints - redeemablePoints;

                var currencyType = $(".Currency").val().split(',')[0];
                var symbol = $(".Currency").val().split(',')[1];

                $("#netAmount").text(symbol+" "+(Amount).toLocaleString(currencyType) );
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

                var currencyType = $(".Currency").val().split(',')[0];
                var symbol = $(".Currency").val().split(',')[1];

                $("#netAmount").text(symbol + " " + (Amount).toLocaleString(currencyType));
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

            if ($('#hdfUserID').val()== '') {
                return;
            }

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

         
                        
            result = MakeTransaction(Loyalty);
            if (result == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text(Messages.SavedSuccessfull);
               
                //Clearing fields
                $("#lblSymbol").text("");

                if ($('#hdfCurrencyCode').val() != "") {
                    $("select").val($('#hdfCurrencyCode').val()).trigger("change");  //set  default selected option
                }

                //$("select").val("en-IN").trigger("change");  //set india as default selected option

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

                $("#LoyaltyLogTable").dataTable().fnClearTable();
                $("#LoyaltyLogTable").dataTable().fnDestroy();


                BindLoyaltyLogTable();

                $('#LoyaltyLogTable').DataTable({

                    "aaSorting": [[8, 'desc']],      //Sort with Date coloumn
                    "bPaginate": true,
                    "iDisplayLength": 6,
                    "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],

                    "fnPageChange": "next"
                });

            }
            if (result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text(Messages.SavingFailure);
                
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

            debugger;

            $("#lblSymbol").text("");
            //$("select").val("en-IN").trigger("change");  //set india as default selected option
            if ($('#hdfCurrencyCode').val() != "") {
                $("select").val($('#hdfCurrencyCode').val()).trigger("change");  //set  default selected option
            }

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

//-----Transaction review Table :START-------//

function BindLoyaltyLogTable() {
    debugger;
    var jsonResult = {};
    var Loyalty = new Object();
    jsonResult = GetLoyaltyLog(Loyalty);
    if (jsonResult != undefined) {
        FillLoyaltyLogTable(jsonResult);
    }
}

function GetLoyaltyLog(Loyalty) {
    debugger;
    var ds = {};
    var table = {};
    var data = "{'loyaltyObj':" + JSON.stringify(Loyalty) + "}";
    ds = getJsonData(data, "../AdminPanel/LoyaltySettings.aspx/GetLoyaltyLog");
    table = JSON.parse(ds.d);
    return table;
}

function FillLoyaltyLogTable(Records) {
    debugger;

    $("#LoyaltyLogTable").width("100%");

    $("tbody#rows tr").remove();            //Remove all existing rows for refreshing
    $.each(Records, function (index, Records) {
        var html = '<tr LoyaltyLogID="' + Records.LoyaltyLogID + '" BoutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Name + '</td><td >' + Records.LoyaltyCardNo + '</td><td >' + Records.Mobile + '</td><td >' + (Records.AmountPaid != null ? Records.AmountPaid : "-") + '</td><td >' + (Records.DebitPoints != null ? Records.DebitPoints : "-") + '</td><td >' + (Records.CreditPoints != null ? Records.CreditPoints : "-") + '</td><td >' + Records.LoyaltyPoints + '</td><td>' + (Records.MoneyValuePercentage != null ? Records.MoneyValuePercentage : "-") + '</td><td ">' + ConvertJsonToDate(Records.CreatedDate) + '</td><td >' + (Records.Remarks != null ? Records.Remarks : "-") + '</td></tr>';
        $("#LoyaltyLogTable").append(html);
    });
}

//-----END  Transaction review Table :START-------//

//-----------*   Currency Dropdown * --------//

function BindCurrencyDropdown() {
    debugger;

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

//-----------* END:  Currency Dropdown * --------//

//------------User details table------------
function BindUserTable() {
    var jsonResult = {};
    var Users = new Object();
    jsonResult = GetAllUsers(Users);
    if (jsonResult != undefined) {
        FillUserTable(jsonResult);
    }
}
function GetAllUsers(Users) {
    var ds = {};
    var table = {};
    var data = "{'Usersobj':" + JSON.stringify(Users) + "}";
    ds = getJsonData(data, "../AdminPanel/Loyalty.aspx/GetAllUsers");
    table = JSON.parse(ds.d);
    return table;
}
function FillUserTable(Records) {
    $("tbody#userrows tr").remove();            //Remove all existing rows for refreshing
    $.each(Records, function (index, Records) {
        var html = '<tr UserID="' + (Records.UserID != null ? Records.UserID : "-") + '" BoutiqueID="' +( Records.BoutiqueID != null ? Records.BoutiqueID : "-" )+ '"><td>' +( Records.Name != null ? Records.Name : "-") + '</td><td class="center">' +( Records.Mobile != null ? Records.Mobile : "-") + '</td><td class="center">' + (Records.Email != null ? Records.Email : "-") + '</td><td class="center">' + (Records.LoyaltyCardNo != null ? Records.LoyaltyCardNo : "-") + '</td><td class="center"><a class="btn btn-success userselect" href="#"><i class="halflings-icon white eye-open"></i></a></td></tr>';
        $("#UsersTable").append(html);
    });
}
//------------Load Loyalty settings------------
function LoadLoyaltySettings() {
    var jsonResult = {};
    var loyalty = new Object();
    jsonResult = GetLoyaltySettings(loyalty);
    if (jsonResult != undefined) {
       SetLoyaltySettings(jsonResult);
    }
}
function GetLoyaltySettings(loyalty) {
    var ds = {};
    var table = {};
    var data = "{'loyaltyObj':" + JSON.stringify(loyalty) + "}";
    ds = getJsonData(data, "../AdminPanel/Loyalty.aspx/GetLoyaltySettings");
    table = JSON.parse(ds.d);
    return table;
}
function SetLoyaltySettings(Records) {
    $.each(Records, function (index, Records) {
        $("#hdfMIN_AMOUNT_TO_REDEEM").val(Records.MinAmountForRedeem);
        $("#hdfMAX_DISCOUNT_PERCENTAGE").val(Records.MaxDiscountPercentage);
        $("#hdfMONEY_TO_POINT_VALUE").val(Records.MoneyToPoint); 
        $("#loyaltySettingsInfo").text("Min Amount to Redeem: " + Records.MinAmountForRedeem + "\t|\tMax Discount Percentage: " + Records.MaxDiscountPercentage + "%\t|\tMoney to Point percentage: " + Records.MoneyToPoint+"%");
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
 