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

			<div class="row-fluid sortable">		
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2>Bugs</h2>
						
					</div>
					<div class="box-content">
				<table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Boutique</th>
                <th>User</th>
                <th>Module</th>
                <th>Method</th>
                <th>Source</th>
                <th>Version</th>
            </tr>
        </thead>

        <tfoot>
            <tr>
                <th>Boutique</th>
                <th>User</th>
                <th>Module</th>
                <th>Method</th>
                <th>Source</th>
                <th>Version</th>
            </tr>
        </tfoot>
        
    </table>   
					</div>
				</div><!--/span-->
		
			</div><!--/row-->
        </div>
         End: Content -->

    
    <link href="https://cdn.datatables.net/1.10.12/css/dataTables.bootstrap.min.css" rel="stylesheet" /> 
     <script src="https://code.jquery.com/jquery-1.12.3.js"></script>
     <script src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.12/js/dataTables.bootstrap.min.js"></script>
   <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
     <script src="../Scripts/UserJS/BugTracker.js"></script>
</asp:Content>
