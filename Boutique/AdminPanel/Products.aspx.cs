using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Boutique.AdminPanel
{
    public partial class Products : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }


        #region InsertProduct
        [System.Web.Services.WebMethod]
        public static string InsertProduct(Product productObj)
        {
            string status = null;
            try
            {
                if (productObj.BoutiqueID != "")
                {
                    status = productObj.InsertProduct().ToString();
                }

            }
            catch (Exception)
            {

            }
            return status;
        }
        #endregion InsertProduct





    }
}