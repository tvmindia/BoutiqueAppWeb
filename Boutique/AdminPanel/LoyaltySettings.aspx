<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="LoyaltySettings.aspx.cs" Inherits="Boutique.AdminPanel.LoyaltySettings" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/LoyaltySettings.css" rel="stylesheet" />
      <script src="../Scripts/custom.js"></script>
    <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Scripts/UserJS/LoyaltySettings.js"></script>

     <div id="content" class="span10">

         <ul class="breadcrumb">
				<li>
					<i class="icon-home"></i>
					<a href="index.html">Home</a> 
					<i class="icon-angle-right"></i>
				</li>
				<li><a href="#">Loyalty Settings</a></li>
			</ul>


         <div class="row-fluid"><span class="headerStyle">Loyalty Settings</span></div>
          <div class="row-fluid" style="height:3px;"></div>

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

         <div class="row-fluid">
             <div class="box span6">
                <div class="box-header">
						<h2>Loyalty Settings</h2>
					</div>
            	<div class="box-content" >
                    <div class="form-horizontal" style="margin-top:3%" >                     

                        <div class="control-group">
							
								  <label class="span8" for="focusedInput">Money to Points Percentage</label>
								<div class="span4">								                            
                                     <input class="input-mini focused" id="txtMoneyToPointPercentage" type="number"/><span> %</span>
								</div>
						</div>
                        <div class="control-group">
							
								  <label class="span8" for="focusedInput">Minimum Purchase Amount for Redeem</label>
								<div class="span4">
								                            
                                     <input class="input-mini focused" id="txtMinPurchaseAmount" type="number"/>
								</div>
						</div>
                        <div class="control-group">
							
								  <label class="span8" for="focusedInput">Maximum Discount Percentage</label>
								<div class="span4">								                            
                                     <input class="input-mini focused" id="txtMaxDiscountPercentage" type="number"/><span> %</span>
								</div>
						</div>
                         <div class="control-group">
							
								  <label class="span8" for="focusedInput">Initial Loyalty Points on customer registration</label>
								<div class="span4">								                            
                                     <input class="input-mini focused" id="txtInitialLoyaltyPoints" type="number"/>
								</div>
						</div>
                         <div class="control-group">
							
								  <label class="span8" for="focusedInput">Referral benifit points</label>
								<div class="span4">								                            
                                     <input class="input-mini focused" id="txtReferralbenifitpoints" type="number"/>
								</div>
						</div>
                    </div>
                </div>

                  <footer class="InnerFooter">
                			<a class="btn btn-primary saveSettings" href="#">Save</></a>	
                      <a class="btn btn-primary SetToDefault" href="#">Set To Default</></a>							
                           <a class="btn Cancel">Cancel</a>
                        </footer> 
                  
            </div>
         </div>


         
         
        <%-- <div class="row-fluid sortable" id="customers">
            <div class="box span12">
                <div class="box-header">
                    <h2>Customers</h2>
                </div>
                <div class="box-content">
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
        </div>--%>


     </div>

    
    <input type="hidden" id="hdfUserID" value="" />

</asp:Content>
