$("document").ready(function (e) {

    var boutiqueid = '470a044a-4dba-4770-bca7-331d2c0834ae';
   
    BindAsyncCategory(boutiqueid);
    //CallingDropDown
    //BindCategoryDropDown();
    $('.selectpicker').selectpicker();
   // $('.selectpicker').selectpicker('refresh');
    //CallingDropDown


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
       
        $("#selectError3Cat").find
        BindCategoryDropDown($("#selectError3Cat"), jsonResult, -1);

    }
}

function BindCategoryDropDown(dd,Records,indx)
{
    for (var key in Records) {
        if (Records.hasOwnProperty(key)) {
           
            
            var cadena = "";
            var myflag = false;
            for (var i = 0; i < Records.length; i++) {
                if (myflag == true) {
                    cadena += "<option class=catrows SELECTED value='" + Records[i]["BoutiqueID"] + "'>" + Records[i]["Name"] + "</option>\n";
                    myflag = false;
                }
                else {
                    cadena += "<option class=catrows value='" + Records[i]["BoutiqueID"] + "'>" + Records[i]["Name"] + "</option>\n";
                }
                if (Records[i]["id"] == indx) {
                    myflag = true;
                }
            }
            dd.append(cadena);
           
         
        }
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