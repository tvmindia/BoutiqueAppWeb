$("document").ready(function (e) {
  
    $.ajaxSetup({
        cache: false
    });

    //$('#example').DataTable({

       
    //    "processing": true,
    //    "serverSide": true,
    //    "ajax": {
            
    //        "type": "POST",
    //        "url": "../AdminPanel/BugTracker.aspx/GetAllErrorDetails",
    //        "dataType": 'json',
    //        "contentType": "application/json; charset=utf-8",
    //        "data": function (data) {
    //            debugger;
    //            return data = JSON.stringify(data);
    //        }
    //     },
    //     "columns": [
    //      { "data": "BoutiqueName" },
    //      { "data": "UserName" },
    //      { "data": "Module" },
    //      { "data": "Method" },
    //      { "data": "Source" },
    //      { "data": "Version" }
    //    ]
 
    //});//end of datatable

    //var table = $('#example').DataTable({
    //    //"filter": false,
    //    //"pagingType": "simple_numbers",
    //    //"orderClasses": false,
    //    //"order": [[0, "asc"]],
    //    //"info": false,
    //    //"scrollY": "450px",
    //    //"scrollCollapse": true,
    //    "bProcessing": true,
    //    "bServerSide": true,
    //    "sAjaxSource": "../AdminPanel/BugTracker.aspx/GetAllErrorDetails",
    //    "fnServerData": function (sSource, aoData, fnCallback) {
    //        aoData.push({ "name": "roleId", "value": "admin" });
    //        $.ajax({
    //            "dataType": 'json',
    //            "contentType": "application/json; charset=utf-8",
    //            "type": "POST",
    //            "url": sSource,
    //            "data": JSON.stringify({ aoData: aoData }),
    //            "success": function (aaData) {
                   
    //                var json = jQuery.parseJSON(aaData.d);
    //                fnCallback(json);
    //                debugger;
    //               $("#tblData").show();
    //            },
    //            error: function (xhr, textStatus, error) {
    //                if (typeof console == "object") {
    //                    console.log(xhr.status + "," + xhr.responseText + "," + textStatus + "," + error);
    //                }
    //            }
    //        });
    //    },
    //    fnDrawCallback: function () {
    //        $('.image-details').bind("click", showDetails);
    //    }
    //});

    //function showDetails() {
    //    //so something funky with the data
    //}


    var table = $('#tblData').DataTable({
       
        "filter": false,
        "pagingType": "simple_numbers",
        "orderClasses": false,
        "order": [[0, "asc"]],
        "info": false,
        "scrollY": "450px",
        "scrollCollapse": true,
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "../WebServices/WSForJqueryDataTable.asmx/GetTableData",
        "fnServerData": function (sSource, aoData, fnCallback) {
            aoData.push({ "name": "roleId", "value": "admin" });
            $.ajax({
                "dataType": 'json',
                "contentType": "application/json; charset=utf-8",
                "type": "GET",
                "url": sSource,
                "data": aoData,
                "success": function (msg) {
                    debugger;
                    var json = jQuery.parseJSON(msg.d);
                    fnCallback(json);
                    $("#tblData").show();
                },
                error: function (xhr, textStatus, error) {
                    if (typeof console == "object") {
                        console.log(xhr.status + "," + xhr.responseText + "," + textStatus + "," + error);
                    }
                }
            });
        },
        fnDrawCallback: function () {
           // $('.image-details').bind("click", showDetails);
        }
    });


    







});//end of document.ready


function showDetails() {
    //so something with the data
}