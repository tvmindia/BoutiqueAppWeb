$("document").ready(function (e) {
    parent.document.title = "Order Status";
   

    BindOrdersTable();

    $('#OrdersTable').DataTable({
        "bPaginate": false,             //Search and Paging implementation
    });

    //------------ BINDING  Order details table------------//


    //---* Bind the orders table by converting JSON data of datatable into html table *--//

    function BindOrdersTable() {
        var jsonResult = {};
        var Order = new Object();
        jsonResult = GetAllOrders(Order);
        if (jsonResult != undefined) {
            FillOrderTable(jsonResult);
        }
    }

    //---* Get the datatable in form of JSON *--//

    function GetAllOrders(Order) {
        var ds = {};
        var table = {};
        var data = "{'OrderObj':" + JSON.stringify(Order) + "}";
        ds = getJsonData(data, "../AdminPanel/OrderStatus.aspx/GetAllOrders");
        table = JSON.parse(ds.d);
        return table;
    }


    //---* Creation of html table from received JSON *--//

    function FillOrderTable(Records) {
        $("tbody#userrows tr").remove();            //Remove all existing rows for refreshing
        $.each(Records, function (index, Records) {
           
            //var html = '<tr UserID="' + (Records.OrderID != null ? Records.OrderID : "-") + '" BoutiqueID="' + (Records.BoutiqueID != null ? Records.BoutiqueID : "-") + '"><td>' + (Records.OrderNo != null ? Records.OrderNo : "-") + '</td><td class="center">' + (Records.OrderDescription != null ? Records.OrderDescription : "-") + '</td><td class="center">' + (Records.OrderDate != null ? Records.OrderDate : "-") + '</td><td class="center">' + (Records.ForecastDeliveryDate != null ? Records.ForecastDeliveryDate : "-") + '</td><td class="center"><a class="btn btn-info OrderEdit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger OrderDelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';

            var html = '<tr UserID="' + (Records.OrderID != null ? Records.OrderID : "-") + '" BoutiqueID="' + (Records.BoutiqueID != null ? Records.BoutiqueID : "-") + '"><td>' + (Records.OrderNo != null ? Records.OrderNo : "-") + '</td><td class="center">' + (Records.OrderDescription != null ? Records.OrderDescription : "-") + '</td><td class="center"><a class="btn btn-info OrderEdit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger OrderDelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';

            $("#OrdersTable").append(html);
        });
    }


    //------------END :   BINDING  Order details table------------//


});

//---getting data as json-----//
function getJsonData(data, page) {
    var jsonResult = {};
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