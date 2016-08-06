
//document.ready
$("document").ready(function (e) {
    parent.document.title = Pages.Category;
  
    BindAsyncCategoryTable(); 
    $('#CategoryTable').DataTable({
        "bPaginate": true,
        "iDisplayLength": 6,
        "aLengthMenu": [[6, 20, 50, -1], [6, 20, 50, "All"]],
        "fnPageChange": "next"          //removing paging
    });

    $(".catdelete").live(
    {
        click: function () {
            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();          
            try{
                editedrow = $(this).closest('tr');
                var e = editedrow.attr("CategoryID");
                var p = editedrow.attr("CategCode");            
                DeleteCustomAlert('Are You Sure?', e, p);   
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "Category";
                ExceptionTrack.Method = "catdelete-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
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
            try
            {
                var jsonResult = {};
                editedrow = $(this).closest('tr');
                var Category = new Object();           
                Category.CategoryID = editedrow.attr("CategoryID");
                jsonResult = GetCategory(Category);
                if (jsonResult != undefined) {
                    BindCategoryTextBoxes(jsonResult);
                }
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "Category";
                ExceptionTrack.Method = "categoryedit-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
            return false;
        }
    })
  
    $(".CancelCategory").live({
        click: function (e) {// Clear controls
            try{
                ClearCategoryControls();
            }
            catch(e)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.Description = e.message;
                ExceptionTrack.Module = "Category";
                ExceptionTrack.Method = "CancelCategory-live";
                ExceptionTrack.ErrorSource = "JavaScript";
                ExceptionTrack.IsMobile = false;
                InsertException(ExceptionTrack);
            }
            return false;
        }
    })
    //Style setting for client side Validation
    //CreatedBy Thomson

    $('input[type=text],input[type=password]').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3').slideUp(1000);
    });
    $('textarea').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').slideUp(1000);
    });

    //end styling client validation

});
//end of document.ready

function DeleteItem(e,p)
{
    try
    {
        var jsonResult = {};
        var Category = new Object();
        Category.CategoryID = e;
        Category.CategoryCode = p;
        result = DeleteCategory(Category);
        if (result == "1") {
            $('#rowfluidDiv').show();
            $('.alert-success').show();
            $('.alert-success strong').text(Messages.DeletionSuccessFull);
        }
        if (result == "2")
        {
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.exists);  
        }
        if (result != "1"&&result!="2") {
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.DeletionFailure);
        }
        BindAsyncCategoryTable();
        $("#txtCatCode").val('');
        $("#txtCategoryName").val('');
   
        $("#hdfCategoryID").val('');
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "DeleteItem";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function BindAsyncCategoryTable()
{
    try
    {
        var jsonResult = {};
        var Product = new Object();
        jsonResult = GetAllCategories(Product);
        if (jsonResult != undefined) {
            BindCategoryTable(jsonResult);
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "BindAsyncCategoryTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function GetAllCategories(Product) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'productObj':" + JSON.stringify(Product) + "}";
        ds = getJsonData(data, "../AdminPanel/Category.aspx/GetAllCategories");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "GetAllCategories";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function BindCategoryTable(Records) {
    try
    {
        $("tbody#catrgoryrows tr").remove();
        $.each(Records, function (index, Records) {
            if (Records.CategoryCode == "NEW" || Records.CategoryCode == "OFR") {
                var html = '<tr class="categoryrows" OrderNo="' + Records.OrderNo + '" CategoryID="' + Records.CategoryID + '" boutiqueID="' + Records.BoutiqueID + '" CategCode="' + Records.CategoryCode + '"><td class="center">' + Records.OrderNo + '</td><td class="center">' + Records.CategoryCode + '</td><td class="center">' + Records.Name + '</td><td class="center"><a class="btn btn-info categoryedit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger"disabled="disabled" data-toggle="tooltip" title="Deletion Disabled" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
            }
            else {
                var html = '<tr class="categoryrows" OrderNo="' + Records.OrderNo + '" CategoryID="' + Records.CategoryID + '" boutiqueID="' + Records.BoutiqueID + '" CategCode="' + Records.CategoryCode + '"><td class="center">' + Records.OrderNo + '</td><td class="center">' + Records.CategoryCode + '</td><td class="center">' + Records.Name + '</td><td class="center"><a class="btn btn-info categoryedit" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger catdelete" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
            }
            $("#CategoryTable").append(html);
        })
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "BindCategoryTable";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}


function DeleteCategory(Category)
{
    try {
        var data = "{'categoryObj':" + JSON.stringify(Category) + "}";

        jsonResult = getJsonData(data, "../AdminPanel/Category.aspx/DeleteCategory");
        var table = {};
        table = JSON.parse(jsonResult.d);
    }
    catch (e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "DeleteCategory";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function InsertCategory(Category) {
    try
    {
        var data = "{'categoryObj':" + JSON.stringify(Category) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Category.aspx/InsertCategory");
        var table = {};
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "InsertCategory";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function UpdateCategory(Category)
{
    debugger;
    try
    {
        var data = "{'categoryObj':" + JSON.stringify(Category) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Category.aspx/UpdateCategory");
        var table = {};
        table = JSON.parse(jsonResult.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "UpdateCategory";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}


function GetCategory(Category) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'categoryObj':" + JSON.stringify(Category) + "}";
        ds = getJsonData(data, "../AdminPanel/Category.aspx/GetCategoryByCategoryCode");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "GetCategory";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return table;
}

function BindCategoryTextBoxes(Records) {
    try
    {
        $.each(Records, function (index, Records) {
            $("#txtOrderno").val(Records.OrderNo);

            $("#txtCatCode").val(Records.CategoryCode);
            $("#txtCatCode").hide();

            $("#lblcatcode").show();
            $("#lblcatcode").text(Records.CategoryCode);
       
      
            $("#txtCategoryName").val(Records.Name);
            $("#hdfCategoryID").val(Records.CategoryID);

        })
        $("#editLabel").text("Edit Category");
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "BindCategoryTextBoxes";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function ClearCategoryControls()
{
    try
    {
        $("#txtOrderno").val('');
        $("#txtCatCode").val('');
        $("#txtCategoryName").val('');
        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();
        $("#editLabel").text("New Category");
        $("#txtCatCode").show();
        $("#lblcatcode").hide();
        $("#hdfCategoryID").val('');
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "ClearCategoryControls";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
   
}


function CategoryValidation()
{
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();  
    $('#Displaydiv1').remove();
    try
    {
        var Cat_Order = $('#txtOrderno');
        var Cat_Code = $('#txtCatCode');
        var Cat_Name = $('#txtCategoryName');

        var container = [
          { id: Cat_Order[0].id, name: Cat_Order[0].name, Value: Cat_Order[0].value },
          { id: Cat_Code[0].id, name: Cat_Code[0].name, Value: Cat_Code[0].value },
          { id: Cat_Name[0].id, name: Cat_Name[0].name, Value: Cat_Name[0].value }
      
        ];
        var Status = 0; 
        if ($("#hdfCategoryID").val() == "") {
            var Status = IsCategoryExists();
        }    
        var j = 0;
        var Errorbox = document.getElementById('ErrorBox1');
        var divs = document.createElement('div');
        divs.setAttribute("id", "Displaydiv1");
        Errorbox.appendChild(divs);
        for (var i = 0; i < container.length; i++) {

            if (container[i].Value == "") {
                j = 1;        
                Errorbox.style.borderRadius = "5px";
                Errorbox.style.display = "block";
                var txtB = document.getElementById(container[i].id);
                txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
                txtB.style.backgroundPosition = "95% center";
                txtB.style.backgroundRepeat = "no-repeat";         
                Errorbox.style.paddingLeft = "30px";
            }
            if (container[0].Value!="" && Status==1)
            {
                Errorbox.style.borderRadius = "5px";
                Errorbox.style.display = "block";
                var txtB = document.getElementById(container[i].id);
                txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
                txtB.style.backgroundPosition = "95% center";
                txtB.style.backgroundRepeat = "no-repeat";           
                Errorbox.style.paddingLeft = "30px";
            }        
        } 

        if (j == '1') {
            var p = document.createElement('p');
            p.innerHTML = "* Some Fields Are Empty ! ";
            p.style.color = "Red";
            p.style.fontSize = "14px";
            divs.appendChild(p);
            if (Status != 1)
            {
                return false;
            }      
        }
        if (Status == 1) {    
            var p = document.createElement('p');
            p.innerHTML = "* Already Exists! ";
            p.style.color = "Red";
            p.style.fontSize = "14px";
            divs.appendChild(p);
            return false;
        }   
        if (j == '0') {
            $('#ErrorBox1').hide();
            AddCategory()
            return true;
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "CategoryValidation";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
}

function  AddCategory()
{
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    try
    {
        var result = "";
        var Category = new Object();
        Category.CatOrderNo = $("#txtOrderno").val();
        Category.CategoryCode = $("#txtCatCode").val();
        Category.CategoryName = $("#txtCategoryName").val();

        //----------- Checking for insertion or updation--------------//

        if ($("#hdfCategoryID").val() != "") {
            Category.CategoryID = $("#hdfCategoryID").val();
            result = UpdateCategory(Category);
        }
        else {        
            result = InsertCategory(Category);
        }


        BindAsyncCategoryTable();

        if (result == "1") {
   
            ClearCategoryControls();
            $('#rowfluidDiv').show();
            $('.alert-success').show();
            $('.alert-success strong').text(Messages.InsertionSuccessFull);
       
        }
        if (result != "1") {
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text(Messages.InsertionFailure);        
        }
    }
    catch(e)
    {
        var ExceptionTrack = new Object();
        ExceptionTrack.Description = e.message;
        ExceptionTrack.Module = "Category";
        ExceptionTrack.Method = "AddCategory";
        ExceptionTrack.ErrorSource = "JavaScript";
        ExceptionTrack.IsMobile = false;
        InsertException(ExceptionTrack);
    }
    return false;
}


