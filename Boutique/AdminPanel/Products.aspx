<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Products.aspx.cs" Inherits="Boutique.AdminPanel.Products" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <link href="../CSS/CustomCSS/Products.css" rel="stylesheet" />
    <link href="../CSS/select2.min.css" rel="stylesheet" />
    <script src="../Scripts/select2.min.js"></script>
   <%-- <link href="../CSS/jasny-bootstrap.min.css" rel="stylesheet" />
    <script src="../Scripts/jasny-bootstrap.min.js"></script>--%>
   <%-- <script src="../Scripts/bootstrap-select-1.6.3.js"></script>--%>
   


    <script src="../Scripts/UserJS/Product.js"></script>


     <div id="content" class="span10">

         <ul class="breadcrumb">
				<li>
					<i class="icon-home"></i>
					<a href="DashBoard.aspx">Home</a> 
					<i class="icon-angle-right"></i>
				</li>
				<li><a href="#">Products</a></li>
			</ul>


           <%--Gallery--%>
         <div class="row-fluid sortable">
				<div class="box span12">
					<div class="box-header">
						<h2> Products</h2>
						<div class="box-icon">
							
						</div>
					</div>
					<div class="box-content">
						<div class="masonry-gallery">
									<div id="image-1" class="masonry-thumb">
								         <a style="background:url(../img/gallery/photo10.jpg)" title="Sample Image 1" href="../img/gallery/photo10.jpg">   <img class="grayscale" src="../img/gallery/photo10.jpg" alt="Sample Image 1" /></a>
						        	</div>
									<div id="image-2" class="masonry-thumb">
								         <a style="background:url(../img/gallery/photo11.jpg)" title="Sample Image 2" href="../img/gallery/photo11.jpg"> <img class="grayscale" src="../img/gallery/photo11.jpg" alt="Sample Image 11" /></a>
							       </div>
							       <div id="image-3" class="masonry-thumb">
								         <a style="background:url(../img/gallery/photo3.jpg)" title="Sample Image 3" href="../img/gallery/photo3.jpg"> <img class="grayscale" src="../img/gallery/photo3.jpg" alt="Sample Image 3" /></a>
						           </div>
								   <div id="image-4" class="masonry-thumb">
          
								         <a style="background:url(../img/gallery/photo6.jpg)" title="Sample Image 4" href="../img/gallery/photo6.jpg"> <img class="grayscale" src="../img/gallery/photo6.jpg" alt="Sample Image 6" /></a>
						        	</div>
								   <div id="image-5" class="masonry-thumb">
								        <a style="background:url(../img/gallery/photo7.jpg)" title="Sample Image 5" href="../img/gallery/photo7.jpg"> <img class="grayscale" src="../img/gallery/photo7.jpg" alt="Sample Image 7" /></a>
						          </div>

                                   <div id="image-6" class="masonry-thumb">
								        <a style="background:url(../img/gallery/photo8.jpg)" title="Sample Image 6" href="../img/gallery/photo8.jpg"> <img class="grayscale" src="../img/gallery/photo8.jpg" alt="Sample Image 6" /></a>
						          </div>
														
														
					</div>
					</div>
				</div><!--/span-->
			
			</div><!--/row-->
           <%--Gallery--%>

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
						<h2>New Products</h2>
						<div class="box-icon">
							
						</div>
					</div>
					<div class="box-content"  style="height:503px;overflow:auto;" >
						<div class="form-horizontal">
							<%--<fieldset>--%>


                           <%--  fileupload with preview --%>
							<%--<div class="fileinput fileinput-new" data-provides="fileinput">
                           <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                           <img data-src="holder.js/100%x100%" alt="..."/>
                         </div>
                         <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                         <div>
                            <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="..."></span>
                            <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                           </div>
                        </div>--%>
							 <%--  fileupload with preview--%>
                        	
                                <%--<div class="control-group">
								<label class="control-label">Is Main Picture?</label>
								<div class="controls">
								  <label class="checkbox inline">
									<input type="checkbox" id="chkIsMainPicture" value="option1"/>Yes</label>
		    					  </div>
							  </div>--%>





							  <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" id="txtName" type="text"/>
								</div>
								</div>
							<div class="control-group">
								 <label class="control-label" for="focusedInput">Description</label>
								<div class="controls">
								  <textarea class="form-control" style="max-width:68%" rows="4" id="txtDescription"></textarea>
								</div>
								</div>
							  

                             
                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Price</label>
								<div class="controls">
								  <input class="input-large focused" id="txtPrice" type="text"/>
								</div>
								</div>

                             
                          

                            <div class="control-group">
								<label class="control-label">Is OutofStock</label>
								<div class="controls">
								  <label class="radio">
									<input type="radio" name="optionsRadiosOutStock" id="OptisOutOfStockYes" value="true"/>
									Yes
								  </label>
								
								  <label class="radio">
									<input type="radio" name="optionsRadiosOutStock" id="OptisOutOfStockNo" value="false" checked=""/>
									No
								  </label>
								</div>
							  </div>

                              <div class="control-group">
								<label class="control-label">Is Active</label>
								<div class="controls">
								  <label class="radio">
									<input type="radio" name="optionsRadiosActive" id="OptIsActiveYes" value="true" checked=""/>
									Yes
								  </label>
								
								  <label class="radio">
									<input type="radio" name="optionsRadiosActive" id="OptIsActiveNo" value="false"/>
									No
								  </label>
								</div>
							  </div>

                        
                            <div class="control-group">
                                <label class="control-label" for="selectError1">Categories</label>
                                <div class="controls">
                                <select class="ddlcategories" multiple="multiple" id="idDdlCategories">
                            
                                </select>
                                </div>
                            </div>


                            <div class="control-group">
								<label class="control-label" for="selectError3">Designed By</label>
								<div class="controls">
								   <select class="ddlDesigners" id="idDdlDesigners">
                            
                                </select>
								</div>
							  </div>

						</div>
           
              </div>
                    <footer class="InnerFooter">
                          <a class="btn btn-primary AddProduct" href="#">Save</></a>
							
                          <a class="btn CancelProduct">Cancel</a>
						
                     </footer> 
               


              </div>
         </div>


     
     </div>

</asp:Content>
