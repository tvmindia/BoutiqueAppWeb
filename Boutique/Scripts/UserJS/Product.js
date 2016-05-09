$("document").ready(function (e) {

    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';
   // $(".chosen-select").chosen();
    BindAsyncCategory(boutiqueid);
    BindAsyncDesigner(boutiqueid);
    //CallingDropDown
    //BindCategoryDropDown();
    //$('.selectpicker').selectpicker();
   // $('.selectpicker').selectpicker('refresh');
    //CallingDropDown


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
                Product.IsOutOfStock = 'false';
                Product.IsActive = 'true';
                Product.Categories = 'KUR,NEW';
                Product.DesignerID = $("#selectError3Des").val();
                result = InsertProduct(Product);
            }
            //if ($(".AddProduct").text() == "Modify") {
            //    var Category = new Object();
            //    Category.BoutiqueID = boutiqueid;
            //    Category.CategoryID = $("#hdfCategoryID").val();
            //    Category.CategoryCode = $("#txtCatCode").val();
            //    Category.CategoryName = $("#txtCategoryName").val();
            //    result = UpdateCategory(Category);
            //}
           // BindAsyncCategoryTable(boutiqueid);


            if (result == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();

            }
            if (result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();

            }
            return false;
        }

    })



});//end of document.ready



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


function BindAsyncCategory(boutiqueid) {
    var jsonResult = {};
    jsonResult = GetAllCategories(boutiqueid);
    if (jsonResult != undefined) {
       
      //  $("#selectError3Cat").find
        BindCategoryDropDown($("#selectCategories"), jsonResult, -1);

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
       // $("#selectError3Cat").find
        BindDesignerDropDown($("#selectError3Des"), jsonResult, -1);

    }
}

function GetAllCategories(boutiqueid) {

    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/Category.aspx/GetAllCategories");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllDesigners(boutiqueid) {

    var ds = {};
    var table = {};
    var data = "{'Boutiqueid':" + JSON.stringify(boutiqueid) + "}";
    ds = getJsonData(data, "../AdminPanel/People.aspx/GetAllDesigners");
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