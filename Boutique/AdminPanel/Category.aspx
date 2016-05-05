<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Category.aspx.cs" Inherits="Boutique.AdminPanel.Category" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <link href="../CSS/CustomCSS/Category.css" rel="stylesheet" />
     <script src="../Scripts/UserJS/Category.js"></script>

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
                                      <th>Category Code</th>
									  <th>Category Name</th>
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
								 <label class="control-label" for="focusedInput">Category Code</label>
								<div class="controls">
								  <input class="input-large focused" id="txtCatCode" type="text"/>
								</div>
								</div>

                              <div class="control-group">
								<label class="control-label" for="focusedInput">Category Name</label>
								<div class="controls">
								  <input class="input-large focused" id="txtCategoryName" type="text"/>
								</div>
								</div>
                            						
						</div>
						
							 
							<%--</fieldset>--%>
						</div>

                    <footer class="InnerFooter">
                				

                          <a class="btn btn-primary AddCategory" href="#">Save</></a>
							
                           <a class="btn CancelCategory">Cancel</a>
						
                     </footer> 
                    </div>

          </div>

     </div>
     <input type="hidden" id="hdfCategoryID" value=""/>

</asp:Content>
