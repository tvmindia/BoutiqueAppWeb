<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="BugTracker.aspx.cs" Inherits="Boutique.AdminPanel.BugTracker" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    	<!-- start: Content -->
			<div id="content" class="span10">
			
			
			<ul class="breadcrumb">
				<li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/DashBoard.aspx">Home</a> 
					<i class="icon-angle-right"></i>
				</li>
				<li><a href="#">Bug Tracker</a></li>
			</ul>

			<div class="row-fluid">		
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2>Bugs</h2>
						
					</div>
					<div class="box-content">
                    <table id="tblData" class="hover">  
           <thead>
              <tr class="gridStyle">
                 <th>Boutique</th>
                 <th>User</th>
                 <th>Module</th>
                 <th>Method</th>
                 <th>Source</th>
                 <th>Version</th>
              </tr>
           </thead>
           <tbody></tbody>
        </table>
			
					</div>
				</div><!--/span-->
		
			</div>

            <div class="row-fluid">
                	<div class="box span12">
					<div class="box-header" data-original-title>
						<h2>Details</h2>
						
					</div>
					<div class="box-content">
                     
                             <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Name</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Admin Name" id="txtAdminName" type="text" />
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">Mobile</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Mobile Number" id="txtMobileAdmin" type="text" onkeypress="return isNumber(event)" />
                                                    </div>
                                                </div>

                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">LoginName</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Login Name" id="txtAdminLoginName" type="text" />
                                                           <label class="control-label"  id="lblAdminLoginName" style=" padding-left:10px; display:none;" />
                                                    </div>
                                                </div>
			
					</div>
                    <footer class="InnerFooter">
                    <a class="btn btn-primary AddAdmin" onclick="return AdminValidation()" href="#">Save</></a>
                    <a class="btn CancelAdmin">Clear</a>
                    </footer>
				</div><!--/span-->
            </div>

        </div>
        <!-- End: Content -->

    
   <%--  <link href="https://cdn.datatables.net/1.10.12/css/dataTables.bootstrap.min.css" rel="stylesheet" /> --%>
     <script src="https://code.jquery.com/jquery-1.12.3.js"></script>
  <%--   <script src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>--%>
    
   <%-- <script src="../Scripts/jquery.dataTables.min.js"></script>--%>
   <%--  <script src="https://cdn.datatables.net/1.10.12/js/dataTables.bootstrap.min.js"></script>--%>
     <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />

    <link href="../CSS/DataTables-1.10.4/css/jquery.dataTables.css" rel="stylesheet" />
    <script src="../Scripts/DataTables-1.10.4/jquery.dataTables.js"></script>
   

    <link href="../CSS/CustomCSS/BugTracker.css" rel="stylesheet" />
     <script src="../Scripts/UserJS/BugTracker.js"></script>
</asp:Content>
