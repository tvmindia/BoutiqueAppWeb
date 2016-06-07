<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="DashBoard.aspx.cs" Inherits="Boutique.AdminPanel.DashBoard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
     <link href="../CSS/CustomCSS/Dashboard.css" rel="stylesheet" />
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
        <div class="span12" style="align-content:center;">
            
            <img id="tiqueImage" src="../Home/images/Background.jpg" style="height:550px;" />
        </div>
     <%--   Report tiles--%>
				<div class="row-fluid">	

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
				<a class="quick-button metro blue span2" href="Products.aspx">
					<i class="icon-shopping-cart"></i>
					<p>Trends</p>
					<span class="badge" id="VisitsBadge">0</span>
				</a>
				
				<a class="quick-button metro pink span2" href="Category.aspx">
					<i class="icon-ambulance"></i>
					<p>Not in Stock</p>
					<span class="badge" id="NotInStockBadge">0</span>
				</a>
				<a class="quick-button metro black span2" href="Loyalty.aspx">
					<i class="icon-calendar"></i>
					<p>App Usage</p>
                    <span class="badge" id="InstalledBadge">0</span>
				</a>
				
				<div class="clearfix"></div>
								
			</div><!--/row-->
     <%--   Report tiles--%>
             <div class="span12" style="height:20px;">

             </div>
		
			
		     <%--	<div class="row-fluid">
				
			
				
				<div class="box black span4" onTablet="span6" onDesktop="span4">
					<div class="box-header">
						<h2><i class="halflings-icon white user"></i><span class="break"></span>Last Users</h2>
						<div class="box-icon">
							
						</div>
					</div>
   
					<div class="box-content">
						<ul class="dashboard-list metro LastUsers">
						              
						                            
							
						</ul>
					</div>
				</div><!--/span-->



                <div class="box black span4" onTablet="span6" onDesktop="span4">
					<div class="box-header">
						<h2><i class="halflings-icon white"></i><span class="break"></span>Products</h2>
						<div class="box-icon">
							
						</div>
					</div>
   
					<div class="box-content">
						<ul class="dashboard-list metro products">
						
						</ul>
					</div>
				</div><!--/span-->



             	<div class="box black span4" onTablet="span6" onDesktop="span4">
					<div class="box-header">
						<h2><i class="halflings-icon-comments-alt"></i><span class="break"></span>Notifications</h2>
						<div class="box-icon">
							
						</div>
					</div>
   
					<div class="box-content">
						<ul class="dashboard-list metro Notify">
						              
						                    
							
						</ul>
					</div>
				</div><!--/span-->

			</div>--%>
			
		
			
       

	</div>

        
		
	
</asp:Content>
