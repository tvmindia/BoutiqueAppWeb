<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" EnableEventValidation="true" CodeBehind="DashBoard.aspx.cs" Inherits="Boutique.AdminPanel.DashBoard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

  
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .highcharts-tooltip>span {
          height:200px;
          width:auto;
          }
    </style>
    
    <link href="../CSS/CustomCSS/Dashboard.css" rel="stylesheet" />
    
   
      <script src="../Scripts/jquery.dataTables.min.js"></script>
    <script src="../Scripts/CommonJS/Common.js"></script>
     <script src="../Home/js/highcharts.js"></script>
    <script src="../Scripts/UserJS/DashBoard.js"></script>      
    <div id="content" class="span10">	
			<ul class="breadcrumb">
				<li>
					<i class="icon-home"></i>
					<a href="DashBoard.aspx">Home</a> 
					<i class="icon-angle-right"></i>
				</li>
				<li><a href="#">Dashboard</a></li>
		</ul>
        <div class="row-fluid"><span class="headerStyle">DashBoard</span></div>
        <div class="row-fluid" style="height:3px;"></div>

        <div class="span12" id="content1" style="align-content:center;width:100%;">
            
        
        
                <%--   Report tiles--%>
				<div class="row-fluid" style="padding-top:25%;">	

				<a class="quick-button metro yellow span2" href="People.aspx">
				<i class="icon-group"></i>
				<p>App Users</p>
				<span class="badge" id="UsersBadge">0</span>
				</a>
                <a class="quick-button metro green span2" href="Products.aspx">
				<i class="icon-tags"></i>
				<p>Products</p>
                <span class="badge" id="TotalProductsBadge">0</span>
				</a>
				<a class="quick-button metro red span2" href="Notifications.aspx">
				<i class="icon-comments-alt"></i>
				<p>Notifications</p>
				<span class="badge" id="NotificationBadge">0</span>
				</a>
				<a class="quick-button metro blue span2" href="Products.aspx?tab=trends">
				<i class="icon-shopping-cart"></i>
				<p>Trends</p>
				<span class="badge" id="VisitsBadge">0</span>
				</a>
				
				<a class="quick-button metro pink span2" href="Products.aspx?tab=OutOfStock">
				<i class="icon-ambulance"></i>
				<p>Not in Stock</p>
				<span class="badge" id="NotInStockBadge">0</span>
				</a>
				<a class="quick-button metro black span2" href="https://play.google.com" target="_blank">
					 <i class="icon-calendar"></i>
					<p>App Usage</p>
                    <span class="badge" id="InstalledBadge">0</span>
				    </a>
				
		   <div class="clearfix"></div>
								
		   </div>
           <%--   Report tiles--%>
           <div class="span12" style="height:30px;">
           </div>			
		   <div class="row-fluid">
           <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto;padding-top:5%;"></div>
		   </div>
	       </div>
        </div>        
		   <input type="hidden" id="hdnBoutiqueID"  runat="server"  value="" />
 
</asp:Content>
