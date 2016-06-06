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
            private Boolean isValidUser;
            private string userN;
            private string RoleName;
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

            #endregion Properties
            #region UserAuthendication default constructor
            public UserAuthendication()
            {

            }
            #endregion UserAuthendication default constructor

            #region User Authentication
            public UserAuthendication(String userName, String password)
            {
                             
                DataTable dt = GetLoginDetails(userName);

                if (dt.Rows.Count > 0)
                {
                    string Name = dt.Rows[0]["LoginName"].ToString();
                    string Passwd = dt.Rows[0]["Password"].ToString();
                  bool Active = Convert.ToBoolean(dt.Rows[0]["Active"]);

                  if (userName == Name && (CryptObj.Encrypt(password) == Passwd) && Active == true)

                  //  if (userName == Name && password == Passwd)
                    {
                        isValidUser = true;
                        userN = userName;

                        BoutiqueName = dt.Rows[0]["BoutiqueName"].ToString();
                        Boutique_ID = dt.Rows[0]["BoutiqueID"].ToString();

                        RoleName = dt.Rows[0]["RoleName"].ToString();
                    }

                    else
                    {
                        isValidUser = false;
                    }
                }

            }

            #endregion  User Authentication

            #region Get Login Details
            public DataTable GetLoginDetails(string LoginName)
            {
                SqlConnection con = null;
                DataTable dt = new DataTable();
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
                    //var page = HttpContext.Current.CurrentHandler as Page;
                    //eObj.ErrorData(ex, page);

                    //eObj.Description = ex.Message;
                    //eObj.Module = Module;

                    //eObj.UserID = usrid;
                    //eObj.Method = "GetLoginDetails";

                    //eObj.InsertError();
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
                    //System.IO.File.WriteAllText(@Server.MapPath("~/Text.txt"), ex.Message);
                    //throw ex;

                    //eObj.Description = ex.Message;
                    //eObj.Module = Module;

                    //eObj.UserID = usrid;
                    //eObj.Method = "Encrypt";

                    //eObj.InsertError();


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
                    //System.IO.File.WriteAllText(@Server.MapPath("~/Text.txt"), ex.Message);

                    //eObj.Description = ex.Message;
                    //eObj.Module = Module;

                    //eObj.UserID = usrid;
                    //eObj.Method = "Decrypt";

                    //eObj.InsertError();

                }
                return plainText;
            }



        }


    }
}