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
    public partial class People : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        #region GetAllBoutiques
        public static string GetUser(Users userobj)
        {
            DataSet ds = null;
            ds = userobj.SelectUserByUserID();
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


            return jsSerializer.Serialize(parentRow);

            


            //Converting to Json
        }
        #endregion GetAllBoutiques




    }
}