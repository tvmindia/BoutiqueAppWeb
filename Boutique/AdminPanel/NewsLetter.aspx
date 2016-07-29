<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="NewsLetter.aspx.cs" Inherits="Boutique.AdminPanel.NewsLetter" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/NewsLetter.css" rel="stylesheet" />
     <link href="../CSS/Common.css" rel="stylesheet" />
       <script src="../Scripts/select2.min.js"></script>
 <%--    <link href="../CSS/viewbox.css" rel="stylesheet" />
    <script src="../Scripts/jquery.viewbox.min.js"></script>--%>
    <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Scripts/jquery.dataTables.min.js"></script> 
<%--     <script src="../Scripts/bootstrap-multiselect.js"></script>
    <link href="../CSS/bootstrap-multiselect.css" rel="stylesheet" />--%>
   
    <script src="../Scripts/jquery-ui.min1.10.2.js"></script>
    <link href="../CSS/jquery-ui1.10.2.css" rel="stylesheet" />
    <script src="../Scripts/jquery.multiselect.js"></script>
    <link href="../CSS/jquery.multiselect.css" rel="stylesheet" />
     <script src="../Scripts/UserJS/NewsLetter.js"></script>
        <link href="../CSS/select2.min.css" rel="stylesheet" />
 

    
    <link href="../CSS/bootstrap-dialog.min.css" rel="stylesheet" />
    <script src="../Scripts/bootstrap-dialog.min.js"></script>
    <link href="../CSS/jquery.dataTables.min.css" rel="stylesheet" />
 
<!-- Include the plugin's CSS and JS: -->
   

    <div id="content" class="span10">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home"></i>
                <a href="index.html">Home</a>
                <i class="icon-angle-right"></i>
            </li>
            <li><a href="#">NewsLetter</a></li>
        </ul>
        <div class="row-fluid"><span class="headerStyle">NewsLetter</span>

        </div>
        <div class="row-fluid" style="height: 3px;">

        </div>

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

        <div class="row-fluid" id="NewsLetterDetailsDiv" runat="server">
            
            <div class="box span12" style="box-shadow: 0 0 0 0!important">
                <div class="span12">
                     <div class="box-header">
                      </div>
                <div class="box-content">
                    <ul class="nav tab-menu nav-tabs" id="myTab">
                        <li><a href="#GenerateTemplate" onclick="reloadNewsLetter();"><i class="halflings-icon list-alt"></i>NewsLetter</a></li>
                        <li><a href="#SendMail" onclick="ClearAllControls();"><i class="halflings-icon envelope"></i>Drafts</a></li>
                        <li><a href="#SendList" onclick="ClearAllControls();"><i class=" halflings-icon ok"></i>Sent</a></li>
                        <li><a href="#CreateTemplate" onclick="ClearAllControls();"><i class="halflings-icon edit"></i>New Template</a></li>
                    </ul>
                     <div id="myTabContent" class="tab-content">
                           <div class="tab-pane active" id="GenerateTemplate">
                        <div class="row-fluid">

                             <div class="row-fluid">
                    <div class="box-header">
                        <h2 id="editLabel">Generate NewsLetter</h2>
                        <div class="box-icon">
                        </div>
                    </div>
                    <div class="span6">
                        <div class="form-horizontal">

                            <%--<fieldset>--%>


                            <div class="control-group">
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="template">Template</label>
                                <div class="controls">
                                    <select class="template">
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
                                    <textarea class="form-control" style="max-width: 68%" rows="4" name="Description" id="txtNewsletterDescription"></textarea>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="audience">Audience</label>
                                <div class="controls">
                                          <div id="isActiverdbtn">
								  <label class="radio">
									<input type="radio" name="optionsRadiosActive" id="OptAll" value="true" checked="" style="text-align:left"/>
									All
								  </label>
								
								  <label class="radio">
									<input type="radio" name="optionsRadiosActive" id="OptCustomize" value="false"/>
									Customize
								  </label>
                                        </div>
                                </div>
                                <div class="controls" id="audienceDropDown">
                                    <select class="input-large NewsletterAudience" multiple="multiple" id="idDdlAudience">
                                    </select>
                                </div>
                            </div>
                            <div class="control-group">
                                     <label class="productpaging" id="lblproductno" for="focusedInput" style="visibility:hidden;">You Have Selected <span id="idSelectedImageCount" class=""></span>product(s) out of <span id="idImageCount" class=""> </span></label>
							 
                                 </div>
                            <div class="control-group">
                                 <div class="NewsletterImageholder" id="NewsLetterimagehold">
                             </div>
                            </div>
                             
                        </div>
                    </div>
                    <div class="span5" id="imageupGallery">
                        <div class="form-horizontal">
                            <div class="control-group">
                            </div>
                            <div class="templatePreviewholder" style="width: 100%;" id="templatePreviewImagehold">
                            </div>


                        </div>

                    </div> 
                      </div>
                     <footer class="InnerFooter">
                      <a class="btn btn-primary saveDetails" runat="server" href="#">Save</a>
                      <a class="btn btn-primary templatePreview" runat="server" onclick="Preview();" href="#">NewsLetter Preview</a>
                      </footer>
                         
                        </div>
                                      
                       </div>
                           <div class="tab-pane" id="SendMail">
                               <div class="box-header">
                        <h2>Drafts</h2>
                        <div class="box-icon">
                        </div>
                    </div>
                                 <div class="box-content " style="min-height: 500px;">

                                        <table class="table table-striped table-bordered  bootstrap-datatable" id="NewsLetterTable">
                                            <thead id="newsLetterthead">
                                                <tr>
                                                    <th>Template</th>
                                                    <th>Description</th>
                                                    <th>Audience Count</th>
                                                    <th>Created Date</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody id="newsLetterrows">
                                            </tbody>
                                        </table>

                                    </div>
     </div>
                          <div class="tab-pane" id="SendList">
                                <div class="box-header">
                        <h2>Sent</h2>
                        <div class="box-icon">
                        </div>
                    </div>
                               <div class="box-content " style="min-height: 500px;">

                                        <table class="table table-striped table-bordered  bootstrap-datatable" id="NewsLetterSendTable">
                                            <thead id="newsLetterSendthead">
                                                <tr>
                                                    <th>Template</th>
                                                    <th>Description</th>
                                                    <th>Audience Count</th>
                                                    <th>Created Date</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody id="newsLetterSendrows">
                                            </tbody>
                                        </table>

                                    </div>
                              </div>
                         <div class="tab-pane" id="CreateTemplate">
                                <div class="row-fluid">
                                     <div class="row-fluid">
                                  <div class="box-header">
                        <h2>Create Template</h2>
                        <div class="box-icon">
                        </div>
                    </div>
                               <div class="span6">
                               <div class="form-horizontal">
                                   
                            <div class="control-group">
                            </div>
                             <div class="control-group">
                                <label class="control-label" for="focusedInput">Name</label>
                                <div class="controls">
                                     <input class="input-large focused" name="Title" id="txtTempName" type="text" disabled="disabled"/>
                                </div>
                            </div> 
                                      <div class="control-group">
                                <label class="control-label" for="focusedInput">No Of Images</label>
                                <div class="controls">
                                     <input class="input-large focused" name="Title" id="txtImgCount" type="text" disabled="disabled" />
                                </div>
                            </div>
                                    <div class="control-group">
                                <label class="control-label" for="focusedInput">file</label>
                                <div class="controls">
                                     <input id="tempUpload" type="file" size="60" name="myfile" />
                                </div>
                            </div>
                             </div>
                         </div>
                               <div class="span5" id="tempPreview">
                        <div class="form-horizontal">
                            </div></div>
                                         </div>
                                      <footer class="InnerFooter">
                      <a class="btn btn-primary saveNewTempDetails" href="#">Save</a>
                      </footer>
                                    </div>
                               </div>
                    </div>
                </div>

            </div>
           
            </div>
        </div>
    

        <div class="modal fade" id="HtmlPreview" role="dialog" style="display:none;">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header" style="border-color: #3661C7;">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h3 class="modal-title">NewsLetter Preview</h3>
                    </div>
                    <div class="modal-body" style="max-height: 475px;"> 
                        <div id="HtmlPreviewDisplay">

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="modal fade" id="AudiencePreview" role="dialog" style="display:none;height:auto;width:400px;left:65%;">
 <div class="modal-dialog">
     <div class="modal-content">
         <div class="modal-header" style="border-color: #3661C7;">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h3 class="modal-title">Audience EmailIDs</h3>
                    </div>
         <div class="modal-body" style="max-height: 475px;"> 
                        <div id="AudiencePreviewDisplay">

                        </div>
                        </div>
     </div>
 </div>
        </div>

        <%--Tab Content--%>
          </div>
     <input type="hidden" id="hdfRole" value="" />
    <input type="hidden" id="hdfBoutiqueID" value="" />
</asp:Content>
