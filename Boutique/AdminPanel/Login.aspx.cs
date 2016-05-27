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
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack)
            {

                if (username.Value.ToString().Trim() != "")
                {
                    UIClasses.Const constants = new UIClasses.Const();

                  

                    DAL.Security.UserAuthendication UA = new DAL.Security.UserAuthendication(username.Value, password.Value);

                    if (UA.ValidUser)
                    {
                    //    if (Session[constants.LoginSession] != null)
                    //    {
                    //        Session.Remove(constants.LoginSession);
                    //    }

                    //    Session.Add(constants.LoginSession, UA);
                    //    Response.Redirect(constants.HomePage);

                    }



                }
                else
                {

                    //lblmsg.Text = Messages.LoginFailed;
                }


            }

        }
    }
}