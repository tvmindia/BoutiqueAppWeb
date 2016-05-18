<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProductFileUpload.aspx.cs" Inherits="Boutique.AdminPanel.ProductFileUpload" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

   
</head>

<body>
     <script src="../Scripts/UserJS/ProductFileUpload.js"></script>
    <form id="form1" runat="server">
    <div>
 
        <asp:fileupload runat="server" ID="productfileUpload"></asp:fileupload>
        <asp:Button runat="server" id="UploadButton" text="Upload" onclick="UploadButton_Click" />
    <asp:label runat="server" ID="lblFile"/>
    </div>
    </form>
</body>
</html>
