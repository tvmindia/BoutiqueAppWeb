using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Boutique.DAL;
using Messages = Boutique.UIClasses.common;
using System.Web.Services;
using System.Web.Script.Serialization;

namespace Boutique.AdminPanel
{
    public partial class Login : System.Web.UI.Page
    {
        UIClasses.Const constants = new UIClasses.Const();
        protected void Page_Load(object sender, EventArgs e)
        {
            string log = Request.QueryString["Session"];
            if (log == "Logout")
            {
                Session.Remove(constants.LoginSession);
                Session.Clear();
                Response.Redirect("Login.aspx");
            }
            if (IsPostBack)
            {

                if (username.Value.ToString().Trim() != "")
                {
                   

                  

                    DAL.Security.UserAuthendication UA = new DAL.Security.UserAuthendication(username.Value, password.Value);

                    if (UA.ValidUser)
                    {
                        if (Session[constants.LoginSession] != null)
                        {
                            Session.Remove(constants.LoginSession);
                        }

                        Session.Add(constants.LoginSession, UA);
                        if (UA.Role == constants.SuperAdministrator)
                        {
                            Response.Redirect(constants.SAHomePage);
                        }
                        else
                        {
                            Response.Redirect(constants.HomePage);
                        }
                    }

                    else
                    {
                        //lblmsg.Text = Messages.LoginFailed;
                        lblmsg.Text = "Login Failed";
                    }

                }
                else
                {
                    //lblmsg.Text = Messages.LoginFailed;
                    lblmsg.Text = "Login Failed";
                }


            }

        }

        #region SendVerificationCode

        [System.Web.Services.WebMethod]

        public static string VerificationCodeEmit(Security LoginObj)
        {


            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string username = string.Empty;
            string BoutiqueName = string.Empty;
            string msg = string.Empty;
                    

            try
            {
                                   
                        //----------*Add verification code*------------//
                        
                        Random random = new Random();
                        int verificationCode = 0;
                        if(LoginObj.Email=="")
                        {
                            return "false";
                        }
                        DataTable dtUsr = LoginObj.GetUserDetailsByEmailID();

                        foreach (DataRow dr in dtUsr.Rows)
                        {
                            Guid boutiqueid = Guid.Parse(dr["BoutiqueID"].ToString());
                            LoginObj.BoutiqueID = boutiqueid;
                            LoginObj.LoginName = dr["LoginName"].ToString();
                            verificationCode = random.Next(1000, 10000);
                            LoginObj.VerifyCode = verificationCode.ToString();
                            LoginObj.AddVerificationCode();
                        }
                        //----------*Get verification code*------------//

                        DataTable dtCode = LoginObj.GetUserVerificationCodeByEmailID();

                        foreach (DataRow dr in dtCode.Rows)
                        {
                            verificationCode = Convert.ToInt32(dr["VerificationCode"]);
                            username = (dr["LoginName"]).ToString();
                            //BoutiqueName = (dr["Name"]).ToString();
                            msg = "<body><p>Your verification code with login name " + username + " is <font color='red'>" + verificationCode + "</font></p><p>" + msg + "</p></body>";
                        }

                        if (msg != string.Empty)
                        {
                            //-- Area of verification code will be displayed and email area will be hidden

                            //Code.Style.Add("display", "block");
                            //email.Style.Add("display", "none");
                            //instruction.Visible = true;
                            //instruction.InnerText = Messages.EmailInstruction + txtEmail.Value;

                            //mailObj.Email = txtEmail.Value;
                            LoginObj.msg = msg;
                            LoginObj.SendEmail();

                        } 
                
                    }
                
            
            catch (Exception)
            {
                return "false";
            }


            return "True";
        }

        #endregion SendVerificationCode

        #region Verify Code
        [System.Web.Services.WebMethod]

        public static string VerifyCode(Security LoginObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            int verificationCode = 0;
          
            DateTime vcCreatedTime;

            bool Verified = false;
            bool TimeExpired = false;
            //string msg = "";

            try
            {
                //userObj.Email = txtEmail.Value;


                DataTable dtCode = LoginObj.GetUserVerificationCodeByEmailID();

                foreach (DataRow dr in dtCode.Rows)
                {

                    verificationCode = Convert.ToInt32(dr["VerificationCode"]);
                    vcCreatedTime = Convert.ToDateTime(dr["VerifyCodeDate"]);
                    LoginObj.UserID = dr["UserID"].ToString();

                    DateTime CurrentTime = DateTime.Now;
                    if ((CurrentTime - vcCreatedTime) < TimeSpan.FromDays(1))
                    {

                        if (verificationCode.ToString() == LoginObj.VerifyCode)
                        {
                            Verified = Verified | true;
                            break;
                        }
                    }

                    else
                    {
                        TimeExpired = TimeExpired | true;
                    }

                }


                if (Verified)
                {
                    if (TimeExpired == false)
                    {
                        //Response.Redirect("../Login/Reset.aspx?UserID=" + UserID, false);
                        LoginObj.msg="True";
                    }
                    else
                    {
                        //lblError.Text = Messages.TimeExpired;
                    }
                }

                else
                {
                    //lblError.Text = Messages.IncorrectVerificationCode;
                }

            }
            catch (Exception)
            {
                //lblError.Text = ex.Message;
                LoginObj.msg="False";
                return jsSerializer.Serialize(LoginObj);
            }
          
           return jsSerializer.Serialize(LoginObj);
            
        }
        #endregion Verify Code

       #region UpdatePassword
       [WebMethod]
        public static string UpdatePassword(Security LogObj)
        {
            Security.CryptographyFunctions CryptObj = new Security.CryptographyFunctions();

            try
            {
                LogObj.Password=CryptObj.Encrypt(LogObj.Password);
                LogObj.ResetPassword(Guid.Parse(LogObj.UserID));             
            }
           catch(Exception ex)
            {
                return ex.ToString();
            }
            return "True";
        }
       #endregion UpdatePassword
    }
}