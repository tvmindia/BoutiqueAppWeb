<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="BoutiqueWebsite.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>T i q u e s I n n Official</title>
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
        var speed = 200;
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

            showText("#msg", [''], 0, speed);
            

        });
 
        var scrollSpeed = 10000;
        var scrollBanner = function (captions, captionIndex) {
            if (captionIndex < captions.length) {

              //  $('#banner').removeClass('banner' + (+(captionIndex) + 1));
               // $('#banner').addClass('banner' + (captionIndex));

                $('#<%=lblCaption.ClientID%>').fadeOut(1200,
                   function () {

                       document.getElementById("<%=lblCaption.ClientID%>").innerHTML = (captions[captionIndex++]);
                       $('#<%=lblCaption.ClientID%>').fadeIn(2300, function () {

                           setTimeout(function () { scrollBanner(captions, captionIndex); }, scrollSpeed);
                       })
                   });

               


            }
            else {

              //  $('#banner').removeClass('banner' + (captionIndex));
               // $('#banner').addClass('banner0');
                startScroll();
            }
        }

        function startScroll() {

            scrollBanner(['Not just a pretty face,&nbsp;&nbsp;&nbsp;It is sophisticated, &nbsp;&nbsp;&nbsp;Do it simple !', 'In-Store experience    takes the centre stage', 'The  personal  bonding  Wins  Customers  for  life'], 0)
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
        <h1><a onclick="SmoothScroll('#banner')">T i q u e s I n n</a></h1>
        <nav id="nav">
            <ul>
                
                 
                <li><a onclick="SmoothScroll('#why')">More</a></li>
                
                <li><a>
                    <div onclick="getstated()" class="button special">Get Started</div>
                </a></li>
            
                <!--	<li><a href="#" class="button special">Sign Up</a></li>-->
            </ul>
        </nav>

    </header>

    <!-- Banner -->
    <section id="banner" class="banner0">

        <div id="solgan1">
            <h2 id="bannerName">T i q u e s I n n</h2>
            <p id="bannerCaption">Boutiques In Person !</p>                
              <h3 id="bannerDetailCaption">
                  <asp:Label ID="lblCaption" runat="server" Text=""></asp:Label></h3>
          
        </div>

      
     
        <br />
         <br />
         
    </section>

  <svg class="arrows">
							<<%--path class="a1" d="M0 0 L30 32 L60 0"></path>--%>
							<path class="a2" d="M0 20 L30 52 L60 20"></path>
							<path class="a3" d="M0 40 L30 72 L60 40"></path>
						</svg>

   
    <section id="why" class="wrapper why special moonrise">
        <div class="container">
            <header class="major">
                <h2>Why you need own app ?</h2>
             
            </header>

            <div class="row 150%">

                <div class="12u$ 12u$(medium)">
                    <section class="">
                        <header class="major">
                        <p class="left">Be Visible to Customers at All Times</p>
                        <p class="left">Create a personal Marketing Channel</p>
                        <p class="left">Provide Value to Your Customers</p>
                        <p class="left">Build Brand and Recognition</p>
                        <p class="right">Improve Customer Engagement</p>
                          <p  class="right">Stand Out From the Competition</p>
                          <p  class="right">Cultivate Customer Loyalty</p>
                         
                    </header>
                    </section>
                    

                </div>

            </div>
        </div>
    </section>
<%-- <section id="About" class="wrapper about special">
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
                        <p>Thats the   -TiquesInn-   ENGINE concept all about !</p>
                    </header>
                   
                </div>

            </div>
        </div>
    </section>--%>
    <!-- One -->
    <section id="howitworks" class="wrapper howitworks special jonquil">
        <div class="container">
            <header class="major">
                <h2>How It Works</h2>
                <p>Its really simple ,Build ,Share & Bring Business</p>
            </header>
            <div class="row 150%">
                <div class="4u 12u$(medium)">
                    <section class="box card">
                        <i class="icon big rounded color1 fa-cloud"></i>
                        <h3>Build Your App</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quam consectetur quibusdam magni minus aut modi aliquid.</p>
                    </section>
                </div>
                <div class="4u 12u$(medium)">
                    <section class="box card">
                        <i class="icon big rounded color9 fa-desktop"></i>
                        <h3>Share it with customers</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium ullam consequatur repellat debitis maxime.</p>
                    </section>
                </div>
                <div class="4u$ 12u$(medium)">
                    <section class="box card">
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
                        <div onclick="getstated();" class="button big">Get Started</div>
                    </li>
                </ul>
            </footer>
        </div>
    </section>

    

    <!-- Footer -->
    <footer id="footer">
        <div class="container">
          <%--  <section class="links">
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
            </section>--%>
            <div class="row">
                <div class="8u 12u$(medium)">
                    <ul class="copyright">
                        <li>&copy; T i q u e s I n n. All rights reserved.</li>
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

        <div id="loading" class="loadingClass black">
        <div id="msg"class="msgClass">
            <asp:Label ID="lblmsges" runat="server" Text="" Width="500px" style="text-align:center"></asp:Label></div>
    </div>
   
</body>
</html>
