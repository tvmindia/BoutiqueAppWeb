
#region CopyRight

//SHAMILA TP

#endregion CopyRight

#region Included Namespaces

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Web;

using System.Web.Script.Serialization;

#endregion Included Namespaces

namespace Boutique.DAL
{
    public class MailSending
    {
        #region Global Variables
        public string EmailID
        {
            get;
            set;
        }

        public string msg
        {
            get;
            set;
        }

        #endregion Global Variables

        #region Public Variables

        //---* Keys assosiated with mail sending.its values are set in web.config ,app settings section -- *//

        string EmailFromAddress = System.Web.Configuration.WebConfigurationManager.AppSettings["EmailFromAddress"];
        string host = System.Web.Configuration.WebConfigurationManager.AppSettings["SMTP-host"];
        string smtpUserName = System.Web.Configuration.WebConfigurationManager.AppSettings["SMTP-UserName"];
        string smtpPassword = System.Web.Configuration.WebConfigurationManager.AppSettings["SMTP-Password"];
        string Subject = System.Web.Configuration.WebConfigurationManager.AppSettings["OrderStatusSubject"];
        string port = System.Web.Configuration.WebConfigurationManager.AppSettings["Port"];

        #endregion   Public Variables

        #region Methods

        #region SendEmail

        public void SendEmail()
        {
            MailMessage Msg = new MailMessage();

            Msg.From = new MailAddress(EmailFromAddress);

            Msg.To.Add(EmailID);

            string message = msg;
            Msg.Subject = Subject;
            Msg.Body = message;
            Msg.IsBodyHtml = true;

            // your remote SMTP server IP.
            SmtpClient smtp = new SmtpClient();
            smtp.Host = host;
            smtp.Port = Convert.ToInt32(port);
            smtp.Credentials = new System.Net.NetworkCredential(smtpUserName, smtpPassword);
            smtp.EnableSsl = true;
            smtp.Send(Msg);
            Msg = null;
        }


        #endregion SendEmail

        #region Format And Send Email

        public void FormatAndSendEmail()
        {
            string Url = "";

            Url = "Home/mailTemplates/OrderStatusEmail.html";

            string body = string.Empty;
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/" + Url)))
            {
                body = reader.ReadToEnd();
            }

            msg = msg + body;
            SendEmail();
        }

        #endregion Format And Send Email


        #endregion Methods
    }
}