$("document").ready(function (e) {

    try
    {
        parent.document.title = Pages.Dashboard;
        var boutique_id = getboutiqueID();
        var ImageUrl = "url(../ImageHandler/ImageServiceHandler.ashx?BoutiqueID=" + boutique_id + ')';
        //var ImageUrl ="url(../Home/images/Background.jpg)";
        var TiqueImage = document.getElementById("content1");
        TiqueImage.style.backgroundImage = ImageUrl;
        TiqueImage.style.backgroundSize = 'cover';
        TiqueImage.style.backgroundRepeat = 'no-repeat';
        TiqueImage.style.backgroundPosition = 'center center';
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "DashBoard";
        ExceptionTrack.Method = "Document.Ready";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
   
    debugger;
    BindTileValues();
    BindAllImages();//TrendsGraph 
    
});//end of document.ready


function getboutiqueID() {
    try
    {
        var table = {};
        var boutique = new Object();
        table = GetBoutique_id(boutique);
        return table;
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "DashBoard";
        ExceptionTrack.Method = "getboutiqueID";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
   
}

function GetBoutique_id(boutique)
{
    try{
        var ds = {};
        var table = {};
        var data = "{'boutiqueObj':" + JSON.stringify(boutique) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/BoutiqueID");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "DashBoard";
        ExceptionTrack.Method = "GetBoutique_id";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
   
}

function BindTileValues()//common tiles
{   
     BindAllTiles();
}

function BindUserTile()
{
    try{
        var table = {};
        var User = new Object();
        table = GetAllUsers(User);
        $("#UsersBadge").text(table.length);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "DashBoard";
        ExceptionTrack.Method = "BindUserTile";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindTotalProducts()
{
    try
    {

        var table = {};
        var Products = new Object();
        table = GetAllProducts(Products);
        $("#TotalProductsBadge").text(table.length);
        BindDashBoardProducts(table);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "DashBoard";
        ExceptionTrack.Method = "BindTotalProducts";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    
}

function BindAllTiles()
{
    debugger;
    try{
        var table = {};
        var Notifications = new Object();
        table = GetAllNotifications(Notifications);
        $("#TotalProductsBadge").text(table[0].ProductC);
        $("#UsersBadge").text(table[0].UserC);
        $("#VisitsBadge").text(table[0].TrendC);
        $("#NotificationBadge").text(table[0].NotificationC);
        $("#NotInStockBadge").text(table[0].OutStockC);
    }
    catch(e)
    {
       
    }
      
  }

  function BindVisits()
{
      try
      {
          var table = {};
          var Visits = new Object();
          table = GetAllVisits(Visits);
          $("#VisitsBadge").text(table.length);
      }
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "BindVisits";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }
   
  }

  function BindOutOfStock()
  {
      try
      {
          var table = {};
          var Products = new Object();
          table = GetAllOutOfStock(Products);
          $("#NotInStockBadge").text(table.length);
      }
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "BindOutOfStock";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }
    
  }

  function BindAppInstalled()
  {
      try
      {
          var table = {};
          var AppIntall = new Object();
          table = GetAppInstalledDetails(AppIntall);
          $("#InstalledBadge").text(table.length);
      }
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "BindAppInstalled";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }
     
  }


//listbox
  function Binddashboardlistuser(records)
  {
      try
      {
          $.each(records, function (index, records) {
              var createddate = null;
              if (records.createddate != null) {
                  var src = records.createddate;//"/date(1302589032000+0400)/";
                  src = src.replace(/[^0-9 +]/g, '');
                  var createddate = new date(parseint(src));
              }
             var html = '<li class="yellow" userid="' + records.userid + '"><a href="#"></a><span class="break"></span><strong>name:</strong> ' + records.name + '<br/><strong>since:</strong> <br/>' + createddate + '<strong>mobile:</strong> ' + records.mobile + '</li>';
              $(".lastusers").append(html);
          })
      }
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "Binddashboardlistuser";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }
  
  }

  function BindDashBoardProducts(Records)
  {
      try{
          $.each(Records, function (index, Records) {
              var html = '<li class="green" productid="' + Records.ProductID + '"><a href="#"></a><span class="break"></span><strong>Name:</strong> ' + Records.Name + '<br/><strong>Description:</strong> <br/>' + Records.Description + '<strong>Price:</strong> ' + Records.Price + '</li>';
              $(".products").append(html);
          })
      }
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "BindDashBoardProducts";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);

      }
    
  }

  function BindDashBoardNotifications(Records) {

      try
      {
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
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "BindDashBoardNotifications";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }
     
      
  }

  function GetAllUsers(User) {
      try{
          var ds = {};
          var table = {};
          var data = "{'Usersobj':" + JSON.stringify(User) + "}";
          ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllUsersByBoutiqueID");
          table = JSON.parse(ds.d);
          return table;
      }
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "GetAllUsers";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }
   
}

  function GetAllProducts(Products)
  {
      try{
          var ds = {};
          var table = {};
          var data = "{'productObj':" + JSON.stringify(Products) + "}";
          ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllProductsByBoutiqueID");
          table = JSON.parse(ds.d);
          return table;
      }
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "GetAllProducts";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }
  
}

  function GetAllNotifications(Notifications)
  {
      try{
          var ds = {};
          var table = {};
          var data = "{'NotifyObj':" + JSON.stringify(Notifications) + "}";
          ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetCountTiles");
          table = JSON.parse(ds.d);
          return table;
      }
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "GetAllNotifications";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }
    
}

  function GetAllVisits(Visits)
  {
      try{
          var ds = {};
          var table = {};
          var data = "{'productObj':" + JSON.stringify(Visits) + "}";
          ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllProductViewDetailsByBoutiqueID");
          table = JSON.parse(ds.d);
          return table;
      }
      catch(e)
      {

          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "GetAllVisits";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }
  
}

  function GetAllOutOfStock(Products) {
      try
      {
          var ds = {};
          var table = {};
          var data = "{'productObj':" + JSON.stringify(Products) + "}";
          ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllProductOutOfStock");
          table = JSON.parse(ds.d);
          return table;
      }
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "GetAllOutOfStock";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }
   
}

  function GetAppInstalledDetails(AppIntall)
  {
      try {
          var ds = {};
          var table = {};
          var data = "{'AppIntallObj':" + JSON.stringify(AppIntall) + "}";
          ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllAppInstalled");
          table = JSON.parse(ds.d);
          return table;
      }
      catch (e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "GetAllOutOfStock";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }

   
  }

  function BindAllImages() {
      debugger;
      try
      {
          var imageids = {};
          var ProductLog = {};
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

                  name: 'Trends',
                  colorByPoint: true,
                  data: [
                      { name: imageids[0].Name, y: imageids[0].prductcounts, id: imageids[0].ProductNo, Imagenum: imageids[0].ImageID },
                      { name: imageids[1].Name, y: imageids[1].prductcounts, id: imageids[1].ProductNo, Imagenum: imageids[1].ImageID },
                      { name: imageids[2].Name, y: imageids[2].prductcounts, id: imageids[2].ProductNo, Imagenum: imageids[2].ImageID },
                      { name: imageids[3].Name, y: imageids[3].prductcounts, id: imageids[3].ProductNo, Imagenum: imageids[3].ImageID },
                      { name: imageids[4].Name, y: imageids[4].prductcounts, id: imageids[4].ProductNo, Imagenum: imageids[4].ImageID },
                      { name: imageids[5].Name, y: imageids[5].prductcounts, id: imageids[5].ProductNo, Imagenum: imageids[5].ImageID },
                      { name: imageids[6].Name, y: imageids[6].prductcounts, id: imageids[6].ProductNo, Imagenum: imageids[6].ImageID },
                      { name: imageids[8].Name, y: imageids[8].prductcounts, id: imageids[8].ProductNo, Imagenum: imageids[8].ImageID },
                      { name: imageids[9].Name, y: imageids[9].prductcounts, id: imageids[9].ProductNo, Imagenum: imageids[9].ImageID }
                  ]

              }]
          };
          var chart = new Highcharts.Chart(options);
      }
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "BindAllImages";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }

   

  }

  function GetAllProductImages() {
      try
      {
          var ds = {};
          var table = {};
          var data = {};
          ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllProductImages");
          table = JSON.parse(ds.d);
          return table;
      }
      catch(e)
      {
          var ExceptionTrack = new Object();
          ExceptionTrack.Description = e.message;
          ExceptionTrack.Module = "DashBoard";
          ExceptionTrack.Method = "GetAllProductImages";
          ExceptionTrack.ErrorSource = "JavaScript";
          ExceptionTrack.IsMobile = false;
          InsertException(ExceptionTrack);
      }
      
      
  }
  