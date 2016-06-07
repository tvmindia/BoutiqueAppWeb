<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="OrderStatus.aspx.cs" Inherits="Boutique.AdminPanel.OrderStatus" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/UserJS/OrderStatus.js"></script>
  
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="content" class="span10">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home"></i>
                <a href="DashBoard.aspx">Home</a>
                <i class="icon-angle-right"></i>
            </li>
            <li><a href="#">Order Status</a></li>
        </ul>

        <%--Alert boxes --%>
         <div class="row-fluid" id="rowfluidDiv" style="display:none;">	
				<div class="box span12">

                    <div class="box-content alerts">
						<div class="alert alert-error" style="display:none;">
						
							<strong>Operation Not Successfull.</strong> 
						</div>
						<div class="alert alert-success" style="display:none;">
						
							<strong>Successfull.</strong> 
						</div>						
					</div>

                </div>
            </div>
		
	     <%--//END   Alert boxes --%>

        <div class="row-fluid sortable" id="Orders">
            <div class="box span12">
                <div class="box-header">
                    <h2>Orders</h2>
                    <div class="box-icon">
                        
                    </div>
                </div>
                <div class="box-content TableLayout">
                 
                    <table class="table table-striped table-bordered  bootstrap-datatable" id="OrdersTable">
                        <thead>
                            <tr>
                                <th>OrderNo</th>
                                <th>OrderDescription</th>
                                <th>OrderDate</th>
                                <th>Expected Delivery Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="userrows">
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
      
        <div class="BottomRightInfo" id="loyaltySettingsInfo">

        </div>

    </div>

</asp:Content>
