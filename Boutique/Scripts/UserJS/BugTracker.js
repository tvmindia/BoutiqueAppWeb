$("document").ready(function (e) {
    parent.document.title = Pages.Bugs;
    $.ajaxSetup({
        cache: false
    });

    //$('#tblData tbody').on('click', 'tr', function () {
    //    if ($(this).hasClass('selected')) {
    //        $(this).removeClass('selected');
    //    }
    //    else {
    //        table.$('tr.selected').removeClass('selected');
    //        $(this).addClass('selected');
    //    }
    //});
  
    var $errorTable= $('#tblData').DataTable({
       

        "processing": true,
        "serverSide": true,
        "paging": true,
        "pagingType": "full_numbers",
	    
        "ajax": {
            
            type: "POST",
            url: "../WebServices/WSForJqueryDataTable.asmx/GetAllTableData",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: function (d) {
               return "{'TObj':" + JSON.stringify(d) + "}";
            },
            
            dataSrc: function (jsn) {
            debugger;
            jsn = JSON.parse(jsn.d);
          //  alert(jsn.data);
            return jsn.data;
            }
  
        },
        //"columns": [
        //{ "data": "ErrorID" },
        //{ "data": "BoutiqueName" },
        //{ "data": "UserName" },
        //{ "data": "Module" },
        //{ "data": "Method" },
        //{ "data": "ErrorSource" },
        //{ "data": "Version" }
        //]
        "columnDefs": [
            { targets: [0], visible: false },
            { targets: [2], orderable: true },
            { "targets": -1, orderable: false, "data": null, "defaultContent": "<a class='btn btn-info Exceptionedit' href='#'><i class='halflings-icon white edit'></i></a>" }
         
        ]
       
        
 
    });//end of datatable

    




    //var $errorTable = $('#tblData').DataTable({
    //    "aoColumnDefs": [
    //                    { "bSearchable": false, "bVisible": false, "aTargets": [0] },
    //                    { "targets": -1, "data": null, "defaultContent": "<a class='btn btn-info Exceptionedit' href='#'><i class='halflings-icon white edit'></i></a>" }

    //    ],
    //    "filter": false,
    //    "pagingType": "simple_numbers",
    //    "orderClasses": false,
    //    "order": [[0, "asc"]],
    //    "info": false,
    //    "scrollY": "450px",
    //    "scrollCollapse": true,
    //    "bProcessing": true,
    //    "bServerSide": true,
    //    "sAjaxSource": "../WebServices/WSForJqueryDataTable.asmx/GetTableData",
    //    "fnServerData": function (sSource, aoData, fnCallback) {
    //        aoData.push({ "name": "roleId", "value": "admin" });
    //        $.ajax({
    //            "dataType": 'json',
    //            "contentType": "application/json; charset=utf-8",
    //            "type": "GET",
    //            "url": sSource,
    //            "data": aoData,
    //            "success": function (msg) {
    //                var json = jQuery.parseJSON(msg.d);
    //                fnCallback(json);
    //                $("#tblData").show();
    //            },
    //            "error": function (xhr, textStatus, error) {
    //                if (typeof console == "object") {
    //                    console.log(xhr.status + "," + xhr.responseText + "," + textStatus + "," + error);
    //                }
    //            }
    //        });
    //    },
    //    "fnDrawCallback": function () {
    //       // $('.Exceptionedit').bind("click", BindBugDetailsByErrorID);
    //        // $('.Exceptionedit').bind("click", function () {
    //        //$("#tblData tbody tr").click(function () {

    //        //});
    //    }
    //});
  
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
        debugger;
        var data = $errorTable.row($(this).parents('tr')).data();
        var ExceptionTrack = new Object();
        ExceptionTrack.ErrorID = data[0];//hidden ErrorID
        $("#hdfErrorID").val(ExceptionTrack.ErrorID);
        var jsonResult = GetErrorDetailByErrorID(ExceptionTrack);
        ScrollToBottom();
        BindTextBoxes(jsonResult);
        HideAlertBox();
        return false;
    });

   
    $(".UpdateErrror").click(function (e) {//
        HideAlertBox();
        if (($("#hdfErrorID").val() != '') && ($("input[name=optionsRadiosFixed]:checked").val()=='true')){
            var e = $("#hdfErrorID").val();
            var p = "ErrorFix";
            DeleteCustomAlert("Really Fixed?", e, p);
          
        }
        else
        {
            CustomAlert('Please Fix The Issue!');
        }
       
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
        $("#txtBoutique").text(Records.BoutiqueName);
        $("#txtUserName").text(Records.UserName);
      
        $("#txtDescription").text(Records.Description);
        $("#txtErrorDate").text(Records.Date);
        $("#txtModule").text(Records.Module);
        $("#txtMethod").text(Records.Method);
        if (Records.IsFixed === true) {
        $("#OptIsFixedYes").prop("checked", true);
        }
        if (Records.IsFixed === false) {
        $("#OptIsFixedNo").prop("checked", true);
        }
     
        $("#txtErrorSource").text(Records.ErrorSource);
        if (Records.IsMobile === true)
        {
            
            $("#txtIsMobile").text('Yes');
        }
        if (Records.IsMobile === false)
        {
            $("#txtIsMobile").text('No');
        }
        $("#txtVersion").text(Records.Version);
    })
   
}

function UpdateErrorDetails(ExceptionTrack)
{
    var data = "{'ETObj':" + JSON.stringify(ExceptionTrack) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/BugTracker.aspx/UpdateErrorDetails");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function ScrollToBottom()
{
    var offset = $('#rowfluidDetails').offset();
    offset.left -= 20;
    offset.top -= 20;
    $('html, body').animate({
        scrollTop: offset.top,
        scrollLeft: offset.left
    });
}





function ErrorFix(e, p)
{
   
    var ExceptionTrack = new Object();
    ExceptionTrack.ErrorID = e;

    if ($("input[name=optionsRadiosFixed]:checked")) {
        ExceptionTrack.IsFixed = $("input[name=optionsRadiosFixed]:checked").val();
    }

    var result=UpdateErrorDetails(ExceptionTrack);
  
    if (result.status == "1") {
      
        $('#rowfluidDiv').show();
        $('.alert-success strong').text(Messages.ErrorFix);
        $('.alert-success').show();
         AutoScrollToAlertBox();
    }
    if (result.status != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error strong').text(Messages.ErrorFixNOT);
        AutoScrollToAlertBox();
    }
}











//function BindBugDetailsByErrorID(o) {
   
//    debugger;
//        var dt = $('#tblData').dataTable();
//        var position = dt.fnGetPosition(this); // getting the clicked row position
//        var contactId = dt.fnGetData(position)[0]; // getting the value of the first (invisible) column
//        alert(contactId);

//}