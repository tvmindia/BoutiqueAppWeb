using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

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
                ETObj.BoutiqueID = UA.BoutiqueID;
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
       
        public static string GetAllErrorDetails()
        {
          //  var echo = int.Parse(HttpContext.Current.Request.Params["sEcho"]);
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            ExceptionTrack ETObj=null;
            if (UA != null)
            {
                ETObj = new ExceptionTrack();
             
                DataSet ds = null;
                ds = ETObj.GetAllErrorDetails();
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