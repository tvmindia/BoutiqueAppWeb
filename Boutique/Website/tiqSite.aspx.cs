using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using Boutique.DAL;

namespace Boutique.Website
{
    public partial class tiqSite : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region AddUserDataForGetstarted
        //Created By: Thomson Kattingal
        [System.Web.Services.WebMethod]
        public static string SendMail(site userObj)
        {
            try
            {
                //DateTime CurrentTime = DateTime.Now;
                MailMessage Msg = new MailMessage();
                //Sender e-mail address.
                Msg.From = new MailAddress("info.thrithvam@gmail.com");
                //Recipient e-mail address.
                Msg.To.Add("info@tiquesinn.com");
                string message = "<table style='width:70%'><tr><td>From </td><td>: </td><td>" + userObj.name + "</td></tr>";
                message = message + "<tr><td>Email</td><td> :</td> <td>" + userObj.email + "</td></tr>";
                message = message + "<tr><td>Mobile</td><td> :</td><td> " + userObj.subject + "</td></tr>";
                message = message + "<tr><td>Message</td><td> :</td><td> " + userObj.message + "</td></tr>";
                message = message + "<tr><td>Date </td><td>:</td><td> " + DateTime.Now.ToString() + "</td></tr></table>";
                Msg.Subject = "Contact Us - Question from " + userObj.name;
                Msg.Body = message;
                Msg.IsBodyHtml = true;
                //your remote SMTP server IP.
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.Credentials = new System.Net.NetworkCredential("info.thrithvam", "thrithvam@2015");//password
                smtp.EnableSsl = true;
                smtp.Send(Msg);
                Msg = null;
                return "Thank you  , we will get back to you soon !";
            }

            catch (Exception ex)
            {

                return "sorry";
            }



        }
        #endregion  AddUserDataForGetstarted
    }
}