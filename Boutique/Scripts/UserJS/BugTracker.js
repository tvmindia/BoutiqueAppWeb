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

  
  
    //row click
    //$("#tblData").on("click", 'tbody tr', function () {
    //    alert("dfdf");
    //});
    //row click


    var $errorTable = $('#tblData').DataTable({
        "aoColumnDefs": [
                        { "bSearchable": false, "bVisible": false, "aTargets": [0] },
                     
        ],
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
                    var json = jQuery.parseJSON(msg.d);
                    fnCallback(json);
                    $("#tblData").show();
                },
                "error": function (xhr, textStatus, error) {
                    if (typeof console == "object") {
                        console.log(xhr.status + "," + xhr.responseText + "," + textStatus + "," + error);
                    }
                }
            });
        },
        fnDrawCallback: function () {
            $('.Exceptionedit').bind("click", BindBugDetailsByErrorID);
        }
    });


   


    



});//end of document.ready


function BindBugDetailsByErrorID(o) {
   
    //var editedrow = $(this).closest('tr');
    //var e = editedrow.attr("CategoryID");
    //alert("dfd");

   // var position = o.fnGetPosition(o); // getting the clicked row position
    //var contactId = o.fnGetData(position)[0]; // getting the value of the first (invisible) column

  
    alert("clicked");


}