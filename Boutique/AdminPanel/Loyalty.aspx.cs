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
    public partial class Loyalty : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }


        #region Get All Users
        /// <summary>
        /// To get all the user list for the table
        /// </summary>
        /// <param name="Boutiqueid"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetAllUsers(Users Usersobj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            Usersobj.BoutiqueID = UA.BoutiqueID;

            string jsonResult = null;
            DataSet ds = null;

            ds = Usersobj.SelectAllUsers();

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
        #endregion

        #region Get loyalty settings
        /// <summary>
        /// To get loyalty settings of a boutique
        /// </summary>
        /// <param name="Boutiqueid"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetLoyaltySettings(DAL.Loyalty loyaltyObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            loyaltyObj.BoutiqueID = UA.BoutiqueID;
            string jsonResult = null;
            DataSet ds = new DataSet();          
           
            ds.Tables.Add(loyaltyObj.GetLoyaltySettings());

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
        #endregion

        #region Select a User
        /// <summary>
        /// To get a specific user details
        /// </summary>
        /// <param name="userObj">user object with UserID and BoutiqueID</param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetUserByID(Users userObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            userObj.BoutiqueID = UA.BoutiqueID;

            string jsonResult = null;
            DataSet ds = null;
            ds = userObj.SelectUserByUserID();

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
        #endregion

        #region Save transaction
        /// <summary>
        /// Calculating loyalty and saving it
        /// </summary>
        /// <param name="loyaltyObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string MakeTransaction(DAL.Loyalty loyaltyObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            loyaltyObj.BoutiqueID = UA.BoutiqueID;
            string status = null;
            try
            {               
                 int purchaseAmount=loyaltyObj.purchaseAmount;
                //Getting loyalty settings
                 DataTable loyaltySettings = loyaltyObj.GetLoyaltySettings();
                 int MONEY_TO_POINT_VALUE = Int32.Parse(loyaltySettings.Rows[0]["MoneyToPoint"].ToString());
                 int MIN_AMOUNT_TO_REDEEM = Int32.Parse(loyaltySettings.Rows[0]["MinAmountForRedeem"].ToString());
                 int MAX_DISCOUNT_PERCENTAGE = Int32.Parse(loyaltySettings.Rows[0]["MaxDiscountPercentage"].ToString());
                //Getting Loyalty points of user
                 Users userObj = new Users();
                 userObj.BoutiqueID = UA.BoutiqueID;
                 userObj.UserID = loyaltyObj.UserID;
                 DataSet ds = userObj.SelectUserByUserID();
                 int loyaltypoints = Int32.Parse((ds.Tables[0].Rows[0]["LoyaltyPoints"]== DBNull.Value) ? "0" : ds.Tables[0].Rows[0]["LoyaltyPoints"].ToString());
                 
                //Points Calculations 
                 int pointsFromThisPurchase = purchaseAmount * MONEY_TO_POINT_VALUE / 100;
                 int totalPoints = loyaltypoints + pointsFromThisPurchase;
                 int Points;
                 if(loyaltyObj.Redeem){
                                     int redeemablePoints;
                                     if (purchaseAmount >= MIN_AMOUNT_TO_REDEEM)                    //minimum purchase amount should be satisfied
                                     {
                                         int max = purchaseAmount * MAX_DISCOUNT_PERCENTAGE / 100;  //maximum discountable amount
                                         if (loyaltypoints >= max)
                                         {
                                             redeemablePoints = max;                                //Avoiding debiting poits more that maximum discountable
                                         }
                                         else
                                         {
                                             redeemablePoints = loyaltypoints;                      //Debiting full loyalty points
                                         }
                                     }
                                     else
                                     {
                                         redeemablePoints = 0;
                                     }
                         Points = totalPoints - redeemablePoints;
                         loyaltyObj.Amount=purchaseAmount - redeemablePoints;                       //Discounting
                         loyaltyObj.DebitPoints = redeemablePoints;
                 }
                 else{//Withount Discounting
                         Points = totalPoints;
                         loyaltyObj.Amount = purchaseAmount;                            
                         loyaltyObj.DebitPoints = 0;
                 }
                //Inserting ponits to database
                 loyaltyObj.CreditPoints = pointsFromThisPurchase;
                 loyaltyObj.Points = Points;
                 loyaltyObj.MoneyValuePercentage = MONEY_TO_POINT_VALUE;

                 loyaltyObj.LoyaltyCardNo = ds.Tables[0].Rows[0]["LoyaltyCardNo"].ToString();
                
                        status = loyaltyObj.UpdateLoyaltyPoints().ToString();               

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
    }
}