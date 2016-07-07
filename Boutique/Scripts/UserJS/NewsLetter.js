$("document").ready(function (e) {
    parent.document.title = Pages.NewsLetter;

    var LoginUserRole = getRole();
    $('#hdfRole').val(LoginUserRole[0]);
    BindNewsLetterTable();
    BindSendMailTable();
    //$('#NewsLetterTable').DataTable({
    //    "bPaginate": true,
    //    "iDisplayLength": 6,
    //    "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]]

    //    "fnPageChange": "next"
    //});

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
    $(".audience").select2({
        allowClear: true,
        placeholder: "Choose audience",
        data: [{ id: 0, text: 'All' }]
    });
    var $eventPdtsSelect = $(".Newsletterproducts");
    //$eventPdtsSelect.click(function () {
    //    debugger;

    //});
    $eventPdtsSelect.on("change", function (e) {
        var ddlproduct = [];
        ddlproduct = $(".Newsletterproducts").val();
        $("#NewsLetterimagehold").find(".masonry-thumb").remove();
        for (var i = 0; i <= ddlproduct.length - 1; i++) {
            // var productid = ddlproduct[ddlproduct.length - 1];
            BindAllProductImages(ddlproduct[i]);//binds  gallery with product under current boutique
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
        var ddltemplate = $(".template").val();
        debugger;
        if (ddltemplate != null && ddltemplate!="") {
            BindTemplateImagesPreview(ddltemplate);
            GetAllTemplateDetails(ddltemplate);
        }
        else 
        {
            $('#templatePreviewImagehold').remove();
            document.getElementById('lblproductno').style.visibility = "hidden";
        }
    });
    //end styling client validation
    var $eventAudienceSelect = $(".audience");
    $eventAudienceSelect.on("change", function (e) {
    });
    $(".sendMail").live(
    {
        click: function (e) {
            editedrow = $(this).closest('tr');
            var MailSending = new Object();
            MailSending.mailNewsLetterID = editedrow.attr("newsletterid");
            MailSending.BoutiqueID = editedrow.attr("boutiqueid");
            debugger;
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
        }
    })
    //mail sending
    $(".submitDetails").click(function () {
        var UserMail = $(".audience").text();
        UserMail = UserMail.trim();
        var MailSending = new Object();
        MailSending.audienceType = UserMail;
        //MailSending.recepientEmail = GetAllNewsLetterEmailIds();
        MailSending.MailSubject = "TiqueInn Deal";
        MailSending.mailNewsLetterID = $("#hdfNewsLetterID").val();
        SendNotificationMail(MailSending);
    });

    $(".saveDetails").click(function () {
        debugger;
        var result = "";
        var idval;
        var ImageInfo = [];
        var pdtIDs = [];
        var imageCount = 0;
        var UserMail = $(".audience").text();
        UserMail = UserMail.trim();
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
        if (imageCount != 8) {
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
            BindNewsLetterTable();
        }
        if (result.status != "1") {
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.InsertionFailure);
        }
    })

    //Generate Preview
    $(".templatePreview").click(function () {
        MainImageClick(this);
    });
    $(".DraftsTemplatePreview").click(function () {
        // Clear image control
        $("#HtmlPreviewDisplay").find(".templatePreviewOuterDiv").remove();
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
    
    });
    //$(".DraftsTemplatePreview").on("click",function ()
    //{
   
    //    //}
    //});
});
//end of document.ready
function Preview() {
    $('#HtmlPreview').modal('show');
}
function ImageCheck(evt)
{
    var imageCount = 0;
    $('#NewsLetterimagehold div').each(function (index) {
        var idval = $(this).attr('imageid');
        var pdtVal = $(this).attr('productid');
        var chkflag = document.getElementsByClassName("checkDes").checked;
        var chkflag = document.getElementById(pdtVal).checked;
        if (chkflag == true) {
            imageCount = imageCount + 1;
           
        }
    });
    document.getElementById('idSelectedImageCount').innerHTML =" "+ imageCount+" ";
}
function GetAllTemplateDetails(ddltemplate)
{
    var jsonResult = {};
    var NewsLetters = new Object();
    NewsLetters.TemplateID = ddltemplate;
    jsonResult = GetAllTemplatesDetailsForNewsLetter(NewsLetters);
    if (jsonResult != undefined) {
        document.getElementById('lblproductno').style.visibility = "visible";
        document.getElementById('idImageCount').innerHTML = " " + jsonResult[0].ImageCount + " ";
        document.getElementById('idSelectedImageCount').innerHTML = " " + 0 + " ";
        return jsonResult;
    }
}
function GetAllNewsLetterEmailIds() {
    var jsonResult = {};
    var NewsLetters = new Object();
    jsonResult = GetAllEmailsForNewsLetter(NewsLetters);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}
function BindNewsLetterTable() {
    var jsonResult = {};
    var NewsLetters = new Object();
    jsonResult = GetAllNewsLetterDetails(NewsLetters);
    if (jsonResult != undefined) {
        FillNewsLetterTable(jsonResult);
    }
}
function BindSendMailTable()
{
    debugger;
    var jsonResult = {};
    var NewsLetters = new Object();
    jsonResult = GetAllNewsLetterSendDetails(NewsLetters);
    if (jsonResult != undefined) {
        FillNewsLetterSendMailTable(jsonResult);
    }
}
function ClearAllControls()
{
    document.getElementById('lblproductno').style.visibility = "hidden";
    $('#templatePreviewImagehold').remove();
    $('#NewsLetterimagehold').remove();
    $("#txtNewsletterDescription").val('');
    $(".template").val('').trigger('change');
    $(".audience").val('').select2('val', '');
   
   
}
function SendNotificationMail(MailSending) {
    var ds = {};
    var table = {};
    var data = "{'mailObj':" + JSON.stringify(MailSending) + "}";
    ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/SendEmail");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllNewsLetterDetails(NewsLetters) {
    var ds = {};
    var table = {};
    var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
    ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetAllNewsLetterSendMailDetails");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllNewsLetterSendDetails(NewsLetters) {
    var ds = {};
    var table = {};
    var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
    ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetAllNewsLetterSendMailDetails");
    table = JSON.parse(ds.d);
    return table;
}
function FillNewsLetterSendMailTable(Records) {
    var checkrole = $('#hdfRole').val();
    if (checkrole == Roles.Manager) {
        $("thead#newsLetterSendthead tr").remove();
        var html = '<tr><th>Template</th> <th>Description</th> <th>Audience</th> <th>Created Date</th></tr> ';
        $("#newsLetterSendthead").append(html);

        $("tbody#newsLetterSendrows tr").remove();            //Remove all existing rows for refreshing
        $.each(Records, function (index, Records) {
            var html = '<tr NewsLetterID="' + Records.NewsLetterID + '" BoutiqueID="' + Records.BoutiqueID + '" ImageID="' + Records.ImageID + '" TemplateID="' + Records.TemplateID + '"Description="' + Records.Description + '"><td>' + Records.TemplateName + '</td><td class="center">' + Records.Description + '</td><td class="center">' + Records.AudienceMailID + '</td><td class="center">' + ConvertJsonToDate(Records.CreatedDate) + '</td></tr>'
            $("#NewsLetterSendTable").append(html);
        })

    }
    else {

        $("tbody#newsLetterSendrows tr").remove();            //Remove all existing rows for refreshing
        $.each(Records, function (index, Records) {
            var html = '<tr NewsLetterID="' + Records.NewsLetterID + '" BoutiqueID="' + Records.BoutiqueID + '" ImageID="' + Records.ImageID + '" TemplateID="' + Records.TemplateID + '"Description="' + Records.Description + '"><td>' + Records.TemplateName + '</td><td class="center">' + Records.Description + '</td><td class="center">' + Records.AudienceMailID + '</td><td class="center">' + ConvertJsonToDate(Records.CreatedDate) + '</td><td class="center"><a class="btn btn-success DraftsTemplatePreview" href="#"><i class="halflings-icon white list-alt"></i></a></td></tr>'
            $("#NewsLetterSendTable").append(html);
        })

    }

}
function FillNewsLetterTable(Records) {
    var checkrole = $('#hdfRole').val();
    if (checkrole == Roles.Manager) {
        $("thead#newsLetterthead tr").remove();
        var html = '<tr><th>Template</th> <th>Description</th> <th>Audience</th> <th>Created Date</th></tr> ';
        $("#newsLetterthead").append(html);

        $("tbody#newsLetterrows tr").remove();            //Remove all existing rows for refreshing
        $.each(Records, function (index, Records) {
            var html = '<tr NewsLetterID="' + Records.NewsLetterID + '" BoutiqueID="' + Records.BoutiqueID + '" ImageID="' + Records.ImageID + '" TemplateID="' + Records.TemplateID + '"Description="' + Records.Description + '"><td>' + Records.TemplateName + '</td><td class="center">' + Records.Description + '</td><td class="center">' + Records.AudienceMailID + '</td><td class="center">' + ConvertJsonToDate(Records.CreatedDate) + '</td></tr>'
            $("#NewsLetterTable").append(html);
        })

    }
    else {

        $("tbody#newsLetterrows tr").remove();            //Remove all existing rows for refreshing
        $.each(Records, function (index, Records) {
            var html = '<tr NewsLetterID="' + Records.NewsLetterID + '" BoutiqueID="' + Records.BoutiqueID + '" ImageID="' + Records.ImageID + '" TemplateID="' + Records.TemplateID + '"Description="' + Records.Description + '"><td>' + Records.TemplateName + '</td><td class="center">' + Records.Description + '</td><td class="center">' + Records.AudienceMailID + '</td><td class="center">' + ConvertJsonToDate(Records.CreatedDate) + '</td><td class="center"><a class="btn btn-info sendMail" href="#"><i class="halflings-icon white envelope"></i><i class="halflings-icon white share-alt"></i></a><a class="btn btn-success DraftsTemplatePreview" href="#"><i class="halflings-icon white list-alt"></i></a></td></tr>'
            $("#NewsLetterTable").append(html);
        })

    }

}
function BindTemplateDropdown() {
    var jsonResult = {};
    var NewsLetters = new Object();
    jsonResult = GetAllTemplateNames(NewsLetters);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}
function BindNewsLetterProductDropdown() {
    var jsonResult = {};
    var NewsLetters = new Object();
    jsonResult = GetAllProductsForNewsLetter(NewsLetters);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}
function GetAllTemplatesDetailsForNewsLetter(NewsLetters)
{
    var ds = {};
    var table = {};
    var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
    ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetAllTemplateDetails");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllEmailsForNewsLetter(NewsLetters) {
    var ds = {};
    var table = {};
    var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
    ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetAllNewsLetterEmails");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllTemplateNames(NewsLetters) {
    var ds = {};
    var table = {};
    var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
    ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/GetAllTemplateNameAndID");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllProductsForNewsLetter(NewsLetters) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(NewsLetters) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductIDandNameForNewsLetter");
    table = JSON.parse(ds.d);
    return table;
}
function InsertNewsLetter(NewsLetters) {
    var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/NewsLetter.aspx/AddNesLetterMailTrackingDetails");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function BindTemplateImagesPreview(templateID) {
    var templ = $('#templatePreviewImagehold');
    var iframe = document.createElement('iframe');
    iframe.className = "PreviewTemplate"
    iframe.src = "../ImageHandler/ImageServiceHandler.ashx?TemplateID=" + templateID;
    templ.append(iframe);
}

function BindAllProductImages(productId) {
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
function MainImageClick(checkedImage) {
//    $(".PreviewTemplate").remove();
    //   $("#templatePreviewImagehold").find(".templatePreviewOuterDiv").remove();
    $("#HtmlPreviewDisplay").find(".templatePreviewOuterDiv").remove();
    var ImageInfo = [];
    var idval;
    var pdtIDs = [];
    var imageCount = 0;
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
    if (imageCount != 8) {
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
function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}

function CustomAlert(txt) {
  
    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    
    $("#alert").animate({ top: '50px' });
}
function AddSelectedImageTotemplate(NewsLetters) {
    var ds = {};
    var table = {};
    var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
    ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/AddSelectedImageToHtmlTemplate");
    table = JSON.parse(ds.d);
    return table;
}
function TemplatePreviewForDrafts(NewsLetters) {
    var ds = {};
    var table = {};
    var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
    ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/DraftsTemplatePreview");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllProductsImageDetailsForNewsLetter(Product) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductImagesFornewsLetter");
    table = JSON.parse(ds.d);
    return table;
}
