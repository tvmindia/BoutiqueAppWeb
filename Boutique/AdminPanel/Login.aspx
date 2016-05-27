<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Boutique.AdminPanel.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   

    <!-- start: Meta -->
	<meta charset="utf-8">
	<title>Boutique</title>
	
	
	
	<!-- end: Meta -->
	
	<!-- start: Mobile Specific -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- end: Mobile Specific -->
	
	
	<!-- start: CSS -->
    <link href="../CSS/bootstrap.min.css" rel="stylesheet" />
    <link href="../CSS/bootstrap-responsive.min.css" rel="stylesheet" />
    <link href="../CSS/style.css" rel="stylesheet" />
    <link href="../CSS/style-responsive.css" rel="stylesheet" />
    <link href="../CSS/googleapiFont.css" rel="stylesheet" />
	<!-- end: CSS -->
	
	

	
		
	<!-- start: Favicon -->
	<link rel="shortcut icon" href="img/favicon.ico">
	<!-- end: Favicon -->
	
			<style type="text/css">
			body { background: url("../img/bg-login.jpg") !important; }
		</style>
</head>
<body>
   <div class="container-fluid-full">
		<div class="row-fluid">
					
			<div class="row-fluid">
				<div class="login-box">
					<div class="icons">
						<a href="index.html"><i class="halflings-icon home"></i></a>
						<a href="#"><i class="halflings-icon cog"></i></a>
					</div>
					<h2>Login to your account</h2>
					<form class="form-horizontal" action="index.html" method="post">
						<fieldset>
							
							<div class="input-prepend" title="Username">
								<span class="add-on"><i class="halflings-icon user"></i></span>
								<input class="input-large span10" name="username" id="username"  runat="server" type="text" placeholder="Username"/>
							</div>
							<div class="clearfix"></div>

							<div class="input-prepend" title="Password">
								<span class="add-on"><i class="halflings-icon lock"></i></span>
								<input class="input-large span10" name="password" id="password" runat="server" type="password" placeholder="Password"/>
							</div>
							<div class="clearfix"></div>
							
							<label class="remember" for="remember"><input type="checkbox" id="remember" />Remember me</label>

							<div class="button-login">	
								<button type="submit" class="btn btn-primary loginbtn">Login</button>
							</div>
							<div class="clearfix"></div>
					</form>
					<hr>
					<h3>Forgot Password?</h3>
					<p>
						No problem, <a href="#">click here</a> to get a new password.
					</p>	
				</div><!--/span-->
			</div><!--/row-->
			

	</div><!--/.fluid-container-->
	
		</div><!--/fluid-row-->
	
	<!-- start: JavaScript-->
<script src="../Scripts/jquery-1.9.1.min.js"></script>
<script src="../Scripts/jquery-migrate-1.0.0.min.js"></script>
<script src="../Scripts/jquery-ui-1.10.0.custom.min.js"></script>
<script src="../Scripts/jquery.ui.touch-punch.js"></script>
<script src="../Scripts/modernizr.js"></script>
<script src="../Scripts/bootstrap.min.js"></script>
<script src="../Scripts/jquery.cookie.js"></script>
<script src="../Scripts/fullcalendar.min.js"></script>
<script src="../Scripts/jquery.dataTables.min.js"></script>
<script src="../Scripts/excanvas.js"></script>
<script src="../Scripts/jquery.flot.js"></script>
<script src="../Scripts/jquery.flot.pie.js"></script>
<script src="../Scripts/jquery.flot.stack.js"></script>
<script src="../Scripts/jquery.flot.resize.min.js"></script>
<script src="../Scripts/jquery.chosen.min.js"></script>
<script src="../Scripts/jquery.uniform.min.js"></script>
<script src="../Scripts/jquery.cleditor.min.js"></script>
<script src="../Scripts/jquery.noty.js"></script>
<script src="../Scripts/jquery.elfinder.min.js"></script>
<script src="../Scripts/jquery.raty.min.js"></script>
<script src="../Scripts/jquery.iphone.toggle.js"></script>
<script src="../Scripts/jquery.uploadify-3.1.min.js"></script>
<script src="../Scripts/jquery.gritter.min.js"></script>
<script src="../Scripts/jquery.imagesloaded.js"></script>
<script src="../Scripts/jquery.masonry.min.js"></script>
<script src="../Scripts/jquery.knob.modified.js"></script>
<script src="../Scripts/jquery.sparkline.min.js"></script>
<script src="../Scripts/counter.js"></script>
<script src="../Scripts/retina.js"></script>
<script src="../Scripts/custom.js"></script>


<link href="../CSS/CustomCSS/Login.css" rel="stylesheet" />
<script src="../Scripts/UserJS/Login.js"></script>

	<!-- end: JavaScript-->
   
</body>
</html>


