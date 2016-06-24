<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Loyalty.aspx.cs" Inherits="Boutique.AdminPanel.Loyalty" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>



<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


    <link href="../CSS/CustomCSS/Loyalty.css" rel="stylesheet" />
    <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Scripts/UserJS/Loyalty.js"></script>
    <script src="../Scripts/select2.min.js"></script>
    <script src="../Scripts/CommonJS/Common.js"></script>   
    <link href="../CSS/select2.min.css" rel="stylesheet" />

    <div id="content" class="span10">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home"></i>
                <a href="index.html">Home</a>
                <i class="icon-angle-right"></i>
            </li>
            <li><a href="#">Loyalty</a></li>
        </ul>
        <div class="row-fluid"><span class="headerStyle">Loyalty</span></div>
        <div class="row-fluid" style="height: 3px;"></div>


        <%--Alert boxes --%>
        <div class="row-fluid" id="rowfluidDiv" style="display: none;">
            <div class="box span12">

                <div class="box-content alerts">
                    <div class="alert alert-error" style="display: none;">
                        <%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
                        <strong>Operation Not Successfull.</strong>
                    </div>
                    <div class="alert alert-success" style="display: none;">
                        <%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
                        <strong>Successfull.</strong>
                    </div>
                </div>

            </div>
        </div>

        <%--Alert boxes --%>


        <div class="row-fluid">

            <div class="box span12">
                <div class="box-header">
                </div>
                <div class="box-content">
                    <ul class="nav tab-menu nav-tabs" id="myTab">
                        <li class="icon active"><a href="#Loyalty">Loyalty</a></li>
                        <li><a href="#TransactionReview">Transaction Review</a></li>

                    </ul>

                    <div id="myTabContent" class="tab-content">

                        <div class="tab-pane active" id="Loyalty">

                            <div class="row-fluid sortable" id="customers">
                                <div class="box span12">
                                    <div class="box-header">
                                        <h2>Customers</h2>
                                        <div class="box-icon">
                                            <%--	<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                                        </div>
                                    </div>
                                    <div class="box-content  " style="height: 500px; overflow: auto;">
                                        <%--<table class="table table-striped table-bordered bootstrap-datatable datatable" id="UsersTable">--%>
                                        <table class="table table-striped table-bordered  bootstrap-datatable" id="UsersTable">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Mobile</th>
                                                    <th>Email</th>
                                                    <th>Loyalty Card No</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody id="userrows">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <!--/span-->
                            </div>
                            <!--/row-->


                            <div class="row-fluid" id="DetailSection">
                                <div class="box span12">
                                    <div class="box-header">
                                        <h2>Details</h2>
                                    </div>
                                    <div class="box-content" style="overflow: auto;">
                                        <div class="form-horizontal">
                                            <%--<fieldset>--%>

                                            <div class="span12">

                                                <div class="span6">
                                                    <div class="row control-group">
                                                        <label class="control-label" for="focusedInput">Name</label>
                                                        <div class="controls">
                                                            <label class="control-label" id="txtUserName" />
                                                        </div>
                                                    </div>
                                                    <div class="row control-group">
                                                        <label class="control-label" for="focusedInput">Mobile</label>
                                                        <div class="controls">
                                                            <label class="control-label" id="txtMobile" />
                                                        </div>
                                                    </div>
                                                    <div class="row control-group">
                                                        <label class="control-label" for="focusedInput">Loyalty Card No</label>
                                                        <div class="controls">
                                                            <label class="control-label" id="txtLoyalCardNo" />
                                                        </div>
                                                    </div>
                                                    <div class="row control-group">
                                                        <label class="control-label" for="focusedInput">Loyalty Points</label>
                                                        <div class="controls">
                                                            <label class="control-label LoyaltyPoints" id="txtLoyaltyPoints" />
                                                        </div>
                                                    </div>
                                                    <div class="row control-group">
                                                        <div class="control-group">
                                                            <label class="control-label" for="focusedInput">Purchase Amount</label>
                                                            <div class="controls">
                                                                <input class="input-large focused" id="txtcurrentPurchase" type="number" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div class="span4">


                                                    <table class="table table-bordered">

                                                        <tbody>
                                                            <tr>
                                                                <td colspan="2" class="fullRow">Loyalty Points
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Existing Points
                                                                </td>
                                                                <td class="NumberRight" id="existingPoints"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Points from this purchase
                                                                </td>
                                                                <td class="NumberRight" id="pointsFromThisPurchase"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total Points
                                                                </td>
                                                                <td class="NumberRight" id="totalPoints"></td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" class="fullRow">Redeem Points
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Redeemable Points
                                                                </td>
                                                                <td class="NumberRight" id="redeemablePoints"></td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" id="radioButtons">
                                                                    <label class="radio">
                                                                        <input type="radio" name="redeem" value="yes" id="radioYes" />
                                                                        Redeem it
                                                                    </label>
                                                                    <label class="radio">
                                                                        <input type="radio" name="redeem" value="no" id="radioNo" />
                                                                        Don't Redeem 
                                                                    </label>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td colspan="2" class="fullRow">Net
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Currency</td>
                                                                <td class="NumberRight">
                                                                    <select class="Currency">
                                                                        <option></option>
                                                                    </select></td>
                                                            </tr>

                                                            <tr style="font-size: large; font-weight: bold">
                                                                <td>Amount
                                                                </td>
                                                                <td id="netAmount" class="NumberRight"></td>
                                                                <%--<td><label class="control-label" id="lblSymbol"/></td>--%>
                                                            </tr>
                                                            <tr>
                                                                <td>Balance Points
                                                                </td>
                                                                <td id="netPoints" class="NumberRight"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>



                                                </div>


                                            </div>

                                        </div>

                                    </div>


                                    <footer class="InnerFooter">

                                        <a class="btn btn-primary submitDetails" href="#">Save</></a>

                                        <a class="btn Cancel">Cancel</a>
                                    </footer>
                                </div>
                            </div>

                            <div class="BottomRightInfo" id="loyaltySettingsInfo">
                            </div>

                        </div>

                        <div class="tab-pane" id="TransactionReview">

                            <div class="row-fluid sortable">
                                <div class="box span12">
                                    <div class="box-header">
                                        <h2>Log of Loyalty Point updates</h2>
                                        <div class="box-icon">
                                            <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                                        </div>
                                    </div>
                                    <div class="box-content ">
                                        <table class="table table-striped table-bordered  bootstrap-datatable" id="LoyaltyLogTable">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Loyalty Card No</th>
                                                    <th>Mobile</th>
                                                    <th>Amount Paid</th>
                                                    <th>Debit Points</th>
                                                    <th>Credit Points</th>
                                                    <th>Loyalty Points</th>
                                                    <th>Money to Point Percentage</th>
                                                    <th>Currency</th>
                                                    <th>Date</th>
                                                    <th>Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody id="rows">
                                            </tbody>
                                        </table>
                                        <%--<div class="pagination pagination-centered">
						  <ul>
							<li><a href="#">Prev</a></li>
							<li class="active">
							  <a href="#">1</a>
							</li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">Next</a></li>
						  </ul>
						</div>  --%>
                                    </div>
                                </div>
                                <!--/span-->
                            </div>

                              <div style="height:200px" >
                        </div>


                      


                    </div>
                </div>

                   

            </div>

          

        </div>

       

    </div>
    <input type="hidden" id="hdfUserID" value="" />
    <input type="hidden" id="hdfMIN_AMOUNT_TO_REDEEM" value="" />
    <input type="hidden" id="hdfMAX_DISCOUNT_PERCENTAGE" value="" />
    <input type="hidden" id="hdfMONEY_TO_POINT_VALUE" value="" />
     <input type="hidden" id="hdfCurrencyCode" value="" />


</asp:Content>
