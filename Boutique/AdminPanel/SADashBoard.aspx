<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="SaDashBoard.aspx.cs" Inherits="Boutique.AdminPanel.SaDashBoard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:ScriptManager ID="ScriptManagerSA" runat="server" EnablePartialRendering="true" EnablePageMethods="true"  >
       
    </asp:ScriptManager>
    <link href="../CSS/CustomCSS/saDashboard.css" rel="stylesheet" />

    <div id="content" class="span10">
			
			
			<ul class="breadcrumb">
				<li>
					<i class="icon-home"></i>
					<a href="index.html">Home</a> 
					<i class="icon-angle-right"></i>
				</li>
				<li><a href="#">Dashboard</a></li>
			</ul>
     <%--   Report tiles--%>
			<div class="row-fluid">	

				<a class="quick-button metro yellow span2">
					<i class="icon-group"></i>
					<p>Users</p>
					<span class="badge">237</span>
				</a>
                    <a class="quick-button metro green span2">
					<i class="icon-tags"></i>
					<p>Total Boutiques</p>
				</a>
				<a class="quick-button metro red span2">
					<i class="icon-comments-alt"></i>
					<p>Notifications</p>
					<span class="badge">46</span>
				</a>
				<a class="quick-button metro blue span2">
					<i class="icon-shopping-cart"></i>
					<p>Orders</p>
					<span class="badge">13</span>
				</a>
				
				<a class="quick-button metro pink span2">
					<i class="icon-ambulance"></i>
					<p>Errors</p>
					<span class="badge">88</span>
				</a>
				<a class="quick-button metro black span2">
					<i class="icon-calendar"></i>
					<p>Installed</p>
				</a>
				
				<div class="clearfix"></div>
								
			</div><!--/row-->
     <%--   Report tiles--%>
            <div class="span12" style="height:20px;">

            </div>


            <asp:UpdatePanel ID="upBoutiqueGrid" runat="server" UpdateMode="Always" >
                 <ContentTemplate>
                 <div class="row-fluid sortable">		
				<div class="box span12">
					<div class="box-header">
						<h2> All Boutiques</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
					<div class="box-content">
						<table class="table table-striped table-bordered bootstrap-datatable datatable">
						  <thead>
							  <tr>
								  <th>Username</th>
								  <th>Date registered</th>
								  <th>Role</th>
								  <th>Status</th>
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
								<td>Dennis Ji</td>
								<td class="center">2012/02/01</td>
								<td class="center">Staff</td>
								<td class="center">
									<span class="label label-important">Banned</span>
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
								<td class="center">2012/02/01</td>
								<td class="center">Staff</td>
								<td class="center">
									<span class="label label-important">Banned</span>
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
								<td class="center">2012/01/21</td>
								<td class="center">Staff</td>
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
								<td class="center">2012/01/21</td>
								<td class="center">Staff</td>
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
								<td class="center">2012/08/23</td>
								<td class="center">Staff</td>
								<td class="center">
									<span class="label label-important">Banned</span>
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
								<td class="center">2012/08/23</td>
								<td class="center">Staff</td>
								<td class="center">
									<span class="label label-important">Banned</span>
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
								<td class="center">2012/06/01</td>
								<td class="center">Admin</td>
								<td class="center">
									<span class="label">Inactive</span>
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
								<td class="center">2012/06/01</td>
								<td class="center">Admin</td>
								<td class="center">
									<span class="label">Inactive</span>
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
								<td class="center">2012/02/01</td>
								<td class="center">Staff</td>
								<td class="center">
									<span class="label label-important">Banned</span>
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
								<td class="center">2012/02/01</td>
								<td class="center">Admin</td>
								<td class="center">
									<span class="label">Inactive</span>
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
								<td class="center">2012/02/01</td>
								<td class="center">Admin</td>
								<td class="center">
									<span class="label">Inactive</span>
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
								<td class="center">2012/01/21</td>
								<td class="center">Staff</td>
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
								<td class="center">2012/01/21</td>
								<td class="center">Staff</td>
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
								<td class="center">2012/08/23</td>
								<td class="center">Staff</td>
								<td class="center">
									<span class="label label-important">Banned</span>
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
								<td class="center">2012/08/23</td>
								<td class="center">Staff</td>
								<td class="center">
									<span class="label label-important">Banned</span>
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
								<td class="center">2012/06/01</td>
								<td class="center">Admin</td>
								<td class="center">
									<span class="label">Inactive</span>
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
						  </tbody>
					  </table>            
					</div>
				</div><!--/span-->
            </div>
                 </ContentTemplate>
            </asp:UpdatePanel>


		
				<%-- create boutique --%>
			
					
			

                   <%-- create boutique form--%>
           
                     <div class="row-fluid">
                     

        		     	<div class="box span6">
                          <asp:UpdatePanel ID="upNewBoutique" runat="server" UpdateMode="Conditional" >
                            <ContentTemplate>
				            	<div class="box-header">
						<h2>New Boutique</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
			     		        <div class="box-content"  style="height:488px;overflow:auto;" >
						<div class="form-horizontal">
							<%--<fieldset>--%>
							  <div class="control-group">
							
								  <label class="control-label" for="focusedInput">App Version</label>
								<div class="controls">
								  <input class="input-large focused" id="txtAppVersion" runat="server" type="text"/>
								</div>
								</div>
							
							  <div class="control-group">
								 <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" id="txtBouquetName" runat="server" type="text"/>
								</div>
								</div>

                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Started Year</label>
								<div class="controls">
								  <input class="input-large focused" id="txtStartYear" runat="server" type="text"/>
								</div>
								</div>

                              <div class="control-group">
                                <label class="control-label" for="focusedInput">About us</label>
                                  <div class="controls">
                                <textarea class="form-control" style="max-width:68%" rows="5" runat="server" id="txtAboutus"></textarea>
							  </div>
                              </div>

                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Caption</label>
								<div class="controls">
								  <input class="input-large focused" id="txtCaption" runat="server" type="text"/>
								</div>
								</div>
                        

                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Location</label>
								<div class="controls">
								  <input class="input-large focused" id="txtLocation" runat="server" type="text"/>
								</div>
								</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Address</label>
								<div class="controls">
								  <textarea class="form-control" style="max-width:68%" rows="4" runat="server" id="txtAddress"></textarea>
								</div>
								</div>


                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Phone</label>
								<div class="controls">
								  <input class="input-large focused" id="txtPhone" runat="server" type="text"/>
								</div>
								</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Timings</label>
								<div class="controls">
								  <input class="input-large focused" runat="server" id="txtTimings" type="text"/>
								</div>
								</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Working Days</label>
								<div class="controls">
								  <input class="input-large focused" runat="server" id="txtWorkingDays" type="text"/>
								</div>
								</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Facebook Link</label>
								<div class="controls">
								  <input class="input-large focused" runat="server" id="txtFacebooklink" type="text"/>
								</div>
								</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Instagram Link</label>
								<div class="controls">
								  <input class="input-large focused" runat="server" id="txtInstatgramlink" type="text"/>
								</div>
								</div>


                          
                                
							  </div>
						
						 
							<%--</fieldset>--%>
						</div>
                                <footer class="InnerFooter">
                				<button type="submit" class="btn btn-primary" runat="server" onserverclick="NewBoutique_ServerClick">Save</button>

								<button class="btn">Cancel</button>
						
                        </footer> 
                            </ContentTemplate>
                         </asp:UpdatePanel>
                       </div>
                      
                     
                         
                    
                    <div class="box span6">
                          <asp:UpdatePanel ID="upNewAdminstrator" runat="server" UpdateMode="Conditional" >
                           <ContentTemplate>
                        <div class="box-header">
						<h2>New Administrator</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
                               <div class="box-content" style="height:488px;">
						<div class="form-horizontal">
							<%--<fieldset>--%>
							  <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" id="txtUserName" runat="server" type="text"/>
								</div>
								</div>
							
							  <div class="control-group">
								 <label class="control-label" for="focusedInput">Mobile</label>
								<div class="controls">
								  <input class="input-large focused" id="txtMobile" runat="server" type="text"/>
								</div>
								</div>


                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Email</label>
								<div class="controls">
								  <input class="input-large focused" id="txtUserEmail" runat="server" type="text"/>
								</div>
								</div>

                              <div class="control-group">
								<label class="control-label">Is Acitive?</label>
								<div class="controls">
								  <label class="checkbox inline">
									<input type="checkbox" id="chkActive" runat="server" value="option1"/>Yes</label>
								
								</div>
							  </div>


                              <div class="control-group">
								<label class="control-label">Is Admin?</label>
								<div class="controls">
								  <label class="checkbox inline">
									<input type="checkbox" id="chkIsAdmin" runat="server" value="option1"/>Yes</label>
								
								</div>
							  </div>

                            


                         
						
						</div>
                               <footer class="InnerFooter">
                        
								<button type="submit" runat="server" onserverclick="NewAdmin_ServerClick" class="btn btn-primary">Save changes</button>
								<button class="btn">Cancel</button>
						 </footer> 
                           </ContentTemplate>
                          </asp:UpdatePanel>
					</div>
                   
                   
			         </div>
                
                 
		  
				<%-- create boutique form--%>	
				
                <%-- create boutique --%>
				
	
	</div>
      
</asp:Content>
