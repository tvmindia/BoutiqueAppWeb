using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Text;


namespace Boutique.AdminPanel
{
    public partial class BugTracker : System.Web.UI.Page
    {
        DAL.Security.UserAuthendication UA;
        UIClasses.Const Const = new UIClasses.Const();
        protected void Page_Load(object sender, EventArgs e)
        {
            UA = (DAL.Security.UserAuthendication)Session[Const.LoginSession];
            if (UA == null)
            {
                Response.Redirect(Const.LoginPageURL);

            }
        }

        #region GetErrorDetailByErrorID
        [System.Web.Services.WebMethod]
        public static string GetErrorDetailByErrorID(ExceptionTrack ETObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA != null)
            {
                DataSet ds = null;
                ds = ETObj.GetErrorDetailByErrorID();
                //Converting to Json
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                Dictionary<string, object> childRow;
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        childRow = new Dictionary<string, object>();
                        foreach (DataColumn col in ds.Tables[0].Columns)
                        {
                            childRow.Add(col.ColumnName, row[col]);
                        }
                        parentRow.Add(childRow);
                    }
                }
                return jsSerializer.Serialize(parentRow);
            }
            return jsSerializer.Serialize("");
        }


        #endregion GetErrorDetailByErrorID

        #region GetAllErrorDetails
        [System.Web.Services.WebMethod]

        public static string GetAllErrorDetails(List<object> aoData)
        {
            //object aoData


            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            var sb = new StringBuilder();
            ExceptionTrack ETObj = null;
            if (UA != null)
            {
                ETObj = new ExceptionTrack();
                DataSet ds = null;
                ds = ETObj.GetAllErrorDetails();

                //Build Json
                var echo = 1;
                var iTotalRecords= 1;
                var iTotalDisplayRecords = 1;
                var hasMoreRecords = false;
               

                sb.Append(@"{" + "\"sEcho\": " + echo + ",");
               // sb.Append("\"recordsTotal\": " + records.Count + ",");
              //  sb.Append("\"recordsFiltered\": " + records.Count + ",");
                sb.Append("\"iTotalRecords\": " + iTotalRecords + ",");
                sb.Append("\"iTotalDisplayRecords\": " + iTotalDisplayRecords + ",");
                sb.Append("\"aoData\": [");

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    if (hasMoreRecords)
                    {
                        sb.Append(",");
                    }

                    sb.Append("[");
                    sb.Append("\"" + dr["BoutiqueName"].ToString() + "\",");
                    sb.Append("\"" + dr["UserName"].ToString() + "\",");
                    sb.Append("\"" + dr["Module"].ToString() + "\",");
                    sb.Append("\"" + dr["Method"].ToString() + "\",");
                    sb.Append("\"" + dr["ErrorSource"].ToString() + "\",");
                   // sb.Append("\"" + dr["Version"].ToString() + "\",");
                    //sb.Append("\"<img class='image-details' src='images/details-icon.png' runat='server' height='16' width='16' alt='View Details'/>\"");
                    sb.Append("]");
                    hasMoreRecords = true;
                }
                sb.Append("]}");
               






                //List<ExceptionTrack> ET = new List<ExceptionTrack>();
                //Converting to Json
                //List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                //Dictionary<string, object> childRow;
                //if (ds.Tables[0].Rows.Count > 0)
                //{
                //    foreach (DataRow row in ds.Tables[0].Rows)
                //    {
                //        childRow = new Dictionary<string, object>();
                //        foreach (DataColumn col in ds.Tables[0].Columns)
                //        {
                //            childRow.Add(col.ColumnName, row[col]);
                //        }
                //        parentRow.Add(childRow);
                //    }
                //}
                // return JsonConvert.SerializeObject(parentRow);

           
            //return JsonConvert.SerializeObject("");
            }
            return JsonConvert.SerializeObject(sb.ToString());
        }
        #endregion GetAllErrorDetails


        #region InsertErrorDetails

        [System.Web.Services.WebMethod]

        public static string InsertErrorDetails(ExceptionTrack ETObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                if (UA != null)
                {
                    if (UA.BoutiqueID != "")
                    {
                       
                        ETObj.CreatedBy = UA.userName;
                        ETObj.status = ETObj.InsertErrorDetails().ToString();
                    }
                }
                else
                {

                }
            }
            catch (Exception)
            {

            }
            return jsSerializer.Serialize(ETObj);
        }

        #endregion InsertErrorDetails

        #region UpdateErrorDetails
        [System.Web.Services.WebMethod]
        public static string UpdateErrorDetails(ExceptionTrack ETObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                if (UA != null)
                {
                    if (UA.BoutiqueID != "")
                    {
                       
                        ETObj.UpdatedBy = UA.userName;
                        ETObj.status = ETObj.UpdateErrorDetails().ToString();

                    }
                }
                else
                {

                }
            }
            catch (Exception)
            {

            }

            return jsSerializer.Serialize(ETObj);
        }
        #endregion UpdateErrorDetails




    }
}