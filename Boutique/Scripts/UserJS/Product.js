﻿$("document").ready(function (e) {
    //disables the div containing image upload and image list
    document.getElementById('imageupGallery').style.display = 'block';
    var prodid = '8c9b8e83-dc8f-48d7-994b-8688516a8771'//$("#hdfproductID").val();
    var boutiqid = '470a044a-4dba-4770-bca7-331d2c0834ae'//$("#hdfBoutiqueID").val();
    BindAllProductImages(prodid, boutiqid);



    $("#olpreview").sortable({

        update: function( event, ui ) {}//when li image is reordered
    });
    $("#olpreview").disableSelection();
    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';
     $("#hdfBoutiqueID").val(boutiqueid);
   
     BindAllImages();//list li of product images when images uploaded



    $(".ddlcategories").select2({
        placeholder: "Choose Categories",
        allowClear: true,
        data: BindAsyncCategory(boutiqueid)//category dropdown binds only with id and text[key:value] mandatory
    });
    $(".ddlDesigners").select2({
      
        data: BindAsyncDesigner(boutiqueid)//Designer dropdown binds only with id and text[key:value] mandatory
        ,allowClear: true
        ,placeholder: "Select a Designer"
    });

    $(".AddProduct").live({
        click: function (e) {// submit button click
            
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var result = "";
           
            if ($(".AddProduct").text() == "Save") {
              
                var Product = new Object();
                Product.BoutiqueID = boutiqueid;
                Product.Name = $("#txtName").val();
                Product.Description = $("#txtDescription").val();
                Product.Price = $("#txtPrice").val();
                if ($("input[name=optionsRadiosOutStock]:checked"))
                {
                 Product.IsOutOfStock = $("input[name=optionsRadiosOutStock]:checked").val();
                }
                if ($("input[name=optionsRadiosActive]:checked"))
                {
                    Product.IsActive = $("input[name=optionsRadiosActive]:checked").val();
                }
                var Categ = $("#idDdlCategories").val();
                var com = "";
                Product.Categories = "";
                for (var i = 0; i < Categ.length;i++)
                {
                    Product.Categories = Product.Categories + com + Categ[i].toString();
                    com = ",";
                }
              
                if ($("#idDdlDesigners").val() != null)
                {
                    Product.DesignerID = $("#idDdlDesigners").val();
                }
                else
                {
                    Product.DesignerID = "";
                }
             
                result = InsertProduct(Product);
               
            }
            if ($(".AddProduct").text() == "Modify") {
              
                if ($("#hdfproductID").val() != '') {

                    var Product = new Object();
                    Product.ProductID = $("#hdfproductID").val();
                    Product.BoutiqueID = boutiqueid;
                    Product.Name = $("#txtName").val();
                    Product.Description = $("#txtDescription").val();
                    Product.Price = $("#txtPrice").val();

                    if ($("input[name=optionsRadiosOutStock]:checked")) {
                        Product.IsOutOfStock = $("input[name=optionsRadiosOutStock]:checked").val();
                    }
                    if ($("input[name=optionsRadiosActive]:checked")) {
                        Product.IsActive = $("input[name=optionsRadiosActive]:checked").val();
                    }
                    var Categ = $("#idDdlCategories").val();
                    var com = "";
                    Product.Categories = "";
                    for (var i = 0; i < Categ.length; i++) {
                        Product.Categories = Product.Categories + com + Categ[i].toString();
                        com = ",";
                    }

                    if ($("#idDdlDesigners").val() != null) {
                        Product.DesignerID = $("#idDdlDesigners").val();
                    }
                    else {
                        Product.DesignerID = "";
                    }

                  
                    //productimage id and order number
                    var ImageInfo = [];
                    var idval, orderno;
                    $('#olpreview li').each(function (index) {
                        //val.push($(this).attr('id'));
                        var idval = $(this).attr('id');
                        orderno = index;
                        ImageInfo.push(idval);
                    });
                    Product.ImageInfo = ImageInfo;
                    //productimage id and order number
                    result = UpdateProduct(Product);
                    if (result[0].status == "1") {
                       
                        $('#rowfluidDiv').show();
                        $('.alert-success').show();
                        $(".AddProduct").text("Modify");
                        //document.getElementById('imageupGallery').style.display = 'block';
                        // Scroll page
                        var offset = $('#rowfluidDiv').offset();
                        offset.left -= 20;
                        offset.top -= 20;
                        $('html, body').animate({
                            scrollTop: offset.top,
                            scrollLeft: offset.left
                        });
                    }
                    if (result[0].status != "1") {
                        $('#rowfluidDiv').show();
                        $('.alert-error').show();
                        // Scroll page
                        var offset = $('#rowfluidDiv').offset();
                        offset.left -= 20;
                        offset.top -= 20;
                        $('html, body').animate({
                            scrollTop: offset.top,
                            scrollLeft: offset.left
                        });
                    }
                }
                
            }
            if (result[0].status == "1") {
                $("#hdfproductID").val(result[0].ProductID);
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $(".AddProduct").text("Modify");
                // Scroll page
                var offset = $('#rowfluidDiv').offset();
                offset.left -= 20;
                offset.top -= 20;
                $('html, body').animate({
                    scrollTop: offset.top,
                    scrollLeft: offset.left
                });

            }
            if (result[0].status != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                // Scroll page
                var offset = $('#rowfluidDiv').offset();
                offset.left -= 20;
                offset.top -= 20;
                $('html, body').animate({
                    scrollTop: offset.top,
                    scrollLeft: offset.left
                });
            }
           
            return false;
           }
         
    })

    //$(".AddProductimage").live({
    //    click: function (e) {// submit button click

    //        $('#rowfluidDiv').hide();
    //        $('.alert-success').hide();
    //        $('.alert-error').hide();
    //        var imgresult = "";
    //        //imageupload
    //        var _URL = window.URL || window.webkitURL;
    //       var formData = new FormData();
    //        var file, img;
           

    //        if ((file = $('#productfile')[0].files[0])) {
    //            img = new Image();
    //            img.onload = function () {
    //                var image = $('#productfile')[0].files[0];
                  
                  
    //                formData.append('files', image, '8c9b8e83-dc8f-48d7-994b-8688516a8771,' + file.name);
                 
    //              //  formData.append('file', $('#productfile')[0].files[0]);
    //                //postBlobAjax(formData, "../ImageHandler/ImageServiceHandler.ashx");
    //            };
    //            img.onerror = function () {
    //                alert("Not a valid file:" + file.type);
    //            };
    //            img.src = _URL.createObjectURL(file);
    //        }
        
    //        //imageupload
    //       // formData.append('prod', 88888);
    //      //  formData.append('ismain', 77777);
    //        postBlobAjax(formData, "../ImageHandler/ImageServiceHandler.ashx");

    //          //  result = InsertProduct(Product);

    //            if (result[0].status == "1") {
    //                $("#hdfproductID").val(result[0].ProductID);
    //                $('#rowfluidDiv').show();
    //                $('.alert-success').show();
    //            }
    //            if (result[0].status != "1") {
    //                $('#rowfluidDiv').show();
    //                $('.alert-error').show();
    //            }
               
    //            return false;

    //    }

    //})
   
    $(".CancelProduct").live({
        click: function (e) {// Clear controls
            clearProductControls();
            return false;
        }
    })

    $(".ClearProductimage").live({
        click: function (e) {// Clear image control
            ClearImage();
            return false;
        }
    })


    $('input[type="checkbox"]').on('change', function () {
        $('input[type="checkbox"]').not(this).prop('checked', false);
    });

});//end of document.ready


function BindAllImages()
{
    var boutiqid = $("#hdfBoutiqueID").val();
    var prodid = $("#hdfproductID").val();
    if ((prodid != '') && (boutiqid != '')) {

        var Product = new Object();
        Product.ProductID = prodid;
        Product.BoutiqueID = boutiqid;

        var imageids = {};
        imageids = GetAllProductImages(Product);

        $("#olpreview").find(".liclas").remove();
        $.each(imageids, function (index, Records) {
            MultiImageBind(Records);
        })

    }
}

function gethiddenvalue()
{
    var prod = $("#hdfproductID").val();
    return prod;
}

function BindAllProductImages(prodid, boutiqid) {
    var imagedivholder = $('#productimagehold');
 
    if ((prodid != '') && (boutiqid !=''))
    {
        var Product = new Object();
        Product.ProductID = prodid;
        Product.BoutiqueID = boutiqid;

      var totalimages = {};
      totalimages = GetAllProductImages(Product);
     // $("#olpreview").find(".liclas").remove();
          
      for (var i = 0; i < totalimages.length; i++) {
         var html=('<div class="masonry-thumb">'
            +'  <a style="background:url(../img/gallery/photo10.jpg)" title="Sample Image 1" href="">'
            +'<img id="img'+i+'" class="grayscale" src="../ImageHandler/ImageServiceHandler.ashx?ImageID='+totalimages[i].ImageID+'">'
          + '</a><div class="productDetailsdiv">albert</div></div>');
        // '+'"../ImageHandler/ImageServiceHandler.ashx?ImageID="'+totalimages[i].ImageID
          imagedivholder.append(html);
      }
    }

}

function MultiImageBind(Records) {
    var ol = document.getElementById("olpreview");
    var li = document.createElement("li");
    var children = ol.children.length + 1
    li.setAttribute("id", Records.ImageID);
    li.setAttribute("class", "liclas");
    img1 = document.createElement('img');
    img1.src = "../ImageHandler/ImageServiceHandler.ashx?ImageID=" + Records.ImageID;
    img1.alt = "image" + children;
    img1.className = "thumb";
 
    li.appendChild(img1);
   // var nextline = document.createElement('p');
     var spacespan = document.createElement('span');
    spacespan.innerHTML = "&nbsp;&nbsp;&nbsp;";
    var chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.className = "chkbox";
    chk.name = "mainpix";
    var spacespan1 = document.createElement('span');
    spacespan.innerHTML = "&nbsp;&nbsp;&nbsp;";
    //<span class="close-btn"><a href="#">X</a></span>
    var deletespan = document.createElement('span');
    deletespan.type = 'span';
    deletespan.className = "close-btn";
    var deleteanchor = document.createElement('a');
    deleteanchor.type = 'a';
    deleteanchor.innerHTML = "x";
    deleteanchor.href = "#";
    var zoomicon = document.createElement('span');
    zoomicon.type = 'span';
    li.appendChild(spacespan);
    li.appendChild(chk);
    //li.appendChild(nextline);
    //li.appendChild(btndelete);
    li.appendChild(deletespan);
    li.lastChild.appendChild(deleteanchor);
    li.appendChild(spacespan1);
    ol.appendChild(li);
  }




function ClearImage()
{
    document.getElementById("productfile").value = "";
    $("#list").find(".thumb").remove();
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

        //$("#loadingimage").hide();
        jsonResult = data;
    });
    return jsonResult;
}
//---end of getting data as json -----//


//post File/blog to Server

function postBlobAjax(formData, page)
{
    //var request = new XMLHttpRequest();
    //request.open("POST", page);
    //request.send(formData);
    $.ajax({
        type: 'post',
        url: page,
        headers: { 'Cache-Control': 'no-cache' },
        async: false,
        data: formData,
        success: function (status) {
            if (status != 'error') {
                //var my_path = "MediaUploader/" + status;
                // $("#myUploadedImg").attr("src", my_path);
                alert("success");
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            alert("Whoops something went wrong!");
        }
    });
}
//post File/blog to Server


function BindAsyncCategory(boutiqueid) {
    var jsonResult = {};
    jsonResult = GetAllCategories(boutiqueid);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}


function BindDesignerDropDown(dd, Records, indx)
{
    


            var cadena = "";
            var myflag = false;
            for (var i = 0; i < Records.length; i++) {
                if (myflag == true) {
                    cadena += "<option class=catrows SELECTED value='" + Records[i]["DesignerID"] + "'>" + Records[i]["Name"] + "</option>\n";
                    myflag = false;
                }
                else {
                    cadena += "<option class=catrows value='" + Records[i]["DesignerID"] + "'>" + Records[i]["Name"] + "</option>\n";
                }
                if (Records[i]["id"] == indx) {
                    myflag = true;
                }
            }
            dd.append(cadena);


    

}

function BindAsyncDesigner(boutiqueid) {
    var jsonResult = {};
    jsonResult = GetAllDesigners(boutiqueid);
    if (jsonResult != undefined) {
        return jsonResult;
       // $("#selectError3Cat").find
       // BindDesignerDropDown($("#selectError3Des"), jsonResult, -1);

    }
}


function GetAllProductImages(Product) {
   
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductImages");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllCategories(boutiqueid) {

    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/Category.aspx/GetAllCategoryIDandName");
    table = JSON.parse(ds.d);
     return table;
}
function GetAllDesigners(boutiqueid) {

    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllDesignerIDAndName");
    table = JSON.parse(ds.d);
    return table;
}

function InsertProduct(Product)
{
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/InsertProduct");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function UpdateProduct(Product)
{
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/UpdateProduct");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}


function clearProductControls() {
    $("#txtName").val('');
    $("#txtDescription").val('');
    $("#txtPrice").val('');
    $(".ddlcategories").select2("val", "");
    $(".ddlDesigners").select2("val", "");
    $('#OptisOutOfStockNo').parent().addClass('checked');
    $("#OptisOutOfStockYes").parent().removeClass('checked');
    $('#OptIsActiveYes').parent().addClass('checked');
    $("#OptIsActiveNo").parent().removeClass('checked');
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $("#hdfproductID").val('');
    $(".AddProduct").text("Save");//button text change
    $("#olpreview").find(".liclas").remove();//image list hide
}



