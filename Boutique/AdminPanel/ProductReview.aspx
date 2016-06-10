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
    </style>
    

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
        <div class="row-fluid">
            <div class="span7">
                <h1>Product Review</h1>
                <ul class="messagesList" id="ReviewPreview">

                </ul>
            </div>
            <div class="span5 noMarginLeft">
                <div class="message dark">

                </div>

            </div>
        </div>  
    </div>    
</asp:Content>
