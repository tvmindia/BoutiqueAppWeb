var ddlAudience = [];
var checkedImages = [];
$("document").ready(function (e) {
    var boutiqueID = {};
    boutiqueID = getboutiqueID();
  
    var LoginUserRole = getRole();
    hdfBoutiqueID = boutiqueID;
    parent.document.title = Pages.NewsLetter;
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        // Great success! All the File APIs are supported.     
        document.getElementById('tempUpload').addEventListener('change', handleFileSelect, false);
    }
    if (LoginUserRole[0] == Roles.Manager) {
        $(".NewTempSec").hide();
        $("#CreateTemplate").hide();
    }
    BindNewsLetterAudience();
    var LoginUserRole = getRole();
    $('#hdfRole').val(LoginUserRole[0]);
    BindNewsLetterTable();
    BindSendMailTable();
    $("#idDdlAudience").hide();
    $('#NewsLetterTable').DataTable({
        "pagingType": "full_numbers",
        "aaSorting": [[4, 'desc']]
    });
    $('#NewsLetterSendTable').DataTable({
        "pagingType": "full_numbers",
        "aaSorting": [[4, 'desc']]
    });
    $(".Newsletterproducts").select2({
        allowClear: true,
        placeholder: "Choose products",
        data: BindNewsLetterProductDropdown()
    });
    $(".template").select2({
        allowClear: true,
        placeholder: "Choose template",
        data: BindTemplateDropdown()
    });
    
    //$(".audience").select2({
    //    allowClear: true,
    //    placeholder: "Choose audience",
    //    data: [{ id: 0, text: 'All' }, {id:1,text:'Customize'}]
    //});

    //$('#NewsLetterTable').DataTable({
    //    "bPaginate": true,
    //    "iDisplayLength": 6,
    //    "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],

    //    "fnPageChange": "next"
    //});
 
    var $rdoAudienceSelect = $(".radio");

    $(".radio").on("change", function (e) {
        try
        {
            if ($('#OptCustomize').is(':checked'))
            {
                $("#audienceDropDown").show();
                $(".NewsletterAudience").multiselect({
                    menuWidth:350,minwidth:190
               
                });
            }
            if ($('#OptAll').is(':checked'))
            {
                $("#audienceDropDown").hide();
            }
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "NewsLetter";
            ExceptionTrack.Method = "radio-change";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    })
    //var $eventAudienceSelect = $(".NewsletterAudience");
    //$eventAudienceSelect.on("change", function (e) {
    //    debugger;
    //    ddlAudience = $(".NewsletterAudience option:selected").text();
    //    alert(ddlAudience)
    //});
    var $eventPdtsSelect = $(".Newsletterproducts");
 
    $eventPdtsSelect.on("change", function (e) {
        debugger;
        try
        {
            var ddlproduct = [];
            ddlproduct = $(".Newsletterproducts").val();
            $("#NewsLetterimagehold").find(".masonry-thumb").remove();
            for (var i = 0; i <= ddlproduct.length - 1; i++) {
                // var productid = ddlproduct[ddlproduct.length - 1];
                BindAllProductImages(ddlproduct[i]);//binds  gallery with product under current boutique
                for (var j = 0; j <= checkedImages.length - 1; j++) {
                    var pdtimgId = checkedImages[j];
                    if (pdtimgId == ddlproduct[i]) {
                        document.getElementById(pdtimgId).checked = true;
                    }
                }
            }
            
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "NewsLetter";
            ExceptionTrack.Method = "Newsletterproducts-change";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }

    });
    $eventPdtsSelect.on("select2:close", function (e) {
        "select2:close";
    });
    $eventPdtsSelect.on("select2:unselect", function (e) {
        var ddlproduct = this;
    });
    $eventPdtsSelect.on("select2:removing", function (e) {
    });

    var $eventTemplatesSelect = $(".template");

    $eventTemplatesSelect.on("change", function (e) {
        try
        {
            var ddltemplate = $(".template").val();
 
            if (ddltemplate != null && ddltemplate != "") {
                $('#templatePreviewImagehold').find(".PreviewTemplate").remove();
                BindTemplateImagesPreview(ddltemplate);
                GetAllTemplateDetails(ddltemplate);
            }
            else 
            {
                $('#templatePreviewImagehold').find(".PreviewTemplate").remove();
                document.getElementById('lblproductno').style.visibility = "hidden";
            }
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "NewsLetter";
            ExceptionTrack.Method = "template-change";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    });
    //end styling client validation

    $(".sendMail").live(
    {
        click: function (e) {
            try
            {
                editedrow = $(this).closest('tr');
                var MailSending = new Object();
                MailSending.mailNewsLetterID = editedrow.attr("newsletterid");
                MailSending.BoutiqueID = editedrow.attr("boutiqueid");
                MailSending.audienceType = editedrow.attr("Audience");
                var mailResult = SendNotificationMail(MailSending);
                if (mailResult == "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                    $('.alert-success strong').text(Messages.MailSendSuccessfully);
                    $('.alert-error').hide();
                }
                if (mailResult != "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                }
                BindSendMailTable();
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "NewsLetter";
                ExceptionTrack.Method = "sendMail-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
        }
    })
    //mail sending
    $(".submitDetails").click(function () {
        try
        {
            var UserMail = $(".audience").text();
            UserMail = UserMail.trim();
            var MailSending = new Object();
            MailSending.audienceType = UserMail;
            //MailSending.recepientEmail = GetAllNewsLetterEmailIds();
            MailSending.MailSubject = "TiqueInn Deal";
            MailSending.mailNewsLetterID = $("#hdfNewsLetterID").val();
            SendNotificationMail(MailSending);
        }
        catch(e)

        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "NewsLetter";
            ExceptionTrack.Method = "submitDetails-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    });

    $(".saveDetails").click(function () {
        debugger;
        var result = "";
        var idval;
        var ImageInfo = [];
        var pdtIDs = [];
        var imageCount = 0;
        var UserMail = "All";
        try
        {
            var selMulti = $.map($(".NewsletterAudience option:selected"), function (el, i) {
                return $(el).text();
            });
     
            if ($('#OptCustomize').is(':checked')) {
                UserMail = selMulti.join(", ");
            
            }
            $('#NewsLetterimagehold div').each(function (index) {
                //val.push($(this).attr('id'));
                var idval = $(this).attr('imageid');
                var pdtVal = $(this).attr('productid');
                $(this).find("input:checkbox").each(function () {
                    if ($(this).attr('checked')) {
                        // pdtVal = $(this).parent().attr("productid");
                    
                        imageCount = imageCount + 1;
                        ImageInfo.push(idval);
                        pdtIDs.push(pdtVal);
                    }
                });
              
            });
            var selectedImage = document.getElementById('idSelectedImageCount').innerHTML;
            if (imageCount != selectedImage) {
                CustomAlert("Please select 8 images for selected template!");
            }
    
            var NewsLetters = new Object();
            NewsLetters.TemplateID = $(".template").val();
            NewsLetters.ImageIDs = ImageInfo;
            NewsLetters.productIDs = pdtIDs;
            NewsLetters.audienceMailType = UserMail;
            NewsLetters.Description = $("#txtNewsletterDescription").val();
            result = InsertNewsLetter(NewsLetters)
            if (result.status == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-error').hide();
                $("#hdfNewsLetterID").val(result.NewsLetterID);
                clearAllcontrolsAfterSave();
                BindNewsLetterTable();
            }
            if (result.status != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text(Messages.InsertionFailure);
            }
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "NewsLetter";
            ExceptionTrack.Method = "saveDetails-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    })

    $(".saveNewTempDetails").click(function () {
        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();
        try
        {
            debugger;
            var result = "";
            if (((imagefile = $('#tempUpload')[0].files[0]) != undefined)) {
                if ($('#tempUpload')[0].files[0].name.split('.')[1]=="html")
                    {
                    var formData = new FormData();
                var tempFile;
                if ((tempFile = $('#tempUpload')[0].files[0]) != undefined) {
                    formData.append('tempfile', tempFile, tempFile.name);
                }
                formData.append('ActionTyp', 'NewsLetterTemplate');
                formData.append('BoutiqueID', hdfBoutiqueID);
                result = postBlobAjax(formData, "../ImageHandler/PhotoUploadHandler.ashx");
                var resultData = result.split(",");
                if (resultData[0] != "0") {
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                    $('.alert-success strong').text(Messages.InsertionSuccessFull);
                    $('#txtTempName').val(resultData[1]);
                    $('#txtImgCount').val(resultData[2]);
                    $(".template").select2({
                        allowClear: true,
                        placeholder: "Choose template",
                        data: BindTemplateDropdown()
                    });
                    AutoScrollToAlertBox();
                }
                if (resultData[0] == "0") {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                    $('.alert-error strong').text(Messages.InsertionFailure);
                }
                }
                else
                {
                 
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                    $('.alert-error strong').text(Messages.HtmlFileFormatError);
                }
            }
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "NewsLetter";
            ExceptionTrack.Method = "saveNewTempDetails-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    });
    //Generate Preview
    $(".templatePreview").click(function () {
        try
        {
            MainImageClick(this);
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "NewsLetter";
            ExceptionTrack.Method = "templatePreview-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    });

    $(".DraftsTemplatePreview").live(
       {
           click: function () {
               try
               {
                   // Clear image control
                   $("#bodyTable").remove();
                   $('#HtmlPreviewDisplay').empty();
                   // $("#HtmlPreviewDisplay").find("#bodyTable").remove();
                   // var ImageInfo = [];
                   editedrow = $(this).closest('tr');
                   //  ImageInfo.push(editedrow.attr("ImageID"));
                   var NewsLetters = new Object();
                   NewsLetters.NewsLetterID = editedrow.attr("newsletterid");
                   NewsLetters.BoutiqueID = editedrow.attr("boutiqueid");
                   // var templateDetails = {};
                   // templateDetails = TemplatePreviewForDrafts(NewsLetters);
                   //if (templateDetails != undefined) {
                   NewsLetters.imageID = editedrow.attr("ImageID");
                   NewsLetters.TemplateID = editedrow.attr("TemplateID");
                   NewsLetters.Description = editedrow.attr("Description");
                   var totalimages = {};
                   totalimages = AddSelectedImageTotemplate(NewsLetters);
                   var imagedivholder = $('#HtmlPreviewDisplay');

                   imagedivholder.append(totalimages);
                   Preview();
               }
               catch(e)
               {
                   var ExceptionTrack = new Object();
                   ExceptionTrack.Description = e.message;
                   ExceptionTrack.Module = "NewsLetter";
                   ExceptionTrack.Method = "DraftsTemplatePreview-live";
                   ExceptionTrack.ErrorSource = "JavaScript";
                   ExceptionTrack.IsMobile = false;
                   InsertException(ExceptionTrack);
               }
           }
       });
    $(".AudiencePopup").click(function () {
        try
        {
            debugger;
            editedrow = $(this).closest('tr');
      
            $('#AudiencePreview').modal('show');
            var audiencedivholder = $('#AudiencePreviewDisplay');
            audiencedivholder.empty();
            var totalemails = [];
            var jsonResult = [];
            var objEmail = [];
            var email = {};

            jsonResult = GetEmailsForPopup(editedrow.attr("boutiqueid"), editedrow.attr("newsletterid"));
            debugger;
            if (jsonResult != undefined) {
                var len = jsonResult.length;
                
                var i = 0;
                while (i != len) {

                    email = jsonResult[i].AudienceMailID + "<br>";
                    if (len == "1") {
                        var index = 0;
                        var j = jsonResult[0].AudienceMailID.split(',').length;
                        while(index!=j)
                        {
                            objEmail = objEmail+email.split(',')[index] + "<br>";
                            index = index + 1;
                        }
                        email = objEmail;
                    }
                    if (email == "undefined<br>") {
                        email = jsonResult[i].Email + "<br>";
                    }
                    //email.append("<br>");
                    totalemails.push(email);
                    i = i + 1;
                }
                audiencedivholder.append(totalemails);

            }
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "NewsLetter";
            ExceptionTrack.Method = "AudiencePopup-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    });
    $(".AudienceDraftPopup").click(function () {
        debugger;
        try
        {
            editedrow = $(this).closest('tr');
       
            $('#AudiencePreview').modal('show');
            var audiencedivholder = $('#AudiencePreviewDisplay');
            audiencedivholder.empty();
            var totalemails = [];
            var jsonResult = {};
            var email = {};

            jsonResult = GetEmailsForPopup(editedrow.attr("boutiqueid"), editedrow.attr("newsletterid"));
            if (jsonResult != undefined) {
                var len = jsonResult.length;
                var i = 0;
                while (i != len) {

                    email = jsonResult[i].Email + "<br>";
                    if (email == "undefined<br>")
                    {
                        email = jsonResult[i].AudienceMailID + "<br>";
                    }
                    //email.append("<br>");
                    totalemails.push(email);
                    i = i + 1;
                }
                audiencedivholder.append(totalemails);

            }
        }
        catch(e)
        {
            var ExceptionTrack = new Object();
            ExceptionTrack.Description = e.message;
            ExceptionTrack.Module = "NewsLetter";
            ExceptionTrack.Method = "AudienceDraftPopup-click";
            ExceptionTrack.ErrorSource = "JavaScript";
            ExceptionTrack.IsMobile = false;
            InsertException(ExceptionTrack);
        }
    });

    
});
//end of document.ready
function clearAllcontrolsAfterSave()
{
    debugger;
    $(".template").val('').trigger('change');
    $(".Newsletterproducts").val('').trigger('change');
    $("#txtNewsletterDescription").val('');
    $(jQuery.unique(
       $('INPUT:radio')
           .map(function (i, e) {
               return $(e).attr('name')
           }
           ).get()
   )).each(function (i, e) {
       $('INPUT:radio[name="' + e + '"]:visible:first')
           .attr('checked', 'checked');
   });
    $("#audienceDropDown").hide();
}

function GetEmailsForPopup(boutiqId,newsId) {
    var jsonResult = {};
    var NewsLetters = new Object();
    try
    {
        NewsLetters.BoutiqueID = boutiqId;
        NewsLetters.NewsLetterID = newsId;
        jsonResult = GetEmailIDsOfNewsletter(NewsLetters);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetEmailsForPopup";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function Preview() {
    
    $('#HtmlPreview').modal('show');
}
function ImageCheck(evt)
{
    debugger;
    try
    {
        checkedImages = [];
        var imageCount = 0;
        $('#NewsLetterimagehold div').each(function (index) {
            var idval = $(this).attr('imageid');
            var pdtVal = $(this).attr('productid');
            
            var chkflag = document.getElementsByClassName("checkDes").checked;
            var chkflag = document.getElementById(pdtVal).checked;
            if (chkflag == true) {
                imageCount = imageCount + 1;
                checkedImages.push(pdtVal);
            }
        });
        document.getElementById('idSelectedImageCount').innerHTML =" "+ imageCount+" ";
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "ImageCheck";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function GetAllTemplateDetails(ddltemplate)
{
    var jsonResult = {};
    var NewsLetters = new Object();
    try
    {

        NewsLetters.TemplateID = ddltemplate;
        jsonResult = GetAllTemplatesDetailsForNewsLetter(NewsLetters);
        if (jsonResult != undefined) {
            document.getElementById('lblproductno').style.visibility = "visible";
            document.getElementById('idImageCount').innerHTML = " " + jsonResult[0].ImageCount + " ";
            document.getElementById('idSelectedImageCount').innerHTML = " " + 0 + " ";
            return jsonResult;
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetAllTemplateDetails";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function GetAllNewsLetterEmailIds() {
    var jsonResult = {};
    var NewsLetters = new Object();
    try
    {
        jsonResult = GetAllEmailsForNewsLetter(NewsLetters);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetAllNewsLetterEmailIds";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function BindNewsLetterTable() {
    var jsonResult = {};
    var NewsLetters = new Object();
    try
    {
        jsonResult = GetAllNewsLetterDetails(NewsLetters);
        if (jsonResult != undefined) {
            FillNewsLetterTable(jsonResult);
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "BindNewsLetterTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function BindSendMailTable()
{
  
    var jsonResult = {};
    var NewsLetters = new Object();
    try
    {
        jsonResult = GetAllNewsLetterSendDetails(NewsLetters);
        if (jsonResult != undefined) {
            FillNewsLetterSendMailTable(jsonResult);
        }
    }catch(e)
    {

        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "BindSendMailTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function ClearAllControls()
{
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    document.getElementById('lblproductno').style.visibility = "hidden";
    $('#templatePreviewImagehold').remove();
    $('#NewsLetterimagehold').remove();
    $("#txtNewsletterDescription").val('');
    $(".template").val('').trigger('change');
    $(".audience").val('').select2('val', '');
    ClearTempControls();
}
function ClearTempControls()
{
    $('#txtTempName').val("");
    $('#txtImgCount').val("");
}
function SendNotificationMail(MailSending) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'mailObj':" + JSON.stringify(MailSending) + "}";
        ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/SendEmail");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {

        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "SendNotificationMail";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function GetAllNewsLetterDetails(NewsLetters) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
        ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetAllNewsLetterNotMailSendDetails");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetAllNewsLetterDetails";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function GetAllNewsLetterSendDetails(NewsLetters) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
        ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetAllNewsLetterSendMailDetails");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetAllNewsLetterSendDetails";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function FillNewsLetterSendMailTable(Records) {
    try
    {
        var checkrole = $('#hdfRole').val();
        if (checkrole == Roles.Manager) {
            $("thead#newsLetterSendthead tr").remove();
            var html = '<tr><th>Template</th> <th>Description</th> <th>Audience</th> <th>Created Date</th><th>Actions</th></tr> ';
            $("#newsLetterSendthead").append(html);

            $("tbody#newsLetterSendrows tr").remove();            //Remove all existing rows for refreshing
            $.each(Records, function (index, Records) {
                var html = '<tr NewsLetterID="' + Records.NewsLetterID + '" BoutiqueID="' + Records.BoutiqueID + '" ImageID="' + Records.ImageID + '" TemplateID="' + Records.TemplateID + '"Description="' + Records.Description + '"><td>' + Records.TemplateName + '</td><td class="center">' + Records.Description + '</td><td class="center"><a class="AudienceDraftPopup">' + Records.AudienceMailID + '</a></td><td class="center">' + ConvertJsonToDate(Records.CreatedDate) + '</td><td class="center"><a class="btn btn-success DraftsTemplatePreview" href="#" data-toggle="tooltip" data-placement="top"  title="Preview"><i class="halflings-icon white list-alt"></i></a></td></tr>'
                $("#NewsLetterSendTable").append(html);
            })

        }
        else {

            $("tbody#newsLetterSendrows tr").remove();            //Remove all existing rows for refreshing
            $.each(Records, function (index, Records) {
                var html = '<tr NewsLetterID="' + Records.NewsLetterID + '" BoutiqueID="' + Records.BoutiqueID + '" ImageID="' + Records.ImageID + '" TemplateID="' + Records.TemplateID + '"Description="' + Records.Description + '"><td>' + Records.TemplateName + '</td><td class="center">' + Records.Description + '</td><td class="center"><a class="AudienceDraftPopup">' + Records.AudienceMailID + '</a></td><td class="center">' + ConvertJsonToDate(Records.CreatedDate) + '</td><td class="center"><a class="btn btn-success DraftsTemplatePreview" href="#" data-toggle="tooltip" data-placement="top"  title="Preview"><i class="halflings-icon white list-alt"></i></a></td></tr>'
                $("#NewsLetterSendTable").append(html);
            })

        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "FillNewsLetterSendMailTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }

}
function FillNewsLetterTable(Records) {
    try
    {
        var checkrole = $('#hdfRole').val();
        if (checkrole == Roles.Manager) {
            $("thead#newsLetterthead tr").remove();
            var html = '<tr><th>Template</th> <th>Description</th> <th>Audience</th> <th>Created Date</th><th>Actions</th></tr> ';
            $("#newsLetterthead").append(html);

            $("tbody#newsLetterrows tr").remove();            //Remove all existing rows for refreshing
            $.each(Records, function (index, Records) {
                var html = '<tr NewsLetterID="' + Records.NewsLetterID + '" BoutiqueID="' + Records.BoutiqueID + '" ImageID="' + Records.ImageID + '" TemplateID="' + Records.TemplateID + '"Description="' + Records.Description + '"Audience="' + Records.AudienceMailID + '"><td>' + Records.TemplateName + '</td><td class="center">' + Records.Description + '</td><td class="center"><a class="AudiencePopup">' + Records.AudienceMailID + '</a></td><td class="center">' + ConvertJsonToDate(Records.CreatedDate) + '</td><td class="center"><a class="btn btn-info sendMail" href="#"data-toggle="tooltip" data-placement="top"  title="Send Mail"><i class="halflings-icon white envelope"></i><i class="halflings-icon white share-alt"></i></a><a class="btn btn-success DraftsTemplatePreview" href="#" data-toggle="tooltip" data-placement="top"  title="Preview"><i class="halflings-icon white list-alt"></i></a></td></tr>'
                $("#NewsLetterTable").append(html);
            })

        }
        else {

            $("tbody#newsLetterrows tr").remove();            //Remove all existing rows for refreshing
            $.each(Records, function (index, Records) {
                var html = '<tr NewsLetterID="' + Records.NewsLetterID + '" BoutiqueID="' + Records.BoutiqueID + '" ImageID="' + Records.ImageID + '" TemplateID="' + Records.TemplateID + '"Description="' + Records.Description + '"Audience="' + Records.AudienceMailID + '"><td>' + Records.TemplateName + '</td><td class="center">' + Records.Description + '</td><td class="center"><a class="AudiencePopup">' + Records.AudienceMailID + '</a></td><td class="center">' + ConvertJsonToDate(Records.CreatedDate) + '</td><td class="center"><a class="btn btn-info sendMail" href="#"data-toggle="tooltip" data-placement="top"  title="Send Mail"><i class="halflings-icon white envelope"></i><i class="halflings-icon white share-alt"></i></a><a class="btn btn-success DraftsTemplatePreview" href="#" data-toggle="tooltip" data-placement="top"  title="Preview"><i class="halflings-icon white list-alt"></i></a></td></tr>'
                $("#NewsLetterTable").append(html);
            })

        }
    }
    catch(e)

    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "FillNewsLetterTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }

}
function BindTemplateDropdown() {
  
    var jsonResult = {};
    var NewsLetters = new Object();
    try
    {
        jsonResult = GetAllTemplateNames(NewsLetters);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "BindTemplateDropdown";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function BindNewsLetterProductDropdown() {
    var jsonResult = {};
    var NewsLetters = new Object();
    try
    {
        jsonResult = GetAllProductsForNewsLetter(NewsLetters);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "BindNewsLetterProductDropdown";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function BindNewsLetterAudience()
{
   
    var jsonResult = {};
    var NewsLetters = new Object();
    try
    {
        jsonResult = GetAllAudienceMailId(NewsLetters);
        if (jsonResult != undefined) {
       
            for (var i = 0; i < jsonResult.length; i++) {
                $(".NewsletterAudience").append('<option  value="' + jsonResult[i].id + '"selected="selected">' + jsonResult[i].text + '</option>');
            }
            // return jsonResult;
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "BindNewsLetterAudience";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function GetEmailIDsOfNewsletter(NewsLetters) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
        ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetNewsLetterEmails");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetEmailIDsOfNewsletter";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function GetAllTemplatesDetailsForNewsLetter(NewsLetters)
{
    var ds = {};
    var table = {};
    try
    {
        var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
        ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetAllTemplateDetails");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetAllTemplatesDetailsForNewsLetter";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function GetAllEmailsForNewsLetter(NewsLetters) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
        ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetAllNewsLetterEmails");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetAllEmailsForNewsLetter";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function GetAllTemplateNames(NewsLetters) {
  
    var ds = {};
    var table = {};
    try
    {
        var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
        ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetAllTemplateNameAndID");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetAllTemplateNames";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function GetAllProductsForNewsLetter(NewsLetters) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'productObj':" + JSON.stringify(NewsLetters) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductIDandNameForNewsLetter");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetAllProductsForNewsLetter";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function GetAllAudienceMailId(NewsLetters)
{
    var ds = {};
    var table = {};
    try
    {
        var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
        ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetAllAudienceMailID");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetAllAudienceMailId";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function InsertNewsLetter(NewsLetters) {
    var table = {};
    try
    {
        var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/NewsLetter.aspx/AddNesLetterMailTrackingDetails");
        
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "InsertNewsLetter";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function BindTemplateImagesPreview(templateID) {
    try
    {
        var templ = $('#templatePreviewImagehold');
        var iframe = document.createElement('iframe');
        iframe.className = "PreviewTemplate"
        iframe.src = "../ImageHandler/ImageServiceHandler.ashx?TemplateID=" + templateID;
        templ.append(iframe);
        if($("#templatePreviewImagehold").find(".PreviewTemplate").length>0){
        
        }
        else
        {

            var templ = $('#templatePreviewImagehold');
            var iframe = document.createElement('iframe');
            iframe.className = "PreviewTemplate1"
            iframe.src = "../ImageHandler/ImageServiceHandler.ashx?TemplateID=" + templateID;
            templ.append(iframe);
      
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "BindTemplateImagesPreview";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindAllProductImages(productId) {
    try
    {
        var imagedivholder = $('#NewsLetterimagehold');
        var Product = new Object();
        Product.ProductID = productId;
        //inserts from code behind
        var totalimages = {};
        totalimages = GetAllProductsImageDetailsForNewsLetter(Product);
        //$("#NewsLetterimagehold").find(".masonry-thumb").remove();

        for (var i = 0; i < totalimages.length; i++) {


            var html = ('<div class="masonry-thumb"  productid=' + totalimages[i].ProductID + ' imageid=' + totalimages[i].ImageID + '>'
            + '<a class="image-link" ImageID="' + totalimages[i].ImageID + '">'
            + '<img id="img' + i + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages[i].ImageID + '"></img>'
            + '<input id="' + totalimages[i].ProductID + '" class="checkDes" type="checkbox" onclick="ImageCheck(this);">'
            + '</a>' + '</div>');

            imagedivholder.append(html);


        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "BindAllProductImages";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function reloadNewsLetter() {
   
    window.location.reload();
}
function MainImageClick(checkedImage) {
    debugger;
    //    $(".PreviewTemplate").remove();
    //   $("#templatePreviewImagehold").find(".templatePreviewOuterDiv").remove();
    $("#HtmlPreviewDisplay").find(".templatePreviewOuterDiv").remove();
    $("#HtmlPreviewDisplay").empty();
    var ImageInfo = [];
    var idval;
    var pdtIDs = [];
    var imageCount = 0;
    try
    {
        pdtIDs = $('.Newsletterproducts').val();
        $('#NewsLetterimagehold div').each(function (index) {
            //val.push($(this).attr('id'));
            var idval = $(this).attr('imageid');
            //var chkflag = document.getElementsByClassName("checkDes").checked;
            if (document.getElementById(pdtIDs[index]) != null) {
                var chkflag = document.getElementById(pdtIDs[index]).checked;
                if (chkflag == true) {
                    imageCount = imageCount + 1;
                    ImageInfo.push(idval);
                }
                //if ($('input[type=checkbox]:checked')==='True') {

                //}

            }

        });
        var selectedImage = document.getElementById('idSelectedImageCount').innerHTML;
        if (imageCount != selectedImage) {
            CustomAlert("Please select 8 images for selected template!");
        }
        var NewsLetters = new Object();
        NewsLetters.ImageIDs = ImageInfo;
        NewsLetters.TemplateID = $(".template").val();
        NewsLetters.Description = $("#txtNewsletterDescription").val();
        var totalimages = {};
        totalimages = AddSelectedImageTotemplate(NewsLetters);
        var imagedivholder = $('#HtmlPreviewDisplay');
   
        imagedivholder.append(totalimages);
        //var $mars = $('.templatePreviewholder');
        //var elems = $();

        //elems = elems.add(totalimages);
        //$mars.append(elems);
        //$mars.masonry('appended', elems);
   
        //return html;
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "MainImageClick";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function removeCustomAlert() {
    try
    {
        document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "removeCustomAlert";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function CustomAlert(txt) {
    try
    {
        msg = alertObj.appendChild(d.createElement("p"));
        //msg.appendChild(d.createTextNode(txt));
        msg.innerHTML = txt;

    
        $("#alert").animate({ top: '50px' });
    }
    catch(e)
    {

        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "CustomAlert";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}
function AddSelectedImageTotemplate(NewsLetters) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
        ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/AddSelectedImageToHtmlTemplate");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {

        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "AddSelectedImageTotemplate";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function TemplatePreviewForDrafts(NewsLetters) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
        ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/DraftsTemplatePreview");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "TemplatePreviewForDrafts";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}
function GetAllProductsImageDetailsForNewsLetter(Product) {
    var ds = {};
    var table = {};
    try
    {
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductImagesFornewsLetter");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "GetAllProductsImageDetailsForNewsLetter";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}


function handleFileSelect(evt) {
    try
    {
        var files = evt.target.files; // FileList object
        // $("#imageList").find(".thumb").remove();
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
    }
    catch(e)  
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "NewsLetter";
        ExceptionTrack.Method = "handleFileSelect";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    //}
}