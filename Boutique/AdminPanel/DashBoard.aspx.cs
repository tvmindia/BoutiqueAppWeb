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
    public partial class DashBoard : System.Web.UI.Page
    {

        #region Events
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #endregion Events

        #region WebMethods
        #region SelectAllUsers
        [System.Web.Services.WebMethod]
        public static string SelectAllUsersByBoutiqueID(string Boutiqueid)
        {
            string jsonResult = null;
            DataSet ds = null;
            Users userObj = new Users();
            ds = userObj.SelectAllUsers(Boutiqueid);

            //Converting to Json
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
                //childRow = new Dictionary<string, object>();
                //childRow.Add("Result", "Success");

                //parentRow.Add(childRow);
            }
            else
            {
                //childRow = new Dictionary<string, object>();
                //childRow.Add("Result", "Error");
                //parentRow.Add(childRow);
            }

            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;


            //Converting to Json
        }


          #endregion SelectAllUsers

        #region SelectAllProducts
         [System.Web.Services.WebMethod]
        public static string SelectAllProductsByBoutiqueID(string Boutiqueid)
        {
            string jsonResult = null;
            DataSet ds = null;
            Product productObj = new Product();
            ds = productObj.GetAllProducts(Boutiqueid);
            //Converting to Json
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
                //childRow = new Dictionary<string, object>();
                //childRow.Add("Result", "Success");
                //parentRow.Add(childRow);
            }
            else
            {
                //childRow = new Dictionary<string, object>();
                //childRow.Add("Result", "Error");
                //parentRow.Add(childRow);
            }
            jsonResult = jsSerializer.Serialize(parentRow);
            return jsonResult;
           //Converting to Json 
        }
        #endregion SelectAllProducts


        #region SelectAllNotifications

         [System.Web.Services.WebMethod]
         public static string SelectAllNotificationsByBoutiqueID(string Boutiqueid)
         {
             string jsonResult = null;
             DataSet ds = null;
             Notification notificationObj = new Notification();
             ds = notificationObj.SelectAllNotifications(Boutiqueid);
             //Converting to Json
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
                 //childRow = new Dictionary<string, object>();
                 //childRow.Add("Result", "Success");

                 //parentRow.Add(childRow);
             }
             else
             {
                 //childRow = new Dictionary<string, object>();
                 //childRow.Add("Result", "Error");
                 //parentRow.Add(childRow);
             }

             jsonResult = jsSerializer.Serialize(parentRow);

             return jsonResult;


             //Converting to Json
         }
        #endregion SelectAllNotifications


        #region SelectAllProductViewDetails
         [System.Web.Services.WebMethod]
         public static string SelectAllProductViewDetailsByBoutiqueID(string Boutiqueid)
         {
             string jsonResult = null;
             DataSet ds = null;
             Product productObj = new Product();
             ds = productObj.SelectAllProductViewDetails(Boutiqueid);
             //Converting to Json
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
                 //childRow = new Dictionary<string, object>();
                 //childRow.Add("Result", "Success");

                 //parentRow.Add(childRow);
             }
             else
             {
                 //childRow = new Dictionary<string, object>();
                 //childRow.Add("Result", "Error");
                 //parentRow.Add(childRow);
             }

             jsonResult = jsSerializer.Serialize(parentRow);

             return jsonResult;


             ////Converting to Json
         }

        #endregion SelectAllProductViewDetails

        #region SelectAllProductOutOfStock
         [System.Web.Services.WebMethod]
         public static string SelectAllProductOutOfStock(string Boutiqueid)
         {
             string jsonResult = null;
             DataSet ds = null;
             Product productObj = new Product();
             ds = productObj.SelectAllProductViewDetails(Boutiqueid);
             //Converting to Json
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
                 //childRow = new Dictionary<string, object>();
                 //childRow.Add("Result", "Success");

                 //parentRow.Add(childRow);
             }
             else
             {
                 //childRow = new Dictionary<string, object>();
                 //childRow.Add("Result", "Error");
                 //parentRow.Add(childRow);
             }

             jsonResult = jsSerializer.Serialize(parentRow);

             return jsonResult;


             ////Converting to Json
         }
        #endregion SelectAllProductOutOfStock

        #region SelectAllAppInstalled
         [System.Web.Services.WebMethod]
         public static string SelectAllAppInstalled(string Boutiqueid)
         {
             string jsonResult = null;
             DataSet ds = null;
            // Product productObj = new Product();
             //ds = productObj.(Boutiqueid);
             //Converting to Json
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
                 //childRow = new Dictionary<string, object>();
                 //childRow.Add("Result", "Success");

                 //parentRow.Add(childRow);
             }
             else
             {
                 //childRow = new Dictionary<string, object>();
                 //childRow.Add("Result", "Error");
                 //parentRow.Add(childRow);
             }

             jsonResult = jsSerializer.Serialize(parentRow);

             return jsonResult;


             ////Converting to Json
         }
        #endregion SelectAllAppInstalled

        #endregion WebMethods



    }
}