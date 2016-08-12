
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
using System.Text;
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
        public string mailNewsLetterID
        {
            get;
            set;
        }

        public string UsrName
        {
            get;
            set;
        }
        public string OrderNo
        {
            get;
            set;
        }
        public string TotalPrice
        {
            get;
            set;
        }
        public string Mobile
        {
            get;
            set;
        }
        public string OrderDate
        {
            get;
            set;
        }

        public string ProductNames
        {
            get;
            set;
        }
        public string BoutiqueID
        {
            get;
            set;
        }
        public string Boutique
        {
            get;
            set;
        }
        public string BugTrackerstatus
        {
            get;
            set;
        }
        public string BugTrackerVersion
        {
            get;
            set;
        }
        public string BugTrackerUserID
        {
            get;
            set;
        }
        public string BugTrackerCreatedBy
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
            try
            {
                MailMessage Msg = new MailMessage();

                Msg.From = new MailAddress(EmailFromAddress,Boutique);

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
            catch(Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "MailSending";
                ETObj.Method = "SendEmail";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
            }
        }

        #endregion SendEmail

        #region Format And Send Email

        public void FormatAndSendEmail()
        {
            try
            {
                string Url = "";

                Url = "Home/mailTemplates/OrderStatusEmail.html";

                string body = string.Empty;
                using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/" + Url)))
                {
                    body = reader.ReadToEnd();
                }

                body = body.Replace("{UserName}", UsrName);
                body = body.Replace("{OrderNo}", OrderNo);
                body = body.Replace("{OrderDate}", OrderDate);
                body = body.Replace("{TotalPrice}", TotalPrice);
                body = body.Replace("{Mobile}", Mobile);
                body = body.Replace("{msg}", msg);

                StringBuilder html = new StringBuilder();

                if (ProductNames != "" && ProductNames != null)
                {
                    string[] prdctDetails = ProductNames.Split('|');

                    html.Append("<tr><th>Product</th><th>Remarks</th></tr>");

                    for (int i = 0; i < prdctDetails.Length; i++)
                    {
                        if (prdctDetails[i] != "")
                        {
                            string[] Columns = prdctDetails[i].Split('$');

                            html.Append("<tr><td>" + Columns[0] + "</td><td>" + Columns[1] + "</td></tr>");

                        }
                    }
                }

                else
                {
                    html.Append("<p>No products</p>");
                }

                string HTML = html.ToString();
                body = body.Replace("{products}", HTML);

                emailBody = body;
                SendEmail();
            }
            catch(Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "MailSending";
                ETObj.Method = "FormatAndSendEmail";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
            }
        }

        #endregion Format And Send Email

        #region PopulateBody
        public int PopulateBody()
        {
            try
            {
                NewsLetters newsObj = new NewsLetters();
                string imageUrl = "http://tiquesinn.com/NewsLetterImages/";
                string Url, logourl = "";
                newsObj.NewsLetterID = mailNewsLetterID;
                newsObj.BoutiqueID = BoutiqueID;
                newsObj.GetAllNewsLetterDetails();
                Url = newsObj.templateFile;
                recepientEmail = newsObj.audienceMailIDs;
                //  int imageCount = Convert.ToInt32(8);
                string body = string.Empty;
                using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/" + Url)))
                {
                    body = reader.ReadToEnd();
                }
                //string fileName = HttpContext.Current.Server.MapPath("~/" + Url);
                //body = fileName;
                string header =newsObj.TemplateHeader();
                string footer = newsObj.TemplateFooter();
                body = header + body;
                body = body + footer;
                body = body.Replace("{UserName}", " ");
                body = body.Replace("{Title}", "Your Todays Deal.....");
                body = body.Replace("{Url}", "url");
                body = body.Replace("{Description}", newsObj.Description);
                body = body.Replace("{Mainimage}", "MainimageUrl");
                if (body.Contains("{ImgBirthday}"))
                {
                    body = body.Replace("{ImgBirthday}", "http://tiquesinn.com/img/Templates/BirthdayImage.jpg");
                }
                if (body.Contains("imgLogo"))
                {
                    logourl = "../ImageHandler/ImageServiceHandler.ashx?BoutiqueLogoID=" + BoutiqueID;
                    string logo = "http://tiquesinn.com/" + logourl.Replace("../", ""); ;
                    body = body.Replace("{imgLogo}", logo);
                    body = body.Replace("{BoutiqueName}", Boutique);
                }
                char[] c = new char[] { ' ', ',' };
                string[] image = newsObj.ImageIDs[0].Split(c);
                for (int i = 0; i <= newsObj.imageCount - 1; i++)
                {
                    body = body.Replace("{image" + i + "}", imageUrl + image[i] + ".jpeg");
                }
                emailBody = body;
                SendEmail();
                newsObj.UpdateNewsLetterIsmailSend();
                
            }
            catch(Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "MailSending";
                ETObj.Method = "PopulateBody";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
            }
            return 2;
        }
        #endregion PopulateBody

        #region SendHtmlFormattedEmail
        public void SendHtmlFormattedEmail(string recepientEmail, string subject, string body)
        {
            try
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
            catch(Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "MailSending";
                ETObj.Method = "SendHtmlFormattedEmail";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
            }
        }
        #endregion SendHtmlFormattedEmail
        #endregion Methods
    }
}