﻿$("document").ready(function (e) {

   

    BindAsyncCategoryTable();


    $(".catdelete").live(
    {
        click: function (e) {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            if (confirm("You are about to Delete Category!..")) {

                var jsonResult = {};
                editedrow = $(this).closest('tr');
                var Category = new Object();
                Category.BoutiqueID = boutiqueid;
                Category.CategoryID = editedrow.attr("CategoryID");
                Category.CategoryCode = editedrow.attr("CategCode");
                result = DeleteCategory(Category);
                if (result == "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();

                }
                if (result != "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();

                }

                BindAsyncCategoryTable();
                $("#txtCatCode").val('');
                $("#txtCategoryName").val('');
                $(".AddCategory").text("Save");
                $("#hdfCategoryID").val('');
            }
            return false;
        }
    })

    $(".categoryedit").live(
    {
        click: function (e) {
           
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var jsonResult = {};
            editedrow = $(this).closest('tr');
            var Category = new Object();
            Category.BoutiqueID = boutiqueid;
            Category.CategoryID = editedrow.attr("CategoryID");
            jsonResult = GetCategory(Category);
            if (jsonResult != undefined) {

                BindCategoryTextBoxes(jsonResult);
            }


            return false;
        }
    })


    $(".AddCategory").live({
        click: function (e) {// submit button click
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();
            var result = "";
            if ($(".AddCategory").text() == "Save")
            {
               
                
                var Category = new Object();
                Category.BoutiqueID = boutiqueid;
                Category.CategoryCode = $("#txtCatCode").val();
                Category.CategoryName = $("#txtCategoryName").val();
                result = InsertCategory(Category);
            }
            if ($(".AddCategory").text() == "Modify")
            {
                var Category = new Object();
                Category.BoutiqueID = boutiqueid;
                Category.CategoryID = $("#hdfCategoryID").val();
                Category.CategoryCode = $("#txtCatCode").val();
                Category.CategoryName = $("#txtCategoryName").val();
                result = UpdateCategory(Category);
            }
            BindAsyncCategoryTable();


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


    $(".CancelCategory").live({
        click: function (e) {// Clear controls
            ClearCategoryControls();
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


function BindAsyncCategoryTable()
{
    var jsonResult = {};
    var Product = new Object();
    jsonResult = GetAllCategories(Product);
    if (jsonResult != undefined) {
        BindCategoryTable(jsonResult);
    }
}


function GetAllCategories(Product) {

    var ds = {};
    var table = {};
    var data = "{'productObj':" + JSON.stringify(Product) + "}";
    ds = getJsonData(data, "../AdminPanel/Category.aspx/GetAllCategories");
    table = JSON.parse(ds.d);
    return table;
}

function BindCategoryTable(Records) {
    $("#CategoryTable").find(".categoryrows").remove();
    $.each(Records, function (index, Records) {
        var html = '<tr class="categoryrows" CategoryID="' + Records.CategoryID + '" boutiqueID="' + Records.BoutiqueID + '" CategCode="' + Records.CategoryCode + '"><td class="center">' + Records.CategoryCode + '</td><td class="center">' + Records.Name + '</td><td class="center"><a class="btn btn-info categoryedit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger catdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#CategoryTable").append(html);
    })
}

function DeleteCategory(Category)
{
    var data = "{'categoryObj':" + JSON.stringify(Category) + "}";

    jsonResult = getJsonData(data, "../AdminPanel/Category.aspx/DeleteCategory");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function InsertCategory(Category) {

    var data = "{'categoryObj':" + JSON.stringify(Category) + "}";

    jsonResult = getJsonData(data, "../AdminPanel/Category.aspx/InsertCategory");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}
function UpdateCategory(Category)
{
    var data = "{'categoryObj':" + JSON.stringify(Category) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Category.aspx/UpdateCategory");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function GetCategory(Category) {
    var ds = {};
    var table = {};
    var data = "{'categoryObj':" + JSON.stringify(Category) + "}";
    ds = getJsonData(data, "../AdminPanel/Category.aspx/GetCategoryByCategoryCode");
    table = JSON.parse(ds.d);
    return table;
}

function BindCategoryTextBoxes(Records) {
    $.each(Records, function (index, Records) {
    $("#txtCatCode").val(Records.CategoryCode);
    $("#txtCategoryName").val(Records.Name);
    $("#hdfCategoryID").val(Records.CategoryID);

    })
  //  $("#txtCatCode").attr('disabled', true);
    $(".AddCategory").text("Modify");
}


function ClearCategoryControls()
{
    $("#txtCatCode").val('');
    $("#txtCategoryName").val('');
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    $(".AddCategory").text("Save");
   
}