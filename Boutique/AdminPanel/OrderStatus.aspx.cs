
#region CopyRight

//SHAMILA TP

#endregion CopyRight

#region Included Namespaces

using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

#endregion Included Namespaces

namespace Boutique.AdminPanel
{
    public partial class OrderStatus : System.Web.UI.Page
    {
        #region Methods

        //---------* Order 

        #region Get All UserID and Name
        [System.Web.Services.WebMethod]
        public static string GetAllUserIDandName(Users usrObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                usrObj.BoutiqueID = UA.BoutiqueID;

                DataSet ds = null;

                ds = usrObj.GetAllUserIDAndName();

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

        #endregion Get All UserID and Name

        //#region Get User Details

        //private string GetUserDetails()
        //{
        //    DataTable dt = tokenObj.GetSearchBoxData(); //Function call to get  Search BoxData
        //    StringBuilder output = new StringBuilder();
        //    output.Append("[");
        //    for (int i = 0; i < dt.Rows.Count; ++i)
        //    {
        //        output.Append("\"" + dt.Rows[i]["Name"].ToString() + "🏠📰 " + dt.Rows[i]["FileNumber"].ToString() + "|" + dt.Rows[i]["Address"].ToString() + "|" + dt.Rows[i]["Phone"].ToString() + "\"");
        //        if (i != (dt.Rows.Count - 1))
        //        {
        //            output.Append(",");
        //        }
        //    }
        //    output.Append("]");
        //    return output.ToString();
        //}
        //#endregion Get User Details

        #region Get All Orders
        /// <summary>
        /// To get all the order
        /// </summary>
        /// <param name="Boutiqueid"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetAllOrders(Order OrderObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            OrderObj.BoutiqueID = UA.BoutiqueID;

            string jsonResult = null;
            DataSet ds = null;

            ds = OrderObj.SelectAllOrders();

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
            }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;
        }

        #endregion  Get All Orders

        #region Get Order Details By OrderID
        /// <summary>
        /// To get specific order details by orderid for the editing purpose
        /// </summary>
        /// <param name="OrderID"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetOrderDetailsByOrderID(Order OrderObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            OrderObj.BoutiqueID = UA.BoutiqueID;

            string jsonResult = null;
            DataSet ds = null;
            ds = OrderObj.GetOrderDetailsByOrderID();

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
            }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult; //Converting to Json
        }
        #endregion Get Order Details By OrderID

        #region Add OR Edit Order
        /// <summary>
        /// If notification id is an empty string it will do inserting, otherwise updating
        /// </summary>
        /// <param name="OrderObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string InsertOrUpdateOrder(Order OrderObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            OrderObj.BoutiqueID = UA.BoutiqueID;
            OrderObj.CreatedBy = UA.userName;
            OrderObj.UpdatedBy = UA.userName;


            string status = null;
            try
            {
                if (OrderObj.OrderID == string.Empty || OrderObj.OrderID == null)
                {
                    status = OrderObj.InsertOrder().ToString();
                    status = OrderObj.OrderID.ToString();

                   

                }
                else
                {
                    status = OrderObj.UpdateOrderDetailsByOrderID().ToString();
                    status = OrderObj.OrderID.ToString();
                }

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(OrderObj);
            //return jsSerializer.Serialize(status);

            //return status;
        }
        #endregion Add OR Edit Order

        //--------END Order

        //--Closed Orders

        #region Get All Closed Orders
        /// <summary>
        /// To get all the order
        /// </summary>
        /// <param name="Boutiqueid"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetAllClosedOrders(Order OrderObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            OrderObj.BoutiqueID = UA.BoutiqueID;

            string jsonResult = null;
            DataSet ds = null;

            ds = OrderObj.SelectAllClosedOrders();

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
            }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;
        }

        #endregion  Get All Closed Orders

        //--Closed Orders

        //-------* Order Items

        #region Get Order Item Details By OrderID
        /// <summary>
        /// To get specific order details by orderid for the editing purpose
        /// </summary>
        /// <param name="OrderID"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetOrderItemDetailsByOrderID(Order OrderObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string jsonResult = null;
            DataSet ds = null;
            ds = OrderObj.GetOrderItemsByOrderID();

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
            }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult; //Converting to Json
        }
        #endregion Get Order Item Details By OrderID

        #region Delete an OrderItem
        /// <summary>
        /// To delete a orderitem by product id
        /// </summary>
        /// <param ></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string DeleteOrderItem(Order OrderObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string status = null;
            try
            {
                status = OrderObj.DeleteOrderItemByProductID().ToString();

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {

            }
            return status;
        }
        #endregion Delete an OrderItem

        #region Add  Order Item
        /// <summary>
        /// If notification id is an empty string it will do inserting, otherwise updating
        /// </summary>
        /// <param name="OrderObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string InsertOrderItem(Order OrderObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();



            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            OrderObj.CreatedBy = UA.userName;
            OrderObj.UpdatedBy = UA.userName;

            string status = null;
            try
            {
                status = OrderObj.InsertOrderItem().ToString();
                status = OrderObj.OrderID.ToString();
            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(status);
        }
        #endregion Add  Order Item

        #region Get Product Image
        /// <summary>
        /// To get product image by productID
        /// </summary>
        /// <param name="OrderID"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetProductImageByProductID(Order OrderObj)
        {
            Product prdctObj = new Product();

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();



            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            OrderObj.BoutiqueID = UA.BoutiqueID;
            prdctObj.BoutiqueID = UA.BoutiqueID;
            prdctObj.ProductID = OrderObj.ProductID;
            string ImgID = prdctObj.GetImageIDByProductID();

            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            return jsSerializer.Serialize(ImgID);


        }
        #endregion Get Product Image

        //--------END OrderItems

        //---------General Methods

        #region Add  Notification
        /// <summary>
        /// 
        /// </summary>
        /// <param name="notificationObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string InsertNotification(Notification notificationObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            notificationObj.BoutiqueID = UA.BoutiqueID;

            string status = null;
            try
            {
                DateTime strtDate = DateTime.Parse(notificationObj.StartDate);
                DateTime endDate = strtDate.AddDays(30);

               notificationObj.EndDate = endDate.Date.ToString();
               notificationObj.CreatedBy = UA.userName; 
                status = notificationObj.InsertNotification().ToString();

               
            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return status;
        }
        #endregion

        //---------END: General Methods

        //-------Email Notification Related

        #region Get User Details By UserID
        /// <summary>
        /// To get specific user details by userid
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetUserDetailsByUserID(Users UsrObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            UsrObj.BoutiqueID = UA.BoutiqueID;

            string jsonResult = null;
            DataSet ds = null;
            ds = UsrObj.GetUserDetailsByUserID();

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
            }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult; //Converting to Json
        }
        #endregion Get User Details By UserID

        #region  Send Mail

        /// <summary>
        /// To send email notification (email id is accessed by user id from client side)
        /// </summary>
        /// <param name="mailObj"></param>

        [System.Web.Services.WebMethod]
        public static  void SendMail(MailSending mailObj)
        {
            mailObj.msg = mailObj.msg;


            new Thread(delegate()
            {
                mailObj.MailSubject = "Order Confirmation";
                mailObj.SendEmail();
            }).Start(); 


           
            //mailObj.FormatAndSendEmail();
        }

        #endregion Send Mail

      


        #endregion Methods

        #region Events

        #region Page Load
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #endregion  Page Load

        #endregion Events

    }
}