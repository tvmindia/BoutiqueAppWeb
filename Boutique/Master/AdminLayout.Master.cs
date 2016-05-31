using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Boutique.DAL;

namespace Boutique.Master
{
    public partial class AdminLayout : System.Web.UI.MasterPage
    {

        DAL.Security.UserAuthendication UA;
        UIClasses.Const Const = new UIClasses.Const();

        protected void Page_Init(object sender, EventArgs e)
        {

            UA = (DAL.Security.UserAuthendication)Session[Const.LoginSession];

            if (UA == null)
            {
                Response.Redirect(Const.LoginPageURL);

            }
            AccessCheck();


        }



        protected void Page_Load(object sender, EventArgs e)
        {
            LoginName.Text = UA.userName;

        }


        public void AccessCheck()
        {

            //try
            //{

                string currRole = UA.Role;
                string currPage = Const.GetCurrentPageName(Request);
                string From = "?From=";
                string redirectURL = "";


                if (currRole == Const.Administrator)
                {
                    Li_SaDashBoard.Visible = false;

                    if (currPage.ToUpper() == Const.SaDashBoardPage.ToUpper() )
                    {
                        Response.Redirect(Const.LoginPage);

                    }                        

                }
                else if (currRole == Const.Manager)
                {
                    
                    Li_SaDashBoard.Visible = false;
                    Li_Category.Visible = false;
                    Li_Products.Visible = false;
                    Li_Notifications.Visible = false;
                    Li_LoyaltySettings.Visible = false;

                    currPage=currPage.ToUpper();

                    if (currPage == Const.SaDashBoardPage.ToUpper() || currPage == Const.CategoryPage.ToUpper() || currPage == Const.Products.ToUpper() || currPage == Const.NotificationsPage.ToUpper() || currPage == Const.LoyaltySettingsPage.ToUpper())
                    {
                        Response.Redirect(Const.LoginPage);
                      
                    }                                  

                }
                else
                {

                }


                //if (currRole.Count == 0) { Response.Redirect(Const.UnderConstruction;) }

                //if (currPage != Const.AccessDenied)
                //{
                //    if (currPage == Const.PatientPage) { }
                //    if (currPage == Const.TokenPage) { }
                //    if (currPage == Const.DoctorPage)
                //    {
                //        if (!currRole.Contains(Const.RoleDoctor))
                //        {
                //            From = From + Const.Doctor;
                //            redirectURL = Const.AccessDeniedURL + From;
                //        }
                //    }
                //    if (currPage == Const.PharmacyPage) { }
                //    if (currPage == Const.StockPage) { }
                //    if (currPage == Const.AdminPage)
                //    {
                //        if (!(currRole.Contains(Const.RoleDoctor) | currRole.Contains(Const.RoleAdministrator)))
                //        {
                //            From = From + Const.Admin;
                //            redirectURL = Const.AccessDeniedURL + From;
                //        }
                //    }
                //    if (currPage == Const.MasterPage)
                //    {
                //        if (!(currRole.Contains(Const.RoleAdministrator)))
                //        {
                //            From = From + Const.Admin;
                //            redirectURL = Const.AccessDeniedURL + From;
                //        }
                //    }



                //    if (redirectURL != "") { Response.Redirect(redirectURL, true); }



                //}

            //}
            //catch (Exception ex)
            //{

               
                //   Response.Redirect(Const.AccessDeniedURL);
            //}
        }
    }
}