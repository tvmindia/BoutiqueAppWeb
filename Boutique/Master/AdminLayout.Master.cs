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
using System.Web.UI.HtmlControls;

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
            lblBoutiqueName.Text = UA.Boutique;
            lblBoutique.Text = UA.Boutique;
            imgLogo.ImageUrl = "../ImageHandler/ImageServiceHandler.ashx?BoutiqueLogoID=" + UA.BoutiqueID;
            AccessCheck();
            
            if(UA.Role==Const.SuperAdministrator)
            {
                Boutiques BouObj = new Boutiques();
                LITiquesList.Visible = true;
                DataSet ds = new DataSet();
                ds=BouObj.GetAllBoutiques();
                foreach(DataRow dr in ds.Tables[0].Rows)
                {
                    HtmlGenericControl liElement = new HtmlGenericControl("li");
                    BoutiqueList.Controls.Add(liElement);
                    HtmlGenericControl anchor = new HtmlGenericControl("a");
                    anchor.Attributes.Add("href", "../AdminPanel/SaDashBoard.aspx?Session="+dr["BoutiqueID"].ToString());
                    anchor.InnerHtml = ""+dr["Name"].ToString();
                    liElement.Controls.Add(anchor);

                }
                
                
            }

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
                    Li_BugTrack.Visible = false;

                    if (currPage.ToUpper() == Const.SaDashBoardPage.ToUpper() )
                    {
                      
                        Response.Redirect(Const.LoginPage);

                    }                        

                }
                else if (currRole == Const.Manager)
                {
                    
                    Li_SaDashBoard.Visible = false;
                    Li_BugTrack.Visible = false;
                    Li_Category.Visible = false;
                    //Li_Products.Visible = false;
                    //Li_Notifications.Visible = false;
                    Li_LoyaltySettings.Visible = false;
                    //Li_People.Visible = false;
                    //Li_Profile.Visible = false;

                    currPage=currPage.ToUpper();

                    if (currPage == Const.SaDashBoardPage.ToUpper() || currPage == Const.CategoryPage.ToUpper() || currPage == Const.LoyaltySettingsPage.ToUpper() ) // ||currPage==Const.PeoplePage.ToUpper()||currPage==Const.ProfilePage.ToUpper()
                    { 
                        Response.Redirect(Const.LoginPage);                      
                    }                                  

                }
                else
                {

                }
            string  menuList = System.Configuration.ConfigurationManager.AppSettings["DisableMenu"];
            if (!String.IsNullOrEmpty(menuList))
            {
                string[] values = menuList.Split(',');
                for (int i = 0; i < values.Length; i++)
                {

                    if (values[i] == "SA Dashboard")
                    {
                        Li_SaDashBoard.Visible = false;
                    }
                    else if (values[i] == "Dashboard")
                    {
                        Li_DashBoard.Visible = false;
                    }
                    else if (values[i] == "Profile")
                    {
                        Li_Profile.Visible = false;
                    }
                    else if (values[i] == "People")
                    {
                        Li_People.Visible = false;
                    }
                    else if (values[i] == "Category")
                    {
                        Li_Category.Visible = false;
                    }
                    else if (values[i] == "Products")
                    {
                        Li_Products.Visible = false;
                    }
                    else if (values[i] == "Products Review")
                    {
                        Li_ProductReview.Visible = false;
                    }
                    else if(values[i] == "Notifications")
                    {
                        Li_Notifications.Visible = false;
                    }
                    else if(values[i] == "NewsLetter")
                    {
                        Li_NewsLetter.Visible = false;
                    }
                    else if (values[i] == "Loyalty")
                    {
                        Li_Loyalty.Visible = false;
                    }
                    else if(values[i] == "Loyalty Setting")
                    {
                        Li_LoyaltySettings.Visible = false;
                    }
                    else if(values[i] == "Manage Orders")
                    {
                        Li_OrderStatus.Visible = false;
                    }
                    else if (values[i] == "Bug Tracker")
                    {
                        Li_BugTrack.Visible = false;
                    }
                   

                }
            }
            else
            {
                // Key doesn't exist
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