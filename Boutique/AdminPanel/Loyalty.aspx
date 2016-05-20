<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Loyalty.aspx.cs" Inherits="Boutique.AdminPanel.Loyalty" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>



<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">




    <link href="../CSS/CustomCSS/Loyalty.css" rel="stylesheet" />
    <script src="../Scripts/UserJS/Loyalty.js"></script>
    <style>
        label.control-label {
            cursor: default !important;
        }

        label {
            cursor: default !important;
        }
    </style>
    <div id="content" class="span10">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home"></i>
                <a href="index.html">Home</a>
                <i class="icon-angle-right"></i>
            </li>
            <li><a href="#">Loyalty</a></li>
        </ul>

        <%--Alert boxes --%>
         <div class="row-fluid" id="rowfluidDiv" style="display:none;">	
				<div class="box span12">

                    <div class="box-content alerts">
						<div class="alert alert-error" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Operation Not Successfull.</strong> 
						</div>
						<div class="alert alert-success" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Successfull.</strong> 
						</div>						
					</div>

                </div>
            </div>
		
	     <%--Alert boxes --%>

        <div class="row-fluid sortable">
            <div class="box span12">
                <div class="box-header">
                    <h2>Customers</h2>
                    <div class="box-icon">
                        <%--	<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                    </div>
                </div>
                <%-- style="min-height:50px; max-height:350px; overflow-y:scroll; margin-bottom: 20px" --%>
                <div class="box-content">
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
                    <%--	<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>
						</div>--%>
                </div>
                <div class="box-content" style="overflow: auto;">
                    <div class="form-horizontal" style="margin-left:3%">
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
                                            <td colspan="2" style="background-color:#f9f9f9;font-weight: bold">Loyalty Points
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Existing Points
                                            </td>
                                            <td style="text-align: right" id="existingPoints">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Points from this purchase
                                            </td>
                                            <td style="text-align: right" id="pointsFromThisPurchase">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total Points
                                            </td>
                                            <td style="text-align: right" id="totalPoints">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="background-color:#f9f9f9;font-weight: bold">Redeem Points
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Redeemable Points
                                            </td>
                                            <td style="text-align: right" id="redeemablePoints">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" id="radioButtons">                                                
                                                <label class="radio">
                                            <input type="radio" name="redeem" value="yes" id="radioYes"/> Redeem it
                                                    </label>
                                                <label class="radio">
                                            <input type="radio" name="redeem" value="no" id="radioNo"/> Don't Redeem 
                                                    </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="background-color:#f9f9f9;font-weight: bold">Net
                                            </td>
                                        </tr>
                                        <tr style="font-size:large;font-weight: bold">
                                            <td>Amount
                                            </td>
                                            <td id="netAmount" style="text-align: right">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Balance Points
                                            </td>
                                            <td id="netPoints" style="text-align: right">
                                            </td>
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


    </div>

    <input type="hidden" id="hdfUserID" value="" />



</asp:Content>
