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
    public partial class ProductReview : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region WebMethod

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
        #endregion BoutiqueID

        #region GetReviewDetails

        [System.Web.Services.WebMethod]
        public static string GetReviewDetails()
        {
            DAL.Product ProductObj = new DAL.Product();
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();           
            DataSet ds = null;
            ProductObj.BoutiqueID = UA.BoutiqueID.ToString();
            ds = ProductObj.GetAllProductsReviews();

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

        #endregion GetReviewDetails

        #region GetReviewCountforBubble

        [System.Web.Services.WebMethod]
        public static string GetReviewCountforBubble()
        {
            DAL.Product ProductObj = new DAL.Product();
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DataSet ds = null;
            ProductObj.BoutiqueID = UA.BoutiqueID.ToString();
            ds = ProductObj.GetAllProductsReviews();

            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;

            if (ds.Tables[1].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[1].Rows)
                {
                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in ds.Tables[1].Columns)
                    {
                        childRow.Add(col.ColumnName, row[col]);
                    }
                    parentRow.Add(childRow);
                }
            }
            return jsSerializer.Serialize(parentRow);

        }

        #endregion GetReviewCountforBubble

        #region GetReviewDetailOnID

        [System.Web.Services.WebMethod]
        public static string GetReviewDetailOnID(DAL.Product ReviewObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                ReviewObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = ReviewObj.GetReviewDetailsWithID();

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

        #endregion GetReviewDetailOnID

        #region UpdateReviewModatate

        [System.Web.Services.WebMethod]
        public static void UpdateReviewModatate(DAL.Product ProductObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                ProductObj.BoutiqueID = UA.BoutiqueID;
                ProductObj.CreatedBy = UA.userName;
                ProductObj.UpdateReviewIsModarate();


            }
        }

        #endregion UpdateReviewModatate

        #region UpdateReviewCancelled

        [System.Web.Services.WebMethod]
        public static void UpdateReviewCancelled(DAL.Product ProductObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                ProductObj.BoutiqueID = UA.BoutiqueID;
                ProductObj.CreatedBy = UA.userName;
                ProductObj.UpdateReviewCancelled();


            }
        }

        #endregion UpdateReviewModatate
        #endregion WebMethod
    }
}