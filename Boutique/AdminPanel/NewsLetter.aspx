<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="NewsLetter.aspx.cs" Inherits="Boutique.AdminPanel.NewsLetter" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/NewsLetter.css" rel="stylesheet" />
     <link href="../CSS/Common.css" rel="stylesheet" />
    <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Scripts/UserJS/NewsLetter.js"></script>
        <link href="../CSS/select2.min.css" rel="stylesheet" />
    <script src="../Scripts/select2.min.js"></script>

      <div id="content" class="span10">
             <ul class="breadcrumb">
            <li>
                <i class="icon-home"></i>
                <a href="index.html">Home</a>
                <i class="icon-angle-right"></i>
            </li>
            <li><a href="#">NewsLetter</a></li>
        </ul>
            <div class="row-fluid"><span class="headerStyle">NewsLetter</span></div>
        <div class="row-fluid" style="height: 3px;"></div>

           <%--Alert boxes --%>
        <div class="row-fluid" id="rowfluidDiv" style="display: none;">
            <div class="box span12">

                <div class="box-content alerts">
                    <div class="alert alert-error" style="display: none;">
                        <%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
                        <strong>Operation Not Successfull.</strong>
                    </div>
                    <div class="alert alert-success" style="display: none;">
                        <%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
                        <strong>Successfull.</strong>
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
                        <li><a href="#GenerateTemplate">Generate Template</a></li>
                        <li><a href="#SendMail">Send Mail</a></li>
                    </ul>
                       <div id="myTabContent" class="tab-content">
                            <div class="tab-pane active" id="GenerateTemplate">
                                 <div class="row-fluid ">
                                      <div id="TemplateCreation" runat="server" class="row-fluid">
                                           <div class="box span12">
                                               <div class="box-header">
                                            <h2 id="editLabel">Create NewsLetter</h2>
                                            <div class="box-icon">
                                                <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                                            </div>
                                        </div>
                                                  <div class="box-content" style="height: 503px; overflow-x:hidden;overflow-y:hidden">
                                <div class="form-horizontal">
                                                        <div class="alert alert-block" id="NewsletterErrorBox" style="display:none;">
                                                        <div id="NewsletterDisplaydiv">

                                                         </div>
                                                         </div>
                                                         <div class="control-group">
								                        <label class="control-label" for="template">Template</label>
							                         	<div class="controls">
							 	                        <select class="template" >
                                                        <option></option>
								                        </select>
								                        </div>
							                           </div>
                                                        <div class="control-group">
                                                       <label class="control-label" for="products">Product</label>
                                                       <div class="controls">
                                                       <select class="input-large Newsletterproducts" multiple="multiple" id="idDdlNewsletterproducts">
                            
                                                      </select>
                                                      </div>
                                                      </div>

                                                    
                                                       	<div class="control-group">
								 <label class="control-label" for="focusedInput">Description</label>
								<div class="controls">
								  <textarea class="form-control" style="max-width:68%" rows="4" name="Description" id="txtNewsletterDescription"></textarea>
								</div>
								</div>
                                                        <div class="control-group">
								<label class="control-label" for="audience">Audience</label>
								<div class="controls">
								  <select class="audience" >
                                      <option></option>
								  </select>
								</div>
							  </div>
                                                     
                             
                                      
                                                       </div>
                                                                    <div class="span5" id="TemplatePreview" style="max-height:300px;min-height: 290px;overflow-y:auto;overflow-x:hidden;">
                                        <div class="form-horizontal">
                                        <div class="control-group">
                                   
                                        </div>
                            
                                   <div class="templatePreviewholder" style="width:100%;" id="templatePreviewImagehold">
                                       </div>
                            
                        
                        </div>
                       
                    </div>
                                                 <div class="span12">
                                                  
                                               <div class="NewsletterImageholder" style="width:100%;overflow:auto;" id="NewsLetterimagehold">
				    	                   </div>
                                                             
                                               </div>
                                                      </div>
                                            

                                                 <footer class="InnerFooter">
                                      <a class="btn btn-primary saveDetails" runat="server" href="#">Save</a>
                                   <a class="btn btn-primary templatePreview" runat="server" href="#">Template Preview</a>
                           <%-- <a class="btn btn-primary submitDetails" runat="server" href="#">Send</a>--%>
                                    
                         </footer>
                                               </div>
                                          </div>
                                     </div>
                                </div>
                           </div>
                       </div>
                 </div>
            </div>
      <%--Tab Content--%>
          </div>

</asp:Content>
