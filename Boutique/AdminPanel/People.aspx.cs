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
        #region DeleteOwner
        [System.Web.Services.WebMethod]
        public static string DeleteOwner(Owners ownersObj)
        {
            string status = null;
            try
            {

              status=ownersObj.DeleteOwner().ToString();
              
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
     
        #endregion DeleteOwner

        #region NewOwner
        [System.Web.Services.WebMethod]
        public static string InsertOwner(Owners ownersObj)
        {
            string status = null;
            try
            {

                if (ownersObj.OwnerID != null)
                {
                    status = ownersObj.UpdateOwner().ToString();
                   
                }
                else
                {
                    status = ownersObj.InsertOwner().ToString();
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
        #endregion NewOwner
        #region GetOwner
        [System.Web.Services.WebMethod]
        public static string GetOwner(Owners ownersObj)
        {
            DataTable dt= null;
            dt = ownersObj.GetOwner();
            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        childRow.Add(col.ColumnName, row[col]);
                    }
                    parentRow.Add(childRow);
                }

            }


            return jsSerializer.Serialize(parentRow);




            //Converting to Json
        }
        #endregion GetOwner

        #region GetUser
        [System.Web.Services.WebMethod]
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
        #endregion GetUser

        #region UserDeletion
        [System.Web.Services.WebMethod]
        public static string DeleteUser(Users userObj)
        {
            string status = null;
            try
            {
                status = userObj.DeleteUser().ToString();
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
       #endregion UserDeletion

        #region GetAllOwners
        [System.Web.Services.WebMethod]
        public static string GetAllOwners(string Boutiqueid)
        {
            DataTable dt = null;
            Owners ownersObj = new Owners();
            ownersObj.BoutiqueID = Boutiqueid;
            dt = ownersObj.GetAllOwners();
            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        childRow.Add(col.ColumnName, row[col]);
                    }
                    parentRow.Add(childRow);
                }
            }
            return jsSerializer.Serialize(parentRow);
            //Converting to Json
        }
        #endregion GetAllOwners
    }
}