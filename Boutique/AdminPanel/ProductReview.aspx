<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="ProductReview.aspx.cs" Inherits="Boutique.AdminPanel.ProductReview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
      ul.messagesList li span.title {
      width:25%;
      }
      ul.messagesList li span.from {
      padding-left:20px;
      }
      .ProductImage{
          height:200px;
      }
    </style>
    
      <script src="../Scripts/custom.js"></script>
     <script src="../Scripts/jquery.dataTables.min.js"></script>
    <script src="../Scripts/CommonJS/Common.js"></script>
 <script src="../Scripts/UserJS/ProductReview.js"></script>
    <div id="content" class="span10">
      <ul class="breadcrumb">
          <li>
              <i class="icon-home"></i>
              <a href="DashBoard.aspx">Home</a>
              <i class="icon-angle-right"></i>
          </li>
          <li>
             <a href="#">Product Reviews</a>
          </li>
      </ul>

        <div class="row-fluid" style="min-height:700px">
            <div class="span7">
                <h1>Product Review</h1>
                   <div class="row-fluid" style="height: 3px;">

        </div>

        <%--Alert boxes --%>
        <div class="row-fluid" id="rowfluidDiv" style="display: none;">
         

                <div class="box-content alerts">
                
                    <div class="alert alert-info" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
						</div>
                </div>

      
        </div>

        <%--Alert boxes --%>
                <ul class="messagesList" id="ReviewPreview" style="max-height:500px;overflow-y:auto;">

                </ul>
            </div>
            <div class="span5 noMarginLeft">
                <div class="message dark" id="ReviewDetails">
                    <input id="HdnReviewID" type="hidden" />
                </div>

            </div>
        </div>  
    </div>    
</asp:Content>
