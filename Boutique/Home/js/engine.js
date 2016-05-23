var velocity = 0.5;

function update() {
    var pos = $(window).scrollTop();
    $('.about').each(function () {
        var $element = $(this);
        // subtract some from the height b/c of the padding
        var height = $element.height() - 18;
        $(this).css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity) + 'px');
    });

    $('.social').each(function () {
        var $element = $(this);
        // subtract some from the height b/c of the padding
        var height = $element.height() - 30;
        $(this).css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity) + 'px');
    });

};

$(window).bind('scroll', update);
$(window).bind('scroll', checkScroll);


function checkScroll() {

    var startY = $('.navbar').height() * 1.4; //The point where the navbar changes in px

    if ($(window).scrollTop() > startY) {
        $('.navbar').addClass("scrolled");
        $('.arrows').hide();
        
    } else {
        $('.navbar').removeClass("scrolled");
        $('.arrows').show();
    }
}

if ($('.navbar').length > 0) {
    $(window).on("scroll load resize", function () {
        checkScroll();
    });
}


function SmoothScroll(hash) {

    $('html,body').animate({ scrollTop: $(hash).offset().top })
}

function showPage(){
  
    // alert("ready");
    $('#loading').fadeOut('slow', function () { $('#ActualPage').fadeIn('slow', function () { showCaptions(); }) });
    
}

function showCaptions() {

    $('#bannerName').fadeIn(1500)
    $('#bannerCaption').fadeIn(1200, function () { $('#bannerDetailCaption').fadeIn(2300) })
   
     
    
}
