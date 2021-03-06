﻿using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Boutique.AdminPanel
{
    public partial class Category : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region Methods

        #region Check_Categories
        [System.Web.Services.WebMethod]
        public static string CheckCategories(Product CategoryObj)
        {
            string status=string.Empty;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
               
                if (UA.BoutiqueID != "")
                {
                    CategoryObj.BoutiqueID = UA.BoutiqueID;

                    status = CategoryObj.CheckCategory();
                    return jsSerializer.Serialize(status);
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
                ETObj.Module = "Category";
                ETObj.Method = "CheckCategories";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsSerializer.Serialize("");

           
        }

        #endregion Check_Categories

        #region GetAllCategories
        [System.Web.Services.WebMethod]
        public static string GetAllCategories(Product productObj)
        {
          
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                if (UA.BoutiqueID != "")
                {
                    productObj.BoutiqueID = UA.BoutiqueID;
                    DataSet ds = null;
                    ds = productObj.GetAllCategories();
                    //Converting to Json
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
               // status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Category";
                ETObj.Method = "GetAllCategories";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsSerializer.Serialize("");

            //Converting to Json
        }

        #endregion GetAllCategories

        #region GetAllCategoryIDandName
        [System.Web.Services.WebMethod]
        public static string GetAllCategoryIDandName(Product productObj)
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
                    productObj.BoutiqueID = UA.BoutiqueID;
                    DataSet ds = null;
                    ds = productObj.GetAllCategoryIDAndName();
                    //Converting to Json
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
                ETObj.Module = "Category";
                ETObj.Method = "GetAllCategoryIDandName";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsSerializer.Serialize("");
          
            //Converting to Json
        }

        #endregion GetAllCategoryIDandName

        #region GetCategoryByCategoryCode

        [System.Web.Services.WebMethod]
        public static string GetCategoryByCategoryCode(Product categoryObj)
        {
            string status = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            categoryObj.BoutiqueID = UA.BoutiqueID;
            DataSet ds = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            try
            {
                ds = categoryObj.GetCategory();

                // Converting to Json
               
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
                ETObj.Module = "Category";
                ETObj.Method = "GetCategoryByCategoryCode";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsSerializer.Serialize(parentRow);

          
          
            //Converting to Json
        }
        #endregion GetCategory

        #region InsertCategory
        [System.Web.Services.WebMethod]
        public static string InsertCategory(Product categoryObj)
        {
            string status = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            categoryObj.BoutiqueID = UA.BoutiqueID;
            categoryObj.CreatedBy = UA.userName;
             try
             {
                 if (categoryObj.CategoryCode != "")
                 {
                     status = categoryObj.InsertCategory().ToString();
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
                 ETObj.Module = "Category";
                 ETObj.Method = "InsertCategory";
                 ETObj.ErrorSource = "Code-Behind";
                 ETObj.IsMobile = false;
                 ETObj.Version = UA.Version;
                 ETObj.CreatedBy = UA.userName;
                 ETObj.InsertErrorDetails();
             }
             return status;
        }
        #endregion InsertCategory

        #region UpdateCategory
        [System.Web.Services.WebMethod]
        public static string UpdateCategory(Product categoryObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            categoryObj.BoutiqueID = UA.BoutiqueID;
            categoryObj.UpdatedBy = UA.userName;

            string status = null;
            try
            {
                status = categoryObj.EditCategory().ToString();

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
                ETObj.Module = "Category";
                ETObj.Method = "UpdateCategory";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return status;
        }
        #endregion UpdateCategory

        #region DeleteCategory

        [System.Web.Services.WebMethod]
        public static string DeleteCategory(Product categoryObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            categoryObj.BoutiqueID = UA.BoutiqueID;
            string status = null;
            try
            {
                status = categoryObj.DeleteCategory().ToString();

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
                ETObj.Module = "Category";
                ETObj.Method = "DeleteCategory";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return status;
        }
        #endregion DeleteCategory

        #endregion Methods

    }
}