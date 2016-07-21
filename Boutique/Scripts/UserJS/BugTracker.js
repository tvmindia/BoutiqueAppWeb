$("document").ready(function (e) {
  
    $.ajaxSetup({
        cache: false
    });



    $('#example').DataTable({

       
        "filter": false,
        "pagingType": "simple_numbers",
        "orderClasses": false,
        "order": [[0, "asc"]],
        "info": false,
        "scrollY": "450px",
        "scrollCollapse": true,
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "../AdminPanel/BugTracker.aspx/GetAllErrorDetails",
        "fnServerData": function (sSource, aoData, fnCallback)
        {
        aoData.push({ "name": "roleId", "value": "admin" });
        $.ajax({
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "type": "POST",
            "url": sSource,
            //"data": aoData,
            "data": JSON.stringify({aoData}),
            "success": function (msg)
            {
                var json = jQuery.parseJSON(msg.d);
                fnCallback(json);
               // $("#tblData").show();
            },
            error: function (xhr, textStatus, error)
            {
                if (typeof console == "object")
                {
                    console.log(xhr.status + "," + xhr.responseText + "," + textStatus + "," + error); 
                }
            }
        });//ajax
    },
    fnDrawCallback: function () {
        $('.image-details').bind("click", showDetails);
    }


    });//end of datatable

    







});//end of document.ready


function showDetails() {
    //so something with the data
}