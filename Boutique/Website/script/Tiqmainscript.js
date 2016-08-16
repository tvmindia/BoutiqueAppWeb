//Author: Thomson Kattingal
//Created On: August 2016
//Contact: htttp://www.thrithvam.com

$(window).bind("load", function () {

    "use strict";

    $(".spn_hol").fadeOut(1000);
});


//SMOOTH MENU SCROOL


$(function() {
	
	"use strict";

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

//GET STARTED FORM VALIDATION
$(document).ready(function() {

    "use strict";
    
    $(".form_submit").click(function() {

        "use strict";
        
        var name = $("#name").val();
        var emaild = $("#email").val();
        var subject = $("#mobile").val();
        var message = $("#message").val();
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!name) {
            $(".form_error .name_error").addClass("show").removeClass("hide");
            return false;
        } else {
            $(".form_error .name_error").addClass("hide").removeClass("show");
        }
        if (!emaild) {
            $(".form_error .email_error").addClass("show").removeClass("hide");
            return false;
        } else {
            $(".form_error .email_error").addClass("hide").removeClass("show");
            if (testEmail.test(emaild)) {
                $(".form_error .email_val_error").addClass("hide").removeClass("show");
            } else {
                $(".form_error .email_val_error").addClass("show").removeClass("hide");
                return false;
            }
        }
        if (!message) {
            $(".form_error .message_error").addClass("show").removeClass("hide");
            return false;
        } else {
            $(".form_error .message_error").addClass("hide").removeClass("show");
        }
        if (name && emaild && message) {
         
            var res = SendMail();
            if (res == "sorry")
            {
                alert("Server Busy..");
                return false;
            }
            else {
                $(".Sucess").show();
                $(".Sucess").fadeIn(2000);
                $(".Sucess").html("<i class='fa fa-check'></i> Dear <b>" + name + "</b> Thank you for your inquiry we will respond to you as soon as possible!");
                $("#name").val("");
                $("#email").val("");
                $("#mobile").val("");
                $("#message").val("");
                $(".form_error .name_error, .form_error .email_error, .form_error .email_val_error, .form_error .message_error").addClass("hide").removeClass("show");
                $("#name").val("");
                $("#email").val("");
                $("#mobile").val("");
                $("#message").val("");
                return true;
            }
           
                    
                }
            
       
       
    });
});


 
/// SMOOTH SCROLL           

$(document).ready(function() {

    "use strict";
    
    var scrollAnimationTime = 1200,
        scrollAnimation = 'easeInOutExpo';
    $('a.scrollto').bind('click.smoothscroll', function(event) {
        event.preventDefault();
        var target = this.hash;
        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top
        }, scrollAnimationTime, scrollAnimation, function() {
            window.location.hash = target;
        });
    });
    
});

//SEND MAIL USING JSON
function SendMail() {
    debugger;
    var site = new Object();
    site.name = $('#name').val();
    site.email = $('#email').val();
    site.subject = $('#mobile').val();
    site.message = $('#message').val();
    result = sendnow(site);
    return result;
}

function sendnow(site) {

    debugger;
    var data = "{'userObj':" + JSON.stringify(site) + "}";

    jsonResult = getJsonData(data, "../Website/tiqSite.aspx/SendMail");
    var msg;
    msg = jsonResult.d;
    return msg;

}
function getJsonData(data, page) {
    var jsonResult = {};
    // $("#loadingimage").show();
    var req = $.ajax({
        type: "post",
        url: page,
        data: data,
        delay: 3,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json"

    }).done(function (data) {
        jsonResult = data;
    });
    return jsonResult;
}






