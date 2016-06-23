$("document").ready(function (e) {   
    $(".navTitle").live({
        click: function (e) {// Clear controls
            var navTitle = $(this).closest('li').find('span').text(); 3

            document.title = navTitle;
            //  ClearCategoryControls();
            return true;
        }
    })
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });

});//end of document.ready
