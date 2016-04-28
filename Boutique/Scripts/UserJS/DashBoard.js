$("document").ready(function (e) {
    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';
    BindTileValues(boutiqueid);




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

function BindTileValues(boutiqueid)//common tiles
{
    debugger;
    BindUserTile(boutiqueid);//usertile
    BindTotalProducts(boutiqueid);//totalboutiques
    BindNotifications(boutiqueid);
    BindVisits(boutiqueid);
    BindOutOfStock(boutiqueid);
    BindAppInstalled(boutiqueid)

}
function BindUserTile(boutiqueid)
{
    var table = {};
    table=GetAllUsers(boutiqueid);
    $("#UsersBadge").text(table.length);
}

function BindTotalProducts(boutiqueid)
{
    var table = {};
    table = GetAllProducts(boutiqueid);
    $("#TotalProductsBadge").text(table.length);
}

  function BindNotifications(boutiqueid)
  {
      var table = {};
      table = GetAllNotifications(boutiqueid);
      $("#NotificationBadge").text(table.length);
  }

  function BindVisits(boutiqueid)
  {
      var table = {};
      table = GetAllVisits(boutiqueid);
      $("#VisitsBadge").text(table.length);
  }
  function BindOutOfStock(boutiqueid)
  {
      var table = {};
      table = GetAllOutOfStock(boutiqueid);
      $("#NotInStockBadge").text(table.length);
  }

  function BindAppInstalled(boutiqueid)
  {
      var table = {};
      table = GetAppInstalledDetails(boutiqueid);
      $("#InstalledBadge").text(table.length);
  }


function GetAllUsers(boutiqueid) {
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllUsersByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllProducts(boutiqueid)
{
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllProductsByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllNotifications(boutiqueid)
{
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllNotificationsByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllVisits(boutiqueid)
{
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllProductViewDetailsByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllOutOfStock(boutiqueid) {
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllProductOutOfStock");
    table = JSON.parse(ds.d);
    return table;
}

function GetAppInstalledDetails(boutiqueid)
{
    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllAppInstalled");
    table = JSON.parse(ds.d);
    return table;
}