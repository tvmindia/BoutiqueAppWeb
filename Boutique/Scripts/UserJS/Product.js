$("document").ready(function (e) {
    //var data = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'bug' }, { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, { id: 4, text: 'wontfix' }];
    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';
   
    var imageids = {};
   
    imageids = GetAllProductImages('8c9b8e83-dc8f-48d7-994b-8688516a8771');
    BindAllImages(imageids);


   

   
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
              
                 if (result[0].status == "1") {
                     $("#hdfproductID").val(result[0].ProductID);
                     $('#rowfluidDiv').show();
                     $('.alert-success').show();
                 }
                 if (result[0].status != "1") {
                     $('#rowfluidDiv').show();
                     $('.alert-error').show();
                 }
                 return false;
           
            }
            //if ($(".AddProduct").text() == "Modify") {
            //    var Category = new Object();
            //    Category.BoutiqueID = boutiqueid;
            //    Category.CategoryID = $("#hdfCategoryID").val();
            //    Category.CategoryCode = $("#txtCatCode").val();
            //    Category.CategoryName = $("#txtCategoryName").val();
             //  result = UpdateCategory(Category);
            //}
           // BindAsyncCategoryTable(boutiqueid);
           
        }

    })

    $(".AddProductimage").live({
        click: function (e) {// submit button click

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var imgresult = "";
            //imageupload
            var _URL = window.URL || window.webkitURL;
           var formData = new FormData();
            var file, img;
           

            if ((file = $('#productfile')[0].files[0])) {
                img = new Image();
                img.onload = function () {
                    var image = $('#productfile')[0].files[0];
                  
                  
                    formData.append('files', image, '8c9b8e83-dc8f-48d7-994b-8688516a8771,' + file.name);
                 
                  //  formData.append('file', $('#productfile')[0].files[0]);
                    //postBlobAjax(formData, "../ImageHandler/ImageServiceHandler.ashx");
                };
                img.onerror = function () {
                    alert("Not a valid file:" + file.type);
                };
                img.src = _URL.createObjectURL(file);
            }
        
            //imageupload
           // formData.append('prod', 88888);
          //  formData.append('ismain', 77777);
            postBlobAjax(formData, "../ImageHandler/ImageServiceHandler.ashx");

              //  result = InsertProduct(Product);

                if (result[0].status == "1") {
                    $("#hdfproductID").val(result[0].ProductID);
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                }
                if (result[0].status != "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                }
               
                return false;

        }

    })
   
    $(".CancelProduct").live({
        click: function (e) {// Clear controls
            Cleardsfs();
            return false;
        }
    })

    $(".ClearProductimage").live({
        click: function (e) {// Clear image control
            ClearImage();
            return false;
        }
    })

  






});//end of document.ready






function ClearImage()
{
    
    document.getElementById("productfile").value = "";
    
    $("#list").find(".thumb").remove();
   
    //$('#productfile')[0].files;
    //document.getElementById('productfile').parentNode.innerHTML = document.getElementById('productfile').parentNode.innerHTML;
   
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


function BindCategoryDropDown(dd,Records,indx)
{

    //var options = [], key, value;
 //   for (var i = 0; i < Records.length; i++) {

   
        //$('#selectCategories_chzn').append(
        //                        $('<option></option>')
        //                              .val(Records[i].BoutiqueID)
        //                              .html(Records[i].Name)
        //                              .attr("selected", "selected"));
        //$("#selectCategories_chzn").trigger("liszt:updated");



      //  alert(i);
       
        //  $('#selectCategories').append($('<option></option>').val(Records.BoutiqueID).html(Records.Name));
        //$("select").append("<option value=" + value + ">" + value + "<option>");
        //$('#selectCategories_chzn').append("<option value='" + Records[i].BoutiqueID + "'>" + Records[i].Name + "</option>");
       
   // }
    //$('.chzn-drop').chosen().trigger("chosen:updated");
   // Event.fire($('#selectCategories_chzn'), "chosen:updated");
    //$('#slt').append(option);
   // dd.append(option);
    
   //$("#selectCategories").get(0).options.length = 0;
   //$("#selectCategories").get(0).options[0] = new Option("Select Categories", "-1");
    //var cadena = "";
    //for (var i = 0; i < Records.length; i++)
    //{
    //    alert(i);
    //cadena += "<option class=catrows SELECTED value='" + Records[i]["BoutiqueID"] + "'>" + Records[i]["Name"] + "</option>\n";
    //}
    //dd.append(cadena);

    //$.each(Records, function (index, Records) {
      //  alert(Records.Name);
       // $("#selectCategories").get(0).options[$("#selectCategories").get(0).options.length] = new Option(Records.BoutiqueID, Records.Name);
        //$("#selectCategories").get(0).options[$("#selectCategories").get(0).options.length] = new Option(Records.BoutiqueID, Records.Name);
        // var html = '<tr class="userrows" userID="' + Records.UserID + '"><td>' + Records.Name + '</td>	<td class="center">' + Records.Mobile + '</td><td class="center">' + Records.Email + '</td><td class="center"><a class="btn btn-info useredit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger userdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        //$("#UsersTable").append(html);
   // })

    //$.each(Records, function (index, item) {
    //    $("#selectCategories").get(0).options[$("#selectCategories").get(0).options.length] = new Option(item.BoutiqueID, item.Name);
    //});

            
            //var cadena = "";
            //var myflag = false;
            //for (var i = 0; i < Records.length; i++) {
            //    if (myflag == true) {
            //        cadena += "<option class=catrows SELECTED value='" + Records[i]["BoutiqueID"] + "'>" + Records[i]["Name"] + "</option>\n";
            //        myflag = false;
            //    }
            //    else {
            //        cadena += "<option class=catrows value='" + Records[i]["BoutiqueID"] + "'>" + Records[i]["Name"] + "</option>\n";
            //    }
            //    if (Records[i]["id"] == indx) {
            //        myflag = true;
            //    }
            //}
            //dd.append(cadena);
           
 
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


function GetAllProductImages(Productid) {//dgdfgfd/dsfdsfds
    var Product = new Object();
    Product.ProductID = Productid;
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