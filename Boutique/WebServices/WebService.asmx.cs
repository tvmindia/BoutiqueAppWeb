﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Boutique.DAL;
using System.Data;

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
                Product product = new Product();
                product.ProductID = productID;
                product.BoutiqueID = boutiqueID;
                dt = product.GetProductByProductID();

                DataTable favInfo=product.FavoriteInfo(userID);
                dt.Columns.Add("FavCount", typeof(int));
                dt.Columns.Add("isFav", typeof(Boolean));
                dt.Rows[0]["FavCount"] = favInfo.Rows[0]["FavCount"];
                dt.Rows[0]["isFav"] = favInfo.Rows[0]["isFav"];                
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

        #region Boutique


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
        [WebMethod]
        public string UserRegistration(string name, string mobile, string email,string boutiqueID, DateTime dob, DateTime anniversary,string gender)
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
                user.AddNewUser();

                Int64 loyaltyCardNumber = user.LoyaltyCardNo;
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Columns.Add("LoyaltyCardNo", typeof(Int64));
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = true;
                dr["Message"] = "Success";
                dr["LoyaltyCardNo"] = loyaltyCardNumber;
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
        #endregion User

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
        //public String getDbDataAsJSON(DataSet ds, ArrayList imgColName, ArrayList imgFileNameCol, ArrayList imgFileTypeCol, Boolean isThumb = false)
        //{
        //    try
        //    {
        //        DataTable dt = ds.Tables[0];
        //        String filePath = Server.MapPath("~/tempImages/");

        //        System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
        //        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
        //        Dictionary<string, object> row;
        //        foreach (DataRow dr in dt.Rows)
        //        {
        //            row = new Dictionary<string, object>();
        //            //adding data in JSON
        //            foreach (DataColumn col in dt.Columns)
        //            {
        //                if (!imgColName.Contains(col.ColumnName))
        //                {
        //                    row.Add(col.ColumnName, dr[col]);
        //                }
        //            }
        //            //adding image details in JSON
        //            for (int i = 0; i < imgColName.Count; i++)
        //            {

        //                if (dr[imgColName[i] as string] != DBNull.Value)
        //                {
        //                    String fileURL = filePath + DateTime.Now.ToString("ddHHmmssfff") + dr[imgFileNameCol[i] as string].ToString().Replace(" ", "_");
        //                    if (!System.IO.File.Exists(fileURL))
        //                    {
        //                        byte[] buffer= (byte[])dr[imgColName[i] as string];
        //                            System.IO.File.WriteAllBytes(fileURL, buffer);
        //                    }
        //                    row.Add(imgColName[i] as string, fileURL);
        //                }

        //            }
        //            rows.Add(row);
        //        }

        //        this.Context.Response.ContentType = "";

        //        return serializer.Serialize(rows);

        //    }
        //    catch (Exception ex)
        //    {
        //        //Return error message
        //        DataSet dsError = new DataSet();
        //        DataTable ErrorMsg = new DataTable();
        //        ErrorMsg.Columns.Add("Flag", typeof(Boolean));
        //        ErrorMsg.Columns.Add("Message", typeof(String));
        //        DataRow dr = ErrorMsg.NewRow();
        //        dr["Flag"] = false;
        //        dr["Message"] = ex.Message;
        //        ErrorMsg.Rows.Add(dr);
        //        dsError.Tables.Add(ErrorMsg);
        //        return getDbDataAsJSON(dsError);
        //    }
        //    finally
        //    {

        //    }
        //}
        #endregion JSON converter   
    }
}