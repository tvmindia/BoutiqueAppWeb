
#region CopyRight

//SHAMILA TP

#endregion CopyRight

#region Included Namespaces

using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
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
                }
                else
                {
                    status = OrderObj.UpdateOrderDetailsByOrderID().ToString();
                }

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
        #endregion Add OR Edit Order

//--------END Order

//-------* Order Items

        #region Get Order Details By OrderID
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
        #endregion Get Order Details By OrderID

        #region Delete a notification
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
        #endregion

//--------END OrderItems

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