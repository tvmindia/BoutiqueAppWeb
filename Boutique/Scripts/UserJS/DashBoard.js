$("document").ready(function (e) {
    parent.document.title = "DashBoard";
    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';
    var TiqueImage = document.getElementById("tiqueImage");
    TiqueImage.src = "../ImageHandler/ImageServiceHandler.ashx?BoutiqueID="+boutiqueid;
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
    BindDashBoardListUser(table);
}

function BindTotalProducts(boutiqueid)
{
    var table = {};
    table = GetAllProducts(boutiqueid);
    $("#TotalProductsBadge").text(table.length);
    BindDashBoardProducts(table);
}

  function BindNotifications(boutiqueid)
  {
      var table = {};
      table = GetAllNotifications(boutiqueid);
      $("#NotificationBadge").text(table.length);
      BindDashBoardNotifications(table);
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


//listbox
  function BindDashBoardListUser(Records)
  {
   
      $.each(Records, function (index, Records) {
          var createdDate = null;
          if (Records.CreatedDate != null) {
              var src = Records.CreatedDate;//"/Date(1302589032000+0400)/";
              src = src.replace(/[^0-9 +]/g, '');
              var createdDate = new Date(parseInt(src));
          }
          

       //   var create = new Date(Records.CreatedDate);
          var html = '<li class="yellow" Userid="' + Records.UserID + '"><a href="#"></a><span class="break"></span><strong>Name:</strong> ' + Records.Name + '<br/><strong>Since:</strong> <br/>' + createdDate + '<strong>Mobile:</strong> ' + Records.Mobile + '</li>';
          $(".LastUsers").append(html);
      })
  }

  function BindDashBoardProducts(Records)
  {
      $.each(Records, function (index, Records) {
          var html = '<li class="green" productid="' + Records.ProductID + '"><a href="#"></a><span class="break"></span><strong>Name:</strong> ' + Records.Name + '<br/><strong>Description:</strong> <br/>' + Records.Description + '<strong>Price:</strong> ' + Records.Price + '</li>';
          $(".products").append(html);
      })
  }

  function BindDashBoardNotifications(Records) {
     
      $.each(Records, function (index, Records) {

          var endDate = null;
          if (Records.EndDate != null) {
              var src = Records.EndDate;//"/Date(1302589032000+0400)/";
              src = src.replace(/[^0-9 +]/g, '');
              var endDate = new Date(parseInt(src));
          }
          
          var html = '<li class="red" notificationid="' + Records.NotificationID + '"><a href="#"></a><span class="break"></span><strong>Title:</strong> ' + Records.Title + '<br/><strong>Description:</strong> <br/>' + Records.Description + '<strong>End Date:</strong> ' + endDate + '</li>';
          $(".Notify").append(html);
      })
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