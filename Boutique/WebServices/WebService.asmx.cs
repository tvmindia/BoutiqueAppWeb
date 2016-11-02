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
using Newtonsoft.Json;

namespace Boutique.WebServices
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService : System.Web.Services.WebService
    {
        Boutique.UIClasses.Const constants = new Boutique.UIClasses.Const();

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
                if (favInfo.Rows.Count != 0)                    //product has any user favorite information or not
                {
                    dt.Columns.Add("FavCount", typeof(int));
                    dt.Columns.Add("isFav", typeof(Boolean));
                    dt.Rows[0]["FavCount"] = favInfo.Rows[0]["FavCount"];
                    dt.Rows[0]["isFav"] = favInfo.Rows[0]["isFav"];
                }

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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Products";
                ETObj.Method = "Products";
                ETObj.InsertErrorDetailsFromWebService();
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
                dt = product.GetProductImagesForMobile();
                //Giving coloumns of image details
                ArrayList imgColNames = new ArrayList();
                ArrayList imgFileNameCols = new ArrayList();
                ArrayList imgFileTypeCols = new ArrayList();
                imgColNames.Add("Image");
                imgFileNameCols.Add("ImageID");
                imgFileTypeCols.Add("FileType");

                return getDbDataAsJSON(dt, imgColNames, imgFileNameCols, imgFileTypeCols, false);
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Products";
                ETObj.Method = "ProductImages";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        #region Related Products
        /// <summary>
        /// To get related products of a product
        /// </summary>
        /// <param name="productID"></param>
        /// <param name="boutiqueID"></param>
        /// <param name="limit">no of products</param>
        /// <returns></returns>
        [WebMethod]
        public string RelatedProducts(string productID, string boutiqueID, string limit)
        {
            DataTable dt = new DataTable();
            try
            {
                Product products = new Product();
                products.ProductID = productID;
                products.BoutiqueID = boutiqueID;
                if (limit != "")
                    dt = products.GetRelatedProductsForApp(int.Parse(limit));
                else
                    dt = products.GetRelatedProductsForApp();
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
                //Giving coloumns of image details
                ArrayList imgColNames = new ArrayList();
                ArrayList imgFileNameCols = new ArrayList();
                ArrayList imgFileTypeCols = new ArrayList();
                imgColNames.Add("Image");
                imgFileNameCols.Add("ImageID");
                imgFileTypeCols.Add("FileType");

                return getDbDataAsJSON(dt, imgColNames, imgFileNameCols, imgFileTypeCols, false);
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Products";
                ETObj.Method = "RelatedProducts";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        #region Products By Search
        [WebMethod]
        public string ProductsBySearch(string searchString, string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Product products = new Product();
                products.BoutiqueID = boutiqueID;
                dt = products.GetProductsBySearch(searchString);
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
                //Giving coloumns of image details
                ArrayList imgColNames = new ArrayList();
                ArrayList imgFileNameCols = new ArrayList();
                ArrayList imgFileTypeCols = new ArrayList();
                imgColNames.Add("Image");
                imgFileNameCols.Add("ImageID");
                imgFileTypeCols.Add("FileType");

                return getDbDataAsJSON(dt, imgColNames, imgFileNameCols, imgFileTypeCols, false);
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Products";
                ETObj.Method = "ProductsBySearch";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        #region Produt Types By ProductID

        [WebMethod]
        public string ProductTypesByProductID(string ProductID, string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Product prdct = new Product();
                prdct.ProductID = ProductID;
                prdct.BoutiqueID = boutiqueID;
                dt = prdct.GetProductTypesByProductID().Tables[0];
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Product";
                ETObj.Method = "ProductTypesByProductID";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
         
        #endregion Produt Types By ProductID

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
                dt = product.GetAllCategories().Tables[0];
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Categories";
                ETObj.Method = "Categories";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #region Products by category
        /// <summary>
        /// Webservice to get products under a category
        /// </summary>
        /// <param name="boutiqueID">to know which boutique</param>
        /// <param name="CategoryCode">category code</param>
        /// <returns>product details as Json</returns>
        [WebMethod]
        public string ProductsByCategory(string CategoryCode,string boutiqueID, string userID,string limit)
        {
            DataTable dt = new DataTable();
            try
            {
                Product products= new Product();
                products.CategoryCode = CategoryCode;
                products.BoutiqueID = boutiqueID;
                if(limit!="")
                    dt = products.GetProductsByCategory(userID,int.Parse(limit));
                else
                    dt = products.GetProductsByCategory(userID);
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
                //Giving coloumns of image details
                ArrayList imgColNames = new ArrayList();
                ArrayList imgFileNameCols = new ArrayList();
                ArrayList imgFileTypeCols = new ArrayList();
                imgColNames.Add("Image");
                imgFileNameCols.Add("ImageID");
                imgFileTypeCols.Add("FileType");

                return getDbDataAsJSON(dt, imgColNames, imgFileNameCols, imgFileTypeCols, false);
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Categories";
                ETObj.Method = "ProductsByCategory";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion 
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
                dt = boutique.GetBoutiqueByBoutiqueIDForMobile();
                //Giving coloumns of image details
                ArrayList imgColNames = new ArrayList();
                ArrayList imgFileNameCols = new ArrayList();
                ArrayList imgFileTypeCols = new ArrayList();
                imgColNames.Add("Image");
                imgFileNameCols.Add("BoutiqueID");
                return getDbDataAsJSON(dt, imgColNames, imgFileNameCols,null, false);
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Boutique";
                ETObj.Method = "Boutique";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        /// <summary>
        /// To get homescreen banner images of a boutique
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <returns></returns>
        [WebMethod]
        public string BannerImages(string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                //------Getting product details-----
                Boutiques boutique = new Boutiques();
                boutique.BoutiqueID = boutiqueID;
                dt = boutique.GetBannerImagesForMobile();
                //Giving coloumns of image details
                ArrayList imgColNames = new ArrayList();
                ArrayList imgFileNameCols = new ArrayList();
                ArrayList imgFileTypeCols = new ArrayList();
                imgColNames.Add("Image");
                imgFileNameCols.Add("ImageID");
                imgFileTypeCols.Add("FileType");

                return getDbDataAsJSON(dt, imgColNames, imgFileNameCols, imgFileTypeCols, false);
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Boutique";
                ETObj.Method = "BannerImages";
                ETObj.InsertErrorDetailsFromWebService();
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
        /// <param name="referral">Referral loyalty number. sent "null" if there is none</param>
        /// <returns>flag and message. Then OTP number and Loyalty Card Number. also UserID for activation</returns>
        [WebMethod]
        public string UserRegistration(string name, string mobile, string email,string boutiqueID, string gender, string dob, string anniversary, string referral, string address)
        {
            DataTable dt = new DataTable();
            try
            {
                Users user = new Users();
                user.BoutiqueID = boutiqueID;
                user.Name = name;
                user.Mobile = mobile;
                user.Email = email;
                user.DOB = dob;
                user.Anniversary = anniversary;
                user.Gender = gender;
                user.IsActive = true;
                user.CreatedBy = "User";
                user.CreatedDate = DateTime.Now;
                user.IsAdmin = false;
                user.Address = address;

                user.AddNewUser(referral);             
                                
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "User";
                ETObj.Method = "UserRegistration";
                ETObj.InsertErrorDetailsFromWebService();
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
        public string UserActivation(string userID, string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Users user = new Users();
                user.BoutiqueID = boutiqueID;
                user.UserID = userID;
                user.UpdatedBy = "User";
                
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                if (user.UserActivation() == 1)
                {

                    dr["Flag"] = true;
                    dr["Message"] = constants.SuccessfullActivation;
                }
                else
                {
                    dr["Flag"] = false;
                    dr["Message"] = constants.UnSuccessfullActivation;
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "User";
                ETObj.Method = "UserActivation";
                ETObj.InsertErrorDetailsFromWebService();
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "User";
                ETObj.Method = "UserLogin";
                ETObj.InsertErrorDetailsFromWebService();
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "User";
                ETObj.Method = "UserDetails";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        /// <summary>
        /// Reply person's login in chatting app
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public string ChatAppUserLogin(string username, string password)
        {
            DataTable dt = new DataTable();
            try
            {
                Security.UserAuthendication user = new Security.UserAuthendication(username, password);
                if (user.ValidUser)
                {
                    dt.Columns.Add("Flag", typeof(Boolean));
                    dt.Columns.Add("BoutiqueName", typeof(String));
                    dt.Columns.Add("BoutiqueID", typeof(String));
                    dt.Columns.Add("RoleName", typeof(String));
                    dt.Columns.Add("UserID", typeof(String));
                    DataRow dr = dt.NewRow();
                    dr["Flag"] = true;
                    dr["BoutiqueName"] = user.Boutique;
                    dr["BoutiqueID"] = user.BoutiqueID;
                    dr["RoleName"] = user.Role;
                    dr["UserID"] = user.UserID;
                    dt.Rows.Add(dr);
                }
                else
                {
                    dt.Columns.Add("Flag", typeof(Boolean));
                    dt.Columns.Add("Message", typeof(String));
                    DataRow dr = dt.NewRow();
                    dr["Flag"] = false;
                    dr["Message"] = constants.UnSuccessfull;
                    dt.Rows.Add(dr);
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "User";
                ETObj.Method = "ChatAppUserLogin";
                ETObj.InsertErrorDetailsFromWebService();
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Favorites";
                ETObj.Method = "Favorites";
                ETObj.InsertErrorDetailsFromWebService();
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
                    dt = designer.GetAllDesignersForApp();
                    if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
                    //Giving coloumns of image details
                    ArrayList imgColNames = new ArrayList();
                    ArrayList imgFileNameCols = new ArrayList();
                    ArrayList imgFileTypeCols = new ArrayList();
                    imgColNames.Add("Image");
                    imgFileNameCols.Add("DesignerID");
                    return getDbDataAsJSON(dt, imgColNames, imgFileNameCols, null, false);
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "OwnersAndDesigners";
                ETObj.Method = "OwnersAndDesigners";
                ETObj.InsertErrorDetailsFromWebService();
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
        public string Notifications(string notificationIDs, string boutiqueID, string userID)
        {
            DataTable dt = new DataTable();
            try
            {
                    Notification notifications = new Notification();
                    notifications.BoutiqueID = boutiqueID;
                    notifications.UserID = "";//userID;
                    if (notificationIDs == "")                          //App don't have any present notifications
                    {
                        dt = notifications.GetNotificationsForApp(null);
                    }
                    else
                    {
                        dt = notifications.GetNotificationsForApp(notificationIDs);
                    }
                    if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
                    
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Notifications";
                ETObj.Method = "Notifications";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        #region Order 
        /// <summary>
        /// Get list of orders
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        [WebMethod]
        public string Orders(string boutiqueID,string userID)
        {
            DataTable dt = new DataTable();
            try
            {
                Order order = new Order();
                order.BoutiqueID = boutiqueID;
                order.UserID = userID;
                dt = order.GetOrderDetailsByUserID();
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order Status";
                ETObj.Method = "Orders";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        /// <summary>
        /// Product list of an order
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <param name="orderID"></param>
        /// <returns></returns>
        [WebMethod]
        public string OrderItems(string boutiqueID, string orderID)
        {
            DataTable dt = new DataTable();
            try
            {
                Order order = new Order();
                order.BoutiqueID = boutiqueID;
                order.OrderID = orderID;
                dt = order.GetOrderItemsByOrderID().Tables[0];
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order Status";
                ETObj.Method = "OrderItems";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        /// <summary>
        /// To get individual order details
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <param name="orderID"></param>
        /// <returns></returns>
        [WebMethod]
        public string OrderDetailsByID(string boutiqueID, string orderID)
        {
            DataTable dt = new DataTable();
            try
            {
                Order order = new Order();
                order.BoutiqueID = boutiqueID;
                order.OrderID = orderID;
                dt = order.GetOrderDetailsByOrderID().Tables[0];
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order Status";
                ETObj.Method = "OrderDetailsByID";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
         
        #region Order Placing 

        [WebMethod]
       /// To Place order
        public string AddOrder(string BoutiqueID, string UserID, string OrderItemsJson,  string TotalOrderAmount, string DeliveryAddress, string requestDeliveryDate, string requestDeliveryTime)
        {
            //string PlannedDeliveryDate, string PlannedDeliveryTime,
            DataTable dt = new DataTable();
            DataTable orderItems = new DataTable();
            try
            {
                Users user = new Users();
                user.UserID = UserID;
                user.BoutiqueID = BoutiqueID;
                DataSet dsUser = user.SelectUserByUserID();
                if (dsUser.Tables[0].Rows.Count == 0) { throw new Exception(constants.UnSuccessfull); }
                user.Mobile=dsUser.Tables[0].Rows[0]["Mobile"].ToString();
                user.Name = dsUser.Tables[0].Rows[0]["Name"].ToString();
                

                Order odr = new Order();
                odr.BoutiqueID = BoutiqueID;
                odr.UserID = UserID;
                odr.PlannedDeliveryDate = requestDeliveryDate;
                odr.PlannedDeliveryTime = requestDeliveryTime;
                odr.CustomerName = user.Name;
                odr.TotalOrderAmount = Convert.ToInt32(TotalOrderAmount);
                odr.DeliveryAddress = DeliveryAddress;
                odr.MobileNo = user.Mobile;
                odr.StatusCode = "0";   //Pending
                odr.CreatedBy = "UserFromApp";

                orderItems = (DataTable)JsonConvert.DeserializeObject(OrderItemsJson, (typeof(DataTable)));

                if (odr.InsertOrder() == 1)
                {
                    foreach (DataRow odrItem in orderItems.Rows)
                    {
                        odr.ProductID = odrItem["ProductID"].ToString();
                        odr.TypeCode = odrItem["TypeCode"].ToString();
                        odr.Quantity = odrItem["Quantity"].ToString();
                        odr.ItemPrice = odrItem["Price"].ToString();
                        if (odr.InsertOrderItem() != 1)
                        {
                            throw new Exception(constants.UnSuccessfull);
                        }
                    }
                }
                else
                {
                    throw new Exception(constants.UnSuccessfull);
                }

                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                dt.Columns.Add("OrderID", typeof(String));
                dt.Columns.Add("OrderNo", typeof(Int64));

                DataRow dr = dt.NewRow();
                dr["Flag"] = true;
                dr["Message"] = constants.Successfull;
                dr["OrderID"] = odr.OrderID;
                dr["OrderNo"] = odr.OrderNo;
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Oder";
                ETObj.Method = "AddOrder";
                ETObj.InsertErrorDetailsFromWebService();
            }
           
            return getDbDataAsJSON(dt);
        }


        #endregion Order Placing

        #endregion

        #region Reviews
        /// <summary>
        /// Webservice to get product reviews including the user's review
        /// </summary>
        /// <param name="productID"></param>
        /// <param name="boutiqueID"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        [WebMethod]
        public string ReviewsList(string productID,string boutiqueID, string userID)
        {
            DataTable dt = new DataTable();
            try
            {
                Product product = new Product();
                product.BoutiqueID = boutiqueID;
                product.ProductID = productID;
                dt = product.GetProductReviewsForMobile(userID);
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Reviews";
                ETObj.Method = "ReviewsList";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        /// <summary>
        /// Webservice to add new review to a product
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="boutiqueID"></param>
        /// <param name="productID"></param>
        /// <param name="reviewDescription"></param>
        /// <returns></returns>
        [WebMethod]
        public string InsertProductReview(string userID, string boutiqueID,string productID,string reviewDescription)
        {
            DataTable dt = new DataTable();
            try
            {
                Product product = new Product();
                product.BoutiqueID = boutiqueID;
                product.ProductID = productID;
                product.ReviewDescription = reviewDescription;

                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                if (product.InsertProductReview(userID) == 1)
                {
                    dr["Flag"] = true;
                    dr["Message"] = constants.Successfull;
                }
                else
                {
                    dr["Flag"] = false;
                    dr["Message"] = constants.UnSuccessfull;
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Reviews";
                ETObj.Method = "InsertProductReview";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        /// <summary>
        /// To delete a product review
        /// </summary>
        /// <param name="reviewID"></param>
        /// <param name="boutiqueID"></param>
        /// <returns></returns>
        [WebMethod]
        public string DeleteProductReview(string reviewID, string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Product product = new Product();
                product.BoutiqueID = boutiqueID;
                product.ReviewID = reviewID;

                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                if (product.DeleteProductReview() == 1)
                {
                    dr["Flag"] = true;
                    dr["Message"] = constants.Successfull;
                }
                else
                {
                    dr["Flag"] = false;
                    dr["Message"] = constants.UnSuccessfull;
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Reviews";
                ETObj.Method = "DeleteProductReview";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        #endregion

        #region Chat
        /// <summary>
        /// webservice to insert a chat message. 
        /// </summary>
        /// <param name="userID">customer</param>
        /// <param name="replyPersonID">can be empty string if message comes from customer app</param>
        /// <param name="boutiqueID"></param>
        /// <param name="direction">dierction  of message. "in": from customer to admin. "out": from admin/reply person to customer</param>
        /// <param name="message"></param>
        /// <param name="productID">regarding the product, which can be null</param>
        /// <returns></returns>
        [WebMethod]
        public string InsertChat(string userID, string replyPersonID, string boutiqueID, string direction, string message, string productID)
        {
            DataTable dt = new DataTable();
            try
            {
                Chat chat = new Chat();
                chat.BoutiqueID = boutiqueID;
                chat.UserID = userID;
                chat.ReplyPersonID = replyPersonID;
                chat.Direction = direction;
                chat.Message = message;
                chat.ProductID = productID;

                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));                
                dt.Columns.Add("MessageID", typeof(string));
                DataRow dr = dt.NewRow();
                if (chat.InsertChatMessage() == 1)
                {
                    dr["Flag"] = true;
                    dr["Message"] = constants.Successfull;
                    dr["MessageID"] = chat.MessageID;

                }
                else
                {
                    dr["Flag"] = false;
                    dr["Message"] = constants.UnSuccessfull;
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Chat";
                ETObj.Method = "InsertChat";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        /// <summary>
        /// to get messages
        /// give Reply personID when querry is a reply.
        /// leave it null when querry is from customer.
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public string GetMessages(string userID, string replyPersonID, string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Chat chat = new Chat();
                chat.BoutiqueID = boutiqueID;
                chat.UserID = userID;
                chat.ReplyPersonID = replyPersonID;
                dt = chat.GetChats();
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Chat";
                ETObj.Method = "GetMessages";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        /// <summary>
        /// To update the delivery bit to true
        /// </summary>
        /// <param name="messageIDs">comma seperated message ids that are delivered</param>
        /// <param name="boutiqueID"></param>
        /// /// <param name="person">"Customer" or "Reply"</param>
        /// <returns></returns>
        [WebMethod]
        public string UpdateDeliveryStatus(string messageIDs, string boutiqueID,string person)
        {   
            DataTable dt = new DataTable();
            try
            {
                Chat chat = new Chat();
                chat.BoutiqueID = boutiqueID;
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));                
                DataRow dr = dt.NewRow();
                if (chat.UpdateDeliveryStatus(messageIDs,person) == 1)
                {
                    dr["Flag"] = true;
                    dr["Message"] = constants.Successfull;
                }
                else
                {
                    dr["Flag"] = false;
                    dr["Message"] = constants.UnSuccessfull;
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Chat";
                ETObj.Method = "UpdateDeliveryStatus";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        /// <summary>
        /// To get product details on chat screen
        /// </summary>
        /// <param name="productID"></param>
        /// <param name="boutiqueID"></param>
        /// <returns></returns>
        [WebMethod]
        public string GetProductDetailsOnChat(string productID, string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Chat chat = new Chat();
                chat.BoutiqueID = boutiqueID;
                chat.ProductID = productID;                
                dt = chat.GetProductDetailForChat();
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
                //Giving coloumns of image details
                ArrayList imgColNames = new ArrayList();
                ArrayList imgFileNameCols = new ArrayList();
                ArrayList imgFileTypeCols = new ArrayList();
                imgColNames.Add("Image");
                imgFileNameCols.Add("ImageID");
                imgFileTypeCols.Add("FileType");

                return getDbDataAsJSON(dt, imgColNames, imgFileNameCols, imgFileTypeCols, false);
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Chat";
                ETObj.Method = "GetProductDetailsOnChat";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        #region OwnerApp
        [WebMethod]
        public string PurchaseGraph(string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Loyalty purchase = new Loyalty();
                purchase.BoutiqueID = boutiqueID;
                dt = purchase.GetPurchaseDetailsforGraph();
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "OwnerApp";
                ETObj.Method = "PurchaseGraph";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        [WebMethod]
        public string ProductsForOwnersApp(string boutiqueID)
        {
            DataTable dt = new DataTable();
            try
            {
                Product product = new Product();
                product.BoutiqueID = boutiqueID;
                dt = product.GetProductForOwnerApp();
                if (dt.Rows.Count == 0) { throw new Exception(constants.NoItems); }
                //Giving coloumns of image details
                ArrayList imgColNames = new ArrayList();
                ArrayList imgFileNameCols = new ArrayList();
                ArrayList imgFileTypeCols = new ArrayList();
                imgColNames.Add("Image");
                imgFileNameCols.Add("ImageID");
                imgFileTypeCols.Add("FileType");

                return getDbDataAsJSON(dt, imgColNames, imgFileNameCols, imgFileTypeCols, false);
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = boutiqueID;
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Chat";
                ETObj.Method = "GetProductDetailsOnChat";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        #region Error Detection
        [WebMethod]
        public string ErrorDetection(string REPORT_ID, string PACKAGE_NAME, Object BUILD, string LOGCAT,string ANDROID_VERSION,string APP_VERSION_CODE,string AVAILABLE_MEM_SIZE,Object CRASH_CONFIGURATION)
        {
            DataTable dt = new DataTable();
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            try
            {   //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = Guid.Empty.ToString();
                ETObj.UserID = Guid.Empty.ToString();
                ETObj.ErrorID = REPORT_ID;
                ETObj.Description = "REPORT_ID\n\n"+ REPORT_ID
                                    + "\n\nBUILD\n\n"+ serializer.Serialize(BUILD) 
                                    + "\n\nLOGCAT\n\n" + LOGCAT
                                    + "\n\nCRASH_CONFIGURATION\n\n" + serializer.Serialize(CRASH_CONFIGURATION)
                                    + "\n\nAVAILABLE_MEM_SIZE\n\n" + AVAILABLE_MEM_SIZE ;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = PACKAGE_NAME;
                ETObj.ErrorSource = "App";
                ETObj.IsMobile = true;
                ETObj.Version = ANDROID_VERSION+ "/"+ APP_VERSION_CODE;
                ETObj.CreatedBy = "App";
                ETObj.InsertErrorDetailsFromApp();
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
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Error Detection";
                ETObj.Method = "ErrorDetection";
                ETObj.InsertErrorDetailsFromWebService();
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

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Error Detection";
                ETObj.Method = "ErrorDetection";
                ETObj.InsertErrorDetailsFromWebService();

                return getDbDataAsJSON(ErrorMsg);

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
        public String getDbDataAsJSON(DataTable dt, ArrayList imgColName, ArrayList imgFileNameCol, ArrayList imgFileTypeCol, Boolean isThumb = false)
        {
            try
            {
               // DataTable dt = ds.Tables[0];
                String filePath = Server.MapPath("~/Media/");

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
                            String fileURL;
                            if(imgFileTypeCol!=null)
                                fileURL = filePath + dr[imgFileNameCol[i] as string].ToString().Replace(" ", "_") + dr[imgFileTypeCol[i] as string].ToString();
                            else
                                fileURL = filePath + dr[imgFileNameCol[i] as string].ToString().Replace(" ", "_")+".jpg";
                            
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

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.Description = ex.Message;
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Error Detection";
                ETObj.Method = "ErrorDetection";
                ETObj.InsertErrorDetailsFromWebService();
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