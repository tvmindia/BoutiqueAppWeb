
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