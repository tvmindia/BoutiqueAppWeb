﻿$("document").ready(function (e) {

   
    parent.document.title = "Order Status";
   

    BindOrdersTable();

    $('#OrdersTable').DataTable({
        "bPaginate": false,             //Search and Paging implementation
    });

//------------ BINDING  Order details table------------//


        //---* Bind the orders table by converting JSON data of datatable into html table *--//

        function BindOrdersTable() {
        var jsonResult = {};
        var Order = new Object();
        jsonResult = GetAllOrders(Order);
        if (jsonResult != undefined) {
            FillOrderTable(jsonResult);
        }
    }

        //---* Get the datatable in form of JSON *--//

        function GetAllOrders(Order) {
            var ds = {};
            var table = {};
            var data = "{'OrderObj':" + JSON.stringify(Order) + "}";
            ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetAllOrders");
            table = JSON.parse(ds.d);
            return table;
        }


        //---* Creation of html table from received JSON *--//

        function FillOrderTable(Records) {
            $("tbody#OrderRows tr").remove();            //Remove all existing rows for refreshing
            $.each(Records, function (index, Records) {
           
                //var html = '<tr UserID="' + (Records.OrderID != null ? Records.OrderID : "-") + '" BoutiqueID="' + (Records.BoutiqueID != null ? Records.BoutiqueID : "-") + '"><td>' + (Records.OrderNo != null ? Records.OrderNo : "-") + '</td><td class="center">' + (Records.OrderDescription != null ? Records.OrderDescription : "-") + '</td><td class="center">' + (Records.OrderDate != null ? Records.OrderDate : "-") + '</td><td class="center">' + (Records.ForecastDeliveryDate != null ? Records.ForecastDeliveryDate : "-") + '</td><td class="center"><a class="btn btn-info OrderEdit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger OrderDelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';

                var html = '<tr OrderID="' + (Records.OrderID != null ? Records.OrderID : "-") + '" BoutiqueID="' + (Records.BoutiqueID != null ? Records.BoutiqueID : "-") + '"><td>' + (Records.OrderNo != null ? Records.OrderNo : "-") + '</td><td class="center">' + (Records.OrderDescription != null ? Records.OrderDescription : "-") + '</td><td class="center"><a class="btn btn-info OrderEdit" href="#"><i class="halflings-icon white edit"></i></a></td></tr>';

                $("#OrdersTable").append(html);
            });
        }


//------------END :   BINDING  Order details table------------//

//------------ Edit Button CLick------------//

        $(".OrderEdit").live(
        {
            click: function (e) {

                $('#rowfluidDiv').hide();
                $('.alert-success').hide();
                $('.alert-error').hide();
                var jsonResult = {};
                editedrow = $(this).closest('tr');
                var Order = new Object();

                Order.OrderID = editedrow.attr("OrderID");
                jsonResult = GetOrderDetailsByOrderID(Order);
                if (jsonResult != undefined) {
                    BindControlsWithOrderDetails(jsonResult);
                }
                //Scroll page
                var offset = $('#editLabel').offset();
                offset.left -= 20;
                offset.top -= 20;
                $('html, body').animate({
                    scrollTop: offset.top,
                    scrollLeft: offset.left
                });
                return false;
            }
        })
//------------END : Edit Button CLick------------//

//------------ Save Button CLick------------//

        $(".submitDetails").live(
        {
            click: function (e) {
                $('#rowfluidDiv').hide();
                $('.alert-success').hide();
                $('.alert-error').hide();
                
                var result = "";
                var Order = new Object();
               
                debugger;

 //------* Create New Order Case *---------//

                if ($("#hdfOrderID").val() == "")   
                {
                   
                    if ($("#txtOrderDate").val().trim() != "")
                    {
                        Order.OrderDate = $("#txtOrderDate").val();
                    }
                    else
                    {
                        alert("Please select order date.");
                        return;
                    }

                    if ($("#txtPlannedDeliveryDate").val().trim() != "")
                    {
                        Order.PlannedDeliveryDate = $("#txtPlannedDeliveryDate").val();
                        //Order.ForecastDeliveryDate = $("#txtPlannedDeliveryDate").val()

                    }
                    //else {
                    //    alert("Please select planned delivery date.");
                    //    return;
                    //}

              }

 //------* END  *---------//

                else  //Update
                {
                    Order.OrderID = $("#hdfOrderID").val();
                   
                    Order.OrderReadyDate = $("#dateOrderReadyDate").val();
                }

                var TotalAmount =parseInt ($("#txtTotalOrderAmount").val()); 
               
                if (isNaN(TotalAmount))
                {
                    Order.TotalOrderAmount  = 0;
                    //alert("Please enter total amount");
                    //return;
                }
                else
                {
                    Order.TotalOrderAmount = $("#txtTotalOrderAmount").val();
                }

                Order.ForecastDeliveryDate = $("#dateForecastDeliveryDate").val();
                Order.ActualDeliveryDate = $("#dateActualDeliveryDate").val();
                Order.OrderDescription = $("#txtDescription").val();
               
               
                result = InsertOrUpdateOrder(Order);

                if (result == "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                   
                    $("#txtDescription").val("");
                    $("#txtOrderDate").val("");
                    $("#dateOrderDate").text("");
                    $("#txtPlannedDeliveryDate").val("");
                    $("#datePlannedDeliveryDate").text("");
                    $("#dateForecastDeliveryDate").val("");
                    $("#dateOrderReadyDate").val("");
                    $("#dateActualDeliveryDate").val("");
                    $("#txtTotalOrderAmount").val("");
                    $("#hdfOrderID").val("");
                   
                    $(".submitDetails").text("Save");
                    $("#editLabel").text("New Order");

                    BindOrdersTable(); //To bind table with new or modified entry

 //---------Manage Control hide and show
                    $("#OrderNoDiv").hide();
                    $("#lblOrderNo").hide();

                    $("#dateOrderDate").hide();
                    $("#datePlannedDeliveryDate").hide();
                    $("#txtOrderDate").show();
                    $("#txtPlannedDeliveryDate").show();

                    $("#ForecastDiv").hide();
                    $("#OrderReadyDiv").hide();
                    $("#ActualDeliveryDiv").hide();

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
 //------------END: Save Button CLick------------//

 //----------- Cancel button Click -----------
        $(".Cancel").live({
            click: function (e) {// Clear controls
                $("#txtDescription").val("");
                $("#txtOrderDate").val("");
                $("#dateOrderDate").text("");
                $("#txtPlannedDeliveryDate").val("");
                $("#datePlannedDeliveryDate").text("");
                $("#dateForecastDeliveryDate").val("");
                $("#dateOrderReadyDate").val("");
                $("#dateActualDeliveryDate").val("");
                $("#txtTotalOrderAmount").val("");
                $("#hdfOrderID").val("");

                $(".submitDetails").text("Save");
                $("#editLabel").text("New Order");

 //---------Manage Control hide and show
                $("#OrderNoDiv").hide();
                $("#lblOrderNo").hide();

                $("#dateOrderDate").hide();
                $("#datePlannedDeliveryDate").hide();
                $("#txtOrderDate").show();
                $("#txtPlannedDeliveryDate").show();

                $("#ForecastDiv").hide();
                $("#OrderReadyDiv").hide();
                $("#ActualDeliveryDiv").hide();
            }
        })

//---------------    END : Cancel Click       -------------

});


//------------Insert--------------------
function InsertOrUpdateOrder(Order) {
    var data = "{'OrderObj':" + JSON.stringify(Order) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/OrderStatus.aspx/InsertOrUpdateOrder");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}




//------------- * Functions Work On Edit Click *-----------------//

function GetOrderDetailsByOrderID(Order)
{
    var ds = {};
    var table = {};
    var data = "{'OrderObj':" + JSON.stringify(Order) + "}";
    ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetOrderDetailsByOrderID");
    table = JSON.parse(ds.d);
    return table;
}

function BindControlsWithOrderDetails(Records)
{
    $.each(Records, function (index, Records) {

        debugger;
//---------Manage Control hide and show on edit click 

        $("#OrderNoDiv").show();
        $("#lblOrderNo").show();

        $("#dateOrderDate").show();
        $("#datePlannedDeliveryDate").show();
        $("#txtOrderDate").hide();
        $("#txtPlannedDeliveryDate").hide();

        $("#ForecastDiv").show();
        $("#OrderReadyDiv").show();
        $("#ActualDeliveryDiv").show();

//------END
        $("#lblOrderNo").text(Records.OrderNo);

        $("#dateOrderDate").text(ConvertJsonToDate(Records.OrderDate));
        $("#datePlannedDeliveryDate").text(ConvertJsonToDate(Records.PlannedDeliveryDate));
        $("#txtDescription").val(Records.OrderDescription);
        $("#dateForecastDeliveryDate").val(ConvertJsonToDate(Records.ForecastDeliveryDate));
        $("#dateOrderReadyDate").val(ConvertJsonToDate(Records.OrderReadyDate));
        $("#dateActualDeliveryDate").val(ConvertJsonToDate(Records.ActualDeliveryDate));
        $("#txtTotalOrderAmount").val(Records.TotalOrderAmount);

        $("#hdfOrderID").val(Records.OrderID);

    });
    $(".submitDetails").text("Save");
    $("#editLabel").text("Edit Order");
}


//------------- *END :  Functions Work On Edit Click  *-----------------//


//------------- *  General Functions *-----------------//

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

//------------- *END : General Functions  *-----------------//