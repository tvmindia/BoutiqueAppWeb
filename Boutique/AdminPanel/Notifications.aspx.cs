using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Boutique.AdminPanel
{
    public partial class Notifications : System.Web.UI.Page
    {

        DAL.Security.UserAuthendication UA;
        UIClasses.Const Const = new UIClasses.Const();

        protected void Page_Load(object sender, EventArgs e)
        {

            UA = (DAL.Security.UserAuthendication)Session[Const.LoginSession];
            if (UA.Role == Const.Manager)
            {
                NewNotification.Visible = false;
            }

        }

        #region Add or edit Notification
        /// <summary>
        /// If notification id is an empty string it will do inserting, otherwise updating
        /// </summary>
        /// <param name="notificationObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string InsertNotification(Notification notificationObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            notificationObj.BoutiqueID = UA.BoutiqueID;
            notificationObj.UpdatedBy = UA.userName;
            notificationObj.CreatedBy = UA.userName;

            string status = null;
            try
            {
                if (notificationObj.NotificationID != "")
                {
                    status = notificationObj.UpdateNotification().ToString();
                }
                else
                {
                    status = notificationObj.InsertNotification().ToString();
                }

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return status;
        }
        #endregion

        #region Get All notifications
        /// <summary>
        /// To get all the notifications list for the table
        /// </summary>
        /// <param name="Boutiqueid"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetAllNotifications(Notification NotifyObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string jsonResult = null;
            DataSet ds = null;

            NotifyObj.BoutiqueID = UA.BoutiqueID;

            ds = NotifyObj.SelectAllNotifications();

            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if (ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in ds.Tables[0].Columns)
                    {
                        childRow.Add(col.ColumnName, row[col]);
                    }
                    parentRow.Add(childRow);
                }
                //childRow = new Dictionary<string, object>();
                //childRow.Add("Result", "Success");

                //parentRow.Add(childRow);
            }
            else
            {
                //childRow = new Dictionary<string, object>();
                //childRow.Add("Result", "Error");
                //parentRow.Add(childRow);
            }

            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;


            //Converting to Json
        }
        #endregion

        #region SelectAllNotificationsByBoutiqueID
        /// <summary>
        /// To get all the notifications list for the table
        /// </summary>
        /// <param name="Boutiqueid"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string SelectAllNotificationsByBoutiqueID(Notification NotifyObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string jsonResult = null;
            DataSet ds = null;

            NotifyObj.BoutiqueID = UA.BoutiqueID;

            ds = NotifyObj.SelectAllNotificationsBoutiqueID();

            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if (ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in ds.Tables[0].Columns)
                    {
                        childRow.Add(col.ColumnName, row[col]);
                    }
                    parentRow.Add(childRow);
                }
                //childRow = new Dictionary<string, object>();
                //childRow.Add("Result", "Success");

                //parentRow.Add(childRow);
            }
            else
            {
                //childRow = new Dictionary<string, object>();
                //childRow.Add("Result", "Error");
                //parentRow.Add(childRow);
            }

            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;


            //Converting to Json
        }
        #endregion

        #region GetNotificationbyID
        /// <summary>
        /// To get a specifica notification details for the editing purpose
        /// </summary>
        /// <param name="notificationObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetNotificationByID(Notification notificationObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            notificationObj.BoutiqueID = UA.BoutiqueID;

            string jsonResult = null;
            DataSet ds = null;
            ds = notificationObj.GetNotification();

            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if (ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in ds.Tables[0].Columns)
                    {
                        childRow.Add(col.ColumnName, row[col]);
                    }
                    parentRow.Add(childRow);
                }
            }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult; //Converting to Json
        }
        #endregion

        #region Delete a notification
        /// <summary>
        /// To delete a notification by notification id
        /// </summary>
        /// <param name="notificationObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string DeleteNotification(Notification notificationObj)
        {


            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            notificationObj.BoutiqueID = UA.BoutiqueID;

            string status = null;
            try
            {

                status = notificationObj.DeleteNotification().ToString();

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {

            }
            return status;
        }
        #endregion

        #region SendNotificationMail
        [System.Web.Services.WebMethod]
        public static void SendEmail(MailSending mailObj)
        {

            Notification notificObj = new Notification();
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            notificObj.BoutiqueID = UA.BoutiqueID;
            DataSet ds = null;
            mailObj.msg = mailObj.msg;
            if (mailObj.audienceType == "All")
            {
                ds = notificObj.GetAllEmailIdsToSendNewsLetterEmail();
                List<string> strDetailIDList = new List<string>();

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    strDetailIDList.Add(row["Email"].ToString());
                }
                mailObj.recepientEmail = strDetailIDList.ToArray();
            }
            HttpContext ctx = HttpContext.Current;

            new Thread(delegate()
            {
                HttpContext.Current = ctx;
                mailObj.PopulateBody("" + "Anija",
                "" + "Boutique",
                "https://www.google.co.in/" +
                "Your Todays Deal.....",
                "" + "Offers",
                "https://ci5.googleusercontent.com/proxy/6y-FQARPH8tJQD62EWwrkebbdbfsFJyXdIFC_nRIqtB96RJizlM4KcN0A0EWze5jvlC4S1yLnMG92Z_CTG8L2A7EtRHcEQYPtiZTXo_yeRwFSjR3yqESQJXD87xtrx-dfZh0Rybcjs9OE3Bn0m-WGIdVVg5MZig1l7ZoMI0EHmd7=s0-d-e1-ft#http://i1.sdlcdn.com/static/img/marketing-mailers/mailer/2016/UserGrowth/manfashion25april/images/23new.jpg");
                //mailObj.SendHtmlFormattedEmail("anija.g@thrithvam.me;thomson.varkey@thrithvam.me", "TiqueInn Deal", body);
            }).Start();


        }
        #endregion SendNotificationMail

        #region AddSelectedImageToHtmlTemplate
        [System.Web.Services.WebMethod]
        public static string AddSelectedImageToHtmlTemplate(Notification notificationObj)
        {
            string jsonResult = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            var body = notificationObj.PopulateBody("" + "Anija",
                "" + "Boutique",
                "https://www.google.co.in/" +
                "Your Todays Deal.....",
                "" + "Offers",
                "https://ci5.googleusercontent.com/proxy/6y-FQARPH8tJQD62EWwrkebbdbfsFJyXdIFC_nRIqtB96RJizlM4KcN0A0EWze5jvlC4S1yLnMG92Z_CTG8L2A7EtRHcEQYPtiZTXo_yeRwFSjR3yqESQJXD87xtrx-dfZh0Rybcjs9OE3Bn0m-WGIdVVg5MZig1l7ZoMI0EHmd7=s0-d-e1-ft#http://i1.sdlcdn.com/static/img/marketing-mailers/mailer/2016/UserGrowth/manfashion25april/images/23new.jpg");

            jsonResult = jsSerializer.Serialize(body);

            return jsonResult;
        }
        #endregion AddSelectedImageToHtmlTemplate

        #region GetAllTemplateNameAndID
        [System.Web.Services.WebMethod]
        public static string GetAllTemplateNameAndID(Notification notifyObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            ds = notifyObj.GetAllTemplateIDandName();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if (ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in ds.Tables[0].Columns)
                    {
                        childRow.Add(col.ColumnName, row[col]);
                    }
                    parentRow.Add(childRow);
                }
            }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult; //Converting to Json
        }
        #endregion GetAllTemplateNameAndID

        #region GetAllNewsLetterEmails
        [System.Web.Services.WebMethod]
        public static string GetAllNewsLetterEmails(Notification notifyObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            notifyObj.BoutiqueID = UA.BoutiqueID;
            string jsonResult = null;
            DataSet ds = null;
            ds = notifyObj.GetAllEmailIdsToSendNewsLetterEmail();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if (ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in ds.Tables[0].Columns)
                    {
                        childRow.Add(col.ColumnName, row[col]);
                    }
                    parentRow.Add(childRow);
                }
            }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult; //Converting to Json
        }
        #endregion GetAllNewsLetterEmails

        #region AddNesLetterMailTrackingDetails
        /// <summary>
        /// If notification id is an empty string it will do inserting, otherwise updating
        /// </summary>
        /// <param name="notificationObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string AddNesLetterMailTrackingDetails(Notification notificationObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            notificationObj.BoutiqueID = UA.BoutiqueID;
            notificationObj.UpdatedBy = UA.userName;
            notificationObj.CreatedBy = UA.userName;
            string status = null;
            DataSet ds = null;
            Product productObj = new Product();
            if (notificationObj.audienceMailType == "All")
            {
                ds = notificationObj.GetAllEmailIdsToSendNewsLetterEmail();
                List<string> strDetailIDList = new List<string>();

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    strDetailIDList.Add(row["Email"].ToString());
                }
                notificationObj.audienceMailIDs = strDetailIDList.ToArray();
            }
            try
            {
              
                    status = notificationObj.InsertNewsLetterTrackingDetails().ToString();
                foreach(string imgID in notificationObj.ImageIDs)
                {
                    productObj.ImageID = imgID;
                    byte[] ImgBack = productObj.GetProductImage();
                    string fileExtension = ".jpeg";
                    string str_image = imgID + fileExtension.Trim();
                    string filePath = HttpContext.Current.Server.MapPath("~/NewsLetterImages/" + str_image.Trim());
                    if (!System.IO.File.Exists(filePath))
                    {
                        System.IO.File.WriteAllBytes(filePath, ImgBack);
                    }
                }
            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return status;
        }
        #endregion AddNesLetterMailTrackingDetails

    }

}