using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mail;
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
            if(UA.Role==Const.Manager)
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

        protected void SendEmail(object sender, EventArgs e)
        {
            string body = this.PopulateBody("" + "Anija",
                "" + "Boutique",
                "https://www.google.co.in/" +
                "Your Todays Deal.....",
                "" + "Offers",
                "https://ci5.googleusercontent.com/proxy/6y-FQARPH8tJQD62EWwrkebbdbfsFJyXdIFC_nRIqtB96RJizlM4KcN0A0EWze5jvlC4S1yLnMG92Z_CTG8L2A7EtRHcEQYPtiZTXo_yeRwFSjR3yqESQJXD87xtrx-dfZh0Rybcjs9OE3Bn0m-WGIdVVg5MZig1l7ZoMI0EHmd7=s0-d-e1-ft#http://i1.sdlcdn.com/static/img/marketing-mailers/mailer/2016/UserGrowth/manfashion25april/images/23new.jpg");
            this.SendHtmlFormattedEmail("anija.g@thrithvam.me;thomson.varkey@thrithvam.me", "TiqueInn Deal", body);
        }

        private string PopulateBody(string userName, string title, string url, string description, string MainimageUrl)
        {
            string imageUrl = "https://ci5.googleusercontent.com/proxy/cBgbcNE45Ik_XJgwpDGopRq1XIqU_HQLp3HgHLwVKh4-Yfap2wX1fSUTXvPNJaLttIsN1H8XvofjmLPIXqc122yl8_nO7wnuVrtDTNJ-5zZlHsD9CBNxpzFM1Utj570VnbbFgkNCwKi6kAjCKkEchyP1kGxJoVmdVIAcfwY=s0-d-e1-ft#http://i1.sdlcdn.com/static/img/marketing-mailers/mailer/2016/UserGrowth/manfashion25april/images/";
            string Url = "";


            Url = "EmailTemplate.htm";

            int imageCount = Convert.ToInt32(8);
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(Server.MapPath("~/" + Url)))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{UserName}", userName);
            body = body.Replace("{Title}", title);
            body = body.Replace("{Url}", url);
            body = body.Replace("{Description}", description);
            body = body.Replace("{Mainimage}", MainimageUrl);
            for (int i = 1; i <= imageCount; i++)
            {
                body = body.Replace("{image" + i + "}", imageUrl + i + ".jpeg");
            }
            return body;
        }

        private void SendHtmlFormattedEmail(string recepientEmail, string subject, string body)
        {
            using (MailMessage mailMessage = new MailMessage())
            {
                mailMessage.From = new MailAddress(ConfigurationManager.AppSettings["UserName"]);
                mailMessage.Subject = subject;
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = true;
                string[] multiEmail = recepientEmail.Split(';');
                foreach (string multipleMails in multiEmail)
                {
                    mailMessage.To.Add(new MailAddress(multipleMails));
                }

                SmtpClient smtp = new SmtpClient();
                smtp.Host = ConfigurationManager.AppSettings["Host"];
                smtp.EnableSsl = Convert.ToBoolean(ConfigurationManager.AppSettings["EnableSsl"]);
                System.Net.NetworkCredential NetworkCred = new System.Net.NetworkCredential();
                NetworkCred.UserName = ConfigurationManager.AppSettings["UserName"];
                NetworkCred.Password = ConfigurationManager.AppSettings["Password"];
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = int.Parse(ConfigurationManager.AppSettings["Port"]);
                smtp.Send(mailMessage);
            }
        }
    }

}