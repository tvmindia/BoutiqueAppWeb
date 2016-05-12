<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Loyalty.aspx.cs" Inherits="Boutique.AdminPanel.Loyalty" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/Loyalty.css" rel="stylesheet" />
    <script src="../Scripts/UserJS/Loyalty.js"></script>
    <style>
        label.control-label {cursor: default!important;}
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

          			<div class="row-fluid sortable">		
				<div class="box span12">
					<div class="box-header">
						<h2> Customers</h2>
						<div class="box-icon">
						<%--	<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
                    <%-- style="min-height:50px; max-height:350px; overflow-y:scroll; margin-bottom: 20px" --%>
					<div class="box-content" >
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
				</div><!--/span-->
                          </div><!--/row-->


        <div class="row-fluid">
               	<div class="box span6">
				  <div class="box-header">
						<h2>Details</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
					<div class="box-content" style="height:330px;overflow:auto;" >
						<div class="form-horizontal">
							<%--<fieldset>--%>
							  <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" id="txtUserName" type="text"/>
								</div>
								</div>

                            <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Loyalty Card No</label>
								<div class="controls">
								  <input class="input-large focused" id="txtLoyalCardNo" type="text"/>
								</div>
								</div>

                            <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Loyalty Points</label>
								<div class="controls">
								 
                                  <span class="input-large uneditable-input" id="txtLoyaltyPoints"></span>
								</div>
								</div>
                            <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Current Purchase</label>
								<div class="controls">
								  <input class="input-large focused" id="txtcurrentPurchase" type="text"/>
								</div>
								</div>
						


                              <div class="control-group">
								<label class="control-label">Redeem?</label>
								<div class="controls">
								  <label class="checkbox inline">
									<input type="checkbox" id="chkRedeem" value="option1"/>Yes</label>
								
								</div>
							  </div>

							  </div>
						
							
							<%--</fieldset>--%>
						</div>

                        <footer class="InnerFooter">
                				<button type="submit" class="btn btn-primary">Save changes</button>
								<button class="btn">Cancel</button>
						
                        </footer> 
                    </div>
        </div>


    </div>


</asp:Content>
