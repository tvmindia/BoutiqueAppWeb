$("document").ready(function (e) {
    parent.document.title = "Boutique Profile";

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.     
        document.getElementById('imageUpload').addEventListener('change', handleFileSelect, false);
        document.getElementById('logoUpload').addEventListener('change', handleLogoSelect, false);
    }
   
    var LoginUserRole = getRole();
    $('#hdfRole').val(LoginUserRole);

    BindAsyncOwnerTable();
    $('#OwnerTable').DataTable({
        "bPaginate": false,             //Search and Paging implementation
    });
    var jsonResult = {};
    jsonResult = GetBoutiques();
    if (jsonResult != undefined) {

        BindBoutiqueTextBoxes(jsonResult);
        GetBoutiqueImageAndLogo(jsonResult[0].BoutiqueID)
    }

    $(".CancelClear").live({
        click: function (e) {// Clear controls
            clearControls();
        }
    })

    $(".CancelOwner").live({
        click: function (e) {// Clear controls
            clearOwnerControls();
        }
    })


    $(".ownerdelete").live(
      {
          click: function (e) {



              $('#rowfluidDiv').hide();
              $('.alert-success').hide();
              $('.alert-error').hide();
              var jsonResult = {};
              editedrow = $(this).closest('tr');
              var Owners = new Object();
             
              Owners.UserID = editedrow.attr("userID");
              Owners.OwnerID = editedrow.attr("ownerID");
              jsonResult = DeleteOwner(Owners);
              if (jsonResult != undefined) {
                  if (jsonResult == "1") {
                      BindAsyncOwnerTable()//Gridbind
                      $('#rowfluidDiv').show();
                      $('.alert-success').show();
                  }
                  if (jsonResult != "1") {
                      BindAsyncOwnerTable()//Gridbind
                      $('#rowfluidDiv').show();
                      $('.alert-error').show();
                  }
              }
              return false;
          }
      })

    $(".owneredit").live(
         {
             click: function (e) {
                 $('#rowfluidDiv').hide();
                 $('.alert-success').hide();
                 $('.alert-error').hide();
                 var jsonResult = {};
                 editedrow = $(this).closest('tr');
                 var Owners = new Object();
                 
                 Owners.UserID = editedrow.attr("userID");
                 Owners.OwnerID = editedrow.attr("ownerID");
                 jsonResult = GetOwner(Owners);
                 if (jsonResult != undefined) {

                     BindOwnerTextBoxes(jsonResult);
                 }


                 return false;
             }
         })

    //addboutique
    $(".AddBoutique").live({
        click: function (e) {// submit button click

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var boutiquid = $("#hdfBoutiqueID").val();
            var result = "";
            var Boutique = new Object();

            Boutique.AppVersion = $("#txtAppVersion").val();
            Boutique.Name = $("#txtBouquetName").val();
            Boutique.StartedYear = $("#txtStartYear").val();
            Boutique.AboutUs = $("#txtAboutus").val();
            Boutique.Caption = $("#txtCaption").val();
            Boutique.Location = $("#txtLocation").val();
            Boutique.Address = $("#txtAddress").val();
            Boutique.Phone = $("#txtPhone").val();
            Boutique.Timing = $("#txtTimings").val();
            Boutique.WorkingDays = $("#txtWorkingDays").val();
            Boutique.FbLink = $("#txtFacebooklink").val();
            Boutique.InstagramLink = $("#txtInstatgramlink").val();
            Boutique.Latitude = $("#txtLatitude").val();
            Boutique.Longitude = $("#txtLongitude").val();
            debugger;
            //result = InsertBoutique(Boutique);
            if (boutiquid != null) {
                var imgresult = "";
                var _URL = window.URL || window.webkitURL;
                var formData = new FormData();
                var imagefile, logoFile, img;

                if ((imagefile = $('#imageUpload')[0].files[0])) {
                    img = new Image();
                    img.onload = function () {
                        var image = $('#imageUpload')[0].files[0];
                       

                        formData.append('imagefiles', image, imagefile.name);
                        formData.append('', boutiquid);
                        //  formData.append('file', $('#productfile')[0].files[0]);
                        //postBlobAjax(formData, "../ImageHandler/ImageServiceHandler.ashx");
                    };
                    if ((logoFile = $('#logoUpload')[0].files[0])) {
                        img = new Image();
                        img.onload = function () {
                            var logo = $('#logoUpload')[0].files[0];


                            formData.append('logofiles', logo, logoFile.name);
                            formData.append('', boutiquid);
                            //  formData.append('file', $('#productfile')[0].files[0]);
                            //postBlobAjax(formData, "../ImageHandler/ImageServiceHandler.ashx");
                        };
                        debugger;
                        var image = $('#imageUpload')[0].files[0];
                        
                        var logo = $('#logoUpload')[0].files[0];
                        formData.append('imagefiles', image, imagefile.name);
                        formData.append('logofiles', logo, logoFile.name);
                        formData.append('Longitude', Boutique.Longitude);
                        formData.append('Latitude',Boutique.Latitude);
                        formData.append('BoutiqueId', boutiquid);
                        formData.append('AppVersion', Boutique.AppVersion);
                        formData.append('Name', Boutique.Name);
                        formData.append('StartYear',Boutique.StartedYear);
                        formData.append('AboutUs',Boutique.AboutUs);
                        formData.append('Caption',Boutique.Caption);
                        formData.append('Location',Boutique.Location);
                        formData.append('Address', Boutique.Address);
                        formData.append('Phone',Boutique.Phone);
                        formData.append('Timing',Boutique.Timing);
                        formData.append('WorkingDays',Boutique.WorkingDays);
                        formData.append('FbLink',Boutique.FbLink);
                        formData.append('InstagramLink',Boutique.InstagramLink);
                    }
                    postBlobAjax(formData, "../AdminPanel/People.aspx/InsertImage&Logo");
                }
                
            }
        }
    })

    $(".AddOwner").live({
        click: function (e) {

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var result = "";
            var Owners = new Object();

            if ($("#hdfUserID").val() != "")
            {
                Owners.UserID = $("#hdfUserID").val();
            }
            else {
                alert("Please Select A User..");
                return;
            }
         
            Owners.Name = $("#txtOwnerName").val();
            Owners.Address = $("#txtOwnerAddress").val();
            Owners.Phone = $("#txtPhone").val();
            Owners.Email = $("#txtOwnerEmail").val();
            Owners.DOB = $("#DOBDate").val();

            Owners.Gender = "Male";

            Owners.Profile = $("#txtProfile").val();
            Owners.OwnerID = $("#hdfOwnerID").val();

            result = InsertOwner(Owners);
            if (result == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
            }
            if (result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
            }

        }
    })

});//end of document.ready


function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    $("#imageList").find(".thumb").remove();
    // Loop through the FileList and render image files as thumbnails.
    var f;
    f = files[0];
    //for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
        //continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
        return function (e) {
            // Render thumbnail.
            var span = document.createElement('span');
            span.innerHTML = ['<img class="thumb" src="', e.target.result,
                             '" title="', escape(theFile.name), '"/>'].join('');
            document.getElementById('imageList').insertBefore(span, null);
        };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
    //}
}


//post File/blog to Server

function handleLogoSelect(evt) {
    var files = evt.target.files; // FileList object
    $("#logoList").find(".logo").remove();
    // Loop through the FileList and render image files as thumbnails.
    var f;
    f = files[0];
    //for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
        //continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
        return function (e) {
            // Render thumbnail.
            var span = document.createElement('span');
            span.innerHTML = ['<img class="logo" src="', e.target.result,
                             '" title="', escape(theFile.name), '"/>'].join('');
            document.getElementById('logoList').insertBefore(span, null);
        };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
    //}
}


//post File/blog to Server

function postBlobAjax(formData, page) {
    
    //debugger;
    //var request = new XMLHttpRequest();
    //request.open("POST", page);
    //request.send(formData);
    $.ajax({
        type: "POST",
        url: "../ImageHandler/PhotoUploadHandler.ashx",
        contentType: false,
        headers: { 'Cache-Control': 'no-cache' },
        async: false,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        traditional: true,

        success: function (data) {
            if (status != 'error') {
                //var my_path = "MediaUploader/" + status;
                // $("#myUploadedImg").attr("src", my_path);
                if (data == "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                }
                if (data != "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                }
            }
        },
        processData: false,

        error: function () {
            alert("Whoops something went wrong!");
        }
    });
}
//post File/blog to Server


function getRole() { 
    var table = {};
    var Role = new Object();
    table = GetLogin_Role(Role);
    return table;
}

function GetLogin_Role(Role) {
     var ds = {};
    var table = {};
    var data = "{'boutiqueObj':" + JSON.stringify(Role) + "}";
    ds = getJsonData(data, "../AdminPanel/Profile.aspx/Role");
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

function InsertBoutique(Boutique) {
    var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Profile.aspx/NewBoutique");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function GetBoutiques() {
    var ds = {};
    var Boutique = new Object();
    var table = {};
    var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
    ds = getJsonData(data, "../AdminPanel/Profile.aspx/BindBoutiqueDetails");
    table = JSON.parse(ds.d);
    return table;
}
function listToAray(fullString, separator) {
    var fullArray = [];

    if (fullString !== undefined && fullString!=null) {
        if (fullString.indexOf(separator) == -1) {
            fullAray.push(fullString);
        } else {
            fullArray = fullString.split(separator);
        }
    }

    return fullArray;
}
function BindBoutiqueTextBoxes(Records) {
    //$.each(Records, function (index, Records) {
   
    var coordinates = Records[0].latlong;
    var arrayCoordinates = listToAray(coordinates, ',');
   
        $("#txtAppVersion").val(Records[0].AppVersion);
        $("#txtBouquetName").val(Records[0].Name);
        $("#txtStartYear").val(Records[0].StartedYear);
        $("#txtAboutus").val(Records[0].AboutUs);
        $("#txtCaption").val(Records[0].Caption);
        $("#txtLocation").val(Records[0].Location);
        $("#txtAddress").val(Records[0].Address);
        $("#txtPhone").val(Records[0].Phone);
        $("#txtTimings").val(Records[0].Timing);
        $("#txtWorkingDays").val(Records[0].WorkingDays);
        $("#txtFacebooklink").val(Records[0].FBLink);
        $("#txtInstatgramlink").val(Records[0].InstagramLink);
        $("#txtLatitude").val(arrayCoordinates[0]);
        $("#txtLongitude").val(arrayCoordinates[1]);
        $("#hdfBoutiqueID").val(Records[0].BoutiqueID);
    //})
   
}

function GetBoutiqueImageAndLogo(boutiqueId) {
    debugger;
    if ($("#imageList").find(".thumb") != null || $("#imageList").find(".thumb") != 'undefined') {
        $("#imageList").find(".thumb").remove();
    }
    if ($("#logoList").find(".logo") != null || $("#logoList").find(".logo") != 'undefined') {
        $("#logoList").find(".logo").remove();
    }
    var span = document.createElement('span');
    span.innerHTML = ['<img id="boutiqueImage" class="thumb" src="" title=""/>'].join('');
    document.getElementById('imageList').insertBefore(span, null);
    var spanlogo = document.createElement('span');
    spanlogo.innerHTML = ['<img id="boutiqueLogo" class="logo" src="" title=""/>'].join('');
    document.getElementById('logoList').insertBefore(spanlogo, null);
    var imgbtq = document.getElementById('boutiqueImage');
    var logobtq = document.getElementById('boutiqueLogo');
    imgbtq.src = "../ImageHandler/ImageServiceHandler.ashx?BoutiqueId=" + boutiqueId;
    logobtq.src = "../ImageHandler/ImageServiceHandler.ashx?BoutiqueLogoID=" + boutiqueId;
    //if (ImageIsNull == "0") {
    //    $("#list").find(".thumb").remove();
    //    var span = document.createElement('span');
    //    span.innerHTML = ['<img id="designerimage" class="thumb" src="../img/no-user-image.gif" title=""/>'].join('');
    //    document.getElementById('list').insertBefore(span, null);
    //}
    return;

}

function clearControls() {
    $("#txtAppVersion").val('');
    $("#txtBouquetName").val('');
    $("#txtStartYear").val('');
    $("#txtAboutus").val('');
    $("#txtCaption").val('');
    $("#txtLocation").val('');
    $("#txtAddress").val('');
    $("#txtPhone").val('');
    $("#txtTimings").val('');
    $("#txtWorkingDays").val('');
    $("#txtFacebooklink").val('');
    $("#txtInstatgramlink").val('');
    $("#imageList").find(".thumb").remove();
    $("#logoList").find(".logo").remove();
    $("#txtLatitude").val('');
    $("#txtLongitude").val('');
    $('#rowfluidDiv').hide();
}

function BindOwnerTextBoxes(Records) {
    $.each(Records, function (index, Records) {

        $("#txtOwnerName").val(Records.Name);
        $("#txtOwnerAddress").val(Records.Address);
        $("#txtPhone").val(Records.Mobile);
        $("#txtOwnerEmail").val(Records.Email);
        $("#DOBDate").val(ConvertJsonToDate(Records.DOB));
        $("#radioMale").val();
        $("#txtProfile").val(Records.Profile);
        $("#hdfOwnerID").val(Records.OwnerID);
    })
    $(".AddOwner").text("Modify");
}

function clearOwnerControls() {

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $("#txtOwnerName").val('');
    $("#txtOwnerAddress").val('');
    $("#txtPhone").val('');
    $("#txtOwnerEmail").val('');
    $("#DOBDate").val('');
    //  $("#radioMale").val('');
    $("#txtProfile").val('');
    $("#hdfOwnerID").val('');
    $(".AddOwner").text("Save");
} 

function BindOwnerTable(Records) {
 
  
   
    var checkrole = $('#hdfRole').val(); 
    if (checkrole == 'Manager')
    {
        $("tbody#ownerrows tr").remove();
      $("thead#thead tr").remove();
      var html = ' <tr><th>Owner Name</th><th>Mobile</th><th>Email</th></tr> ';
      $("#thead").append(html);
        $.each(Records, function (index,Records)
        {          
            var html = '<tr userID="' + Records.UserID + '"  ownerID="' + Records.OwnerID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + (Records.Email == null ? "-": Records.Email) + '</td></tr>';
        $("#OwnerTable").append(html);
        })
    }
    else
    {
        $("tbody#ownerrows tr").remove();
       $("thead#thead tr").remove();
       var html = ' <tr><th>Owner Name</th><th>Mobile</th><th>Email</th></tr> ';
       $("#thead").append(html);
        $.each(Records, function (index,Records)
        {
        var html = '<tr userID="' + Records.UserID + '"  ownerID="' + Records.OwnerID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info owneredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger ownerdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#OwnerTable").append(html);
        })       
    }

}

function BindAsyncOwnerTable() {
    var jsonResult = {};
    var Owner = new Object();
    jsonResult = GetAllOwners(Owner);
    if (jsonResult != undefined) {     
        BindOwnerTable(jsonResult);
    }
}

function InsertOwner(Owners) {
    var data = "{'ownersObj':" + JSON.stringify(Owners) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Profile.aspx/InsertOwner");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function DeleteOwner(Owner) {
    var ds = {};
    var table = {};
    var data = "{'ownersObj':" + JSON.stringify(Owner) + "}";
    ds = getJsonData(data, "../AdminPanel/Profile.aspx/DeleteOwner");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllOwners(Owner) {
    var ds = {};
    var table = {};
    var data = "{'OwnerObj':" + JSON.stringify(Owner) + "}";
    ds = getJsonData(data, "../AdminPanel/Profile.aspx/GetAllOwners");
    table = JSON.parse(ds.d);
    return table;
}

function GetOwner(Owner) {
    var ds = {};
    var table = {};
    var data = "{'ownersObj':" + JSON.stringify(Owner) + "}";
    ds = getJsonData(data, "../AdminPanel/Profile.aspx/GetOwner");
    table = JSON.parse(ds.d);
    return table;
}


