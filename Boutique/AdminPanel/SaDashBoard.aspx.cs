using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Boutique.AdminPanel
{
    public partial class Boutique : System.Web.UI.Page
    {
        BoutiqueServices boutiqueObj = new BoutiqueServices();
        protected void Page_Load(object sender, EventArgs e)
        {

        }



        protected void NewBoutique_ServerClick(object sender, EventArgs e)
        {
            try
            {
                boutiqueObj.AppVersion = (txtAppVersion.Value.Trim() != "") ? txtAppVersion.Value.Trim() : null;
                boutiqueObj.Name = (txtBouquetName.Value.Trim() != "") ? txtBouquetName.Value.Trim() : null;
                boutiqueObj.StartedYear = (txtStartYear.Value.Trim() != "") ? txtStartYear.Value.Trim() : null;
                boutiqueObj.AboutUs = (txtAboutus.Value.Trim() != "") ? txtAboutus.Value.Trim() : null;
                boutiqueObj.Caption = (txtCaption.Value.Trim() != "") ? txtCaption.Value.Trim() : null;
                boutiqueObj.Location = (txtLocation.Value.Trim() != "") ? txtLocation.Value.Trim() : null;
                boutiqueObj.Address = (txtAddress.Value.Trim() != "") ? txtAddress.Value.Trim() : null;
                boutiqueObj.Phone = (txtPhone.Value.Trim() != "") ? txtPhone.Value.Trim() : null;
                boutiqueObj.Timing = (txtTimings.Value.Trim() != "") ? txtTimings.Value.Trim() : null;
                boutiqueObj.WorkingDays = (txtWorkingDays.Value.Trim() != "") ? txtWorkingDays.Value.Trim() : null;
                boutiqueObj.FbLink = (txtFacebooklink.Value.Trim() != "") ? txtFacebooklink.Value.Trim() : null;
                boutiqueObj.InstagramLink = (txtInstatgramlink.Value.Trim() != "") ? txtInstatgramlink.Value.Trim() : null;
                boutiqueObj.NewBoutique();
            }
            catch(Exception ex)
            {
                throw ex;

             }
             finally
            {

            }
        }
    }
}