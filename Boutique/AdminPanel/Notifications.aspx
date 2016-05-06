<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Notifications.aspx.cs" Inherits="Boutique.AdminPanel.Notifications" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <link href="../CSS/CustomCSS/Notifications.css" rel="stylesheet" />
    <script src="../Scripts/UserJS/Notification.js"></script>
     <div id="content" class="span10">
         	<ul class="breadcrumb">
				<li>
					<i class="icon-home"></i>
					<a href="index.html">Home</a> 
					<i class="icon-angle-right"></i>
				</li>
				<li><a href="#">Notifications</a></li>
			</ul>

       
              <%--  Notification grid--%>
             	<div class="row-fluid sortable">	
				<div class="box span12">
					<div class="box-header">
						<h2>Current Notifications</h2>
						<div class="box-icon">
							
						</div>
					</div>
					<div class="box-content">
                        <%--class="table table-bordered table-striped table-condensed"--%>
						<table class="table table-condensed" id="NotificationTable">
							  <thead>
								  <tr>
									  <th>Title</th>
									  <th>Description</th>
									  <th>Start Date</th>
									  <th>End Date</th>      
                                      <th>Actions</th>                                    
								  </tr>
							  </thead>   
							  <tbody>
								                  
							  </tbody>
						 </table>  
						<%-- <div class="pagination pagination-centered">
						  <ul>
							<li><a href="#">Prev</a></li>
							<li class="active">
							  <a href="#">1</a>
							</li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">Next</a></li>
						  </ul>
						</div>  --%>   
					</div>
				</div><!--/span-->
			</div><!--/row-->

              <%--  Notification grid--%>



         <div class="row-fluid">

                  <div class="box span6">

                  
                  <div class="box-header">
						<h2>New Notification</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
					<div class="box-content"  style="height:503px;overflow:auto;" >
						<div class="form-horizontal">
							<%--<fieldset>--%>
							  <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Title</label>
								<div class="controls">
								  <input class="input-large focused" id="txtTitle" type="text"/>
								</div>
								</div>
							<div class="control-group">
								 <label class="control-label" for="focusedInput">Description</label>
								<div class="controls">
								  <textarea class="form-control" style="max-width:68%" rows="4" id="txtDescription"></textarea>
								</div>
								</div>



                           <div class="control-group">
							  <label class="control-label" for="date01">Start Date</label>
							  <div class="controls">
								<input type="text" class="input-large datepicker" id="dateStartDate" value=""/>
							  </div>
							</div>

                              <div class="control-group">
							  <label class="control-label" for="date01">End Date</label>
							  <div class="controls">
								<input type="text" class="input-large datepicker" id="dateEndDate" value=""/>
							  </div>
							</div>
						
                              <div class="control-group">
								<label class="control-label" for="selectError3">Products</label>
								<div class="controls">
								  <select id="selectError3Cat">
									<option>Product 1</option>
									<option>Product 2</option>
									<option>Product 3</option>
									<option>Product 4</option>
									<option>Product 5</option>
								  </select>
								</div>
							  </div>


                            <div class="control-group">
								<label class="control-label" for="selectError3">Category</label>
								<div class="controls">
								  <select id="selectError3Des">
									<option>Category 1</option>
									<option>Category 2</option>
									<option>Category 3</option>
									<option>Category 4</option>
									<option>Category 5</option>
								  </select>
								</div>
							  </div>


							  </div>
						
					        
						
						</div>

                        <footer class="InnerFooter">
                         <button type="submit" class="btn btn-primary">Save changes</button>
				    	 <button class="btn">Cancel</button>
                         </footer>

              </div>

          </div>

       

     </div>
</asp:Content>
