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

    




    var $errorTable = $('#tblData').DataTable({
        "aoColumnDefs": [
                        { "bSearchable": false, "bVisible": false, "aTargets": [0] },
                        { "targets": -1, "data": null, "defaultContent": "<a class='btn btn-info Exceptionedit' href='#'><i class='halflings-icon white edit'></i></a>" }

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
        "fnDrawCallback": function () {
           // $('.Exceptionedit').bind("click", BindBugDetailsByErrorID);
            // $('.Exceptionedit').bind("click", function () {
            //$("#tblData tbody tr").click(function () {

            //});
        }
    });
  
   // row click
    //$("#tblData").on("click", 'tbody td', function () {
    //    var dt = $('#tblData').dataTable();
    //  //  dt.columnFilter();
      
    //    var position = dt.fnGetPosition(this); // getting the clicked row position
    //    var contactId = dt.fnGetData(position)[0]; // getting the value of the first (invisible) column
    //    alert(contactId);
    //});
    //row click


  
    $('#tblData tbody').on('click', 'a', function () {
        var data = $errorTable.row($(this).parents('tr')).data();
      //  alert(data[0] + "'s salary is: " + data[5]);
        var ExceptionTrack = new Object();
        ExceptionTrack.ErrorID = data[0];//hidden ErrorID
        var jsonResult = GetErrorDetailByErrorID(ExceptionTrack);
        BindTextBoxes(jsonResult);
        return false;
    });

   


    



});//end of document.ready


function GetErrorDetailByErrorID(ExceptionTrack) {
    var data = "{'ETObj':" + JSON.stringify(ExceptionTrack) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/BugTracker.aspx/GetErrorDetailByErrorID");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function BindTextBoxes(Records)
{
    $.each(Records, function (index, Records) {
        $("#txtBoutique").val(Records.BoutiqueName);
        $("#txtUserName").val(Records.UserName);
        $("#txtDescription").val(Records.Description);
        $("#txtErrorDate").val(Records.Date);
        $("#txtModule").val(Records.Module);
        $("#txtMethod").val(Records.Method);
        debugger;
       
        if (Records.IsFixed === true) {
            $("#OptIsFixedNo").parent().removeClass('checked');
            $('#OptIsFixedYes').parent().addClass('checked');
        }
        if (Records.IsFixed === false) {

            $("#OptIsFixedYes").parent().removeClass('checked');
            $('#OptIsFixedNo').parent().addClass('checked');
        }
        $("#txtbugfixdate").val(Records.BugFixDate);
        $("#txtErrorSource").val(Records.ErrorSource);


        if (Records.IsFixed === true) {
            $("#OptIsFixedNo").parent().removeClass('checked');
            $('#OptIsFixedYes').parent().addClass('checked');
        }
        if (Records.IsFixed === false) {

            $("#OptIsFixedYes").parent().removeClass('checked');
            $('#OptIsFixedNo').parent().addClass('checked');
        }

        $("#txtVersion").val(Records.Version);



    })
}











//function BindBugDetailsByErrorID(o) {
   
//    debugger;
//        var dt = $('#tblData').dataTable();
//        var position = dt.fnGetPosition(this); // getting the clicked row position
//        var contactId = dt.fnGetData(position)[0]; // getting the value of the first (invisible) column
//        alert(contactId);

//}