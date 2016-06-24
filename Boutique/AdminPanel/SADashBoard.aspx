﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="SaDashBoard.aspx.cs" Inherits="Boutique.AdminPanel.SaDashBoard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <%-- <asp:ScriptManager ID="ScriptManagerSA" runat="server" EnablePartialRendering="true" EnablePageMethods="true"  >
       
    </asp:ScriptManager>--%>
    <link href="../CSS/CustomCSS/saDashboard.css" rel="stylesheet"/>
    <link href="../CSS/select2.min.css" rel="stylesheet" />
     <link href="../CSS/Common.css" rel="stylesheet" />
    <script src="../Scripts/select2.min.js"></script>
    <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Scripts/jquery.validation.js"></script>
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
        	<div class="row-fluid"><span class="headerStyle">SA DashBoard</span></div>
             <div class="row-fluid" style="height:3px;"></div>

			 <div class="row-fluid">	
                 
                    <a class="quick-button metro green span2" onclick="BindBoutique()">
					<i class="icon-tags"></i>
					<p>Boutiques</p>
				</a>
				<a class="quick-button metro yellow span2" onclick="BindUsers()">
					<i class="icon-group"></i>
					<p>App Users</p>
					<span class="badge" id="UsersBadge">0</span>
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
				
				<a class="quick-button metro pink span2" onclick="BindException()">
					<i class="icon-ambulance"></i>
					<p>Exceptions</p>
					<span class="badge" id="Exception">0</span>
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

         <div class="row-fluid" id="AppUserMainDiv">		
                        
			    	<div class="box span12" id="AppUserRowFluid">
                     
          
					<div class="box-header">
						<h2><span class="break"></span>App Users</h2>
						<div class="box-icon">
							
							<%--<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
							
						</div>
					</div>
					<div class="box-content TableLayout" style="min-height:50px; max-height:350px; overflow:scroll;">
						<table id="AppUserTable" class="table table-striped table-bordered  bootstrap-datatable">
						  <thead>
							  <tr>
								  <th>User Name</th>
                                  <th>Mobile Number</th>
								  <th>Email</th>
                                  <%--<th>Gender</th>
                                  <th>Timing</th>
								  <th style="width:105px;">Working Days</th>--%>
								  <%--<th style="width:85px;">Actions</th>--%>
							  </tr>
						  </thead>   
						  <tbody id="AppUserrows">
							
							
						
							
						  </tbody>
					  </table>            
					</div>
                      
                   
				</div><!--/span-->
         
                 </div>
            
         <div class="row-fluid" id="AllBoutiquesMainDiv">		
                        
			    	<div class="box span12" id="BoutiqueRowFluid">
                     
          
					<div class="box-header">
						<h2><span class="break"></span>All Boutiques</h2>
						<div class="box-icon">
							
							<%--<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
							
						</div>
					</div>
					<div class="box-content TableLayout" style="min-height:50px; max-height:350px; overflow:scroll;">
						<table id="boutiqueTable" class="table table-striped table-bordered  bootstrap-datatable">
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
						  <tbody id="Boutiquerows">
							
							
						
							
						  </tbody>
					  </table>            
					</div>
                      
                   
				</div><!--/span-->
         
                 </div>

         <div class="row-fluid" id="ExceptionMainDiv">		
                        
			    	<div class="box span12" id="ExcepyionRowFluid">
                     
          
					<div class="box-header">
						<h2><span class="break"></span>Exception</h2>
						<div class="box-icon">
							
							<%--<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
							
						</div>
					</div>
					<div class="box-content TableLayout" style="min-height:50px; max-height:350px; overflow:scroll;">
						<table id="ExceptionTable" class="table table-striped table-bordered  bootstrap-datatable">
						  <thead>
							  <tr>
								  <th>User Name</th>
                                  <th>Error Description</th>
								  <th>Date</th>
                                  
								 <%-- <th style="width:85px;">Actions</th>--%>
							  </tr>
						  </thead>   
						  <tbody id="Exceptionrows">
							
							
						
							
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
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Operation Not Successfull.</strong> 
						</div>
						<div class="alert alert-success" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Successfull.</strong> 
						</div>
						<div class="alert alert-info" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
						</div>
						<div class="alert alert-block" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<h4 class="alert-heading">Warning!</h4>
							<p>Best check yourself, you're not looking too good.</p>
						</div>
					</div>

                </div>
            </div>
				
	    <%--Alert boxes --%>
			
			
					
			

                   <%-- create boutique form--%>
           
                     <div class="row-fluid">
                     

        	     	<div class="box span6" id="NewBoutiqueSpan">
                      
				       <div class="box-header">
						<h2 id="editLabel">  New Boutique</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
			     		        <div class="box-content" id="NewBoutique" style="height:438px; overflow:auto;" >
						<div class="form-horizontal" id="formBou">
                            <div class="alert alert-error" id="ErrorBox" style="display:none;">
                                <div id="Displaydiv">

                                </div>
                            </div>
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
								  <input class="input-large focused" id="txtBouquetName" name="Boutique Name" type="text"/>
								</div>
								</div>

                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Started Year</label>
								<div class="controls">
								  <input class="input-large focused" id="txtStartYear" name="Start Year" type="text"/>
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
								  <input class="input-large focused" id="txtLocation" name="Location" type="text"/>
								</div>
								</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Address</label>
								<div class="controls">
								  <textarea class="form-control" style="max-width:68%" rows="4" name="Address" id="txtAddress"></textarea>
								</div>
								</div>


                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Phone</label>
								<div class="controls">
								  <input class="input-large focused" id="txtPhone" name="Phone Number" type="text"/>
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
								<label class="control-label" for="focusedInput"> Basic Currency</label>
								<div class="controls">
								   <select class="ddlCurrency" id="idDdlCurrency">
                                     <option></option>
                                   </select>
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
                                   <a class="btn btn-primary AddBoutique" href="#" onclick="return Validation()">Save</></a>

                                    <a class="btn CancelClear">Cancel</a>
							<%--	<button class="btn">Cancel</button>--%>
						
                        </footer> 
                           
                       </div>
                      
                     
                         
                    
                    <div class="box span6" id="NewAdminSpan">
                        
                        <div class="box-header">
						<h2> New Administrator</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
                         <div class="box-content"  style="height:438px; overflow:auto;">
						<div class="form-horizontal">
                            <div class="alert alert-error" id="ErrorBox1" style="display:none;">
                                <div id="Displaydiv1">

                                </div>
                            </div>

							<%--<fieldset>--%>

                          

                              <div class="control-group">
								<label class="control-label" for="selectError3">Boutiques</label>
								<div class="controls">
								   <select class="ddlboutiques" id="idDdlboutiques">
                                     <option></option>
                                   </select>
								</div>
							  </div>

							  <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtUserName" type="text"/>
								</div>
								</div>
							
							  <div class="control-group">
								 <label class="control-label" for="focusedInput">Mobile</label>
								<div class="controls">
								  <input class="input-large focused" name="Mobile Number" id="txtMobile" type="text"/>
								</div>
								</div>

                             <div class="control-group">
							
								  <label class="control-label" for="focusedInput">LoginName</label>
								<div class="controls">
								  <input class="input-large focused" name="Login Name" id="txtAdminLoginName" type="text"/>
								</div>
								</div>

                              <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Password</label>
								<div class="controls">
								  <input class="input-large focused" name="Password" id="txtAdminPass" type="password"/>
								</div>
								</div>

                              <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Confirm Password</label>
								<div class="controls">
								  <input class="input-large focused" name="Confirm Password" id="txtAdminConPass" type="password"/>
								</div>
								</div>


                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Email</label>
								<div class="controls">
								  <input class="input-large focused" name="Email" id="txtUserEmail" type="text"/>
								</div>
								</div>

                              <div class="control-group">
								<label class="control-label">Is Acitive?</label>
								<div class="controls">
								  <label class="checkbox inline">
									<input type="checkbox" id="chkActive" checked/>Yes</label>
								
								</div>
							  </div>
                            
						</div>
                         </div>
                               <footer class="InnerFooter">
                                <a class="btn btn-primary AddAdmin" onclick="return AdminValidation()" href="#">Save</></a>
                                <a class="btn CancelAdClear">Cancel</a>
             			       </footer> 
                       	</div>
                 
			         </div>
                
                 
		  
				<%-- create boutique form--%>	
				
             

       
	</div>
    <input type="hidden" id="hdfBoutiqueID" value=""/>
           
</asp:Content>
