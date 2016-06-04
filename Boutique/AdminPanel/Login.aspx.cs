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

namespace Boutique.AdminPanel
{
    public partial class Login : System.Web.UI.Page
    {
        UIClasses.Const constants = new UIClasses.Const();
        protected void Page_Load(object sender, EventArgs e)
        {
            string log = Request.QueryString["Session"];
            if (log == "Logout")
            {
                Session.Remove(constants.LoginSession);
                Session.Clear();
                Response.Redirect("Login.aspx");
            }
            if (IsPostBack)
            {

                if (username.Value.ToString().Trim() != "")
                {
                   

                  

                    DAL.Security.UserAuthendication UA = new DAL.Security.UserAuthendication(username.Value, password.Value);

                    if (UA.ValidUser)
                    {
                        if (Session[constants.LoginSession] != null)
                        {
                            Session.Remove(constants.LoginSession);
                        }

                        Session.Add(constants.LoginSession, UA);
                        if (UA.Role == constants.SuperAdministrator)
                        {
                            Response.Redirect(constants.SAHomePage);
                        }
                        else
                        {
                            Response.Redirect(constants.HomePage);
                        }
                    }

                    else
                    {
                        //lblmsg.Text = Messages.LoginFailed;
                        lblmsg.Text = "Login Failed";
                    }

                }
                else
                {
                    //lblmsg.Text = Messages.LoginFailed;
                    lblmsg.Text = "Login Failed";
                }


            }

        }
    }
}