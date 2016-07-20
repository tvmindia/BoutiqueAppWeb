$("document").ready(function (e) {
   // $('#example').DataTable();
    $('#example').DataTable({

        "ajax": {
            "url": "../AdminPanel/BugTracker.aspx/GetAllErrorDetails"
                }
       
       
    });




});//end of document.ready