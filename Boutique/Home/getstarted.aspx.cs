using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;
using System.Web.Services;


namespace Boutique.Home
{
    public partial class getstarted : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string sendMail(string name, string msg, string email, string mobile, string boutiquename)
        {
            try
            {


                if (email.Trim() == "" || boutiquename.Trim() == "" || name.Trim() == "")
                {
                    return "Oh ! Some fields are not filled yet !";

                }

                DateTime CurrentTime = DateTime.Now;
                MailMessage Msg = new MailMessage();


                // Sender e-mail address.
                Msg.From = new MailAddress("contact.bewedo@gmail.com");
                // Recipient e-mail address.
                Msg.To.Add("contact.bewedo@gmail.com");


                string message = "<table style='width:70%'><tr><td>From </td><td>: </td><td>" + name + "</td></tr>";
                message = message + "<tr><td>Boutique</td><td> :</td> <td>" + boutiquename + "</td></tr>";
                message = message + "<tr><td>Email</td><td> :</td> <td>" + email + "</td></tr>";
                message = message + "<tr><td>Mobile</td><td> :</td><td> " + mobile + "</td></tr>";
                message = message + "<tr><td>Date</td><td> :</td><td> " + CurrentTime + "</td></tr>";

                message = message + "<tr><td>Question </td><td>:</td><td> " + msg + "</td></tr></table>";



                Msg.Subject = "Contact Us - Question from " + name;
                Msg.Body = message;
                Msg.IsBodyHtml = true;



                // your remote SMTP server IP.
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.Credentials = new System.Net.NetworkCredential("contact.bewedo@gmail.com", "bewedopassword");
                smtp.EnableSsl = true;
                smtp.Send(Msg);
                Msg = null;
                return "Thank you  , we will get back to you soon !";
            }
            catch (Exception ex)
            {

                return "Server Busy ! Try Again ! (" + ex.GetHashCode() + ")";
            }


        }
    }
}