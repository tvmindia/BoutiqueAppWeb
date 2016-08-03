$("document").ready(function (e) {
    var boutique_id = getboutiqueID();
    parent.document.title = Pages.ProductsReview;
    BindReview();
});//end of document.ready


//---getting data as json-----//
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

        //     $("#loadingimage").hide();
        jsonResult = data;
    });
    return jsonResult;
}
//---end of getting data as json -----//


function getboutiqueID() {

    var table = {};
    var boutique = new Object();
    table = GetBoutique_id(boutique);
    return table;
}

function GetBoutique_id(boutique) {
   

    var ds = {};
    var table = {};
    var data = "{'boutiqueObj':" + JSON.stringify(boutique) + "}";
    ds = getJsonData(data, "../AdminPanel/ProductReview.aspx/BoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

function BindReview() {
  
    var Reviews = {};
    Reviews = GetAllReviews();
    var i = 0;
    $.each(Reviews, function (index, Records) {
       
        MultiImageBind(Records, i);
        i = i + 1;
    })
    return false;
    
}
function GetAllReviews() {
   
    var ds = {};
    var table = {};
    var data = {};
    ds = getJsonData(data, "../AdminPanel/ProductReview.aspx/GetReviewDetails");
    table = JSON.parse(ds.d);
    return table;
}

function MultiImageBind(Records, i) {
  
    var ul = document.getElementById("ReviewPreview");
    var li = document.createElement("li");
    li.setAttribute("id", Records.ReviewID);
    li.setAttribute("onclick", "ShowDetail(\"" + Records.ReviewID + "\")")
    var imgProduct = document.createElement('img');
    imgProduct.src = "../ImageHandler/ImageServiceHandler.ashx?ImageID=" + Records.ImageID;
    imgProduct.className = 'RvPrdImage';
    imgProduct.style.width = '50px';
    imgProduct.style.height = '30px';
    imgProduct.style.border= '2px solid gold';
    li.appendChild(imgProduct);
    var Spanform = document.createElement('span');
    Spanform.className = "from";
    var Spanstar = document.createElement('span');
    Spanstar.className = "glyphicons star";
    var ic = document.createElement('i');   
    Spanstar.appendChild(ic);   
    Spanform.innerHTML = '' + Records.User_Nam;
    Spanform.appendChild(Spanstar);
    li.appendChild(Spanform);
    var Spantitle = document.createElement('span');
    Spantitle.className = "title";
    Spantitle.innerHTML = "" + Records.ReviewDescription;
    li.appendChild(Spantitle);
    var SpanDate = document.createElement('span');
    SpanDate.className = "title";
    SpanDate.innerHTML = "\t &nbsp;&nbsp;&nbsp;" + ConvertJsonToDate(Records.RDate);
    li.appendChild(SpanDate);  
    ul.appendChild(li);

}
function ConvertJsonToDate(jsonDate) {
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
        var result = day + '-' + monthNames[month] + '-' + year;
        return result;
    }
}
function ShowDetail(ReviewID)
{

    var Reviewdivholder = $('#ReviewDetails');
    var ReviewDetailed = {};
    var Product = new Object();
    Product.ReviewID = ReviewID;
    ReviewDetailed = GetDetails(Product);
  
    $("#ReviewDetails").find("#previewReviewDet").remove();
    $('#HdnReviewID').val(ReviewDetailed[0].ReviewID);
    
    var html = ('<div id="previewReviewDet"><div class="header"><h1>' + ReviewDetailed[0].ReviewDescription + '</h1><div class="from"><i class="halflings-icon user"></i><b>' + ReviewDetailed[0].User_Nam +'</b></div>'
							+ '<div class="date"><i class="halflings-icon time"></i> Day, <b>'+ConvertJsonToDate(ReviewDetailed[0].RDate)+'</b></div>'
							+'<div class="menu" style="background-color:red;"></div>'
							+ '</div><div class="content">'
                            + '<p>Product No: ' + ReviewDetailed[0].ProductNo + ''
							+ '<p>User Review: ' + ReviewDetailed[0].ReviewDescription + ''
                            + '<p>Product Image:'
                            + '<div><img class="ProductImage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + ReviewDetailed[0].ImageID + '"></img></div>'
                            +'<div style="height:10%;"></div>'
                            +'</div><div class="replyForm" style="padding-top:10px;">'
							+'<fieldset>'
     						+ '<div class="actions"><a class="btn btn-danger" onclick="ReviewClick(1)">REJECT</a>\t<a class="btn btn-success" onclick="ReviewClick(2)">APPROVE</a>'
							+ '</div></fieldset></div></div></div></div>');
    Reviewdivholder.append(html);
    }

function GetDetails(Product)
{
   
    var ds = {};
    var table = {};
    var data = "{'ReviewObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/ProductReview.aspx/GetReviewDetailOnID");
    table = JSON.parse(ds.d);
    return table;
}
function ReviewClick(Count)
{
    debugger;
   
    var Result;
    var ReviewID = document.getElementById('HdnReviewID').value;
    if (Count == '1')
    {
        var Product = new Object();
        Product.ReviewID = ReviewID;
        var data = "{'ProductObj':" + JSON.stringify(Product) + "}";
        getJsonData(data, "../AdminPanel/ProductReview.aspx/UpdateReviewCancelled");
        $("#ReviewDetails").find("#previewReviewDet").remove();
        $("#ReviewPreview").find('#' + ReviewID).remove();
        
    }
    else if(Count=='2')
    {
        var Product = new Object();
        Product.ReviewID = ReviewID;
        var data = "{'ProductObj':" + JSON.stringify(Product) + "}";
        getJsonData(data, "../AdminPanel/ProductReview.aspx/UpdateReviewModatate");
        $("#ReviewDetails").find("#previewReviewDet").remove();
        $("#ReviewPreview").find('#' + ReviewID).remove();        
      
    }
    BindNotification();
}




