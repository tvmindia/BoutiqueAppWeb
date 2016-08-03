<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="tiqSite.aspx.cs" Inherits="Boutique.Website.tiqSite" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>t i q u e s s i n n</title>
    <script src="script/cloudflare.min.js"></script>
    
    <link href="css/screen.css" rel="stylesheet" />
    <link href="css/desktop.css" rel="stylesheet" />    
    <link href="css/css.css" rel="stylesheet" />
</head>
<body>
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
    <polygon id="mask" points="24,0 24,24 0,24 "></polygon>
  </defs>
</svg>  
    	
    
<header>
   <div class="container">
    
    <nav>   
      
      <div>
        <label for="menuToggle" class="toggle" data-open="Menu" onclick=""></label>
        <input type="checkbox" id="menuToggle">
          
        <ul id="menu">
                    <li class="home"><a class=" active" href="">Home</a></li>          
                    <li class="faq"><a class="" href="">Client Benefis</a></li>          
                    <li class="about"><a class="" href="">User Benefits</a></li>          
                    <li class="downloads"><a class="" href="">How It Works</a></li>          
                    <li class="newsletter"><a class="" href="">Newsletter</a></li>          
                    <li class="press"><a class="" href="">About</a></li>          
                    <li class="legal"><a class="" href="">Contact Us</a></li>          
                  </ul>
      </div>       
        
                  
         
     
    </nav>
  
    <a id="logo" href="">
      <svg class="globe" version="1.2" baseProfile="tiny" xmlns="" x="0" y="0" viewBox="0 0 270 235" xml:space="preserve">
        <use xlink:href="#globe"></use>
      </svg>
      <svg class="arrow" version="1.2" baseProfile="tiny" xmlns="" x="0" y="0" viewBox="0 0 270 235" xml:space="preserve" style="transform: rotate(-0deg);">
        <use xlink:href="#arrow"></use>
      </svg>
    </a>
    
    <h1>
      <a href="">
        World Backup Day — March 31st        <svg class="wordmark" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 6 219 199" xml:space="preserve">
          <use xlink:href="#wordmark"></use>
        </svg>
      </a>
    </h1>
      
    
  </div>
</header>  <section id="intro">
    <div class="container">      
      <article>
        <h2>Tiquessin</h2>
        
        <p>In-Store experience takes the centre stage <strong> t i q u e s s i n n</strong>.</p>
        
        
        <a href="" class="next">Benefits?</a> <a href="" class="pledge">How it Works?</a>
      </article>
              <figure class="animate">
          <svg class="file-cloud" version="1.2" baseProfile="tiny" viewBox="0 0 130 95">
            <use xlink:href="#icon-cloud"></use>
          </svg>
          <div class="files">
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-photo"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-document"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-music"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-tv"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-calendar"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-chat"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-photo"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-document"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-music"></use>
            </svg>
            <svg class="file-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294">
              <use xlink:href="#icon-tv"></use>
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
  
  <section id="video">
  	<div class="video-bg">
  		<div class="video-container">
	  		<span>
		  		<iframe src="./Home _ World Backup Day — March 31st_files/97489098.html" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
	  		</span>
	  	</div>
  	</div>
  	<svg class="mask" viewBox="0 0 24 23.8" preserveAspectRatio="none" fill="#FFF">
  		<use xlink:href="#mask"></use>
  	</svg> 
  </section>
  
  <section id="what">
    <div class="container">
      <article>
        <h3>Benefis?</h3>
        
        <p>We assure benefit for both our clients and their users</p>

        <p>this virtual environment can preserve your cart </p>
        
        <a href="" class="next">Alright, I get it</a>
      </article>
      
              <figure id="image-what" class="animate">
          <svg version="1.2" baseProfile="tiny" xmlns="" x="0" y="0" width="379.8" height="199" viewBox="0 0 379.769 199" xml:space="preserve" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
            <g id="icon-wire"><path d="M87.5 168l0.5 10c0 2.8 3.2 6 6 6h66c5 0 5-3.2 5-6v-10c0-2.8 2.2-5 5-5l0 0c2.8 0 5 2.2 5 5v25c0 2.8 2.2 5 5 5l0 0c2.8 0 5-2.2 5-5v-22 -3c0-2.8 2.2-5 5-5l0 0c2.8 0 5 2.2 5 5v25c0 2.8 2.2 5 5 5l0 0c2.8 0 5-2.2 5-5v-22 -3c0-2.8 2.2-5 5-5l0 0c2.8 0 5 2.2 5 5v25c0 2.8 2.2 5 5 5l0 0c2.8 0 5-2.2 5-5v-22 -3c0-2.8 2.2-5 5-5l0 0c2.8 0 5 2.2 5 5v10c0 2.8 0.8 6 5.5 6h61c2.8 0 6-3.2 6-6l0.3-10"></path></g>
            <g id="icon-computer"><path d="M172 113c0 2.8-2.2 5-5 5H6c-2.8 0-5-2.2-5-5V6c0-2.8 2.2-5 5-5h161c2.8 0 5 2.2 5 5V113z"></path><rect x="11" y="11" width="151" height="97"></rect><path d="M103.5 118c0 0 3.5 21.3 5 25.5 1.7 4.9 4 5.7 4 8.4 0 2.3-2.2 3.2-5 3.2h-40c-2.8 0-5-1.2-5-3.4 0-3.7 2.7-3.7 4-9 1.7-6.7 5-24.6 5-24.6H103.5z"></path><line x1="11" y1="29" x2="162" y2="29"></line><circle cx="20.5" cy="19.8" r="4"></circle><circle cx="35.5" cy="19.8" r="4"></circle><circle cx="50.5" cy="19.8" r="4"></circle>
              
            </g>
          </svg>
        
          
          <svg class="arrow" version="1.2" baseProfile="tiny" xmlns="" x="0" y="0" viewBox="0 0 270 235" xml:space="preserve">
            <use xlink:href="#arrow"></use>
          </svg>
          
          
          <svg class="computer-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294"><use xlink:href="#icon-document"></use></svg>
          <svg class="computer-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294"><use xlink:href="#icon-photo"></use></svg>
          
          <svg class="arrow-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294"><use xlink:href="#icon-document"></use></svg>
          <svg class="arrow-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294"><use xlink:href="#icon-photo"></use></svg>
          <svg class="tick-icon" version="1.2" baseProfile="tiny" viewBox="0 0 61 58.294"><use xlink:href="#icon-tick"></use></svg>
          
        </figure>
                  
    </div>
    <svg class="mask" viewBox="0 0 24 23.8" preserveAspectRatio="none">
    	<use xlink:href="#mask"></use>
    </svg> 
  </section>
  
  <section id="why">
    <div class="container">
      <article>
        <h3>But why should I backup?</h3>
        
        <p>Losing your files is way <strong>more common</strong> than you’d think.</p>

<p>Ever lost your phone, camera or tablet? That counts. Your stuff could have been saved with a backup.</p>

<p>One small accident or failure could destroy all the important stuff you care about.</p>
                                
              </article>      
      
      <ul id="stats">
        
        <li class="people"><figure></figure><strong>30% of people</strong> have never backed up <sup>1</sup></li>
        <li class="phones"><figure></figure><strong>113 phones</strong> lost or stolen every minute <sup>2</sup></li>
        <li class="accidents"><figure></figure><strong>29% of disasters</strong> are caused by accident <sup>3</sup></li>
        <li class="viruses"><figure></figure><strong>1 in 10 computers</strong> infected with viruses each month <sup>4</sup></li>
        <li class="next"><a href="http://www.worldbackupday.com/en/#" class="next">I'm convinced</a></li>
      </ul>
      
      <div class="footnotes">
        <ul>
          <li><sup>1</sup> <a class="vglnk" href="http://blog.backblaze.com/2013/06/27/the-survey-says-apathy-is-winning-2/" rel="nofollow"><span>http</span><span>://</span><span>blog</span><span>.</span><span>backblaze</span><span>.</span><span>com</span><span>/</span><span>2013</span><span>/</span><span>06</span><span>/</span><span>27</span><span>/</span><span>the</span><span>-</span><span>survey</span><span>-</span><span>says</span><span>-</span><span>apathy</span><span>-</span><span>is</span><span>-</span><span>winning</span><span>-</span><span>2</span><span>/</span></a></li>
          <li><sup>2</sup> <a class="vglnk" href="https://www.lookout.com/resources/reports/mobile-lost-and-found" rel="nofollow"><span>https</span><span>://</span><span>www</span><span>.</span><span>lookout</span><span>.</span><span>com</span><span>/</span><span>resources</span><span>/</span><span>reports</span><span>/</span><span>mobile</span><span>-</span><span>lost</span><span>-</span><span>and</span><span>-</span><span>found</span></a></li>
          <li><sup>3</sup> Safeware, 2001</li>
          <li><sup>4</sup> ICSA Labs/TruSecure, 2002</li>
        </ul>
      </div>
      
          </div>
        
    <svg class="mask" viewBox="0 0 24 23.8" preserveAspectRatio="none">
    	<use xlink:href="#mask"></use>
    </svg> 
  </section>
  
  <section id="how">
    <div class="container">
      <article>
        <h3>So how do I backup?</h3>
        
        <p>Most people backup their files in one of two ways: to an external drive, or somewhere on the Internet.</p>

<p>It’s really easy, and you only need to set it up once!</p>

<aside><strong>Disclaimer:</strong> Even though this process is super simple, we’re not responsible for any data loss. Make sure you read through each screen carefully and you should be fine!</aside>

        <details class="details-inited">
          <summary><h4>Backing up to a USB Drive</h4></summary>
        
        
          <p>You’ll need an <a href="http://www.amazon.com/s/ref=sr_st_popularity-rank?keywords=external+hard+drive&amp;qid=1395785089&amp;rh=n%3A172282%2Cn%3A541966%2Cn%3A1292110011%2Cn%3A595048%2Ck%3Aexternal+hard+drive&amp;sort=popularity-rank">external hard drive</a> for this, preferably one that holds more than your computer can.</p>

<p>The good news is, they’re cheap!</p>
                
          <details class="details-inited">
            <summary>Windows 7</summary>
          
            <ol>
<li>Click the <strong>Start button</strong>.</li>
<li>Type <strong>“backup”</strong> into the search box.</li>
<li>Click on <strong>Backup and Restore</strong>.</li>
<li>Choose <strong>“Set up Backup”</strong>.</li>
<li>When Windows has finished preparing, select your external hard drive and click Next.</li>
<li>Click <strong>“Let Windows Choose”</strong> and press Next.</li>
</ol>

<aside>You can change when Windows backs up your files by clicking “Change Backup Schedule” if you like. The more often, the better!</aside>

<p>Then click <strong>“Save settings and run backup”</strong>. </p>

<p>You’re all done! Windows will backup <strong>automatically</strong> from now on. Make sure you leave your hard drive plugged in, or if you’re on a laptop, set a reminder to plug it in often.</p>

<p>Congrats on setting up your first backup!</p>
          </details>
          <details class="details-inited">
            <summary>Windows 8</summary>
            
            <ol>
<li>Open your start screen and start typing <strong>“file history settings”</strong>.</li>
<li>In the search results panel, tap or click <strong>“File History Settings”</strong>.</li>
<li>Tap or click <strong>“Select a drive”</strong>.</li>
<li>Choose your external hard drive from the list.</li>
<li>Click <strong>“Turn on”</strong>.</li>
</ol>

<p>That was easy. Windows will backup all your files <strong>automatically</strong> from now on. Make sure you leave your hard drive plugged in - or at least plug it in often.</p>

<p>Congratulations on setting up your first backup!</p>
          </details>
        
          <details class="details-inited">
            <summary>Mac</summary>
            
            <p>First, plug in your USB hard drive. Then, follow the instructions below to start automatically backing up your Mac!</p>

<aside>**WARNING:** Make sure your new USB drive is totally empty! Time Machine will usually *erase the drive* so it can do its thing. If this is a new drive and you’re okay with it, keep reading!</aside>

<ol>
<li>Open the  menu (in the top left of your screen) and choose <strong>System Preferences</strong>.</li>
<li>Click on <strong>“Time Machine”</strong>.</li>
<li>Click <strong>“Select Disk”</strong>.</li>
<li>Choose your USB hard drive from the list and select <strong>“Use Disk”</strong>.</li>
</ol>

<p>You’re done! Your Mac will back itself up <strong>automatically</strong> from now on. If you’re using a MacBook, make sure to plug in your hard drive regularly so it can save your files!</p>
          </details>
          
          <details class="details-inited">
            <summary>Linux</summary>
            
            <p>Every Linux distribution offers various tools to backup your data. We’ve posted the instructions for Ubuntu below.</p>

<ol>
<li>Open the HUD (click the Ubuntu button in the Dash) and type <strong>“Backup”</strong>. </li>
<li>Click on the search result <strong>“Backup”</strong>.</li>
<li>Click on <strong>“Just show my backup settings”</strong>.</li>
<li>Activate <strong>“Automatic backups”</strong>.</li>
<li>Choose the location to store your backup on the tab <strong>“Storage</strong>” (your external drive).</li>
<li>Choose how often to backup on the tab <strong>“Schedule”</strong>. The more often, the <br>
better!</li>
<li>Click on <strong>“Back Up Now”</strong> on the tab <strong>“Overview”</strong> to start backing up. </li>
</ol>

<p>That was easy. Ubuntu will backup all your files <strong>automatically</strong> from <br>
now on. Make sure you leave your hard drive plugged in - or at least <br>
plug it in often. </p>

<p>Congratulations on setting up your first backup!</p>
          </details>
                  
        </details>
        
        <details class="details-inited">
          <summary><h4>Backing up Online</h4></summary>
          <p>A simple way to start saving your files to the internet is by using <a href="http://skydrive.com/">OneDrive</a>, <a href="http://dropbox.com/">Dropbox</a>, <a href="http://drive.google.com/">Google Drive</a>, or even <a href="https://www.amazon.com/clouddrive/home/">Amazon Cloud Drive</a> to backup the most important things you’re working on right now. </p>

<p>These “online drives” usually don’t have too much space, and only backup one folder on your computer. However, this is great for students and businesspeople who need to keep their most important documents safe.</p>

<h5>Backing up your whole computer</h5>

<p>If you’d rather back up absolutely EVERYTHING (good on you!) - just search for “online backup reviews” on your favorite search engine. It can help you choose the service that’s right for you.</p>
        </details>
        
        
        
        <a href="http://www.worldbackupday.com/en/#" class="next">Take the pledge</a>
      </article>
      
      
    </div>
    
    <svg class="mask" viewBox="0 0 24 23.8" preserveAspectRatio="none">
    	<use xlink:href="#mask"></use>
    </svg> 
  </section>
  
  <section id="pledge">
    <div class="container">
      <h3>The World Backup Day Pledge</h3>
      <blockquote>“I solemnly swear to backup my important documents and precious memories on March 31st.”</blockquote>
      
      <p>I will also tell my friends and family about World Backup Day - friends don't let friends go without a backup.</p>
      
      <h5><span>Take the pledge on</span></h5>
              <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fworldbackupday.com%2Fpledge" class="facebook">Facebook</a> <a href="http://twitter.com/intent/tweet?url=http%3A%2F%2Fworldbackupday.com%2Fpledge&amp;text=I+solemnly+swear+to+backup+my+important+stuff+on+World+Backup+Day%2C+March+31st.+Take+the+pledge%21&amp;related=worldbackupday" class="twitter">Twitter</a>
      
      <p class="count" style="display: block;"><strong>5,329</strong> people have already taken the pledge (and counting!)</p>
    </div>
    <svg class="mask" viewBox="0 0 24 23.8" preserveAspectRatio="none">
    	<use xlink:href="#mask"></use>
    </svg>     
    
  </section>
  
  

      
    <footer>
      <div class="container">
        <div>
          A 614a production <span>Designed by <a href="http://samm.me/">Sam Mularczyk</a></span>
                  </div>
        
        <ul>
                    <li class="home"><a class=" active" href="http://www.worldbackupday.com/en/">Home</a></li>          
                    <li class="faq"><a class="" href="http://www.worldbackupday.com/en/faq">FAQ</a></li>          
                    <li class="about"><a class="" href="http://www.worldbackupday.com/en/about">About</a></li>          
                    <li class="downloads"><a class="" href="http://www.worldbackupday.com/en/downloads">Downloads</a></li>          
                    <li class="newsletter"><a class="" href="http://www.worldbackupday.com/en/newsletter">Newsletter</a></li>          
                    <li class="press"><a class="" href="http://www.worldbackupday.com/en/press">Press</a></li>          
                    <li class="legal"><a class="" href="http://www.worldbackupday.com/en/legal">Legal</a></li>          
                  </ul>
      </div>
    </footer>
</body>
</html>
