using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Boutique.AdminPanel
{
    public partial class SaDashBoard : System.Web.UI.Page
    {
        Boutiques boutiqueObj = new Boutiques();
        Users userObj = new Users();
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

        protected void NewAdmin_ServerClick(object sender, EventArgs e)
        {
            try
            {
                userObj.Name = (txtUserName.Value.Trim() != "") ? txtUserName.Value.Trim() : null;
                userObj.Mobile = (txtMobile.Value.Trim() != "") ? txtMobile.Value.Trim() : null;
                userObj.Email = (txtUserEmail.Value.Trim() != "") ? txtUserEmail.Value.Trim() : null;
                userObj.IsActive = (chkActive.Checked != true) ? false : true;
                userObj.IsAdmin = (chkIsAdmin.Checked != true) ? false : true;
                userObj.BoutiqueID = "470a044a-4dba-4770-bca7-331d2c0834ae";
                userObj.AddNewUser();

                //userObj.DOB = (dateDOB.Value.Trim() != "") ? DateTime.Parse(dateDOB.Value.ToString()) : DateTime.Parse(null);//
                //userObj.Anniversary = (dateAnniversary.Value.Trim() != "") ? DateTime.Parse(dateAnniversary.Value.ToString()) : DateTime.Parse(null);//check
                //// dateFormat: 'dd-mm-yy'
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
        }
    }
}