﻿
#region CopyRight

//SHAMILA TP

#endregion CopyRight

#region Included Namespaces

using System;
using System.Collections.Generic;
using System.Configuration;
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
        public string MailSubject
        {
            get;
            set;
        }

        public string emailBody
        {
            get;
            set;
        }
        public string[] recepientEmail
        {
            get;
            set;
        }
        public string audienceType
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
        string port = System.Web.Configuration.WebConfigurationManager.AppSettings["Port"];

        #endregion   Public Variables

        #region Methods

        #region SendEmail

        public void SendEmail()
        {
            MailMessage Msg = new MailMessage();

            Msg.From = new MailAddress(EmailFromAddress);

            if (recepientEmail != null)
            {
                string[] multiEmail = recepientEmail;
                foreach (string multipleMails in multiEmail)
                {
                    //mailMessage.To.Add(new MailAddress(multipleMails));
                    Msg.To.Add(multipleMails);
                }
            }

            else
            {
                Msg.To.Add(new MailAddress(EmailID));
            }
                
          

            //string message = msg;
            Msg.Subject = MailSubject;
            Msg.Body = emailBody;
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

        public void PopulateBody(string userName, string title, string url, string description, string MainimageUrl)
        {
            string imageUrl = "http://www.tiquesinn.com/Media/NewsLetter/";
            string Url = "";

            Url = "BoutiqueTemplates/EmailTemplate.htm";

            int imageCount = Convert.ToInt32(8);
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/" + Url)))
            {
                body = reader.ReadToEnd();
            }
            //string fileName = HttpContext.Current.Server.MapPath("~/" + Url);
            //body = fileName;
            body = body.Replace("{UserName}", userName);
            body = body.Replace("{Title}", title);
            body = body.Replace("{Url}", url);
            body = body.Replace("{Description}", description);
            body = body.Replace("{Mainimage}", MainimageUrl);
            for (int i = 1; i <= imageCount; i++)
            {
                body = body.Replace("{image" + i + "}", imageUrl +"Tiquepic_"+i + ".jpeg");
            }
            emailBody = body;
            SendEmail();
        }

        public void SendHtmlFormattedEmail(string recepientEmail, string subject, string body)
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
        #endregion Methods
    }
}