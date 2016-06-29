﻿$("document").ready(function (e) {
    parent.document.title = Pages.NewsLetter;

    var LoginUserRole = getRole();
    $('#hdfRole').val(LoginUserRole[0]);

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
        debugger;
        $("#NewsLetterimagehold").find(".masonry-thumb").remove();
        for (var i = 0; i <= ddlproduct.length - 1; i++) {
            // var productid = ddlproduct[ddlproduct.length - 1];
            BindAllProductImages(ddlproduct[i]);//binds  gallery with product under current boutique
        }

    });
    $eventPdtsSelect.on("select2:close", function (e) {
        debugger;
        "select2:close";
    });
    $eventPdtsSelect.on("select2:unselect", function (e) {
        debugger;
        var ddlproduct = this;
        //alert($(this).data.val());
        //var imgid = $(this).attr('productid');
        //imgid.$("#NewsLetterimagehold").find(".masonry-thumb").remove();
        $("#NewsLetterimagehold").find(".masonry-thumb").remove();
    });
    $eventPdtsSelect.on("select2:removing", function (e) {
        debugger;
        alert("removed");
    });

    var $eventTemplatesSelect = $(".template");

    $eventTemplatesSelect.on("change", function (e) {
        debugger;
        var ddlproduct = $(".template").val();

        if (ddlproduct != null) {
            BindTemplateImagesPreview(ddlproduct);
        }
    });
    //end styling client validation
    var $eventAudienceSelect = $(".audience");
    $eventAudienceSelect.on("change", function (e) {
        //debugger;
        //var UserMail = $(".audience").text();
        //UserMail = UserMail.trim();
        //if(UserMail=="All")
        //{
        //    GetAllNewsLetterEmailIds();
        //}
    });
    //mail sending
    $(".submitDetails").click(function () {
        debugger;
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
            //var chkflag = document.getElementsByClassName("checkDes").checked;
            //if (document.getElementById(pdtIDs[index]) != null) {
            //    var chkflag = document.getElementById(pdtIDs[index]).checked;
            //if (chkflag == true) {
            imageCount = imageCount + 1;
            ImageInfo.push(idval);
            pdtIDs.push(pdtVal);
            //}
            //}                  
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
        }
        if (result.status != "1") {
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.InsertionFailure);
        }
    })

    //Generate Preview
    $(".templatePreview").click(function () {
        debugger;
        BootstrapDialog.show({
            title: 'Template Preview',
            message: MainImageClick(this)
        });

       // MainImageClick(this);
    });
});
//end of document.ready
function GetAllNewsLetterEmailIds() {
    var jsonResult = {};
    var NewsLetters = new Object();
    jsonResult = GetAllEmailsForNewsLetter(NewsLetters);
    if (jsonResult != undefined) {
        return jsonResult;
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
    debugger;
    var templ = $('#templatePreviewImagehold');
    var iframe = document.createElement('iframe');
    iframe.className = "PreviewTemplate"
    iframe.src = "../ImageHandler/ImageServiceHandler.ashx?TemplateID=" + templateID;
    var divUrl =
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
        + '<input id="' + totalimages[i].ProductID + '" class="checkDes" type="checkbox">'
        + '</a>' + '</div>');

        imagedivholder.append(html);


    }
}
function MainImageClick(checkedImage) {
    $(".PreviewTemplate").remove();
    $("#templatePreviewImagehold").find(".templatePreviewOuterDiv").remove();
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
    debugger;
    var NewsLetters = new Object();
    NewsLetters.ImageIDs = ImageInfo;
    NewsLetters.TemplateID = $(".template").val();
    NewsLetters.Description = $("#txtNewsletterDescription").val();
    var totalimages = {};
    totalimages = AddSelectedImageTotemplate(NewsLetters);
    var imagedivholder = $('#templatePreviewImagehold');
    var $mars = $('.templatePreviewholder');
    var elems = $();

    //var html = ('<div class="masonry-thumb"  productid=' + totalimages[i].ProductID + ' imageid=' + totalimages[i].ImageID + ' pname=' + totalimages[i].Name + ' pdescription=' + totalimages[i].Description + ' pprice=' + totalimages[i].Price + ' isoutstock=' + totalimages[i].IsOutOfStock + ' isactive=' + totalimages[i].IsActive + ' categories=' + totalimages[i].Categories + ' designers=' + totalimages[i].DesignerID + ' designerName=' + totalimages[i].DesignerName + ' discount=' + totalimages[i].Discount + '>'
    //+ '<a class="image-link" ImageID="' + totalimages[i].ImageID + '">'
    //+ '<img id="img' + i + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages[i].ImageID + '"></img>'
    //+ '</a><div class="productDetailsdiv"><span>' + totalimages[i].ProductNo + '</span><span class="">' + totalimages[i].Name + '</span><span>₹  ' + totalimages[i].Price + '</span><span>Off:₹ ' + totalimages[i].Discount + '</span></div>'
    //+ '</div>');

    elems = elems.add(totalimages);



    $mars.append(elems);
    $mars.masonry('appended', elems);
   
    //return html;
}
function AddSelectedImageTotemplate(NewsLetters) {
    debugger;
    var ds = {};
    var table = {};
    var data = "{'newsObj':" + JSON.stringify(NewsLetters) + "}";
    ds = getJsonData(data, "../AdminPanel/NewsLetter.aspx/AddSelectedImageToHtmlTemplate");
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
