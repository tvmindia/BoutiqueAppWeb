using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace Boutique.WebServices
{
    /// <summary>
    /// Summary description for WSForJqueryDataTable
    /// 
    /// 
    /// s
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WSForJqueryDataTable : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true)]
        public string GetTableData()
        {
            var echo = int.Parse(HttpContext.Current.Request.Params["sEcho"]);
            var displayLength = int.Parse(HttpContext.Current.Request.Params["iDisplayLength"]);
            var displayStart = int.Parse(HttpContext.Current.Request.Params["iDisplayStart"]);
            var sortOrder = HttpContext.Current.Request.Params["sSortDir_0"].ToString(CultureInfo.CurrentCulture);
            var roleId = HttpContext.Current.Request.Params["roleId"].ToString(CultureInfo.CurrentCulture);

            var records = GetRecordsFromDatabaseWithFilter().ToList();
            if (!records.Any())
            {
                return string.Empty;
            }

            var orderedResults = sortOrder == "asc"
                                 ? records.OrderBy(o => o.Module)
                                 : records.OrderByDescending(o => o.Module);
            var itemsToSkip = displayStart == 0
                              ? 0
                              : displayStart + 1;
            var pagedResults = orderedResults.Skip(itemsToSkip).Take(displayLength).ToList();
            var hasMoreRecords = true;

            var sb = new StringBuilder();
            
            sb.Append(@"{" + "\"sEcho\": " + echo + ",");
            sb.Append("\"recordsTotal\": " + records.Count + ",");
            sb.Append("\"recordsFiltered\": " + records.Count + ",");
            sb.Append("\"iTotalRecords\": " + records.Count + ",");
            sb.Append("\"iTotalDisplayRecords\": " + records.Count + ",");
            sb.Append("\"aaData\": [");
            foreach (var result in pagedResults)
            {
                if (!hasMoreRecords)
                {
                    sb.Append(",");
                }

                sb.Append("[");
                sb.Append("\"" + result.ErrorID + "\",");
                sb.Append("\"" + result.BoutiqueName + "\",");
                sb.Append("\"" + result.UserName + "\",");
                sb.Append("\"" + result.Module + "\",");
                sb.Append("\"" + result.Method + "\",");
                sb.Append("\"" + result.ErrorSource + "\",");
                sb.Append("\"" + result.Version + "\"");
                //sb.Append("\"<img class='image-details' src='conalt='View Details'/>\"");
                // sb.Append("\"<a class='btn btn-info Exceptionedit' href='#'><i class='halflings-icon white edit'></i></a>\"");
                sb.Append("]");
                hasMoreRecords = false;
            }
            sb.Append("]}");
            return sb.ToString();
        }

        private static IEnumerable<ExceptionTrack> GetRecordsFromDatabaseWithFilter()
        {
            // At this point you can call to your database to get the data
            // but I will just populate a sample collection in code
            //return new List<ExceptionTrack>
            //{
            //    new ExceptionTrack
            //    {
            //        UserId = 1,
            //        Address = "1 Newton Square, London",
            //        Age=25,
            //        Name="John Smith"
            //    },
            //    new ExceptionTrack
            //    {
            //        UserId = 2,
            //        Address = "5 George Road, Manchester",
            //        Age= 31,
            //        Name = "Erica Keir"
            //    },
            //    new ExceptionTrack
            //    {
            //        UserId = 3,
            //        Address = "32 Queen Mary St, Newcastle",
            //        Age = 12,
            //        Name = "Test McDermont"
            //    }
            //};

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
              List<ExceptionTrack> exceptonList = new List<ExceptionTrack>();
             if (UA != null)
            {
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = ETObj.GetAllErrorDetails();

                if(ds.Tables[0].Rows.Count>0)// 
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        exceptonList.Add(new ExceptionTrack { ErrorID=Convert.ToString(dr["ErrorID"]), BoutiqueName = Convert.ToString(dr["BoutiqueName"]), UserName = Convert.ToString(dr["UserName"]), Module = Convert.ToString(dr["Module"]),Method=Convert.ToString(dr["Method"]),ErrorSource = Convert.ToString(dr["ErrorSource"]), Version = Convert.ToString(dr["Version"]) });
                    }
                }
               
             
            }//end if ua
             return exceptonList;

        }//end of method
    }
}
