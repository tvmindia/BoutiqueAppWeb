<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Products.aspx.cs" Inherits="Boutique.AdminPanel.Products" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <link href="../CSS/CustomCSS/Products.css" rel="stylesheet" />
    <link href="../CSS/select2.min.css" rel="stylesheet" />
    <script src="../Scripts/select2.min.js"></script>
    <link href="../CSS/viewbox.css" rel="stylesheet" />
    <script src="../Scripts/jquery.viewbox.min.js"></script>
    <script src="../Scripts/UserJS/Product.js"></script>
    
    <script>
        

    </script>

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
						<div class="imageholder" style="width:100%;" id="productimagehold">
									
								<!--<div id="image-2" class="masonry-thumb">
								         <a style="background:url(../img/gallery/photo11.jpg)" title="Sample Image 2" href="../img/gallery/photo11.jpg"> <img class="grayscale" src="../img/gallery/photo11.jpg" alt="Sample Image 11" /></a>
							       </div>
							 
                                    <div id="image-6" class="masonry-thumb">
								        <a style="background:url(../img/gallery/photo8.jpg)" title="Sample Image 6" href="../img/gallery/photo8.jpg"> <img class="grayscale" src="../img/gallery/photo8.jpg" alt="Sample Image 6" /></a>
						          </div>-->

                            <!-- Use invisible wraper to hide popup window content -->
                           <div style="display:none;">
	                       <div id="popup">
		                   <h3>Popup content</h3>
		                       <p>Some text for popup window.</p>
		                       <p><button type="button" class="close-button">Close</button></p>
	                      </div>
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
                  <div class="span12">

                

                  
                    <div class="box-header">
						<h2>New Products</h2>
						<div class="box-icon">
							
						</div>
					</div>
					<div class="span6"  style="height:500px;overflow:auto;" >
						<div class="form-horizontal">
							<%--<fieldset>--%>


                        <div class="control-group">
                        </div>
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
								 <label class="control-label" for="focusedInput">Discount</label>
								<div class="controls">
								  <input class="input-large focused" id="txtDiscount" type="text"/>
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
                                    <div id="isActiverdbtn">
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
							  </div>
                      
                               <div class="control-group">
                                <label class="control-label" for="selectError1">Categories</label>
                                <div class="controls">
                                <select class="input-large ddlcategories" multiple="multiple" id="idDdlCategories">
                            
                                </select>
                                </div>
                            </div>

                          <%--   <div class="control-group">
                                <label class="control-label" for="selectError1">Related Products</label>
                                <div class="controls">
                                    <select class="input-large ddlrelateproducts" multiple="multiple" id="idDdlrelateproducts">
                                    </select>
                                </div>
                            </div>--%>
                          
                              <div class="control-group">
								<label class="control-label" for="selectError3">Designed By</label>
								<div class="controls">
								   <select class="ddlDesigners" id="idDdlDesigners">
                                     <option></option>
                                   </select>
								</div>
							  </div>

						</div>
              </div>
                    <div class="span5" id="imageupGallery" style="height:500px;overflow:auto;box-shadow:1px 1px 1px #888888;display:none;">
                        <div class="form-horizontal">
                                <div class="control-group">
                                   
                                </div>
                            

                              <div class="control-group">
                               <iframe id="IframeProjectSwitching" src="ProductFileUpload.aspx" style="width: 400px;min-height:195px;max-height:350px;overflow-y:auto;overflow-x:hidden;border:none"></iframe> 
                       		 
                                  <ol id="olpreview" style="list-style:none;">
                                    
                                  </ol>
                              </div>
                        
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
     <input type="hidden" id="hdfproductID" value=""/>
    <input type="hidden" id="hdfBoutiqueID" value="" />
</asp:Content>
