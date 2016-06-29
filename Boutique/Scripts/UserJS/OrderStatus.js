
var InitialItemCount = 0;


$("document").ready(function (e) {
   
    var rowCount = $("#OrderItemTable > tbody > tr").length;
 
    parent.document.title = Pages.OrderStatus;

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
        "bPaginate": false,       //Search and Paging implementation
        "aaSorting": [[0, 'desc']]     //Sort with Date coloumn
    });

    BindClosedOrdersTable();
    $('#ClosedOrdersTable').DataTable({
        "bPaginate": false,       //Search and Paging implementation
        "aaSorting": [[0, 'desc']]     //Sort with Date coloumn
    });   
   
    $(".OrderEdit").live(
    {
        click: function (e) {

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

            $("#dateForecastDeliveryDate").removeAttr("disabled");
            $("#dateOrderReadyDate").removeAttr("disabled");
            $("#dateActualDeliveryDate").removeAttr("disabled");  

            var jsonResult = {};
            editedrow = $(this).closest('tr');
            var Order = new Object();

            Order.OrderID = editedrow.attr("OrderID");


            jsonResult = GetOrderDetailsByOrderID(Order);
            if (jsonResult != undefined) {
                BindControlsWithOrderDetails(jsonResult);

                $(".products").select2("val", "");
                document.getElementById('ImgProduct').src = "../img/No-Img_Chosen.png";
                $("#txtRemarks").val("");
                
                BindOrderItemsList(Order);

                InitialItemCount = $("#OrderItemTable > tbody > tr").length;

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

    $(".ClosedOrderEdit").live(
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
               BindControlsWithClosedOrderDetails(jsonResult);

               BindClosedOrderItemsList(Order);

           }
           //Scroll page
           var offset = $('#ClosededitLabel').offset();
           offset.left -= 20;
           offset.top -= 20;
           $('html, body').animate({
               scrollTop: offset.top,
               scrollLeft: offset.left
           });
           return false;
       }
   })      


    //------------ Add To List Button CLick------------//
    $("#addBtn").live(
    {
        click: function (e) {

            if ($(".products").val() != "") //check if  product is selected
            {
                AddToList();

                $(".products").select2("val", "");
                $("#txtRemarks").val("");
                var prdctImg = document.getElementById('ImgProduct');
                prdctImg.src = "../img/No-Img_Chosen.png";
            }
            else {
                alert("Please select an item ");
            }
        }
    })
    //------------ Order Save Button CLick------------//
    $(".submitDetails").live(
    {
        click: function (e) {
         
            debugger;


            var Insert = false;

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

            var result = "";
            var Order = new Object();

            if ($(".Users").val() != "") //check if  change for product items (Header only)
            {
                debugger;
                Order.UserID = $(".Users").val();
                var Users = new Object(); 

                Users.UserID = $(".Users").val();
                var userDeatils = {};
                userDeatils = GetUserDetailsByUserID(Order);

                var MailSending = new Object();

                $.each(userDeatils, function (index, userDeatils) {

                    debugger;

                    MailSending.EmailID = userDeatils.Email;
                    MailSending.UsrName = userDeatils.Name;
                    MailSending.Mobile = userDeatils.Mobile;
                    
                });
            }
            else {
               alert("Please select a user");
                return;
            }

            //------* Create New Order Case *---------//

            if ($("#hdfOrderID").val() == "") {

                Insert = true;

                if ($("#txtOrderDate").val().trim() != "") {
                    Order.OrderDate = $("#txtOrderDate").val();

                  
                }
                else {
                    //alert("Please select order date.");
                    return;
                }

                if ($("#txtPlannedDeliveryDate").val().trim() != "") {
                    Order.PlannedDeliveryDate = $("#txtPlannedDeliveryDate").val();
                    //Order.ForecastDeliveryDate = $("#txtPlannedDeliveryDate").val()

                }
                else {
                    //alert("Please select planned delivery date.");
                    return;
                }

            }

                //------* END  *---------//

            else  //Update
            {
                Order.OrderID = $("#hdfOrderID").val();
                Order.OrderDate = $("#dateOrderDate").text();
                //var jsonResult = {};
                //jsonResult = GetOrderDetailsByOrderID(Order);
                //if (jsonResult != undefined)
                //{
                //    if (jsonResult.) {

                //    }
                //}


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

            var Notification = new Object();

            Notification.Title = Order.OrderDescription;
            Notification.StartDate = Order.OrderDate;

            Notification.UserID = Order.UserID;

            if ($("#hdfOrderID").val() != "") {
                Notification.StartDate = $("#dateOrderDate").text();

                Notification.OrderID = Order.OrderID;


            }

            //if (Order.OrderReadyDate != "" && $("#hdfOrderID").val() != "") {
               
               
            //}
            debugger;

            MailSending.TotalPrice = Order.TotalOrderAmount;
            MailSending.OrderDate = Order.OrderDate;


            result = InsertOrUpdateOrder(Order); //returns orderID

            if (Insert == false) {

                var InitialProducts = {};
                InitialProducts = GetOrderItemsByOrderID(Order);


            }


            ///-- Insert or update action is success if result equals to some id, then by checking no of items , if it is 0 header only inserts otherwise items insertions also performs

            if (result.OrderID != "") {


                if (Insert == false )
                {
                    if (Order.OrderReadyDate) {
                        var descrptn = OrderStatusNotification.OrderReady;
                        var replacedDescrptn = descrptn.replace("$", result.OrderNo);

                        Notification.Description = replacedDescrptn;
                        MailSending.OrderNo = result.OrderNo;
                        MailSending.msg = replacedDescrptn;
                        SendMail(MailSending);

                        resultOfNotification = InsertNotification(Notification);
                    }
                }

                Notification.OrderID = result.OrderID;

                ClearControls();

                var rowCount = $("#OrderItemTable > tbody > tr").length;

                if (rowCount > 0) //check if  change for product items (Header only)  
                {
                    debugger;
                    //----------- * HEADER ONLY-- START ---------- *//

                    var resultItem = "";

                    var NoOfNewProducts = 0;

                    var productNames = "";
                    var remarks = "";
                    $('#OrderItemTable tbody tr').each(function () {
                        debugger;
                        var NewProduct = true; //--- checking product list if it is newly added or already existing product
                        var productId = $(this).attr("ProductID");

                        if (InitialProducts != undefined) {

                            debugger;

                            $.each(InitialProducts, function (index, InitialProducts) {
                                debugger;

                                if (InitialProducts.ProductID == productId) {


                                    debugger;

                                    //InitialProducts.CustomerRemarks = MailSending.CustomerRemarks;

                                    NewProduct = false;

                                    productNames = productNames + "|" + InitialProducts.Product + "$" + InitialProducts.CustomerRemarks;
                                    return false;
                                }
                               
                                  
                               
                            })
                        }
                        if (NewProduct == true || Insert == true) {
                            var productname = $(this).find('td').eq(0).text();
                            debugger;
                            NoOfNewProducts = NoOfNewProducts + 1;

                            var remarks = $(this).find('td').eq(1).text();

                            Order.ProductID = productId;
                            Order.CustomerRemarks = remarks;

                            Order.OrderID = result.OrderID;

                         
                            productNames = productNames + "|" + productname + "$" + remarks;

                            resultItem = InsertOrderItem(Order);
                        }



                    })


                    MailSending.ProductNames = productNames;
                  
                    if (resultItem != "") {
                        if (Insert == true) {
                            var descrptn = OrderStatusNotification.OrderWithProducts;
                            var replacedDescrptn = descrptn.replace("$", rowCount);
                            replacedDescrptn = replacedDescrptn.replace("#", result.OrderNo);

                            MailSending.OrderNo = result.OrderNo;
                            MailSending.msg = replacedDescrptn;
                            SendMail(MailSending);

                            Notification.Description = replacedDescrptn;
                            resultOfNotification = InsertNotification(Notification);

                        }

                        else {

                            var descrptn = OrderStatusNotification.OrderUpdateWithProducts;
                            var replacedDescrptn = descrptn.replace("$", NoOfNewProducts);
                            replacedDescrptn = replacedDescrptn.replace("#", result.OrderNo);

                            MailSending.OrderNo = result.OrderNo;
                            MailSending.msg = replacedDescrptn;
                            SendMail(MailSending);

                            Notification.Description = replacedDescrptn;
                            resultOfNotification = InsertNotification(Notification);
                        }

                        //Clearing datatables befoe binding with new 

                        $("#OrdersTable").dataTable().fnClearTable();
                        $("#OrdersTable").dataTable().fnDestroy();

                        BindOrdersTable(); //To bind table with new or modified entry

                        $('#OrdersTable').DataTable({
                            "bPaginate": false,       //Search and Paging implementation
                            "aaSorting": [[0, 'desc']]     //Sort with Date coloumn

                        });

                        //$("#OrderItemTable").dataTable().fnClearTable();
                        //$("#OrderItemTable").dataTable().fnDestroy();

                      
                        BindOrderItemsList(Order);

                        //$("#OrderItemTable").DataTable();


                        $(".products").select2("val", "");
                        $("#txtRemarks").val("");

                        $("#ImgProduct").show();

                        document.getElementById('ImgProduct').src = "../img/No-Img_Chosen.png";

                        //$('#ImgProduct').hide();
                        $("#OrdersTable > tbody").empty();
                        //$('#OrderItemTable').hide();


                        $('#rowfluidDiv').show();
                        $('.alert-success').show();
                        $('.alert-success strong').text(Messages.InsertionSuccessFull);


                        //Scroll page
                        var offset = $('#rowfluidDiv').offset();
                        offset.left -= 20;
                        offset.top -= 20;
                        $('html, body').animate({
                            scrollTop: offset.top,
                            scrollLeft: offset.left
                        });
                    }

                    else { //No items added only header updation
                        $('#rowfluidDiv').show();
                        $('.alert-success').show();
                        $('.alert-success strong').text(Messages.InsertionSuccessFull);


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
                        $('.alert-error strong').text(Messages.InsertionFailure);
                    }
                }
                    //HEADER ONLY END



                else {

                    if (Insert == true) {
                        var descrptn = OrderStatusNotification.OrderWithOutProducts;
                        var replacedDescrptn = descrptn.replace("$", result.OrderNo);

                        MailSending.OrderNo = result.OrderNo;
                        MailSending.msg = replacedDescrptn;
                        SendMail(MailSending);

                        Notification.Description = replacedDescrptn;
                        resultOfNotification = InsertNotification(Notification);
                    }


                    $("#OrdersTable").dataTable().fnClearTable();
                    $("#OrdersTable").dataTable().fnDestroy();

                    BindOrdersTable(); //To bind table with new or modified entry

                    $('#OrdersTable').DataTable({
                        "bPaginate": false,       //Search and Paging implementation
                        "aaSorting": [[0, 'desc']]     //Sort with Date coloumn

                    });


                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                    $('.alert-success strong').text(Messages.InsertionSuccessFull);


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
                $('.alert-error strong').text(Messages.InsertionFailure);
            }

            $("#OrderItemTable > tbody").empty();

            $("#OrdersTable").dataTable().fnClearTable();
            $("#OrdersTable").dataTable().fnDestroy();

            BindOrdersTable(); //To bind table with new or modified entry

            $('#OrdersTable').DataTable({
                "bPaginate": false,       //Search and Paging implementation
                "aaSorting": [[0, 'desc']]     //Sort with Date coloumn

            });

            $("#ClosedOrdersTable").dataTable().fnClearTable();
            $("#ClosedOrdersTable").dataTable().fnDestroy();

            BindClosedOrdersTable();//To bind table with new or modified entry

            $('#ClosedOrdersTable').DataTable({
                "bPaginate": false,       //Search and Paging implementation
                "aaSorting": [[0, 'desc']]     //Sort with Date coloumn
               
            });

        }
    })
     //----------- Cancel button Click -----------//
    $(".Cancel").live({
        click: function (e) {// Clear controls
           
            ClearControls();
            $(".products").select2("val", "");
            document.getElementById('ImgProduct').src = "../img/No-Img_Chosen.png";
            $("#txtRemarks").val("");
           
            $("#OrderItemTable > tbody").empty();

            $("#OrdersTable").dataTable().fnClearTable();
            $("#OrdersTable").dataTable().fnDestroy();

            BindOrdersTable(); //To bind table with new or modified entry

            $('#OrdersTable').DataTable({
                "bPaginate": false,       //Search and Paging implementation
                "aaSorting": [[0, 'desc']]     //Sort with Date coloumn

            });

            RemoveStyle();

            // Scroll page
            var offset = $('#Orders').offset();
            offset.left -= 20;
            offset.top -= 20;
            $('html, body').animate({
                scrollTop: offset.top,
                scrollLeft: offset.left
            });
            
        }
    })
    $(".ClosedOrderCancel").live({
        click: function (e) {// Clear controls
           
            ClearControlsOfClosedOrder();
           
            BindClosedOrdersTable(); //To bind table with new or modified entry

            
            // Scroll page
            var offset = $('#Orders').offset();
            offset.left -= 20;
            offset.top -= 20;
            $('html, body').animate({
                scrollTop: offset.top,
                scrollLeft: offset.left
            });

        }
    })

  

    //----- Dropdown item cahnge event  : (get Image by product id) ----//      
    $('.products').select2()
           .on("change", function (e) {
             
               //$('#ImgProduct').show();

            
               var productID = $('.products').val();

               var Order = new Object();

               Order.ProductID = productID;

               if (productID != "") {
                   $("#txtRemarks").val("");

                   var imgID = GetProductImage(Order);

                   if (imgID != "")
                   {
                       var prdctImg = document.getElementById('ImgProduct');
                       prdctImg.src = "../ImageHandler/ImageServiceHandler.ashx?ImageID=" + imgID;
                   }
                   else
                   {
                       var prdctImg = document.getElementById('ImgProduct');
                       prdctImg.src = "../img/No-Img_Chosen.png";

                   }
                   
               }

           }) 

    //---------- Delete Button Click---------
    $(".OrderItemDelete").live(
    {
        click: function (e) {

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            //if (confirm("Do you want to delete this item ?") == true) {

            editedrow = $(this).closest('tr');

            var e = editedrow.attr("ProductID");
            var p = editedrow.attr("OrderID");
            DeleteCustomAlert("Are You Sure?", e, p)
            return false;
        }
    })
    //----------END: Delete Button Click---------

    $('input[type=text],input[type=password]').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    });


});


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

    $("#OrdersTable > tbody").empty();

    $(".Users").select2("val", "");


}

function ClearControlsOfClosedOrder() {

    $("#ClosedlblOrderNo").text("");
    $("#ClosedlblUser").text("");
    $("#ClosedlblOrderDescription").text("");
    $("#CloseddateOrderDate").text("");
    $("#CloseddatePlannedDeliveryDate").text("");
    $("#ClosedtotalAmount").text("");
    $("#CloseddateForecastDeliveryDate").text("");
    $("#CloseddateOrderReadyDate").text("");
    $("#CloseddateActualDeliveryDate").text("");
    $("#ClosedhdfOrderID").text("");

}

function GetProductImage(Order) {
    var ds = {};
    var table = {};
    var data = "{'OrderObj':" + JSON.stringify(Order) + "}";
    ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetProductImageByProductID");
    table = JSON.parse(ds.d);
    return table;

}


function SendMail(MailSending) {
    if (MailSending.EmailID != "") {
        var data = "{'mailObj':" + JSON.stringify(MailSending) + "}";

        var jsonResult = getJsonData(data, "../AdminPanel/OrderStatus.aspx/SendMail");
        //var table = {};
        //table = JSON.parse(jsonResult.d);
        //return table;
    }
}


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

function BindClosedOrdersTable() {
    var jsonResult = {};
    var Order = new Object();
    jsonResult = GetAllClosedOrders(Order);
    if (jsonResult != undefined) {
        FillClosedOrderTable(jsonResult);
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

function GetAllClosedOrders(Order) {
    var ds = {};
    var table = {};
    var data = "{'OrderObj':" + JSON.stringify(Order) + "}";
    ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetAllClosedOrders");
    table = JSON.parse(ds.d);
    return table;
}

//---* Creation of html table from received JSON *--//

function FillOrderTable(Records) {

    $("#OrdersTable").width("100%");
    $("tbody#OrderRows tr").remove();            //Remove all existing rows for refreshing
    $("#OrdersTable > tbody").empty();          //Remove all existing rows for refreshing
    $.each(Records, function (index, Records) {
        var html = '<tr OrderID="' + (Records.OrderID != null ? Records.OrderID : "-") + '" BoutiqueID="' + (Records.BoutiqueID != null ? Records.BoutiqueID : "-") + '"><td Style="width: 20%;">' + (Records.OrderNo != null ? Records.OrderNo : "-") + '</td><td Style="width: 30%;">' + (Records.OrderDescription != null ? Records.OrderDescription : "-") + '</td><td Style="width: 20%;">' + (Records.Name != null ? Records.Name : "-") + '</td><td Style="width: 20%;">' + (Records.Mobile != null ? Records.Mobile : "-") + '</td><td><a class="btn btn-info OrderEdit" href="#"><i class="halflings-icon white edit"></i></a></td></tr>';
        $("#OrdersTable").append(html);
    });
}

function FillClosedOrderTable(Records) {
    $("#ClosedOrdersTable").width("100%");
    $("tbody#ClosedOrderRows tr").remove();            //Remove all existing rows for refreshing  
    $.each(Records, function (index, Records) {
        var html = '<tr OrderID="' + (Records.OrderID != null ? Records.OrderID : "-") + '" BoutiqueID="' + (Records.BoutiqueID != null ? Records.BoutiqueID : "-") + '"><td Style="width: 20%;">' + (Records.OrderNo != null ? Records.OrderNo : "-") + '</td><td Style="width: 30%;">' + (Records.OrderDescription != null ? Records.OrderDescription : "-") + '</td><td Style="width: 20%;">' + (Records.Name != null ? Records.Name : "-") + '</td><td Style="width: 20%;">' + (Records.Mobile != null ? Records.Mobile : "-") + '</td><td><a class="btn btn-info ClosedOrderEdit" href="#"><i class="halflings-icon white edit"></i></a></td></tr>';
        $("#ClosedOrdersTable").append(html);
    });
}

//------------END :   BINDING  Order details table------------//

//------------ Edit Button CLick------------//

function DeleteItem(e, p) {
    var jsonResult = {};
    var Order = new Object();
    Order.ProductID = e;
    Order.OrderID = p;
    var result = -1;

    if (Order.OrderID != "") {

    
    result = DeleteOrderItem(Order);
    if (result == "1") {

        BindOrderItemsList(Order);
    }
    }
    if (result == -1) {

        editedrow.remove();

        var rowCount = $("#OrderItemTable > tbody > tr").length;


        //if (rowCount == 0) {
        //    $('#OrderItemTable').hide();
        //}

    }


    if (result != "1" && result != "-1") {

        $('#rowfluidDiv').show();
        $('.alert-error').show();
    }

}

function AddToList() {
  
    //$('#OrderItemTable').show();

    var productID = $('.products').val();
    var OrderID = $("#hdfOrderID").val();
    var CustomerRemarks = $("#txtRemarks").val();

    var data = $('.products').select2('data');
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


function BindControlsWithClosedOrderDetails(Records) {
    $.each(Records, function (index, Records) {

        $("#ClosedlblOrderNo").text(Records.OrderNo);
        $("#CloseddateOrderDate").text(ConvertJsonToDate(Records.OrderDate));
        $("#CloseddatePlannedDeliveryDate").text(ConvertJsonToDate(Records.PlannedDeliveryDate));
        $("#ClosedlblOrderDescription").text(Records.OrderDescription);
        $("#CloseddateForecastDeliveryDate").text(ConvertJsonToDate(Records.ForecastDeliveryDate));
        $("#CloseddateOrderReadyDate").text(ConvertJsonToDate(Records.OrderReadyDate));
        $("#CloseddateActualDeliveryDate").text(ConvertJsonToDate(Records.ActualDeliveryDate));
        $("#ClosedtotalAmount").text(Records.TotalOrderAmount);
        //$(".Users").val(Records.UserID).trigger("change");
        $("#ClosedlblUser").text(Records.Name);

        $("#ClosedhdfOrderID").val(Records.OrderID);



    });
    $(".submitDetails").text("Save");
    $("#editLabel").text("Edit Order");
}

function BindOrderItemsList(Order) {

    var jsonResult = {};

    jsonResult = GetOrderItemsByOrderID(Order);
    if (jsonResult != undefined) {
        FillOrderItemsTable(jsonResult);
    }
}

function BindClosedOrderItemsList(Order) {

    var jsonResult = {};

    jsonResult = GetOrderItemsByOrderID(Order);
    if (jsonResult != undefined) {
        FillClosedOrderItemsTable(jsonResult);
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

    //var rowExistsOrNot = false;
    //$('#OrderItemTable').show();

    $("tbody#OrderItemRows tr").remove();            //Remove all existing rows for refreshing

    $("#OrderItemTable > tbody").empty();          //Remove all existing rows for refreshing

    $.each(Records, function (index, Records) {

        //rowExistsOrNot = true;

        var html = '<tr ProductID="' + (Records.ProductID != null ? Records.ProductID : "-") + '"OrderID="' + (Records.OrderID != null ? Records.OrderID : "-") + '"><td >' + (Records.Product != null ? Records.Product : "-") + '</td><td >' + (Records.CustomerRemarks != null ? Records.CustomerRemarks : "-") + '</td><td><a class="btn btn-danger OrderItemDelete" href="#" ><i class="halflings-icon white trash"></i></a></td></tr>';

        $("#OrderItemTable").append(html);
    });


    var rowCount = $("#OrderItemTable > tbody > tr").length;


    //if (rowCount == 0) {
    //    $('#OrderItemTable').hide();
    //}
    //if (rowExistsOrNot == false) {
    //    $("#OrderItemTable th").remove();
    //}

}

function FillClosedOrderItemsTable(Records) {

    //var rowExistsOrNot = false;
    //$('#OrderItemTable').show();

    $("tbody#ClosedOrderItemRows tr").remove();            //Remove all existing rows for refreshing

    $("#ClosedOrderItemTable > tbody").empty();          //Remove all existing rows for refreshing

    $.each(Records, function (index, Records) {

        //rowExistsOrNot = true;

        var html = '<tr ProductID="' + (Records.ProductID != null ? Records.ProductID : "-") + '"OrderID="' + (Records.OrderID != null ? Records.OrderID : "-") + '"><td >' + (Records.Product != null ? Records.Product : "-") + '</td><td >' + (Records.CustomerRemarks != null ? Records.CustomerRemarks : "-") + '</td></tr>';

        $("#ClosedOrderItemTable").append(html);
    });


    var rowCount = $("#ClosedOrderItemTable > tbody > tr").length;


    //if (rowCount == 0) {
    //    $('#OrderItemTable').hide();
    //}
    //if (rowExistsOrNot == false) {
    //    $("#OrderItemTable th").remove();
    //}

}

//------------- *END :  Functions Work On Edit Click  *-----------------//


function GetUserDetailsByUserID(Order) {
    var ds = {};
    var table = {};
    var data = "{'UsrObj':" + JSON.stringify(Order) + "}";
    ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetUserDetailsByUserID");
    table = JSON.parse(ds.d);
    return table;
}

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

//------------Insert--------------------
function InsertNotification(Notification) {
    var data = "{'notificationObj':" + JSON.stringify(Notification) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/OrderStatus.aspx/InsertNotification");
    var table = {};
    table = JSON.parse(jsonResult.d);
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

function OrderStatusValidation() {


    debugger;

    $('#Displaydiv').remove();
    var container;

    if ($("#hdfOrderID").val() == "") {

        var StDate = $('#txtOrderDate');
        var EndDate = $('#txtPlannedDeliveryDate');

        container = [

            { id: StDate[0].id, name: StDate[0].name, Value: StDate[0].value },
            { id: EndDate[0].id, name: EndDate[0].name, Value: EndDate[0].value },
        ];
    }
    var j = 0;
    var Errorbox = document.getElementById('ErrorBox');
    var divs = document.createElement('div');
    divs.setAttribute("id", "Displaydiv");
    Errorbox.appendChild(divs);
    for (var i = 0; i < container.length; i++) {

        if (container[i].Value == "") {
            j = 1;


            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
            txtB.style.backgroundPosition = "95% center";
            txtB.style.backgroundRepeat = "no-repeat";
            //txtB.style.backgroundColor = "#FFFEE1";
            Errorbox.style.paddingLeft = "30px";

        }



    }
    if (j == '1') {
        var p = document.createElement('p');
        p.innerHTML = "* Some Fields Are Empty ! ";
        p.style.color = "Red";
        p.style.fontSize = "14px";

        divs.appendChild(p);

        return false;
    }
    if (j == '0') {
        $('#ErrorBox').hide();
        AddNotification();
        return true;
    }
}

function RemoveStyle() {
    $('input[type=text],input[type=password],textarea').css({ background: 'white' });
    $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3').hide(1000);
}


//------------- *END : General Functions  *-----------------//