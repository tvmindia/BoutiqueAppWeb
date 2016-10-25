<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="OrderStatus.aspx.cs" Inherits="Boutique.AdminPanel.OrderStatus" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/custom.js"></script>
    <script src="../Scripts/jquery.dataTables.min.js"></script>
    <script src="../Scripts/select2.min.js"></script>
    <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Scripts/UserJS/OrderStatus.js"></script>
    <link href="../CSS/CustomCSS/OrderStatus.css" rel="stylesheet" />
    <link href="../CSS/Common.css" rel="stylesheet" />
    <link href="../CSS/select2.min.css" rel="stylesheet" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="content" class="span10">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home"></i>
                <a href="DashBoard.aspx">Home</a>
                <i class="icon-angle-right"></i>
            </li>
            <li><a href="#">Manage Orders</a></li>
        </ul>

        <div class="row-fluid"><span class="headerStyle">Manage Orders</span></div>
        <div class="row-fluid" style="height: 3px;"></div>

        <%--Alert boxes --%>
        <div class="row-fluid" id="rowfluidDiv" style="display: none;">
            <div class="box span12">

                <div class="box-content alerts">
                    <div class="alert alert-error" style="display: none;">

                        <strong>Operation Not Successfull.</strong>
                    </div>
                    <div class="alert alert-success" style="display: none;">

                        <strong>Successfull.</strong>
                    </div>
                </div>

            </div>
        </div>

        <%--//END   Alert boxes --%>

        <div class="row-fluid sortable" id="Orders">
            <div class="box span12" style="width: 100%">
                <div class="box-header">
                </div>
                <div class="box-content">
                    <ul class="nav tab-menu nav-tabs" id="myTab">
                        <li class="icon active"><a href="#CurrentOrders"><i class="icon-copy"></i>Current Orders</a></li>
                        <li><a href="#ClosedOrders"><i class="icon-paste"></i>Closed Orders</a></li>

                    </ul>
                    <div id="myTabContent" class="tab-content" style="overflow-x: hidden">

                        <div class="tab-pane active" id="CurrentOrders">
                            <div class="box span12">
                                <div class="box-header" style="font-size: 16px!important; height: 30px">


                                    <div class="span12">

                                        <div class="span9">

                                            <h2 id="neworder">Current Orders</h2>

                                        </div>
                                        <div class="span3">

                                            <a id="btnNew" class="btn btn-primary New" href="#" style="width: 40%">Create New Order</></a>

                                            <select class="Status" id="ddlGridStatus" style="max-width: 60%!important; width: 40%!important">
                                                <option></option>
                                            </select>



                                        </div>
                                    </div>

                                    <div class="box-icon">
                                    </div>
                                </div>



                                <div class="box-content" style="min-height: 500px;">

                                    <table class="table table-striped table-bordered  bootstrap-datatable" id="OrdersTable">
                                        <thead>
                                            <tr>
                                                <th>OrderNo</th>
                                                <th>OrderDescription</th>
                                                <th>Name</th>
                                                <th>Contact Number</th>
                                                <th>Order Status</th>
                                                <th>Actions</th>

                                            </tr>
                                        </thead>
                                        <tbody id="OrderRows">
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div id="NewOrder" runat="server" class="row-fluid">
                                <%--<div class="box span12" style="width: 100%">--%>

                                <div class="box-header">
                                    <h2 id="editLabel">Create Order</h2>



                                    <div class="box-icon">
                                    </div>
                                </div>

                                <div class="alert alert-block" id="ErrorBox" style="display: none; background-color: #fdeaea !important; color: #ca6f74 !important; border: 1px solid #f27b81 !important;">
                                    <div id="Displaydiv">
                                    </div>
                                </div>

                                <div class="box-content " style="height: 100%; width: 100%; overflow-x: hidden;">

                                    <%--<div class="span12">--%>

                                    <%--------------------- * CUSTOMER DETAILS *-------------------------%>

                                    <div class="form-horizontal">

                                        <%--FIRST HALF--%>

                                        <div class="span6">

                                            <%--OrderNo--%>
                                            <div class="control-group" id="OrderNoDiv" style="display: none;">

                                                <label class="control-label" for="focusedInput">OrderNo</label>
                                                <div class="controls">
                                                    <label class="control-label" id="lblOrderNo" style="display: none; max-width: 100%" />

                                                </div>
                                            </div>



                                            <div class="control-group">
                                                <label class="control-label" >Existig Customer?</label>
                                                <div class="controls">
                                                    <div id="isActiverdbtn">
                                                        <label class="radio">
                                                            <input type="radio" name="ExistingCustomer" id="rdoYes" value="true" checked="" />
                                                            Yes
                                                        </label>

                                                        <label class="radio">
                                                            <input type="radio" name="ExistingCustomer" id="rdoNo" value="false" />
                                                            No
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>




                                            <%--Customer--%>
                                            <div class="control-group">
                                                <label class="control-label" for="Users">Customer</label>
                                                <div class="controls">
                                                    <div id="Customer">
                                                    <select class="Users" id="ddlCustomer" style="max-width: 50%!important; width: 40%!important;">
                                                        <option></option>
                                                    </select>
                                                        </div>


                                                     <input type="text" id="txtCustomerName" onblur="FillCustomerNameSummary()" value="" style="max-width: 100%;display:none" />
                                                </div>
                                            </div>

                                            <%--MobileNo--%>
                                            <div class="control-group">

                                                <label class="control-label" for="focusedInput">Mobile No</label>
                                                <div class="controls">
                                                    <input type="text" id="txtMobileNo" onblur="FillMobileNoSummary();" value="" style="max-width: 100%" />

                                                </div>
                                            </div>

                                            <%--Requested Date--%>
                                            <div class="control-group">

                                                <label class="control-label" for="focusedInput">Requested Delivery Date</label>
                                                <div class="controls">
                                                    <input type="text" style="cursor: default; background-color: white; max-width: 100%" class="input-large datepicker" id="txtPlannedDeliveryDate" value="" />

                                                    <label id="dateOrderDate" class="control-label" style="font-size: 16px!important; display: none" />

                                                </div>
                                            </div>

                                            <%--Requested Time--%>
                                            <div class="control-group">

                                                <label class="control-label" for="focusedInput">Requested Delivery Time</label>
                                                <div class="controls">
                                                    <input type="number" placeholder="Hr" min="1" max="12" id="txtRequestedDeliveryTime" value="" style="max-width: 100%; width: 10%" />
                                                    <input type="number" placeholder="Min" min="0" max="59" id="txtRequestedDeliveryTimeMin" style="max-width: 100%; width: 10%" onblur="CorrectTimeMinFormat()" />
                                                    <select id="ddlMerdian" style="width: 13%">
                                                        <option value="AM">AM</option>
                                                        <option value="PM">PM</option>
                                                    </select>
                                                </div>
                                            </div>


                                        </div>

                                        <%-- END FIRST HALF--%>

                                        <%--SECOND HALF--%>

                                        <div class="span5">

                                            <%--Address--%>
                                            <div class="control-group">
                                                <label class="control-label" for="focusedInput">Delivery Address</label>
                                                <div class="controls">
                                                    <textarea class="form-control" rows="4" id="txtDeliveryAddress" style="max-width: 100%" onblur="FillAddressSummary()"></textarea>
                                                </div>
                                            </div>

                                            <%--Remarks--%>
                                            <div class="control-group">
                                                <label class="control-label" for="focusedInput">Remarks</label>
                                                <div class="controls">
                                                    <textarea class="form-control" rows="4" id="txtOrderRemarks" style="max-width: 100%"></textarea>
                                                </div>
                                            </div>

                                        </div>

                                        <%--END SECOND HALF--%>
                                    </div>

                                    <%--</div>--%>

                                    <%--------------------------- *Colored Area(branch n status *-------------------%>
                                    <div class="span11" style="background-color: #e8eaef; border: 1px solid; border-color: #5bc0de;">

                                        <br />
                                        <%--<div class="form-horizontal">--%>
                                            <div class="span5">

                                                <div class="control-group">
                                                    <label class="control-label" for="Branch"><b>Branch</b></label>
                                                    <div class="controls">
                                                        <select id="ddlBranch" style="max-width: 100%!important; width: 50%">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span5">

                                                <div class="control-group">
                                                    <label class="control-label" for="Status"><b>Order Status</b></label>
                                                    <div class="controls">
                                                        <select class="Status" id="ddlStatus" style="max-width: 100%!important; width: 50%">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        <%--</div>--%>
                                    </div>

                                    <%--order details HEADING--%>
                                    <div class="span12" style="border-bottom: ridge;">
                                        <br />
                                        <br />
                                        <label class="control-label" id="HeadOrderDetails" for="focusedInput"><b>Order Details</b></label>

                                    </div>

                                    <%----------------------------- * Order Description * --------------------------%>

                                    <div class="span12" style="padding-top: 20px">

                                        <%--First half--%>
                                        <div class="span4">

                                            <div class="span12">


                                                <div class="control-group" style="margin-left: 2%!important">
                                                    <label class="control-label" for="products">Product</label>
                                                    <div class="controls">
                                                        <select style="width: 100%;" class="products">
                                                            <option></option>
                                                        </select>

                                                    </div>
                                                </div>



                                            </div>
                                            <div class="span12">


                                                 <div class="span6">
                                                    <div class="control-group">

                                                        <label class="control-label" for="focusedInput">Type </label>
                                                        <div class="controls">
                                                            
                                                              <select id="ddlProductTypes" style="width: 90%">
                                                            <option></option>
                                                        </select>

                                                           

                                                        </div>
                                                    </div>
                                                </div>

                                                 <%--onblur="DisplayPrice()"--%>

                                                <div class="span6">
                                                    <div class="control-group">

                                                        <label class="control-label" for="focusedInput">Quantity </label>
                                                        <div class="controls">
                                                           
                                                            <input type="number" id="txtQuantity" value="1" min="1" style="width: 50%"  />
                                                          
                                                        </div>
                                                    </div>
                                                </div>

                                              <%--   <div class="span3">
                                                    <div class="control-group">

                                                        <label class="control-label" for="focusedInput">Price</label>
                                                        <div class="controls">
                                                           <label style="width: 10%;color:green;font-size:larger" id="lblPrice"></label>
                                                        </div>
                                                    </div>
                                                </div>--%>


                                              <%--  <div class="span6">
                                                    <div class="control-group">

                                                        <label class="control-label" for="focusedInput">unit </label>
                                                        <div class="controls">
                                                            <input type="text" id="txtunit" value="" style="width: 87%" />

                                                        </div>
                                                    </div>
                                                </div>--%>

                                            </div>
                                            <div class="span12">

                                                <%--<img id="ImgProduct" style="width: 77%; height: 211px; border: none" src="../img/No-Img_Chosen.png" />--%>

                                                <div class="span6">


                                                    <div class="control-group">
                                                        <label class="control-label" for="Remarks">Remarks</label>
                                                        <div class="controls">
                                                            <textarea id="txtRemarks" class="form-control" style="max-width: 100%; height: 225px" rows="4"></textarea>

                                                        </div>
                                                    </div>

                                                </div>


                                                <div class="span6">

                                                    <div class="control-group">
                                                        <label class="control-label" for="image" style="visibility: hidden">Image</label>
                                                        <div class="controls">
                                                            <img id="ImgProduct" style="height: 233px; max-width: 100%; border: none" src="../img/No-Img_Chosen.png" />

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="span12">
                                                <a id="addBtn" class="btn btn-primary button" style="float: right"><span>Add To List</span></></a>

                                            </div>

                                        </div>

                                        <div class="span1"></div>

                                        <%--Second half--%>

                                        <div class="span6">

                                            <table class="table table-striped table-bordered  bootstrap-datatable" id="OrderItemTable">

                                                <thead>
                                                    <tr>
                                                        <th>Slno</th>
                                                        <th>Item</th>
                                                        <th>Type</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                        <th>Image</th>
                                                        <th>Remarks</th>
                                                    </tr>
                                                </thead>

                                                <tbody id="OrderItemRows">
                                                    <%--<tr><td colspan="5" style="border: 1px solid black;">No Items Added</td></tr>--%>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>

                                    <%--Heading of Summary--%>
                                    <div class="span12" style="border-bottom: ridge;">
                                        <br />
                                        <br />
                                        <label class="control-label" id="HeadOrderSummary" for="focusedInput"><b>Order Summmary</b></label>

                                    </div>

                                    <div class="span12" style="padding-top: 20px">

                                        <div class="form-horizontal">

                                            <div class="span6">

                                                <%--customer--%>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Customer</label>
                                                    <div class="controls" style="padding-left: 10%; font-size: 20px!important">
                                                        <label id="lblCustomer" class="control-label" style="font-size: 16px!important; font-weight: bold;" />

                                                    </div>
                                                </div>


                                                <%--Address--%>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Address</label>
                                                    <div class="controls" style="padding-left: 10%; font-size: 20px!important">
                                                        <label id="lblAddress" class="control-label" style="font-size: 16px!important; font-weight: bold;" />

                                                    </div>
                                                </div>

                                                <%--Mob--%>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Mobile No</label>
                                                    <div class="controls" style="padding-left: 10%; font-size: 20px!important">
                                                        <label id="lblMobileNo" class="control-label" style="font-size: 16px!important; font-weight: bold;" />

                                                    </div>
                                                </div>

                                                <%--No Of Products--%>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">No Of Products</label>
                                                    <div class="controls" style="padding-left: 10%; font-size: 20px!important">
                                                        <label id="lblNoOfProducts" class="control-label" style="font-size: 16px!important; font-weight: bold;" />

                                                    </div>
                                                </div>


                                                <%--Total Order Amount--%>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Total Order Amount</label>
                                                    <div class="controls" style="padding-left: 10%; font-size: 20px!important">
                                                        <label id="lblTotalAmount" class="control-label" style="font-size: 16px!important; font-weight: bold;" />

                                                    </div>
                                                </div>

                                            </div>

                                            <div class="span5">

                                                <%--Order Date--%>

                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Order date</label>
                                                    <div class="controls" style="padding-left: 10%; font-size: 20px!important">
                                                        <label id="lblOrderDate" class="control-label" style="font-size: 16px!important; font-weight: bold;" />

                                                    </div>
                                                </div>

                                                <%--Req Delivery Date--%>

                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Requested Delivery Date</label>
                                                    <div class="controls" style="padding-left: 10%; font-size: 20px!important">
                                                        <label id="lblReqDeliveryDate" class="control-label" style="font-size: 16px!important; font-weight: bold;" />

                                                    </div>
                                                </div>


                                                <%--Actual Delivery Date--%>

                                                <%-- <div class="control-group">

                                                <label class="control-label" for="focusedInput">Actual Delivery Date</label>
                                                <div class="controls" style="padding-left: 10%; font-size: 20px!important">
                                                    <label id="lblActualDeliveryDate" class="control-label"  style="font-size: 16px!important;" />
                                                    
                                                </div>
                                            </div>--%>

                                                <%--Branch--%>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput" style="font-size: 16px">Branch</label>
                                                    <div class="controls" style="padding-left: 10%; font-size: 20px!important">
                                                        <label id="lblBranch" class="control-label" style="font-size: 16px!important; font-weight: bold;" />

                                                    </div>
                                                </div>


                                                <%--Status--%>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput" style="font-size: 16px">Status</label>
                                                    <div class="controls" style="padding-left: 10%; font-size: 20px!important">
                                                        <label id="lblStatus" class="control-label" style="font-size: 16px!important; font-weight: bold;" />

                                                    </div>
                                                </div>


                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <footer class="InnerFooter">
                                    <%--onclick="return OrderStatusValidation()"--%>
                                    <a class="btn btn-primary submitDetails" onclick="return OrderStatusValidation()"  href="#">Save</></a>
                                    <a class="btn Cancel">Clear</a>
                                </footer>

                                <%--</div>--%>
                            </div>
                        </div>

                        <div class="tab-pane" id="ClosedOrders">
                            <div class="box span12">
                                <div class="box-header">
                                    <h2 id="ClosedOrder">Closed Orders</h2>
                                    <div class="box-icon">
                                    </div>
                                </div>
                                <div class="box-content" style="min-height: 500px;">

                                    <table class="table table-striped table-bordered  bootstrap-datatable" id="ClosedOrdersTable">
                                        <thead>
                                            <tr>
                                                <th>OrderNo</th>
                                                <th>OrderDescription</th>
                                                <th>Name</th>
                                                <th>Contact Number</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="ClosedOrderRows">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div id="ClosedNewOrder" runat="server" class="row-fluid">
                                <div class="box span12" style="width: 100%">
                                    <div class="box-header">
                                        <h2 id="ClosededitLabel">Order Details</h2>
                                        <div class="box-icon">
                                        </div>
                                    </div>

                                    <div class="box-content " style="height: 100%; overflow: hidden;">

                                        <div class="span12">

                                            <div
                                                class="form-horizontal">

                                                <%--FIRST HALF--%>

                                                <div class="span6">

                                                    <div class="control-group" id="ClosedOrderNoDiv">

                                                        <label class="control-label" for="focusedInput">OrderNo</label>
                                                        <div class="controls" style="padding-left: 10%; font-size: 20px!important">
                                                            <label class="control-label" id="ClosedlblOrderNo" style="font-size: 16px!important;" />

                                                        </div>
                                                    </div>


                                                    <div class="control-group">
                                                        <label class="control-label" for="Users">User</label>
                                                        <div class="controls" style="padding-left: 10%">
                                                            <label class="control-label" id="ClosedlblUser" style="font-size: 16px!important;" />
                                                        </div>
                                                    </div>


                                                    <div class="control-group">
                                                        <label class="control-label" for="focusedInput">Order Description</label>
                                                        <div class="controls" style="padding-left: 10%">
                                                            <label class="control-label" id="ClosedlblOrderDescription" style="font-size: 16px!important;" />
                                                        </div>
                                                    </div>
                                                    <div class="control-group">

                                                        <label class="control-label" for="focusedInput">Order Date</label>
                                                        <div class="controls" style="padding-left: 10%">

                                                            <label class="control-label" id="CloseddateOrderDate" style="font-size: 16px!important;" />

                                                        </div>
                                                    </div>

                                                    <div class="control-group">

                                                        <label class="control-label" for="focusedInput">Planned Delivery Date</label>
                                                        <div class="controls" style="padding-left: 10%">

                                                            <label class="control-label" id="CloseddatePlannedDeliveryDate" style="font-size: 16px!important;" />

                                                        </div>
                                                    </div>
                                                    <div class="control-group">
                                                        <label class="control-label" for="date01">Total Order Amount</label>
                                                        <div class="controls" style="padding-left: 10%">
                                                            <label class="control-label" id="ClosedtotalAmount" style="font-size: 16px!important;" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <%-- END FIRST HALF--%>

                                                <%--SECOND HALF--%>

                                                <div class="span6">
                                                    <div class="control-group" id="ClosedForecastDiv">
                                                        <label class="control-label" for="date01">Forecast Delivery Date</label>
                                                        <div class="controls" style="padding-left: 10%">

                                                            <label class="control-label" id="CloseddateForecastDeliveryDate" style="font-size: 16px!important;" />
                                                        </div>
                                                    </div>

                                                    <div class="control-group" id="ClosedOrderReadyDiv">
                                                        <label class="control-label" for="date01">Order Ready Date</label>
                                                        <div class="controls" style="padding-left: 10%">
                                                            <label class="control-label" id="CloseddateOrderReadyDate" style="font-size: 16px!important;" />

                                                        </div>
                                                    </div>

                                                    <div class="control-group" id="ClosedActualDeliveryDiv">
                                                        <label class="control-label" for="date01">Actual Delivery Date</label>
                                                        <div class="controls" style="padding-left: 10%">
                                                            <label class="control-label" id="CloseddateActualDeliveryDate" style="font-size: 16px!important;" />

                                                        </div>
                                                    </div>

                                                </div>

                                                <%--END SECOND HALF--%>
                                            </div>

                                        </div>

                                        <div class="span12" style="border-top: ridge; width: 100%">
                                        </div>
                                        <%--<h2 id="NewItem" style="text-align:center">New Item</h2>--%>
                                        <div class="span12">

                                            <div class="span6">
                                                <h2><u>Product Details</u></h2>
                                                <br />
                                                <%--<div class="box-content TableLayout">--%>

                                                <table class="table table-striped table-bordered  bootstrap-datatable" id="ClosedOrderItemTable">

                                                    <thead>
                                                        <tr>
                                                            <th class="fullRow">Product</th>
                                                            <th class="fullRow">Remarks</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody id="ClosedOrderItemRows">
                                                    </tbody>
                                                </table>

                                                <%--</div>--%>
                                            </div>

                                        </div>
                                    </div>


                                    <footer class="InnerFooter">
                                        <a class="btn btn-primary submitDetails" href="#" style="display: none">Save</></a>
                                        <a class="btn ClosedOrderCancel">Clear</a>
                                    </footer>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>


            </div>

        </div>


    </div>

    <input type="hidden" id="hdfOrderID" />
    <input type="hidden" id="ClosedhdfOrderID" />
   <input type="hidden" id="hdfTotalDeletingPrice" />
</asp:Content>
