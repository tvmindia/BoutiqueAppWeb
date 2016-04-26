﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="SaDashBoard.aspx.cs" Inherits="Boutique.AdminPanel.SaDashBoard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <%-- <asp:ScriptManager ID="ScriptManagerSA" runat="server" EnablePartialRendering="true" EnablePageMethods="true"  >
       
    </asp:ScriptManager>--%>
    <link href="../CSS/CustomCSS/saDashboard.css" rel="stylesheet" />
    <script src="../Scripts/UserJS/SaDashBoard.js"></script>
   
    
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


            
                 <div class="row-fluid sortable">		
                        
			    	<div class="box span12">
                     
          
					<div class="box-header">
						<h2>  All Boutiques</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
					<div class="box-content" style="height:350px;overflow:auto;">
						<table id="bouquetTable" class="table table-striped table-bordered">
						  <thead>
							  <tr>
								  <th>Boutique</th>
                                  <th>AppVersion</th>
								  <th>Location</th>
                                  <th>Phone</th>
                                  <th>Timing</th>
								  <th style="width:105px;">Working Days</th>
								  <th style="width:85px;">Actions</th>
							  </tr>
						  </thead>   
						  <tbody>
							
							
						
							
						  </tbody>
					  </table>            
					</div>
                      
                   
				</div><!--/span-->
         
                 </div>
                
        

		 <%--Alert boxes --%>
               <div class="row-fluid" id="rowfluidDiv" style="display:none;">	
				<div class="box span12">

                    <div class="box-content alerts">
						<div class="alert alert-error" style="display:none;">
							<button type="button" class="close" data-dismiss="alert">×</button>
							<strong>Oh snap!</strong> Change a few things up and try submitting again.
						</div>
						<div class="alert alert-success" style="display:none;">
							<button type="button" class="close" data-dismiss="alert">×</button>
							<strong>Well done!</strong> You successfully read this important alert message.
						</div>
						<div class="alert alert-info" style="display:none;">
							<button type="button" class="close" data-dismiss="alert">×</button>
							<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
						</div>
						<div class="alert alert-block" style="display:none;">
							<button type="button" class="close" data-dismiss="alert">×</button>
							<h4 class="alert-heading">Warning!</h4>
							<p>Best check yo self, you're not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
						</div>
					</div>

                </div>
            </div>
				
	    <%--Alert boxes --%>
			
			
					
			

                   <%-- create boutique form--%>
           
                     <div class="row-fluid">
                     

        	     	<div class="box span6">
                      
				       <div class="box-header">
						<h2>  New Boutique</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
			     		        <div class="box-content"  style="height:305px;overflow:auto;" >
						<div class="form-horizontal">
							<%--<fieldset>--%>
							  <div class="control-group">
							
								  <label class="control-label" for="focusedInput">App Version</label>
								<div class="controls">
								  <input class="input-large focused" id="txtAppVersion" type="text"/>
								</div>
								</div>
							
							  <div class="control-group">
								 <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" id="txtBouquetName" type="text"/>
								</div>
								</div>

                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Started Year</label>
								<div class="controls">
								  <input class="input-large focused" id="txtStartYear" type="text"/>
								</div>
								</div>

                              <div class="control-group">
                                <label class="control-label" for="focusedInput">About us</label>
                                  <div class="controls">
                                <textarea class="form-control" style="max-width:68%" rows="5" id="txtAboutus"></textarea>
							  </div>
                              </div>

                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Caption</label>
								<div class="controls">
								  <input class="input-large focused" id="txtCaption" type="text"/>
								</div>
								</div>
                        

                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Location</label>
								<div class="controls">
								  <input class="input-large focused" id="txtLocation" type="text"/>
								</div>
								</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Address</label>
								<div class="controls">
								  <textarea class="form-control" style="max-width:68%" rows="4" id="txtAddress"></textarea>
								</div>
								</div>


                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Phone</label>
								<div class="controls">
								  <input class="input-large focused" id="txtPhone" type="text"/>
								</div>
								</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Timings</label>
								<div class="controls">
								  <input class="input-large focused" id="txtTimings" type="text"/>
								</div>
								</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Working Days</label>
								<div class="controls">
								  <input class="input-large focused" id="txtWorkingDays" type="text"/>
								</div>
								</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Facebook Link</label>
								<div class="controls">
								  <input class="input-large focused" id="txtFacebooklink" type="text"/>
								</div>
								</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Instagram Link</label>
								<div class="controls">
								  <input class="input-large focused" id="txtInstatgramlink" type="text"/>
								</div>
								</div>


                          
                                
							  </div>
						
						 
							<%--</fieldset>--%>
					         	</div>
                                <footer class="InnerFooter">
                			<%--	<button type="submit" class="btn btn-primary" id="btnSaveBoutique">Save</button>--%>
                                   <a class="btn btn-primary AddBoutique" href="#">Save</></a>

                                    <a class="btn CancelClear">Cancel</a>
							<%--	<button class="btn">Cancel</button>--%>
						
                        </footer> 
                           
                       </div>
                      
                     
                         
                    
                    <div class="box span6">
                        
                        <div class="box-header">
						<h2>  New Administrator</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
                         <div class="box-content" style="height:305px;">
						<div class="form-horizontal">
							<%--<fieldset>--%>

                             <div class="control-group">
								<label class="control-label" for="selectError">Boutiques</label>
								<div class="controls">
								  <select id="ddlBoutiques" class="selectpicker" data-rel="chosen">
							    	<option>Select</option>
									<%--<option>Boutiques 2</option>
									<option>Boutiques 3</option>
									<option>Boutiques 4</option>
									<option>albert 5</option>--%>
								  </select>
								</div>
							  </div>

							  <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" id="txtUserName" type="text"/>
								</div>
								</div>
							
							  <div class="control-group">
								 <label class="control-label" for="focusedInput">Mobile</label>
								<div class="controls">
								  <input class="input-large focused" id="txtMobile" type="text"/>
								</div>
								</div>


                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Email</label>
								<div class="controls">
								  <input class="input-large focused" id="txtUserEmail" type="text"/>
								</div>
								</div>

                              <div class="control-group">
								<label class="control-label">Is Acitive?</label>
								<div class="controls">
								  <label class="checkbox inline">
									<input type="checkbox" id="chkActive"/>Yes</label>
								
								</div>
							  </div>
                            
						</div>
                         </div>
                               <footer class="InnerFooter">
                        
							<%--	<button type="submit" class="btn btn-primary Addboutique">Save changes</button>--%>
                                     <a class="btn btn-primary AddAdmin" href="#">Save</></a>
                                    <a class="btn">Cancel</a>
                                  
						       </footer> 
                       	</div>
                 
			         </div>
                
                 
		  
				<%-- create boutique form--%>	
				
             

       
	</div>
    <input type="hidden" id="hdfBoutiqueID" value="Norway"/>
      
</asp:Content>
