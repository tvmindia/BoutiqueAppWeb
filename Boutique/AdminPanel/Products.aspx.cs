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

        DAL.Security.UserAuthendication UA;
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
          
        }


      

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
                if (UA.BoutiqueID != "")
                {
                    productObj.BoutiqueID = UA.BoutiqueID;
                    productObj.CreatedBy = UA.userName;
                   //returns status and productid
                    productObj.status = productObj.InsertProduct().ToString();
                  
                    
                   
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
                if (UA.BoutiqueID != "")
                {
                    productObj.BoutiqueID = UA.BoutiqueID;
                    productObj.UpdatedBy = UA.userName;
                    //returns status and productid
                    productObj.status = productObj.UpdateProduct().ToString();
                   
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
                if (UA.BoutiqueID != "")
                {
                    productObj.BoutiqueID = UA.BoutiqueID;
                    productObj.UpdatedBy = UA.userName;
                    productObj.status = productObj.DeleteProduct().ToString();
                  
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

    }
}