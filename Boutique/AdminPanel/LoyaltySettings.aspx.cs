using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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