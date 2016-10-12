
<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Products.aspx.cs" Inherits="Boutique.AdminPanel.Products" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/Imageload.css" rel="stylesheet" />
    <link href="../CSS/CustomCSS/Products.css" rel="stylesheet" />
    <link href="../CSS/select2.min.css" rel="stylesheet" />
    <link href="../CSS/Common.css" rel="stylesheet" />
    <link href="../CSS/lightbox.css" rel="stylesheet" />
    <script src="../Scripts/select2.min.js"></script>
      <script src="../Scripts/custom.js"></script>
   <script src="../Scripts/jquery.dataTables.min.js"></script>
    <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Home/js/lightbox.js"></script>
    <script src="../Scripts/UserJS/Product.js"></script>
   
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
        padding-left:5px;
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
         <div class="row-fluid"><span class="headerStyle">Products</span>

         </div>
          <div class="row-fluid" style="height:3px;">

          </div>
           <%--Header--%>

             <%--Alert boxes --%>
            <div class="row-fluid" id="rowfluidDiv" style="display:none;">	
				<div class="box span12">

                    <div class="box-content alerts">
						<div class="alert alert-error" style="display:none;">
					
							<strong></strong> 
						</div>
						<div class="alert alert-success" style="display:none;">
					
							<strong></strong> 
						</div>
						
					
					</div>

                </div>
            </div>
	        <%--Alert boxes --%>


           <%--Tab Content--%>
         	<div class="row-fluid">
				
				<div class="box span12">
					<div class="box-header">
						
					</div>
					<div class="box-content">
						<ul class="nav tab-menu nav-tabs" id="myTab">
							<li><a id="idtabnewproducts" href="#newproducts"><i class="halflings-icon ok-circle"></i> All Products</a></li>
							<li class="active"><a id="idtabtrending" href="#trends"><i class="halflings-icon star-empty"></i> Trending</a></li>
							<li><a id="idtaboutofstock" href="#outstock"><i class="halflings-icon warning-sign"></i> Not in Stocks</a></li>
                            <li><a id="idtabdeletedproducts" href="#deletedproducts"><i class="halflings-icon repeat"></i> Revive Products</a></li>
						</ul>
						
						<div id="myTabContent" class="tab-content" style="overflow-x:hidden;overflow-y:hidden;">
							<div class="tab-pane active" id="newproducts">

                                  <%--Search box--%>
                                 <div class="control-group">
								<label class="control-label">New Products</label>
								<div class="controls">
								  <div class="input-append">
									<input id="txtsearchnewproducts" class="txtsearch" placeholder="Search by Product No/Name..." size="16" type="text"/><a class="btn btn-success btnsearchnewproducts btntxtsearch" id="idbtnsearchnewproducts"><i class="halflings-icon white search"></i></a><a class="btn btn-danger btnRefreshnewproducts" href="#"><i class="halflings-icon white refresh"></i></a>
   
                                     
                                      					  </div>
								</div>
							  </div>
                                 <div class="control-group" id="NewCategorySort">
                                      <label class="control-label">Cateory</label>
                                      <div class="controls">
                                      <select class="CategorySort">
                                          <option value="" disabled selected hidden>Select Category..</option>
                                          <option value="All">All</option>
                                      </select>  
                                          </div>
                                     </div> 
                                 <div class="control-group" id="NewPdtSort">
                                     <div class="controls">
                                          <select  class="NewProductsSort" id="NewPdtSelectSort">
                 <option hidden  >Sort By</option>
        <option value="ProductNo">Product No</option>
      <option value="Discount">Discount</option>
        <option value="Price">Price</option>
         <option value="Date">Date</option>

       
      </select>
                </div></div>                
                                     
								 <%--Search box--%>

                              

                                 <%--Gallery new products--%>
                                 <div class="row-fluid" id="newproductgaldiv">
				           
						          <div class="imageholder" style="width:100%;" id="productimagehold">
									
                                      


								
				    	         </div>
                          
			                    </div>
                                 <%--Gallery new products--%>


                              <div class="row-fluid" id="loadmorenewproductdiv" style="margin-top:25px;text-align:center;position:relative;bottom:0;">
                              <a class="btn btn-block loadMore"  id="load_more_button">Load More Products</></a>
                              <div class="animation_image" style="display:none;"><img style="height:20px;width:auto;" src="../img/ajax-loader.gif"/>Loading...</div>
                             </div>

							</div>
                         


							<div class="tab-pane" id="trends">
							    <%--Search box--%>
                                 <div class="control-group">
								<label class="control-label">Trending Products</label>
								<div class="controls">
								  <div class="input-append">
									<input id="txtsearchtrends" class="txtsearch" placeholder="Search by Product No/Name..." size="16" type="text"/><a class="btn btn-success btnsearchtrends btntxtsearch" href="#"><i class="halflings-icon white search"></i></a><a class="btn btn-danger btnRefreshtrends" href="#"><i class="halflings-icon white refresh"></i></a>
								    </div>
								</div>
							  </div>

                                      <div class="control-group" id="TrendingCategorySort">
                                      <label class="control-label">Cateory</label>
                                      <div class="controls">
                                      <select class="TrendingCategorySort">
                                          <option value="" disabled selected hidden>Select Category..</option>
                                          <option value="All">All</option>
                                      </select>   
                                          </div>
                                          </div>
                                 <div class="control-group" id="TrendingSort">
                                     <div class="controls">
                                          <select  class="TrendingSort" id="TrendingSortSelect">
                 <option hidden >Sort By</option>
        <option value="ProductNo">Product No</option>
      <option value="Discount">Discount</option>
        <option value="Price">Price</option>
         <option value="Date">Date</option>

       
      </select>
               </div></div>                 
								 <%--Search box--%>

                                  <%--Gallery Trends--%>
                                 <div class="row-fluid" id="trendingproductgaldiv">
				           
					         	<div class="imageholderTrends" style="width:100%;" id="productTrendsimagehold">
							 
                         
				    	       </div>
				
			                    
			                  </div>
                                  <%--Gallery Trends--%>

                                <div class="row-fluid" id="loadmoretrendproductdiv" style="margin-top:25px;text-align:center;position:relative;bottom:0;">
                              <a class="btn btn-block loadMore" id="load_more_buttontrends" href="#">Load More Products</></a>
                              <div class="animation_image" style="display:none;"><img style="height:20px;width:auto;" src="../img/ajax-loader.gif"/>Loading...</div>
                              </div>

							</div>
                                
                       


							<div class="tab-pane" id="outstock">
								
                                  <%--Search box--%>
                                 <div class="control-group">
								<label class="control-label">Out Of Stocks</label>
								<div class="controls">
								  <div class="input-append">
									<input id="txtsearchoutofstock" class="txtsearch" placeholder="Search by Product No/Name..." size="16" type="text"/><a class="btn btn-success btnsearchoutofstock btntxtsearch" href="#"><i class="halflings-icon white search"></i></a><a class="btn btn-danger btnRefreshoutofproduct" href="#"><i class="halflings-icon white refresh"></i></a>
								  </div>
								</div>
							  </div>
                                   <div class="control-group" id="OutOfStocksCategorySort">
                                      <label class="control-label">Cateory</label>
                                      <div class="controls">
                                      <select class="OutOfStocksCategorySort">
                                          <option value="" disabled selected hidden>Select Category..</option>
                                          <option value="All">All</option>
                                      </select>   
                                          </div>
                                       </div>
                                 <div class="control-group" id="OutOfStocksSort">
                                     <div class="controls">
                                          <select  class="OutOfStockSort" id="OutOfStocksSortSelect">
                 <option hidden >Sort By</option>
        <option value="ProductNo">Product No</option>
      <option value="Discount">Discount</option>
        <option value="Price">Price</option>
         <option value="Date">Date</option>

       
      </select>
            </div>  </div>                                        
								 <%--Search box--%>

                                  <%--Gallery Out of stock--%>
                                 <div class="row-fluid" id="outofstockproductgaldiv">
				           
					     	     <div class="imageholderoutofstock" style="width:100%;" id="productoutofstockimagehold">
						
				    	         </div>
				
			                     </div>
                                  <%--Gallery out of stock--%>

                            

                                 <div class="row-fluid" id="loadmoreoutofstockproductdiv" style="margin-top:25px;text-align:center;position:relative;bottom:0;">
                              <a class="btn btn-block loadMore" id="load_more_buttonoutofstock" href="#">Load More Products</></a>
                              <div class="animation_image" style="display:none;"><img style="height:20px;width:auto;" src="../img/ajax-loader.gif"/>Loading...</div>
                              </div>
                             </div>

                       

                            <div class="tab-pane" id="deletedproducts">
                                   <%--Search box--%>
                                 <div class="control-group">
								<label class="control-label">Deleted Products</label>
								<div class="controls">
								  <div class="input-append">
									<input id="txtdeletproductsearch" class="txtsearch" placeholder="Search by Product No/Name..." size="16" type="text"/><a class="btn btn-success btnsearchreviveproduct btntxtsearch" href="#"><i class="halflings-icon white search"></i></a><a class="btn btn-danger btnRefreshreviveproduct" href="#"><i class="halflings-icon white refresh"></i></a>
								 
                                   
      
                                       </div>
								</div>
							  </div>

                                  <div class="control-group" id="CategorySort">
                                      <label class="control-label">Cateory</label>
                                      <div class="controls">
                                              <select class="ReviveCategorySort">
                                          <option value="" disabled selected hidden>Select Category..</option>
                                          <option value="All">All</option>
                                      </select>  
                                          </div>
                                  </div>

                                <div class="control-group" id="Sort">
                                     
                                      <div class="controls">
                                                                              <select  class="ReviveSort" id="SortSelect">
                 <option hidden >Sort By</option>
        <option value="ProductNo">Product No</option>
      <option value="Discount">Discount</option>
        <option value="Price">Price</option>
         <option value="Date">Date</option>

       
      </select>
                                          </div>
                                  </div>
								 <%--Search box--%>


                                  <%--Gallery Revive product--%>
                                 <div class="row-fluid" id="reviveproductgaldiv">
				           
					     	     <div class="imageholderreviveproduct" style="width:100%;" id="productreviveimagehold">
						
				    	         </div>
				
			                     </div>
                                  <%--Gallery Revive product--%>


                                 <div class="row-fluid" id="loadmoredeletedproductdiv" style="margin-top:25px;text-align:center;position:relative;bottom:0;">
                              <a class="btn btn-block loadMore" id="load_more_buttonreviveproducts" href="#">Load More Products</></a>
                              <div class="animation_image" style="display:none;"><img style="height:20px;width:auto;" src="../img/ajax-loader.gif"/>Loading...</div>
                              </div>



                             </div>


                            </div>

                      

						</div>
					</div>
				</div><!--/span-->
			
			 
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
						


                             <div class="control-group">
                            </div>
                    		  <div class="control-group">
				    			  <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" id="txtName" onkeypress="return blockSpecialChar(event)" type="text"/>
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
                                      
								<input class="input-large focused" id="txtPrice" placeholder ="<%= this.UA.BoutiqueCurrencySymbol %>" type="text" onkeypress="return isNumber(event)"/>
                                      
								</div>
								</div>

                          
                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Discount</label>
								<div class="controls">
                                    
								  <input class="input-large focused" id="txtDiscount" placeholder="<%= this.UA.BoutiqueCurrencySymbol %>" type="text" onkeypress="return isNumber(event)"/>
                                        
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
                                <div class="control-group">
								 <label class="control-label" for="focusedInput">Tags</label>
								<div class="controls">
								 <%-- <textarea class="form-control" style="max-width:68%" rows="4" id="txtTags"></textarea>--%>
                                     <div id="tags">
 
                                      <input type="text" value="" id="txtTags" placeholder="Add a tag" />
                                     </div>
								</div>
								</div>
						</div>
                    </div>
                    <div class="span5" id="imageupGallery" style="max-height:550px;overflow-y:auto;overflow-x:hidden;">
                        <div class="form-horizontal">
                               <div class="control-group">
                               </div>
                               <div class="control-group">
                                     <label class="control-label" id="lblproductno" for="focusedInput">Product No: <span id="idproductno" class=""></span></label>
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
                          <a class="btn btn-primary AddProduct" onclick="return ProductValidation();">Save</></a>
                          <a class="btn btn-primary ModifyProduct" onclick="return ProductValidationEdit();"><i class="halflings-icon th"></i>Save</></a>
						  <a class="btn btn-danger DeleteProduct">Delete</></a>
                          <a class="btn btn-warning ReviveProduct">Revive</a>
                          <a class="btn btn-primary CancelProduct">New</a>
						
             </footer> 
             
         </div>
     </div>
     <input type="hidden" id="hdfproductID" value=""/>
    <input type="hidden" id="hdfBoutiqueID" value="" />
</asp:Content>

