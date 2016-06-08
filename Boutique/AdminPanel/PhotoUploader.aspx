<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PhotoUploader.aspx.cs" Inherits="Boutique.AdminPanel.PhotoUploader" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
     <script src="../Scripts/jquery-1.9.1.min.js"></script>
   <script src="../Scripts/UserJS/PhotoUploader.js"></script>
    <link href="../CSS/bootstrap.min.css" rel="stylesheet" />
    <link href="../CSS/style.css" rel="stylesheet" />
   <link href="../CSS/CustomCSS/PhotoUploader.css" rel="stylesheet" />
   <link href="../CSS/CustomCSS/People.css" rel="stylesheet" />
    <script>
       

        function showimagepreview(input) {

            if (input.files && input.files[0]) {
                var filerdr = new FileReader();
                filerdr.onload = function (e) {
                    $('#imgprvw').attr('src', e.target.result);
                }
                filerdr.readAsDataURL(input.files[0]);
            }
        }


        function OnUpload() {
            var validFiles = ["bmp", "gif", "png", "jpg", "jpeg"];
            var obj = document.getElementById("<%=fileupload.ClientID%>");
            var source = obj.value;
            var ext = source.substring(source.lastIndexOf(".") + 1, source.length).toLowerCase();
            for (var i = 0; i < validFiles.length; i++) {
                if (validFiles[i] == ext)
                    break;
            }
            if (i >= validFiles.length) {
                alert("Format Not Supporting\n\n Try:" + validFiles.join(", "));
                document.getElementById("<%=fileupload.ClientID%>").value = '';
            }
            return true;
        }

        function imageChoose() {

            var lblmsg = document.getElementById("<%=lblFile.ClientID%>");
            lblmsg.innerHTML = '';
            $('#<%=fileupload.ClientID%>').click();

        }
    </script>
     <style>

   select, input[type="file"] 
   {
    height: 30px;
    line-height: 30px;
    display:none;

}

    </style>
    <form id="form1" runat="server">
         <div class="span4">
        <div>

       <label class="choose">
        <asp:fileupload runat="server" onchange="OnUpload();showimagepreview(this);" ID="fileupload"></asp:fileupload>
       </label>
       
    <asp:label runat="server" ID="lblFile"/>
         <img id="imgprvw" onclick="imageChoose();" style="height:150px;width:150px;" src="../img/defaultimages.jpg" alt="Click here to Upload Image"/>
             <asp:Button CssClass="btn1" runat="server" id="UploadButton" text="Upload" onclick="UploadButton_Click" />
            </div>
             </div>
    <div>
    
    </div>
    </form>
</body>
</html>
