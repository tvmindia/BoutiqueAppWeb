﻿#region Namespaces


using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.UI;
using Boutique.DAL;
using System.Net.Mail;

#endregion Namespaces


namespace Boutique.DAL
{
    public class Security
    {

        public class UserAuthendication
        {

            #region Global Variables

            //ErrorHandling eObj = new ErrorHandling();
            CryptographyFunctions CryptObj = new CryptographyFunctions();
            public string Module = "Security";

            #endregion Global Variables

            #region Properties

            private string BoutiqueName;
            private string Boutique_ID;
            private string Branch_ID;
            private string Boutique_CurrencyCode;
            private Boolean isValidUser;
            private string userN;
            private string RoleName;
            private string Currency_FormatCode;
            private string CurrencySymbol;
            private string User_Id;
            private string AppVersion;



            public string UserID
            {
                get
                {
                    return User_Id;
                }
            }


            public string userName
            {
                get
                {
                    return userN;
                }
            }
            public Boolean ValidUser
            {
                get
                {
                    return isValidUser;
                }
            }
            public string Boutique
            {
                get
                {
                    return BoutiqueName;
                }
            }

            public string BoutiqueID
            {
                get
                {
                    return Boutique_ID;
                }


            }
            public string BranchID
            {
                get
                {
                    return Branch_ID;
                }
            }
            public string BoutiqueCurrencyCode
            {
                get
                {
                    return Boutique_CurrencyCode;
                }


            }
            public string CurrencyFormatCode
            {
                get
                {
                    return Currency_FormatCode;
                }


            }

            public string BoutiqueCurrencySymbol
            {
            get
                {
                    return CurrencySymbol;
                }
            }

            public string Role
            {
                get
                {
                    return RoleName;
                }

            }


            /// <summary>
            /// User id of logined user
            /// </summary>
            public Guid usrid
            {
                get;
                set;
            }

            public string Version
            {
              get
                {
                  return AppVersion;
                }

            }


            #endregion Properties

            #region UserAuthendication default constructor
            public UserAuthendication()
            {

            }
            #endregion UserAuthendication default constructor

            #region User Authentication
            public UserAuthendication(String userName, String password)
            {
                string status = null;
                try
                {
                    DataTable dt = GetLoginDetails(userName);

                    if (dt.Rows.Count > 0)
                    {
                        string Name = dt.Rows[0]["LoginName"].ToString();
                        string Passwd = dt.Rows[0]["Password"].ToString();
                        bool Active = Convert.ToBoolean(dt.Rows[0]["Active"]);

                        if ((string.Equals(userName, Name, StringComparison.CurrentCultureIgnoreCase)) && (CryptObj.Encrypt(password) == Passwd) && Active == true)

                        //  if (userName == Name && password == Passwd)
                        {
                            isValidUser = true;
                            userN = Name;

                            BoutiqueName = dt.Rows[0]["BoutiqueName"].ToString();
                            Boutique_ID = dt.Rows[0]["BoutiqueID"].ToString();
                            Branch_ID = dt.Rows[0]["BranchID"].ToString();
                            RoleName = dt.Rows[0]["RoleName"].ToString();
                            Currency_FormatCode = dt.Rows[0]["FormatCode"].ToString();
                            Boutique_CurrencyCode = dt.Rows[0]["CurrencyCode"].ToString();
                            CurrencySymbol = dt.Rows[0]["Symbol"].ToString();
                            User_Id = dt.Rows[0]["UserID"].ToString();
                            AppVersion = dt.Rows[0]["AppVersion"].ToString();

                        }

                        else
                        {
                            isValidUser = false;
                        }
                    }
                }
                catch(Exception ex)
                {
                    status = "500";//Exception of foreign key

                    //Code For Exception Track insert
                    ExceptionTrack ETObj = new ExceptionTrack();
                    ETObj.BoutiqueID = BoutiqueID;
                    ETObj.UserID = UserID;
                    ETObj.Description = ex.Message;//Actual exception message
                    ETObj.Date = DateTime.Now.ToString();
                    ETObj.Module = "Security";
                    ETObj.Method = "UserAuthendication";
                    ETObj.ErrorSource = "DAL";
                    ETObj.IsMobile = false;
                    ETObj.Version = AppVersion;
                    ETObj.CreatedBy = userName;
                    ETObj.InsertErrorDetails();
                }

            }

            #endregion  User Authentication

            #region UserAuthendication
            public UserAuthendication(String userName, String BoutiqueID, String BranchID, String BoutiqueNam, String RoleNam, string CurrencyCode, string FormatCode, string symbol, string version)
            {
                string status = null;
                try
                {
                    Boutique_ID = BoutiqueID;
                    Branch_ID = BranchID;
                    isValidUser = true;
                    userN = userName;
                    BoutiqueName = BoutiqueNam;
                    RoleName = RoleNam;
                    Boutique_CurrencyCode = CurrencyCode;
                    Currency_FormatCode = FormatCode;
                    CurrencySymbol = symbol;
                    AppVersion = version;
                }
                catch(Exception ex)
                {

                    status = "500";//Exception of foreign key

                    //Code For Exception Track insert
                    ExceptionTrack ETObj = new ExceptionTrack();
                    ETObj.BoutiqueID = BoutiqueID;
                    ETObj.UserID = UserID;
                    ETObj.Description = ex.Message;//Actual exception message
                    ETObj.Date = DateTime.Now.ToString();
                    ETObj.Module = "Security";
                    ETObj.Method = "UserAuthendication";
                    ETObj.ErrorSource = "DAL";
                    ETObj.IsMobile = false;
                    ETObj.Version = AppVersion;
                    ETObj.CreatedBy = userName;
                    ETObj.InsertErrorDetails();
                }
            }
            #endregion UserAuthendication

            #region Get Login Details
            public DataTable GetLoginDetails(string LoginName)
            {
                SqlConnection con = null;
                DataTable dt = new DataTable();
                string status = null;
                try
                {

                    dbConnection dcon = new dbConnection();
                    con = dcon.GetDBConnection();
                    SqlCommand cmd = new SqlCommand("GetLoginDetails", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@LoginName", SqlDbType.NVarChar, 50).Value = LoginName;
                    SqlDataAdapter adapter = new SqlDataAdapter();
                    adapter.SelectCommand = cmd;
                    dt = new DataTable();
                    adapter.Fill(dt);
                    con.Close();

                }
                catch (Exception ex)
                {
                    status = "500";//Exception of foreign key

                    //Code For Exception Track insert
                    ExceptionTrack ETObj = new ExceptionTrack();
                    ETObj.BoutiqueID = BoutiqueID;
                    ETObj.UserID = UserID;
                    ETObj.Description = ex.Message;//Actual exception message
                    ETObj.Date = DateTime.Now.ToString();
                    ETObj.Module = "Security";
                    ETObj.Method = "GetLoginDetails";
                    ETObj.ErrorSource = "DAL";
                    ETObj.IsMobile = false;
                    ETObj.Version = AppVersion;
                    ETObj.CreatedBy = userName;
                    ETObj.InsertErrorDetails();
                }
                finally
                {
                    if (con != null)
                    {
                        con.Dispose();
                    }

                }
                return dt;

            }

            #endregion Get Login Details




        }

        public class CryptographyFunctions
        {

            //ErrorHandling eObj = new ErrorHandling();
            public string Module = "Security";


            /// <summary>
            /// User id of logined user
            /// </summary>
            public Guid usrid
            {
                get;
                set;
            }

            //AES 128bit Cross Platform (Java and C#) Encryption Compatibility
            string key = System.Web.Configuration.WebConfigurationManager.AppSettings["cryptography"];
            /// <summary>
            /// AES 128bit Encryption function
            /// </summary>
            /// <param name="plainText">text to be encrypted</param>
            /// <returns>Encrypted text</returns>
            public string Encrypt(string plainText)
            {
                string status = null;
                string encryptedText = "";
                try
                {

                    var plainBytes = Encoding.UTF8.GetBytes(plainText);
                    var keyBytes = new byte[16];
                    var secretKeyBytes = Encoding.UTF8.GetBytes(key);
                    Array.Copy(secretKeyBytes, keyBytes, Math.Min(keyBytes.Length, secretKeyBytes.Length));
                    encryptedText = Convert.ToBase64String(new RijndaelManaged
                    {
                        Mode = CipherMode.CBC,
                        Padding = PaddingMode.PKCS7,
                        KeySize = 128,
                        BlockSize = 128,
                        Key = keyBytes,
                        IV = keyBytes
                    }.CreateEncryptor().TransformFinalBlock(plainBytes, 0, plainBytes.Length));
                }
                catch (Exception ex)
                {
                    status = "500";//Exception of foreign key

                    //Code For Exception Track insert
                    ExceptionTrack ETObj = new ExceptionTrack();
                    // ETObj.BoutiqueID = Convert.ToString(BoutiqueID);
                    // ETObj.UserID = UserID;
                    ETObj.Description = ex.Message;//Actual exception message
                    ETObj.Date = DateTime.Now.ToString();
                    ETObj.Module = "Security";
                    ETObj.Method = "Decrypt";
                    ETObj.ErrorSource = "DAL";
                    ETObj.IsMobile = false;
                    //   ETObj.Version = AppVersion;
                    //   ETObj.CreatedBy = LoginName;
                    ETObj.InsertErrorDetails();


                }
                return encryptedText;
            }
            /// <summary>
            /// AES 128 Decryption function
            /// </summary>
            /// <param name="encryptedText">Text to be decrypted</param>
            /// <returns>decrypted plain text</returns>
            public string Decrypt(string encryptedText)
            {
                string plainText = "";
                string status = null;
                try
                {
                    var encryptedBytes = Convert.FromBase64String(encryptedText);
                    var keyBytes = new byte[16];
                    var secretKeyBytes = Encoding.UTF8.GetBytes(key);
                    Array.Copy(secretKeyBytes, keyBytes, Math.Min(keyBytes.Length, secretKeyBytes.Length));
                    plainText = Encoding.UTF8.GetString(
                        new RijndaelManaged
                        {
                            Mode = CipherMode.CBC,
                            Padding = PaddingMode.PKCS7,
                            KeySize = 128,
                            BlockSize = 128,
                            Key = keyBytes,
                            IV = keyBytes
                        }.CreateDecryptor().TransformFinalBlock(encryptedBytes, 0, encryptedBytes.Length));
                }
                catch (Exception ex)
                {
                    status = "500";//Exception of foreign key

                    //Code For Exception Track insert
                    ExceptionTrack ETObj = new ExceptionTrack();
                   // ETObj.BoutiqueID = Convert.ToString(BoutiqueID);
                   // ETObj.UserID = UserID;
                    ETObj.Description = ex.Message;//Actual exception message
                    ETObj.Date = DateTime.Now.ToString();
                    ETObj.Module = "Security";
                    ETObj.Method = "Decrypt";
                    ETObj.ErrorSource = "DAL";
                    ETObj.IsMobile = false;
                    //   ETObj.Version = AppVersion;
                 //   ETObj.CreatedBy = LoginName;
                    ETObj.InsertErrorDetails();

                }
                return plainText;
            }



        }

        public string Email
        {
            get;
            set;
        }
        public string verificationCode
        {
            get;
            set;
        }
        public string LoginName
        {
            get;
            set;
        }
        public Guid BoutiqueID
        {
            get;
            set;
        }
        public Guid BranchID
        {
            get;
            set;
        }
        public string msg
        {
            get;
            set;
        }
        public string VerifyCode
        {
            get;
            set;
        }
        public string Password
        {
            get;
            set;
        }
        public string UserID
        {
            get;
            set;
        }
        #region Public Variables

        //---* Keys assosiated with mail sending.its values are set in web.config ,app settings section -- *//

        string EmailFromAddress = System.Web.Configuration.WebConfigurationManager.AppSettings["EmailFromAddress"];
        string host = System.Web.Configuration.WebConfigurationManager.AppSettings["SMTP-host"];
        string smtpUserName = System.Web.Configuration.WebConfigurationManager.AppSettings["SMTP-UserName"];
        string smtpPassword = System.Web.Configuration.WebConfigurationManager.AppSettings["SMTP-Password"];
        string VerificationCode = System.Web.Configuration.WebConfigurationManager.AppSettings["VerificationCode"];
        string port = System.Web.Configuration.WebConfigurationManager.AppSettings["Port"];

        #endregion   Public Variables

        #region Get User Details By EmailID

        public DataTable GetUserDetailsByEmailID()
        {
            string status = null;
            SqlConnection con = null;
            DataTable dtUsers = null;
            try
            {
                

                dtUsers = new DataTable();
                dbConnection dcon = new dbConnection();
                con = dcon.GetDBConnection();
                SqlCommand cmd = new SqlCommand("[GetUserDetailsByEmail]", con);

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = Email;

                SqlDataAdapter adapter = new SqlDataAdapter();
                adapter.SelectCommand = cmd;
                adapter.Fill(dtUsers);

                if (con != null)
                {
                    con.Dispose();
                }
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID =Convert.ToString(BoutiqueID);
                ETObj.UserID = UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Security";
                ETObj.Method = "GetUserDetailsByEmailID";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
             //   ETObj.Version = AppVersion;
                ETObj.CreatedBy = LoginName;
                ETObj.InsertErrorDetails();
            }

            return dtUsers;
        }

        #endregion Get User Details By EmailID

        #region Add verificationcode (Generated random number)

        public void AddVerificationCode()
        {
            string status = null;
            dbConnection dcon = new dbConnection();
            try
            {
               

                dcon.GetDBConnection();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = "[AddVerificationCode]";

                cmd.Parameters.Add("@VerificationCode", SqlDbType.NVarChar, 20).Value = VerifyCode;
                cmd.Parameters.Add("@LoginName", SqlDbType.NVarChar, 255).Value = LoginName;
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = BoutiqueID;


                SqlParameter Output = new SqlParameter();
                Output.DbType = DbType.Int32;
                Output.ParameterName = "@Status";
                Output.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(Output);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = Convert.ToString(BoutiqueID);
                ETObj.UserID = UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Security";
                ETObj.Method = "AddVerificationCode";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                //   ETObj.Version = AppVersion;
                ETObj.CreatedBy = LoginName;
                ETObj.InsertErrorDetails();
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
        }

        #endregion Add verificationcode (Generated random number)

        #region Get User Verification Code By EmailID

        public DataTable GetUserVerificationCodeByEmailID()
        {
            string status = null;
            SqlConnection con = null;
            DataTable dtVerificationCode = null;

            dtVerificationCode = new DataTable();
            dbConnection dcon = new dbConnection();
            try
            {
                con = dcon.GetDBConnection();
                SqlCommand cmd = new SqlCommand("GetVerificationCodeByEmailID", con);
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = Email;

                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter adapter = new SqlDataAdapter();
                adapter.SelectCommand = cmd;
                adapter.Fill(dtVerificationCode);
            }
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = Convert.ToString(BoutiqueID);
                ETObj.UserID = UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Security";
                ETObj.Method = "GetUserVerificationCodeByEmailID";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                //   ETObj.Version = AppVersion;
                ETObj.CreatedBy = LoginName;
                ETObj.InsertErrorDetails();
            }
            finally
            {
                if (con != null)
                {
                    con.Dispose();
                }

            }

            return dtVerificationCode;
        }

        #endregion  Get User Verification Code By EmailID
        #region SendEmail

        public void SendEmail()
        {
            string status = null;
            try
            {
                MailMessage Msg = new MailMessage();

                Msg.From = new MailAddress(EmailFromAddress);

                Msg.To.Add(Email);

                string message = "<body><h3>Hello ,</h3>" + msg + "<p>Enter Your Code in given field and change your Password<p><p><p><p>&nbsp;&nbsp;&nbsp;&nbsp; Tiques&nbsp; Admin<p><p><p><p><p>Please do not reply to this email with your password. We will never ask for your password, and we strongly discourage you from sharing it with anyone.</body>";
                Msg.Subject = VerificationCode;
                Msg.Body = message;
                Msg.IsBodyHtml = true;

                // your remote SMTP server IP.
                SmtpClient smtp = new SmtpClient();
                smtp.Host = host;
                smtp.Port = 587;
                smtp.Credentials = new System.Net.NetworkCredential(smtpUserName, smtpPassword);
                smtp.EnableSsl = true;
                smtp.Send(Msg);
                Msg = null;
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = Convert.ToString(BoutiqueID);
                ETObj.UserID = UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Security";
                ETObj.Method = "SendEmail";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                //   ETObj.Version = AppVersion;
                ETObj.CreatedBy = LoginName;
                ETObj.InsertErrorDetails();
            }
        }


        #endregion SendEmail

        #region Reset Password

        public string ResetPassword(Guid UserID)
        {
            dbConnection dcon = new dbConnection();
            string status = null;
            try
            {
                dcon.GetDBConnection();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = "ResetPassword";
                cmd.Parameters.Add("@UserId", SqlDbType.UniqueIdentifier).Value = UserID;
                cmd.Parameters.Add("@Password", SqlDbType.NVarChar, 40).Value = Password;
                SqlParameter Output = new SqlParameter();
                Output.DbType = DbType.Int32;
                Output.ParameterName = "@Status";
                Output.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(Output);
                cmd.ExecuteNonQuery();

               


            }
            catch (Exception ex)
            {

                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = Convert.ToString(BoutiqueID);
                ETObj.UserID =Convert.ToString(UserID);
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Security";
                ETObj.Method = "ResetPassword";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                //   ETObj.Version = AppVersion;
                ETObj.CreatedBy = LoginName;
                ETObj.InsertErrorDetails();
            }
            finally
            {
            if (dcon.SQLCon != null)
            {
                dcon.DisconectDB();
            }

            }
            return "";
        }

        #endregion  Reset Password
    }
}