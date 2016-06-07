 $("document").ready(function (e) {
    //disables the div containing image upload and image list
    document.getElementById('imageupGallery').style.display = 'block';
    //var prodid = '8c9b8e83-dc8f-48d7-994b-8688516a8771'//$("#hdfproductID").val();
    //var boutiqid = '470a044a-4dba-4770-bca7-331d2c0834ae'//$("#hdfBoutiqueID").val();
    //$("#hdfBoutiqueID").val(boutiqueid);
    BindAllProductImages();//binds masanory gallery with product under current boutique
    //prduct galler slide effect-masonry
    var galerydiv = $('.imageholder');
    var $mars= $('.imageholder').masonry(
            {
                itemSelector: '.masonry-thumb',
                isInitLayout: false
            });
     galerydiv.hide();
     $mars.imagesLoaded().progress(function (){
     $mars.masonry('layout');
     });
    
    //prduct gallery slide effect

     
   

     




    $("#olpreview").sortable({

        update: function( event, ui ) {}//when li image is reordered
    });
    $("#olpreview").disableSelection();
    
    
   
     BindAllImages();//list li of product images when images uploaded
     //$(".ddlrelateproducts").select2({
     //    placeholder: "Choose Related Products",
     //    allowClear: true,
     //    data: BindAsyncRelatedProducts()//Related products dropdown binds only with id and text[key:value] mandatory
     //});


    $(".ddlcategories").select2({
        placeholder: "Choose Categories",
        allowClear: true,
        data: BindAsyncCategory()//category dropdown binds only with id and text[key:value] mandatory
    });

    $(".ddlDesigners").select2({
      
        data: BindAsyncDesigner()//Designer dropdown binds only with id and text[key:value] mandatory
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
                Product.Name = $("#txtName").val();
                Product.Description = $("#txtDescription").val();
                Product.Price = $("#txtPrice").val();
                Product.Discount = $("#txtDiscount").val();
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
                  
                    Product.Name = $("#txtName").val();
                    Product.Description = $("#txtDescription").val();
                    Product.Price = $("#txtPrice").val();
                    Product.Discount = $("#txtDiscount").val();

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
                    var mainpicture;
                    $('#olpreview li').each(function (index) {
                        //val.push($(this).attr('id'));

                        var idval = $(this).attr('id');
                        orderno = index;
                        ImageInfo.push(idval);
                        debugger;
                        if (document.getElementById("chkbox").checked)
                        {
                            mainpicture = $(this).attr('id');
                        }

                        
                    });
                    Product.ImageInfo = ImageInfo;
                    //productimage id and order number
                    result = UpdateProduct(Product);
                    if (result[0].status == "1") {
                       
                        $('#rowfluidDiv').show();
                        $('.alert-success').show();
                        $(".AddProduct").text("Modify");
                        BindAllProductImages();
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



    $(".masonry-thumb").live({
        click: function (e)
        {
        var productid = $(this).attr('productid');
        var imageid = $(this).attr('imageid');
        var p = $(this).attr('pname');
      
        BindProductTextBoxes(this);
     
        return false;
        }
    })
//image galery show after all images loaded in masonary
    galerydiv.show();

    $(".image-link").on('click', function () {
        //imagezoombox
         var vb = $('#popup').viewbox();
         vb.trigger('viewbox.open');
     //   debugger;
      //  $('.image-link').viewbox();

        return false;
    });
   

   
});//end of document.ready



function BindProductTextBoxes(thisobject) {
    var productname = $(thisobject).attr('pname');
    var pdescription = $(thisobject).attr('pdescription');
    var pprice = $(thisobject).attr('pprice');
    var isoutstock = $(thisobject).attr('isoutstock');
    var isactive = $(thisobject).attr('isactive');
    var categories = $(thisobject).attr('categories');
    var designers = $(thisobject).attr('designers');
    $("#txtName").val(productname);
    $("#txtDescription").val(pdescription);
    $("#txtPrice").val(pprice);
    $("#txtPrice").val(pprice);
    if (isoutstock=='true')
    {
       // $('#OptisOutOfStockNo').parent().addClass('checked');
        $("#OptisOutOfStockNo").parent().removeClass('checked');
        $('#OptisOutOfStockYes').parent().addClass('checked');
    }
    if (isoutstock=='false')
    {
        $("#OptisOutOfStockYes").parent().removeClass('checked');
        $('#OptisOutOfStockNo').parent().addClass('checked');
    }
    if (isactive=='true')
      {
        $("#OptIsActiveNo").parent().removeClass('checked');
        $('#OptIsActiveYes').parent().addClass('checked'); 
      }
      if(isactive=='false')
      {
     
        $("#OptIsActiveYes").parent().removeClass('checked');
        $('#OptIsActiveNo').parent().addClass('checked');
      }

      if (categories != '')
      {
          var catarray = categories.split(',');
          for(var i=0;i<catarray.length;i++)
          {
              $(".ddlcategories").select2("val", catarray[i]);
          }
      }
    $(".AddProduct").text("Modify");
 }

function BindAllProductImages() {
        var imagedivholder = $('#productimagehold');
        var Product = new Object();
        //inserts from code behind
        var totalimages = {};
        totalimages = GetAllProductsImageDetailsunderBoutique(Product);
        $("#productimagehold").find(".masonry-thumb").remove();
     
        for (var i = 0; i < totalimages.length; i++)
        {
            var html = ('<div class="masonry-thumb"  productid=' + totalimages[i].ProductID + ' imageid=' + totalimages[i].ImageID + ' pname=' + totalimages[i].Name + ' pdescription=' + totalimages[i].Description + ' pprice=' + totalimages[i].Price + ' isoutstock=' + totalimages[i].IsOutOfStock + ' isactive=' + totalimages[i].IsActive + ' categories=' + totalimages[i].Categories + ' designers=' + totalimages[i].DesignerID + '>'
          + '  <a class="image-link" title="" href="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages[i].ImageID + '">'
         + '<img id="img' + i + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages[i].ImageID + '">'
         + '</a><div class="productDetailsdiv"><span>' + totalimages[i].ProductNo + '</span><span class="">' + totalimages[i].Name + '</span><span>₹  ' + totalimages[i].Price + '</span><span>Off:' + totalimages[i].Discount + '%</span></div></div>');
         imagedivholder.append(html);
        }
}

function BindAllProductImagesForEventLoad() {
   // var imagedivholder = $('#productimagehold');
    var Product = new Object();
    var html='';
    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllProductsImageDetailsunderBoutique(Product);
    $("#productimagehold").find(".masonry-thumb").remove();

        for (var i = 0; i < totalimages.length; i++) {
        html += '<div class="masonry-thumb" productid=' + totalimages[i].ProductID + ' imageid=' + totalimages[i].ImageID + ' pname=' + totalimages[i].Name + ' pdescription=' + totalimages[i].Description + ' pprice=' + totalimages[i].Price + ' isoutstock=' + totalimages[i].IsOutOfStock + ' isactive=' + totalimages[i].IsActive + ' categories=' + totalimages[i].Categories + ' designers=' + totalimages[i].DesignerID + '>'
        + '  <a style="background:url(../img/gallery/photo10.jpg)" title="Sample Image 1" href="">'
        + '<img id="img' + i + '" class="grayscale" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages[i].ImageID + '">'
        + '</a><div class="productDetailsdiv"><span class="span1">' + totalimages[i].Name + '</span><span>₹  ' + totalimages[i].Price + '</span><span>' + totalimages[i].Categories + '</span></div></div>';
       // imagedivholder.append(html);
        }
        return html;

}


function BindAllImages()
{
    //var boutiqid = $("#hdfBoutiqueID").val();
    var prodid = $("#hdfproductID").val();
    if (prodid != '') {

        var Product = new Object();
        Product.ProductID = prodid;
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
    chk.id = "";
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


function BindAsyncCategory() {
    var jsonResult = {};
    var Product = new Object();
    jsonResult = GetAllCategories(Product);
    if (jsonResult != undefined)
    {
        return jsonResult;
    }
}
function BindAsyncRelatedProducts() {
    var jsonResult = {};
    var Product = new Object();
    jsonResult = GetAllRelatedProducts(Product);
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

function BindAsyncDesigner() {
    var jsonResult = {};
    var Designers = new Object();
    jsonResult = GetAllDesigners(Designers);
    if (jsonResult != undefined) {
        return jsonResult;
       // $("#selectError3Cat").find
       // BindDesignerDropDown($("#selectError3Des"), jsonResult, -1);

    }
}
function GetAllProductsImageDetailsunderBoutique(Product)
{

    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductMainImages");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllProductImages(Product)
{   var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductImages");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllCategories(Product) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Category.aspx/GetAllCategoryIDandName");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllRelatedProducts(Product) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllRelatedProductsIDandName");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllDesigners(Designers) {

    var ds = {};
    var table = {};
    var data = "{'designersObj':" + JSON.stringify(Designers) + "}";
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




