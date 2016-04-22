<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="SaDashBoard.aspx.cs" Inherits="Boutique.AdminPanel.SaDashBoard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:ScriptManager ID="ScriptManagerSA" runat="server" EnablePartialRendering="true" EnablePageMethods="true"  >
       
    </asp:ScriptManager>
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
                        <asp:UpdatePanel ID="upBoutiqueGrid" runat="server" UpdateMode="Always">
                    <ContentTemplate>
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
						<table id="bouquetTable" class="table table-striped table-bordered bootstrap-datatable datatable">
						  <thead>
							  <tr>
								  <th>Boutique</th>
                                  <th>AppVersion</th>
								  <th>Location</th>
                                  <th>Phone</th>
                                  <th>Timing</th>
								  <th style="width:105px;">Working Days</th>
								  <th>Actions</th>
							  </tr>
						  </thead>   
						  <tbody>
							
							
						
							
						  </tbody>
					  </table>            
					</div>
                   
				</div><!--/span-->
         </ContentTemplate>
            </asp:UpdatePanel>
                 </div>
                


		
				<%-- create boutique --%>
			
					
			

                   <%-- create boutique form--%>
           
                     <div class="row-fluid">
                     

        	     	<div class="box span6">
                          <asp:UpdatePanel ID="upNewBoutique" runat="server" UpdateMode="Always" >
                            <%--  <Triggers><%--Triggered from new boutique button click
                                 <asp:AsyncPostBackTrigger ControlID="btnSaveBoutique" />
                              </Triggers>--%>
                            <ContentTemplate>
                                 <script type="text/javascript">
                                     Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(pageLoaded);
                                     //Sys.WebForms.PageRequestManager.getInstance().add_pageLoading(pageLoadingHandler)
                                     function pageLoaded(sender, args) {
                                                                           
                                         BindBoutiqueAsyncLoad();
                                     }
                                     
                                 </script>
				            	<div class="box-header">
						<h2>New Boutique</h2>
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
                				<button type="submit" class="btn btn-primary" id="btnSaveBoutique" runat="server" onserverclick="NewBoutique_ServerClick">Save</button>

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
                         <div class="box-content" style="height:305px;">
						<div class="form-horizontal">
							<%--<fieldset>--%>

                             <div class="control-group">
								<label class="control-label" for="selectError">Boutiques</label>
								<div class="controls">
								  <select id="selectError" data-rel="chosen">
									<option>Boutiques 1</option>
									<option>Boutiques 2</option>
									<option>Boutiques 3</option>
									<option>Boutiques 4</option>
									<option>albert 5</option>
								  </select>
								</div>
							  </div>

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
