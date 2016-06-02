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
        protected void Page_Load(object sender, EventArgs e)
        {
          
        }
      

        #region InsertProduct
        [System.Web.Services.WebMethod]
        public static string InsertProduct(Product productObj)
        {
            List<Product> prodList = new List<Product>();
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
                  
                    prodList.Add(productObj);
                    
                   
                }
            }
            catch (Exception)
            {

            }
            return jsSerializer.Serialize(prodList);
        }
        #endregion InsertProduct

        #region UpdateProduct
        [System.Web.Services.WebMethod]
        public static string UpdateProduct(Product productObj)
        {
            List<Product> prodList = new List<Product>();
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
                    
                    prodList.Add(productObj);


                }
            }
            catch (Exception)
            {

            }

            return jsSerializer.Serialize(prodList);
         }
        #endregion UpdateProduct

        #region InsertProductImage
        //[System.Web.Services.WebMethod]
        public string InsertProductImage()
        {
            

            return "333";
        }

        #endregion InsertProductImage

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

        #region GetAllProducts
        [System.Web.Services.WebMethod]
        public static string GetAllProductIDandName(string Boutiqueid)
        {
            DataSet ds = null;
            Product productObj = new Product();
            ds = productObj.GetAllProductIDAndName(Boutiqueid);
            
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
            }
            return jsSerializer.Serialize(parentRow);
        }

        #endregion GetAllProducts

        



    }
}