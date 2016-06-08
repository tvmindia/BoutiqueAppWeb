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
        UIClasses.Const Const = new UIClasses.Const();
        DAL.Security.UserAuthendication UA;
       

        #region Events
        protected void Page_Load(object sender, EventArgs e)
        {

            UA = (DAL.Security.UserAuthendication)Session[Const.LoginSession];
            

            hdnBoutiqueID.Value = UA.BoutiqueID;

        }

        #endregion Events

       

        #region WebMethods
  

        #region BoutiqueID

        [System.Web.Services.WebMethod]
        public static string BoutiqueID()
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string B_ID = UA.BoutiqueID;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            return jsSerializer.Serialize(B_ID);

        }


        #endregion 

        #region SelectAllUsers
        [System.Web.Services.WebMethod]
        public static string SelectAllUsersByBoutiqueID(Users Usersobj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            Usersobj.BoutiqueID = UA.BoutiqueID;
            string jsonResult = null;
            DataSet ds = null;

            ds = Usersobj.SelectAllUsers();
            //
        

            //
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
        public static string SelectAllProductsByBoutiqueID( Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            productObj.BoutiqueID = UA.BoutiqueID;
            string jsonResult = null;
            DataSet ds = null;
           
            ds = productObj.GetAllProducts();
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
         public static string SelectAllNotificationsByBoutiqueID(Notification NotifyObj)
         {

             DAL.Security.UserAuthendication UA;
             UIClasses.Const Const = new UIClasses.Const();
             UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

             NotifyObj.BoutiqueID = UA.BoutiqueID;

             string jsonResult = null;
             DataSet ds = null;
             ds = NotifyObj.SelectAllNotifications();
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
         public static string SelectAllProductViewDetailsByBoutiqueID(Product productObj)
         {
             DAL.Security.UserAuthendication UA;
             UIClasses.Const Const = new UIClasses.Const();
             UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
             productObj.BoutiqueID = UA.BoutiqueID;

             string jsonResult = null;
             DataSet ds = null;
             
             ds = productObj.SelectAllProductViewDetails();
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
         public static string SelectAllProductOutOfStock(Product productObj)
         {
             DAL.Security.UserAuthendication UA;
             UIClasses.Const Const = new UIClasses.Const();
             UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
             productObj.BoutiqueID = UA.BoutiqueID;

             string jsonResult = null;
             DataSet ds = null;
            
             ds = productObj.SelectAllProductViewDetails();
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
         public static string SelectAllAppInstalled(AppInstallationLog AppIntallObj)
         {
             string jsonResult = null;
             DataSet ds = null;
             DAL.Security.UserAuthendication UA;
             UIClasses.Const Const = new UIClasses.Const();
             UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            
             AppIntallObj.BoutiqueID = UA.BoutiqueID;
             ds = AppIntallObj.GetAllAppInstallation();
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