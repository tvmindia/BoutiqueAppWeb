var LoginUserRole = '';
var ProductTypes = []; 
var IsBindedControlsOnEdit = false;     //-- To check whether controls are binded on edit (reason: bcz Product type controls will be recreated on type dropdown change,And valuies will get disappeared , so inorder to rebind value to controls , we have to identify its edit click itself )
var DefaultPrice = '';                 //-- Base price (Base Price will be binded for type prices, This value will be binded on onblur event of Base price textbox)
var DefaultDiscount = '';             //-- Base Discount price (Discount will be binded for type discount prices, This value will be binded on onblur event of Base Discount price textbox)

$("document").ready(function (e) {
  
    $('.ReviveProduct').hide();
    $('#lblproductno').hide();
   
    parent.document.title = Pages.Products;
    LoginUserRole = getRole(); //common function To Get Role
   //query string from dashboard for tab selection
    var qrStr = window.location.search;
    if (qrStr != "") {
       
        qrStr = qrStr.split("?")[1].split("=")[1];
        if (qrStr == "trends") {
            $('#myTab li:eq(1) a').tab('show');

            //BindTrendingAllProductImages(0);
            if (BindTrendedProductImagesRebind(0) != -1)
            {
                var gallerytrendsdiv = $('.imageholderTrends');
                var $marstrends = $('.imageholderTrends').masonry({
                    itemSelector: '.masonry-thumb',

                });
                $marstrends.imagesLoaded().progress(function () {
                    $marstrends.masonry('layout');
                });
            }
           

        }
        if (qrStr == "OutOfStock") {
            $('#myTab li:eq(2) a').tab('show');

           // BindAllProductImagesOutOfStock(0);
            if (BindOutStockProductImagesRebind(0) != -1)
            {
                var galleryoutofstockdiv = $('.imageholderoutofstock');
                var $marsoutofstock = $('.imageholderoutofstock').masonry({
                    itemSelector: '.masonry-thumb',

                });

                $marsoutofstock.imagesLoaded().progress(function () {
                    $marsoutofstock.masonry('layout');
                });
            }
                
         }
    }
   //query string from dashboard for tab selection
    $('.ModifyProduct').hide();//hides edit button
    $('.DeleteProduct').hide();//hides delete button
    //$('.image-link').viewbox({
    //    margin: 20,
    //    resizeDuration: 300,
    //    openDuration: 200,
    //    closeDuration: 200,
    //    closeButton: true,
    //    closeOnSideClick: true,
    //});
    // $("#productimagehold").find(".masonry-thumb").remove();
    //document.getElementById('imageupGallery').style.display = 'block';
  
    // BindAllProductImages(0);//binds masanory gallery with product under current boutique
    if (BindAllProductImagesRebind(0) != -1) {

        var galerydiv = $('.imageholder');
        var $mars = $('.imageholder').masonry(
                {
                    itemSelector: '.masonry-thumb',

                });
            $mars.imagesLoaded().progress(function () {
            $mars.masonry('layout');
        });
    }

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
    $(".CategorySort").select2({
        placeholder: "Choose Categories",
        allowClear: true,
        data: BindAsyncCategory()//category dropdown binds only with id and text[key:value] mandatory
    });
    $(".TrendingCategorySort").select2({
        placeholder: "Choose Categories",
        allowClear: true,
        data: BindAsyncCategory()//category dropdown binds only with id and text[key:value] mandatory
    });
    $(".OutOfStocksCategorySort").select2({
        placeholder: "Choose Categories",
        allowClear: true,
        data: BindAsyncCategory()//category dropdown binds only with id and text[key:value] mandatory
    });
    $(".ReviveCategorySort").select2({
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
           
            var e = $("#hdfproductID").val();
            var p = "productRemove";
            debugger;
            DeleteCustomAlert("Are you sure?", e, p);
        }
    })
    
    $(".imgdelete").live({
        click: function (e) {// Clear controls
          
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var e = $(this).attr('id');
            var p = "ProductImage";
            if (e.which === 1) {
                e.preventDefault();
            }
            else {
                DeleteCustomAlert("Are you sure?", e, p)
            }
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

    $("#load_more_button").click(function (e) { //user clicks on button
      
        HideAlertBox();
        var len = null;
        $(this).hide(); //hide load more button on click
        var n = $("div.imageholder > .masonry-thumb").length;//check the count of thumb divs
        var category = $(".CategorySort").val();
        var sort = $(".NewProductsSort").val();
       
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
            if (category != null) {
                len = BindAllProductImagesForEventLoadBasedOnCateory(n, category)
            }
            else if (sort != null && sort != "Sort By")
            {
                BindAllSortedProductImagesForEventLoad(n, sort);
            }
            else {
                len = BindAllProductImagesForEventLoad(n);//Bind Images Into Masonry container
            }
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
        HideAlertBox();
        var len = null;
        $(this).hide(); //hide load more button on click
        var n = $("div.imageholderTrends > .masonry-thumb").length;//check the count of thumb divs
        var category = $(".TrendingCategorySort").val();
        var sort = $(".TrendingSort").val();
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
            if (category != null) {
                len = BindTrendingProductImagesForEventLoadBasedOnCateory(n, category)
            }
            else if (sort != null && sort != "Sort By") {
                BindSortedTrendingProductImagesForEventLoad(n, sort);
            }
            else {
                len = BindTrendedProductImagesForEventLoad(n);//Bind Images Into Masonry container
            }
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
        HideAlertBox();
        var len = null;
        $(this).hide(); //hide load more button on click
        var n = $("div.imageholderoutofstock > .masonry-thumb").length;//check the count of thumb divs
        var category = $(".OutOfStocksCategorySort").val();
        var sort = $(".OutOfStockSort").val();
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
            if (category != null) {
                len = BindOutStockProductImagesForEventLoadBasedOnCategorySort(n, category)
            }
            else if (sort != null && sort != "Sort By") {
                BindOutStockSortedProductImagesForEventLoad(n, sort);
            }
            else {
                len = BindOutStockProductImagesForEventLoad(n);//Bind Images Into Masonry container
            }
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

    $("#load_more_buttonreviveproducts").click(function (e) { //user clicks on button
        HideAlertBox();
        var len = null;
        $(this).hide(); //hide load more button on click
        var n = $("div.imageholderreviveproduct > .masonry-thumb").length;//check the count of thumb divs
        var category = $(".ReviveCategorySort").val();
        var sort = $(".ReviveSort").val();
       
        $('.animation_image').show(); //show loading image
        if (n === 0) {
            len = BindReviveProductImagesForEventLoad(n);//Bind Images Into Masonry container

            if (len === 0) {
                $(this).show();
                $(this).text("No More Products");
                $('.animation_image').hide();
                return false;
            }
        }
        if (n > 0) {
            n = n + 1;//last div thumb +1 to avoid last product duplication
            if (category != null) {
                len = BindReviveProductImagesForEventLoadBasedOnCategorySort(n, category)
            }
            else if (sort != null && sort != "Sort By") {
                BindSortedReviveProductImagesForEventLoad(n, sort);
            }
            else {
                len = BindReviveProductImagesForEventLoad(n);//Bind Images Into Masonry container
            }
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

    $("#idtabnewproducts").click(function (e) { //user clicks on button
        HideAlertBox();
        clearProductControls();
        $('#loadmorenewproductdiv').show();
        $('.ReviveProduct').hide();
        $('.AddProduct').show();
        $('.DeleteProduct').hide();
        $('.ModifyProduct').hide();
        $('.CancelProduct').show();
        //BindAllProductImages(0);
        //Masonary reinit
        //$("#load_more_buttontrends").hide();
        //$("#load_more_buttonoutofstock").hide();
        //location.reload();

        if (BindAllProductImagesRebind(0) != -1)
        {
            var $mars = $('.imageholder').masonry(
           {
               itemSelector: '.masonry-thumb',
           });

            $mars.imagesLoaded().progress(function () {
                $mars.masonry('layout');
            });
        }
       
        //Masonary reinit
        //$("#load_more_button").hide();
    });

    $("#idtabtrending").click(function (e) { //user clicks on button
        HideAlertBox();
        clearProductControls();
        $('#loadmoretrendproductdiv').show();
        $('.ReviveProduct').hide();
        $('.AddProduct').show();
        $('.DeleteProduct').hide();
        $('.ModifyProduct').hide();
        $('.CancelProduct').show();
       // $("#load_more_button").hide();
       // $("#load_more_buttonoutofstock").hide();
       // $("#load_more_buttontrends").remove();
        //$("#productTrendsimagehold").find(".masonry-thumb").remove();
        if (BindTrendedProductImagesRebind(0) != -1)
        {
            var $grid = $('.imageholderTrends').masonry({
                itemSelector: '.masonry-thumb',

            });
            $grid.imagesLoaded(function () {

                $grid.masonry('layout');

            });
        }
       
     
    });

    $("#idtaboutofstock").click(function (e) { //user clicks on button
        $('#loadmoreoutofstockproductdiv').show();
        HideAlertBox();
        clearProductControls();
        $('.ReviveProduct').hide();
        $('.AddProduct').show();
        $('.DeleteProduct').hide();
        $('.ModifyProduct').hide();
        $('.CancelProduct').show();
       
   

        if (BindOutStockProductImagesRebind(0) != -1)
        {
            var $marsoutofstock = $('.imageholderoutofstock').masonry({
                itemSelector: '.masonry-thumb',

            });

            $marsoutofstock.imagesLoaded().progress(function () {
                $marsoutofstock.masonry('layout');
            });
        }
       
        //$("#load_more_buttonoutofstock").show();
        //Masonary reinit
    });

    $("#idtabdeletedproducts").click(function (e) { //user clicks on button
        HideAlertBox();
        clearProductControls();
        $('#loadmoredeletedproductdiv').show();
       // $('.ReviveProduct').show();
        $('.ReviveProduct').show();
        $('.AddProduct').hide();
        $('.DeleteProduct').hide();
        $('.ModifyProduct').hide();
        $('.CancelProduct').hide();
        
        //Masonary reinit
        if (BindRevivedProductImagesRebinds(0) != -1)
        {
            var $marsrevive = $('.imageholderreviveproduct').masonry({
                itemSelector: '.masonry-thumb',
            });
            $marsrevive.imagesLoaded().progress(function () {
                $marsrevive.masonry('layout');
            });
        }
        //Masonary reinit
    });

    $(".btnsearchnewproducts").click(function (e) { //user clicks on button
        HideAlertBox();
        var search = $("#txtsearchnewproducts").val();
        if (search != '') {
            // $("#productimagehold").find(".masonry-thumb").remove();
            $('#loadmorenewproductdiv').hide();
            if (BindAllNewProductImagesSearch(0, search) != -1) {
                var $mars = $('.imageholder').masonry(
                {
                    itemSelector: '.masonry-thumb',
                });
                $mars.imagesLoaded().progress(function () {
                    $mars.masonry('layout');
                });
            }
        }
        else {
            CustomAlert("Please Search with Product No/Name!");
        }
    });

    $(".btnsearchtrends").click(function (e) { //user clicks on button
        $('#loadmoretrendproductdiv').hide();
        HideAlertBox();
        var search = $("#txtsearchtrends").val();
        if (search != '') {
            if (BindNewTrendingAllProductImagesSearch(0, search) != -1) {
                var $mars = $('.imageholderTrends').masonry({
                    itemSelector: '.masonry-thumb',
                });
                $mars.imagesLoaded().progress(function () {
                    $mars.masonry('layout');
                });
            }
        }
        else {
            CustomAlert("Please Search with Product No/Name!");
        }
    });

    $(".btnsearchoutofstock").click(function (e) { //user clicks on button
        $('#loadmoreoutofstockproductdiv').hide();
        HideAlertBox();
        var search = $("#txtsearchoutofstock").val();
        if (search != '')
        {
            if (BindAllNewProductImagesOutOfStockSearch(0, search) != -1)
            {
                var $mars = $('.imageholderoutofstock').masonry({
                    itemSelector: '.masonry-thumb',
                });
                $mars.imagesLoaded().progress(function () {
                    $mars.masonry('layout');
                });
         
           
           }
        }
        else {
            CustomAlert("Please Search with Product No/Name!");
        }
    });

    $(".btnsearchreviveproduct").click(function (e) {
        $('#loadmoredeletedproductdiv').hide();
          HideAlertBox();
          var search = $("#txtdeletproductsearch").val();
          if (search != '') {
              if (BindAllRevivedProductsSearch(0, search) != -1) {
                  var $mars = $('.imageholderreviveproduct').masonry({
                      itemSelector: '.masonry-thumb',
                  });
                  $mars.imagesLoaded().progress(function () {
                      $mars.masonry('layout');
                  });
              }
          }
          else {
              CustomAlert("Please Search with Product No/Name!");
          }

    });

    $('input[type=text],input[type=password],select').on('focus', function () {
       
        $(this).css({ background: 'white' });
        $('#ErrorBox').slideUp(1000);
    });
    $('textarea').on('focus', function () {
       
        $(this).css({ background: 'white' });
        $('#ErrorBox').slideUp(1000);
    });

    $(".btnRefreshnewproducts").click(function (e)
    {//
        $('#loadmorenewproductdiv').show();
        HideAlertBox();
        $("#txtsearchnewproducts").val('');//clears search text box
        if (BindAllProductImagesRebind(0) != -1)
        {
            var $mars = $('.imageholder').masonry({
                itemSelector: '.masonry-thumb',
            });
            $mars.imagesLoaded().progress(function () {
                $mars.masonry('layout');
            });
        }
       
   });

    $(".btnRefreshtrends").click(function (e) {//
        $('#loadmoretrendproductdiv').show();
        HideAlertBox();
        $("#txtsearchtrends").val('');//clears search text box
        if (BindTrendedProductImagesRebind(0) != -1)
        {
            var $mars = $('.imageholderTrends').masonry({
                itemSelector: '.masonry-thumb',
            });
            $mars.imagesLoaded().progress(function () {
                $mars.masonry('layout');
            });
        }
       
    });

    $(".btnRefreshoutofproduct").click(function (e) {//
        $('#loadmoreoutofstockproductdiv').show();
        HideAlertBox();
        $("#txtsearchoutofstock").val('');//clears search text box
        if (BindOutStockProductImagesRebind(0) != -1)
        {
            var $mars = $('.imageholderoutofstock').masonry({
                itemSelector: '.masonry-thumb',
            });
            $mars.imagesLoaded().progress(function () {
                $mars.masonry('layout');
            });
        }
       
     
    });

    $(".btnRefreshreviveproduct").click(function (e) {//
        $('#loadmoredeletedproductdiv').show();
        HideAlertBox();
        $("#txtdeletproductsearch").val('');//clears search text box
        if (BindRevivedProductImagesRebinds(0) != -1)
        {
            var $mars = $('.imageholderreviveproduct').masonry({
                itemSelector: '.masonry-thumb',
            });
            $mars.imagesLoaded().progress(function () {
                $mars.masonry('layout');
            });
        }
        
     });

     $(".ReviveProduct").click(function (e) {//
         debugger;
         HideAlertBox();
         var prodid = $("#hdfproductID").val();
         if (prodid != '')
         {
             var p = "Revive";
             DeleteCustomAlert("Are you sure?", prodid, p);//revive confirm--calls to common js
          }
});

     $("#txtsearchnewproducts").keyup(function (event) {
         if (event.keyCode == 13) {
             if ($('#txtsearchnewproducts').val() != '')
             {
                 $("#idbtnsearchnewproducts").click();
             }
            
         }
     });
    //----tag textarea------------------//
     $("#tags input").on({
         
         focusout: function () {
             var txt = this.value.replace(/[^a-z0-9\+\-\.\#]/ig, ''); // allowed characters
             if (txt) $("<span/>", { text: txt.toLowerCase(), insertBefore: this });
             this.value = "";
         },
         keypress: function (ev) {
            
             if (ev.keyCode == 13) {
               
                 // if: comma|enter (delimit more keyCodes with | pipe) 
                 if (/(188|13)/.test(ev.which)) $(this).focusout();
                 var callbacks = $.Callbacks();
                 callbacks.add(DeleteCustomAlert);
                 callbacks.disable();
                 return false;
             }
         }
     });
     $('#tags').on('click', 'span', function () {
         $(this).remove();
     });
    //----end of tag textarea------------------//
     $('.NewProductsSort').on('change', function () {
         if (BindSortResult(0, this.value) != -1) {
             var $mars = $('.imageholder').masonry(
             {
                 itemSelector: '.masonry-thumb',
             });
             $mars.imagesLoaded().progress(function () {
                 $mars.masonry('layout');
             });
             //$(".CategorySort").select2({
             //    placeholder: 'Select an option',
             //    allowClear: true
             //});
         }
     });
    
     $('.TrendingSort').on('change', function () {
         if (BindTrendingSortResult(0, this.value) != -1) {
             var $mars = $('.imageholder').masonry(
             {
                 itemSelector: '.masonry-thumb',
             });
             $mars.imagesLoaded().progress(function () {
                 $mars.masonry('layout');
             });
         }
     });
     $('.OutOfStockSort').on('change', function () {
         if (BindOutOfStockSortResult(0, this.value) != -1) {
             var $mars = $('.imageholder').masonry(
             {
                 itemSelector: '.masonry-thumb',
             });
             $mars.imagesLoaded().progress(function () {
                 $mars.masonry('layout');
             });
         }
     });
     $('.ReviveSort').on('change', function () {
         if (BindReviveSortResult(0, this.value) != -1) {
             var $mars = $('.imageholder').masonry(
             {
                 itemSelector: '.masonry-thumb',
             });
             $mars.imagesLoaded().progress(function () {
                 $mars.masonry('layout');
             });
         }
     });
     $('.CategorySort').on('change', function () {
       
            if (BindCategorySort(0, this.value) != -1) {
             var $mars = $('.imageholder').masonry(
             {
                 itemSelector: '.masonry-thumb',
             });
             $mars.imagesLoaded().progress(function () {
                 $mars.masonry('layout');
             });
             $('.NewProductsSort').val("");
            // $(".NewProductsSort").append("<option value='0' selected>Select</option>");
         }
     });
     $('.TrendingCategorySort').on('change', function () {

         if (BindTrendingCategorySort(0, this.value) != -1) {
             var $mars = $('.imageholder').masonry(
             {
                 itemSelector: '.masonry-thumb',
             });
             $mars.imagesLoaded().progress(function () {
                 $mars.masonry('layout');
             });
         }
     });
     $('.OutOfStocksCategorySort').on('change', function () {

         if (BindOutOfStocksCategorySort(0, this.value) != -1) {
             var $mars = $('.imageholder').masonry(
             {
                 itemSelector: '.masonry-thumb',
             });
             $mars.imagesLoaded().progress(function () {
                 $mars.masonry('layout');
             });
         }
     });
     $('.ReviveCategorySort').on('change', function () {

         if (BindReviveCategorySort(0, this.value) != -1) {
             var $mars = $('.imageholder').masonry(
             {
                 itemSelector: '.masonry-thumb',
             });
             $mars.imagesLoaded().progress(function () {
                 $mars.masonry('layout');
             });
         }
     });
   
    // ----------- * Binding Product Type Dropdown * -------------//
     $("#ddlProductTypes").select2({
         placeholder: "Choose Product Types",
         allowClear: true,
         data: BindProductTypes()
     });


    //------------ * Product Type Item Change Event (Will get fired for both selecting an item as well as deselecting item)  *----------//
    $('#ddlProductTypes').select2()
          .on("change", function (e) {
              debugger;
              var data = $(this).select2('data');
              var index = data.length - 1;
              var Prices = [];
              $('#tblProdctTypes tr').each(function (i, el) {
                      var $tds = $(this).find('td'),
                          Type = $tds.eq().text(),
                          Amount = $tds.eq(1).text(),
                      DiscountAmt = $tds.eq(2).text();
                  ProductTypes.push(Type + "|" + Amount + "|" + DiscountAmt);
              });


              $('#tblProdctTypes> tbody > tr').each(function ()
              {
                  debugger;
                
                  span = $(this).find('span:first');
                  var Code = "";
                  var Amount;
                  var DiscountAmount;
                  if (span[0] != undefined )
                  {
                      Code = span[0].innerText;
                  }
                  var iteration = 1;
                  $(this).find('td').each(function () {
                      debugger;
                    
                     
                      $(this).find('input').each(function ()
                      {
                          debugger;
                          if (iteration == 1) {
                              Amount = $(this).val();
                          }
                         

                          if (iteration == 2) {
                              DiscountAmount = $(this).val();
                          }

                           iteration = iteration +1;
                         
                          //Prices = [{
                          //    Code:Code,
                          //    Amt: $(this).val(),
                          //    DiscountAmt: $(this).val()
                             
                          //}];

                        });
                  })
                  if (Code != "")
                  {
                         Prices.push(
                  {
                                                   Code: Code,
                                                   Amount: Amount,
                                                   DiscountAmount: DiscountAmount
                                               }
                  );

                  }
               


                })
              debugger;
              var c = Prices;
              $('#divTypes').html('');

              var $Label = $("<label style='cursor:auto'>");
              var $Table = $("<table id ='tblProdctTypes'><tr><th>Type</th><th>Amount</th><th>Discount</th></tr>");
              
              for (var i = 0; i < data.length; i++)
              {
                  if ($("#hdfproductID").val() == "")  // New Product (Price and Discount values will get binded with base values)
                  {
                      var $Content = $("<tr><td><span style='font-size:16px!important; color:#c43a0b;' id=spanCode"+i+"><b> " + data[i].text + "</b></span></td><td><input type='number'  id='txtAmt" + i + "'  step='any' value = " + DefaultPrice + " style='float:right!important;width:70%!important;' ></td><td><input type='number' id='txtDiscountAmt" + i + "' step='any' value = " + DefaultDiscount + " onblur='DiscountValidation(" + i + ")' style='float:right!important;width:70%!important;'></td></tr>");
	                  $Table = $Table.append($Content);
                      $Label = $Label.append($Table);
                      var $html = $Label;
                      $('#divTypes').append($html);

                   }
                  else
                  {
                      //-------* Edit Product Case (no need to bind base price and discount , instead values should take from db) *------//

                      var $Content = $("<tr><td><span style='font-size:16px!important; color:#c43a0b;' id=spanCode" + i + "><b> " + data[i].text + "</b></span></td><td><input type='number'  id='txtAmt" + i + "'  step='any'  style='float:right!important;width:70%!important;' ></td><td><input type='number' id='txtDiscountAmt" + i + "' step='any' onblur='DiscountValidation(" + i + ")' style='float:right!important;width:70%!important;'></td></tr>");
                      $Table = $Table.append($Content);
                      $Label = $Label.append($Table);
                     var $html = $Label;
                  }
                 
                  $('<input>').attr({ type: 'hidden', Value: data[i].text, id: 'hdnType' + i }).appendTo($html);
                  $('<input>').attr({ type: 'hidden', Value: data[i].id, id: 'hdnTypeCode' + i }).appendTo($html); 
                  $('#divTypes').append($html);

              }



              var k = 0;

              var limit = Prices.length
              $.each(Prices, function (index, Prices) {
                  debugger;

                  k = 0;
                  for (var i = k; i <= limit; i++) {
                      var Code = $('#' + "spanCode" + i)[0].innerText;


                      if (Code == Prices.Code) {
                          //-- Amount -- //
                          Amount = "txtAmt" + i;
                          $('#' + Amount).val(Prices.Amount);

                          //-- Discount Amount -- //
                          DiscountAmt = "txtDiscountAmt" + i;
                          $('#' + DiscountAmt).val(Prices.DiscountAmount);
                          k = k + 1;
                          break;

                      }
                  }


                  //    var SpanCodeID = $('#' + "spanCode" + index);

                  //    var c = SpanCodeID[0].innerText;
                  //    if (SpanCodeID[0].innerText == ProductTypeDeatils.Description) {

                  //        //-- Amount -- //
                  //        Amount = "txtAmt" + index;
                  //        $('#' + Amount).val(ProductTypeDeatils.Amount);

                  //        //-- Discount Amount -- //
                  //        DiscountAmt = "txtDiscountAmt" + index;
                  //        $('#' + DiscountAmt).val(ProductTypeDeatils.DiscountAmount);
                  //}
              });

          })

});//end of document.ready
function FillDetails(objthis)
{
  
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();

    var imageid = $(objthis).attr('imageid');
    var p = $(objthis).attr('pname');

    if (LoginUserRole[0] != Roles.Manager) {       
        BindProductTextBoxes(objthis);
        BindAllImages();
        AutoScrollToEdit();
       }
    return false;
}
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
        //which tab should rebind
        var curtabname=$('#myTab .active').text();
        if (curtabname === ' All Products') {
            // BindAllProductImages(0);
            BindAllProductImagesRebind(0);
        }
        if (curtabname === ' Trending')
        {
            BindTrendedProductImagesRebind(0);
        }
        if (curtabname === ' Not in Stocks')
        {
            BindOutStockProductImagesRebind(0);
        }
        clearProductControls();

        $('#rowfluidDiv').show();
        $('.alert-success strong').text(Messages.DeletionSuccessFull);
        $('.alert-success').show();

        AutoScrollToAlertBox();
    }
    if (result.status != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error strong').text(Messages.DeletionFailure);
        $('.alert-error').show();
        AutoScrollToAlertBox();
    }
}

function SetDefaultPrice()
{
    DefaultPrice = $("#txtPrice").val();
}

function SetDefaultDiscount()
{
    var DiscountAmt = parseFloat($("#txtDiscount").val());
    var Amt = parseFloat($("#txtPrice").val());

    DefaultDiscount = $("#txtDiscount").val();

    if (DiscountAmt >= Amt) {
        CustomAlert("Discount amount should be less than actual price");
    }
}

function DiscountValidation(i)
{debugger
    var DiscountAmt = parseFloat( $("#txtDiscountAmt"+i).val());
    var Amt =parseFloat( $("#txtAmt"+i).val());
   
    if (DiscountAmt >= Amt)
    {
        CustomAlert("Discount amount should be less than actual price");
    }

   
}

function ReviveProducts(e,p)
{
   
    var Product = new Object();
    Product.ProductID = e;
    var result = ReviveProduct(Product);
    if (result.status == "1") {
        //which tab should rebind
          $('#rowfluidDiv').show();
          $('.alert-success').show();
          $('.alert-success strong').text(Messages.ReviveSucces);
         if (BindRevivedProductImagesRebinds(0) != -1) {
             var $mars = $('.imageholderreviveproduct').masonry({
                 itemSelector: '.masonry-thumb',
             });
             $mars.imagesLoaded().progress(function () {
                 $mars.masonry('layout');
             });
         }

        AutoScrollToAlertBox();
    }
    if (result.status != "1")
    {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').text(Messages.ReviveNotSuccess);
        AutoScrollToAlertBox();
    }
}

function BindProductTextBoxes(thisobject)
{
    var productname=$(thisobject).find(".proname").text();
    //var productname = $(thisobject).attr('pname');
   
    var pdescription = $(thisobject).find(".pdescription").text();
    //var pdescription = $(thisobject).attr('pdescription');
    var pprice = $(thisobject).attr('pprice');
    var pdiscount = $(thisobject).attr('discount');
    var isoutstock = $(thisobject).attr('isoutstock');
    var isactive = $(thisobject).attr('isactive');
    var categories = $(thisobject).attr('categories');
    var designerid = $(thisobject).attr('designers');
    var productid = $(thisobject).attr('productid');
    var productno = $(thisobject).attr('productno');
    var tags = $(thisobject).attr('tags');
    $("#editLabel").text("Edit Product");
    $("#hdfproductID").val(productid);
    $("#txtName").val(productname);
    $("#txtDescription").val(pdescription);
    $("#txtPrice").val(pprice);
    $("#txtTags").val(tags);
    if (pdiscount === "null")
    {
        $("#txtDiscount").val('');
    }
    else
    {
        $("#txtDiscount").val(pdiscount);
    }
    if (tags === "null" || tags==="undefined")
    {
        $("#txtTags").val('');
        $("#txtTags").siblings('span').remove();
    }
    else
    {
        $("#txtTags").siblings('span').remove();
        var str = tags;
        var str_array = str.split(',');
       
        for (var i = 0; i < str_array.length; i++) {
            str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
            var tcount = function () {
                var txt = str_array[i].replace(/[^a-z0-9\+\-\.\#]/ig, ''); // allowed characters
                if (txt) $("<span/>", { text: txt.toLowerCase(), insertBefore: this });
                this.value = "";

            }
            $("#txtTags").val(tcount);
        }
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
    if ($('#myTab .active').text() != ' Revive Products')
    {
        $('.ModifyProduct').show();//switches button to edit mode
        $('.DeleteProduct').show();
    }
   
    $('#IframeProjectSwitching').show();
    $('#idproductno').text(productno);
    $('#lblproductno').show();

    debugger;
    var productid = $(thisobject).attr('productid');
    var Product = new Object();
    Product.ProductID = productid;

    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/GetProductTypesByProductID");
    var table = {};
    table = JSON.parse(jsonResult.d);
    
    var ProductTypeDeatils = {};
    ProductTypeDeatils = table;

    $('#divTypes').html('');

    var TypeCodeArray = [];
   
    $.each(ProductTypeDeatils, function (index, ProductTypeDeatils)
    {
     
        TypeCodeArray.push(ProductTypeDeatils.Code);

    });

    if (TypeCodeArray.length > 0) {
        debugger;

      //  $("#ddlProductTypes").select2({ data: TypeCodeArray });


        $("#ddlProductTypes").select2().val(TypeCodeArray).trigger("change");

        //$('#ddlProductTypes option').each(function () {
        //    debugger;
        //    if (this.value != TypeCodeArray[0]) {
               
        //    }
        //});




       
    }
    else {
        $("#ddlProductTypes").select2("val", "");
    }

    $('#divTypes').html('');

    //------------------ * Create And Bind Product Types * -------------//

    var $Label = $("<label style='cursor:auto'>");
    var $Table = $("<table id ='tblProdctTypes'><tr><th>Type</th><th>Amount</th><th>Discount</th></tr>");

    $.each(ProductTypeDeatils, function (index, ProductTypeDeatils) {
      
        var $Content = $("<tr><td><span style='font-size:16px!important; color:#c43a0b;' id=spanCode" + i + "><b> " + ProductTypeDeatils.Description + "</b></span></td><td><input type='number'  id='txtAmt" + index + "'  step='any' value = " + ProductTypeDeatils.Amount + " style='float:right!important;width:70%!important;' ></td><td><input type='number' id='txtDiscountAmt" + index + "' step='any' onblur='DiscountValidation(" + index + ")' value = " + ProductTypeDeatils.DiscountAmount + " style='float:right!important;width:70%!important;'></td></tr>");
     $Table = $Table.append($Content);
     $Label = $Label.append($Table);

     var $html = $Label;
     $('#divTypes').append($html);

        $('<input>').attr({ type: 'hidden', Value: ProductTypeDeatils.Description, id: 'hdnType' + index }).appendTo($html);
        $('<input>').attr({ type: 'hidden', Value: ProductTypeDeatils.Code, id: 'hdnTypeCode' + index }).appendTo($html);
        $('#divTypes').append($html);

    });
   
    IsBindedControlsOnEdit = true;
   
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
    $("#outofstockproductgaldiv").find(".imageholderoutofstock").remove();
    var parentdiv = $("#outofstockproductgaldiv");
    var dynamicdiv = document.createElement('div');
    dynamicdiv.setAttribute("id", "productoutofstockimagehold");
    dynamicdiv.className = "imageholderoutofstock";
   
    if (totalimages.length < 1) {
       
        dynamicdiv.appendChild(BindNoProductImage());
        parentdiv.append(dynamicdiv);
        return -1;//flag value
    }
    parentdiv.append(dynamicdiv);
    var $marsoutofstock = $('.imageholderoutofstock');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {

        if (totalimages[i].Discount != null) {


            elems = elems.add(HtmlBindProductWithOffer(totalimages[i], i));
        }
        if (totalimages[i].Discount === null) {

            elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i], i));

        }
    }
    $marsoutofstock.append(elems);
    $marsoutofstock.masonry('appended', elems);
    return totalimages.length;
}
//////////////////////////////////////////////////////

function BindAllRevivedProductsSearch(Pagevalue, searchtext)
{
    var imagedivholder = $('#productreviveimagehold');
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
    totalimages = GetAllRevivedProductSearchDetails(Product);
    $("#reviveproductgaldiv").find(".imageholderreviveproduct").remove();
    var parentdiv = $("#reviveproductgaldiv");
    var dynamicdiv = document.createElement('div');
    dynamicdiv.setAttribute("id", "productreviveimagehold");
    dynamicdiv.className = "imageholderreviveproduct";
    
    if (totalimages.length < 1) {
       
        dynamicdiv.appendChild(BindNoProductImage());
        parentdiv.append(dynamicdiv);
        return -1;//flag value
    }
    parentdiv.append(dynamicdiv);
    var $marsrevive = $('.imageholderreviveproduct');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {

        if (totalimages[i].Discount != null) {


            elems = elems.add(HtmlBindProductWithOffer(totalimages[i], i));
        }
        if (totalimages[i].Discount === null) {

            elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i], i));

        }
    }
    $marsrevive.append(elems);
    $marsrevive.masonry('appended', elems);
    return totalimages.length;
}

function BindTrendingCategorySort(Pagevalue, searchtext)
{
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
    var totalimages = {};
    totalimages = GetTrendingCategorySortResult(Product);
    $("#trendingproductgaldiv").find(".imageholderTrends").remove();
    var parentdiv = $("#trendingproductgaldiv");
    var dynamicdiv = document.createElement('div');
    dynamicdiv.setAttribute("id", "productTrendsimagehold");
    dynamicdiv.className = "imageholderTrends";
    if (totalimages.length < 1) {

        dynamicdiv.appendChild(BindNoProductImage());
        parentdiv.append(dynamicdiv);
        return -1;//flag value
    }

    parentdiv.append(dynamicdiv);
    var $mars = $('.imageholderTrends');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
                elems = elems.add(HtmlBindProductWithOffer(totalimages[i], i));
            }
        }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i], i));
            }
        }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {

                elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i], i));
            }
            if (totalimages[i].Discount == null) {

                elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i], i));
            }
        }
    }
    $mars.append(elems);
    $mars.masonry('appended', elems);
    return totalimages.length;
}

function BindOutOfStocksCategorySort(Pagevalue, searchtext)
{
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
    var totalimages = {};
    totalimages = GetOutOfStocksCategorySortResult(Product);
    $("#outofstockproductgaldiv").find(".imageholderoutofstock").remove();
    var parentdiv = $("#outofstockproductgaldiv");
    var dynamicdiv = document.createElement('div');
    dynamicdiv.setAttribute("id", "productoutofstockimagehold");
    dynamicdiv.className = "imageholderoutofstock";
    if (totalimages.length < 1) {

        dynamicdiv.appendChild(BindNoProductImage());
        parentdiv.append(dynamicdiv);
        return -1;//flag value
    }

    parentdiv.append(dynamicdiv);
    var $mars = $('.imageholderoutofstock');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
                elems = elems.add(HtmlBindProductWithOffer(totalimages[i], i));
            }
        }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i], i));
            }
        }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {

                elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i], i));
            }
            if (totalimages[i].Discount == null) {

                elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i], i));
            }
        }
    }
    $mars.append(elems);
    $mars.masonry('appended', elems);
    return totalimages.length;
}

function BindReviveCategorySort(Pagevalue, searchtext)
{
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
    var totalimages = {};
    totalimages = GetReviveCategorySortResult(Product);
    $("#reviveproductgaldiv").find(".imageholderreviveproduct").remove();
    var parentdiv = $("#reviveproductgaldiv");
    var dynamicdiv = document.createElement('div');
    dynamicdiv.setAttribute("id", "productreviveimagehold");
    dynamicdiv.className = "imageholderreviveproduct";
    if (totalimages.length < 1) {

        dynamicdiv.appendChild(BindNoProductImage());
        parentdiv.append(dynamicdiv);
        return -1;//flag value
    }

    parentdiv.append(dynamicdiv);
    var $mars = $('.imageholderreviveproduct');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
                elems = elems.add(HtmlBindProductWithOffer(totalimages[i], i));
            }
        }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i], i));
            }
        }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {

                elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i], i));
            }
            if (totalimages[i].Discount == null) {

                elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i], i));
            }
        }
    }
    $mars.append(elems);
    $mars.masonry('appended', elems);
    return totalimages.length;
}

function BindCategorySort(Pagevalue, searchtext)
{
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
    var totalimages = {};
    totalimages = GetCategorySortResult(Product);
    $("#newproductgaldiv").find(".imageholder").remove();
    var parentdiv = $("#newproductgaldiv");
    var dynamicdiv = document.createElement('div');
    dynamicdiv.setAttribute("id", "productimagehold");
    dynamicdiv.className = "imageholder";
    if (totalimages.length < 1) {

        dynamicdiv.appendChild(BindNoProductImage());
        parentdiv.append(dynamicdiv);
        return -1;//flag value
    }

    parentdiv.append(dynamicdiv);
    var $mars = $('.imageholder');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
                elems = elems.add(HtmlBindProductWithOffer(totalimages[i], i));
            }
        }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i], i));
            }
        }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {

                elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i], i));
            }
            if (totalimages[i].Discount == null) {

                elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i], i));
            }
        }
    }
    $mars.append(elems);
    $mars.masonry('appended', elems);
    return totalimages.length;
}

function BindReviveSortResult(Pagevalue, searchtext)
{
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
    var totalimages = {};
    totalimages = GetReviveSortResult(Product);
    $("#reviveproductgaldiv").find(".imageholderreviveproduct").remove();
    var parentdiv = $("#reviveproductgaldiv");
    var dynamicdiv = document.createElement('div');
    dynamicdiv.setAttribute("id", "productreviveimagehold");
    dynamicdiv.className = "imageholderreviveproduct";
    if (totalimages.length < 1) {

        dynamicdiv.appendChild(BindNoProductImage());
        parentdiv.append(dynamicdiv);
        return -1;//flag value
    }

    parentdiv.append(dynamicdiv);
    var $mars = $('.imageholderreviveproduct');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
                elems = elems.add(HtmlBindProductWithOffer(totalimages[i], i));
            }
        }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i], i));
            }
        }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {

                elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i], i));
            }
            if (totalimages[i].Discount == null) {

                elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i], i));
            }
        }
    }
    $mars.append(elems);
    $mars.masonry('appended', elems);
    return totalimages.length;
}

function BindOutOfStockSortResult(Pagevalue, searchtext)
{
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
    var totalimages = {};
    totalimages = GetOutOfStockSortResult(Product);
    $("#outofstockproductgaldiv").find(".imageholderoutofstock").remove();
    var parentdiv = $("#outofstockproductgaldiv");
    var dynamicdiv = document.createElement('div');
    dynamicdiv.setAttribute("id", "productoutofstockimagehold");
    dynamicdiv.className = "imageholderoutofstock";
    if (totalimages.length < 1) {

        dynamicdiv.appendChild(BindNoProductImage());
        parentdiv.append(dynamicdiv);
        return -1;//flag value
    }

    parentdiv.append(dynamicdiv);
    var $mars = $('.imageholderoutofstock');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
                elems = elems.add(HtmlBindProductWithOffer(totalimages[i],i));
            }
        }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i],i));
            }
        }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {

                elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i],i));
            }
            if (totalimages[i].Discount == null) {

                elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i],i));
            }
        }
    }
    $mars.append(elems);
    $mars.masonry('appended', elems);
    return totalimages.length;
}

function BindTrendingSortResult(Pagevalue, searchtext)
{
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
    var totalimages = {};
    totalimages = GetTrendsSortResult(Product);
    $("#trendingproductgaldiv").find(".imageholderTrends").remove();
    var parentdiv = $("#trendingproductgaldiv");
    var dynamicdiv = document.createElement('div');
    dynamicdiv.setAttribute("id", "productTrendsimagehold");
    dynamicdiv.className = "imageholderTrends";
    if (totalimages.length < 1) {

        dynamicdiv.appendChild(BindNoProductImage());
        parentdiv.append(dynamicdiv);
        return -1;//flag value
    }

    parentdiv.append(dynamicdiv);
    var $mars = $('.imageholderTrends');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
                elems = elems.add(HtmlBindProductWithOffer(totalimages[i],i));
            }
        }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i],i));
            }
        }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {

                elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i],i));
            }
            if (totalimages[i].Discount == null) {

                elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i],i));
            }
        }
    }
    $mars.append(elems);
    $mars.masonry('appended', elems);
    return totalimages.length;
}

function BindSortResult(Pagevalue, searchtext)
{
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
    var totalimages = {};
    totalimages = GetSortResult(Product);
    $("#newproductgaldiv").find(".imageholder").remove();
    var parentdiv = $("#newproductgaldiv");
    var dynamicdiv = document.createElement('div');
    dynamicdiv.setAttribute("id", "productimagehold");
    dynamicdiv.className = "imageholder";
    if (totalimages.length < 1) {

        dynamicdiv.appendChild(BindNoProductImage());
        parentdiv.append(dynamicdiv);
        return -1;//flag value
    }

    parentdiv.append(dynamicdiv);
    var $mars = $('.imageholder');
    var elems = $();
    for (var i = 0; i < totalimages.length; i++) {
        if (totalimages[i].Discount != null) {
            if (totalimages[i].IsOutOfStock == false) {
                elems = elems.add(HtmlBindProductWithOffer(totalimages[i],i));
            }
        }
        if (totalimages[i].Discount === null) {
            if (totalimages[i].IsOutOfStock == false) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i],i));
            }
        }
        if (totalimages[i].IsOutOfStock == true) {
            if (totalimages[i].Discount != null) {

                elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i],i));
            }
            if (totalimages[i].Discount == null) {

                elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i],i));
            }
        }
    }
    $mars.append(elems);
    $mars.masonry('appended', elems);
    return totalimages.length;
}

    function BindAllNewProductImagesSearch(Pagevalue, searchtext) {//*************************************
    
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
        $("#newproductgaldiv").find(".imageholder").remove();
        var parentdiv = $("#newproductgaldiv");
        var dynamicdiv = document.createElement('div');
        dynamicdiv.setAttribute("id", "productimagehold");
        dynamicdiv.className = "imageholder";
        if (totalimages.length < 1) {
       
            dynamicdiv.appendChild(BindNoProductImage());
            parentdiv.append(dynamicdiv);
            return -1;//flag value
        }

        parentdiv.append(dynamicdiv);
        var $mars = $('.imageholder');
        var elems = $();
        for (var i = 0; i < totalimages.length; i++) {
            if (totalimages[i].Discount != null) {
                if (totalimages[i].IsOutOfStock == false) {
                    elems = elems.add(HtmlBindProductWithOffer(totalimages[i],i));
                }
            }
            if (totalimages[i].Discount === null) {
                if (totalimages[i].IsOutOfStock == false) {

                    elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i],i));
                }
            }
            if (totalimages[i].IsOutOfStock == true) {
                if (totalimages[i].Discount != null) {

                    elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i]),i);
                }
                if (totalimages[i].Discount == null) {

                    elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i],i));
                }
            }
        }
        $mars.append(elems);
        $mars.masonry('appended', elems);
        return totalimages.length;
    }

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
        $("#trendingproductgaldiv").find(".imageholderTrends").remove();
        var parentdiv = $("#trendingproductgaldiv");

        var dynamicdiv = document.createElement('div');
        dynamicdiv.setAttribute("id", "productTrendsimagehold");
        dynamicdiv.className = "imageholderTrends";

        if (totalimages.length < 1) {
            dynamicdiv.appendChild(BindNoProductImage());
            parentdiv.append(dynamicdiv);
            return -1;//flag value
        }
        parentdiv.append(dynamicdiv);
        var $marstrends = $('.imageholderTrends');
        var elems = $();
        for (var i = 0; i < totalimages.length; i++) {
            if (totalimages[i].Discount != null) {
                if (totalimages[i].IsOutOfStock == false) {


                    elems = elems.add(HtmlBindProductWithOffer(totalimages[i],i));
                }
            }
            if (totalimages[i].Discount === null) {
                if (totalimages[i].IsOutOfStock == false) {

                    elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i],i));

                }
            }
            if (totalimages[i].IsOutOfStock == true) {
                if (totalimages[i].Discount != null) {

                    elems = elems.add(HtmlBindProductOutOfStockWithOffer(totalimages[i],i));
                }
                if (totalimages[i].Discount == null) {

                    elems = elems.add(HtmlBindProductOutOfStockWithoutOffer(totalimages[i],i));
                }
            }

        }
        $marstrends.append(elems);
        $marstrends.masonry('appended', elems);
        return totalimages.length;
    }

    function BindNoProductImage()
    {
        var div = document.createElement("div");
        div.setAttribute("class", "noproductdiv");
        img1 = document.createElement('img');
        img1.src = "../img/noproduct.gif";
        img1.className = "noproductgif";
        div.appendChild(img1);
        return div;
    }

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


                elems = elems.add(HtmlBindProductWithOffer(totalimages[i],i));
            }
            if (totalimages[i].Discount === null) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i],i));

            }
        }
        $marsoutofstock.append(elems);
        $marsoutofstock.masonry('appended', elems);
        return totalimages.length;
    }

    function BindAllProductImagesOutOfStock(Pagevalue) {
  
        var imagedivholder = $('#productoutofstockimagehold');
        var Product = new Object();
        if (Pagevalue != undefined){
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
                imagedivholder.append(HtmlBindProductWithOffer(totalimages[i],i));
            } 
            if (totalimages[i].Discount === null) {
                imagedivholder.append(HtmlBindProductWithoutOffer(totalimages[i],i));
            }

        }
    }


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
                      
                    imagedivholder.append(HtmlBindProductWithOffer(totalimages[i],i));
                }

            }
            if (totalimages[i].Discount === null) {
                if (totalimages[i].IsOutOfStock == false) {
     
                    imagedivholder.append(HtmlBindProductWithoutOffer(totalimages[i],i));
                }


            }
            if (totalimages[i].IsOutOfStock == true) {
                if (totalimages[i].Discount != null) {
    

                    imagedivholder.append(HtmlBindProductOutOfStockWithOffer(totalimages[i],i));
                }
                if (totalimages[i].Discount == null) {
             
                    imagedivholder.append(HtmlBindProductOutOfStockWithoutOffer(totalimages[i],i));
                }

            }
        }
    }


    function HtmlBindProductWithOffer(totalimages,i)
    {
        var html = ('<div class="masonry-thumb port-1 effect-2">'
          + ''
          + '<div class="image-box"><img class="sticker" src="../img/offersticker/offer.png"/><img id="img' +i + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' +totalimages.ImageID + '"></img></div>'
          + '<div class="productDetailsdiv text-desc">'
          + '<a class="btn btn-toolbar" style="border:1px solid white" onclick="FillDetails(this);" productno=' + totalimages.ProductNo + '  productid=' + totalimages.ProductID + ' imageid=' + totalimages.ImageID + ' pname=' + totalimages.Name +' tags='+totalimages.Tags+ ' pprice=' + totalimages.Price + ' isoutstock=' + totalimages.IsOutOfStock + ' isactive=' + totalimages.IsActive + ' categories=' + totalimages.Categories + ' designers=' + totalimages.DesignerID + ' designerName=' + totalimages.DesignerName + ' discount=' + totalimages.Discount + '><i class="halflings-icon white edit"></i><span class="proname" style="display:none;">' + totalimages.Name + '</span><span class="pdescription" style="display:none;">' + totalimages.Description + '</span></a>'
          + '<a class="btn btn-toolbar" style="border:1px solid white" href="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages.ImageID + '" data-lightbox="' + totalimages.ImageID + '" data-title="' + totalimages.Name + '" ><i class="icon-zoom-in"></i></a>'
          + '<div class="prodet"><span>Code:  </span><span>' + totalimages.ProductNo + '</span></div><div class="prodet"><span>Name:  </span><span class="proname">' + totalimages.Name + '</span></div><div class="prodet"><span>Price:  ₹  ' + totalimages.Price + '</span></div><div class="prodet><span>Discount:  ₹ ' + totalimages.Discount + '</span></span></div><span class="pdescription" style="display:none;">' + totalimages.Description + '</span></div>'
          + '</div>');
        return html;
    }
    function HtmlBindProductWithoutOffer(totalimages,i)
    {
        var html = ('<div class="masonry-thumb port-1 effect-2" >'
                 + ''
                 + '<div class="image-box"><img id="img' + i + '" class="productimage" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages.ImageID + '"></img></div>'
                 + '<div class="productDetailsdiv text-desc">'
                 + '<a class="btn btn-toolbar" style="border:1px solid white" onclick="FillDetails(this);" productno=' + totalimages.ProductNo + '  productid=' + totalimages.ProductID + ' imageid=' + totalimages.ImageID + ' pname=' + totalimages.Name + ' tags=' + totalimages.Tags + ' pprice=' + totalimages.Price + ' isoutstock=' + totalimages.IsOutOfStock + ' isactive=' + totalimages.IsActive + ' categories=' + totalimages.Categories + ' designers=' + totalimages.DesignerID + ' designerName=' + totalimages.DesignerName + ' discount=' + totalimages.Discount + '><i class="halflings-icon white edit"></i><span class="proname" style="display:none;">' + totalimages.Name + '</span><span class="pdescription" style="display:none;">' + totalimages.Description + '</span></a>'
                 + '<a class="btn btn-toolbar" style="border:1px solid white" href="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages.ImageID + '" data-lightbox="' + totalimages.ImageID + '" data-title="' + totalimages.Name + '"><i class="icon-zoom-in"></i></a>'           
                 +'<div class="prodet"><span>Code:  </span><span>' + totalimages.ProductNo + '</span></div><div class="prodet"><span>Name:  </span><span class="proname">' + totalimages.Name + '</span></div><div class="prodet"><span>Price:  ₹  ' + totalimages.Price + '</span></div><div class="prodet><span>Discount:  ₹ ' + totalimages.Discount + '</span></span></div><span class="pdescription" style="display:none;">' + totalimages.Description + '</span></div>'           
                 + '</div>');
        return html;
    }
    function HtmlBindProductOutOfStockWithOffer(totalimages,i)
    {
        var html = ('<div class="masonry-thumb" productno=' + totalimages.ProductNo + ' productid=' + totalimages.ProductID + ' imageid=' + totalimages.ImageID + ' pname=' + totalimages.Name + ' tags=' + totalimages.Tags + ' pprice=' + totalimages.Price + ' isoutstock=' + totalimages.IsOutOfStock + ' isactive=' + totalimages.IsActive + ' categories=' + totalimages.Categories + ' designers=' + totalimages.DesignerID + ' designerName=' + totalimages.DesignerName + ' discount=' + totalimages.Discount + '>'
           + '<div class="image-box"><img class="sticker" src="../img/offersticker/offer.png"/><img id="img' + i + '" class="productimage" style="opacity:0.3!important" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages.ImageID + '"></img></div>'
           + '<a href="#" class="outstock">out of stock</a><div class="productDetailsdiv text-desc"><a class="btn btn-info Edit"><i class="halflings-icon white edit"></i></a><div class="prodet"><span>Code:  </span><span>' + totalimages.ProductNo + '</span></div><div class="prodet"><span>Name:  </span><span class="proname">' + totalimages.Name + '</span></div><div class="prodet"><span>Price:  ₹  ' + totalimages.Price + '</span></div><div class="prodet><span>Discount:  ₹ ' + totalimages.Discount + '</span></span></div><span class="pdescription" style="display:none;">' + totalimages.Description + '</span></div></a>'
           + '</div>');
        return html;

    }
    function HtmlBindProductOutOfStockWithoutOffer(totalimages,i)
    {
        var html = ('<div class="masonry-thumb" productno=' + totalimages.ProductNo + '  productid=' + totalimages.ProductID + ' imageid=' + totalimages.ImageID + ' pname=' + totalimages.Name + ' tags=' + totalimages.Tags + ' pprice=' + totalimages.Price + ' isoutstock=' + totalimages.IsOutOfStock + ' isactive=' + totalimages.IsActive + ' categories=' + totalimages.Categories + ' designers=' + totalimages.DesignerID + ' designerName=' + totalimages.DesignerName + ' discount=' + totalimages.Discount + '>'
               + '<div class="image-box"><img id="img' +i + '" class="productimage" style="opacity:0.3!important" src="../ImageHandler/ImageServiceHandler.ashx?ImageID=' + totalimages.ImageID + '"></img></div>'
               + '<a href="#" class="outstock">out of stock</a><div class="productDetailsdiv text-desc"><a class="btn btn-info Edit"><i class="halflings-icon white edit"></i></a><div class="prodet"><span>Code:  </span><span>' + totalimages.ProductNo + '</span></div><div class="prodet"><span>Name:  </span><span class="proname">' + totalimages.Name + '</span></div><div class="prodet"><span>Price:  ₹  ' + totalimages.Price + '</span></div><div class="prodet><span>Discount:  ₹ ' + totalimages.Discount + '</span></span></div><span class="pdescription" style="display:none;">' + totalimages.Description + '</span></div></a>'
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
            $.each(imageids, function (index, Records){
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
        //var alink = document.createElement('a');
        //alink.onclick = 'DeleteImage(this);';
        //alink.setAttribute("onclick", "DeleteImage(" + this + ")");
        // del.appendChild(del);
        div.appendChild(del);
        if (Records.IsMain === true) {
            //  chk.checked = true;
            chk.setAttribute("checked", "checked");
            del.style.visibility = 'hidden';
        }
    
  
        divPre.appendChild(div);
        div.appendChild(chk);
    }

    function DeleteImage(evt)
    {
        alert(":D");
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

    function BindProductTypes() {
        var jsonResult = {};
        var Product = new Object();
        jsonResult = GetAllProductTypes(Product);
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
    function GetCategorySortResult(Product)
    {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetCategorySortDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    function GetTrendingCategorySortResult(Product)
    {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetTrendingCategorySortDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    function GetOutOfStocksCategorySortResult(Product)
    {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetOutOfStocksCategorySortDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    function GetReviveCategorySortResult(Product)
    {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetReviveCategorySortDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    function GetSortResult(Product)
    {
      
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetSortDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    function GetReviveSortResult(Product) {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetReviveSortDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    function GetOutOfStockSortResult(Product)
    {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetOutOfStockSortDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    function GetTrendsSortResult(Product)
    {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetTrendsSortDetails");
        table = JSON.parse(ds.d);
        return table;
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

    function GetAllRevivedProductSearchDetails(Product) {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllRevivedProductDetailsBySearch");
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

    function GetAllDeletedProductsDetails(Product)
    {   var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllDeletedProductDetails");
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
    function GetAllProductTypes(Product) {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllProductTypeIDandName");
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
    function InsertProductType(Product) {
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/InsertProductType");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }

    function UpdateProductTypeDetails(Product) {
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/UpdateProductTypeDetails");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }



    function UpdateProduct(Product) {
        debugger;
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


    function ReviveProduct(Product) {
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/ReviveProduct");
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
        $("#txtTags").val('');
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
        $('#lblproductno').hide();
        $("#txtTags").siblings('span').remove();
    
        //--- Clear product type controls
        ProductTypes = [];
        ProctPrices = [];
        $('#divTypes').html('');
        $("#ddlProductTypes").select2("val", "");
        DefaultPrice = '';
        DefaultDiscount = '';
    }


    function BindAllProductImagesRebind(Pagevalue) {//where div is removed and recreated
    
        //  var imagedivholder = $('#productimagehold');
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
        $("#newproductgaldiv").find(".imageholder").remove();
        var parentdiv = $("#newproductgaldiv");

        var dynamicdiv = document.createElement('div');
        dynamicdiv.setAttribute("id", "productimagehold");
        dynamicdiv.className = "imageholder";

        if (totalimages.length < 1) {

            dynamicdiv.appendChild(BindNoProductImage());
            parentdiv.append(dynamicdiv);
            return -1;//flag value
        }
        parentdiv.append(dynamicdiv);


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

    function BindAllProductImagesForEventLoadBasedOnCateory(Pagevalue, searchtext) {
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
        totalimages = GetCategorySortResult(Product);

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

    function BindAllSortedProductImagesForEventLoad(Pagevalue, searchtext) {
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
        totalimages = GetSortResult(Product);

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

    function BindOutStockProductImagesRebind(Pagevalue)
    {
   
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


        $("#outofstockproductgaldiv").find(".imageholderoutofstock").remove();
        var parentdiv = $("#outofstockproductgaldiv");
        var dynamicdiv = document.createElement('div');
        dynamicdiv.setAttribute("id", "productoutofstockimagehold");
        dynamicdiv.className = "imageholderoutofstock";

        if (totalimages.length < 1) {

            dynamicdiv.appendChild(BindNoProductImage());
            parentdiv.append(dynamicdiv);
            return -1;//flag value
        }
        parentdiv.append(dynamicdiv);


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

    function BindOutStockProductImagesForEventLoadBasedOnCategorySort(Pagevalue, searchtext)
    {
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
        totalimages = GetOutOfStocksCategorySortResult(Product);
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

    function BindReviveProductImagesForEventLoad(Pagevalue) {


        var Product = new Object();
        if (Pagevalue != undefined) {
            Product.Paginationvalue = Pagevalue;
        }
        else {
            Product.Paginationvalue = "";
        }

        //inserts from code behind
        var totalimages = {};
        totalimages = GetAllDeletedProductsDetails(Product);
        var $marsrevive = $('.imageholderreviveproduct');
        var elems = $();
        for (var i = 0; i < totalimages.length; i++) {
            if (totalimages[i].Discount != null) {


                elems = elems.add(HtmlBindProductWithOffer(totalimages[i]));
            }
            if (totalimages[i].Discount === null) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i]));

            }
        }
        $marsrevive.append(elems);
        $marsrevive.masonry('appended', elems);
        return totalimages.length;
    }

    function BindReviveProductImagesForEventLoadBasedOnCategorySort(Pagevalue, searchtext)
    {
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
        totalimages = GetReviveCategorySortResult(Product);
        var $marsrevive = $('.imageholderreviveproduct');
        var elems = $();
        for (var i = 0; i < totalimages.length; i++) {
            if (totalimages[i].Discount != null) {


                elems = elems.add(HtmlBindProductWithOffer(totalimages[i]));
            }
            if (totalimages[i].Discount === null) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i]));

            }
        }
        $marsrevive.append(elems);
        $marsrevive.masonry('appended', elems);
        return totalimages.length;
    }

    function BindSortedReviveProductImagesForEventLoad(Pagevalue, searchtext)
    {
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
        totalimages = GetReviveSortResult(Product);
        var $marsrevive = $('.imageholderreviveproduct');
        var elems = $();
        for (var i = 0; i < totalimages.length; i++) {
            if (totalimages[i].Discount != null) {


                elems = elems.add(HtmlBindProductWithOffer(totalimages[i]));
            }
            if (totalimages[i].Discount === null) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i]));

            }
        }
        $marsrevive.append(elems);
        $marsrevive.masonry('appended', elems);
        return totalimages.length;
    }

    //Revived product bind
    function BindRevivedProductImagesRebinds(Pagevalue)
    {
        var Product = new Object();
        if (Pagevalue != undefined) {
            Product.Paginationvalue = Pagevalue;
        }
        else {
            Product.Paginationvalue = "";
        }

        //inserts from code behind
        var totalimages = {};
        totalimages = GetAllDeletedProductsDetails(Product);

        $("#reviveproductgaldiv").find(".imageholderreviveproduct").remove();
        var parentdiv = $("#reviveproductgaldiv");

        var dynamicdiv = document.createElement('div');
        dynamicdiv.setAttribute("id", "productreviveimagehold");
        dynamicdiv.className = "imageholderreviveproduct";
        if (totalimages.length < 1) {

            dynamicdiv.appendChild(BindNoProductImage());
            parentdiv.append(dynamicdiv);
            return -1;//flag value
        }
        parentdiv.append(dynamicdiv);
        var $marsrevive = $('.imageholderreviveproduct');
        var elems = $();
        for (var i = 0; i < totalimages.length; i++) {
            if (totalimages[i].Discount != null) {


                elems = elems.add(HtmlBindProductWithOffer(totalimages[i]));
            }
            if (totalimages[i].Discount === null) {

                elems = elems.add(HtmlBindProductWithoutOffer(totalimages[i]));

            }
   
        }
        $marsrevive.append(elems);
        $marsrevive.masonry('appended', elems);
        return totalimages.length;
    }

    function BindTrendedProductImagesRebind(Pagevalue)
    {
   
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

        $("#trendingproductgaldiv").find(".imageholderTrends").remove();
        var parentdiv = $("#trendingproductgaldiv");

        var dynamicdiv = document.createElement('div');
        dynamicdiv.setAttribute("id", "productTrendsimagehold");
        dynamicdiv.className = "imageholderTrends";
        if (totalimages.length < 1) {

            dynamicdiv.appendChild(BindNoProductImage());
            parentdiv.append(dynamicdiv);
            return -1;//flag value
        }
        parentdiv.append(dynamicdiv);





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


    ////
    ////Trend Images
///
    function BindSortedTrendingProductImagesForEventLoad(Pagevalue, searchtext)
    {
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
        totalimages = GetTrendsSortResult(Product);
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
    function BindSortedTrendingProductImagesForEventLoad(Pagevalue, searchtext)
    {
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
        totalimages = GetTrendsSortResult(Product);
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
    function BindTrendingProductImagesForEventLoadBasedOnCateory(Pagevalue, searchtext)
    {
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
        totalimages = GetTrendingCategorySortResult(Product);
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


    function GetTotalProductCount(Product)
    {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Products.aspx/GetAllRowsCount");
        table = JSON.parse(ds.d);
        return table;
    }


    function AddProductTypestoArray()
    {
        ProductTypes = [];

        for (var i = 0; i < tblProdctTypes.length; i++) {
            debugger;

            Type = "hdnType" + i;
            Type = $('#' + Type).val();

            TypeCode = "hdnTypeCode" + i;
            TypeCode = $('#' + TypeCode).val();

            Amount = "txtAmt" + i;
            Amount = $('#' + Amount).val();

            DiscountAmt = "txtDiscountAmt" + i;
            DiscountAmt = $('#' + DiscountAmt).val();

            

            ProductTypes.push(Type + "|" +TypeCode+"|"+ Amount + "|" + DiscountAmt);
        }
    }


    function ProductValidation() {

      
      //  AddProductTypestoArray();
        //$('#tblProdctTypes tr').each(function () {
        //    $(this).find('td').each(function () {
                
        //    })
        //})

        //$('#tblProdctTypes tr').each(function (i, el) {
        //    var $tds = $(this).find('td'),
        //        Type = $tds.eq(0).text(),
        //        Amount = $tds.eq(1).text(),
        //        DiscountAmt = $tds.eq(2).text();
        //    ProductTypes.push(Type + "|" + Amount + "|" + DiscountAmt);
        //});

        
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
        debugger;
        var Product = new Object();
        Product.Name = $("#txtName").val();
        Product.Description = $("#txtDescription").val();
        Product.Price = $("#txtPrice").val();
        Product.Discount = $("#txtDiscount").val();
        Product.Tags = $("#txtTags").val();
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

        if (Product.Discount >= Product.Price)
        {
            CustomAlert("Discount amount should be less than actual price");
        }
        else {
            result = InsertProduct(Product);
        }
       
        debugger;

        if (result != "") {

            debugger;
            if (result.status == "1") {
                //ProductTypes
                //---------- * Rebinding Related Products Dropdown * ------------//

                $(".ddlrelateproducts").select2('data', null);

                $(".ddlrelateproducts").select2({
                    placeholder: "Choose Related Products",
                    allowClear: true,
                    data: BindAsyncRelatedProducts()//Related products dropdown binds only with id and text[key:value] mandatory
                });
          
            
            
                $("#hdfproductID").val(result.ProductID);
                $('#rowfluidDiv').show();
                $('.alert-success strong').text(Messages.InsertionSuccessFull);
                $('.alert-success').show();
                $('.ModifyProduct').show();//displays editsave button
                $('.AddProduct').hide();//hides save
                $('#IframeProjectSwitching').show();
                // Scroll page
                // AutoScrollToAlertBox();
                debugger;
                ProductTypes = [];
                var Product = new Object();

                Product.ProductID = result.ProductID;

                tblProdctTypes = $("#tblProdctTypes tr");

              

                for (var i = 0; i < tblProdctTypes.length; i++) {
                    debugger;

                    //-- Description --//
                    Type = "hdnType" + i;
                    Type = $('#' + Type).val();
                    Product.ProductTypeDescription = Type;

                    //-- Code --//
                    TypeCode = "hdnTypeCode" + i;
                    TypeCode = $('#' + TypeCode).val();
                    Product.ProductTypeCode = TypeCode;
                
                    //-- Amount -- //
                    Amount = "txtAmt" + i;
                    Amount = $('#' + Amount).val();
                    Product.ProductTypeAmount = Amount;

                    //-- Discount Amount -- //
                    DiscountAmt = "txtDiscountAmt" + i;
                    DiscountAmt = $('#' + DiscountAmt).val();
                    Product.ProductTypeDiscountAmount = DiscountAmt;
                    
                    if (parseFloat(DiscountAmt) >=parseFloat( Amount)) {
                        CustomAlert("Discount amount should be less than actual price");
                    }
                    else if (Amount == "") {
                        CustomAlert("Please enter a Amount");
                    }
                    //else if (DiscountAmt == "") {
                    //    CustomAlert("Please enter a Discount Amount");
                    //}
                    else
                    {
                        ProductTypes.push(Type + "|" + TypeCode + "|" + Amount + "|" + DiscountAmt);
                        InsertProductType(Product);

                    }
               
                }

            }
        }

        if (result != "") {
    
        
        if (result.status != "1" ) {
            $('#rowfluidDiv').show();
            $('.alert-error strong').text(Messages.InsertionFailure);
            $('.alert-error').show();
            // Scroll page
            AutoScrollToAlertBox();

        }
    }
        return false;
    }
    function EditProduct()
    {
        
        if ($("#hdfproductID").val() != '') {
            var lines = [];
            var Product = new Object();
            Product.ProductID = $("#hdfproductID").val();

            Product.Name = $("#txtName").val();
            Product.Description = $("#txtDescription").val();
            Product.Price = $("#txtPrice").val();
            Product.Discount = $("#txtDiscount").val();
            $('#tags span').each(function () {
                //  tags.push($(this).text()) + " ";
                var split = $(this).text().split('\n');
           
                for (var i = 0; i < split.length; i++)
                    if (split[i]) lines.push(split[i]);
          
            
            });

       


            Product.Tags =lines.toString();
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
                var idval = $(this).attr('id');
                ImageInfo.push(idval);
                $(this).find("input:checkbox").each(function () {
                    if ($(this).attr('checked'))
                    {
                        Product.MainImageID = $(this).parent().attr("id");                  
                    }
                });
            });
            Product.ImageInfo = ImageInfo;
            //productimage id and order number

            debugger;

            result = UpdateProduct(Product);
            if (result.status == "1") {

               
                if (BindAllProductImagesRebind(0) != -1) {

                    var galerydiv = $('.imageholder');
                    var $mars = $('.imageholder').masonry(
                            {

                                itemSelector: '.masonry-thumb',

                            });
                    // galerydiv.hide();
                    $mars.imagesLoaded().progress(function () {
                        $mars.masonry('layout');
                    });
                }
                // Scroll page
                AutoScrollToAlertBox();

                BindAllImages();

                //---------- * Rebinding Related Products Dropdown * ------------//

                $(".ddlrelateproducts").select2('data', null);

                $(".ddlrelateproducts").select2({
                    placeholder: "Choose Related Products",
                    allowClear: true,
                    data: BindAsyncRelatedProducts()//Related products dropdown binds only with id and text[key:value] mandatory
                });


                ProductTypes = [];
                var Product = new Object();

                Product.ProductID = $("#hdfproductID").val();
                tblProdctTypes = $("#tblProdctTypes tr");

                if (tblProdctTypes.length == 0)
                {

                    $('#rowfluidDiv').show();
                    $('.alert-success strong').text(Messages.UpdationSuccessFull);
                    $('.alert-success').show();
                    $("#editLabel").text("Edit Product");


                }

                var Product = new Object();

                Product.ProductID = $("#hdfproductID").val();
                var data = "{'productObj':" + JSON.stringify(Product) + "}";
                jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/GetProductTypesByProductID");
                var table = {};
                table = JSON.parse(jsonResult.d);
                var TypeCodes = [];

                //$.each(table, function (index, table) {
                //    if ($.inArray(table.Code, tblProdctTypes) == -1) {

                //        alert($.inArray(table.Code, tblProdctTypes));
                //    }

                //});


                for (var i = 0; i < tblProdctTypes.length; i++) {
                    debugger;

                    //-- Description --//
                    Type = "hdnType" + i;
                    Type = $('#' + Type).val();
                    Product.ProductTypeDescription = Type;

                    //-- Code --//
                    TypeCode = "hdnTypeCode" + i;
                    TypeCode = $('#' + TypeCode).val();
                    Product.ProductTypeCode = TypeCode;
                    TypeCodes.push(TypeCode);


                    //-- Amount -- //
                    Amount = "txtAmt" + i;
                    Amount = $('#' + Amount).val();
                    Product.ProductTypeAmount = Amount;

                    //-- Discount Amount -- //
                    DiscountAmt = "txtDiscountAmt" + i;
                    DiscountAmt = $('#' + DiscountAmt).val();
                    Product.ProductTypeDiscountAmount = DiscountAmt;

                    if (parseFloat(DiscountAmt) >= parseFloat(Amount))
                    {
                        CustomAlert("Discount amount should be less than actual price");
                    }
                   
                    else if (Amount == "") {
                        CustomAlert("Please enter a Amount");
                    }
                    //else if (DiscountAmt == "") {
                    //    CustomAlert("Please enter a Discount Amount");
                    //}


                    else
                    {
                        ProductTypes.push(Type + "|" + TypeCode + "|" + Amount + "|" + DiscountAmt);


                        UpdateProductTypeDetails(Product);

                        $('#rowfluidDiv').show();
                        $('.alert-success strong').text(Messages.UpdationSuccessFull);
                        $('.alert-success').show();
                        $("#editLabel").text("Edit Product");


                    }

                 
                    


                    //var ProductTypeDeatils = {};
                    //ProductTypeDeatils = table;
                    //debugger;


                    //$.each(ProductTypeDeatils, function (index, ProductTypeDeatils) {

                    //    debugger;

                    //    if (index == i) {
    
                    //    var a = ProductTypeDeatils.ProductID;
                    //    var b = Product.ProductID;

                    //    var c = parseFloat(ProductTypeDeatils.Code);
                    //    var d = parseFloat(Product.ProductTypeCode);

                    //    debugger;
                    //    if (ProductTypeDeatils.ProductID == Product.ProductID && parseFloat( ProductTypeDeatils.Code )== parseFloat( Product.ProductTypeCode))
                    //    {
                    //        debugger;
                    //        //-- Update Case
                    //        if (ProductTypeDeatils.Amount != Product.ProductTypeAmount || ProductTypeDeatils.DiscountAmount != Product.ProductTypeDiscountAmount)
                    //        {
                    //            var c = 9;
                    //            return false;
                    //        }
                    //    }

                    //    else
                    //    {
                    //        debugger;
                    //        var c = 9;

                    //        //Insert case

                    //      //  InsertProductType(Product);
                    //    }
                        
                    //}
                    //});

                    //if (i > (ProductTypeDeatils.length - 1))
                    //{
                    //    var c = 9;

                    //   // InsertProductType(Product);
                    //}
                }


                $.each(table, function (index, table) {
                    if ($.inArray(table.Code, TypeCodes) == -1) {

                        //--Type Deletion
                        var Product = new Object();
                        Product.ProductID = $("#hdfproductID").val();
                        Product.ProductTypeCode = table.Code;

                        var data = "{'productObj':" + JSON.stringify(Product) + "}";
                        jsonResult = getJsonData(data, "../AdminPanel/Products.aspx/DeleteProductType");
                        var table = {};
                        table = JSON.parse(jsonResult.d);
                    }

                });
               


            }
            if (result.status != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error strong').text(Messages.ProductAddFailure);
                $('.alert-error').show();
                // Scroll page
                AutoScrollToAlertBox();
            }
        }
        return false;
    }
