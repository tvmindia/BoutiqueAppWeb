
var InitialItemCount = 0;
var ProductPrice = 0;
var TotalPrice = 0;
var slNo = 0;
var unit = '';
var ExistingCustomer = true;


$("document").ready(function (e) {
    debugger;

    $("#rdoNo").click(function () {
        debugger;

        //--- Hide dropdown and show textbox---//
        $("#txtCustomerName").show();
        $("#Customer").css("display", "none");
        ExistingCustomer = false;
    });

    $("#rdoYes").click(function () {
        debugger;

        //--- Hide textbox and show dropdown---//
        $("#txtCustomerName").hide();
        $("#Customer").show();
        ExistingCustomer = true;
    });

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



    $("#ddlGridStatus").select2({
        placeholder: "Choose Status",
        allowClear: true,
        data: BindStatusDropdown()
    });

    $("#ddlStatus").select2({
        placeholder: "Choose Status",
        allowClear: true,
        data: BindStatusDropdown()
    });
    $("#ddlStatus").val("0").trigger("change"); //Set order pending as default status

    $("#ddlBranch").select2({
        placeholder: "Choose Branch",
        allowClear: true,
        data: BindBranchDropdown()
    });


    BindOrdersTable();

    //$('#OrdersTable').DataTable({
    //    "bPaginate": false,       //Search and Paging implementation
    //    "aaSorting": [[0, 'desc']] ,    //Sort with Date coloumn

    //});

    $('#OrdersTable').DataTable({
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
        "aaSorting": [[0, 'desc']],
        "fnPageChange": "next"
    });

    BindClosedOrdersTable();
    $('#ClosedOrdersTable').DataTable({
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
        "aaSorting": [[0, 'desc']],
        "fnPageChange": "next"
    });



    $('.Users').select2()
         .on("change", function (e) {
             debugger;
             var data = $(this).select2('data');
             if (data != null) {
                 if (data[0].text != "") {
                     var MobileNo = data[0].text.split(',')[1];
                     $("#txtMobileNo").val(MobileNo);
                     $('#lblMobileNo').text( MobileNo);

                     var CustmerName = data[0].text.split(',')[0];
                     $('#lblCustomer').text( CustmerName);
                 }
             }
            
         })



    $('#ddlBranch').select2()
         .on("change", function (e) {
             debugger;
             var data = $(this).select2('data');
             if (data != null) {
                 if (data[0].text != "") {

                     $('#lblBranch').text( data[0].text);
                 }
                 else {
                     $('#lblBranch').text("-");
                 }

             }

             var Min = $("#txtRequestedDeliveryTimeMin").val();

             if (Min == "") {
                 Min = "00";
             }

             var Time = $("#txtRequestedDeliveryTime").val() + "." + Min + $("#ddlMerdian").val()
             $('#lblReqDeliveryDate').text( $('#txtPlannedDeliveryDate').val() + "," + Time);

             $('#lblStatus').text($('#ddlStatus').select2('data')[0].text);

             var OrderDate = GetFormatedDate();
             $('#lblOrderDate').text(OrderDate);

             $('#lblNoOfProducts').text(($('#OrderItemTable tbody tr').length));
             $('#lblTotalAmount').text(TotalPrice);
         })


    $('#ddlStatus').select2()
         .on("change", function (e) {
             debugger;
             var data = $(this).select2('data');

             if (data != null) {
                 if (data[0].text != "")
                 {
                     $('#lblStatus').text( data[0].text);
                 }

                 else {
                     $('#lblStatus').text("-");
                 }
             }

         })




    $(".OrderEdit").live(
    {
        click: function (e) {

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            $('#ErrorBox').hide();

            //$("#dateForecastDeliveryDate").removeAttr("disabled");
            //$("#dateOrderReadyDate").removeAttr("disabled");
            //$("#dateActualDeliveryDate").removeAttr("disabled");  

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
                if ($("#txtQuantity").val() != "") {
                    if (isNaN($("#txtQuantity").val()) == false && (parseInt($("#txtQuantity").val()) > 0)) {


                        AddToList();

                        $(".products").select2("val", "");
                        $("#txtRemarks").val("");
                        var prdctImg = document.getElementById('ImgProduct');
                        prdctImg.src = "../img/No-Img_Chosen.png";


                    }
                    else {
                        CustomAlert("Please enter a valid quantity");
                    }

                }
                else {
                    CustomAlert("Please enter quantity");
                }

            }
            else {
                CustomAlert("Please select an item ");
            }
        }
    })
    //------------ Order Save Button CLick------------//
    $(".submitDetails").live(
    {
        click: function (e) {

            debugger;

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

            var result = "";
            var Order = new Object();

            //if ($("#hdfOrderID").val() == "")
            //   {
            var MailSending = new Object();
            var Notification = new Object();

            if ($(".Users").val() != "") {

                    Order.UserID = $(".Users").val();
                
                //else {
                //    $("#txtCustomerName").val();
                //}


                var Users = new Object();

                    Users.UserID = $(".Users").val();


                    var userDeatils = {};
                    userDeatils = GetUserDetailsByUserID(Order);

                    $.each(userDeatils, function (index, userDeatils) {

                        MailSending.EmailID = userDeatils.Email;
                        MailSending.UsrName = userDeatils.Name;
                        MailSending.Mobile = userDeatils.Mobile;

                    });
                
                    Notification.UserID = $(".Users").val();

            }


            Notification.Title = $("#txtOrderRemarks").val();
            if ($("#hdfOrderID").val() == "") {
                Notification.StartDate = new Date();
            }
            else {
                Notification.StartDate = $("#dateOrderDate").text();
            }

            Order.OrderDescription = $("#txtOrderRemarks").val();

            if ($("#hdfOrderID").val() == "") {
                Order.PlannedDeliveryDate = $("#txtPlannedDeliveryDate").val();
            }
            else {
                Order.OrderID = $("#hdfOrderID").val();
            }
            Order.DeliveryAddress = $("#txtDeliveryAddress").val();
            Order.MobileNo = $("#txtMobileNo").val();

            if ($("#ddlBranch").val() != "") {
                Order.BranchID = $("#ddlBranch").val();
            }
            if ($("#ddlStatus").val() != "") {
                Order.StatusCode = $("#ddlStatus").val();

                if (Order.StatusCode == "2") // Order Ready
                {
                    Order.OrderReadyDate = GetFormatedDate();
                }
                if (Order.StatusCode == "3") //Order Delivered
                {
                    Order.ActualDeliveryDate = GetFormatedDate();
                }

            }

            if ($("#txtRequestedDeliveryTime").val() != "") {
                Order.PlannedDeliveryTime = $("#txtRequestedDeliveryTime").val() + ":" + $("#txtRequestedDeliveryTimeMin").val() + ":" + $("#ddlMerdian").val();
            }
            //var TotalAmount = parseInt($("#lblTotalAmount").val());

            //if (isNaN(TotalAmount)) {
            //    Order.TotalOrderAmount = 0;

            //}
            //else {
            //    Order.TotalOrderAmount = TotalAmount;
            //}

            Order.TotalOrderAmount = TotalPrice;

            MailSending.TotalPrice = Order.TotalOrderAmount;

            if (ExistingCustomer == false) {
                Order.CustomerName = $("#txtCustomerName").val();
            }


            result = InsertOrUpdateOrder(Order);
            debugger;
            if (result.OrderID != "") {
                if ($("#hdfOrderID").val() == "") {

                    //---------------- * New Order Without Products *----------------------//

                    var rowCount = $("#OrderItemTable > tbody > tr").length;
                    if (rowCount == 0) {

                        var descrptn = OrderStatusNotification.OrderWithOutProducts;
                        var replacedDescrptn = descrptn.replace("$", result.OrderNo);

                        MailSending.OrderNo = result.OrderNo;
                        MailSending.msg = replacedDescrptn;
                      //  SendMail(MailSending);

                        Notification.OrderID = result.OrderID;
                        Notification.Description = replacedDescrptn;
                        resultOfNotification = InsertNotification(Notification);

                        ClearCurrentOrderControls();
                    }
                    $("#OrdersTable").dataTable().fnClearTable();
                    $("#OrdersTable").dataTable().fnDestroy();

                    BindOrdersTable(); //To bind table with new or modified entry

                    $('#OrdersTable').DataTable({
                        "bPaginate": true,
                        "iDisplayLength": 6,
                        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
                        "aaSorting": [[0, 'desc']],
                        "fnPageChange": "next"
                    });

                    if (rowCount > 0) //check if  change for product items (Header only)  
                    {
                        //----------- * HEADER ONLY-- START ---------- *//

                        var resultItem = "";
                        var NoOfNewProducts = 0;
                        var productNames = "";
                        var remarks = "";
                        $('#OrderItemTable tbody tr').each(function () {

                            var NewProduct = true; //--- checking product list if it is newly added or already existing product
                            var productId = $(this).attr("ProductID");
                            var productname = $(this).find('td').eq(0).text();
                            NoOfNewProducts = NoOfNewProducts + 1;
                            var remarks = $(this).find('td').eq(4).text();
                            Order.ProductID = productId;
                            Order.CustomerRemarks = remarks;
                            Order.Quantity = $("#txtQuantity").val();
                            Order.Unit = $("#txtunit").val();
                            Order.OrderID = result.OrderID;
                            Order.Quantity = $(this).find('td').eq(2).text();
                            if (unit != "") {
                                Order.Unit = unit;
                            }
                            productNames = productNames + "|" + productname + "$" + remarks;
                            resultItem = InsertOrderItem(Order);

                        })

                        MailSending.ProductNames = productNames;

                        if (resultItem != "") {

                            var descrptn = OrderStatusNotification.OrderWithProducts;
                            var replacedDescrptn = descrptn.replace("$", rowCount);
                            replacedDescrptn = replacedDescrptn.replace("#", result.OrderNo);

                            MailSending.OrderNo = result.OrderNo;
                            MailSending.msg = replacedDescrptn;
                          //  SendMail(MailSending);

                            Notification.Description = replacedDescrptn;
                            resultOfNotification = InsertNotification(Notification);

                            //Clearing datatables befoe binding with new 

                            $("#OrdersTable").dataTable().fnClearTable();
                            $("#OrdersTable").dataTable().fnDestroy();

                            BindOrdersTable(); //To bind table with new or modified entry

                            $('#OrdersTable').DataTable({
                                "bPaginate": true,
                                "iDisplayLength": 6,
                                "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
                                "aaSorting": [[0, 'desc']],
                                "fnPageChange": "next"
                            });

                            //$("#OrderItemTable").dataTable().fnClearTable();
                            //$("#OrderItemTable").dataTable().fnDestroy();

                            BindOrderItemsList(Order);

                            //$("#OrderItemTable").DataTable();
                            ClearCurrentOrderControls();

                            //$(".products").select2("val", "");
                            //$("#txtRemarks").val("");
                            //$("#ImgProduct").show();
                            //document.getElementById('ImgProduct').src = "../img/No-Img_Chosen.png";

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
                }

                else {
                    debugger;


                    var InitialProducts = {};
                    InitialProducts = GetOrderItemsByOrderID(Order);
                    Notification.OrderID = result.OrderID;

                    var rowCount = $("#OrderItemTable > tbody > tr").length;
                    var resultItem = "";
                    var NoOfNewProducts = 0;
                    var productNames = "";
                    var remarks = "";

                    if (rowCount > 0) //check if  change for product items (Header only)  
                    {
                        $('#OrderItemTable tbody tr').each(function () {

                            var NewProduct = true; //--- checking product list if it is newly added or already existing product
                            var productId = $(this).attr("ProductID");

                            if (InitialProducts != undefined) {

                                $.each(InitialProducts, function (index, InitialProducts) {

                                    if (InitialProducts.ProductID == productId) {

                                        //InitialProducts.CustomerRemarks = MailSending.CustomerRemarks;

                                        NewProduct = false;

                                        productNames = productNames + "|" + InitialProducts.Product + "$" + InitialProducts.CustomerRemarks;
                                        return false;
                                    }

                                })
                            }
                            if (NewProduct == true) {
                                var productname = $(this).find('td').eq(1).text();
                                NoOfNewProducts = NoOfNewProducts + 1;
                                var remarks = $(this).find('td').eq(4).text();
                                Order.ProductID = productId;
                                Order.CustomerRemarks = remarks;
                                Order.OrderID = result.OrderID;
                                Order.Quantity = $(this).find('td').eq(2).text();

                                if (unit != "") {
                                    Order.Unit = unit;
                                }

                                productNames = productNames + "|" + productname + "$" + remarks;
                                resultItem = InsertOrderItem(Order);

                            }

                        })
                        MailSending.ProductNames = productNames;

                        if (resultItem != "") {

                            var descrptn = OrderStatusNotification.OrderUpdateWithProducts;
                            var replacedDescrptn = descrptn.replace("$", NoOfNewProducts);
                            replacedDescrptn = replacedDescrptn.replace("#", result.OrderNo);
                            Notification.Description = replacedDescrptn;
                            resultOfNotification = InsertNotification(Notification);

                            BindOrderItemsList(Order);

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

                            $("#OrdersTable").dataTable().fnClearTable();
                            $("#OrdersTable").dataTable().fnDestroy();

                            BindOrdersTable(); //To bind table with new or modified entry

                            $('#OrdersTable').DataTable({
                                "bPaginate": true,
                                "iDisplayLength": 6,
                                "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
                                "aaSorting": [[0, 'desc']],
                                "fnPageChange": "next"
                            });

                            MailSending.OrderNo = result.OrderNo;
                            MailSending.msg = replacedDescrptn;
                          //  SendMail(MailSending);

                            ClearCurrentOrderControls();
                        }
                    }

                }

                ClearCurrentOrderControls();

                $("#OrdersTable").dataTable().fnClearTable();
                $("#OrdersTable").dataTable().fnDestroy();

                BindOrdersTable(); //To bind table with new or modified entry

                $('#OrdersTable').DataTable({
                    "bPaginate": true,
                    "iDisplayLength": 6,
                    "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
                    "aaSorting": [[0, 'desc']],
                    "fnPageChange": "next"
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

            ////------------------------------------------------------------------------------------------------------------

        }

    })
    //----------- Cancel button Click -----------//
    $(".Cancel").live({
        click: function (e) {// Clear controls

            ClearCurrentOrderControls();

            // ClearControls();
            $(".products").select2("val", "");
            document.getElementById('ImgProduct').src = "../img/No-Img_Chosen.png";
            $("#txtRemarks").val("");

            $("#OrderItemTable > tbody").empty();

            $("#OrdersTable").dataTable().fnClearTable();
            $("#OrdersTable").dataTable().fnDestroy();

            BindOrdersTable(); //To bind table with new or modified entry

            $('#OrdersTable').DataTable({
                "bPaginate": true,
                "iDisplayLength": 6,
                "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
                "aaSorting": [[0, 'desc']],
                "fnPageChange": "next"
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

            $("#ClosedOrdersTable").dataTable().fnClearTable();
            $("#ClosedOrdersTable").dataTable().fnDestroy();
            BindClosedOrdersTable(); //To bind table with new or modified entry

            $('#ClosedOrdersTable').DataTable({
                "bPaginate": true,
                "iDisplayLength": 6,
                "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
                "aaSorting": [[0, 'desc']],
                "fnPageChange": "next"
            });

            $("tbody#ClosedOrderItemRows tr").remove();            //Remove all existing rows for refreshing

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

               $('#txtQuantity').val('');
               $('#txtunit').val('');
               $('#txtRemarks').val('');

               //$('#ImgProduct').show();

               var productID = $('.products').val();

               var Order = new Object();
               var Product = new Object();
               Order.ProductID = productID;
               Product.ProductID = productID;

               if (productID != "") {
                   $("#txtRemarks").val("");

                   var imgID = GetProductImage(Order);

                   if (imgID != "") {
                       var prdctImg = document.getElementById('ImgProduct');
                       prdctImg.src = "../ImageHandler/ImageServiceHandler.ashx?ImageID=" + imgID;
                   }
                   else {
                       var prdctImg = document.getElementById('ImgProduct');
                       prdctImg.src = "../img/No-Img_Chosen.png";

                   }

                   //GetProductDetails

                   var ProductDeatils = {};
                   ProductDeatils = GetProductDetails(Product);

                   $.each(ProductDeatils, function (index, ProductDeatils) {

                       ProductPrice = ProductDeatils.Price;

                       $("#txtunit").val(ProductDeatils.Unit);
                       unit = ProductDeatils.Unit;
                       $("#txtunit").prop('readonly', true);

                   });

               }

           })

    //---------- Delete Button Click---------
    $(".OrderItemDelete").live(
    {
        click: function (e) {

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            // $('#ErrorBox').hide();

            //if (confirm("Do you want to delete this item ?") == true) {

            editedrow = $(this).closest('tr');

            var e = editedrow.attr("ProductID");
            var p = "Delete";
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

function FillAddressSummary() {
    $('#lblAddress').text( $('#txtDeliveryAddress').val());

}
function fillReqDeliveryDateSummary() {
    $('#lblReqDeliveryDate').text( $('#txtPlannedDeliveryDate').val());
}

function FillActualDeliveryDateSummary() {
    $('#lblAddress').text( $('#lblActualDeliveryDate').val());
}


function FillMobileNoSummary() {
    $('#lblMobileNo').text($('#txtMobileNo').val());
}

function FillCustomerNameSummary()
{
    if (ExistingCustomer == false) {
        $('#lblCustomer').text($('#txtCustomerName').val());
    }
   
  
}


function GetFormatedDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = dd + '-' + mm + '-' + yyyy;
    return today;
}

function CorrectTimeMinFormat() {
    var min = parseInt($('#txtRequestedDeliveryTimeMin').val());
    if (min < 10) {
        $('#txtRequestedDeliveryTimeMin').val("0" + min);
    }

}

function ClearCustomerDetails() {
    $("#hdfOrderID").val("");
    $(".submitDetails").text("Save");
    $("#editLabel").text("New Order");
    $("#dateOrderDate").hide();
    $("#txtPlannedDeliveryDate").show();
    if (ExistingCustomer) {
        $(".Users").select2("val", "");
    }

    else {
        $("#txtCustomerName").val("");
    }

    $("#txtMobileNo").val("");
    $("#txtPlannedDeliveryDate").val("");
    $("#txtRequestedDeliveryTime").val("");
    $("#txtRequestedDeliveryTimeMin").val("");
    $("#ddlMerdian").val("");
    $("#txtDeliveryAddress").val("");
    $("#txtOrderRemarks").val("");

    $("#ddlBranch").select2("val", "");
    $("#ddlStatus").val("0").trigger("change"); //Set order pending as default status

    var orderNo = $("#lblOrderNo");
    if (orderNo != null) {
        $('#lblOrderNo').text("");
        $('#OrderNoDiv').hide();
    }

}

function ClearOrderDescription() {
    $(".products").val("");
    $('#txtQuantity').val('');
    $('#txtunit').val('');
    $('#txtRemarks').val('');
    document.getElementById('ImgProduct').src = "../img/No-Img_Chosen.png";
    $("#OrderItemTable > tbody").empty();
}

function ClearOrderSummary() {
    $('#lblCustomer').text("");
    $('#lblAddress').text("");
    $('#lblMobileNo').text("");
    $('#lblNoOfProducts').text("");
    $('#lblTotalAmount').text("");
    $('#lblOrderDate').text("");
    $('#lblReqDeliveryDate').text("");
    //$('#lblActualDeliveryDate').text("");
    $('#lblBranch').text("");
    $('#lblStatus').text("");

}

function ClearCurrentOrderControls() {
    ExistingCustomer = true;
    ClearCustomerDetails();
    ClearOrderDescription();
    ClearOrderSummary();
}

function ClearControls() {
    $(".products").select2("val", "");
    document.getElementById('ImgProduct').src = "../img/No-Img_Chosen.png";
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
    if (ExistingCustomer) {
        $(".Users").select2("val", "");
    }

    else {
        $("#txtCustomerName").val("");
    }
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

function GetProductDetails(Product) {
    var ds = {};
    var table = {};
    var data = "{'prdctObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetProductDetailsByProductID");
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
        var html = '<tr OrderID="' + (Records.OrderID != null ? Records.OrderID : "-") + '" BoutiqueID="' + (Records.BoutiqueID != null ? Records.BoutiqueID : "-") + '"><td Style="width: 20%;">' + (Records.OrderNo != null ? Records.OrderNo : "-") + '</td><td Style="width: 30%;">' + (Records.OrderDescription != null ? Records.OrderDescription : "-") + '</td><td Style="width: 20%;">' + (Records.Name != null ? Records.Name : (Records.CustomerName != null ? Records.CustomerName : "-")) + '</td><td Style="width: 20%;">' + (Records.Mobile != null ? Records.Mobile : (Records.CustomerMobile != null ? Records.CustomerMobile : "-")) + '</td><td><a class="btn btn-info OrderEdit" href="#" title="Edit Order"><i class="halflings-icon white edit"></i></a></td></tr>';
        $("#OrdersTable").append(html);
    });
}

function FillClosedOrderTable(Records) {
    $("#ClosedOrdersTable").width("100%");
    $("tbody#ClosedOrderRows tr").remove();            //Remove all existing rows for refreshing  
    $.each(Records, function (index, Records) {
        var html = '<tr OrderID="' + (Records.OrderID != null ? Records.OrderID : "-") + '" BoutiqueID="' + (Records.BoutiqueID != null ? Records.BoutiqueID : "-") + '"><td Style="width: 20%;">' + (Records.OrderNo != null ? Records.OrderNo : "-") + '</td><td Style="width: 30%;">' + (Records.OrderDescription != null ? Records.OrderDescription : "-") + '</td><td Style="width: 20%;">' + (Records.Name != null ? Records.Name : "-") + '</td><td Style="width: 20%;">' + (Records.Mobile != null ? Records.Mobile : "-") + '</td><td ><a class="btn btn-info ClosedOrderEdit" href="#" title="View Order"><i class="halflings-icon white edit"></i></a></td></tr>';
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

        Order.OrderID = $("#hdfOrderID").val();
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


   // var Order = new Object();
   //Order.ProductID = e;
   // var ProductDeatils = {};
   // ProductDeatils = GetProductDetails(Product);

   // $.each(ProductDeatils, function (index, ProductDeatils) {

   //     TotalPrice = parseInt(TotalPrice - ProductDeatils.Price )
   //     $('#lblTotalAmount').text(TotalPrice);
   // });



    if (result != "1" && result != "-1") {

        $('#rowfluidDiv').show();
        $('.alert-error').show();
    }

}

function AddToList() {

    debugger;

    //$('#OrderItemTable').show();

    var productID = $('.products').val();
    var OrderID = $("#hdfOrderID").val();
    var CustomerRemarks = $("#txtRemarks").val();

    var data = $('.products').select2('data');
    var ProductName = data[0].text;
    slNo = slNo + 1;

    //if ($('#OrderItemTable tbody tr').length != 0) {

    //}

    var Quantity = $("#txtQuantity").val();
    //<td id="Prdct' + slNo + '"></td>

    var html = '<tr ProductID="' + (productID != null ? productID : "-") + '"OrderID="' + (OrderID != null ? OrderID : "-") + '"><td >' + slNo + '</td><td >' + (ProductName != null ? ProductName : "-") + '</td><td >' + (Quantity != null ? Quantity : "-") + '</td><td >' + (CustomerRemarks != null ? CustomerRemarks : "-") + '</td><td><a class="btn btn-danger OrderItemDelete" href="#" ><i class="halflings-icon white trash"></i></a></td></tr>';
    $("#OrderItemTable").append(html);

    $('#lblNoOfProducts').text(slNo);

    TotalPrice = parseInt(TotalPrice + (ProductPrice * Quantity));

    $('#lblNoOfProducts').text(slNo);
    $('#lblTotalAmount').text(TotalPrice);

    //var productID = $('.products').val();
    //var Order = new Object();
    //Order.ProductID = productID;

    //if (productID != "") {
    //    $("#txtRemarks").val("");
    //    var imgID = GetProductImage(Order);
    //    if (imgID != "") {
    //        var prdctImg = document.getElementById('Prdct'+slNo);
    //        prdctImg.src = "../ImageHandler/ImageServiceHandler.ashx?ImageID=" + imgID;
    //    }
    //    else {
    //        var prdctImg = document.getElementById('Prdct'+slNo);
    //        prdctImg.src = "../img/No-Img_Chosen.png";
    //    }
    //}


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
        $("#txtPlannedDeliveryDate").hide();
        //------END
        $("#lblOrderNo").text(Records.OrderNo);
        if (ExistingCustomer)
        {
            $(".Users").val(Records.UserID).trigger("change");
        }
        else {
            $("#txtCustomerName").val("");
        }
        $("#txtMobileNo").val(Records.Mobile);

        $("#txtDeliveryAddress").val(Records.DeliveryAddress);
        $("#txtOrderRemarks").val(Records.OrderDescription);
        $("#ddlBranch").val(Records.BranchID).trigger("change");
        $("#ddlStatus").val(Records.StatusCode).trigger("change");
        $("#txtDescription").val(Records.OrderDescription);
        $("#txtTotalOrderAmount").val(Records.TotalOrderAmount);

        $("#lblCustomer").text( Records.Name);
        $("#lblMobileNo").text( Records.Mobile);
        $("#lblAddress").text( Records.DeliveryAddress);
        $("#lblTotalAmount").text( Records.TotalOrderAmount);
        TotalPrice = parseInt(Records.TotalOrderAmount);
        $("#dateOrderDate").text( ConvertJsonToDate(Records.PlannedDeliveryDate));
        $("#lblOrderDate").text( ConvertJsonToDate(Records.OrderDate));
        $("#lblReqDeliveryDate").text( ConvertJsonToDate(Records.PlannedDeliveryDate));

        if (Records.PlannedDeliveryTime != null) {
            $("#txtRequestedDeliveryTime").val(Records.PlannedDeliveryTime.split(':')[0]);
            $("#txtRequestedDeliveryTimeMin").val(Records.PlannedDeliveryTime.split(':')[1]);
            $("#ddlMerdian").val(Records.PlannedDeliveryTime.split(':')[2])
        }


        var Min = $("#txtRequestedDeliveryTimeMin").val();

        if (Min == "") {
            Min = "00";
        }
        if ($("#txtRequestedDeliveryTime").val() != "")
        {
            var Time = $("#txtRequestedDeliveryTime").val() + "." + Min + $("#ddlMerdian").val();
            $('#lblReqDeliveryDate').text(ConvertJsonToDate(Records.PlannedDeliveryDate) + "," + Time);

        }
       
        //$("#lblActualDeliveryDate").text(ConvertJsonToDate(Records.ActualDeliveryDate));
        // $("#lblBranch").text(Records.Name);
        // $("#lblStatus").text(Records.Name);


        $("#hdfOrderID").val(Records.OrderID);


        //$("#datePlannedDeliveryDate").show();
        //$("#txtOrderDate").hide();
        //$("#txtPlannedDeliveryDate").hide();

        //$("#ForecastDiv").show();
        //$("#OrderReadyDiv").show();
        //$("#ActualDeliveryDiv").show();
        //$("#dateForecastDeliveryDate").val(ConvertJsonToDate(Records.ForecastDeliveryDate));
        //$("#dateOrderReadyDate").val(ConvertJsonToDate(Records.OrderReadyDate));
        //$("#dateActualDeliveryDate").val(ConvertJsonToDate(Records.ActualDeliveryDate));




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
    debugger;
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

        var Count = index + 1;
        //var html = '<tr ProductID="' + (Records.productID != null ? Records.productID : "-") + '"OrderID="' + (Records.OrderID != null ? Records.OrderID : "-") + '"><td >' + Count + '</td><td >' + (Records.Product != null ? Records.Product : "-") + '</td><td >' + (Records.Quantity != null ? Records.Quantity : "-") + '</td><td id="Prdct' + Count + '"></td><td >' + (Records.CustomerRemarks != null ? Records.CustomerRemarks : "-") + '</td><td><a class="btn btn-danger OrderItemDelete" href="#" ><i class="halflings-icon white trash"></i></a></td></tr>';
        //$("#OrderItemTable").append(html);
        //<td id="Prdct' + Count + '"></td>

        var html = '<tr ProductID="' + (Records.ProductID != null ? Records.ProductID : "-") + '"OrderID="' + (Records.OrderID != null ? Records.OrderID : "-") + '"><td>' + Count + '</td><td >' + (Records.Product != null ? Records.Product : "-") + '</td><td>' + (Records.Quantity != null ? Records.Quantity : "-") + '</td><td >' + (Records.CustomerRemarks != null ? Records.CustomerRemarks : "-") + '</td><td><a class="btn btn-danger OrderItemDelete" href="#" ><i class="halflings-icon white trash"></i></a></td></tr>';

        $("#OrderItemTable").append(html);
    });


    var rowCount = $("#OrderItemTable > tbody > tr").length;
    $('#lblNoOfProducts').text( rowCount);
    slNo = rowCount;


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

function BindStatusDropdown() {

    var jsonResult = {};
    var Orders = new Object();
    jsonResult = GetAllStatus(Orders);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}

function BindBranchDropdown() {

    var jsonResult = {};
    var Orders = new Object();
    jsonResult = GetAllBranches(Orders);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}

function GetAllBranches(Orders) {
    var ds = {};
    var table = {};
    var data = "{'OrderObj':" + JSON.stringify(Orders) + "}";
    ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetBranchIdAndName");
    table = JSON.parse(ds.d);
    return table;
}


function GetAllStatus(Users) {
    var ds = {};
    var table = {};
    var data = "{'OrderObj':" + JSON.stringify(Orders) + "}";
    ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetAllStatusCodeandStatus");
    table = JSON.parse(ds.d);
    return table;
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

    $('#Displaydiv').remove();
    var container;

    if ($("#hdfOrderID").val() == "") {

        //var StDate = $('#txtOrderDate');
        var EndDate = $('#txtPlannedDeliveryDate');

        container = [

            //{ id: StDate[0].id, name: StDate[0].name, Value: StDate[0].value },
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