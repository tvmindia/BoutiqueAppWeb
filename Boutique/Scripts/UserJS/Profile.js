
//document.ready
$("document").ready(function (e) {
    $('.imgdelete').hide();
    parent.document.title = Pages.Profile;
   
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        // Great success! All the File APIs are supported.     
        document.getElementById('imageUpload').addEventListener('change', handleFileSelect, false);
        document.getElementById('logoUpload').addEventListener('change', handleLogoSelect, false);
        document.getElementById('BannerUpload').addEventListener('change', handleBannerSelect, false);
    }

    var LoginUserRole = getRole();
    $('#hdfRole').val(LoginUserRole[0]);
    $('#hdfCreatedBy').val(LoginUserRole[1]);

    BindAsyncOwnerTable();
    $('#OwnerTable').DataTable({
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],

        "fnPageChange": "next"                  //Search and Paging implementation
    });

    botiqueProfileLoad();
    SetDefaultBannerImage();

    $(".CancelClear").live({
        click: function (e) {// Clear controls
            try
            {
                clearControls();
                RemoveStyle();
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "Profile";
                ExceptionTrack.Method = "CancelClear-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
        }
    })

    $(".CancelOwner").live({
        click: function (e) {// Clear controls
            try
            {
                clearOwnerControls();
                RemoveStyle();
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "Profile";
                ExceptionTrack.Method = "CancelOwner-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
        }
    })

    $(".ownerdelete").live(
      {
          click: function (e) {

              try
              {

                  $('#rowfluidDiv').hide();
                  $('.alert-success').hide();
                  $('.alert-error').hide();
                  editedrow = $(this).closest('tr');
                  var e = editedrow.attr("userID");
                  var p = "Delete";
                  DeleteCustomAlert('Are You Sure?', e, p);
              }
              catch(e)
              {
                  var ExceptionTrack = new Object();
                  ExceptionTrack.Description = e.message;
                  ExceptionTrack.Module = "Profile";
                  ExceptionTrack.Method = "ownerdelete-live";
                  ExceptionTrack.ErrorSource = "JavaScript";
                  ExceptionTrack.IsMobile = false;
                  InsertException(ExceptionTrack);
              }
              return false;
          }
      })

    $(".owneredit").live(
         {
             click: function (e) {
                 try
                 {
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
                 }
                 catch(e)
                 {
                     var ExceptionTrack = new Object();
                     ExceptionTrack.Description = e.message;
                     ExceptionTrack.Module = "Profile";
                     ExceptionTrack.Method = "owneredit-live";
                     ExceptionTrack.ErrorSource = "JavaScript";
                     ExceptionTrack.IsMobile = false;
                     InsertException(ExceptionTrack);
                 }

                 return false;
             }
         })

//--------* Banner Delete Click *----------//

    $(".imgdelete").live({
        click: function (e) {// Clear controls
          
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            try
            {
                var bid=$("#hdfBannerImgID").val();
                if (bid != '')
                {
                    var e = bid;
                    var p = "DeleteBanner";
                    DeleteCustomAlert("Are you sure?", e, p)
                }
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "Profile";
                ExceptionTrack.Method = "imgdelete-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
            return false;
        }
    })

    //addboutique
    $(".AddBoutique").live({
        click: function (e)
        {// submit button click       
            try
            {
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
                Boutique.BoutiqueID = boutiquid;
                var loginuser = $("#LoginName").text();
                if (boutiquid != null)
                {
                    if (((imagefile = $('#imageUpload')[0].files[0])!=undefined) || ((logoFile = $('#logoUpload')[0].files[0])!=undefined))
                    {
                        var formData = new FormData();
                        var imagefile, logoFile, img;
                        ///images
                        if ((imagefile = $('#imageUpload')[0].files[0]) != undefined) {
                            var image = $('#imageUpload')[0].files[0];
                            formData.append('imagefiles', image, imagefile.name);
                            formData.append('', boutiquid);
                        }
                        else {
                            imagefile = "";
                            formData.append('imagefiles', imagefile.name);
                        }

                        if ((logoFile = $('#logoUpload')[0].files[0]) != undefined) {
                            var logo = $('#logoUpload')[0].files[0];
                            formData.append('logofiles', logo, logoFile.name);
                            formData.append('', boutiquid);
                        }
                        else {
                            logoFile = "";
                            formData.append('logofiles', logoFile.name);
                        }
                        ///images

                        //form contents to formdata
                        formData.append('Longitude', Boutique.Longitude);
                        formData.append('Latitude', Boutique.Latitude);
                        formData.append('BoutiqueId', boutiquid);
                        formData.append('AppVersion', Boutique.AppVersion);
                        formData.append('Name', Boutique.Name);
                        formData.append('StartYear', Boutique.StartedYear);
                        formData.append('AboutUs', Boutique.AboutUs);
                        formData.append('Caption', Boutique.Caption);
                        formData.append('Location', Boutique.Location);
                        formData.append('Address', Boutique.Address);
                        formData.append('Phone', Boutique.Phone);
                        formData.append('Timing', Boutique.Timing);
                        formData.append('WorkingDays', Boutique.WorkingDays);
                        formData.append('FbLink', Boutique.FbLink);
                        formData.append('InstagramLink', Boutique.InstagramLink);
                        formData.append('ActionTyp', 'BoutiqueUpdate');
                        formData.append('updatedBy', loginuser);
                        result = postBlobAjax(formData, "../ImageHandler/PhotoUploadHandler.ashx");
                        if (result == "1" || result == "2" || result == "3") {
                            $('#rowfluidDiv').show();
                            $('.alert-success').show();
                            $('.alert-success strong').text(Messages.InsertionSuccessFull);
                            AutoScrollToAlertBox();
                        }
                        if (result != "1" && result != "2" && result != "3") {
                            $('#rowfluidDiv').show();
                            $('.alert-error').show();
                            $('.alert-error strong').text(Messages.InsertionFailure);
                        }

                    }//if file exist in uploader
                    else//no files in both uploader hence simple update
                    {
                        result = UpdateBoutique(Boutique);
                        if (result == "1" || result == "2" || result == "3") {
                            $('#rowfluidDiv').show();
                            $('.alert-success').show();
                            $('.alert-success strong').text(Messages.InsertionSuccessFull);
                            AutoScrollToAlertBox();
                        }
                        if (result != "1" && result != "2" && result != "3") {
                            $('#rowfluidDiv').show();
                            $('.alert-error').show();
                            $('.alert-error strong').text(Messages.InsertionFailure);
                        }
                    }//end of else


                }//boutiquid not null if
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "Profile";
                ExceptionTrack.Method = "AddBoutique-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
          }
    })    

    //---------- * Add banner *-------------//
     $(".addBanner").live({
        click: function (e) {
            try
            {
                $('#rowfluidDiv').hide();
                $('.alert-success').hide();
                $('.alert-error').hide();
                var BoutiqueID = $("#hdfBoutiqueID").val();
                var CreatedBy = $("#hdfCreatedBy").val();

                var BannerImgID = $("#hdfBannerImgID").val();
                var result = "";
                var Boutique = new Object();

                Boutique.ProductID = $(".products").val();
                Boutique.CategoryCode = $(".categories").val();
                Boutique.ImageID = BannerImgID;

                if (BoutiqueID != null) {
     
                    if (BannerImgID == "") {

                        var imgresult = "";
                        var _URL = window.URL || window.webkitURL;
                        var formData = new FormData();
                        var imagefile, logoFile, img;

                        if ((imagefile = $('#BannerUpload')[0].files[0]) != undefined) {
                            img = new Image();
                            var image = $('#BannerUpload')[0].files[0];
                            formData.append('BannerFile', image, imagefile.name);
                            formData.append('ProductID', Boutique.ProductID);
                            formData.append('CategoryCode', Boutique.CategoryCode);
                            formData.append('BtqID', BoutiqueID);
                            formData.append('CreatedBy', CreatedBy);
                            formData.append('BannerImgID', BannerImgID);
                            formData.append('ActionTyp', 'BannerInsert');
                            var result = postBlobAjax(formData, "../ImageHandler/PhotoUploadHandler.ashx");

                            if (result == "1") {

                                BindAllBannerImages();

                                $('#rowfluidDiv').show();
                                $('.alert-success').show();

                                $('.alert-success strong').text(Messages.InsertionSuccessFull);
                   
                                AutoScrollToAlertBox();
                   
                                ClearBannerControls();
                            }

                            if (result == "-1") {

                                BindAllBannerImages();

                                $('#rowfluidDiv').show();
                                $('.alert-error').show();
                                $('.alert-error strong').text(Messages.FileFormaterror);

                            }

                            if (result != "1" && result != "-1") {
                                $('#rowfluidDiv').show();
                                $('.alert-error').show();
                                $('.alert-error strong').text(Messages.InsertionFailure);

                            }
                        }

                        else {
                            BindAllBannerImages();

                            $('#rowfluidDiv').show();
                            $('.alert-error').show();
                            $('.alert-error strong').text(Messages.FileFormaterror);
                        }



                    }

                    else  //UPDATE
                    {
                        var result = UpdateBannerDetailsByImgID(Boutique);

                        if (result.status == "1") {

                            $('#rowfluidDiv').show();
                            $('.alert-success').show();
                            $('.alert-success strong').text(Messages.InsertionSuccessFull);

                            AutoScrollToAlertBox();
                            ClearBannerControls();

                        }
                        else {
                            $('#rowfluidDiv').show();
                            $('.alert-error').show();
                            $('.alert-error strong').text(Messages.InsertionFailure);
                        }


                        $("#hdfBannerImgID").val("");
                    }
                }
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "Profile";
                ExceptionTrack.Method = "addBanner-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
        }
    })
    
    //----------- * Banner reorder *---------//
    $("#BannerImageholder").sortable({
        
        update: function (event, ui) {
            try
            {
                //------------- * This event is fired on reordering images * ----------//
            
                //STEPS
                // 1.Loop through images after reordering and push each of imageid to an array
                // 2.From boutique class file , a comma seperated string of this array items will be created and passed to update stored procedure , then update will be done by splitting string by comma and then use that imageid for update

                var ImageInfo = [];
                var idval, orderno;

                $('#BannerImageholder img').each(function (index) {

                    var idval = $(this).attr('id');
                    ImageInfo.push(idval);
               
                });

                var Boutique = new Object();

                Boutique.ImageInfo = ImageInfo;

                result = UpdateorderNoOfBannerImage(Boutique);

                if (result.status == "1") {
            
                    BindAllBannerImages();
                    //$('#rowfluidDiv').show();
                    //$('.alert-success').show();
                    //$('.alert-success strong').text(Messages.InsertionSuccessFull);

                    //AutoScrollToAlertBox();

                }
                //else {
                //     $('#rowfluidDiv').show();
                //     $('.alert-error').show();
                //     $('.alert-error strong').text(Messages.InsertionFailure);
                // }

            }//when div image is reordered
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "Profile";
                ExceptionTrack.Method = "BannerImageholder-Sortable";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
        }
    });
    $("#BannerImageholder").disableSelection();
   

    $('input[type=text],input[type=password]').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').slideUp(1000);
    });
    $('textarea').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').slideUp(1000);
    });

    //end styling client validation

//---------* Bind Dropdowns *-----------//
    $(".products").select2({
        placeholder: "Choose related product",
        allowClear: true,
        data: BindProductDropdown()
    });
    $(".categories").select2({
        allowClear: true,
        placeholder: "Choose related category",
        data: BindCategoryDropdown()
    });

    //--------* Cancel Click *----------//

    $(".bannerCancel").live({
        click: function (e) {// Clear controls
            try
            {
                ClearBannerControls();
                $('#rowfluidDiv').hide();
                $('.alert-success').hide();
                $('.alert-error').hide();
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "Profile";
                ExceptionTrack.Method = "bannerCancel-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
        }
    })
  




    $("#idtabProfiles").click(function (e) { //user clicks on tab
        try
        {
            HideAlertBox();
            ClearBannerControls();
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "Profile";
            ExceptionTrack.Method = "idtabProfiles-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
     
    });


    $("#idtabBanners").click(function (e) { //user clicks on tab
        try
        {
            HideAlertBox();
            BindAllBannerImages();
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "Profile";
            ExceptionTrack.Method = "idtabBanners-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }

    });


});
//end of document.ready

function RemoveStyle() {
    $('input[type=text],input[type=password],textarea').css({ background: 'white' });
    $('#ErrorBox,#ErrorBox1').slideUp(1000);
}

function DeleteItem(e,p)
{
    try
    {
        if (p == "DeleteBanner") {

            var Boutique = new Object();
            Boutique.ImageID = e;
            var p = p;
            var result = DeleteBannerImage(Boutique);
            if (result== "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text(Messages.DeletionSuccessFull);

                AutoScrollToAlertBox();
                ClearBannerControls();
                BindAllBannerImages();
            }
            if (result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text(Messages.DeletionFailure);
                AutoScrollToAlertBox();
                BindAllBannerImages();
            }
        }

        else {
            var jsonResult = {};
            var Owners = new Object();
            Owners.UserID = e;
            Owners.OwnerID = p;
            jsonResult = DeleteOwner(Owners);
            if (jsonResult != undefined) {
                if (jsonResult == "1") {
                    BindAsyncOwnerTable()//Gridbind
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                    $('.alert-success strong').text(Messages.DeletionSuccessFull);

                }
                if (jsonResult != "1") {
                    BindAsyncOwnerTable()//Gridbind
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                    $('.alert-error strong').text(Messages.DeletionFailure);

                }
            }
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "DeleteItem";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function botiqueProfileLoad()
{
    try
    {
        var jsonResult = {};
        jsonResult = GetBoutiques();
        if (jsonResult != undefined) {
            BindBoutiqueTextBoxes(jsonResult);
            GetBoutiqueImageAndLogo(jsonResult[0].BoutiqueID)
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "botiqueProfileLoad";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function handleFileSelect(evt) {
    try
    {
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "handleFileSelect";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

//post File/blog to Server
function handleLogoSelect(evt) {
    try
    {
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
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "handleLogoSelect";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function InsertBoutique(Boutique) {
    try
    {
        var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Profile.aspx/NewBoutique");
        var table = {};
        table = JSON.parse(jsonResult.d);
       
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "InsertBoutique";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function GetBoutiques() {
    try
    {
        var ds = {};
        var Boutique = new Object();
        var table = {};
        var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
        ds = getJsonData(data, "../AdminPanel/Profile.aspx/BindBoutiqueDetails");
        table = JSON.parse(ds.d);
       
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "GetBoutiques";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function listToAray(fullString, separator) {
    var fullArray = [];
    try
    {
        if (fullString !== undefined && fullString!=null) {
            if (fullString.indexOf(separator) == -1) {
                fullAray.push(fullString);
            } else {
                fullArray = fullString.split(separator);
            }
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "listToAray";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return fullArray;
}

function BindBoutiqueTextBoxes(Records) {
    try
    {
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
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "BindBoutiqueTextBoxes";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function GetBoutiqueImageAndLogo(boutiqueId) {
    try
    {
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
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "GetBoutiqueImageAndLogo";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
     return;

}

function clearControls() {
    try
    {
        botiqueProfileLoad();
        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();   
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "clearControls";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindOwnerTextBoxes(Records) {
    try
    {
        $.each(Records, function (index, Records) {

            $("#txtOwnerName").val(Records.Name);
            $("#txtOwnerAddress").val(Records.Address);
            $("#txtOwnerPhone").val(Records.Mobile);
            $("#txtOwnerEmail").val(Records.Email);
            $("#DOBDate").val(ConvertJsonToDate(Records.DOB));
            $("#radioMale").val();
            $("#txtProfile").val(Records.Profile);
            $("#hdfOwnerID").val(Records.OwnerID);
            $("#hdfUserID").val(Records.UserID);
        })
        $(".AddOwner").text("Save");
        $("#editLabel").text("Edit Owner");
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "BindOwnerTextBoxes";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function clearOwnerControls() {

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $("#txtOwnerName").val('');
    $("#txtOwnerAddress").val('');
    $("#txtOwnerPhone").val('');
    $("#txtOwnerEmail").val('');
    $("#DOBDate").val('');
    //  $("#radioMale").val('');
    $("#txtProfile").val('');
    $("#hdfOwnerID").val('');
    $(".AddOwner").text("Save");
    $("#editLabel").text("New Owner");
} 

function BindOwnerTable(Records) {
    try
    {
        var checkrole = $('#hdfRole').val(); 
        if (checkrole == Roles.Manager)
        {      
            $("thead#Ownerthead tr").remove();
            var html = ' <tr><th>Owner Name</th><th>Mobile</th><th>Email</th></tr> ';
            $("#Ownerthead").append(html);
            $("tbody#ownerrows tr").remove();
            $.each(Records, function (index,Records)
            {          
                var html = '<tr userID="' + Records.UserID + '"  ownerID="' + Records.OwnerID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + (Records.Email == null ? "-": Records.Email) + '</td></tr>';
                $("#OwnerTable").append(html);
            })
        }
        else
        {
            $("tbody#ownerrows tr").remove();
            $.each(Records, function (index,Records)
            {
                var html = '<tr userID="' + Records.UserID + '"  ownerID="' + Records.OwnerID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info owneredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger ownerdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
                $("#OwnerTable").append(html);
            })       
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "BindOwnerTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindAsyncOwnerTable() {
    try
    {
        var jsonResult = {};
        var Owner = new Object();
        jsonResult = GetAllOwners(Owner);
        if (jsonResult != undefined) {     
            BindOwnerTable(jsonResult);
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "BindAsyncOwnerTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function InsertOwner(Owners) {
    var table = {};
    try{
        
        var data = "{'ownersObj':" + JSON.stringify(Owners) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Profile.aspx/InsertOwner");
      
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "InsertOwner";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function UpdateBoutique(Boutique) {
    var table = {};
    try
    {
        var data = "{'boutiqueobj':" + JSON.stringify(Boutique) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/SaDashBoard.aspx/NewBoutique");
       
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "UpdateBoutique";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function DeleteOwner(Owner) {
    var ds = {};
    var table = {};
    try
    {
      
        var data = "{'ownersObj':" + JSON.stringify(Owner) + "}";
        ds = getJsonData(data, "../AdminPanel/Profile.aspx/DeleteOwner");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {

        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "DeleteOwner";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function GetAllOwners(Owner) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'OwnerObj':" + JSON.stringify(Owner) + "}";
        ds = getJsonData(data, "../AdminPanel/Profile.aspx/GetAllOwners");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "GetAllOwners";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function GetOwner(Owner) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'ownersObj':" + JSON.stringify(Owner) + "}";
        ds = getJsonData(data, "../AdminPanel/Profile.aspx/GetOwner");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "GetOwner";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

//Basic Validation and Insert For Adding Owner
//CreatedBy Thomson
function OwnerValidate() {
    try
    {
        $('#Displaydiv').remove();
        var Name = $('#txtOwnerName');
        var Email = $('#txtOwnerEmail');
        var Address = $('#txtOwnerAddress');
        var Phone = $('#txtOwnerPhone');
    
        var container = [
            { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
            { id: Email[0].id, name: Email[0].name, Value: Email[0].value },
            { id: Address[0].id, name: Address[0].name, Value: Address[0].value },
            { id: Phone[0].id, name: Phone[0].name, Value: Phone[0].value },
        ];

        var j = 0;
        var Errorbox = document.getElementById('ErrorBox');
        var divs = document.createElement('div');
        divs.setAttribute("id", "Displaydiv");
        Errorbox.appendChild(divs);
        for (var i = 0; i < container.length; i++) {

            if (container[i].Value == "") {
                j = 1;         
                Errorbox.style.borderRadius = "5px";
                Errorbox.style.display = "block";
                var txtB = document.getElementById(container[i].id);
                txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
                txtB.style.backgroundPosition = "95% center";
                txtB.style.backgroundRepeat = "no-repeat";
                //txtB.style.backgroundColor = "#FFFEE1";
                Errorbox.style.paddingLeft = "30px";

            }



        }
        if (j == '1') {
            var p = document.createElement('p');
            p.innerHTML = "* Some Fields Are Empty ! ";
            p.style.color = "Red";
            p.style.fontSize = "14px";
            divs.appendChild(p);
            return false;
        }
        if (j == '0') {
            $('#ErrorBox').hide();
            AddOwner();
            return true;
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "OwnerValidate";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function AddOwner()
{
    try
    {
        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();
        var result = "";
        var Owners = new Object();

        if ($("#hdfUserID").val() != "") {
            Owners.UserID = $("#hdfUserID").val();
            Owners.OwnerID = $("#hdfOwnerID").val();
        }
        //else {
        //    alert("Please Select A User..");
        //    return;
        //}

        Owners.Name = $("#txtOwnerName").val();
        Owners.Address = $("#txtOwnerAddress").val();
        Owners.Phone = $("#txtOwnerPhone").val();
        Owners.Email = $("#txtOwnerEmail").val();
        Owners.DOB = $("#DOBDate").val();

        Owners.Gender = "Male";

        Owners.Profile = $("#txtProfile").val();


        result = InsertOwner(Owners);
        if (result == "1") {
            clearOwnerControls();
       
            $('#rowfluidDiv').show();
            $('.alert-success').show();
            $('.alert-success strong').text(Messages.InsertionSuccessFull);
        }
        if (result != "1") {
        
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.InsertionFailure);
        }
        AutoScrollToAlertBox();
        BindAsyncOwnerTable();
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "AddOwner";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
//end Validation and Insert For Adding Owner

//-------------------------------------------------- * BANNER TAB :METHODS * -------------------------------//

function handleBannerSelect(evt) {

    $('.alert-error').hide();

    try
    {
        // ---- * It is used to give preview of selected image (by image upload control) * ---------------//

        var files = evt.target.files; // FileList object
        $("#imageList1").find(".thumb").remove();
        var f;
        f = files[0];

        if (!f.type.match('image.*')) {
            //continue;
        }
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                                 '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('imageList1').insertBefore(span, null);
            };
        })(f);

        reader.readAsDataURL(f);
        //}
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "handleBannerSelect";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindAllBannerImages() {

    //----- * STEPS * ----- //

        // 1.Access required data from database
        // 2.Fill div which is placed to bind images with accessed data
        // 3.Image is binded using Image Service HANDLER by passing image id as querystring

    $("#BannerImageholder").find(".masonry-thumb").remove();
    try
    {
        var imagedivholder = $('#BannerImageholder');
   
        var totalimages = {};
        totalimages = GetAllBannerImages();
  
        for (var i = 0; i < totalimages.length; i++) {

            var html = ('<div class="masonry-thumb port-1 effect-2" >'
               + ''
               + '<div class="image-box"><img id="' + totalimages[i].ImageID + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?bannerImgID=' + totalimages[i].ImageID + '"></img></div>'
               + '<div class="productDetailsdiv text-desc">'
               + '<a class="btn btn-toolbar" style="border:1px solid white" onclick="FillControlsOnEdit(this);" " ProductID=' + totalimages[i].ProductID + '  CategoryCode=' + totalimages[i].CategoryCode + ' bannerImgID=' + totalimages[i].ImageID + ' ><i class="halflings-icon white edit"></i></a>'
               + '<a class="btn btn-toolbar" style="border:1px solid white" href="../ImageHandler/ImageServiceHandler.ashx?bannerImgID=' + totalimages[i].ImageID + '" data-lightbox="' + totalimages[i].ImageID +  '"><i class="icon-zoom-in"></i></a>'
               //+ '<div class="prodet"><span>Code:  </span><span>' + 'A' + '</span></div><div class="prodet"><span>Name:  </span><span class="proname">' + 'A' + '</span></div><div class="prodet"><span>Price:  ₹  ' + 'A' + '</span></div><div class="prodet><span>Discount:  ₹ ' + 'A' + '</span></span></div><span class="pdescription" style="display:none;">' + 'A' + '</span></div>'
               + '</div>');

            imagedivholder.append(html);
       
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "BindAllBannerImages";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function FillControlsOnEdit(objthis)
{
    //----- * STEPS * ----- //

    // 1.This method is called by onclick event of edit toolbar , by passing its object(this)
    // 2.All the values required for binding controls is accessed by , retrieving the attributes of the tootlbar's object (this)
    // 3.Uploaded Image is Binded using ImageService HANDLER by passing ImageID as query string
    try
    {
        $('html, body').animate({
            scrollTop: $("#NewBanner").offset().top
        });

        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();

        document.getElementById("BannerUpload").disabled = true; //disable upload control on edit click
        //document.getElementById("BannerUpload").title = "Image can't be changed";

        var ImageID = $(objthis).attr('bannerImgID');
        var ProductID = $(objthis).attr('ProductID');
        var CatgryCode = $(objthis).attr('CategoryCode');

        $("#hdfBannerImgID").val(ImageID);

        if (ProductID != null)
        {
            $(".products").val(ProductID).trigger("change");
        }

        if (CatgryCode != null)
        {
            $(".categories").val(CatgryCode).trigger("change");
        }

        if ($("#imageList1").find(".thumb") != null || $("#imageList1").find(".thumb") != 'undefined')
        {
            $("#imageList1").find(".thumb").remove();
            //  $("#imageList1").find(".imgdelete").remove();
       
            var span = document.createElement('span');

            img1 = document.createElement('img');
            img1.src = "../ImageHandler/ImageServiceHandler.ashx?bannerImgID=" + ImageID;

            img1.className = "thumb";
       
            var divPre = document.getElementById("imageList1");
        
            divPre.appendChild(img1);

            //  var del = document.createElement('input');
            //  del.className = 'imgdelete';
            //  del.type = 'image';
            //   del.src = '../Home/images/Deleteicon1.png';
            //   del.id = ImageID;
      
            // divPre.appendChild(del);
       
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "FillControlsOnEdit";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    $('.imgdelete').show();
} 

function GetAllBannerImages() {
    var ds = {};
    var table = {};
    try
    {
        var Boutique = new Object();
       
        var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
        ds = getJsonData(data, "../AdminPanel/Profile.aspx/GetAllBannerImages");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "GetAllBannerImages";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function BindProductDropdown() {
    var jsonResult = {};
    try
    {
        var Notify = new Object();
        jsonResult = GetAllProducts(Notify);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "BindProductDropdown";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function GetAllProducts(Notify) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'productObj':" + JSON.stringify(Notify) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductIDandName");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "GetAllProducts";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function BindCategoryDropdown() {
    var jsonResult = {};
    try
    {
        var Notify = new Object();
        jsonResult = GetAllCategories(Notify);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "BindCategoryDropdown";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function GetAllCategories(Notify) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'productObj':" + JSON.stringify(Notify) + "}";
        ds = getJsonData(data, "../AdminPanel/Category.aspx/GetAllCategoryIDandName");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "GetAllCategories";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function UpdateorderNoOfBannerImage(Boutique) {
    var table = {};
    try
    {
        var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Profile.aspx/UpdateorderNo");
       
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "UpdateorderNoOfBannerImage";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;

}

function UpdateBannerDetailsByImgID(Boutique) {
    var table = {};
    try
    {
        var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Profile.aspx/UpdateBannerDetailsByImgID");
       
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "UpdateBannerDetailsByImgID";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function SetDefaultBannerImage()
{
    try
    {
        if ($("#imageList1").find(".thumb") != null || $("#imageList1").find(".thumb") != 'undefined') {
            $("#imageList1").find(".thumb").remove();
            //  $("#imageList1").find(".imgdelete").remove();
            var span = document.createElement('span');
            var defaultimg = "../img/No-Img_Chosen.png";
            span.innerHTML = ['<img class="thumb" src="', defaultimg,
                             '" />'].join('');
            document.getElementById('imageList1').insertBefore(span, null);
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "SetDefaultBannerImage";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function ClearBannerControls()
{
    // Scroll page
    try
    {
        var offset = $('#Banners').offset();
        offset.left -= 20;
        offset.top -= 200;
        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });

        //$('#ErrorBox1').hide();
        //$('#Displaydiv1').hide();

        //$('#rowfluidDiv').hide();
        //$('.alert-success').hide();
        //$('.alert-error').hide();

        $("#hdfBannerImgID").val("");

        $(".products").select2("val", "");
        $(".categories").select2("val", "");

        SetDefaultBannerImage();
        //$('#BannerUpload')[0].files[0].name = "No file selected";
        BindAllBannerImages();

 
        document.getElementById("BannerUpload").disabled = false;
        $('.imgdelete').hide();
        //$('.filename').html("No file selected");
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "ClearBannerControls";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
   
}

function DeleteBannerImage(Boutique) {
    var table = {};
    try
    {
        var data = "{'boutiqueObj':" + JSON.stringify(Boutique) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Profile.aspx/DeleteBannerByImageID");
        
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Profile";
        ExceptionTrack.Method = "DeleteBannerImage";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}