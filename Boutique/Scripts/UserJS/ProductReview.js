$("document").ready(function (e) {
    var boutique_id = getboutiqueID();
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
    debugger;
    var table = {};
    var boutique = new Object();
    table = GetBoutique_id(boutique);
    return table;
}

function GetBoutique_id(boutique) {
    debugger;

    var ds = {};
    var table = {};
    var data = "{'boutiqueObj':" + JSON.stringify(boutique) + "}";
    ds = getJsonData(data, "../AdminPanel/ProductReview.aspx/BoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

function BindReview() {
    debugger;
    var Reviews = {};
    Reviews = GetAllReviews();

    //$("#olpreview").find(".liclas").remove();
    debugger;
    var i = 0;
    $.each(Reviews, function (index, Records) {

        MultiImageBind(Records, i);
        i = i + 1;
    })
    return false;
    //}
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
    debugger;
    var ul = document.getElementById("ReviewPreview");
    var li = document.createElement("li");
    li.setAttribute("id", Records.ReviewID);
    li.setAttribute("onclick", "ShowDetail(\"" + Records.ReviewID + "\")")
    var imgProduct = document.createElement('img');
    imgProduct.src = "../ImageHandler/ImageServiceHandler.ashx?ImageID=" + Records.ImageID;
    imgProduct.className = 'RvPrdImage';
    imgProduct.style.width = '10%';
    imgProduct.style.height = '10%';
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
function ShowDetail(id)
{
    debugger;
    alert(id);
    var ReviewDetailed = {};
    ReviewDetailed = GetDetails(id);
}
function GetDetails(id)
{
    debugger;
    ReviewID = id;
}




