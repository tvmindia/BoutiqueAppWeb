<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="NewsLetter.aspx.cs" Inherits="Boutique.AdminPanel.NewsLetter" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/NewsLetter.css" rel="stylesheet" />
     <link href="../CSS/Common.css" rel="stylesheet" />
       <script src="../Scripts/select2.min.js"></script>
     <link href="../CSS/viewbox.css" rel="stylesheet" />
    <script src="../Scripts/jquery.viewbox.min.js"></script>
    <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Scripts/UserJS/NewsLetter.js"></script>
        <link href="../CSS/select2.min.css" rel="stylesheet" />
 

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.34.7/css/bootstrap-dialog.min.css"/>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.34.7/js/bootstrap-dialog.min.js"></script>

    <script>
        function Preview()
        {
            $('#HtmlPreview').modal('show');
        }
    </script>
   
    <style>
 .modal{
     height:80%;
     width:50%;
    }
    </style>

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

        <div class="row-fluid" id="productDetailsDiv" runat="server">
            
            <div class="box span12" style="box-shadow: 0 0 0 0!important">
                <div class="span12">
                     <div class="box-header">
                </div>
                <div class="box-content">
                    <ul class="nav tab-menu nav-tabs" id="myTab">
                        <li><a href="#GenerateTemplate">Generate Template</a></li>
                        <li><a href="#SendMail">Send Mail</a></li>
                    </ul>
                     <div id="myTabContent" class="tab-content">
                           <div class="tab-pane active" id="GenerateTemplate">
                    <div class="box-header">
                        <h2 id="editLabel">New Template</h2>
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
                                    <select class="audience">
                                        <option></option>
                                    </select>
                                </div>
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
                         <div class="tab-pane" id="SendMail">
     </div>
                 </div>
                </div>

            </div>
            <footer class="InnerFooter">
                <a class="btn btn-primary saveDetails" runat="server" href="#">Save</a>
                <a class="btn btn-primary templatePreview" runat="server" onclick="Preview();" href="#">Template Preview</a>

            </footer>
            </div>
        </div>
    

        <div class="modal fade" id="HtmlPreview" role="dialog" style="display:none;">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header" style="border-color: #3661C7;">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h3 class="modal-title">Template Preview</h3>
                    </div>
                    <div class="modal-body" style=""> 
                        <div id="HtmlPreviewDisplay">

                        </div>
                        </div>
                    </div>
                </div>
            </div>


        <%--Tab Content--%>
          </div>

</asp:Content>
