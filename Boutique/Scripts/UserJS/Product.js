var LoginUserRole = '';
$("document").ready(function (e) {
   
    parent.document.title = Pages.Products;
    LoginUserRole = getRole(); //common function To Get Role
   //query string from dashboard for tab selection
    var qrStr = window.location.search;
    if (qrStr != "") {

        qrStr = qrStr.split("?")[1].split("=")[1];
        if (qrStr == "trends") {
            $('#myTab li:eq(1) a').tab('show');

             BindTrendingAllProductImages(0);
             var gallerytrendsdiv = $('.imageholderTrends');
             var $marstrends = $('.imageholderTrends').masonry({
                  itemSelector: '.masonry-thumb',
                 
               });
            
             $marstrends.imagesLoaded().progress(function () {
                 $marstrends.masonry('layout');
              });

        }
        if (qrStr == "OutOfStock") {
            $('#myTab li:eq(2) a').tab('show');
              BindAllProductImagesOutOfStock(0);
              var galleryoutofstockdiv = $('.imageholderoutofstock');
             var $marsoutofstock = $('.imageholderoutofstock').masonry({
                 itemSelector: '.masonry-thumb',
               
             });
            
             $marsoutofstock.imagesLoaded().progress(function () {
                 $marsoutofstock.masonry('layout');
              });


        }
    }
   //query string from dashboard for tab selection

    $('.ModifyProduct').hide();//hides edit button
    $('.DeleteProduct').hide();//hides delete button
    $('.image-link').viewbox({
        margin: 20,
        resizeDuration: 300,
        openDuration: 200,
        closeDuration: 200,
        closeButton: true,
        closeOnSideClick: true,
    });
    // $("#productimagehold").find(".masonry-thumb").remove();
    //document.getElementById('imageupGallery').style.display = 'block';
    BindAllProductImages(0);//binds masanory gallery with product under current boutique
    var galerydiv = $('.imageholder');
    var $mars = $('.imageholder').masonry(
            {
               
                itemSelector: '.masonry-thumb',
                
            });
    galerydiv.hide();
    $mars.imagesLoaded().progress(function () {
        $mars.masonry('layout');
    });

  //  BindAllProductImagesOutOfStock(0);
  //  var galleryoutofstockdiv = $('.imageholderoutofstock');
   // var $marsoutofstock = $('.imageholderoutofstock').masonry({
   //     itemSelector: '.masonry-thumb',
   //     isInitLayout: false
   // });
   // galleryoutofstockdiv.hide();
   // $marsoutofstock.imagesLoaded().progress(function () {
   //     $marsoutofstock.masonry('layout');
  //  });



  //  BindTrendingAllProductImages(0);
  //  var gallerytrendsdiv = $('.imageholderTrends');
  //  var $marstrends = $('.imageholderTrends').masonry({
  //      itemSelector: '.masonry-thumb',
  //      isInitLayout: false
  //  });
  //  gallerytrendsdiv.hide();
  //  $marstrends.imagesLoaded().progress(function (){
  //  $marstrends.masonry('layout');
  //  });
    //gallerytrendsdiv.show();




    // $('input[type="checkbox"]').on('change', function () {

    //   $('input[type="checkbox"]').not(this).prop('checked', false);
    //  

    //  }); 

    //   $('input[type=checkbox]').click(function () {
    // var chks = document.getElementById('<%= chkRoleInTransaction.ClientID %>').getElementsByTagName('INPUT');
    ///      
    //   var chks = $('.checkDes');
    // for (i = 0; i < chks.length; i++) {
    //      chks[i].checked = false;
    //  }
    //  if (chks.length > 1)
    //       $(this)[0].checked = true;
    //   });



    //prduct gallery slide effect

    $("#Preview").sortable({

        update: function (event, ui) { }//when div image is reordered
    });
    $("#Preview").disableSelection();

    if (LoginUserRole[0] != Roles.Manager) {
        BindAllImages();//list li of product images when images uploaded

    }
    $(".ddlrelateproducts").select2({
        placeholder: "Choose Related Products",
        allowClear: true,
        data: BindAsyncRelatedProducts()//Related products dropdown binds only with id and text[key:value] mandatory
    });

    var $catMulti = $(".ddlcategories").select2({
        placeholder: "Choose Categories",
        allowClear: true,
        data: BindAsyncCategory()//category dropdown binds only with id and text[key:value] mandatory
    });

    var $desingnSingle = $(".ddlDesigners").select2({

        data: BindAsyncDesigner()//Designer dropdown binds only with id and text[key:value] mandatory
       , allowClear: true
       , placeholder: "Select a Designer"
    });

   

    
    $(".DeleteProduct").live({
        click: function (e) {// Delete button click

            //if (confirm("You are about to Delete the product!..")) {
            var e = $("#hdfproductID").val();
            var p = "";
            DeleteCustomAlert("Are you sure?", e, p);


            //}
        }
    })



    $(".imgdelete").live({
        click: function (e) {// Clear controls
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var e = $(this).attr('id');
            var p = "ProductImage";
            DeleteCustomAlert("Are you sure?", e, p)
            return false;
        }
    })



    $(".CancelProduct").live({
        click: function (e) {// Clear controls
            clearProductControls();
            RemoveStyle();
            return false;
        }
    })

    $(".ClearProductimage").live({
        click: function (e) {// Clear image control
            ClearImage();
            return false;
        }
    })

    $(".masonry-thumb").live({
        click: function (e) {

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
         
            var imageid = $(this).attr('imageid');
            var p = $(this).attr('pname');

            if (LoginUserRole[0] != Roles.Manager) {
                AutoScrollToEdit();
                BindProductTextBoxes(this);
                BindAllImages();

            }
            return false;
        }
    })
    //image galery show after all images loaded in masonary
    galerydiv.show();
   // galleryoutofstockdiv.show();
   // gallerytrendsdiv.show();

    $(".image-link").on('click', function () {
        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();
        var imageid = $(this).attr('ImageID');
        var imgcntrol = $('#imgzoom');
        imgcntrol[0].src = "../ImageHandler/ImageServiceHandler.ashx?ImageID=" + imageid;
        var vb = $('#popup').viewbox();
        vb.trigger('viewbox.open');
    });


    $("#load_more_button").click(function (e) { //user clicks on button
        var len = null;
        $(this).hide(); //hide load more button on click
        var n = $("div.imageholder > .masonry-thumb").length;//check the count of thumb divs
        $('.animation_image').show(); //show loading image

        if (n === 0)
        {
            len = BindAllProductImagesForEventLoad(n);//Bind Images Into Masonry container
            if(len===0)
            {
                $(this).show();
                $(this).text("No More Products");
                $('.animation_image').hide();
                return false;
            }
        }
        if (n > 0)
        {
            n = n + 1;//last div thumb +1 to avoid last product duplication
            len = BindAllProductImagesForEventLoad(n);//Bind Images Into Masonry container
            if (len === 0)
            {
                $(this).show();
                $(this).text("No More Products");
                $('.animation_image').hide();
                return false;
            }
        }
        $('.animation_image').hide();
        $(this).show();

    });



    $("#load_more_buttontrends").click(function (e) { //user clicks on button
       
        var len = null;
        $(this).hide(); //hide load more button on click
        var n = $("div.imageholderTrends > .masonry-thumb").length;//check the count of thumb divs
        // var Product = new Object();
        //var totalcount = GetTotalProductCount(Product);
        //if (totalcount.TotalRows === n)
        // {
        //    $(this).show();

        //    $(this).text("No More Products");
        //     $('.animation_image').hide();
        //       return false;
        //  }
        $('.animation_image').show(); //show loading image
        if (n === 0) {
            len = BindTrendedProductImagesForEventLoad(n);//Bind Images Into Masonry container
            if (len === 0) {
                $(this).show();
                $(this).text("No More Products");
                $('.animation_image').hide();
                return false;
            }
        }
        if (n > 0)
        {
            n = n + 1;//last div thumb +1 to avoid last product duplication
            len = BindTrendedProductImagesForEventLoad(n);//Bind Images Into Masonry container
            if (len === 0) {
                $(this).show();
                $(this).text("No More Products");
                $('.animation_image').hide();
                return false;
            }
        }
        $('.animation_image').hide();
        $(this).show();

    });


    $("#load_more_buttonoutofstock").click(function (e)
    { //user clicks on button
       


        var len = null;
        $(this).hide(); //hide load more button on click
        var n = $("div.imageholderoutofstock > .masonry-thumb").length;//check the count of thumb divs
        // var Product = new Object();
        //var totalcount = GetTotalProductCount(Product);
        //if (totalcount.TotalRows === n)
        // {
        //    $(this).show();

        //    $(this).text("No More Products");
        //     $('.animation_image').hide();
        //       return false;
        //  }
        $('.animation_image').show(); //show loading image
        if (n === 0) {
            len = BindOutStockProductImagesForEventLoad(n);//Bind Images Into Masonry container
            
            if (len === 0) {
                $(this).show();
                $(this).text("No More Products");
                $('.animation_image').hide();
                return false;
            }
        }
        if (n > 0) {
            n = n + 1;//last div thumb +1 to avoid last product duplication
            len = BindOutStockProductImagesForEventLoad(n);//Bind Images Into Masonry container
            if (len === 0) {
                $(this).show();
                $(this).text("No More Products");
                $('.animation_image').hide();
                return false;
            }
        }
        $('.animation_image').hide();
        $(this).show();


    });

    $(".btnsearchnewproducts").click(function (e) { //user clicks on button

        var search = $("#txtsearchnewproducts").val();
        if (search != '') {

            BindAllNewProductImagesSearch(0, search);
        }
        else {
            CustomAlert("Please Search with Product No/Name!");
        }
    });


    $(".btnsearchtrends").click(function (e) { //user clicks on button
        var search = $("#txtsearchtrends").val();
        if (search != '') {
            BindNewTrendingAllProductImagesSearch(0, search);
        }
        else {
            CustomAlert("Please Search with Product No/Name!");
        }
    });


    $(".btnsearchoutofstock").click(function (e) { //user clicks on button

        var search = $("#txtsearchoutofstock").val();
        if (search != '') {
            BindAllNewProductImagesOutOfStockSearch(0, search);
        }
        else {
            CustomAlert("Please Search with Product No/Name!");
        }
    });


    $("#idtabnewproducts").click(function (e) { //user clicks on button
       // BindAllProductImages(0);
        //Masonary reinit
        //$("#load_more_buttontrends").hide();
        //$("#load_more_buttonoutofstock").hide();
        
        var $mars = $('.imageholder').masonry(
            {
                itemSelector: '.masonry-thumb',
              
            });
      
        $mars.imagesLoaded().progress(function () {
            $mars.masonry('layout');
        });
        //Masonary reinit
        //$("#load_more_button").hide();
    });

    $("#idtabtrending").click(function (e) { //user clicks on button
       
       
       // $("#load_more_button").hide();
       // $("#load_more_buttonoutofstock").hide();
       // $("#load_more_buttontrends").remove();
        $("#productTrendsimagehold").find(".masonry-thumb").remove();
         var $grid = $('.imageholderTrends').masonry({
            itemSelector: '.masonry-thumb',
       
         });


        $grid.imagesLoaded(function () {
          
            $grid.masonry('layout');
          
        });
        // BindTrendingAllProductImages(0);
       BindTrendedProductImagesForEventLoad(0);
        //*******
       

       

        //*******
        //Masonary reinit
       // var $marstrends = $('#productTrendsimagehold').masonry({
       //     itemSelector: '.masonry-thumb',
      //      isInitLayout: false
     //   });
        
       //   $marstrends.imagesLoaded().progress(function () {

       //        $marstrends.masonry('layout');
      //  });
        //Masonary reinit
       // $("#load_more_buttontrends").show();
    });

    $("#idtaboutofstock").click(function (e) { //user clicks on button
        //$("#load_more_button").hide();
        //$("#load_more_buttontrends").hide();
        //$("#load_more_buttonoutofstock").hide();
        //BindAllProductImagesOutOfStock(0);
        // BindOutStockProductImagesForEventLoad(0);
        $("#productoutofstockimagehold").find(".masonry-thumb").remove();
        BindOutOfStockProductsForTab(0);
        //  var galleryoutofstockdiv = $('.imageholderoutofstock');
      
        // galleryoutofstockdiv.hide();
    
        //Masonary reinit
        var $marsoutofstock = $('.imageholderoutofstock').masonry({
            itemSelector: '.masonry-thumb',
         
        });
        
        $marsoutofstock.imagesLoaded().progress(function () {
            $marsoutofstock.masonry('layout');
        });
        //$("#load_more_buttonoutofstock").show();
        //Masonary reinit
    });
    $('input[type=text],input[type=password],select').on('focus', function () {
       
        $(this).css({ background: 'white' });
        $('#ErrorBox').slideUp(1000);
    });
    $('textarea').on('focus', function () {
       
        $(this).css({ background: 'white' });
        $('#ErrorBox').slideUp(1000);
    });

});//end of document.ready
function RemoveStyle() {

    $('input[type=text],input[type=password],textarea,select').css({ background: 'white' });
    $('#ErrorBox').slideUp(1000);
}
function DeleteProductImage(e, p) {
    var Product = new Object();
    Product.ImageID = e;
    var result = DeleteProuductImage(Product);
    if (result.status == "1") {
        $('#rowfluidDiv').show();
        $('.alert-success').show();
        AutoScrollToAlertBox();
        BindAllImages();
    }
    if (result.status != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        AutoScrollToAlertBox();
        BindAllImages();
    }
}

function DeleteItem(e, p) {
    var Product = new Object();
    Product.ProductID = e;
    var result = DeleteProduct(Product);

    if (result.status == "1") {

        BindAllProductImages(0);
        clearProductControls();

        $('#rowfluidDiv').show();
        $('.alert-success').show();

        AutoScrollToAlertBox();
    }
    if (result.status != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        AutoScrollToAlertBox();
    }
}

function BindProductTextBoxes(thisobject) {
    
    var productname = $(thisobject).attr('pname');
    var pdescription = $(thisobject).attr('pdescription');
    var pprice = $(thisobject).attr('pprice');
    var pdiscount = $(thisobject).attr('discount');
    var isoutstock = $(thisobject).attr('isoutstock');
    var isactive = $(thisobject).attr('isactive');
    var categories = $(thisobject).attr('categories');
    var designerid = $(thisobject).attr('designers');
    var productid = $(thisobject).attr('productid');
    $("#editLabel").text("Edit Product");
    $("#hdfproductID").val(productid);
    $("#txtName").val(productname);
    $("#txtDescription").val(pdescription);
    $("#txtPrice").val(pprice);
    if (pdiscount === "null")
    {
        $("#txtDiscount").val('');
    }
    else
    {
        $("#txtDiscount").val(pdiscount);
    }
   
    if (isoutstock == 'true') {
        // $('#OptisOutOfStockNo').parent().addClass('checked');
        $("#OptisOutOfStockNo").parent().removeClass('checked');
        $('#OptisOutOfStockYes').parent().addClass('checked');
    }
    if (isoutstock == 'false') {
        $("#OptisOutOfStockYes").parent().removeClass('checked');
        $('#OptisOutOfStockNo').parent().addClass('checked');
    }
    if (isactive == 'true') {
        $("#OptIsActiveNo").parent().removeClass('checked');
        $('#OptIsActiveYes').parent().addClass('checked');
    }
    if (isactive == 'false') {

        $("#OptIsActiveYes").parent().removeClass('checked');
        $('#OptIsActiveNo').parent().addClass('checked');
    }

    if (categories != '') {
        var catarray = categories.split(',');
        var $catMulti = $(".ddlcategories").select2();
        $catMulti.val(catarray).trigger("change");
    }

    //binding related products drop down
    BindRelatedProductsOnDemand(productid);




    if (designerid != '') {
        var $desingnSingle = $(".ddlDesigners").select2();
        $desingnSingle.val(designerid).trigger("change");
    }
    $('.AddProduct').hide();
    $('.ModifyProduct').show();//switches button to edit mode
    $('.DeleteProduct').show();
    $('#IframeProjectSwitching').show();
}

//////////////////////////////////////
function BindAllNewProductImagesOutOfStockSearch(Pagevalue, searchtext) {
    var imagedivholder = $('#productoutofstockimagehold');
    var Product = new Object();
    if (Pagevalue != undefined) {
        Product.Paginationvalue = Pagevalue;
    }
    else {
        Product.Paginationvalue = "";
    }
    if (searchtext != undefined) {
        Product.SearchText = searchtext;
    }
    else {
        Product.SearchText = "";
    }
    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllNewOutOfStockSearchDetails(Product);
    $("#productoutofstockimagehold").find(".masonry-thumb").remove();

    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {

            imagedivholder.append(HtmlBindProductWithOffer(totalimages[i]));
        }
        if (totalimages[i].Discount === null) {

            imagedivholder.append(HtmlBindProductWithoutOffer(totalimages[i]));
        }
    }
}
//////////////////////////////////////////////////////
/////////////////////////////////
function BindAllNewProductImagesSearch(Pagevalue, searchtext) {
    var imagedivholder = $('#productimagehold');
    var Product = new Object();
    if (Pagevalue != undefined) {
        Product.Paginationvalue = Pagevalue;
    }
    else {
        Product.Paginationvalue = "";
    }
    if (searchtext != undefined) {
        Product.SearchText = searchtext;
    }
    else {
        Product.SearchText = "";
    }

    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllNewProductsSearchDetails(Product);
    $("#productimagehold").find(".masonry-thumb").remove();

    for (var i = 0; i < totalimages.length; i++) {

        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
        
                imagedivholder.append(HtmlBindProductWithOffer(totalimages[i]));
            }
        }
            if (totalimages[i].Discount === null) {
                if (totalimages[i].IsOutOfStock == false) {

                    imagedivholder.append(HtmlBindProductWithoutOffer(totalimages[i]));
                }

            }
         if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {
            
                       imagedivholder.append(HtmlBindProductOutOfStockWithOffer(totalimages[i]));
             }
                   if (totalimages[i].Discount == null) {
                 
            imagedivholder.append(HtmlBindProductOutOfStockWithoutOffer(totalimages[i]));
    }

}

    }
}
///////////////////////////////
///////////////////////////
function BindNewTrendingAllProductImagesSearch(Pagevalue, searchtext) {
    var imagedivholder = $('#productTrendsimagehold');
    var Product = new Object();
    if (Pagevalue != undefined) {
        Product.Paginationvalue = Pagevalue;
    }
    else {
        Product.Paginationvalue = "";
    }
    if (searchtext != undefined) {
        Product.SearchText = searchtext;
    }
    else {
        Product.SearchText = "";
    }
    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllNewTrendingSearchDetails(Product);
    $("#productTrendsimagehold").find(".masonry-thumb").remove();

    for (var i = 0; i < totalimages.length; i++) {
         if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {

                imagedivholder.append(HtmlBindProductWithOffer(totalimages[i]));
                }

                }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {

                imagedivholder.append(HtmlBindProductWithoutOffer(totalimages[i]));
                }


                }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {


                imagedivholder.append(HtmlBindProductOutOfStockWithOffer(totalimages[i]));
                }
            if (totalimages[i].Discount == null) {

                imagedivholder.append(HtmlBindProductOutOfStockWithoutOffer(totalimages[i]));
                }

                }
    }
}
/////////////////////////////
function BindOutOfStockProductsForTab(Pagevalue) {

   
    var Product = new Object();
    if (Pagevalue != undefined) {
        Product.Paginationvalue = Pagevalue;
    }
    else {
        Product.Paginationvalue = "";
    }

    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllOutOfStockProductsImageDetailsunderBoutique(Product);
    var $marsoutofstock = $('.imageholderoutofstock');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {


            elems = elems.add(HtmlBindProductWithOffer(totalimages[i]));
        }
        if (totalimages[i].Discount === null) {

            elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i]));

        }
    }
    $marsoutofstock.append(elems);
    $marsoutofstock.masonry('appended', elems);
    return totalimages.length;
}
///////////////////////////
function BindAllProductImagesOutOfStock(Pagevalue) {
  
    var imagedivholder = $('#productoutofstockimagehold');
    var Product = new Object();
    if (Pagevalue != undefined) {
        Product.Paginationvalue = Pagevalue;
    }
    else {
        Product.Paginationvalue = "";
    }

    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllOutOfStockProductsImageDetailsunderBoutique(Product);
    $("#productoutofstockimagehold").find(".masonry-thumb").remove();

    for (var i = 0; i < totalimages.length; i++) {

        if (totalimages[i].Discount != null) {

            imagedivholder.append(HtmlBindProductWithOffer(totalimages[i]));
        } 
        if (totalimages[i].Discount === null) {
       
            imagedivholder.append(HtmlBindProductWithoutOffer(totalimages[i]));
        }

    }
}
///////////////////////////////

///////////////////////////////
function BindTrendingAllProductImages(Pagevalue) {
    var imagedivholder = $('#productTrendsimagehold');
    var Product = new Object();
    if (Pagevalue != undefined) {
        Product.Paginationvalue = Pagevalue;
    }
    else {
        Product.Paginationvalue = "";
    }

    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllTrendingProductsImageunderBoutique(Product);
    $("#productTrendsimagehold").find(".masonry-thumb").remove();

    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
                      
                imagedivholder.append(HtmlBindProductWithOffer(totalimages[i]));
            }

        }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {
     
                imagedivholder.append(HtmlBindProductWithoutOffer(totalimages[i]));
            }


        }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {
    

                imagedivholder.append(HtmlBindProductOutOfStockWithOffer(totalimages[i]));
            }
            if (totalimages[i].Discount == null) {
             
                imagedivholder.append(HtmlBindProductOutOfStockWithoutOffer(totalimages[i]));
            }

        }
    }
}
////////////////////////////////
///////////////////////////////////////////////////////////////////

function HtmlBindProductWithOffer(totalimages)
{
var html =('<div class="masonry-thumb port-1 effect-2"  productid=' +totalimages.ProductID + ' imageid=' +totalimages.ImageID + ' pname=' +totalimages.Name + ' pdescription=' +totalimages.Description + ' pprice=' + totalimages.Price + ' isoutstock=' +totalimages.IsOutOfStock + ' isactive=' + totalimages.IsActive + ' categories=' + totalimages.Categories + ' designers=' +totalimages.DesignerID + ' designerName=' +totalimages.DesignerName + ' discount=' +totalimages.Discount + '>'
      + '<a class="image-link" ImageID="' +totalimages.ImageID + '">'
      + '<div class="image-box"><img class="sticker" src="../img/offersticker/offer.png"/><img id="img' +i + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' +totalimages.ImageID + '"></img></div>'
      + '<div class="productDetailsdiv text-desc"><span>Code: ' + totalimages.ProductNo + '</span><span class="">Name:' + totalimages.Name + '</span><span>Price: ₹  ' + totalimages.Price + '</span><span>Discount: ₹ ' + totalimages.Discount + '</span><span class="glyphicons star" style="color:blueviolet;font-size:11px;"><i></i>200 Buds</span></div></a>'
      + '</div>');
return html;
}
function HtmlBindProductWithoutOffer(totalimages)
{
    var html = ('<div class="masonry-thumb port-1 effect-2"  productid=' + totalimages.ProductID + ' imageid=' + totalimages.ImageID + ' pname=' + totalimages.Name + ' pdescription=' + totalimages.Description + ' pprice=' + totalimages.Price + ' isoutstock=' + totalimages.IsOutOfStock + ' isactive=' + totalimages.IsActive + ' categories=' + totalimages.Categories + ' designers=' + totalimages.DesignerID + ' designerName=' + totalimages.DesignerName + ' discount=' + totalimages.Discount + '>'
            + '<a class="image-link" ImageID="' + totalimages.ImageID + '">'
            + '<div class="image-box"><img id="img' + i + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages.ImageID + '"></img></div>'
            + '<div class="productDetailsdiv text-desc"><span>Code: ' + totalimages.ProductNo + '</span><span class="">Name:' + totalimages.Name + '</span><span>Price: ₹  ' + totalimages.Price + '</span><span class="glyphicons star" style="color:blueviolet;font-size:11px;"><i></i>200 Buds</span></div></a>'
            + '</div>');
    return html;
}
function HtmlBindProductOutOfStockWithOffer(totalimages)
{
    var html = ('<div class="masonry-thumb"  productid=' + totalimages.ProductID + ' imageid=' + totalimages.ImageID + ' pname=' + totalimages.Name + ' pdescription=' + totalimages.Description + ' pprice=' + totalimages.Price + ' isoutstock=' + totalimages.IsOutOfStock + ' isactive=' + totalimages.IsActive + ' categories=' + totalimages.Categories + ' designers=' + totalimages.DesignerID + ' designerName=' + totalimages.DesignerName + ' discount=' + totalimages.Discount + '>'
          + '<div class="image-box"><img class="sticker" src="../img/offersticker/offer.png"/><img id="img' + i + '" class="productimage" style="opacity:0.3!important" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages.ImageID + '"></img></div>'
          + '<a href="#" class="outstock">out of stock</a><div class="productDetailsdiv text-desc"><span>Code: ' + totalimages.ProductNo + '</span><span class="">Name:' + totalimages.Name + '</span><span>Price: ₹  ' + totalimages.Price + '</span><span class="glyphicons star" style="color:blueviolet;font-size:11px;"><i></i>200 Buds</span></div></a>'
          + '</div>');
    return html;

}
function HtmlBindProductOutOfStockWithoutOffer(totalimages)
{
       var html = ('<div class="masonry-thumb"  productid=' +totalimages.ProductID + ' imageid=' +totalimages.ImageID + ' pname=' + totalimages.Name + ' pdescription=' +totalimages.Description + ' pprice=' + totalimages.Price + ' isoutstock=' +totalimages.IsOutOfStock + ' isactive=' +totalimages.IsActive + ' categories=' +totalimages.Categories + ' designers=' +totalimages.DesignerID + ' designerName=' +totalimages.DesignerName + ' discount=' +totalimages.Discount + '>'
           + '<div class="image-box"><img id="img' +i + '" class="productimage" style="opacity:0.3!important" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages.ImageID + '"></img></div>'
           + '<a href="#" class="outstock">out of stock</a><div class="productDetailsdiv text-desc"><span>Code: ' +totalimages.ProductNo + '</span><span class="">Name:' +totalimages.Name + '</span><span>Price: ₹  ' +totalimages.Price + '</span><span class="glyphicons star" style="color:blueviolet;font-size:11px;"><i></i>200 Buds</span></div></a>'
           + '</div>');
       return html;
}
//////////////////////////////////////////////////////////////////////

function BindAllProductImages(Pagevalue) {
   
    var imagedivholder = $('#productimagehold');
    var Product = new Object();
    if (Pagevalue != undefined) {
        Product.Paginationvalue = Pagevalue;
    }
    else {
        Product.Paginationvalue = "";
    }

    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllProductsImageDetailsunderBoutique(Product);
    $("#productimagehold").find(".masonry-thumb").remove();

    for (var i = 0; i < totalimages.length; i++) {

        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
        //          var html = ('<div class="masonry-thumb port-1 effect-2"  productid=' + totalimages[i].ProductID + ' imageid=' + totalimages[i].ImageID + ' pname=' + totalimages[i].Name + ' pdescription=' + totalimages[i].Description + ' pprice=' + totalimages[i].Price + ' isoutstock=' + totalimages[i].IsOutOfStock + ' isactive=' + totalimages[i].IsActive + ' categories=' + totalimages[i].Categories + ' designers=' + totalimages[i].DesignerID + ' designerName=' + totalimages[i].DesignerName + ' discount=' + totalimages[i].Discount + '>'
        //   + '<a class="image-link" ImageID="' + totalimages[i].ImageID + '">'
        //  + '<div class="image-box"><img class="sticker" src="../img/offersticker/offer.png"/><img id="img' + i + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages[i].ImageID + '"></img></div>'
        // + '<div class="productDetailsdiv text-desc"><span>Code: ' + totalimages[i].ProductNo + '</span><span class="">Name:' + totalimages[i].Name + '</span><span>Price: ₹  ' + totalimages[i].Price + '</span><span>Discount: ₹ ' + totalimages[i].Discount + '</span><span class="glyphicons star" style="color:blueviolet;font-size:11px;"><i></i>200 Buds</span></div></a>'
        //+ '</div>');//cop
                
                imagedivholder.append(HtmlBindProductWithOffer(totalimages[i]));
            }

        }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {
        //        var html = ('<div class="masonry-thumb port-1 effect-2"  productid=' + totalimages[i].ProductID + ' imageid=' + totalimages[i].ImageID + ' pname=' + totalimages[i].Name + ' pdescription=' + totalimages[i].Description + ' pprice=' + totalimages[i].Price + ' isoutstock=' + totalimages[i].IsOutOfStock + ' isactive=' + totalimages[i].IsActive + ' categories=' + totalimages[i].Categories + ' designers=' + totalimages[i].DesignerID + ' designerName=' + totalimages[i].DesignerName + ' discount=' + totalimages[i].Discount + '>'
         //  + '<a class="image-link" ImageID="' + totalimages[i].ImageID + '">'
          // + '<div class="image-box"><img id="img' + i + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages[i].ImageID + '"></img></div>'
          // + '<div class="productDetailsdiv text-desc"><span>Code: ' + totalimages[i].ProductNo + '</span><span class="">Name:' + totalimages[i].Name + '</span><span>Price: ₹  ' + totalimages[i].Price + '</span><span class="glyphicons star" style="color:blueviolet;font-size:11px;"><i></i>200 Buds</span></div></a>'
          // + '</div>');
                imagedivholder.append(HtmlBindProductWithoutOffer(totalimages[i]));
            }


        }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {
     //           var html = ('<div class="masonry-thumb"  productid=' + totalimages[i].ProductID + ' imageid=' + totalimages[i].ImageID + ' pname=' + totalimages[i].Name + ' pdescription=' + totalimages[i].Description + ' pprice=' + totalimages[i].Price + ' isoutstock=' + totalimages[i].IsOutOfStock + ' isactive=' + totalimages[i].IsActive + ' categories=' + totalimages[i].Categories + ' designers=' + totalimages[i].DesignerID + ' designerName=' + totalimages[i].DesignerName + ' discount=' + totalimages[i].Discount + '>'
      //     + '<div class="image-box"><img class="sticker" src="../img/offersticker/offer.png"/><img id="img' + i + '" class="productimage" style="opacity:0.3!important" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages[i].ImageID + '"></img></div>'
      //     + '<a href="#" class="outstock">out of stock</a><div class="productDetailsdiv text-desc"><span>Code: ' + totalimages[i].ProductNo + '</span><span class="">Name:' + totalimages[i].Name + '</span><span>Price: ₹  ' + totalimages[i].Price + '</span><span class="glyphicons star" style="color:blueviolet;font-size:11px;"><i></i>200 Buds</span></div></a>'
       //    + '</div>');
                imagedivholder.append(HtmlBindProductOutOfStockWithOffer(totalimages[i]));
            }
            if (totalimages[i].Discount == null) {
   //             var html = ('<div class="masonry-thumb"  productid=' + totalimages[i].ProductID + ' imageid=' + totalimages[i].ImageID + ' pname=' + totalimages[i].Name + ' pdescription=' + totalimages[i].Description + ' pprice=' + totalimages[i].Price + ' isoutstock=' + totalimages[i].IsOutOfStock + ' isactive=' + totalimages[i].IsActive + ' categories=' + totalimages[i].Categories + ' designers=' + totalimages[i].DesignerID + ' designerName=' + totalimages[i].DesignerName + ' discount=' + totalimages[i].Discount + '>'
     ///      + '<div class="image-box"><img id="img' + i + '" class="productimage" style="opacity:0.3!important" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages[i].ImageID + '"></img></div>'
        //   + '<a href="#" class="outstock">out of stock</a><div class="productDetailsdiv text-desc"><span>Code: ' + totalimages[i].ProductNo + '</span><span class="">Name:' + totalimages[i].Name + '</span><span>Price: ₹  ' + totalimages[i].Price + '</span><span class="glyphicons star" style="color:blueviolet;font-size:11px;"><i></i>200 Buds</span></div></a>'
          // + '</div>');
                imagedivholder.append(HtmlBindProductOutOfStockWithoutOffer(totalimages[i]));
            }

        }
    }
}

//////////////////////////////////////////////////////////////////////
function BindAllImages()
{
    //var boutiqid = $("#hdfBoutiqueID").val();
    var prodid = $("#hdfproductID").val();
    if (prodid != '') {

        var Product = new Object();
        Product.ProductID = prodid;
        var imageids = {};
        imageids = GetAllProductImages(Product);
        $("#previewmsg").text('Make one as product main image!');

        $("#Preview").find(".imgpreviewdiv").remove();
        $.each(imageids, function (index, Records) {
            MultiImageBind(Records, index);
        })

    }
}

function gethiddenvalue()
{
    var prod = $("#hdfproductID").val();
    return prod;
}


function MultiImageBind(Records, index) {

    var divPre = document.getElementById("Preview");
    divPre.className = 'Maindiv';
    var div = document.createElement("div");
    //var children = ol.children.length + 1
    div.setAttribute("id", Records.ImageID);
    div.setAttribute("class", "imgpreviewdiv");

    img1 = document.createElement('img');
    img1.src = "../ImageHandler/ImageServiceHandler.ashx?ImageID=" + Records.ImageID;
    img1.className = "thumb";
    div.appendChild(img1);
    //<label class="checkbox inline">
    //<input type="checkbox" id="chkActiveAdmin" checked/>Yes</label>
    //<label class="checkbox">
    //<input type="checkbox" id="optionsCheckbox2" value="option1" disabled="">
    // This is a disabled checkbox
    //  </label>
    // var lblchk = document.createElement('label');
    //lblchk.type = 'label';
    // lblchk.className = 'checkbox';


    var chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.className = 'checkDes';
    chk.id = 'checkDes' + index;
    chk.onclick = 'MainImageClick(this);';
    chk.setAttribute("onclick", "MainImageClick(\"" + 'checkDes' + index + "\")");




    var del = document.createElement('input');
    del.className = 'imgdelete';
    del.type = 'image';
    del.src = '../Home/images/Deleteicon1.png';
    del.id = Records.ImageID;
    div.appendChild(del);

    if (Records.IsMain === true) {
        chk.checked = true;
        del.style.visibility = 'hidden';
    }

    divPre.appendChild(div);
    div.appendChild(chk);

}


function MainImageClick(currentid) {
    $('.checkDes').attr('checked', false);
    $('#' + currentid).attr('checked', true);
}


function ClearImage() {
    document.getElementById("productfile").value = "";
    $("#list").find(".thumb").remove();
}


function BindAsyncCategory() {
    var jsonResult = {};
    var Product = new Object();
    jsonResult = GetAllCategories(Product);
    if (jsonResult != undefined) {
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

function GetAllNewProductsSearchDetails(Product) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllNewProductMainDetailsBySearch");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllNewOutOfStockSearchDetails(Product) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllNewOutOfStockProductMainDetailsBySearch");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllNewTrendingSearchDetails(Product) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllNewTrendingProductsMainDetailsBySearch");
    table = JSON.parse(ds.d);
    return table;
}


function GetAllProductsImageDetailsunderBoutique(Product) {
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductMainImages");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllTrendingProductsImageunderBoutique(Product) {

    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllTrendingProductsMainImagesDetails");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllOutOfStockProductsImageDetailsunderBoutique(Product) {

    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllOutOfStockProductMainImages");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllProductImages(Product) {
    var ds = {};
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
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductIDandName");
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

function InsertProduct(Product) {
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/InsertProduct");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function UpdateProduct(Product) {
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/UpdateProduct");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}


function DeleteProduct(Product) {
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/DeleteProduct");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}


function DeleteProuductImage(Product) {
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/DeleteProudctImage");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function BindRelatedProductsOnDemand(productid)
{
   
    var Product = new Object();
    var relateproarry = [];
    Product.ProductID = productid;
  
    var jsonResult = {};
    jsonResult = GetAllRelatedProductsByProductID(Product);
    if (jsonResult != undefined)
    {
        for (var i = 0; i < jsonResult.length; i++)
        {
            relateproarry.push(jsonResult[i].RelatedProductsID);
        }
        var $RelatedprodMulti = $(".ddlrelateproducts").select2();
        $RelatedprodMulti.val(relateproarry).trigger("change");
    
        $('#idDdlrelateproducts option[value=' + productid + ']').remove();
    }
}

function GetAllRelatedProducts(Product)
{
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductIDandName");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function GetAllRelatedProductsByProductID(Product) {
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/GetAllRelatedProductsByProductID");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}


function AutoScrollToEdit() {

    $('html, body').animate({
        scrollTop: $("#IframeProjectSwitching").offset().top
    }, 500);

}


function clearProductControls() {
    $("#txtName").val('');
    $("#txtDescription").val('');
    $("#txtPrice").val('');
    $("#txtDiscount").val('');
    $(".ddlcategories").select2("val", "");
    $(".ddlDesigners").select2("val", "");
    $(".ddlrelateproducts").select2("val", "");
    $('#OptisOutOfStockNo').parent().addClass('checked');
    $("#OptisOutOfStockYes").parent().removeClass('checked');
    $('#OptIsActiveYes').parent().addClass('checked');
    $("#OptIsActiveNo").parent().removeClass('checked');
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $("#hdfproductID").val('');
    $('.DeleteProduct').hide();//hides delete
    $('.ModifyProduct').hide();
    $('.AddProduct').show();
    $("#editLabel").text("New Product");
    $("#Preview").find(".imgpreviewdiv").remove();
    $('#IframeProjectSwitching').hide();
    $("#previewmsg").text('');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//Binding Product Images into Masonry Container on Load Images Button
//Created By Thomson Varkey, 21-06-2016
////
////All Product Images
///
function BindAllProductImagesForEventLoad(Pagevalue) {
    var imagedivholder = $('#productimagehold');
    var Product = new Object();
    if (Pagevalue != undefined) {
        Product.Paginationvalue = Pagevalue;
    }
    else {
        Product.Paginationvalue = "";
    }
    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllProductsImageDetailsunderBoutique(Product);
   
    var $mars = $('.imageholder');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
       

                elems = elems.add(HtmlBindProductWithOffer(totalimages[i]));
            }
            }
            if (totalimages[i].Discount === null) {
                if (totalimages[i].IsOutOfStock == false) {
        
                    elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i]));

                }
            }
            if (totalimages[i].IsOutOfStock == true) {
                if (totalimages[i].Discount != null) {
           
                    elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i]));
                }
                if (totalimages[i].Discount == null) {
            
                    elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i]));
                }
            }
      }
    $mars.append(elems);
    $mars.masonry('appended', elems);
    return totalimages.length;
}
////
////Out Of Stock Images
///
function BindOutStockProductImagesForEventLoad(Pagevalue) {

   
    var Product = new Object();
    if (Pagevalue != undefined) {
        Product.Paginationvalue = Pagevalue;
    }
    else {
        Product.Paginationvalue = "";
    }

    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllOutOfStockProductsImageDetailsunderBoutique(Product);
    var $marsoutofstock = $('.imageholderoutofstock');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            

            elems = elems.add(HtmlBindProductWithOffer(totalimages[i]));
        }
        if (totalimages[i].Discount === null) {
           
            elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i]));

        }
    }
    $marsoutofstock.append(elems);
    $marsoutofstock.masonry('appended', elems);
    return totalimages.length;
}



////
////Trend Images
///
function BindTrendedProductImagesForEventLoad(Pagevalue) {

    var imagedivholder = $('#productimagehold');
    var Product = new Object();
    if (Pagevalue != undefined) {
        Product.Paginationvalue = Pagevalue;
    }
    else {
        Product.Paginationvalue = "";
    }

    //inserts from code behind
    var totalimages = {};
    totalimages = GetAllTrendingProductsImageunderBoutique(Product);
    var $marstrends = $('.imageholderTrends');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {


                elems = elems.add(HtmlBindProductWithOffer(totalimages[i]));
            }
        }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i]));

            }
        }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {

                elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i]));
            }
            if (totalimages[i].Discount == null) {

                elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i]));
            }
        }

    }
    $marstrends.append(elems);
    $marstrends.masonry('appended', elems);
    return totalimages.length;
}
//End Binding Product Images into Masonry Container on Load Images Button
//Created By Thomson Varkey,21-0-2016
///////////////////////////////////////////////////////////////////////////////////////////////////////


function GetTotalProductCount(Product)
{
    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllRowsCount");
    table = JSON.parse(ds.d);
    return table;
}

//Basic Validation For New Notification
//CreatedBy Thomson
function ProductValidation() {
    
    $('#Displaydiv').remove();
    var Name = $('#txtName');
    var Descrip = $('#txtDescription');
    var Price = $('#txtPrice');
    var Category = $('#idDdlCategories');

    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
        { id: Descrip[0].id, name: Descrip[0].name, Value: Descrip[0].value },
        { id: Price[0].id, name: Price[0].name, Value: Price[0].value },
        { id: Category[0].id, name: Category[0].name, Value: Category[0].value }
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
    if (j == 1) {
        var p = document.createElement('p');
        p.innerHTML = "* Some Fields Are Empty ! ";
        p.style.color = "Red";
        p.style.fontSize = "14px";

        divs.appendChild(p);

        return false;
    }
    if (j == '0') {
        $('#ErrorBox').hide();
        AddProduct();
        return true;
    }
}
function ProductValidationEdit() {     
    $('#Displaydiv').remove();
    var Name = $('#txtName');
    var Descrip = $('#txtDescription');
    var Price = $('#txtPrice');
    var Category = $('#idDdlCategories');

    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
        { id: Descrip[0].id, name: Descrip[0].name, Value: Descrip[0].value },
        { id: Price[0].id, name: Price[0].name, Value: Price[0].value },
        { id: Category[0].id, name: Category[0].name, Value: Category[0].value }
    ];

    var j = 0;
    var k = 0;
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
    if (j == 1) {
        var p = document.createElement('p');
        p.innerHTML = "* Some Fields Are Empty ! ";
        p.style.color = "Red";
        p.style.fontSize = "14px";
        divs.appendChild(p);
        Errorbox.style.paddingLeft = "30px";
        return false;
    }
    $('#Preview div').each(function (index) {
        
        var chkflag = document.getElementById("checkDes" + index).checked;
        if (chkflag == true) {
            //Product.MainImageID = idval;
            k = 1;
        }
    });
    if (k == 0)
    {
        Errorbox.style.borderRadius = "5px";
        Errorbox.style.display = "block";
        var p = document.createElement('p');
        p.innerHTML = "* You Missed to Select a Main Image!";
        p.style.color = "Red";
        p.style.fontSize = "14px";
        divs.appendChild(p);
        return false;
    }
    if (j == '0') {
        $('#ErrorBox').hide();
        EditProduct();
        return true;
    }
}
function AddProduct() {
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    var result = "";

        var Product = new Object();
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
        if (Categ != null) {
            for (var i = 0; i < Categ.length; i++) {
                Product.Categories = Product.Categories + com + Categ[i].toString();
                com = ",";
            }
        }
        else {
            Product.Categories = "";
        }

        //var dfd = $("#idDdlrelateproducts");
        // alert(dfd.val());
        var relproducts = [];

        if ($("#idDdlrelateproducts").val() != null) {

            Product.RelatedProductsIDs = $("#idDdlrelateproducts").val();
        }
        else {
            Product.RelatedProductsIDs = relproducts;
        }

        if ($("#idDdlDesigners").val() != null) {
            Product.DesignerID = $("#idDdlDesigners").val();
        }
        else {
            Product.DesignerID = "";
        }

        result = InsertProduct(Product);

        if (result.status == "1") {

            $("#hdfproductID").val(result.ProductID);
            $('#rowfluidDiv').show();
            $('.alert-success').show();
            // $(".AddProduct").text("Modify");
            $('.ModifyProduct').show();//displays editsave button
            $('.AddProduct').hide();//hides save
            
            $('#IframeProjectSwitching').show();
            // Scroll page
            // AutoScrollToAlertBox();

        }
        if (result.status != "1") {
            $('#rowfluidDiv').show();
            $('.alert-error').show();


            // Scroll page
            AutoScrollToAlertBox();

        }
    
    return false;
}
function EditProduct()
{
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
        if (Categ != null) {
            for (var i = 0; i < Categ.length; i++) {
                Product.Categories = Product.Categories + com + Categ[i].toString();
                com = ",";
            }
        }
        else {
            Product.Categories = "";
        }

        var relproducts = [];

        if ($("#idDdlrelateproducts").val() != null) {

            Product.RelatedProductsIDs = $("#idDdlrelateproducts").val();
        }
        else {
            Product.RelatedProductsIDs = relproducts;
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

        $('#Preview div').each(function (index) {
            //val.push($(this).attr('id'));
            var idval = $(this).attr('id');
            orderno = index;
            ImageInfo.push(idval);

            var chkflag = document.getElementById("checkDes" + index).checked;
            if (chkflag == true) {
                Product.MainImageID = idval;
            }


        });
        Product.ImageInfo = ImageInfo;
        //productimage id and order number
        result = UpdateProduct(Product);
        if (result.status == "1") {

            $('#rowfluidDiv').show();
            $('.alert-success').show();
            $("#editLabel").text("Edit Product");

            // $(".AddProduct").text("Modify");
            BindAllProductImages();
            //document.getElementById('imageupGallery').style.display = 'block';
            // Scroll page
            AutoScrollToAlertBox();

        }
        if (result.status != "1") {
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            // Scroll page
            AutoScrollToAlertBox();
        }
    }
    return false;
}
