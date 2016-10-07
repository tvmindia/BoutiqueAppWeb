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
        public string NoItems
        {
            get
            {
                return "No items";
            }
        }
        public string SuccessfullActivation
        {
            get
            {
                return "User Account Successfully Activated";
            }
        }
        public string UnSuccessfullActivation
        {
            get
            {
                return "User Account Activation is UNSUCCESSFULL";
            }
        }
        public string Successfull
        {
            get
            {
                return "Successfull";
            }
        }
        public string UnSuccessfull
        {
            get
            {
                return "Unsuccessfull";
            }
        }


        #region PageUrl

        public string LoginPage
        {
            get
            {
                return "Login.aspx";
            }
        }                
        public string UnderConstructionPage
        {
            get
            {
                return "UnderConstruction.aspx";
            }
        }
        public string AccessDeniedPage
        {
            get
            {
                return "AccessDenied.aspx";
            }
        }
        public string SaDashBoardPage
        {
            get
            {
                return "SaDashBoard.aspx";
            }
        }
        public string CategoryPage
        {
            get
            {
                return "Category.aspx";
            }
        }
        public string DashBoardPage
        {
            get
            {
                return "DashBoard.aspx";
            }
        }
        public string LoyaltyPage
        {
            get
            {
                return "Loyalty.aspx";
            }
        }
        public string LoyaltySettingsPage
        {
            get
            {
                return "LoyaltySettings.aspx";
            }
        }
        public string NotificationsPage
        {
            get
            {
                return "Notifications.aspx";
            }
        }
        public string PeoplePage 
        {
            get
            {
                return "People.aspx";
            }
        }
        public string ProductFileUploadPage
        {
            get
            {
                return "ProductFileUpload.aspx";
            }
        }
        public string ProductsPage
        {
            get
            {
                return "Products.aspx";
            }
        }
        public string ProfilePage
        {
            get
            {
                return "Profile.aspx";
            }
        }
        
        #endregion #region PageUrl


        #region PagesName

        public string SaDashBoard
        {
            get
            {
                return "SaDashBoard";
            }
        }
        public string Category
        {
            get
            {
                return "Category";
            }
        }
        public string DashBoard
        {
            get
            {
                return "DashBoard";
            }
        }
        public string Loyalty
        {
            get
            {
                return "Loyalty";
            }
        }
        public string LoyaltySettings
        {
            get
            {
                return "LoyaltySettings";
            }
        }
        public string Notifications
        {
            get
            {
                return "Notifications";
            }
        }
        public string People
        {
            get
            {
                return "People";
            }
        }
        public string ProductFileUpload
        {
            get
            {
                return "ProductFileUpload";
            }
        }
        public string Products
        {
            get
            {
                return "Products";
            }
        }
        public string Profile
        {
            get
            {
                return "Profile";
            }
        }
        public string AccessDenied
        {
            get
            {
                return "AccessDenied";
            }
        }

        #endregion PagesName


        #region Roles

        public string Manager
        {
            get
            {
                return "Manager";
            }
        }
        public string SuperAdministrator
        {
            get
            {
                return "SuperAdmin";
            }
        }
        public string Administrator
        {
            get
            {
                return "Administrator";
            }
        }

        #endregion Roles



        public string GetCurrentPageName(HttpRequest Request)
        {
            string sPath = Request.Url.AbsolutePath;
            System.IO.FileInfo oInfo = new System.IO.FileInfo(sPath);
            string sRet = oInfo.Name;
            return sRet;
        }

//---* Order Status Notification * ---//
    //public string OrderReady
    //        {
    //            get
    //            {
    //                return "Your order is ready for pickUp";
    //            }
    //        }
    //public string OrderWithProducts
    //        {
    //            get
    //            {
    //                return "Order is placed with $ Products";
    //            }
    //        }
    // public string OrderWithOutProducts
    //        {
    //            get
    //            {
    //                return "Order with $ is placed";
    //            }
    //        }

    }
}