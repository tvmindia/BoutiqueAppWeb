<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Loyalty.aspx.cs" Inherits="Boutique.AdminPanel.Loyalty" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/Loyalty.css" rel="stylesheet" />

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
					<div class="box-content">
						<table class="table table-striped table-bordered bootstrap-datatable datatable" id="UsersTable">
						  <thead>
							  <tr>
								  <th>Name</th>
								  <th>Mobile</th>
								  <th>Email</th>
								  <th>Loyalty Card No</th>
								  <th>Actions</th>
							  </tr>
						  </thead>   
						  <tbody>
							<tr>
								<td>Dennis Ji</td>
								<td class="center">2012/01/01</td>
								<td class="center">Member</td>
								<td class="center">
									<span class="label label-success">Active</span>
								</td>
								<td class="center">
									<a class="btn btn-success" href="#">
										<i class="halflings-icon white zoom-in"></i>  
									</a>
									<a class="btn btn-info" href="#">
										<i class="halflings-icon white edit"></i>  
									</a>
									<a class="btn btn-danger" href="#">
										<i class="halflings-icon white trash"></i> 
									</a>
								</td>
							</tr>
							<tr>
								<td>Dennis Ji</td>
								<td class="center">2012/01/01</td>
								<td class="center">Member</td>
								<td class="center">
									<span class="label label-success">Active</span>
								</td>
								<td class="center">
									<a class="btn btn-success" href="#">
										<i class="halflings-icon white zoom-in"></i>  
									</a>
									<a class="btn btn-info" href="#">
										<i class="halflings-icon white edit"></i>  
									</a>
									<a class="btn btn-danger" href="#">
										<i class="halflings-icon white trash"></i> 
									</a>
								</td>
							</tr>
						
						
							<tr>
								<td>Dennis ki</td>
								<td class="center">2012/03/01</td>
								<td class="center">Member</td>
								<td class="center">
									<span class="label label-warning">Pending</span>
								</td>
								<td class="center">
									<a class="btn btn-success" href="#">
										<i class="halflings-icon white zoom-in"></i>                                            
									</a>
									<a class="btn btn-info" href="#">
										<i class="halflings-icon white edit"></i>                                            
									</a>
									<a class="btn btn-danger" href="#">
										<i class="halflings-icon white trash"></i> 

									</a>
								</td>
							</tr>
							<tr>
								<td>Dennis Ji</td>
								<td class="center">999999</td>
								<td class="center">Member@mail.com</td>
								<td class="center">
									loyaltynum
								</td>
								<td class="center">
									<a class="btn btn-success" href="#">
										<i class="halflings-icon white zoom-in"></i>                                            
									</a>
									<a class="btn btn-info" href="#">
										<i class="halflings-icon white edit"></i>                                            
									</a>
									<a class="btn btn-danger" href="#">
										<i class="halflings-icon white trash"></i> 
										
									</a>
								</td>
							</tr>
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
