$("document").ready(function (e) {

  
    debugger;
    var jsonResult = GetAllBoutiques();
    //alert(jsonResult.d[0]);
    alert(jsonResult.d[0].Name);
    if (jsonResult != undefined)
    {
            BindBoutiqueTable(jsonResult);
    }
  
});//document.ready


function BindBoutiqueTable(Records) {
    $("#bouquetTable").find(".odd").remove();
    var i = 0;
    $.each(Records, function (index, Records) {
        i++;
        //var html = '<tr class="row_1"><td width="30%" align="center" valign="middle">' + Records.ManufacturerName + '</td><td width="30%" align="center" valign="middle">' + Records.ManufacturerLocation + '</td><td width="30%" align="center" valign="middle">' + Records.ManufacturerEmail + '</td><td width="10%" align="center" valign="middle"><a class="Manuedit" idval="' + Records.Id + '" href="#">Edit</a> | <a class="delete" href="' + appAddress + 'PurchaseManufactContact/DeleteManufacturer/' + Records.Id + '">Delete</a></td></tr>';
        //$("#tblManu").append(html);
        var html = '<tr><td>' + Records.Name + '</td><td class="center">1.2</td><td class="center">Chalakudy</td><td class="center">9961442805</td><td class="center">9AM-6PM</td>  <td class="center"><span class="label label-success">Active</span><td class="center">25 Days</td></td><td class="center"><a class="btn btn-success" href="#"><i class="halflings-icon white zoom-in"></i> </a><a class="btn btn-info" href="#"><i class="halflings-icon white edit"></i></a><a class="btn btn-danger" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
        $("#bouquetTable").append(html);
    })
    alert(i);
}
