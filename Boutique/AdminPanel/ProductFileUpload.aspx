<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProductFileUpload.aspx.cs" Inherits="Boutique.AdminPanel.ProductFileUpload" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
  
</head>

<body>
    <script src="../Scripts/jquery-1.9.1.min.js"></script>
   <script src="../Scripts/UserJS/ProductFileUpload.js"></script>
    <link href="../CSS/bootstrap.min.css" rel="stylesheet" />
    <link href="../CSS/CustomCSS/ProductFileUpload.css" rel="stylesheet" />
    <script>
        function showimagepreview(input) {
            
            if (input.files && input.files[0]) {
                var filerdr = new FileReader();
                filerdr.onload = function (e) {

                    $('#<%=imgprvw.ClientID %>').attr('src', e.target.result);

                }
                filerdr.readAsDataURL(input.files[0]);
            }
        }

       
        function OnUpload() 
        {
            var validFiles = ["bmp", "gif", "png", "jpg", "jpeg"];
            var obj = document.getElementById("<%=fileupload.ClientID%>");
            var source = obj.value;
            var ext = source.substring(source.lastIndexOf(".") + 1, source.length).toLowerCase();
            for (var i = 0; i < validFiles.length; i++) 
            {
                if (validFiles[i] == ext)
                    break;
            }
            if (i >= validFiles.length) 
            {
                alert("Format Not Supporting\n\n Try:" + validFiles.join(", "));
                document.getElementById("<%=fileupload.ClientID%>").value = '';
            }
            return true;
        }

    </script>
    <form id="form1" runat="server">
    <div class="span4">
        <asp:fileupload runat="server" onchange="OnUpload();showimagepreview(this);" ID="fileupload"></asp:fileupload>
        <asp:Button runat="server" id="UploadButton" text="Upload"  onclick="UploadButton_Click" />
    <asp:label runat="server" ID="lblFile"/>

         <img id="imgprvw" runat="server" src="" alt="uploaded image preview"/>
    </div>
    </form>
</body>
</html>
