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
    public partial class LoyaltySettings : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region Update Loyalty Settings
        /// <summary>
        /// Saving loyalty settings
        /// </summary>
        /// <param name="loyaltyObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string UpdateLoyaltySettings(DAL.Loyalty loyaltyObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            loyaltyObj.BoutiqueID = UA.BoutiqueID;
            string status = null;
            try
            {
                if (loyaltyObj.BoutiqueID != "" && loyaltyObj.MoneyValuePercentage>0 && loyaltyObj.MoneyValuePercentage<=100
                            && loyaltyObj.MinAmountForRedeem>=0 && loyaltyObj.MaxDiscountPercentage>0 && loyaltyObj.MaxDiscountPercentage<=100)
                {
                    status = loyaltyObj.UpdateLoyaltySettings().ToString();
                }
                else
                {
                    status = "-1";
                }

            }
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "LoyaltySettings";
                ETObj.Method = "UpdateLoyaltySettings";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            finally
            {
            }
            return status;
        }
        #endregion

        #region Get Loyalty Log
        /// <summary>
        /// To get all the loyalty log details of this boutique
        /// </summary>
        /// <param name="Boutiqueid"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetLoyaltyLog(DAL.Loyalty loyaltyObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            loyaltyObj.BoutiqueID = UA.BoutiqueID;
            string status = null;
            string jsonResult = null;
            DataSet ds = new DataSet();
            try
            {
                ds.Tables.Add(loyaltyObj.GetLoyaltyLog());

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
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "LoyaltySettings";
                ETObj.Method = "GetLoyaltyLog";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsonResult;
        }
        #endregion

        #region Set Loyalty Settings To Default
        [System.Web.Services.WebMethod]
        public static string SetLoyaltySettingsToDefault(DAL.Loyalty loyalObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            string status = null;
          
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            try
            {
                if (UA != null)
                {
                    loyalObj.BoutiqueID = UA.BoutiqueID;
                    loyalObj.UpdatedBy = UA.userName;
                    status = loyalObj.SetLoyaltySettingsToDefault().ToString();
                }
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "LoyaltySettings";
                ETObj.Method = "SetLoyaltySettingsToDefault";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return status;

        }
        #endregion Set Loyalty Settings To Default
    }
}