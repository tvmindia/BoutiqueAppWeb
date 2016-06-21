$("document").ready(function (e) {

    $(".navTitle").live({
        click: function (e) {// Clear controls
            var navTitle = $(this).closest('li').find('span').text(); 3

            document.title = navTitle;
            //  ClearCategoryControls();
            return true;
        }
    })





});//end of document.ready
