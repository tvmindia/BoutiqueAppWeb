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
    BindNotification();
});//end of document.ready
function GetReviews()
{
   
    var ds = {};
    var table = {};
    var data = {};
    ds = getJsonData(data, "../AdminPanel/ProductReview.aspx/GetReviewDetails");
    table = JSON.parse(ds.d);
    return table;
}
function BindNotification() {

    var Reviews = {};
    Reviews = GetReviews();
    var i = 0;
    $.each(Reviews, function (index, Records) {

        MultiReviewBind(Records, i);
        i = i + 1;
    })
    return false;

}
function GetReviewCountforBubble() {

    var ds = {};
    var table = {};
    var data = {};
    ds = getJsonData(data, "../AdminPanel/ProductReview.aspx/GetReviewCountforBubble");
    table = JSON.parse(ds.d);
    return table;
}

function MultiReviewBind(Records, i,Date) {
    
    var spancount = document.getElementById("countspan");
    spancount.innerHTML = i+1;  
    var ul = document.getElementById("NotifyArea");
    var li = document.createElement("li");
    var ali = document.createElement("a");
    ali.setAttribute("href", "../AdminPanel/ProductReview.aspx")
    li.setAttribute("id", Records.ReviewID);
    //li.setAttribute("onclick", "ShowDetail(\"" + Records.ReviewID + "\")")
    var Spanform = document.createElement('span');
    Spanform.className = "icon-comment-alt";
    var ic = document.createElement("i");

    ic.className = "icon-user";
    Spanform.appendChild(ic);
    var SpanMsg = document.createElement('span');
    SpanMsg.className = "message";   
    SpanMsg.innerHTML = 'Comment for ' + Records.Product_Nam ;
    var Spantime = document.createElement('span');
    Spantime.className = "time";
    Spantime.innerHTML = "\t &nbsp;&nbsp;&nbsp;" + ConvertJsonToDat(Date);
    ali.appendChild(Spanform);
    ali.appendChild(SpanMsg);
    ali.appendChild(Spantime);
    li.appendChild(ali);
    ul.appendChild(li);

}
function ConvertJsonToDat(jsonDate) {
    if (jsonDate != null) {
        var dateString = jsonDate.substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth();
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var monthNames = [
                      "Jan", "Feb", "Mar",
                      "Apr", "May", "Jun", "Jul",
                      "Aug", "Sep", "Oct",
                      "Nov", "Dec"
        ];
        var result = day + '-' + monthNames[month] ;
        return result;
    }
}