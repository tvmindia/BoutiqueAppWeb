<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="BoutiqueWebsite.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>B e W e D o Official</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <!--[if lte IE 8]><script src="js/html5shiv.js"></script><![endif]-->
    <script src="js/jquery.min.js"></script>
    <script src="js/skel.min.js"></script>
    <script src="js/skel-layers.min.js"></script>
    <script src="js/init.js"></script>
    <script src="js/engine.js"></script>

    
    <script>
        //var message[2]=
        var speed = 1500;
        var showText = function (target, message, index, interval) {
            if (index < message.length) {
                $('#<%=lblmsges.ClientID%>').fadeOut('slow',
                    function () {
                        if (index == message.length - 1) { document.getElementById("<%=lblmsges.ClientID%>").style.font.fontsize='15px;'}
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

            showText("#msg", ['Hi', 'think like customer'], 0, speed);
            

        });


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





    </script>



    <noscript>

            <style>
               
               
            </style>


			<link rel="stylesheet" href="css/skel.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-xlarge.css" />
		</noscript>
</head>
<body class="landing">

    <div id="ActualPage" style="display:none">
    <!-- Header -->
    <header id="header" style="position: fixed!important; z-index: 99999!important" class="navbar">
        <h1><a onclick="SmoothScroll('#banner')">B e W e D o</a></h1>
        <nav id="nav">
            <ul>
                
                 
                <li><a onclick="SmoothScroll('#About')">More</a></li>
                
                <li><a>
                    <div onclick="SmoothScroll('#contact')" class="button special">Get Started</div>
                </a></li>
            
                <!--	<li><a href="#" class="button special">Sign Up</a></li>-->
            </ul>
        </nav>
    </header>

    <!-- Banner -->
    <section id="banner">

        <div id="solgan1">
            <h2 id="bannerName">B e W e D o</h2>
            <p id="bannerCaption">Better We Do !</p>                
              <h3 id="bannerDetailCaption">Some nice Caption goes here about bewedo</h3>
        </div>

      
     
        <br />
         <br />
    </section>



    <section id="About" class="wrapper about special">
        <div class="container">
            <header class="major">
                <h2>About</h2>
                <p>The engine and it's role in your app</p>
            </header>

            <div class="row 150%">

                <div class="12u$ 12u$(medium)">
                    <section class="">
                        <p>
                            This Engine is a multitenant platform. This is far different from hosting your application on a dedicated server or in your own data center. The fundamental difference is that you're not alone! Thousands of other developers are using the same network, hardware, and computing power that Google is offering for use with your applications. At first glance, this might create concern about scalability. Keep in mind that Google is the third largest e-mail provider on the planet and your free App Engine account can scale to 5 million hits per day. Plus, if you need more than that, you can always pay for more resources.
                        </p>
                        <p>
                            This Engine is a multitenant platform. This is far different from hosting your application on a dedicated server or in your own data center. The fundamental difference is that you're not alone! Thousands of other developers are using the same network, hardware, and computing power that Google is offering for use with your applications. At first glance, this might create concern about scalability. Keep in mind that Google is the third largest e-mail provider on the planet and your free App Engine account can scale to 5 million hits per day. Plus, if you need more than that, you can always pay for more resources.
                        </p>
                    </section>
                    <header class="major">
                        <p>Thats the   -BeWeDo-   ENGINE concept all about !</p>
                    </header>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                </div>

            </div>
        </div>
    </section>
    <section id="why" class="wrapper why special">
        <div class="container">
            <header class="major">
                <h2>Why ?</h2>
                <p>Why you need own app ?</p>
            </header>

            <div class="row 150%">

                <div class="12u$ 12u$(medium)">
                    <section class="">
                        <p>
                           Statistics show that the average Indian youth spends more than two hours a day (!) on his or her mobile device. 
                            While probably only a handful of applications make up the bulk of this total usage,
                             it doesn’t change the fact that each user has to unlock, scroll, and scan their device for the apps they’re looking for.
                             Being “in the way” can be an advantage to your company, as our mind unconsciously does record every image and text (or well-designed app icon!) 
                            it comes across — even if it happens unnoticed.
                        </p>
                        <p>
                          Apps serve many functions: they can provide general info, prices, booking forms, search features, user accounts, messengers, news feeds, and much more.
                        One of the biggest benefits of having a mobile app is that all the information you’d like to provide to your customers – including special sales and promotions – is right at their fingertips. Through push notifications you’re getting even closer to a direct interaction, and can easily remind customers about your products and services whenever it makes sense.

                        </p>
                        <p>
                            Talking about on-hand information, how about digitalizing that loyalty program you have in place? Instead of sticking to the old point-collection card, make it possible for your customers to collect their rewards via your mobile app. The result? More downloads and more return customers.
                        </p>
                    </section>
                    <header class="major">
                        <p>Be Visible to Customers at All Times</p>
                        <p>Create a Direct Marketing Channel</p>
                        <p>Provide Value to Your Customers</p>
                        <p>Build Brand and Recognition</p>
                        <p>Improve Customer Engagement</p>
                          <p>Stand Out From the Competition</p>
                          <p>Cultivate Customer Loyalty</p>
                         
                    </header>

                </div>

            </div>
        </div>
    </section>

    <!-- One -->
    <section id="howitworks" class="wrapper howitworks special">
        <div class="container">
            <header class="major">
                <h2>How It Works</h2>
                <p>Its really simple ,Build ,Share & Bring Business</p>
            </header>
            <div class="row 150%">
                <div class="4u 12u$(medium)">
                    <section class="box">
                        <i class="icon big rounded color1 fa-cloud"></i>
                        <h3>Build Your App</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quam consectetur quibusdam magni minus aut modi aliquid.</p>
                    </section>
                </div>
                <div class="4u 12u$(medium)">
                    <section class="box">
                        <i class="icon big rounded color9 fa-desktop"></i>
                        <h3>Share it with customers</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium ullam consequatur repellat debitis maxime.</p>
                    </section>
                </div>
                <div class="4u$ 12u$(medium)">
                    <section class="box">
                        <i class="icon big rounded color6 fa-rocket"></i>
                        <h3>Bring Business</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque eveniet, nesciunt molestias. Ipsam, voluptate vero.</p>
                    </section>
                </div>
            </div>
        </div>
    </section>

    <section id="social" class="wrapper social special">
        <div class="container">
            <header class="major">
                <h2>Social Media</h2>
                <p>Yes, Digital marketing is also a part of it</p>
            </header>

            <div class="row 150%">

                <div class="12u$ 12u$(medium)">
                    <section class="">
                        <p>
                            Our team comprises of people with profound experience in IT 
                                 industry in many domain there by providing latest innovative IT solutions for various industries
                                 . We are a software consulting & solutioning company offering development, software integration and offshore outsourcing services. 
                                 Our business approach combines the most strategic aspects of both onshore and offshore models providing our clients with the highest 
                                 quality projects at significantly reduced costs. Our products or solutions provide our customers latest and cost effective IT practices 
                                 to derive maximum benefits and be successful in their business.
                        </p>
                        <p>
                            Our team comprises of people with profound experience in IT 
                                 industry in many domain there by providing latest innovative IT solutions for various industries
                                 . We are a software consulting & solutioning company offering development, software integration and offshore outsourcing services. 
                                 Our business approach combines the most strategic aspects of both onshore and offshore models providing our clients with the highest 
                                 quality projects at significantly reduced costs. Our products or solutions provide our customers latest and cost effective IT practices 
                                 to derive maximum benefits and be successful in their business.
                        </p>
                    </section>
                    <header class="major">
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                    </header>

                </div>

            </div>
        </div>
    </section>

    <!-- Two -->
    <section id="testrimonials" class="wrapper testrimonials special">
        <div class="container">
            <header class="major">
                <h2>Stories</h2>
                <p>Happy faces says about the engine and their apps</p>
            </header>
            <section class="profiles">
                <div class="row">
                    <section class="3u 6u(medium) 12u$(xsmall) profile">
                        <img src="images/profile_placeholder.gif" alt="" />
                        <h4>Angel</h4>
                        <p>Angels Boutiue</p>
                    </section>
                    <section class="3u 6u$(medium) 12u$(xsmall) profile">
                        <img src="images/profile_placeholder.gif" alt="" />
                        <h4>Prasanna</h4>
                        <p>Collection Butterfly</p>
                    </section>
                    <section class="3u 6u(medium) 12u$(xsmall) profile">
                        <img src="images/profile_placeholder.gif" alt="" />
                        <h4>Sam Alex</h4>
                        <p>Sam & John Style</p>
                    </section>
                    <section class="3u$ 6u$(medium) 12u$(xsmall) profile">
                        <img src="images/profile_placeholder.gif" alt="" />
                        <h4>Roshin</h4>
                        <p>Roshin Boutique</p>
                    </section>
                </div>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </section>
            <footer>

                <ul class="actions">
                    <li>
                        <a href="#" class="button big">See Video</a>
                    </li>
                </ul>
            </footer>
        </div>
    </section>

    <!-- Three -->
    <section id="contact" class="wrapper contact special">
        <div class="container">
            <header class="major">
                <h2>Get Started</h2>
                <p>Please give your details below, we will contact you to take you online !</p>
            </header>
        </div>
        <div class="container 50%">
            <form action="#" method="post" runat="server">
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

    <!-- Footer -->
    <footer id="footer">
        <div class="container">
            <section class="links">
                <div class="row">

                    <section class="4u 8u$(medium) 12u$(small)">
                        <h3>Clients</h3>
                        <ul class="unstyled">
                            <li><a href="#">West LA</a></li>
                            <li><a href="#">Spontiphoria</a></li>
                            <li><a href="#">Bambah</a></li>
                            <li><a href="#">Etoile La Boutique</a></li>
                            <li><a href="#">O-Concept</a></li>
                        </ul>
                    </section>
                    <section class="4u 8u(medium) 12u$(small)">
                        <h3>What Else ?</h3>
                        <ul class="unstyled">
                            <li><a href="#">Branding</a></li>
                            <li><a href="#">Ads</a></li>
                            <li><a href="#">Apps</a></li>
                            <li><a href="#">Solutions</a></li>
                            <li><a href="#">Complete IT Signature for you</a></li>

                        </ul>
                    </section>

                    <section class="4u$ 8u$(medium) 12u$(small)">
                        <h3>Team</h3>
                        <ul class="unstyled">
                            <li><a href="#"> Alb Sree</a></li>
                            <li><a href="#">Tom Gib</a></li>
                            <li><a href="#">Shm Anj</a></li>
                            <li><a href="#">Jin</a></li>
                             
                        </ul>
                    </section>

                </div>
            </section>
            <div class="row">
                <div class="8u 12u$(medium)">
                    <ul class="copyright">
                        <li>&copy; B e W e D o. All rights reserved.</li>
                        <li>a <a href="http://thrithvam.com">thrithvam technology</a> design</li>

                    </ul>
                </div>
                <div class="4u$ 12u$(medium)">
                    <ul class="icons">
                        <li>
                            <a class="icon rounded fa-facebook"><span class="label">Facebook</span></a>
                        </li>
                        <li>
                            <a class="icon rounded fa-twitter"><span class="label">Twitter</span></a>
                        </li>
                        <li>
                            <a class="icon rounded fa-google-plus"><span class="label">Google+</span></a>
                        </li>
                        <li>
                            <a class="icon rounded fa-linkedin"><span class="label">LinkedIn</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
        </div>

        <div id="loading" class="loadingClass">
        <div id="msg"class="msgClass">
            <asp:Label ID="lblmsges" runat="server" Text="" Width="500px" style="text-align:center"></asp:Label></div>
    </div>

</body>
</html>
