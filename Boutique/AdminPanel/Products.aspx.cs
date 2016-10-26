using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

//


//

namespace Boutique.AdminPanel
{
    public partial class Products : System.Web.UI.Page
    {

        public DAL.Security.UserAuthendication UA;
        UIClasses.Const Const = new UIClasses.Const();

        protected void Page_Load(object sender, EventArgs e)
        {

            UA = (DAL.Security.UserAuthendication)Session[Const.LoginSession];
            if (UA == null)
            {
                Response.Redirect(Const.LoginPageURL);

            }
            if (UA.Role == Const.Manager)
            {

                productDetailsDiv.Visible = false;


            }
            this.DataBind();

        }


        #region SessionCheck
        public DAL.Security.UserAuthendication SessionCheck()
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            if (UA == null)
            {
                Response.Redirect(Const.LoginPageURL);
                return UA;

            }
            return UA;
        }
        #endregion SessionCheck

        #region InsertProduct

        [System.Web.Services.WebMethod]

        public static string InsertProduct(Product productObj)
        {
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
                        productObj.BoutiqueID = UA.BoutiqueID;
                        productObj.CreatedBy = UA.userName;
                        //returns status and productid
                        productObj.status = productObj.InsertProduct().ToString();
                    }
                }
                else
                {

                }


            }
            catch (Exception)
            {

            }


            return jsSerializer.Serialize(productObj);
        }

        #endregion InsertProduct

        #region UpdateProduct
        [System.Web.Services.WebMethod]
        public static string UpdateProduct(Product productObj)
        {

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
                        productObj.BoutiqueID = UA.BoutiqueID;
                        productObj.UpdatedBy = UA.userName;
                        //returns status and productid
                        productObj.status = productObj.UpdateProduct().ToString();

                    }
                }
                else
                {

                }
            }
            catch (Exception)
            {

            }

            return jsSerializer.Serialize(productObj);
        }
        #endregion UpdateProduct

        #region DeleteProduct

        [System.Web.Services.WebMethod]
        public static string DeleteProduct(Product productObj)
        {

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
                        productObj.BoutiqueID = UA.BoutiqueID;
                        productObj.UpdatedBy = UA.userName;
                        productObj.status = productObj.DeleteProduct().ToString();

                    }
                }
                else
                {

                }
            }
            catch (Exception)
            {

            }

            return jsSerializer.Serialize(productObj);
        }
        #endregion DeleteProduct

        #region InsertProductImage
        //[System.Web.Services.WebMethod]
        public string InsertProductImage()
        {


            return "333";
        }

        #endregion InsertProductImage

        #region DeleteProudctImage
        [System.Web.Services.WebMethod]
        public static string DeleteProudctImage(Product productObj)
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
                    //returns status and productid
                    productObj.status = productObj.DeleteProudctImage().ToString();
                }
            }
            catch (Exception)
            {

            }

            return jsSerializer.Serialize(productObj);
        }
        #endregion DeleteProudctImage

        #region GetAllProductMainImages
        [System.Web.Services.WebMethod]
        public static string GetAllProductMainImages(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetAllProductMainImagesDetails();


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
            return jsSerializer.Serialize("");
        }
        #endregion GetAllProductMainImages

        #region GetAllRowsCount
        [System.Web.Services.WebMethod]
        public static string GetAllRowsCount(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            if (UA.BoutiqueID != "")
            {

                productObj.BoutiqueID = UA.BoutiqueID;
                productObj.GetAllTotalCount();
            }

            return jsSerializer.Serialize(productObj);
        }
        #endregion GetAllRowsCount

        #region GetAllOutOfStockProductMainImages
        [System.Web.Services.WebMethod]
        public static string GetAllOutOfStockProductMainImages(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetAllOutOfStockProductMainImagesDetails();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetAllOutOfStockProductMainImages

        #region GetAllTrendingProductsMainImagesDetails
        [System.Web.Services.WebMethod]
        public static string GetAllTrendingProductsMainImagesDetails(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetAllTrendingProductsMainImagesDetails();

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
            return jsSerializer.Serialize("");
        }

        #endregion GetAllTrendingProductsMainImagesDetails

        #region GetAllDeletedProductDetails
        [System.Web.Services.WebMethod]
        public static string GetAllDeletedProductDetails(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetAllDeletedProductsDetails();
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
            return jsSerializer.Serialize("");
        }

        #endregion GetAllDeletedProductDetails

        #region GetAllProductImages

        [System.Web.Services.WebMethod]
        public static string GetAllProductImages(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetAllProductImages();

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
            return jsSerializer.Serialize("");
        }

        #endregion GetAllProductImages

        #region GetAllProductIDandName
        [System.Web.Services.WebMethod]
        public static string GetAllProductIDandName(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;

                DataSet ds = null;

                ds = productObj.GetAllProductIDAndName();

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
            return jsSerializer.Serialize("");
        }

        #endregion GetAllProductIDandName

        #region GetAllProductIDandNameForNewsLetter
        [System.Web.Services.WebMethod]
        public static string GetAllProductIDandNameForNewsLetter(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;

                DataSet ds = null;

                ds = productObj.GetAllProductIDAndNameForNewsLetter();

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
            return jsSerializer.Serialize("");
        }

        #endregion GetAllProductIDandNameForNewsLetter

        #region GetAllRelatedProductsByProductID
        [System.Web.Services.WebMethod]
        public static string GetAllRelatedProductsByProductID(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;

                DataSet ds = null;

                ds = productObj.GetAllRelatedProducts();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetAllRelatedProductsByProductID

        #region GetAllRelatedProductIDandName

        public static string GetAllRelatedProductIDandName(Product productObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;

                //ds = productObj.GetAllProductIDAndName();

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
            return jsSerializer.Serialize("");
        }

        #endregion GetAllRelatedProductIDandName

        #region GetAllNewTrendingProductsMainDetailsBySearch
        [System.Web.Services.WebMethod]
        public static string GetAllNewTrendingProductsMainDetailsBySearch(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetNewTrendingDetailsBySearch();

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
            return jsSerializer.Serialize("");
        }

        #endregion GetAllNewTrendingProductsMainDetailsBySearch

        #region GetAllNewOutOfStockProductMainDetailsBySearch
        [System.Web.Services.WebMethod]
        public static string GetAllNewOutOfStockProductMainDetailsBySearch(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetNewOutOfStockDetailBySearch();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetAllNewOutOfStockProductMainDetailsBySearch

        #region GetAllNewProductMainDetailsBySearch
        [System.Web.Services.WebMethod]
        public static string GetAllNewProductMainDetailsBySearch(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetNewProductDetailBySearch();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetAllNewProductMainDetailsBySearch

        #region GetAllRevivedProductDetailsBySearch
        [System.Web.Services.WebMethod]
        public static string GetAllRevivedProductDetailsBySearch(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetDeletedProductDetailsBySearch();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetAllRevivedProductDetailsBySearch

        #region GetAllProductImagesFornewsLetter

        [System.Web.Services.WebMethod]
        public static string GetAllProductImagesFornewsLetter(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetImageIdForNewsLetter();

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
            return jsSerializer.Serialize("");
        }

        #endregion GetAllProductImagesFornewsLetter

        #region ReviveProduct
        [System.Web.Services.WebMethod]

        public static string ReviveProduct(Product productObj)
        {
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
                        productObj.BoutiqueID = UA.BoutiqueID;
                        productObj.UpdatedBy = UA.userName;
                        //returns status and productid
                        productObj.status = productObj.ReviveProduct().ToString();
                    }
                }
                else
                {

                }
            }
            catch (Exception)
            {

            }
            return jsSerializer.Serialize(productObj);
        }
        #endregion ReviveProduct

        #region GetSortDetails
        [System.Web.Services.WebMethod]
        public static string GetSortDetails(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetSortReults();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetSortDetails

        #region GetReviveSortDetails
        [System.Web.Services.WebMethod]
        public static string GetReviveSortDetails(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetReviveSortReults();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetReviveSortDetails

        #region GetTrendsSortDetails
        [System.Web.Services.WebMethod]
        public static string GetTrendsSortDetails(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetTrendsSortReults();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetTrendsSortDetails

        #region GetOutOfStockSortDetails
        [System.Web.Services.WebMethod]
        public static string GetOutOfStockSortDetails(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetOutOfStockSortReults();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetOutOfStockSortDetails

        #region GetCategorySortDetails
        [System.Web.Services.WebMethod]
        public static string GetCategorySortDetails(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetCategorySortReults();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetCategorySortDetails

        #region GetTrendingCategorySortDetails
        [System.Web.Services.WebMethod]
        public static string GetTrendingCategorySortDetails(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetTrendingCategorySortReults();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetTrendingCategorySortDetails

        #region GetOutOfStocksCategorySortDetails
        [System.Web.Services.WebMethod]
        public static string GetOutOfStocksCategorySortDetails(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetOutOfStocksCategorySortReults();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetOutOfStocksCategorySortDetails

        #region GetReviveCategorySortDetails
        [System.Web.Services.WebMethod]
        public static string GetReviveCategorySortDetails(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetReviveCategorySortReults();

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
            return jsSerializer.Serialize("");
        }
        #endregion GetReviveCategorySortDetails

        //-------- * Product Type Methods  * ----------//

        #region Product Type Methods

        #region GetAllProductTypeIDandName
        [System.Web.Services.WebMethod]
        ///This datasource will be binded to Product Type Dropdown
        public static string GetAllProductTypeIDandName(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetAllProductTypeIDAndName();

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
            return jsSerializer.Serialize("");
        }

        #endregion GetAllProductTypeIDandName

        #region Insert Product Type

        [System.Web.Services.WebMethod]

        public static string InsertProductType(Product productObj)
        {
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
                        productObj.BoutiqueID = UA.BoutiqueID;
                        productObj.status = productObj.InsertProductType().ToString();
                    }
                }
               
            }
            catch (Exception e)
            {
                throw e;
            }


            return jsSerializer.Serialize(productObj);
        }

        #endregion Insert Product Type

        #region Insert Product Type

        [System.Web.Services.WebMethod]
        ///It handles both insert and update of Product types
        public static string UpdateProductTypeDetails(Product productObj)
        {
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
                        productObj.BoutiqueID = UA.BoutiqueID;
                        DataSet ds = null;
                        ds = productObj.GetProductTypesByProductID();
                        DataRow[] FilteredRow = ds.Tables[0].Select("ProductID = '" + productObj.ProductID + "' AND Code = '" + productObj.ProductTypeCode+"'");

                        //---------- * Already Existing : So case is UPDATE * --------//

                        if (FilteredRow.Length > 0) 
                        {
                            productObj.status = productObj.UpdateProducTypeDetails().ToString();
                        }
                        else
                        {
                            //----------- * New Type :INSERT  *-------------//
                            productObj.status = productObj.InsertProductType().ToString();
                        }
                        
                    }
                }

            }
            catch (Exception e)
            {
                throw e;
            }


            return jsSerializer.Serialize(productObj);
        }

        #endregion Insert Product Type

        #region Delete Product Type

        [System.Web.Services.WebMethod]

        public static string DeleteProductType(Product productObj)
        {
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
                        productObj.BoutiqueID = UA.BoutiqueID;
                        productObj.status = productObj.DeleteProductTypeByProductIDAndCode().ToString();
                       
                    }
                }

            }
            catch (Exception e)
            {
                throw e;
            }


            return jsSerializer.Serialize(productObj);
        }

        #endregion Delete Product Type

        #region Get Product Types By ProductID
        [System.Web.Services.WebMethod]
        public static string GetProductTypesByProductID(Product productObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
              //  productObj.BoutiqueID = UA.BoutiqueID;
                DataSet ds = null;
                ds = productObj.GetProductTypesByProductID();
                
              //  "Size >= 230 AND Sex = 'm'"
                
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
            return jsSerializer.Serialize("");
        }
        #endregion Get Product Types By ProductID

        #endregion Product Type Methods

       //----- *END : Product Type Methods  * ---------//
    }
}