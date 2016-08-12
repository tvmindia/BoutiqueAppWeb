<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="BugTracker.aspx.cs" Inherits="Boutique.AdminPanel.BugTracker" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    	<!-- start: Content -->
			<div id="content" class="span10">
			
			
			<ul class="breadcrumb">
				<li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/SaDashBoard.aspx">Home</a> 
					<i class="icon-angle-right"></i>
				</li>
				<li><a href="#">Bug Tracker</a></li>
			</ul>


                  <%--Alert boxes --%>
            <div class="row-fluid" id="rowfluidDiv" style="display:none;">	
				<div class="box span12">

                    <div class="box-content alerts">
						<div class="alert alert-error" style="display:none;">
					
							<strong></strong> 
						</div>
						<div class="alert alert-success" style="display:none;">
					
							<strong></strong> 
						</div>
						
					
					</div>

                </div>
            </div>
	        <%--Alert boxes --%>

			<div class="row-fluid">		
				<div class="box span12">
					<div class="box-header">
						<h2>Bugs</h2>
						
					</div>
					<div class="box-content">
                    <table id="tblData" class="hover">  
           <thead>
              <tr class="gridStyle">
                  <th>ErrorID</th>
                 <th>Boutique</th>
                 <th>User</th>
                 <th>Module</th>
                 <th>Method</th>
                 <th>Source</th>
                 <th>Version</th>
                  <th>Action</th>
              </tr>
           </thead>
           <tbody></tbody>
        </table>
			
					</div>
				</div><!--/span-->
		
			</div>

            <div class="row-fluid" id="rowfluidDetails">
                	<div class="box span12">
					<div class="box-header">
						<h2>Details</h2>
						
					</div>
					<div class="box-content" style="height: 375px;overflow-y:auto;">
                          <div class="form-horizontal">
                              <div class="span6">
                     
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Boutique</label>
                                                    <div class="controls">
                                                      
                                                    
                                                            <label class="control-label" id="txtBoutique" />
                                                  
                                                    </div>
                                                </div>
                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">User</label>
                                                    <div class="controls">
                                                      
                                                         <label class="control-label" id="txtUserName" />
                                                    </div>
                                                </div>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Description</label>
                                                    <div class="controls">
                                                      
                                                  <%--<label class="control-label" id="txtDescription" />--%>
                                                      
                                                          <textarea class="form-control" style="max-width:68%;border: 1.4px none !important;" rows="4" id="txtDescription"></textarea>
                                                    </div>
                                                </div>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Date & Time</label>
                                                    <div class="controls">
                                                      
                                                             <label class="control-label" id="txtErrorDate" />
                                                    </div>
                                                </div>
                                                <div class="control-group">
 
                                                    <label class="control-label" for="focusedInput">Module</label>
                                                    <div class="controls">
                                                      
                                                          <label class="control-label" id="txtModule" />
                                                    </div>
                                                </div>
                                                <div class="control-group">
 
                                                    <label class="control-label" for="focusedInput">Method</label>
                                                    <div class="controls">
                                                       
                                                                <label class="control-label" id="txtMethod" />
                                                     
                                                    </div>
                                                </div>
                         
                               </div>
                                <div class="span6">
                                        <div class="control-group">
 
                                                    <label class="control-label" for="focusedInput">Version</label>
                                                    <div class="controls">
                                                
                                                             <label class="control-label" id="txtVersion" />
                                                    </div>
                                                </div>

                                      <div class="control-group">
 
                                                    <label class="control-label" for="focusedInput">Source</label>
                                                    <div class="controls">
                                                   
                                                          <label class="control-label" id="txtErrorSource" />
                                                    </div>
                                                </div>
                       
                                   <div class="control-group">
 
                                                    <label class="control-label" for="focusedInput">Is Mobile</label>
                                                    <div class="controls">
                                                   
                                                          <label class="control-label" id="txtIsMobile" />
                                                    </div>
                                                </div>
                                                 
                                               
                                                  
                                                   
                                             <div class="control-group">
								<label class="control-label">Is Fixed</label>
								<div class="controls">
                                    <div id="isActiverdbtn">
								  <label class="radio">
									<input type="radio" name="optionsRadiosFixed" id="OptIsFixedYes" value="true" checked=""/>
									Yes
								  </label>
								
								  <label class="radio">
									<input type="radio" name="optionsRadiosFixed" id="OptIsFixedNo" value="false" />
									No
								  </label>
                                        </div>
								</div>
							  </div>
                                                

                               </div>

                                </div>                    
			
					</div>
                    <footer class="InnerFooter">
                    <a class="btn btn-primary UpdateErrror"  href="#">Save</></a>
                   
                    </footer>
				</div><!--/span-->
            </div>

        </div>
        <!-- End: Content -->

    
   <%--  <link href="https://cdn.datatables.net/1.10.12/css/dataTables.bootstrap.min.css" rel="stylesheet" /> --%>
   
  <%--   <script src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>--%>
    
   <%-- <script src="../Scripts/jquery.dataTables.min.js"></script>--%>
   <%--  <script src="https://cdn.datatables.net/1.10.12/js/dataTables.bootstrap.min.js"></script>--%>
    <%-- <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />--%>

    <script src="../Scripts/jquery-1.12.3.js"></script>

    
    
    <script src="../Scripts/jquery.dataTables-1.10.12.js"></script>
   <%-- <script src="../Scripts/DataTables-1.10.4/jquery.dataTables.js"></script>--%>
   
    <link href="../CSS/Common.css" rel="stylesheet" />
    <link href="../CSS/CustomCSS/BugTracker.css" rel="stylesheet" />
    <%--  <script src="../Scripts/custom.js"></script>--%>
     <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Scripts/UserJS/BugTracker.js"></script>

       <input type="hidden" id="hdfErrorID" value=""/>
</asp:Content>
