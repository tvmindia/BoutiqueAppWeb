<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Category.aspx.cs" Inherits="Boutique.AdminPanel.Category" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <link href="../CSS/CustomCSS/Category.css" rel="stylesheet" />

     <div id="content" class="span10">

          <ul class="breadcrumb">
				<li>
					<i class="icon-home"></i>
					<a href="DashBoard.aspx">Home</a> 
					<i class="icon-angle-right"></i>
				</li>
				<li><a href="#">Category</a></li>
			</ul>
          <div class="row-fluid">


               <%--  Grid Category--%>

               <div class="box span12">
					<div class="box-header">
						<h2> Categories</h2>
						<div class="box-icon">
							
						</div>
					</div>
					<div class="box-content">
						<table class="table table-condensed" id="CategoryTable">
							  <thead>
								  <tr>
									  <th>Category</th>
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
						</div>     --%>
					</div>
				</div>

             <%-- Grid Category--%>
          </div>

          <div class="row-fluid">

               <div class="box span12">
					<div class="box-header">
						<h2>New Category</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
					<div class="box-content"  style="height:215px;overflow:auto;" >
						<div class="form-horizontal">
							<%--<fieldset>--%>
						   <div class="control-group">
								 <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <textarea class="form-control" style="max-width:68%" rows="4" id="txtName"></textarea>
								</div>
								</div>
                            						
						</div>
						
							 
							<%--</fieldset>--%>
						</div>

                    <footer class="InnerFooter">
                				<button type="submit" class="btn btn-primary">Save changes</button>
								<button class="btn">Cancel</button>
						
                     </footer> 
                    </div>

          </div>

     </div>

</asp:Content>
