using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Boutique.General
{
    public partial class UnderConstruction : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Request.Params["cause"].ToString() != null)
                {
                    if (Request.Params["cause"].ToString() == "dbDown")
                    {
                        lblmsg.Text = "Oh ...  It looks the Database is Down......... !!           Contact DB Admin";
                    }
                    else
                        if (Request.Params["cause"].ToString() == "accessdenied")
                        {
                            lblmsg.Text = "Acesss Denied....!!!!";
                        }
                }
            }
            catch (Exception) 
            {
            }
            finally
            {

            }
        }
    }
}