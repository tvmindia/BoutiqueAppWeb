﻿using Boutique.DAL;
using Newtonsoft.Json;
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

        //[WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true)]
        //public string GetTableData()
        //{
        //    var echo = int.Parse(HttpContext.Current.Request.Params["sEcho"]);
        //    var displayLength = int.Parse(HttpContext.Current.Request.Params["iDisplayLength"]);
        //    var displayStart = int.Parse(HttpContext.Current.Request.Params["iDisplayStart"]);
        //    var sortOrder = HttpContext.Current.Request.Params["sSortDir_0"].ToString(CultureInfo.CurrentCulture);
        //    var roleId = HttpContext.Current.Request.Params["roleId"].ToString(CultureInfo.CurrentCulture);

        //    var records = GetRecordsFromDatabaseWithFilter().ToList();
        //    if (!records.Any())
        //    {
        //        return string.Empty;
        //    }

        //    var orderedResults = sortOrder == "asc"
        //                         ? records.OrderBy(o => o.Module)
        //                         : records.OrderByDescending(o => o.Module);
        //    var itemsToSkip = displayStart == 0
        //                      ? 0
        //                      : displayStart + 1;
        //    var pagedResults = orderedResults.Skip(itemsToSkip).Take(displayLength).ToList();
        //    var hasMoreRecords = true;

        //    var sb = new StringBuilder();
            
        //    sb.Append(@"{" + "\"sEcho\": " + echo + ",");
        //    sb.Append("\"recordsTotal\": " + records.Count + ",");
        //    sb.Append("\"recordsFiltered\": " + records.Count + ",");
        //    sb.Append("\"iTotalRecords\": " + records.Count + ",");
        //    sb.Append("\"iTotalDisplayRecords\": " + records.Count + ",");
        //    sb.Append("\"aaData\": [");
        //    foreach (var result in pagedResults)
        //    {
        //        if (!hasMoreRecords)
        //        {
        //            sb.Append(",");
        //        }

        //        sb.Append("[");
        //        sb.Append("\"" + result.ErrorID + "\",");
        //        sb.Append("\"" + result.BoutiqueName + "\",");
        //        sb.Append("\"" + result.UserName + "\",");
        //        sb.Append("\"" + result.Module + "\",");
        //        sb.Append("\"" + result.Method + "\",");
        //        sb.Append("\"" + result.ErrorSource + "\",");
        //        sb.Append("\"" + result.Version + "\"");
        //        //sb.Append("\"<img class='image-details' src='conalt='View Details'/>\"");
        //        // sb.Append("\"<a class='btn btn-info Exceptionedit' href='#'><i class='halflings-icon white edit'></i></a>\"");
        //        sb.Append("]");
        //        hasMoreRecords = false;
        //    }
        //    sb.Append("]}");
        //    return sb.ToString();
        //}

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public string GetAllTableData(JQDataTableModel TObj)
        {
             var records = GetRecordsFromDatabaseWithFilter(TObj).ToList();
            if (!records.Any())
            {
                return string.Empty;
            }
            //DTOrder dtorderobj = TObj.Order;
            //var orderedResults = sortOrder == "asc" ? records.OrderBy(o => o.Module)
            //                                        : records.OrderByDescending(o => o.Module);
            //var itemsToSkip = displayStart == 0
            //                  ? 0
            //                  : displayStart + 1;
           // var pagedResults = orderedResults.Skip(itemsToSkip).Take(displayLength).ToList();
            var hasMoreRecords = true;
            var sb = new StringBuilder();

            sb.Append(@"{" + "\"draw\": " + TObj.Draw + ",");
            
            sb.Append("\"recordsTotal\": " + TObj.RecordsTotal + ",");
            sb.Append("\"recordsFiltered\": " + TObj.Length + ",");
            sb.Append("\"data\": [");
            foreach (var result in records)
            {
                if (!hasMoreRecords)
                {
                    sb.Append(",");
                }

                sb.Append("[");
                sb.Append("\"" + result.ErrorID + "\",");
                sb.Append("\"" + result.BoutiqueName + "\",");
                sb.Append("\"" + result.Date + "\",");
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

        private static IEnumerable<ExceptionTrack> GetRecordsFromDatabaseWithFilter(JQDataTableModel TObj)
         {
            // At this point you can call to your database to get the data
            // but I will just populate a sample collection in code
            

           // DAL.Security.UserAuthendication UA;
           // UIClasses.Const Const = new UIClasses.Const();
          //  UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            List<ExceptionTrack> exceptonList = null;
            try
            {
                exceptonList = new List<ExceptionTrack>();

                ExceptionTrack ETObj = new ExceptionTrack();
                //ETObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ETObj.StartIndex = TObj.Start;
                ETObj.EndIndex = TObj.Start + TObj.Length;
                ETObj.SearchText = TObj.Search.Value;
                ETObj.PageNumber = TObj.Draw;
                // ETObj.EndIndex = TObj.Length;
                ds = ETObj.GetAllErrorDetails();


                TObj.RecordsTotal = ETObj.TotalCount;
                if (ds.Tables[0].Rows.Count > 0)// 
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {

                        exceptonList.Add(new ExceptionTrack { ErrorID = Convert.ToString(dr["ErrorID"]), BoutiqueName = Convert.ToString(dr["BoutiqueName"]), Date = dr["Date"].ToString()=="" ? "" : DateCon(dr), Module = Convert.ToString(dr["Module"]), Method = Convert.ToString(dr["Method"]), ErrorSource = Convert.ToString(dr["ErrorSource"]), Version = Convert.ToString(dr["Version"]) });
                    }

                }
            }//end of try
            catch(Exception ex)
            {

            }
            finally
            {

            }
            return exceptonList;
        }//end of method
        

        private static string DateCon(DataRow drr)
        {
            var d = DateTime.Parse(drr["Date"].ToString()).Day.ToString();
            var m = DateTime.Parse(drr["Date"].ToString()).Month.ToString();
            var y = DateTime.Parse(drr["Date"].ToString()).Year.ToString();
            return d + "-" + m + "-" + y;
        }
    }
}
