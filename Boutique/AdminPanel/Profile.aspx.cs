using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace Boutique.AdminPanel
{
    public partial class Profile : System.Web.UI.Page
    {
        DAL.Security.UserAuthendication UA;
        UIClasses.Const Const = new UIClasses.Const();

        protected void Page_Load(object sender, EventArgs e)
        {
            UA = (DAL.Security.UserAuthendication)Session[Const.LoginSession];

        
            if (UA.Role == Const.Manager)
            {
                NewOwner.Visible = false;
                footer.Visible = false;

            }

        }

        #region NewBoutique
        [System.Web.Services.WebMethod]
        public static string NewBoutique(Boutiques boutiqueObj)
        {
           
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            boutiqueObj.BoutiqueID = UA.BoutiqueID;

            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                if (boutiqueObj.BoutiqueID != null)
                {

                    boutiqueObj.UpdatedBy = UA.userName;
                    boutiqueObj.status = boutiqueObj.EditBoutique().ToString();
                }
                else
                {
                    // status = boutiqueobj.NewBoutique().ToString();

                }

            }
            catch(Exception ex)
            {
               // status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Profile";
                ETObj.Method = "NewBoutique";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsSerializer.Serialize(boutiqueObj);
        }
        #endregion NewBoutique

        #region BindBoutiqueDetails
        [System.Web.Services.WebMethod]
        public static string BindBoutiqueDetails(Boutiques boutiqueObj)
        {
            string jsResult = null;
          
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            boutiqueObj.BoutiqueID = UA.BoutiqueID;

            DataSet ds = null;
            try
            {

               
                ds = boutiqueObj.GetBoutique();
                if ((ds.Tables[0].Rows.Count > 0) && (ds != null))
                {

                    //Converting to Json

                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                    Dictionary<string, object> childRow;
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            childRow = new Dictionary<string, object>();
                            foreach (DataColumn col in ds.Tables[0].Columns)
                            {
                                childRow.Add(col.ColumnName, row[col]);
                            }
                            parentRow.Add(childRow);
                        }
                        jsResult = jsSerializer.Serialize(parentRow);

                    }

                }

            }

            catch (Exception ex)
            {
                //status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Profile";
                ETObj.Method = "BindBoutiqueDetails";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            finally
            {

            }
            return jsResult;
        }
        #endregion BindBoutiqueDetails

        #region DeleteOwner
        [System.Web.Services.WebMethod]
        public static string DeleteOwner(Owners ownersObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            ownersObj.BoutiqueID = UA.BoutiqueID;

            string status = null;
            try
            {

                status = ownersObj.DeleteOwner().ToString();

            }
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Profile";
                ETObj.Method = "DeleteOwner";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            finally
            {

            }
            return status;
        }

        #endregion DeleteOwner

        #region InsertOwner

        [System.Web.Services.WebMethod]
        public static string InsertOwner(Owners ownersObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];


            string status = null;
            try
            {
                Users obj = new Users();
                ownersObj.BoutiqueID = UA.BoutiqueID;
                obj.BoutiqueID = UA.BoutiqueID;
                obj.Name = ownersObj.Name;
                obj.Mobile = ownersObj.Phone;
                obj.Email = ownersObj.Email;
                obj.DOB = ownersObj.DOB;
                obj.Gender = ownersObj.Gender;
                obj.CreatedBy = UA.userName;
                

                if (ownersObj.OwnerID != null && ownersObj.OwnerID!="")
                {
                    ownersObj.UpdatedBy = UA.userName;
                    status = ownersObj.UpdateOwner().ToString();

                }
                else
                {
                    obj.IsAdmin = true;
                    obj.AddNewUser();

                    ownersObj.UserID=obj.UserID;
                    ownersObj.CreatedBy = UA.userName;
                    

                    status = ownersObj.InsertOwner().ToString();
                }

            }
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Profile";
                ETObj.Method = "InsertOwner";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            finally
            {

            }
            return status;
        }
        #endregion NewOwner

        #region GetOwner
        [System.Web.Services.WebMethod]
        public static string GetOwner(Owners ownersObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            ownersObj.BoutiqueID = UA.BoutiqueID;
            string status = null;
            DataTable dt = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            try
            {
                dt = ownersObj.GetOwner();
                //Converting to Json
               
                Dictionary<string, object> childRow;
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow row in dt.Rows)
                    {
                        childRow = new Dictionary<string, object>();
                        foreach (DataColumn col in dt.Columns)
                        {
                            childRow.Add(col.ColumnName, row[col]);
                        }
                        parentRow.Add(childRow);
                    }

                }
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Profile";
                ETObj.Method = "GetOwner";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }

            return jsSerializer.Serialize(parentRow);




            //Converting to Json
        }
        #endregion GetOwner

        #region GetAllOwners
        [System.Web.Services.WebMethod]
        public static string GetAllOwners(Owners OwnerObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;

            DataTable dt = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            OwnerObj.BoutiqueID = UA.BoutiqueID;
            try
            {
                dt = OwnerObj.GetAllOwners();
                //Converting to Json
                
                Dictionary<string, object> childRow;
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow row in dt.Rows)
                    {
                        childRow = new Dictionary<string, object>();
                        foreach (DataColumn col in dt.Columns)
                        {
                            childRow.Add(col.ColumnName, row[col]);
                        }
                        parentRow.Add(childRow);
                    }
                }
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Profile";
                ETObj.Method = "GetAllOwners";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsSerializer.Serialize(parentRow);
            //Converting to Json
        }
        #endregion GetAllOwners

        #region Role

        [System.Web.Services.WebMethod]
        public static string Role()
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            string status = null;
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string B_ID = UA.Role;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<object> parentRow = new List<object>();

            try
            {
                parentRow.Add(UA.Role);
                parentRow.Add(UA.userName);
                parentRow.Add(UA.BoutiqueCurrencyCode);
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Profile";
                ETObj.Method = "Role";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsSerializer.Serialize(parentRow);

        }


        #endregion 

        //---------- * Banners *------------//

        #region Get All Banner Images

        [System.Web.Services.WebMethod]
        public static string GetAllBannerImages(Boutiques boutiqueObj)
        {
            string status = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                if (UA.BoutiqueID != "")
                {
                    boutiqueObj.BoutiqueID = UA.BoutiqueID;

                    //boutiqueObj.BoutiqueID = "E4CE4213-B1DC-443F-8576-4778F35E7383";


                    DataSet ds = null;
                    ds = boutiqueObj.GetBannerImages();

                    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                    Dictionary<string, object> childRow;

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            childRow = new Dictionary<string, object>();
                            foreach (DataColumn col in ds.Tables[0].Columns)
                            {
                                childRow.Add(col.ColumnName, row[col]);
                            }
                            parentRow.Add(childRow);
                        }
                    }
                    return jsSerializer.Serialize(parentRow);
                }
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Profile";
                ETObj.Method = "GetAllBannerImages";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsSerializer.Serialize("");
        }

        #endregion GetAllBannerImages

        #region Update OrderNo
        [System.Web.Services.WebMethod]
        public static string UpdateorderNo(Boutiques boutiqueObj)
        {
            string status = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                if (UA != null)
                {
                    if (UA.BoutiqueID != "")
                    {
                        boutiqueObj.BoutiqueID = UA.BoutiqueID;
                        boutiqueObj.UpdatedBy = UA.userName;
                        //returns status and productid
                        boutiqueObj.status = boutiqueObj.UpdateorderNo().ToString();

                    }
                }
               
            }
            catch (Exception ex)
            {

                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Profile";
                ETObj.Method = "UpdateorderNo";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }

            return jsSerializer.Serialize(boutiqueObj);
         }
        #endregion UpdateorderNo

        #region Update Banner Details By ImageID
        [System.Web.Services.WebMethod]
        public static string UpdateBannerDetailsByImgID(Boutiques boutiqueObj)
        {

            string status = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                if (UA != null)
                {
                    if (UA.BoutiqueID != "")
                    {
                        boutiqueObj.BoutiqueID = UA.BoutiqueID;
                        boutiqueObj.UpdatedBy = UA.userName;
                        //returns status and productid
                        boutiqueObj.status = boutiqueObj.UpdateBannerDetailsByImgID().ToString();
                    }
                }
                
            }
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Profile";
                ETObj.Method = "UpdateBannerDetailsByImgID";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }

            return jsSerializer.Serialize(boutiqueObj);
         }
        #endregion Update Banner Details By ImageID

        #region Delete Banner
        [System.Web.Services.WebMethod]
        public static string DeleteBannerByImageID(Boutiques boutiqueObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            boutiqueObj.BoutiqueID = UA.BoutiqueID;

            string status = null;
            try
            {

                status = boutiqueObj.DeleteBannerByImageID().ToString();

            }
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Profile";
                ETObj.Method = "DeleteBannerByImageID";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            finally
            {

            }
            return status;
        }

        #endregion Delete Banner

    }
}