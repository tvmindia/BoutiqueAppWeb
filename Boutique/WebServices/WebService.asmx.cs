using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Boutique.DAL;
using System.Data;
using System.Collections;
using System.IO;
using System.Drawing;

namespace Boutique.WebServices
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService : System.Web.Services.WebService
    {
        #region Products
        /// <summary>
        /// To get a product's details by product id
        /// </summary>
        /// <param name="productID">Product's ID</param>
        /// <param name="boutiqueID">Boutique's ID</param>
        /// <returns>JSON of product details</returns>
        [WebMethod]
        public string Products(string productID,string boutiqueID,string userID)
        {
            DataTable dt = new DataTable();
            try
            {   
                //------Getting product details-----
                Product product = new Product();
                product.ProductID = productID;
                product.BoutiqueID = boutiqueID;
                dt = product.GetProductByProductID();

                //---------Getting favorite information-----                
                DataTable favInfo=product.FavoriteInfo(userID);
                dt.Columns.Add("FavCount", typeof(int));
                dt.Columns.Add("isFav", typeof(Boolean));
                dt.Rows[0]["FavCount"] = favInfo.Rows[0]["FavCount"];
                dt.Rows[0]["isFav"] = favInfo.Rows[0]["isFav"];

                //-----------inserting product view log--------
                product.InsertProductViewLog(userID);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        /// <summary>
        /// To get images of a product
        /// </summary>
        /// <param name="productID"></param>
        /// <param name="boutiqueID"></param>
        /// <returns></returns>
        [WebMethod]
        public string ProductImages(string productID, string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                //------Getting product details-----
                Product product = new Product();
                product.ProductID = productID;
                product.BoutiqueID = boutiqueID;
                dt = product.GetAllProductImages().Tables[0];
                //Giving coloumns of image details
                ArrayList imgColNames = new ArrayList();
                ArrayList imgFileNameCols = new ArrayList();
                //ArrayList imgFileTypeCols = new ArrayList();
                imgColNames.Add("Image");
                imgFileNameCols.Add("ImageID");
                //imgFileTypeCols.Add("FileType");

                //return getDbDataAsJSON(dt, imgColNames, imgFileNameCols, imgFileTypeCols, true);
                return getDbDataAsJSON(dt, imgColNames, imgFileNameCols, false);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion Products

        #region Categories
        /// <summary>
        /// To get all categories names and details
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <returns></returns>
        [WebMethod]
        public string Categories(string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Product product = new Product();
                product.BoutiqueID = boutiqueID;
                dt = product.GetAllCategories(boutiqueID).Tables[0];
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        #region Boutique
        /// <summary>
        /// Webservice to get the details of boutique
        /// </summary>
        /// <param name="boutiqueID">to know which boutique</param>
        /// <returns>boutique details as Json</returns>
        [WebMethod]
        public string Boutique(string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Boutiques boutique = new Boutiques();
                boutique.BoutiqueID = boutiqueID;
                dt = boutique.GetBoutique(boutiqueID).Tables[0];
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion Boutique

        #region User
        /// <summary>
        /// to register new user with user details. It won't activare the user.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="mobile"></param>
        /// <param name="email"></param>
        /// <param name="boutiqueID"></param>
        /// <param name="dob"></param>
        /// <param name="anniversary"></param>
        /// <param name="gender"></param>
        /// <returns>flag and message. Then OTP number and Loyalty Card Number. also UserID for activation</returns>
        [WebMethod]
        public string UserRegistration(string name, string mobile, string email,string boutiqueID, string gender, string dob, string anniversary)
        {
            DataTable dt = new DataTable();
            try
            {
                Users user = new Users();
                user.BoutiqueID = boutiqueID;
                user.Name = name;
                user.Mobile = mobile;
                user.Email = email;
                if (dob != "null")
                {
                    user.DOB = dob;
                }
                else
                {
                    user.DOB = "";
                }
                if (anniversary != "null")
                {
                    user.Anniversary = anniversary;
                }
                else
                {
                    user.Anniversary = "";
                }
                user.Gender = gender;
                user.IsActive = true;
                user.CreatedBy = "User";
                user.CreatedDate = DateTime.Now;
                user.IsAdmin = false;
                user.AddNewUser();

                
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                dt.Columns.Add("UserID", typeof(String));
                dt.Columns.Add("LoyaltyCardNo", typeof(Int64));
                dt.Columns.Add("OTP", typeof(int));
                DataRow dr = dt.NewRow();
                dr["Flag"] = true;
                dr["Message"] = "Success";
                dr["UserID"] = user.UserID;
                dr["LoyaltyCardNo"] = user.LoyaltyCardNo;
                Random rnd = new Random();                  // Random number creation for OTP
                dr["OTP"] = rnd.Next(2000, 9000);
                dt.Rows.Add(dr);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        /// <summary>
        /// To activate a user by user Id
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="boutiqueID"></param>
        /// <returns>status</returns>
        [WebMethod]
        public string UserActivation(string userId, string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Users user = new Users();
                user.BoutiqueID = boutiqueID;
                user.UserID = userId;
                user.UpdatedBy = "User";
                
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                if (user.UserActivation() == 1)
                {

                    dr["Flag"] = true;
                    dr["Message"] = "User Account Successfully Activated";
                }
                else
                {
                    dr["Flag"] = false;
                    dr["Message"] = "User Account Activation is UNSUCCESSFULL";
                }
                dt.Rows.Add(dr);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        /// <summary>
        /// To login a user with mobile number. If user exists, 
        /// OTP and true flag will be sent along with isActive information. Else Exception message with false flag.
        /// </summary>
        /// <param name="mobile"></param>
        /// <param name="boutiqueID"></param>
        /// <returns>Flag, User Id , is Active, OTP</returns>
        [WebMethod]
        public string UserLogin(string mobile, string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Users user = new Users();
                user.BoutiqueID = boutiqueID;
                user.Mobile = mobile;
                dt=user.UserLogin();
                dt.Columns.Add("OTP", typeof(int));
                Random rnd = new Random();                  // Random number creation for OTP
                dt.Rows[0]["OTP"] = rnd.Next(2000, 9000);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        /// <summary>
        /// To get user details
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="boutiqueID"></param>
        /// <returns>json of details</returns>
        [WebMethod]
        public string UserDetails(string userID, string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Users user = new Users();
                user.BoutiqueID = boutiqueID;
                user.UserID = userID;
                dt = user.SelectUserByUserID().Tables[0];
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion User

        #region Favorites
        /// <summary>
        /// To add or remove from favorite list
        /// </summary>
        /// <param name="productID"></param>
        /// <param name="boutiqueID"></param>
        /// <param name="userID"></param>
        /// <param name="AddOrRemove">string "add" or "remove" should be given</param>
        /// <returns>status</returns>
        [WebMethod]
        public string Favorites(string productID, string boutiqueID, string userID,string AddOrRemove)
        {
            DataTable dt = new DataTable();
            try
            {
                Product product = new Product();
                product.ProductID = productID;
                product.BoutiqueID = boutiqueID;
                product.AddOrRemoveFromFavorites(userID, AddOrRemove);

                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = true;
                dr["Message"] = "Success";
                dt.Rows.Add(dr);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        #region OwnersAndDesigners
        /// <summary>
        /// Webservice to get owner or designer details
        /// </summary>
        /// <param name="ownerORdesigner">"designer" or "owner"</param>
        /// <param name="boutiqueID"></param>
        /// <returns>JSON of details</returns>
        [WebMethod]
        public string OwnersAndDesigners(string ownerORdesigner,string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                if (ownerORdesigner.Equals("designer"))
                {
                    Designers designer = new Designers();
                    designer.BoutiqueID = boutiqueID;
                    dt = designer.GetAllDesigners();
                }
                else if (ownerORdesigner.Equals("owner"))
                {
                    Owners owner = new Owners();
                    owner.BoutiqueID = boutiqueID;
                    dt = owner.GetAllOwners();
                }
                
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        #region Notifications
        /// <summary>
        /// Webservice to provide notifications
        /// </summary>
        /// <param name="notificationIDs">notification IDs that are already shown in device, comma seperated string</param>
        /// <param name="boutiqueID"></param>
        /// <returns>JSON of notifications that are never shown in the app yet</returns>
        [WebMethod]
        public string Notifications(string notificationIDs, string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                    Notification notifications = new Notification();
                    notifications.BoutiqueID = boutiqueID;
                    if (notificationIDs == "")                          //App don't have any present notifications
                    {
                        dt = notifications.GetNotificationsForApp(null);
                    }
                    else
                    {
                        dt = notifications.GetNotificationsForApp(notificationIDs);
                    }
                    
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        #region JSON converter
        /// <summary>
        /// JSON function without returning any images
        /// </summary>
        /// <param name="dt">Datatable to be converted</param>
        /// <returns>dt in JSON format</returns>
        public String getDbDataAsJSON(DataTable dt)
        {
            try
            {
                System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                Dictionary<string, object> row;
                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        row.Add(col.ColumnName, dr[col]);
                    }
                    rows.Add(row);
                }
                this.Context.Response.ContentType = "";
                return serializer.Serialize(rows);
            }
            catch (Exception ex)
            {
                //Return error message
                DataTable ErrorMsg = new DataTable();
                ErrorMsg.Columns.Add("Flag", typeof(Boolean));
                ErrorMsg.Columns.Add("Message", typeof(String));
                DataRow dr = ErrorMsg.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                ErrorMsg.Rows.Add(dr);
                return getDbDataAsJSON(ErrorMsg); ;
            }
            finally
            {

            }

        }
        /// <summary>
        /// JSON function with returning any images
        /// </summary>
        /// <param name="ds">Dataset</param>
        /// <param name="imgColName">Coloumn names array that contains images(data)</param>
        /// <param name="imgFileNameCol">Coloumn names array that contain file name</param>
        /// <param name="imgFileTypeCol">Coloumn names array that contain file type</param>
        /// <param name="isThumb">Optional parameter to say whether the thumbnail is enough for calling function</param>
        /// <returns>ds in JSON format with links to images that are temporarly stored in server folder</returns>
        public String getDbDataAsJSON(DataTable dt, ArrayList imgColName, ArrayList imgFileNameCol,  Boolean isThumb = false)
        {
            try
            {
               // DataTable dt = ds.Tables[0];
                String filePath = Server.MapPath("~/MediaUploader/");

                System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                Dictionary<string, object> row;
                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    //adding data in JSON
                    foreach (DataColumn col in dt.Columns)
                    {
                        if (!imgColName.Contains(col.ColumnName))
                        {
                            row.Add(col.ColumnName, dr[col]);
                        }
                    }
                    //adding image details in JSON
                    for (int i = 0; i < imgColName.Count; i++)
                    {

                        if (dr[imgColName[i] as string] != DBNull.Value)
                        {
                            //String fileURL = filePath + DateTime.Now.ToString("ddHHmmssfff") + dr[imgFileNameCol[i] as string].ToString().Replace(" ", "_");
                            String fileURL = filePath + dr[imgFileNameCol[i] as string].ToString().Replace(" ", "_");// +".jpg";
                            if (!System.IO.File.Exists(fileURL))
                            {
                                byte[] buffer;
                                if (isThumb)
                                {
                                    buffer = MakeThumbnail((byte[])dr[imgColName[i] as string], 400);//images are converted to thumbnails
                                    System.IO.File.WriteAllBytes(fileURL, buffer);
                                }
                                else
                                {
                                    buffer = (byte[])dr[imgColName[i] as string];
                                    System.IO.File.WriteAllBytes(fileURL, buffer);
                                }
                                
                            }
                            row.Add(imgColName[i] as string, fileURL);
                        }

                    }
                    rows.Add(row);
                }

                this.Context.Response.ContentType = "";

                return serializer.Serialize(rows);

            }
            catch (Exception ex)
            {
                //Return error message               
                DataTable ErrorMsg = new DataTable();
                ErrorMsg.Columns.Add("Flag", typeof(Boolean));
                ErrorMsg.Columns.Add("Message", typeof(String));
                DataRow dr = ErrorMsg.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                ErrorMsg.Rows.Add(dr);
                return getDbDataAsJSON(ErrorMsg);
            }
            finally
            {

            }
        }
        #endregion JSON converter 

        #region Utility Functions
        //----------------------------Function to make image thumbnail---------------------------------------------------
        public static byte[] MakeThumbnail(byte[] myImage, int thumbWidth)
        {
            Image img = Image.FromStream(new MemoryStream(myImage));
            int originalHeigth=img.Size.Height;
            int originalWidth=img.Size.Width;
            int thumbHeight = originalHeigth * thumbWidth / originalWidth;
            using (MemoryStream ms = new MemoryStream())
            using (Image thumbnail = img.GetThumbnailImage(thumbWidth, thumbHeight, null, new IntPtr()))
            {
                thumbnail.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                return ms.ToArray();
            }
        }
        #endregion Utility Functions
    }
}