using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boutique.UIClasses
{
    public class common
    {
    }
    public class Const
    {
        public string LoginSession
        {
            get
            {
                return "LoginDetails";

            }
        }
        public string LogoutSession
        {
            get
            {
                return "logout";

            }
        }
        public string LoginPageURL
        {
            get
            {
                return "../AdminPanel/Login.aspx";
            }
        }

        public string SAHomePage
        {
            get
            {
                return "../AdminPanel/SaDashBoard.aspx";
            }
        }
        public string HomePage
        {
            get
            {
                return "../AdminPanel/DashBoard.aspx";
            }
        }

    }
}