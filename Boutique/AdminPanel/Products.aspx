<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Products.aspx.cs" Inherits="Boutique.AdminPanel.Products" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/Imageload.css" rel="stylesheet" />
    <link href="../CSS/CustomCSS/Products.css" rel="stylesheet" />
    <link href="../CSS/select2.min.css" rel="stylesheet" />
    <link href="../CSS/Common.css" rel="stylesheet" />
    
    <script src="../Scripts/select2.min.js"></script>
    <link href="../CSS/viewbox.css" rel="stylesheet" />
    <script src="../Scripts/jquery.viewbox.min.js"></script>
    <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Scripts/UserJS/Product.js"></script>
    
    <script>
        

    </script>
    <style>
        .thumb:hover{
            border:2px solid #ffd800;
            
        }
          .thumb 
        {/*for image uploader preview html 5*/
        height: 155px;
        width:120px;
        border: 1px solid #000;
        margin: 10px 5px 0 0;   
        }
           .Maindiv{
           float: inherit;
           display: inline-flex;
           width: 100%;
           flex-flow: wrap;
           margin:10px 10px 10px 10px;
        }
 input[type="checkbox"].checkDes
{
    vertical-align: middle!important;
    display: inline-block!important;
    margin-bottom: 0!important;
    min-height: 30px!important;
    cursor:pointer!important;
    line-height: normal!important;
    position:relative;
    bottom:164px;
    left:77px;
    /*transform:scale(2);*/
    
}

    input[type="image"].imgdelete{
             bottom: 140px;
             left: 97px;
             position: relative;

         }

    .imgpreviewdiv{
        height: 200px;
        width:120px;
        padding-left:10px;
      }


        </style>
     <div id="content" class="span10">

         <ul class="breadcrumb">
				<li>
					<i class="icon-home"></i>
					<a href="DashBoard.aspx">Home</a> 
					<i class="icon-angle-right"></i>
				</li>
				<li><a href="#">Products</a></li>
			</ul>
           <%--Header--%>
         <div class="row-fluid"><span class="headerStyle">Products</span></div>
          <div class="row-fluid" style="height:3px;"></div>
           <%--Header--%>

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


           <%--Tab Content--%>
         	<div class="row-fluid">
				
				<div class="box span12">
					<div class="box-header">
						<h2><span class="break"></span>Products Gallery</h2>
					</div>
					<div class="box-content">
						<ul class="nav tab-menu nav-tabs" id="myTab">
							<li><a id="idtabnewproducts" href="#newproducts">New Products</a></li>
							<li class="active"><a id="idtabtrending" href="#trends">Trending</a></li>
							<li><a id="idtaboutofstock" href="#outstock">Out of Stocks</a></li>
						</ul>
						 
						<div id="myTabContent" class="tab-content" style="overflow-x:hidden;overflow-y:hidden;">
							<div class="tab-pane active" id="newproducts">

                                  <%--Search box--%>
                                 <div class="control-group">
								<label class="control-label">New Products</label>
								<div class="controls">
								  <div class="input-append">
									<input id="txtsearchnewproducts" placeholder="Search by Product No/Name..." size="16" type="text"/><a class="btn btnsearchnewproducts" href="#">Search</a>
								  </div>
								</div>
							  </div>
								 <%--Search box--%>

                              

                                 <%--Gallery new products--%>
                                 <div class="row-fluid">
				           
						          <div class="imageholder" style="width:100%;" id="productimagehold">
									
								
				    	         </div>
                          
			                    </div>
                                 <%--Gallery new products--%>
                              <div class="row-fluid" style="margin-top:25px;text-align:center;position:relative;bottom:0;">
                              <a class="btn btn-block loadMore"  id="load_more_button">Load More Products</></a>
                              <div class="animation_image" style="display:none;"><img style="height:20px;width:auto;" src="../img/ajax-loader.gif"/>Loading...</div>
                             </div>

							</div>
                            <%--popup content for image--%>
                           <div style="display:none;">
	                       <div id="popup" style="max-height:680px;overflow-y:auto;">
		                       <h3>Popup content</h3>
		                       <img id="imgzoom" style="width:100%!important;height:100%!important;" src="../img/gallery/photo10.jpg"/>
		                   </div>
                          </div>
                           <%--popup content for image--%>
							<div class="tab-pane" id="trends">
							    <%--Search box--%>
                                 <div class="control-group">
								<label class="control-label">Trending Products</label>
								<div class="controls">
								  <div class="input-append">
									<input id="txtsearchtrends" placeholder="Search by Product No/Name..." size="16" type="text"/><a class="btn btnsearchtrends" href="#">Search</a>
								  </div>
								</div>
							  </div>
								 <%--Search box--%>

                                  <%--Gallery Trends--%>
                                 <div class="row-fluid">
				           
					         	<div class="imageholderTrends" style="width:100%;" id="productTrendsimagehold">
							 
                         
				    	       </div>
				
			                    
			                  </div>
                                  <%--Gallery Trends--%>

                                <div class="row-fluid" style="margin-top:25px;text-align:center;position:relative;bottom:0;">
                              <a class="btn btn-block loadMore" id="load_more_buttontrends" href="#">Load More Products</></a>
                              <div class="animation_image" style="display:none;"><img style="height:20px;width:auto;" src="../img/ajax-loader.gif"/>Loading...</div>
                              </div>

							</div>
                                
                           <%--popup content for image--%>
                           <div style="display:none;">
	                       <div id="popuptrends" style="max-height:680px;overflow-y:auto;">
		                   <h3>Popup content</h3>
		                   <img id="imgzoomtrends" style="width:100%!important;height:100%!important;" src="../img/gallery/photo10.jpg"/>
		                   </div>
                           </div>
                           <%--popup content for image--%>


							<div class="tab-pane" id="outstock">
								
                                  <%--Search box--%>
                                 <div class="control-group">
								<label class="control-label">Out Of Stocks</label>
								<div class="controls">
								  <div class="input-append">
									<input id="txtsearchoutofstock" placeholder="Search by Product No/Name..." size="16" type="text"/><a class="btn btnsearchoutofstock" href="#">Search</a>
								  </div>
								</div>
							  </div>
								 <%--Search box--%>

                                  <%--Gallery Out of stock--%>
                                 <div class="row-fluid">
				           
					     	     <div class="imageholderoutofstock" style="width:100%;" id="productoutofstockimagehold">
						
				    	         </div>
				
			                     </div>
                                  <%--Gallery out of stock--%>

                              <div class="row-fluid" style="margin-top:25px;text-align:center;position:absolute;bottom:0;">
                              <a class="btn btn-block loadMore" id="load_more_buttonoutofstock" href="#">Load More Products</></a>
                              <div class="animation_image" style="display:none;"><img style="height:20px;width:auto;" src="../img/ajax-loader.gif"/>Loading...</div>
                             </div>
							</div>

                           <%--popup content for image--%>  
                           <div style="display:none;">
	                       <div id="popupoutofstock" style="max-height:680px;overflow-y:auto;">
		                   <h3>Popup content</h3>
		                   <img id="imgzoomoutofstock" style="width:100%!important;height:100%!important;" src="../img/gallery/photo10.jpg"/>
		                   </div>
                           </div>
                           <%--popup content for image--%>

						</div>
					</div>
				</div><!--/span-->
			
			   </div>	
		   <%--Tab Content--%>
 
	        


          

        


         <div class="row-fluid" id="productDetailsDiv" runat="server">

              <div class="box span12" style="box-shadow:0 0 0 0!important">
                  <div class="span12">
                    <div class="box-header">
						<h2 id="editLabel">New Products</h2>
						<div class="box-icon">
							
						</div>
					</div>
					<div class="span6"  style="min-height:530px;" >
						<div class="form-horizontal">
                            <div class="alert alert-error" id="ErrorBox" style="display:none;">
                                <div id="Displaydiv">

                                </div>
                            </div>
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

                             <div class="control-group">
                                <label class="control-label" for="selectError1">Related Products</label>
                                <div class="controls">
                                    <select class="input-large ddlrelateproducts" multiple="multiple" id="idDdlrelateproducts">
                                    </select>
                                </div>
                            </div>
                          
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
                    <div class="span5" id="imageupGallery" style="max-height:550px;overflow-y:auto;overflow-x:hidden;">
                        <div class="form-horizontal">
                                <div class="control-group">
                                   
                                </div>
                            

                              <div class="control-group">
                                 
                               <iframe id="IframeProjectSwitching" src="ProductFileUpload.aspx" style="width:100%;min-height:195px;max-height:350px;overflow-y:auto;overflow-x:hidden;border:none;display:none"></iframe> 
                       		    <span id="previewmsg"></span>
                                 
                                  <div id="Preview" class="Maindiv">
                                 
                                     
                                  </div>

                              </div>
                        
                        </div>
                       
                    </div>
                        </div>
                   
              </div>
              <footer class="InnerFooter">
                          <a class="btn btn-primary AddProduct" onclick="return ProductValidation();" href="#">Save</></a>
                          <a class="btn btn-primary ModifyProduct" href="#"><i class="halflings-icon th"></i>Save</></a>
						  <a class="btn btn-primary DeleteProduct" href="#">Delete</></a>
                          <a class="btn CancelProduct">Cancel</a>
						
             </footer> 
             
         </div>
     </div>
     <input type="hidden" id="hdfproductID" value=""/>
    <input type="hidden" id="hdfBoutiqueID" value="" />
</asp:Content>

