<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Boutique.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <!------TITLE TAG ----->
    <title>tiquesInn</title>
    <!------TITLE IMAGE ----->
    <link rel="shortcut icon" type="image/png" href="Website/images/Logo PNG.png" />
    <!------SCRIPT FILES ----->
    <script src="Website/script/cloudflare.min.js"></script>
    <script src="Website/script/Tiqcloudflare.min.js"></script>
    <script src="Scripts/jquery-1.12.3.js"></script>

    <script src="Website/script/Tiqapplication-82ea8bbc3e31c251ee1dc09d3220e512.js"></script>
    <script src="Website/script/Tiqplayer.js"></script>
    <script src="Website/script/Tiqpromo-e030b96623647aa3a6cdf081281c2ec3.js"></script>
    <script src="Website/script/Tiqvuid.min.js"></script>
    <script src="Website/script/Tiqmainscript.js"></script>
    <!------CSS FILES ----->
    <link href="Website/css/application-0db4a6b242aea7886b88306baabadc2f.css" rel="stylesheet" />
    <link href="Website/css/screen.css" rel="stylesheet" />
    <link href="Website/css/desktop.css" rel="stylesheet" />    
    <link href="Website/css/css.css" rel="stylesheet" />
    <link href="CSS/glyphicons.css" rel="stylesheet" />    
    <link href="Website/css/Tiqstyle.css" rel="stylesheet" />
    
   
<!----SECTION HEAD START --->     
</head>
<!------SECTION BODY START----->       
<body style="background-color:#f1f1f1;">
 <!-- PRELOADER -->
    <div class="spn_hol">
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div>

 <!-- END PRELOADER -->
<!------SECTION START SVGS ----->
<svg style="display: none;" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
<defs>
  <path id="icon-cloud" d="M115.578,43.918c0.33-2,0.742-4.051,0.742-6.145C116.32,16.912,99.526,0,78.666,0C65.16,0,53.374,7.094,46.697,17.755
  	c-27.637-0.494-31.399,26.637-31.399,26.637C7.028,48.765,0,57.446,0,67.45v0.453c0,14.402,14.463,27.43,28.868,27.43h75.999
  	c14.402,0,25.134-13.027,25.134-27.43V67.45C130,57.059,124.379,48.11,115.578,43.918z M59.02,74.716l-3.624-3.624l-3.624-3.623
  	l-13.289-13.29l7.248-7.247L59.02,60.221L84.391,34.85l7.247,7.248L59.02,74.716z"></path>
  
  <g id="icon-document" stroke-width="2"><path d="M48 48.056C48 50.265 46.428 53 44.219 53h-27C15.01 53 13 50.265 13 48.056v-42C13 3.847 15.01 3 17.219 3h19L48 14.056V48.056zM48 15h-7.781C38.01 15 36 12.265 36 10.056V3"></path><line x1="19" y1="18" x2="33" y2="18"></line><line x1="19" y1="24" x2="42" y2="24"></line><line x1="19" y1="30" x2="42" y2="30"></line><line x1="19" y1="36" x2="42" y2="36"></line><line x1="28" y1="42" x2="42" y2="42"></line></g>
  <g id="icon-music" stroke-width="2"><path d="M26.55 15.818l17.45-3.5v19.095c0-0.003-0.615-0.013-0.699-0.013 -4.419 0-8.225 3.582-8.225 8 0 4.419 3.469 8 7.888 8 4.302 0 7.744-3.398 7.926-7.655l0.438-32.927c0-2.04-1.328-3.719-3.328-3.965V2.818l-26 5v0.035c-1 0.247-3 1.926-3 3.965v24.595c0-0.003-0.615-0.013-0.699-0.013 -4.419 0-8.225 3.582-8.225 8 0 4.419 3.469 8 7.888 8 4.302 0 7.97-3.398 8.151-7.655L26.55 15.818z"></path></g>
  <g id="icon-email" stroke-width="2"><path d="M60 42.33c0 2.027-1.644 3.67-3.671 3.67H4.671C2.644 46 1 44.357 1 42.33V13.67C1 11.643 2.644 10 4.671 10h51.658C58.356 10 60 11.643 60 13.67V42.33z"></path><polyline points="5.448,14.476 29.764,33.286 54.538,14.476   "></polyline><line x1="15.541" y1="23.651" x2="5.753" y2="40.32"></line><line x1="43.985" y1="24.11" x2="55.148" y2="40.32"></line></g>
  <g id="icon-photo" stroke-width="2"><path d="M5.553 33.489L1.547 17.095c-0.524-2.146 0.79-4.311 2.937-4.835l40.799-9.97c2.146-0.523 4.312 0.791 4.836 2.937l1.225 5.014M60 49c0 2.209-1.791 4-4 4H14c-2.209 0-4-1.791-4-4V19c0-2.209 1.791-4 4-4h42c2.209 0 4 1.791 4 4V49zM56 48.5c0 0.276-0.224 0.5-0.5 0.5h-41c-0.276 0-0.5-0.224-0.5-0.5v-29c0-0.276 0.224-0.5 0.5-0.5h41c0.276 0 0.5 0.224 0.5 0.5V48.5z"></path><circle cx="46" cy="27.739" r="4.5"></circle><polyline points="17.167,44.239 24.702,28.155 36.695,44.03 44.952,35.756 51.831,44.239   "></polyline></g>
  <g id="icon-tv" stroke-width="2"><path d="M56 50c0 2.209-1.791 4-4 4H9c-2.209 0-4-1.791-4-4V21c0-2.209 1.791-4 4-4h43c2.209 0 4 1.791 4 4V50z"></path><rect x="9" y="21" width="43" height="29"></rect><line x1="27.779" y1="16.708" x2="19.113" y2="5.375"></line><line x1="32.779" y1="16.708" x2="43.613" y2="1.208"></line></g>
  <g id="icon-chat" stroke-width="2"><path d="M55.192 23.443c0-10.77-11.043-19.5-24.666-19.5s-24.667 8.73-24.667 19.5c0 10.173 9.854 18.522 22.429 19.417 1.405 3.478 4.683 8.021 14.154 8.416 0 0-8.75-7.499-3.35-9.542C48.492 38.98 55.192 31.831 55.192 23.443z"></path><circle cx="18.442" cy="23.361" r="3.584"></circle><circle cx="30.442" cy="23.361" r="3.584"></circle><circle cx="42.442" cy="23.361" r="3.584"></circle></g>
  <g id="icon-calendar" stroke-width="2"><path d="M49.952 8.806c2.209 0 4.048 1.791 4.048 4v32.5L44.404 55h-34C8.195 55 7 53.015 7 50.806v-38c0-2.209 1.518-4 3.727-4M23 10c0 2.209-1.791 4-4 4h-1c-2.209 0-4-1.791-4-4V5c0-2.209 1.791-4 4-4h1c2.209 0 4 1.791 4 4V10zM47 10c0 2.209-1.791 4-4 4h-1c-2.209 0-4-1.791-4-4V5c0-2.209 1.791-4 4-4h1c2.209 0 4 1.791 4 4V10z"></path><polyline points="45,55 45,46 54,46"></polyline><line x1="7" y1="22" x2="54" y2="22"></line><line x1="27" y1="9" x2="35" y2="9"></line></g>
  <polygon id="icon-tick" points="53.285,5.533 24.117,34.702 8.837,19.422 0.504,27.755 24.117,51.367 61.617,13.866 53.285,5.533 	"></polygon>
  </defs>
</svg>  <svg style="display: none;">
  <defs>
    <path id="arrow" d="M218.7 34.3C196.8 12.2 167.4 0 135.9 0c-31.4 0-61.1 12.5-83.5 35.3 -22.2 22.6-34.5 52.2-34.5 83.7H0l31.6 44.3 31.6-44.3H44.4c0.2-51.2 41.2-92.3 91.5-92.3 50.5 0 90 39.9 90 90.7 0 50-41.7 90.7-92.9 90.8 -7.3 0-13.3 6-13.3 13.4 0 7.3 6 13.4 13.3 13.4 0 0 0 0 0 0 65.8 0 119.4-52.9 119.4-117.5C252.4 86 240.4 56.3 218.7 34.3z"></path>
    <path id="globe" d="M172.03 99c0.01 0 0.01 0 0.01 0C172.04 99 172.04 99 172.03 99zM165.61 61.87c-9.29-5.09-19.77-7.78-30.3-7.78 -23.08 0-44.3 12.56-55.39 32.78 -16.73 30.52-5.52 68.96 25 85.69 9.29 5.09 19.77 7.78 30.3 7.78 23.08 0 44.3-12.56 55.39-32.78C207.33 117.05 196.12 78.61 165.61 61.87zM122.13 138.25c-1.43 4.4-4.29 3.29-5.86 7.48 -1.68 4.49 3.59 9.89 0.95 14.25 -0.74 1.23-2.66 1.49-4.35 1.72 -0.52-0.26-1.04-0.52-1.56-0.81 -20.67-11.34-30.1-35.19-24.06-56.97 1.02-0.27 1.52 1.44 2.29 1.82 1.94 0.94 0.57 1.19 1.22 3.12 0.93 2.73 0.8 4.28 3.61 4.43 5.92 0.31 8.32-0.48 12.12 4.12 1.44 1.74 3.38 3.47 4.36 5.51 1.01 2.09 1.12 4.13 2.56 6.17 1.04 1.48 4.5 2.81 6.15 3.55C121.84 133.66 123.37 134.41 122.13 138.25zM128.75 164.63c-0.09 0.01-0.17 0.01-0.26 0.02l-3.4-1.06c-0.17-2.09-0.74-5.34 2.1-5.19 0.36-1.37 0.99-3.37 0.99-3.37C131.95 152.82 129.24 163.08 128.75 164.63zM178.95 136.52c-0.96 1.76-2.03 3.42-3.16 5.01 -2.8-0.54-4.27-6.52-1.32-6.39 0.48-1.53 1.92-3.69 1.92-3.69 2.73-1.13 3.96-0.12 4.28 1.6C180.13 134.22 179.57 135.38 178.95 136.52zM181 103.71c-3.96 0.46-5.74-3.67-8.4-4.44 0.42 0.29-0.88 1.13-0.29 2.43 0.7 1.53 2.77 2.62 3.6 4.18 1.64 3.08 1.19 8.72-2.42 10.44 -2.16 1.02-4.82-0.53-5.6 2.24 -0.54 1.93 1.44 3.59 1.86 5.29 0.32 1.29 0.23 6.07-0.99 6.86 -2 1.29-2.04-0.01-3.84 2.34 -0.07 1.66 1.42 1.74 1.81 3.04 0.53 1.76-1.17 2.27-0.95 3.42 0.38 2.04 3.72 1.55 4.01 4.63 -0.18 0.04-0.36 0.07-0.54 0.11 0.95 0.87 1.55 2.27 1.15 3.65 -2.49-1.79-3.59-3.94-5.61-6.13 -1.93-2.08-4.99-2.39-4.23-5.93 3.35-0.36 3.13-6.17 2.21-8.2 -1.36-3.03-3.41-4.47-6.36-5.84 -3.07-1.43-5.83-3.34-7.48 0.93 -1.24 3.21 0.03 7.15-0.9 10.53 -2.96-0.06-1.33-3.64-1.82-5.55 -0.74-2.88-2.98-2.98-5.27-4.74 -2.05-1.57-2.38-4.28-4.37-5.22 -1.25-0.58-5.41-1.01-6.79-0.89 -0.09 0.42-0.14 0.72-0.15 0.93 0.39 0.03-0.09 0.95 0 0 -0.2-0.02-0.62 0.2-1.46 1.02 -2.25 2.19-5.55 2.86-8.15 0.82 -2.2-1.73-4.44-5.68-6.16-8.04 -1.94-2.65 1.34-2.27-0.96-4.67 -0.57-0.6-3.9-1.25-4.66-1.59 -2.73-1.24-0.26-2.73-3.7-3.43 -1.32-0.27-3.19 0.33-4.73 0.08 -3-0.5-7.67-1.85-10.33-4.38 0.63-1.46 1.33-2.9 2.1-4.33 13.23-24.13 43.52-32.96 67.65-19.73 7.83 4.3 14.04 10.39 18.42 17.49 -0.46 2.81-1 5.71 0.22 7.83C178.84 100.55 181.38 101.39 181 103.71z"></path>
    <g id="wordmark">
      <path d="M46.8 72.5H35.9l-6.6-38.5 -7 38.5H11.6L0 7.2h12.1L18 50.4l7.3-43.2h9.4l6.7 43.2 6.3-43.2h11.3L46.8 72.5zM98.8 56.2c0 10.5-7.1 17.9-18.5 17.9 -11.4 0-18.5-7.4-18.5-17.9V23.6c0-10.3 7.2-17.8 18.5-17.8 11.5 0 18.5 7.5 18.5 17.8V56.2zM86.6 22.8c0-3.8-2.3-6.4-6.3-6.4 -3.9 0-6.2 2.6-6.2 6.4v34.2c0 3.8 2.3 6.4 6.2 6.4 4 0 6.3-2.6 6.3-6.4V22.8zM135.1 72.9c-4.8 0-6.7-3.8-6.7-9.6V51c0-3-1.6-5.6-5-5.6H117v27.1h-12.2V7.2H125c9 0 14.9 5.1 14.9 14.2v9.2c0 5-2.3 8.5-7.4 10.1 5.1 1.5 7.6 5.7 7.6 9.9v12c0 3 0.9 5.1 2.4 6.7v3.6H135.1zM128 21.9c0-3-1.3-4.7-4.3-4.7H117v19.2h6.2c3.2 0 4.8-1.8 4.8-5.2V21.9zM147.3 72.5V7.2h12.2v54.6h18.3v10.8H147.3zM219.1 55.5c0 10.5-6.4 17.1-17.9 17.1h-18.8V7.2h18.8c11.5 0 17.9 7.5 17.9 17.7V55.5zM206.9 24.9c0-4.7-1.9-7.3-6.5-7.3h-5.8V62h5.8c4.6 0 6.5-2.6 6.5-7.2V24.9zM34.1 130c0 8-4.8 12.2-12.8 12.2H3.1V84.6h18c8 0 12.7 4.2 12.7 12.2v6.2c0 4.9-1.9 8.7-6.8 9.7 5.2 1.4 7.1 4.9 7.1 9.8V130zM23.6 97.5c0-2.7-1.1-4.2-3.8-4.2h-5.8v15.8h5.4c2.9 0 4.2-1.5 4.2-4.5V97.5zM23.7 121.7c0-3-1.4-4.6-4.2-4.6h-5.5v16.3H20c2.7 0 3.7-1.5 3.7-4.2V121.7zM61 142.2l-1.9-11.3H48.9l-2.1 11.3h-10l11.6-57.6h12l11.5 57.6H61zM54.2 100.1l-3.9 22.2h7.4L54.2 100.1zM106.7 128.4c0 8.7-5.4 15.1-15.6 15.1 -10.3 0-16.6-6.9-16.6-15.8V99.1c0-8.9 6.3-15.8 16.6-15.8 10.2 0 15.6 6.4 15.6 15.1v7h-9.6v-6.9c0-3.4-1.9-5.7-5.8-5.7 -3.9 0-5.9 2.3-5.9 5.5v30.3c0 3.2 2 5.5 5.9 5.5 3.9 0 5.8-2.3 5.8-5.7v-6.9h9.6V128.4zM134 142.2l-8-23.7 -3.7 7.6v16.1h-10.7V84.6h10.7v26.4l11.6-26.4h10.8l-11.3 24.3 11.9 33.3H134zM181.3 128.9c0 8.7-6.6 14.6-15.9 14.6s-16.3-6-16.3-14.6V84.6H160v44.3c0 3.5 1.8 5.3 5.4 5.3 3.6 0 5.5-1.7 5.5-5.3V84.6h10.5V128.9zM218 107.2c0 8.3-4.8 12.9-13.1 12.9h-7v22.1h-10.7V84.6h17.7c8.2 0 13.1 4.7 13.1 13V107.2zM207.6 97.7c0-2.9-1.3-4.3-3.8-4.3h-5.9v18.4h5.9c2.5 0 3.8-1.5 3.8-4.3V97.7zM32.4 194.9c0 8.5-5.1 13.8-14.4 13.8H2.8v-52.7H18c9.3 0 14.4 6 14.4 14.2V194.9zM22.5 170.3c0-3.8-1.5-5.9-5.2-5.9h-4.7v35.8h4.7c3.7 0 5.2-2.1 5.2-5.8V170.3zM56.9 208.7l-1.7-10.4h-9.3L44 208.7h-9.2l10.6-52.7h11l10.5 52.7H56.9zM50.8 170.2l-3.6 20.3h6.7L50.8 170.2zM85 187.1v21.5h-9.8v-21.5l-11.6-31.2h10.3l6.8 21.4 6.5-21.4H97L85 187.1zM113.5 208.7H109l12.2-52.3h4.6L113.5 208.7zM131 208.7h-4.5l12.2-52.3h4.6L131 208.7zM148.5 208.7H144l12.2-52.3h4.6L148.5 208.7zM166 208.7h-4.5l12.2-52.3h4.6L166 208.7zM183.5 208.7H179l12.2-52.3h4.6L183.5 208.7zM201 208.7h-4.5l12.2-52.3h4.6L201 208.7z"></path>    
      </g>
    <polygon id="mask" points="2,0 24,24 0,24 "></polygon>
  </defs>
</svg>  
<!------SECTION END SVG -----> 
<!------SECTION HEADER ----->    
<header>
   <div class="container">
       <nav> 
           <div>
               <label for="menuToggle" class="toggle" data-open="Get Started" onclick="openmyModal()"></label>

           </div>

       </nav>
  </div>
</header>
<!------END SECTION HEADER----->     
<!------SECTION INTRODUCTION----->     
    <section id="intro">
    <div class="container">      
      <article>
        <h2 style="text-shadow:1px 5px 6px #230a0a;color:#3a3a3a;font-family:Sitefond!important;letter-spacing:6px;text-transform:none;font-weight:300;font-size:100px;">tiques<span style="font-family:Sitefond!important;text-transform:none;font-weight:300;font-size:100px;color:gray;text-shadow:1px 5px 5px #3a3a3a;">Inn</span></h2>
        <p style="color:grey;font-family:Segoe Script!important;font-size:35px;text-align:center;text-shadow:1px 2px 3px #211111;">tiquesInn N reach out</p>        
        <a href="#OwnerBen" class="next">Benefits?</a> <a href="#how" class="next">How it Works?</a>
      </article>
              <figure class="animate">
                  <img class="file-cloud" src="Website/images/Logo.png" />         
          <div class="files">
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-email"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-document"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-calendar"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-chat"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-email"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-document"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-calendar"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-chat"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-email"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-document"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-calendar"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-chat"></use>
            </svg>
          </div>
        </figure>
          </div>
    
    <svg class="mask" viewBox="0 0 24 23.8" preserveAspectRatio="none">
    	<use xlink:href="#mask"></use>
    </svg> 
  </section>
<!------END SECTION INTRODUCTION----->  
<!------SECTION SCROLL SLIDE----->
  <section id="video">
      <div class="video-bg">
          <div class="slide -shop">
          <div class="slide_shop_trigger slide_shop_trigger0"></div>
            <div class="slide_shop_trigger slide_shop_trigger1"></div>
            <div class="slide_shop_trigger slide_shop_trigger2"></div>
            <div class="slide_shop_trigger slide_shop_trigger3"></div>
            <div class="slide_shop_trigger slide_shop_trigger4"></div>
            <div class="slide_shop_trigger slide_shop_trigger5"></div>
            <div data-scrollmagic-pin-spacer="" class="scrollmagic-pin-spacer">
                <div class="slide_shop">
                    <div class="container -medium">
                        <ul class="slide_shop_list">
                    <li class="slide_shop_list_item slide_shop_list_item1">
                        <h2>How To ?</h2>                       
                        <p>"Reach your brand to customers in smarter way&nbsp;&nbsp;<br />Yes, mobile is the way forward.&nbsp;</p></li>
                <li class="slide_shop_list_item slide_shop_list_item2">
                    <h2>Here we go!</h2>
                    <p>TiquesInn comes in!&nbsp;<br />Build your virtual store, reach out more</p></li>
                    <li class="slide_shop_list_item slide_shop_list_item3">
                        <h2>Hey, my sales touched new heights!</h2>
                        <p>Mobile is the best companion&nbsp;<br />Be mobile and get more eyeballs!</p></li>
                        <li class="slide_shop_list_item slide_shop_list_item4">
                            <h2>Smile is on!</h2>
                            <p>Keep your faces glow!<br />&nbsp;Color your occasions with tiquesInn</p></li>
                            <li class="slide_shop_list_pager carousel-pager"></li>
                            <li class="slide_shop_list_pages">
                                <ul class="slide_shop_pages"><li>
                                    <div class="slide_shop_page slide_shop_page1"></div></li>
                            <li><div class="slide_shop_page slide_shop_page2"></div></li>
                            <li><div class="slide_shop_page slide_shop_page3"></div></li>
                            <li><div class="slide_shop_page slide_shop_page4"></div></li></ul></li></ul>
                        <div class="slide_shop_bg_container">
                            <img alt="" class="slide_shop_bg -bg" src="../Website/images/Demo2.png"/>      
                            <img alt="" class="slide_shop_bg -slide1 -carousel" src="../Website/images/Demo2.png"/>
                            <img alt="" class="slide_shop_bg -slide2 -carousel" src="../Website/images/Demo3.png"/>
                            <img alt="" class="slide_shop_bg -slide3 -carousel" src="../Website/images/Demo4.png"/>
                            <img alt="" class="slide_shop_bg -slide4 -carousel" src="../Website/images/Demo5.png"/>
                            <img alt="" class="slide_shop_bg -slide4 -carousel" src="../Website/images/Demo6.png"/>
                            <img alt="" class="slide_shop_bg -slide4 -carousel" src="../Website/images/Demo1.png"/>

                        </div>

                    </div>

                </div>

            </div>
              </div>
  	</div>
    
  	<svg class="mask" viewBox="0 0 24 23.8" preserveAspectRatio="none">
  		<use xlink:href="#mask"></use>
  	</svg> 
  </section>
<!------SECTION END SCROLL SLIDE----->
<!------SECTION OWNER BENEFIT ----->  
  <section id="what" style="background-color:#fff;">
    <div id="OwnerBen" class="container">
      <article style="width:47%!important">
        <h3 style="text-shadow:1px 1px 0px black">Owner Benefits</h3>
        <div>
            <div class="iconleftb"></div>
            <p>Any retail shop can now easily setup their virtual store and showcase their products and offers to their customers on their mobile devices.</p>
       
        </div>
        <div>
            <div class="iconleftb"></div>
             <p>Be visible to your customers all times, by providing virtual in-store experience.</p>

        </div>
        <div>
            <div class="iconleftb"></div>
             <p>Personalized product feeds & notifications can really cut down your advertisement costs.</p>

        </div>
        <div>
            <div class="iconleftb"></div>
             <p>Provide E-Commerce experience without sacrificing your brand.</p>

        </div>
        
         <img src="Website/images/@home.JPG" style="width:100%"/>
      </article>
      <article style="width:47%!important;margin-top:7%;margin-left:3%;">
                  
        <img src="Website/images/@shop.JPG" style="width:100%"/> 
           <div>
            <div class="iconrightb"></div>
             <p>Improve customer bonding by loyalty benefits.</p>

        </div>    
          <div>
            <div class="iconrightb"></div>
              <p>Easy reach out to faraway customers.</p>

        </div> 
          <div>
            <div class="iconrightb"></div>
             <p>Valuable insights about customer likes and behavior.</p>

        </div>   
        <div>
            <div class="iconrightb"></div>
             <p>Foresee customers taste on upcoming product trends.</p>
       
        </div>
           <div>
            <div class="iconrightb"></div>
             <p>Get shop updates on owner dashboard.</p>
       
        </div>          
          </article>
                  
    </div>
    <svg class="mask" viewBox="0 0 24 23.8" preserveAspectRatio="none">
    	<use xlink:href="#mask"></use>
    </svg> 
  </section>
<!------SECTION END OWNER BENEFIT----->
<!------SECTION CUSTOMER BENEFIT----->  
  <section id="why">
    <div class="container" style="color:white;">
        <article style="width:47%!important">
         <h3 style="text-shadow:1px 1px 0px white">Customer Benefits</h3>
        <div>
            <div class="iconleft"></div>
            <p>In-store, In-person shopping experience anywhere!</p>
       
        </div>
        <div>
            <div class="iconleft"></div>
             <p>Search and select from a vast collection by brand, category and trend!</p>

        </div>
        <div>
            <div class="iconleft"></div>
             <p>Get notifications about new collections, offers and order status.</p>

        </div>
        <div>
            <div class="iconleft"></div>
             <p>Earn loyalty points for every purchase.</p>

        </div>
        
         <img src="Website/images/@browsing.jpg" style="width:70%"/>
      </article>
      <article style="width:47%!important;margin-top:10%;margin-left:3%;">
                  
        <img src="Website/images/@ordering.PNG" style="width:50%"/> 
              
          <div>
            <div class="iconright"></div>
              <p>Build product wish list and pick when you want</p>


        </div> 
          <div>
            <div class="iconright"></div>
             <p>Chat live with shop representatives and know more.</p>

        </div>   
        <div>
            <div class="iconright"></div>
             <p>Share product details with friends and family.</p>
       
        </div>  
           <div>
            <div class="iconright"></div>
             <p>Save your fuel and energy</p>
       
        </div>           
          </article>     
          </div>
        
    <svg class="mask" viewBox="0 0 24 23.8" preserveAspectRatio="none">
    	<use xlink:href="#mask"></use>
    </svg> 
  </section>
<!------SECTION END CUSTOMER BENEFIT-----> 
<!------SECTION HOW----->       
  <section id="how" style="background-color:#fff;">
    <div class="container">
        <article>
        <h3>How It Works?</h3>
        
        <p></p>
            <%--<img class="imgstart" src="Website/images/start.png" style=""/>--%>
            <img id="Howworks" src="Website/images/how copy.jpg" />              
            <img id="Howworkmedium" src="Website/images/how copy.jpg" />
            <img id="Howworksmall" src="Website/images/Howsmall.jpg" />
      </article>
            
    </div>
    <a style="right:3%;position:absolute;bottom:7%;color:white;" href="#intro"><img src="Website/images/movetop.png" /></a>
    <svg class="mask" viewBox="0 0 24 23.8" preserveAspectRatio="none">
    	<use xlink:href="#mask"></use>
    </svg> 
  </section>
 <!------SECTION END HOW----->  
 
<!------SECTION FOOTER----->
    <footer>
        <div class="container">
           
            <a href="https://www.facebook.com/tiquesinn" target="_blank">
                <img src="Website/images/fb.png" /></a><a href="https://twitter.com/tiquesinn" target="_blank"><img src="Website/images/twitter.png" /></a><a href="https://plus.google.com/103146218218684459847" target="_blank"><img src="Website/images/goog.png" /></a> 
             <div style="font-size:small;margin-top:25px;text-transform:lowercase;">
                Copyright &copy; 2016 Tiquesinn<span> a product of <a href="http://thrithvam.com">Thrithvam</a></span>
            </div>
        </div>
    </footer>
    <!------SECTION END FOOTER-----> 
    <!-------------------------------------//---------------------------------------------------------------->
<!------MODAL CONTENT FOR GET STARTED-----> 
    <div class="modal fade" id="getstarted" role="dialog">
     <div class="modal-dialog" style="min-width:550px;">
     <!-- Modal content-->               
     <div class="modal-content" style="background-color:transparent;box-shadow:none!important;">
     <div class="modal-header" style="border-color:transparent;" >                      
     </div>
     <div class="modal-body" style="max-height: 500px;">
     <svg class="mask" viewBox="0 0 24 23.8" preserveAspectRatio="none">
     <use xlink:href="#mask"></use>
     </svg> 
     <div style="background-color:#3a3a3a">
     <h3 class="modal-title" style="margin-left:5%;color:orange;top:-24px;position:relative;">Get Started</h3>
     </div>
     <div class="container 50%" style="background-color:#3a3a3a">
          <div class="form_error text-center" style="color:red;">
                        <div class="name_error hide error">Please Enter your name</div>
                        <div class="email_error hide error">Please Enter your Email</div>
                        <div class="email_val_error hide error">Please Enter a Valid Email Address</div>
                        <div class="message_error hide error">Please Enter Your Message</div>
                    </div>
                    <div class="Sucess" style="color:green"></div>
     <form id="Form1">
     <div class="row uniform">
     <div class="6u 12u$(small)">
     <input name="name" id="name" value="" placeholder="Name" type="text" />
     </div>                    
     <div class="6u 12u$(small)">
     <input name="email" id="email" value="" placeholder="Email" type="email"  />
     </div>
     <div class="6u$ 12u$(small)">
     <input name="mobile" id="mobile" value="" placeholder="Mobile" type="text" />
     </div>
     <div class="12u$">
     <textarea name="message" id="message" placeholder="Message (optional) " rows="2"></textarea>
     </div>
     <div class="12u$">
     <a class="form_submit sendbtn">Send</a>
     </div>
         <div class="12u$">
             <p style="visibility:hidden;">thomson kattingal</p>
         </div>
     </div>

     </form>
        </div>

     </div>

     </div>
        </div>
</div>  
<!------END MODAL CONTENT-----> 
    <!------INLINE SCRIPTS-----> 
    <script>
        //FUNCTION OPEN MODAL FOR GET STARTED FROM ONCLICK
        function openmyModal() {
            $('#getstarted').modal('show');
            $(".Sucess").hide();
            $(".form_error .name_error").addClass("hide").removeClass("show");
            $(".form_error .email_error").addClass("hide").removeClass("show");
            $(".form_error .email_val_error").addClass("hide").removeClass("show");
            $(".form_error .message_error").addClass("hide").removeClass("show");
        }
    </script>   
</body>
    <!------SECTION END BODY-----> 
</html>
