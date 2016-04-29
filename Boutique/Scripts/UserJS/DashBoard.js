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
    //  $(".LastUsers").find("#mylist").remove();
     //$("#bouquetTable").find(".myrows").remove();
      $.each(Records, function (index, Records) {
       //   var create = new Date(Records.CreatedDate);
        //  var ddftfdf = JSON.stringify(Records.CreatedDate);
          //  var html = '<tr class="row_1" idval="' + Record.id + '"  chid="' + Record.id + '"><td width="15%" align="center" valign="middle"><input type="hidden" class="m-wrap span12 hftxtManuItemId"   id="hftxtManuItemId" value="' + Record.FocusItemManufacture.id + '"><a class="edit" chid="' + Record.id + '" suggestcatlog="' + Record.SuggestedCatlog + '" annualvol="' + Record.AnnualVolume + '" releaseqty="' + Record.ReleaseQuantity + '" targetpriz="' + Record.TargetPrize + '" certificate="' + Record.CertificateId + '" itemDescription="' + Record.ItemDescription + '" href="#">' + Record.SuggestedCatlog + '</a></td><td width="18%" height="20" align="center" valign="middle"><input  type="text" id="txtManuCost' + index + '" class="m-wrap span12 txtManuCost"   placeholder=""></td><td width="14%" height="20" align="center" valign="middle"><input type="text" id="txtLeadTime' + index + '" class="m-wrap span12 txtLeadTime"  placeholder=""></td><td width="14%" height="20" align="center" valign="middle"><input type="text" id="txtToolCharge' + index + '" class="m-wrap span12 txtToolCharge"  placeholder=""></td><td width="14%" align="center" valign="middle"><input type="text" id="txtMinQty' + index + '" class="m-wrap span12 txtMinQty"  placeholder=""></td><td width="11%" align="center" valign="middle"><a class="attachment"><img src="/Contents/assets/img/icn_attachment.png" alt="attachment"></a></td></tr>';
          //var html = '<tr class="myrows" boutiqueID="' + Records.BoutiqueID + '"><td>' + Records.Name + '</td><td class="center">' + Records.AppVersion + '</td><td class="center">' + Records.Location + '</td><td class="center">' + Records.Phone + '</td><td class="center">' + Records.Timing + '</td><td class="center">' + Records.WorkingDays + '</td></td><td class="center"><a class="btn btn-info Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger Delete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
          var html = '<li class="yellow" Userid="' + Records.UserID + '"><a href="#"></a><span class="break"></span><strong>Name:</strong> ' + Records.Name + '<br/><strong>Since:</strong> <br/>' + Records.CreatedDate + '<strong>Mobile:</strong> ' + Records.Mobile + '</li>';
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
          
          var html = '<li class="red" notificationid="' + Records.NotificationID + '"><a href="#"></a><span class="break"></span><strong>Title:</strong> ' + Records.Title + '<br/><strong>Description:</strong> <br/>' + Records.Description + '<strong>End Date:</strong> ' + Records.EndDate + '</li>';
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