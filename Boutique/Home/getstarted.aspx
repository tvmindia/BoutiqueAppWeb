<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="getstarted.aspx.cs" Inherits="Boutique.Home.getstarted" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Get Started</title>
     <script src="js/jquery.min.js"></script>
    <script src="js/skel.min.js"></script>
    <script src="js/skel-layers.min.js"></script>
    <script src="js/init.js"></script>
   
    <script src="js/engine.js"></script>
         <script type="text/javascript">

             function sendmail() {

                 document.getElementById("<%=lblmsg.ClientID%>").innerHTML = 'Sending...'

            PageMethods.sendMail(document.getElementById("<%=name.ClientID%>").value, document.getElementById("<%=message.ClientID%>").value, document.getElementById("<%=email.ClientID%>").value, document.getElementById("<%=mobile.ClientID%>").value, document.getElementById("<%=boutique.ClientID%>").value, OnSuccess, onError);

            function OnSuccess(response, userContext, methodName) {

                document.getElementById("<%=lblmsg.ClientID%>").innerHTML = response;
                    document.getElementById("<%=name.ClientID%>").value = '';
                    document.getElementById("<%=message.ClientID%>").value = '';
                    document.getElementById("<%=email.ClientID%>").value = '';
                    document.getElementById("<%=mobile.ClientID%>").value = '';
                    document.getElementById("<%=boutique.ClientID%>").value = '';
                }
                function onError(response, userContext, methodName) {

                }

             }


             var speed = 200;
             var showText = function (target, message, index, interval) {
                 if (index < message.length) {
                     $('#<%=lblmsges.ClientID%>').fadeOut('slow',
                    function () {
                        if (index == message.length - 1) { document.getElementById("<%=lblmsges.ClientID%>").style.font.fontsize = '15px;' }
                        document.getElementById("<%=lblmsges.ClientID%>").innerHTML = (message[index++]);
                        $('#<%=lblmsges.ClientID%>').fadeIn('slow')
                    });

                setTimeout(function () { showText(target, message, index, interval); }, interval);
            }
            else {
                showPage();
            }
        }
        $(function () {

            showText("#msg", [''], 0, speed);


        });


         </script>  
    <noscript>

            <style>
               
               
            </style>


			<link rel="stylesheet" href="css/skel.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-xlarge.css" />
		</noscript>

</head>
<body>
    <div id="ActualPage" style="display:none">
    <header id="header" style="position: fixed!important; z-index: 99999!important" class="navbar">
        <h1><a onclick="gohome()">T i q u e s I n n</a></h1>
        <nav id="nav">
            <ul>
                
                 
                <li><a onclick="gohome()">Home</a></li>
                
                
            
             
            </ul>
        </nav>

    </header>

       <section id="contact" class="wrapper contact special">
        <div class="container">
            <header class="major">
                <h2>Get Started</h2>
                <p>Please give your details below, we will contact you to take you online !</p>
            </header>
        </div>
        <div class="container 50%">
            <form id="Form1" action="#" method="post" runat="server">
                <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true" EnablePartialRendering="true" EnableCdn="true"></asp:ScriptManager>
                <div class="row uniform">
                    <div class="6u 12u$(small)">
                        <input name="name" id="name" value="" placeholder="Name" type="text" runat="server" />
                    </div>
                     <div class="6u 12u$(small)">
                        <input name="boutique" id="boutique" value="" placeholder="boutique name" type="text" runat="server" />
                    </div>
                    <div class="6u 12u$(small)">
                        <input name="email" id="email" value="" placeholder="Email" type="email" runat="server" />
                    </div>
                    <div class="6u$ 12u$(small)">
                        <input name="mobile" id="mobile" value="" placeholder="mobile" type="text" runat="server" />
                    </div>
                    <div class="12u$">
                        <textarea name="message" id="message" placeholder="Message (optional) " rows="5" runat="server"></textarea>
                    </div>
                    <div class="12u$">
                        <ul class="actions">
                            <li>
                                <asp:Button ID="sndmsg" runat="server" Text="Send Message" class="special big" OnClientClick="sendmail();return false;" />
                            </li>
                        </ul>
                    </div>
                </div>

                <h2>
                    <asp:Label ID="lblmsg" runat="server" Text="" ForeColor="DarkOrange"></asp:Label></h2>
            </form>
        </div>
    </section>
        </div>
    <div id="loading" class="loadingClass blue">
        <div id="msg"class="msgClass">
            <asp:Label ID="lblmsges" runat="server" Text="" Width="500px" style="text-align:center"></asp:Label></div>
    </div>
</body>
</html>
