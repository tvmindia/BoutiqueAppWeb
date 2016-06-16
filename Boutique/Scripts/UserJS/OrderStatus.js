﻿
$("document").ready(function (e) {


    var rowCount = $('#OrderItemTable OrderItemRows tr').length;

    if (rowCount == 0) {
        $('#OrderItemTable').hide();
    }



    parent.document.title = "Order Status";

    $(".products").select2({
        placeholder: "Choose related product",
        allowClear: true,
        data: BindProductDropdown()
    });


    $(".Users").select2({
        placeholder: "Choose user",
        allowClear: true,
        data: BindUserDropdown()
    });


    BindOrdersTable();

    $('#OrdersTable').DataTable({
        "bPaginate": false  ,       //Search and Paging implementation
        "aaSorting": [[0, 'desc']]     //Sort with Date coloumn
        

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

        debugger;


        //$("tbody#OrderRows tr").remove();            //Remove all existing rows for refreshing

        //$("#OrdersTable > tbody").empty();          //Remove all existing rows for refreshing

        $.each(Records, function (index, Records) {
            debugger
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

            $("#dateForecastDeliveryDate").removeAttr("disabled");
            $("#dateOrderReadyDate").removeAttr("disabled");
            $("#dateActualDeliveryDate").removeAttr("disabled");

            //$("#dateForecastDeliveryDate").addClass("input-large datepicker");

            var jsonResult = {};
            editedrow = $(this).closest('tr');
            var Order = new Object();

            Order.OrderID = editedrow.attr("OrderID");


            jsonResult = GetOrderDetailsByOrderID(Order);
            if (jsonResult != undefined) {
                BindControlsWithOrderDetails(jsonResult);

                $(".products").select2("val", "");
                document.getElementById('ImgProduct').src = "";
                $("#txtRemarks").val("");

                BindOrderItemsList(Order);
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

    $(".AddItem").live(
       {
           click: function (e) {



               $('#rowfluidDiv').hide();
               $('.alert-success').hide();
               $('.alert-error').hide();

               var result = "";
               var Order = new Object();

               Order.OrderID = $("#hdfOrderID").val();
               Order.ProductID = $(".products").val();
               Order.CustomerRemarks = $(".txtRemarks").val();

               result = InsertOrderItem(Order);

               if (result == "1") {

                   BindOrderItemsList(Order);
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


    //------------ Add To List Button CLick------------//



    $(".addToList").live(
    {
        click: function (e) {

            if ($(".products").val() != "") //check if  product is selected
            {

                AddToList();
            }
            else {
                alert("Please select an item ");
            }
        }
    })




    function ClearControls() {

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


        $("#dateForecastDeliveryDate").attr('disabled', 'disabled');
        $("#dateOrderReadyDate").attr('disabled', 'disabled');
        $("#dateActualDeliveryDate").attr('disabled', 'disabled');

        //---order item
        $('#OrderItemTable').hide();


        $(".Users").select2("val", "");

        //$("#ForecastDiv").hide();
        //$("#OrderReadyDiv").hide();
        //$("#ActualDeliveryDiv").hide();
    }



    //------------ Order Save Button CLick------------//

    $(".submitDetails").live(
    {
        click: function (e) {

            debugger;

          
            //$('#OrderItemTable tr').each(function () {
            //    debugger;
            //    var columns = $(this).find('td').cells[0].innerHTML;

            //})

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

            var result = "";
            var Order = new Object();


            if ($(".Users").val() != "") //check if  change for product items (Header only)
            {
                Order.UserID = $(".Users").val();
            }
            else {
                alert("Please select a user");
            }

            //------* Create New Order Case *---------//

            if ($("#hdfOrderID").val() == "") {

                if ($("#txtOrderDate").val().trim() != "") {
                    Order.OrderDate = $("#txtOrderDate").val();
                }
                else {
                    alert("Please select order date.");
                    return;
                }

                if ($("#txtPlannedDeliveryDate").val().trim() != "") {
                    Order.PlannedDeliveryDate = $("#txtPlannedDeliveryDate").val();
                    //Order.ForecastDeliveryDate = $("#txtPlannedDeliveryDate").val()

                }
                else {
                    alert("Please select planned delivery date.");
                    return;
                }

            }

                //------* END  *---------//

            else  //Update
            {
                Order.OrderID = $("#hdfOrderID").val();

                Order.OrderReadyDate = $("#dateOrderReadyDate").val();
            }

            var TotalAmount = parseInt($("#txtTotalOrderAmount").val());

            if (isNaN(TotalAmount)) {
                Order.TotalOrderAmount = 0;
                //alert("Please enter total amount");
                //return;
            }
            else {
                Order.TotalOrderAmount = $("#txtTotalOrderAmount").val();
            }


            Order.ForecastDeliveryDate = $("#dateForecastDeliveryDate").val();
            Order.ActualDeliveryDate = $("#dateActualDeliveryDate").val();
            Order.OrderDescription = $("#txtDescription").val();
           

            result = InsertOrUpdateOrder(Order);

            if (result != "") {

                ClearControls();


                if ($(".products").val() != "") //check if  change for product items (Header only)
                {

                    $('#OrderItemTable tbody tr').each(function () {
                        debugger;

                        var productId = $(this).attr("ProductID");
                        var productname = $(this).find('td').eq(0).text();

                        var remarks = $(this).find('td').eq(1).text();

                            Order.ProductID = productId;
                            Order.CustomerRemarks = remarks;

                            Order.OrderID = result;

                    result = InsertOrderItem(Order);

                       

                    })

                    if (result != "") {

                        


                        //$("#OrdersTable").dataTable();

                      
                        BindOrdersTable(); //To bind table with new or modified entry

                       
                        BindOrderItemsList(Order);

                        $(".products").select2("val", "");
                        $("#txtRemarks").val("");

                        $('#ImgProduct').hide();

                        $('#OrderItemTable').hide();

                        $('#rowfluidDiv').show();
                        $('.alert-success').show();

                        //Scroll page
                        var offset = $('#rowfluidDiv').offset();
                        offset.left -= 20;
                        offset.top -= 20;
                        $('html, body').animate({
                            scrollTop: offset.top,
                            scrollLeft: offset.left
                        });
                    }
                    if (result == "") {
                        $('#rowfluidDiv').show();
                        $('.alert-error').show();
                    }
                       
                }
                else {

                    $("#OrdersTable").dataTable().fnClearTable();
                    $("#OrdersTable").dataTable().fnDestroy();

                    $('#OrdersTable').DataTable({
                        "bPaginate": false,       //Search and Paging implementation
                        "aaSorting": [[0, 'desc']],      //Sort with Date coloumn
                    });

                   
                    BindOrdersTable(); //To bind table with new or modified entry

                    $('#rowfluidDiv').show();
                    $('.alert-success').show();

                    //Scroll page
                    var offset = $('#rowfluidDiv').offset();
                    offset.left -= 20;
                    offset.top -= 20;
                    $('html, body').animate({
                        scrollTop: offset.top,
                        scrollLeft: offset.left
                    });
                }



            }
            if (result == "") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
            }

        }
    })
    //------------END: Save Button CLick------------//

    //----------- Cancel button Click -----------
    $(".Cancel").live({
        click: function (e) {// Clear controls
            ClearControls();
            $(".products").select2("val", "");
            document.getElementById('ImgProduct').src = "";
            $("#txtRemarks").val("");

        }
    })

    //---------------    END : Cancel Click       -------------


    //Dropdown item cahnge event        
    $('.products').select2()
           .on("change", function (e) {

               $('#ImgProduct').show();

               debugger;
               var productID = $('.products').val();

               var Order = new Object();

               Order.ProductID = productID;

               if (productID != "") {
                   $("#txtRemarks").val("");

                   var imgID = GetProductImage(Order);

                   var prdctImg = document.getElementById('ImgProduct');
                   prdctImg.src = "../ImageHandler/ImageServiceHandler.ashx?ImageID=" + imgID;
               }

           })

    function GetProductImage(Order) {
        var ds = {};
        var table = {};
        var data = "{'OrderObj':" + JSON.stringify(Order) + "}";
        ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetProductImageByProductID");
        table = JSON.parse(ds.d);
        return table;

    }


    //---------- Delete Button Click---------
    $(".OrderItemDelete").live(
    {
        click: function (e) {
            debugger;
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            if (confirm("Do you want to delete this item ?") == true) {
                var jsonResult = {};
                editedrow = $(this).closest('tr');
                var Order = new Object();

                Order.ProductID = editedrow.attr("ProductID");
                Order.OrderID = editedrow.attr("OrderID");

                result = DeleteOrderItem(Order);
                if (result == "1") {

                    BindOrderItemsList(Order);

                    //$('#rowfluidDiv').show();
                    //$('.alert-success').show();

                }

                if (result == -1) {
                    debugger;


                    editedrow.remove();

                    var rowCount = $("#OrderItemTable > tbody > tr").length;


                    if (rowCount == 0) {
                        $('#OrderItemTable').hide();
                    }

                }


                if (result != "1" &&  result != "-1") {

                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                }

               


                //Scroll page
                //var offset = $('#rowfluidDiv').offset();
                //offset.left -= 20;
                //offset.top -= 20;
                //$('html, body').animate({
                //    scrollTop: offset.top,
                //    scrollLeft: offset.left
                //});
            }
            return false;
        }
    })
    //----------END: Delete Button Click---------
});


function AddToList() {
    debugger;

    $('#OrderItemTable').show();

    var productID = $('.products').val();
    var OrderID = $("#hdfOrderID").val();
    var CustomerRemarks = $("#txtRemarks").val();

    var data = $('.products').select2('data')
    var ProductName = data[0].text;
    var html = '<tr ProductID="' + (productID != null ? productID : "-") + '"OrderID="' + (OrderID != null ? OrderID : "-") + '"><td >' + (ProductName != null ? ProductName : "-") + '</td><td >' + (CustomerRemarks != null ? CustomerRemarks : "-") + '</td><td><a class="btn  OrderItemDelete" href="#" ><i class="halflings-icon white trash"></i></a></td></tr>';


    $("#OrderItemTable").append(html);


    //var y = document.getElementById("<%=hdfRemovedIDs.ClientID%>").value;


    //var productID = $('.products').val();
    //document.getElementById("<%=hdfRemovedIDs.ClientID%>").value += (productID + ",");
    //var x = document.getElementById("<%=hdfRemovedIDs.ClientID%>").value;

    //alert(x);

}

//------------Insert order item--------------------
function InsertOrderItem(Order) {
    var data = "{'OrderObj':" + JSON.stringify(Order) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/OrderStatus.aspx/InsertOrderItem");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

//------------Insert order--------------------
function InsertOrUpdateOrder(Order) {
    var data = "{'OrderObj':" + JSON.stringify(Order) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/OrderStatus.aspx/InsertOrUpdateOrder");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

//------------- * Functions Work On Edit Click *-----------------//

function GetOrderDetailsByOrderID(Order) {
    var ds = {};
    var table = {};
    var data = "{'OrderObj':" + JSON.stringify(Order) + "}";
    ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetOrderDetailsByOrderID");
    table = JSON.parse(ds.d);
    return table;
}

function BindControlsWithOrderDetails(Records) {
    $.each(Records, function (index, Records) {


        //---------Manage Control hide and show on edit click 

        $("#OrderNoDiv").show();
        $("#lblOrderNo").show();

        $("#dateOrderDate").show();
        $("#datePlannedDeliveryDate").show();
        $("#txtOrderDate").hide();
        $("#txtPlannedDeliveryDate").hide();


        //$("#ForecastDiv").show();
        //$("#OrderReadyDiv").show();
        //$("#ActualDeliveryDiv").show();

        //------END
        $("#lblOrderNo").text(Records.OrderNo);

        $("#dateOrderDate").text(ConvertJsonToDate(Records.OrderDate));
        $("#datePlannedDeliveryDate").text(ConvertJsonToDate(Records.PlannedDeliveryDate));
        $("#txtDescription").val(Records.OrderDescription);
        $("#dateForecastDeliveryDate").val(ConvertJsonToDate(Records.ForecastDeliveryDate));
        $("#dateOrderReadyDate").val(ConvertJsonToDate(Records.OrderReadyDate));
        $("#dateActualDeliveryDate").val(ConvertJsonToDate(Records.ActualDeliveryDate));
        $("#txtTotalOrderAmount").val(Records.TotalOrderAmount);
        $(".Users").val(Records.UserID).trigger("change");
        $("#hdfOrderID").val(Records.OrderID);



    });
    $(".submitDetails").text("Save");
    $("#editLabel").text("Edit Order");
}

function BindOrderItemsList(Order) {

    debugger;
    var jsonResult = {};

    jsonResult = GetOrderItemsByOrderID(Order);
    if (jsonResult != undefined) {
        FillOrderItemsTable(jsonResult);
    }
}

//---* Get the orderITEM datatable in form of JSON *--//

function GetOrderItemsByOrderID(Order) {
    var ds = {};
    var table = {};
    var data = "{'OrderObj':" + JSON.stringify(Order) + "}";
    ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetOrderItemDetailsByOrderID");
    table = JSON.parse(ds.d);
    return table;
}

//Fill OrderITEM table 
function FillOrderItemsTable(Records) {
    debugger;
    //var rowExistsOrNot = false;
    $('#OrderItemTable').show();

    $("tbody#OrderItemRows tr").remove();            //Remove all existing rows for refreshing

    $("#OrderItemTable > tbody").empty();          //Remove all existing rows for refreshing

    $.each(Records, function (index, Records) {

        debugger;

        //rowExistsOrNot = true;

       

        var html = '<tr ProductID="' + (Records.ProductID != null ? Records.ProductID : "-") + '"OrderID="' + (Records.OrderID != null ? Records.OrderID : "-") + '"><td >' + (Records.Product != null ? Records.Product : "-") + '</td><td >' + (Records.CustomerRemarks != null ? Records.CustomerRemarks : "-") + '</td><td><a class="btn  OrderItemDelete" href="#" ><i class="halflings-icon white trash"></i></a></td></tr>';


        $("#OrderItemTable").append(html);
    });


    var rowCount = $("#OrderItemTable > tbody > tr").length;


    if (rowCount == 0) {
        $('#OrderItemTable').hide();
    }
    //if (rowExistsOrNot == false) {
    //    $("#OrderItemTable th").remove();
    //}

}

//------------- *END :  Functions Work On Edit Click  *-----------------//

//Delete

function DeleteOrderItem(Order) {


    var data = "{'OrderObj':" + JSON.stringify(Order) + "}";

    var jsonResult = getJsonData(data, "../AdminPanel/OrderStatus.aspx/DeleteOrderItem");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

//END Delete

//Bind Product Dropdown

function BindProductDropdown() {


    var jsonResult = {};
    var Notify = new Object();
    jsonResult = GetAllProducts(Notify);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}

function BindUserDropdown() {


    var jsonResult = {};
    var Users = new Object();
    jsonResult = GetAllUsers(Users);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}

function GetAllUsers(Users) {
    var ds = {};
    var table = {};
    var data = "{'usrObj':" + JSON.stringify(Users) + "}";
    ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetAllUserIDandName");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllProducts(Notify) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Notify) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductIDandName");
    table = JSON.parse(ds.d);
    return table;
}

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