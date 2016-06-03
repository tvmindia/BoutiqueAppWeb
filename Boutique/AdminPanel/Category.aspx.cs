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
    public partial class Category : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region Methods

        #region GetAllCategories
        [System.Web.Services.WebMethod]
        public static string GetAllCategories(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetAllCategories();
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

            //Converting to Json
        }

        #endregion GetAllCategories

        #region GetAllCategoryIDandName
        [System.Web.Services.WebMethod]
        public static string GetAllCategoryIDandName(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if(UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetAllCategoryIDAndName();
                //Converting to Json
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                Dictionary<string, object> childRow;
                if(ds.Tables[0].Rows.Count > 0)
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
          
            //Converting to Json
        }

        #endregion GetAllCategoryIDandName

        #region GetCategory

        [System.Web.Services.WebMethod]
        public static string GetCategoryByCategoryCode(Product categoryObj)
        {
            DataSet ds = null;
            ds=categoryObj.GetCategory();

           // Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
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

          
          
            //Converting to Json
        }
        #endregion GetCategory

        #region InsertCategory
        [System.Web.Services.WebMethod]
        public static string InsertCategory(Product categoryObj)
        {
             string status=null;
             try
             {
                 if (categoryObj.CategoryCode != "")
                 {
                     status = categoryObj.InsertCategory().ToString();
                 }
              
             }
             catch(Exception)
             {

             }
             return status;
        }
        #endregion InsertCategory

        #region UpdateCategory
        [System.Web.Services.WebMethod]
        public static string UpdateCategory(Product categoryObj)
        {
            string status = null;
            try
            {
                status = categoryObj.EditCategory().ToString();

            }
            catch(Exception)
            {

            }
            return status;
        }
        #endregion UpdateCategory

        #region DeleteCategory

        [System.Web.Services.WebMethod]
        public static string DeleteCategory(Product categoryObj)
        {
            string status = null;
            try
            {
                status = categoryObj.DeleteCategory().ToString();

            }
            catch (Exception)
            {
                status = "500";//exception occur
            }
            return status;
        }
        #endregion DeleteCategory
        #endregion Methods

    }
}