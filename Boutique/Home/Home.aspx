<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="Boutique.Home.Home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>T I Q U E S I N N</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    
    <!-- Facebook and Twitter integration -->
	<meta property="og:title" content=""/>
	<meta property="og:image" content=""/>
	<meta property="og:url" content=""/>
	<meta property="og:site_name" content=""/>
	<meta property="og:description" content=""/>
	<meta name="twitter:title" content="" />
	<meta name="twitter:image" content="" />
	<meta name="twitter:url" content="" />
	<meta name="twitter:card" content="" />

    <link href="Homecss/animate.css" rel="stylesheet" />
    <link href="Homecss/icomoon.css" rel="stylesheet" />
    <link href="Homecss/magnific-popup.css" rel="stylesheet" />
    <link href="Homecss/owl.carousel.min.css" rel="stylesheet" />
    <link href="Homecss/owl.theme.default.min.css" rel="stylesheet" />
    <link href="Homecss/simple-line-icons.css" rel="stylesheet" />
    <link href="Homecss/style.css" rel="stylesheet" />
    <script src="Homejs/modernizr-2.6.2.min.js"></script>
</head>
<body>
   <%-- <form id="form1" runat="server">
    <div>
    
    </div>
    </form>--%>
    <div id="fh5co-offcanvass">
		<ul>
			<li class="active"><a href="#" data-nav-section="home">Home</a></li>
			<li><a href="#" data-nav-section="features">Features</a></li>
			<%--<li><a href="#" data-nav-section="design">Design</a></li>
			<li><a href="#" data-nav-section="testimonies">Testimonies</a></li>
			<li><a href="#" data-nav-section="products">Products</a></li>
			<li><a href="#" data-nav-section="benefits">Benefits</a></li>--%>
			<li><a href="#" data-nav-section="pricing">Pricing</a></li>
			<li><a href="#" data-nav-section="faqs">FAQs</a></li>
		</ul>
		<h3 class="fh5co-lead">Connect with us</h3>
		<p class="fh5co-social-icons">
			<a href="#"><i class="icon-twitter"></i></a>
			<a href="#"><i class="icon-facebook"></i></a>
			<a href="#"><i class="icon-instagram"></i></a>
			<a href="#"><i class="icon-dribbble"></i></a>
			<a href="#"><i class="icon-youtube"></i></a>
		</p>
	</div>
	
	<div id="fh5co-menu" class="navbar">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle" data-toggle="collapse" data-target="#fh5co-navbar" aria-expanded="false" aria-controls="navbar"><span>Menu</span> <i></i></a>
					<a href="http://www.tiquesinn.com/adminpanel/Login.aspx" class="navbar-brand"><span>Admin Panel</span></a>
				</div>
			</div>
		</div>
	</div>

	<div id="fh5co-page">
		<div id="fh5co-wrap">
			<header id="fh5co-hero" data-section="home" role="banner" style="background: url(Home/images/bg_2.jpg) top left; background-size: cover;" >
				<div class="fh5co-overlay"></div>
				<div class="fh5co-intro">
					<div class="container">
						<div class="row">
							
							<div class="col-md-6 fh5co-text">
								<h2 class="to-animate intro-animate-1">We promote your business to the next level.</h2>
								<p class="to-animate intro-animate-2">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.</p>
								<p class="to-animate intro-animate-3"><a href="#" class="btn btn-primary btn-md"><i class="icon-android"></i> See on GoogleStore</a></p>
							</div>
							<div class="col-md-6 text-right fh5co-intro-img to-animate intro-animate-4">
								<img src="../Home/images/iphone_6_3.png" alt="iphone 6s"/>
							</div>

						</div>
					</div>						
				</div>
			</header>
			<!-- END .header -->
			
			<div id="fh5co-main">
				<div id="fh5co-clients">
					<div class="container">
						<div class="row text-center">
							<div class="col-md-3 col-sm-6 col-xs-6 to-animate">
								<figure class="fh5co-client"><img src="../Home/images/client_1.png" alt="client1"/></figure>
							</div>
							<div class="col-md-3 col-sm-6 col-xs-6 to-animate">
								<figure class="fh5co-client"><img src="../Home/images/client_2.png" alt="client2"/></figure>
							</div>
							<div class="col-md-3 col-sm-6 col-xs-6 to-animate">
								<figure class="fh5co-client"><img src="../Home/images/client_3.png" alt="client3"/></figure>
							</div>
							<div class="col-md-3 col-sm-6 col-xs-6 to-animate">
								<figure class="fh5co-client"><img src="../Home/images/client_4.png" alt="client4"/></figure>
							</div>
						</div>
					</div>
				</div>
				<div id="fh5co-features" data-section="features">


					<div class="container">
						<div class="row">
							<div class="col-md-8 col-md-offset-2 fh5co-section-heading text-center">
								<h2 class="fh5co-lead to-animate">Explore amazing features</h2>
								<p class="fh5co-sub to-animate">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
							</div>
							<div class="col-md-3 col-sm-6 col-xs-6 col-xxs-12">
								<a href="#" class="fh5co-feature to-animate">
									<span class="fh5co-feature-icon"><i class="icon-mustache"></i></span>
									<h3 class="fh5co-feature-lead">100% Free</h3>
									<p class="fh5co-feature-text">Far far away behind the word mountains</p>
								</a>
							</div>
							<div class="col-md-3 col-sm-6 col-xs-6 col-xxs-12">
								<a href="#" class="fh5co-feature to-animate">
									<span class="fh5co-feature-icon"><i class="icon-screen-smartphone"></i></span>
									<h3 class="fh5co-feature-lead">Fully Responsive</h3>
									<p class="fh5co-feature-text">Far far away behind the word mountains</p>
								</a>
							</div>
							<div class="clearfix visible-sm-block"></div>
							<div class="col-md-3 col-sm-6 col-xs-6 col-xxs-12">
								<a href="#" class="fh5co-feature to-animate">
									<span class="fh5co-feature-icon"><i class="icon-eye"></i></span>
									<h3 class="fh5co-feature-lead">Retina-ready</h3>
									<p class="fh5co-feature-text">Far far away behind the word mountains</p>
								</a>
							</div>
							<div class="col-md-3 col-sm-6 col-xs-6 col-xxs-12">
								<a href="#" class="fh5co-feature to-animate">
									<span class="fh5co-feature-icon"><i class="icon-cloud-download"></i></span>
									<h3 class="fh5co-feature-lead">Download</h3>
									<p class="fh5co-feature-text">Far far away behind the word mountains</p>
								</a>
							</div>

							<div class="clearfix visible-sm-block"></div>

							<div class="fh5co-spacer fh5co-spacer-sm"></div>

							<div class="col-md-4 col-md-offset-4 text-center to-animate">
								<a href="#" class="btn btn-primary">View All Features</a>
							</div>
			        	</div>
			       </div>
			       

			    </div>
				


			    <div id="fh5co-features-2" data-section="design">
					<div class="fh5co-features-2-content">
					    <div class="container">
					    	<div class="row">
					    		<div class="col-md-8 col-md-offset-2 fh5co-section-heading text-center">
									<h2 class="fh5co-lead to-animate">Better design</h2>
									<p class="fh5co-sub to-animate">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
								</div>
					    		<div class="col-md-4 fh5co-text-wrap">
					    			<div class="row text-center">
						    			<div class="col-md-12 col-sm-6 col-xs-6 col-xxs-12 fh5co-text animate-object features-2-animate-3">
						    				<span class="fh5co-icon"><i class="icon-screen-desktop"></i></span>
											<h4 class="fh5co-uppercase-sm">Cross platform support</h4>
											<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
										</div>
										<div class="col-md-12 col-sm-6 col-xs-6 col-xxs-12 fh5co-text animate-object features-2-animate-4">
											<span class="fh5co-icon"><i class="icon-anchor"></i></span>
											<h4 class="fh5co-uppercase-sm">Prototyping tools</h4>
											<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
										</div>
										
									</div>
					    		</div>
					    		<div class="col-md-4 col-md-push-4 fh5co-text-wrap">
					    			<div class="row text-center">
						    			<div class="col-md-12 col-sm-6 col-xs-6 col-xxs-12 fh5co-text animate-object features-2-animate-5">
						    				<span class="fh5co-icon"><i class="icon-rocket"></i></span>
											<h4 class="fh5co-uppercase-sm">Powerful design</h4>
											<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
										</div>
										<div class="col-md-12 col-sm-6 col-xs-6 col-xxs-12 fh5co-text animate-object features-2-animate-6">
											<span class="fh5co-icon"><i class="icon-people"></i></span>
											<h4 class="fh5co-uppercase-sm">User Collaboration</h4>
											<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
										</div>
										
									</div>
					    		</div>
					    		<div class="col-md-4 col-md-pull-4 fh5co-image animate-object features-2-animate-2">
					    			<p class="text-center">
					    			<img src="../Home/images/iphone_blank_2.png" class="" alt="Outline Free HTML5 Responsive Bootstrap Template"/>
					    			</p>
					    		</div>
					    		
					    	</div>
					    </div>
					</div>	

			    </div>


			    <div id="fh5co-testimony" data-section="testimonies">
				    <div class="container">
				    	<div class="row animate-box">

							<div class="owl-carousel">

								<div class="item">
									<div class="col-md-3 col-sm-3 col-xs-4 col-xxs-12">
						    			<figure class="fh5co-vcard"><img src="../Home/images/user.jpg" alt="Free HTML5 Template by FREEHTML5.co" class="img-responsive"/></figure>
						    		</div>
						    		<div class="col-md-9 col-sm-9 col-xs-8 col-xxs-12">
						    			<blockquote>
						    				<p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
						    			</blockquote>
						    			<p class="fh5co-author fh5co-uppercase-sm"><span>Gustav Barrow</span>, XYZ Inc.</p>
						    		</div>
						    	</div>

						    	<div class="item">
									<div class="col-md-3 col-sm-3 col-xs-4 col-xxs-12">
						    			<figure class="fh5co-vcard"><img src="../Home/images/user_2.jpg" alt="Free HTML5 Template by FREEHTML5.co" class="img-responsive"/></figure>
						    		</div>
						    		<div class="col-md-9 col-sm-9 col-xs-8 col-xxs-12">
						    			<blockquote>
						    				<p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
						    			</blockquote>
						    			<p class="fh5co-author fh5co-uppercase-sm"><span>Gustav Barrow</span>, XYZ Inc.</p>
						    		</div>
						    	</div>

						    	<div class="item">
									<div class="col-md-3 col-sm-3 col-xs-4 col-xxs-12">
						    			<figure class="fh5co-vcard"><img src="../Home/images/user_3.jpg" alt="Free HTML5 Template by FREEHTML5.co" class="img-responsive"/></figure>
						    		</div>
						    		<div class="col-md-9 col-sm-9 col-xs-8 col-xxs-12">
						    			<blockquote>
						    				<p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
						    			</blockquote>
						    			<p class="fh5co-author fh5co-uppercase-sm"><span>Gustav Barrow</span>, XYZ Inc.</p>
						    		</div>
						    	</div>


						    </div>

				    	</div>
				    </div>
			    </div>

			    
				<div id="fh5co-counter" class="fh5co-bg-section" style="background-image: url(Home/images/bg_1.jpg); background-attachment: fixed;">
					<div class="fh5co-overlay"></div>
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div class="fh5co-hero-wrap">
									<div class="fh5co-hero-intro text-center to-animate counter-animate">
										<div class="col-md-4 text-center">
											<span class="fh5co-counter js-counter" data-from="0" data-to="28" data-speed="5000" data-refresh-interval="50"></span>
											<span class="fh5co-counter-label">Customers</span>
											
										</div>
										<div class="col-md-4 text-center">
											<span class="fh5co-counter js-counter" data-from="0" data-to="57" data-speed="5000" data-refresh-interval="50"></span>
											<span class="fh5co-counter-label">Completed Apps</span>
										</div>
										<div class="col-md-4 text-center">
											<span class="fh5co-counter js-counter" data-from="0" data-to="34023" data-speed="5000" data-refresh-interval="50"></span>
											<span class="fh5co-counter-label">Downloads</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div id="fh5co-products" data-section="products">

				    <div class="container">
						<div class="row">
							<div class="col-md-8 col-md-offset-2 fh5co-section-heading text-center">
								<h2 class="fh5co-lead animate-single product-animate-1">Other awesome Apps</h2>
								<p class="fh5co-sub animate-single product-animate-2">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
							</div>
						

							<div class="col-md-3 col-sm-6 col-xs-6 col-xxs-12">
								<a href="../Home/images/product_1.jpg" class="fh5co-figure to-animate image-popup">
									<figure>
										<img src="../Home/images/product_1.jpg" alt="Free HTML5 Responsive Template" class="img-responsive"/>
									</figure>
									<h3 class="fh5co-figure-lead">Product Name</h3>
									<p class="fh5co-figure-text">Far far away behind the word mountains</p>
								</a>
							</div>
							<div class="col-md-3 col-sm-6 col-xs-6 col-xxs-12">
								<a href="images/product_2.jpg" class="fh5co-figure to-animate image-popup">
									<figure>
										<img src="../Home/images/product_2.jpg" alt="Free HTML5 Responsive Template" class="img-responsive"/>
									</figure>
									<h3 class="fh5co-figure-lead">Product Name</h3>
									<p class="fh5co-figure-text">Far far away behind the word mountains</p>
								</a>
							</div>
							<div class="clearfix visible-sm-block"></div>
							<div class="col-md-3 col-sm-6 col-xs-6 col-xxs-12">
								<a href="images/product_3.jpg" class="fh5co-figure to-animate image-popup">
									<figure>
										<img src="../Home/images/product_3.jpg" alt="Free HTML5 Responsive Template" class="img-responsive"/>
									</figure>
									<h3 class="fh5co-figure-lead">Product Name</h3>
									<p class="fh5co-figure-text">Far far away behind the word mountains</p>
								</a>
							</div>
							<div class="col-md-3 col-sm-6 col-xs-6 col-xxs-12">
								<a href="../Home/images/product_4.jpg" class="fh5co-figure to-animate image-popup">
									<figure>
										<img src="../Home/images/product_4.jpg" alt="Free HTML5 Responsive Template" class="img-responsive"/>
									</figure>
									<h3 class="fh5co-figure-lead">Product Name</h3>
									<p class="fh5co-figure-text">Far far away behind the word mountains</p>
								</a>
							</div>

							<div class="clearfix visible-sm-block"></div>

							<div class="fh5co-spacer fh5co-spacer-sm"></div>

							<div class="col-md-4 col-md-offset-4 text-center to-animate">
								<a href="#" class="btn btn-primary">View All Products</a>
							</div>
			        	</div>
				    </div>
				   
				</div>

				<div id="fh5co-features-3" data-section="benefits">
					<div class="container">
						<div class="row">
							<div class="col-md-8 col-md-offset-2 fh5co-section-heading text-center">
								<h2 class="fh5co-lead animate-single features3-animate-1">Benefits of this App</h2>
								<p class="fh5co-sub animate-single features3-animate-2">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
							</div>

							<div class="col-md-4 col-sm-6 text-center fh5co-text-wrap">
								<div class="fh5co-text to-animate">
				    				<span class="fh5co-icon"><i class="icon-screen-desktop"></i></span>
									<h4 class="fh5co-uppercase-sm">Cross platform support</h4>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 text-center fh5co-text-wrap">
								<div class="fh5co-text to-animate">
				    				<span class="fh5co-icon"><i class="icon-graph"></i></span>
									<h4 class="fh5co-uppercase-sm">Cross platform support</h4>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
								</div>
							</div>
							
							<div class="clearfix visible-sm-block"></div>

							<div class="col-md-4 col-sm-6 text-center fh5co-text-wrap">
								<div class="fh5co-text to-animate">
				    				<span class="fh5co-icon"><i class="icon-anchor"></i></span>
									<h4 class="fh5co-uppercase-sm">Cross platform support</h4>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
								</div>
							</div>	

							<div class="col-md-4 col-sm-6 text-center fh5co-text-wrap">
								<div class="fh5co-text to-animate">
				    				<span class="fh5co-icon"><i class="icon-camera"></i></span>
									<h4 class="fh5co-uppercase-sm">Cross platform support</h4>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
								</div>
							</div>

							<div class="clearfix visible-sm-block"></div>

							<div class="col-md-4 col-sm-6 text-center fh5co-text-wrap">
								<div class="fh5co-text to-animate">
				    				<span class="fh5co-icon"><i class="icon-present"></i></span>
									<h4 class="fh5co-uppercase-sm">Cross platform support</h4>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 text-center fh5co-text-wrap">
								<div class="fh5co-text to-animate">
				    				<span class="fh5co-icon"><i class="icon-energy"></i></span>
									<h4 class="fh5co-uppercase-sm">Cross platform support</h4>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
								</div>
							</div>



						</div>
					</div>
				</div>
				
				<div class="fh5co-bg-section cta" id="fh5co-cta" style="background-image: url(Home/images/hero_bg.jpg); background-attachment: fixed;">
					<div class="fh5co-overlay"></div>
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div class="fh5co-hero-wrap">
									<div class="fh5co-hero-intro text-center">
										<div class="row">
											<div class="col-md-8 col-md-offset-2 fh5co-section-heading text-center">
												<h2 class="fh5co-lead to-animate">Try Outline App today!</h2>
												<p class="fh5co-sub to-animate">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
												<div class="to-animate"><a href="#" class="btn btn-primary">Get Started!</a></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div id="fh5co-pricing" data-section="pricing">
					<div class="container">
						<div class="row">
							<div class="col-md-8 col-md-offset-2 fh5co-section-heading text-center">
								<h2 class="fh5co-lead animate-single pricing-animate-1">Plans built for every one</h2>
								<p class="fh5co-sub animate-single pricing-animate-2">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
							</div>

							<div class="col-md-3 to-animate">
								<a href="#" class="fh5co-figure">
									<span class="fh5co-price">$1<span>/month</span></span>
									<h3 class="fh5co-figure-lead">Starter</h3>
									<p class="fh5co-figure-text">Far far away behind the word mountains</p>
								</a>
							</div>
							<div class="col-md-3 to-animate">
								<a href="#" class="fh5co-figure">
									<span class="fh5co-price">$25<span>/month</span></span>
									<h3 class="fh5co-figure-lead">Regular</h3>
									<p class="fh5co-figure-text">Far far away behind the word mountains</p>
								</a>
							</div>
							<div class="col-md-3 to-animate">
								<a href="#" class="fh5co-figure active pricing-feature">
									<span class="fh5co-price">$59<span>/month</span></span>
									<h3 class="fh5co-figure-lead">Plus</h3>
									<p class="fh5co-figure-text">Far far away behind the word mountains</p>
								</a>
							</div>
							<div class="col-md-3 to-animate">
								<a href="#" class="fh5co-figure">
									<span class="fh5co-price">$125<span>/month</span></span>
									<h3 class="fh5co-figure-lead">Enterprise</h3>
									<p class="fh5co-figure-text">Far far away behind the word mountains</p>
								</a>
							</div>
						</div>
					</div>
				</div>

				<div id="fh5co-faqs"  data-section="faqs">
					<div class="container">
						<div class="row">
							<div class="col-md-8 col-md-offset-2 fh5co-section-heading text-center">
								<h2 class="fh5co-lead animate-single faqs-animate-1">Frequently Ask Questions</h2>
								<p class="fh5co-sub animate-single faqs-animate-2">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
							</div>
						</div>
					</div>
					

					<div class="container">
						<div class="faq-accordion active to-animate">
							<span class="faq-accordion-icon-toggle active"><i class="icon-arrow-down"></i></span>
							<h3>What is Outline?</h3>
							<div class="faq-body" style="display: block;">
								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
							</div>
						</div>
						<div class="faq-accordion to-animate">
							<span class="faq-accordion-icon-toggle"><i class="icon-arrow-down"></i></span>
							<h3>Is Outline Free?</h3>
							<div class="faq-body">
								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
							</div>
						</div>
						<div class="faq-accordion to-animate">
							<span class="faq-accordion-icon-toggle"><i class="icon-arrow-down"></i></span>
							<h3>How do I use Outline Features?</h3>
							<div class="faq-body">
								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
							</div>
						</div>
						<div class="faq-accordion to-animate">
							<span class="faq-accordion-icon-toggle"><i class="icon-arrow-down"></i></span>
							<h3>Which version of iOS do your apps support?</h3>
							<div class="faq-body">
								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
							</div>
						</div>
						<div class="faq-accordion to-animate">
							<span class="faq-accordion-icon-toggle"><i class="icon-arrow-down"></i></span>
							<h3>What languages are available?</h3>
							<div class="faq-body">
								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
							</div>
						</div>
						<div class="faq-accordion to-animate">
							<span class="faq-accordion-icon-toggle"><i class="icon-arrow-down"></i></span>
							<h3>I have technical problem, who do I email?</h3>
							<div class="faq-body">
								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
							</div>
						</div>
					</div>
				</div>

				<div id="fh5co-subscribe">
					<div class="container">
						<div class="row animate-box">
							<form action="#" method="post">
								<div class="col-md-3 col-sm-3">
									<div class="form-group">
										<input type="text" class="form-control" placeholder="First Name"/>
									</div>
								</div>
								<div class="col-md-3 col-sm-3">
									<div class="form-group">
										<input type="text" class="form-control" placeholder="Last Name"/>
									</div>
								</div>
								<div class="col-md-3 col-sm-3">
									<div class="form-group">
										<input type="email" class="form-control" placeholder="Email"/>
									</div>
								</div>
								<div class="col-md-3 col-sm-3">
									<div class="form-group">
										<input type="submit" class="btn btn-primary" value="Subscribe"/>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>


			</div>
		</div>

		<footer id="fh5co-footer" style="">
			<div class="fh5co-overlay"></div>
			<div class="fh5co-footer-content">
				<div class="container">
					<div class="row">
						<div class="col-md-3 col-sm-4 col-md-push-3">
							<h3 class="fh5co-lead">About</h3>
							<ul>
								<li><a href="#">Tour</a></li>
								<li><a href="#">Company</a></li>
								<li><a href="#">Jobs</a></li>
								<li><a href="#">Blog</a></li>
								<li><a href="#">New Features</a></li>
								<li><a href="#">Contact Us</a></li>
							</ul>
						</div>
						<div class="col-md-3 col-sm-4 col-md-push-3">
							<h3 class="fh5co-lead">Support</h3>
							<ul>
								<li><a href="#">Help Center</a></li>
								<li><a href="#">Terms of Service</a></li>
								<li><a href="#">Security</a></li>
								<li><a href="#">Privacy Policy</a></li>
								<li><a href="#">Careers</a></li>
								<li><a href="#">More Apps</a></li>
							</ul>
						</div>
						<div class="col-md-3 col-sm-4 col-md-push-3">
							<h3 class="fh5co-lead">More Links</h3>
							<ul>
								<li><a href="#">Feedback</a></li>
								<li><a href="#">Frequently Ask Questions</a></li>
								<li><a href="#">Terms of Service</a></li>
								<li><a href="#">Privacy Policy</a></li>
								<li><a href="#">Careers</a></li>
								<li><a href="#">More Apps</a></li>
							</ul>
						</div>

						<div class="col-md-3 col-sm-12 col-md-pull-9">
							<div class="fh5co-footer-logo"><a href="index.html">Outline</a></div>
							<p class="fh5co-copyright"><small>&copy; 2016. All Rights Reserved. <br>	by <a href="" target="_blank">Tiquesinn.com</a> Images: <a href="http://pexels.com/" target="_blank">Pexels</a></small></p>
							<p class="fh5co-social-icons">
								<a href="#"><i class="icon-twitter"></i></a>
								<a href="#"><i class="icon-facebook"></i></a>
								<a href="#"><i class="icon-instagram"></i></a>
								<a href="#"><i class="icon-dribbble"></i></a>
								<a href="#"><i class="icon-youtube"></i></a>
							</p>
						</div>
						
					</div>
				</div>
			</div>
		</footer>
	</div>
    <script src="Homejs/jquery.min.js"></script>
    <script src="Homejs/jquery.easing.1.3.js"></script>
    <script src="Homejs/bootstrap.min.js"></script>
    <script src="Homejs/jquery.waypoints.min.js"></script>
    <script src="Homejs/jquery.magnific-popup.min.js"></script>
    <script src="Homejs/owl.carousel.min.js"></script>
    <script src="Homejs/jquery.countTo.js"></script>
    <script src="Homejs/main.js"></script>
</body>
</html>
