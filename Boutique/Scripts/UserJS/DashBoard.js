﻿$("document").ready(function (e) {
    parent.document.title = "DashBoard";
         
    var boutique_id = getboutiqueID();  
    var ImageUrl = "url(../ImageHandler/ImageServiceHandler.ashx?BoutiqueID=" + boutique_id+')';
    //var ImageUrl ="url(../Home/images/Background.jpg)";
    var TiqueImage = document.getElementById("content1");
    TiqueImage.style.backgroundImage = ImageUrl;
    TiqueImage.style.backgroundSize = 'contain';
    TiqueImage.style.backgroundRepeat = 'no-repeat';  
    BindTileValues();
    BindAllImages();//TrendsGraph 
    
});//end of document.ready


function getboutiqueID() {
    debugger;
    var table = {};
    var boutique = new Object();
    table = GetBoutique_id(boutique);
    return table;
  
  
}

function GetBoutique_id(boutique)
{
    debugger;

    var ds = {};
    var table = {};
    var data = "{'boutiqueObj':" + JSON.stringify(boutique) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/BoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}




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

function BindTileValues()//common tiles
{
    
    BindUserTile();//usertile
    BindTotalProducts();//totalboutiques
    BindNotifications();
    BindVisits();
    BindOutOfStock();
  //  BindAppInstalled()

}
function BindUserTile()
{
    var table = {};
    var User = new Object();
    table = GetAllUsers(User);
    $("#UsersBadge").text(table.length);
    BindDashBoardListUser(table);
}

function BindTotalProducts()
{
    var table = {};
    var Products = new Object();
    table = GetAllProducts(Products);
    $("#TotalProductsBadge").text(table.length);
    BindDashBoardProducts(table);
}

  function BindNotifications()
  {
      var table = {};
      var Notifications = new Object();
      table = GetAllNotifications(Notifications);
      $("#NotificationBadge").text(table.length);
      BindDashBoardNotifications(table);
  }

  function BindVisits()
  {
      var table = {};
      var Visits = new Object();
      table = GetAllVisits(Visits);
      $("#VisitsBadge").text(table.length);
  }
  function BindOutOfStock()
  {
      var table = {};
      var Products = new Object();
      table = GetAllOutOfStock(Products);
      $("#NotInStockBadge").text(table.length);
  }

  function BindAppInstalled()
  {
      var table = {};
      var AppIntall = new Object();
      table = GetAppInstalledDetails(AppIntall);
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


  function GetAllUsers(User) {
    var ds = {};
    var table = {};
    var data = "{'Usersobj':" + JSON.stringify(User) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllUsersByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

  function GetAllProducts(Products)
{
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Products) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllProductsByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

  function GetAllNotifications(Notifications)
{
    var ds = {};
    var table = {};
    var data = "{'NotifyObj':" + JSON.stringify(Notifications) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllNotificationsByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

  function GetAllVisits(Visits)
{
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Visits) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllProductViewDetailsByBoutiqueID");
    table = JSON.parse(ds.d);
    return table;
}

  function GetAllOutOfStock(Products) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Products) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllProductOutOfStock");
    table = JSON.parse(ds.d);
    return table;
}

  function GetAppInstalledDetails(AppIntall)
{
    var ds = {};
    var table = {};
    var data = "{'AppIntallObj':" + JSON.stringify(AppIntall) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllAppInstalled");
    table = JSON.parse(ds.d);
    return table;
  }

  function BindAllImages() {
      debugger;
      var imageids = {};
      imageids = GetAllProductImages();
      
      var options = {

          chart: {
              renderTo: 'container',
              type: 'column'
          },
          title: {
              text: 'Trending Products'
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              type: 'category',

          },
          yAxis: {
              title: {
                  text: 'Product View Count'
              }

          },
          legend: {
              enabled: false
          },
          plotOptions: {
              series: {
                  borderWidth: 0,
                  dataLabels: {
                      enabled: true,
                      format: '{point.y:.f} Views'
                  }
              }
          },

          tooltip: {
              useHTML: true,
              headerFormat: '<span style="font-size:11px;color:#EB3C00;">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:f} Views</b><br/>Prod No:{point.id}<br/><img src="../Media/GraphPic/Tiquepic_{point.Imagenum}.jpeg" style="border:0;height:120px;width:auto;">',
                
          },
          series: [{

              name: 'TiquesInn',
              colorByPoint: true,
              data: [
                  { name: imageids[0].Name, y: imageids[0].prductcounts, id: imageids[0].ProductNo, Imagenum:0 },
                  { name: imageids[1].Name, y: imageids[1].prductcounts, id: imageids[1].ProductNo, Imagenum:1 },
                  { name: imageids[2].Name, y: imageids[2].prductcounts, id: imageids[2].ProductNo, Imagenum:2 },
                  { name: imageids[3].Name, y: imageids[3].prductcounts, id: imageids[3].ProductNo, Imagenum:3 },
                  { name: imageids[4].Name, y: imageids[4].prductcounts, id: imageids[4].ProductNo, Imagenum:4 },
                  { name: imageids[5].Name, y: imageids[5].prductcounts, id: imageids[5].ProductNo, Imagenum:5 },
                  { name: imageids[6].Name, y: imageids[6].prductcounts, id: imageids[6].ProductNo, Imagenum:6 },
                  { name: imageids[7].Name, y: imageids[7].prductcounts, id: imageids[7].ProductNo, Imagenum:7 },
                  { name: imageids[8].Name, y: imageids[8].prductcounts, id: imageids[8].ProductNo, Imagenum:8 },
                  { name: imageids[9].Name, y: imageids[9].prductcounts, id: imageids[9].ProductNo, Imagenum:9 }
              ]

          }]
      };
      debugger;
      var chart = new Highcharts.Chart(options);

  }
  function GetAllProductImages() {
      
      var ds = {};
      var table = {};
      var data = {};
      ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllProductImages");
      table = JSON.parse(ds.d);
      return table;
  }
  