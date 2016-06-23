using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class Product
    {
        #region properties
        public string ProductID
        {
            get;
            set;
        }
        public string BoutiqueID
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public string Description
        {
            get;
            set;
        }
        public long Price
        {
            get;
            set;
        }
        public int? Discount
        {
            get;
            set;
        }
        public Boolean IsOutOfStock
        {
            get;
            set;
        }
        public Boolean IsActive
        {
            get;
            set;
        }
        public string Categories
        {
            get;
            set;
        }
        public string DesignerID
        {
            get;
            set;
        }
        public string CreatedBy
        {
            get;
            set;
        }
        public DateTime CreatedDate
        {
            get;
            set;
        }
        public string UpdatedBy
        {
            get;
            set;
        }
        public DateTime UpdatedDate
        {
            get;
            set;
        }
        public string status
        {
            get;
            set;
        }
        public Int64? Paginationvalue
        {
            get;
            set;
        }

        public string SearchText
        {
            get;
            set;
        }

        public string[] RelatedProductsIDs
        {
            get;
            set;
        }
        public Int64 TotalRows
        {
            get;
            set;
        }
        #endregion properties

        #region Categoryproperties

        public string CategoryCode
        {
            get;
            set;
        }
        public string CategoryName
        {
            get;
            set;
        }
        public string CategoryID
        {
            get;
            set;
        }
        #endregion Categoryproperties

        #region productImagesproperties
        public string ImageID
        {
            get;
            set;
        }
        public byte[] ImageFile//of images
        {
            get;
            set;
        }
        public bool IsMain
        {
            get;
            set;
        }
        public string MainImageID
        {
            get;
            set;
        }

        public int OrderNo
        {
            get;
            set;
        }
        public string[] ImageInfo
        {
            get;
            set;
        }
        public string FileType
        {
            get;
            set;
        }
        #endregion productImagesproperties

        #region ProductReviewProperty
        public string ReviewID
        {
            get;
            set;
        }
        public string ReviewDescription
        {
            get;
            set;
        }
        #endregion ProductReviewProperty

        #region Methods

        #region Constructors
        public Product()//default constructor
           {

           }
       
            public Product(string ProductID,string BoutiqueID)
            {
                this.ProductID = ProductID;
                this.BoutiqueID = BoutiqueID;
                dbConnection dcon = null;
                SqlCommand cmd = null;
                SqlDataAdapter sda = null;
                DataTable dt = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[SelectProductByProductID]";
                    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.ProductID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);                    
                    sda.SelectCommand = cmd;
                    dt = new DataTable();
                    sda.Fill(dt);
                    if (dt.Rows.Count == 0) { throw new Exception("No such ID"); }
                    DataRow row = dt.NewRow();
                    row = dt.Rows[0];
                    this.ProductID = row["ProductID"].ToString();
                    Name = row["Name"].ToString();
                    Description = row["Description"].ToString();
                    Price = long.Parse(row["Price"].ToString());
                    IsOutOfStock = Boolean.Parse(row["IsOutOfStock"].ToString());
                    IsActive = Boolean.Parse(row["IsActive"].ToString());
                    Categories = row["Categories"].ToString();
                    DesignerID = row["DesignerID"].ToString();
                    CreatedBy = row["CreatedBy"].ToString();
                    CreatedDate = DateTime.Parse(row["CreatedDate"].ToString());
                    UpdatedBy = row["UpdatedBy"].ToString();
                    UpdatedDate = DateTime.Parse(row["UpdatedDate"].ToString());
                }
                catch (Exception ex)
                {
                    throw ex;
                }

                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
            }
            #endregion Constructors

            #region New Product
        /// <summary>
        /// to insert a new product into database
        /// </summary>
        /// <returns>status</returns>
            public Int16 InsertProduct()
            {
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                if (Categories == "")
                {
                    throw new Exception("Categories is Empty!!");
                }
               
                dbConnection dcon = null;
                SqlCommand cmd = null;
                SqlParameter outstatus = null,outproductid=null;
                string relproids = "";
                string com = "";
                try
                {
                    if (RelatedProductsIDs.Length!=0)
                    {
                        for (int i = 0; i < RelatedProductsIDs.Length; i++)
                        {

                            relproids = relproids + com + RelatedProductsIDs[i].ToString();
                            com = ",";
                        }
                        relproids = relproids + ",";
                    }
                    else
                    {
                        relproids = DBNull.Value.ToString();
                    }


                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[InsertProduct]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                    cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description;
                    cmd.Parameters.Add("@Price", SqlDbType.SmallMoney).Value = Price;
                    cmd.Parameters.Add("@Discount", SqlDbType.Int).Value = Discount;
                    cmd.Parameters.Add("@IsOutOfStock", SqlDbType.Bit).Value = IsOutOfStock;
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = IsActive;
                    cmd.Parameters.Add("@Categories", SqlDbType.NVarChar, 200).Value = Categories;
                    cmd.Parameters.Add("@RelatedProductsIDs", SqlDbType.NVarChar, -1).Value = relproids;
                    if (DesignerID!="")
                    {
                        cmd.Parameters.Add("@DesignerID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(DesignerID);
                    }
                    else
                    {
                        cmd.Parameters.Add("@DesignerID", SqlDbType.UniqueIdentifier).Value = Guid.Empty;
                    }
                 
                    cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = CreatedBy;
                    cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                    outstatus = cmd.Parameters.Add("@InsertStatus", SqlDbType.SmallInt);
                    outproductid = cmd.Parameters.Add("@OutProductID", SqlDbType.UniqueIdentifier);
                    outproductid.Direction = ParameterDirection.Output;
                    outstatus.Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
                //insert success or failure
               
                ProductID = outproductid.Value != null ? outproductid.Value.ToString() : "";
                return Int16.Parse(outstatus.Value.ToString());

            }
            #endregion New Product

            #region Edit Product
        /// <summary>
        /// to edit the product details
        /// </summary>
        /// <returns>status</returns>
            public Int16 UpdateProduct()
            {
                if (ProductID == "")
                {
                    throw new Exception("ProductID is Empty!!");
                }
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                if (Categories == "")
                {
                    throw new Exception("Categories is Empty!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
                SqlParameter outParameter = null;
                string imaginfo = "";
                string com = "";
                string relproids = "";
                try
                {
                    if(ImageInfo!=null)
                    {
                        for(int i=0;i<ImageInfo.Length;i++)
                        {
                            //imaginfo = imaginfo + ImageInfo[i].ToString();
                            imaginfo = imaginfo + com + ImageInfo[i].ToString();
                            com = ",";
                        }
                       imaginfo= imaginfo + ",";
                    }
                    if (RelatedProductsIDs.Length != 0)
                    {
                        com = "";
                        for (int i = 0; i < RelatedProductsIDs.Length; i++)
                        {

                            relproids = relproids + com + RelatedProductsIDs[i].ToString();
                            com = ",";
                        }
                        relproids = relproids + ",";
                    }
                    else
                    {
                        relproids = DBNull.Value.ToString();
                    }

                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[UpdateProduct]";
                    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                    cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description;
                    cmd.Parameters.Add("@Price", SqlDbType.SmallMoney).Value = Price;
                    cmd.Parameters.Add("@Discount", SqlDbType.Int).Value = Discount;
                    cmd.Parameters.Add("@IsOutOfStock", SqlDbType.Bit).Value = IsOutOfStock;
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = IsActive;
                    cmd.Parameters.Add("@Categories", SqlDbType.NVarChar, 200).Value = Categories;
                    cmd.Parameters.Add("@RelatedProductsIDs", SqlDbType.NVarChar, -1).Value = relproids;
                    if(DesignerID!="")
                    {
                        cmd.Parameters.Add("@DesignerID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(DesignerID);
                    }
                    else
                    {
                        cmd.Parameters.Add("@DesignerID", SqlDbType.UniqueIdentifier).Value = Guid.Empty;
                    }
                   
                    cmd.Parameters.Add("@ImageInfo", SqlDbType.VarChar, -1).Value = imaginfo;
                    cmd.Parameters.Add("@MainImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(MainImageID);
                    cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 255).Value = UpdatedBy;
                    cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                    outParameter = cmd.Parameters.Add("@UpdateStatus", SqlDbType.SmallInt);
                    outParameter.Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
                //update success or failure
                return Int16.Parse(outParameter.Value.ToString());

            }
            #endregion Edit Product

            #region Delete a Product
        /// <summary>
        /// To delete a product by product id
        /// </summary>
        /// <returns>status</returns>
            public Int16 DeleteProduct()
            {
                if (ProductID == "")
                {
                    throw new Exception("ProductID is Empty!!");
                }
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
              
              
                SqlParameter outParameter = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[DeleteProduct]";
                    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.ProductID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                    outParameter = cmd.Parameters.Add("@DeleteStatus", SqlDbType.SmallInt);
                    outParameter.Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
                //delete success or failure
                return Int16.Parse(outParameter.Value.ToString());
            }
            #endregion
                
            #region Product details as DataTable
            /// <summary>
            /// To get a product's details by ProductID
            /// </summary>
            /// <returns>Datatable of details</returns>
            public DataTable GetProductByProductID()
            {
                if (ProductID == "")
                {
                    throw new Exception("ProductID is Empty!!");
                }
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
                SqlDataAdapter sda = null;
                DataTable dt = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    sda = new SqlDataAdapter();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[SelectProductByProductID]";
                    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.ProductID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                    sda.SelectCommand = cmd;
                    dt = new DataTable();
                    sda.Fill(dt);
                    if (dt.Rows.Count == 0) { throw new Exception("No such item"); }
                    return dt;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
            }
            #endregion

            #region Add entry to product view log
        /// <summary>
        /// to insert a product view log entry
        /// </summary>
        /// <param name="userID">to store which user has visited the product details. Can be "" </param>
            public void InsertProductViewLog(string userID)
            {
                if (ProductID == "")
                {
                    throw new Exception("ProductID is Empty!!");
                }
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[InsertProductViewLog]";
                    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.ProductID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                    if(userID!="") cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(userID);
                    cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = "UserFromApp";
                    cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
            }
            #endregion

            #region Favorite informations: Count and isFavorite
        /// <summary>
        /// Function to get the total favorite count and whether the user favorited this before. based on a product
        /// </summary>
        /// <param name="userID">user id to check whether this user favorited the current product</param>
        /// <returns>Favorite count and isfavorated boolean value</returns>
            public DataTable FavoriteInfo(string userID)
            {
                if (ProductID == "")
                {
                    throw new Exception("ProductID is Empty!!");
                }
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
                DataTable dt = null;
                SqlDataAdapter sda = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    sda = new SqlDataAdapter();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetFavoriteInformation]";
                    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.ProductID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                    if(userID!="")
                        cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(userID);
                    sda.SelectCommand = cmd;
                    dt = new DataTable();
                    sda.Fill(dt);                    
                    return dt;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
            }
        #endregion Favorite informations: Count and isFavorite

            #region Add Or Remove From Favorites        
        /// <summary>
        /// To add or remove from favorite table
        /// </summary>
        /// <param name="UserID">user who favorites it</param>
        /// <param name="AddOrRemove">"add" or "remove" string</param>
            public void AddOrRemoveFromFavorites(string UserID,string AddOrRemove)
            {
                // TODO: add product view information to that table too: in the case of mobile app
                if (ProductID == "")
                {
                    throw new Exception("ProductID is Empty!!");
                }
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                if (UserID == "")
                {
                    throw new Exception("UserID is Empty!!");
                }
                if (AddOrRemove == "" || (AddOrRemove!="add" && AddOrRemove!="remove"))
                {
                    throw new Exception("Should give Add or Remove information!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[AddOrRemoveFromFavorites]";
                    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.ProductID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                    cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                    cmd.Parameters.Add("@AddOrRemove", SqlDbType.NVarChar, 10).Value = AddOrRemove;
                    cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = "UserFromApp";
                    cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
            }
            #endregion

            #region GetAllProducts
            public DataSet GetAllProducts()
            {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            Guid _boutiqueid = Guid.Empty;
            try
            {
                _boutiqueid = Guid.Parse(BoutiqueID);
                if (_boutiqueid != Guid.Empty)
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[SelectAllProductsByBoutiqueID]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
                    sda = new SqlDataAdapter();
                    sda.SelectCommand = cmd;
                    ds = new DataSet();

                    sda.Fill(ds);
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();

                }
            }
            return ds;
        }
        #endregion GetAllProducts

            #region SelectAllProductViewDetails
            public DataSet SelectAllProductViewDetails()
            {
                dbConnection dcon = null;
                SqlCommand cmd = null;
                DataSet ds = null;
                SqlDataAdapter sda = null;
                Guid _boutiqueid = Guid.Empty;
                try
                {
                    _boutiqueid = Guid.Parse(BoutiqueID);
                    if (_boutiqueid != Guid.Empty)
                    {
                        dcon = new dbConnection();
                        dcon.GetDBConnection();
                        cmd = new SqlCommand();
                        cmd.Connection = dcon.SQLCon;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "[SelectAllProductViewDetailsByBoutiqueID]";
                        cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
                        sda = new SqlDataAdapter();
                        sda.SelectCommand = cmd;
                        ds = new DataSet();
                        sda.Fill(ds);
                    }
                }

                catch (Exception ex)
                {
                    throw ex;
                }

                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();

                    }
                }
                return ds;
            }

        #endregion SelectAllProductViewDetails

            #region GetAllProductsOutOfStock
            public DataSet SelectAllProductsOutOfStock(string boutiqueID)
            {
                dbConnection dcon = null;
                SqlCommand cmd = null;
                DataSet ds = null;
                SqlDataAdapter sda = null;
                Guid _boutiqueid = Guid.Empty;
                try
                {
                    _boutiqueid = Guid.Parse(boutiqueID);
                    if (_boutiqueid != Guid.Empty)
                    {
                        dcon = new dbConnection();
                        dcon.GetDBConnection();
                        cmd = new SqlCommand();
                        cmd.Connection = dcon.SQLCon;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "[SelectAllProductsOutOfStockByBoutiqueID]";
                        cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
                        sda = new SqlDataAdapter();
                        sda.SelectCommand = cmd;
                        ds = new DataSet();
                        sda.Fill(ds);
                    }
                }

                catch (Exception ex)
                {
                    throw ex;
                }

                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();

                    }
                }
                return ds;
            }
        #endregion GetAllProductsOutOfStock

            #region Get products under a category
        /// <summary>
        /// To get the products under a category
        /// </summary>
        /// <returns></returns>
            public DataTable GetProductsByCategory(string userID,int countLimit=0)
            {
                if (CategoryCode == "")
                {
                    throw new Exception("CategoryCode is Empty!!");
                }
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
                SqlDataAdapter sda = null;
                DataTable dt = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    sda = new SqlDataAdapter();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetProductsByCategory]";
                    cmd.Parameters.Add("@CategoryCode", SqlDbType.NVarChar, 10).Value = CategoryCode;
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                    if (userID != "") cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(userID);
                    if (countLimit > 0) cmd.Parameters.Add("@CountLimit", SqlDbType.Int).Value = countLimit;
                    sda.SelectCommand = cmd;
                    dt = new DataTable();
                    sda.Fill(dt);
                    return dt;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
            }
            #endregion
           #endregion Methods

        #region CheckCategory

            public string CheckCategory()
            {
                string count = string.Empty;
                dbConnection dcon = null;
                SqlCommand cmd = null;
                DataSet ds = null;
                SqlDataAdapter sda = null;

                try
                {

                    if (BoutiqueID != null)
                    {
                        dcon = new dbConnection();
                        dcon.GetDBConnection();
                        cmd = new SqlCommand();
                        cmd.Connection = dcon.SQLCon;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "[CheckCategory]";
                        cmd.Parameters.Add("@CategoryCode", SqlDbType.NVarChar, 50).Value = CategoryCode;
                        cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                        sda = new SqlDataAdapter();
                        sda.SelectCommand = cmd;
                        ds = new DataSet();
                        sda.Fill(ds);
                        count = ds.Tables[0].Rows.Count.ToString();
                    }
                }

                catch (Exception ex)
                {
                    throw ex;
                }

                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();

                    }
                }
                return count;
            }
            #endregion GetCategory
        
        #region CategoryMethods
        
        #region GetAllCategories
            public DataSet GetAllCategories()//for dropdownbind
            {
                if(BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
                DataSet ds = null;
                SqlDataAdapter sda = null;
                try
                {
                        dcon = new dbConnection();
                        dcon.GetDBConnection();
                        cmd = new SqlCommand();
                        cmd.Connection = dcon.SQLCon;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "[GetAllCategories]";
                        cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                        sda = new SqlDataAdapter();
                        sda.SelectCommand = cmd;
                        ds = new DataSet();
                        sda.Fill(ds);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
                return ds;
            }
        #endregion GetAllCategories

        #region GetAllCategoryIDAndName
        public DataSet GetAllCategoryIDAndName()
            {
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
                DataSet ds = null;
                SqlDataAdapter sda = null;
              
                try
                {

                    if (BoutiqueID != "")
                    {
                        dcon = new dbConnection();
                        dcon.GetDBConnection();
                        cmd = new SqlCommand();
                        cmd.Connection = dcon.SQLCon;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "[GetAllCategoryIDAndName]";
                        cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                        sda = new SqlDataAdapter();
                        sda.SelectCommand = cmd;
                        ds = new DataSet();
                        sda.Fill(ds);
                    }
                }

                catch (Exception ex)
                {
                    throw ex;
                }

                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();

                    }
                }
                return ds;
            }

#endregion GetAllCategoryIDAndName

        #region GetAllRelatedProductIDAndName
         public DataSet GetAllRelatedProducts()
         {

             if(BoutiqueID=="")
             {
                 throw new Exception("BoutiqueID is Empty!!");
             }
             if(ProductID=="")
             {
                 throw new Exception("ProductID is Empty!!");
             }
             dbConnection dcon = null;
             SqlCommand cmd = null;
             DataSet ds = null;
             SqlDataAdapter sda = null;
         
             try
             {
                     dcon = new dbConnection();
                     dcon.GetDBConnection();
                     cmd = new SqlCommand();
                     cmd.Connection = dcon.SQLCon;
                     cmd.CommandType = CommandType.StoredProcedure;
                     cmd.CommandText = "[GetAllRelatedProductsIDandNameByProductID]";
                     cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                     cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                     sda = new SqlDataAdapter();
                     sda.SelectCommand = cmd;
                     ds = new DataSet();
                     sda.Fill(ds);
              }

             catch (Exception ex)
             {
                 throw ex;
             }

             finally
             {
                 if (dcon.SQLCon != null)
                 {
                     dcon.DisconectDB();

                 }
             }
             return ds;
         }
        #endregion GetAllRelatedProductIDAndName

        #region GetAllProductIDAndName
        public DataSet GetAllProductIDAndName()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
           
            try
            {
             
              
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetAllProductIDAndName]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    sda = new SqlDataAdapter();
                    sda.SelectCommand = cmd;
                    ds = new DataSet();
                    sda.Fill(ds);
               
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();

                }
            }
            return ds;
        }

        #endregion GetAllProductIDAndName

        #region GetCategory
        public DataSet GetCategory()
            {
                dbConnection dcon = null;
                SqlCommand cmd = null;
                DataSet ds = null;
                SqlDataAdapter sda = null;
               
                try
                {
                  
                    if (BoutiqueID!= null)
                    {
                        dcon = new dbConnection();
                        dcon.GetDBConnection();
                        cmd = new SqlCommand();
                        cmd.Connection = dcon.SQLCon;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "[SelectCategoryByCategoryCode]";
                        cmd.Parameters.Add("@CategoryID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(CategoryID);
                        cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                        sda = new SqlDataAdapter();
                        sda.SelectCommand = cmd;
                        ds = new DataSet();

                        sda.Fill(ds);
                    }
                }

                catch (Exception ex)
                {
                    throw ex;
                }

                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();

                    }
                }
                return ds;
            }
            #endregion GetCategory

        #region InsertCategory
            public Int16 InsertCategory()
            {
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
               
                dbConnection dcon = null;
                SqlCommand cmd = null;
                SqlParameter outParameter = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[InsertCategory]";
                    cmd.Parameters.Add("@CategoryCode", SqlDbType.NVarChar, 50).Value = CategoryCode;
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                   
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar, -1).Value = CategoryName;
                   
                    cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = CreatedBy;
                    cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;

                    outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.SmallInt);
                    outParameter.Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
                //insert success or failure
                return Int16.Parse(outParameter.Value.ToString());

            }
        #endregion InsertCategory

        #region EditCategory
            public Int16 EditCategory()
            {
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                if(CategoryID=="")
                {
                    throw new Exception("CategoryID is Empty!!");
                }
                if(CategoryCode=="")
                {
                    throw new Exception("Category Code is Empty!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
                SqlParameter outParameter = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[UpdateCategory]";
                    cmd.Parameters.Add("@CategoryID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(CategoryID);
                    cmd.Parameters.Add("@CategoryCode", SqlDbType.NVarChar, 50).Value = CategoryCode;
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);

                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar, -1).Value = CategoryName;

                    cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 255).Value = UpdatedBy;
                    cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;

                    outParameter = cmd.Parameters.Add("@UpdateStatus", SqlDbType.SmallInt);
                    outParameter.Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
                //insert success or failure
                return Int16.Parse(outParameter.Value.ToString());


            }
        #endregion EditCategory

        #region DeleteCategory
            /// <summary>
            /// To delete a category by category id
            /// </summary>
            /// <returns>status</returns>
            public Int16 DeleteCategory()
            {
                if (CategoryID == "")
                {
                    throw new Exception("CategoryID is Empty!!");
                }
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
                SqlDataAdapter sda = null;
              
                SqlParameter outParameter = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    sda = new SqlDataAdapter();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[DeleteCategory]";
                    cmd.Parameters.Add("@CategoryCode", SqlDbType.NVarChar, 50).Value = CategoryCode;
                    cmd.Parameters.Add("@CategoryID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.CategoryID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                    outParameter = cmd.Parameters.Add("@DeleteStatus", SqlDbType.SmallInt);
                    outParameter.Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
                //delete success or failure
                return Int16.Parse(outParameter.Value.ToString());
            }
        #endregion DeleteCategory

        #endregion CategoryMethods

        #region ProductImageMethods
            #region InsertProductImage
            public Int16 InsertProductImage()
            {
            if (ProductID == "")
            {
                throw new Exception("ProductID is Empty!!");
            }
            if(BoutiqueID== "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }

            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsertProductImages";
                cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                cmd.Parameters.Add("@Image", SqlDbType.VarBinary).Value = ImageFile;
               
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@FileType", SqlDbType.VarChar, 5).Value = FileType;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            //insert success or failure
            return Int16.Parse(outParameter.Value.ToString());

        }
            #endregion InsertProductImage

            #endregion ProductImageMethods

        #region GetAllProductImages
            public DataSet GetAllProductImages()
            {

            if (ProductID == "")
            {
                throw new Exception("ProductID is Empty!!");
            }

            if(BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
         
            try
            {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetAllProductImages]";
                    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    sda = new SqlDataAdapter();
                    sda.SelectCommand = cmd;
                    ds = new DataSet();
                    sda.Fill(ds);
                }
           

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }

        #endregion GetAllProductImages

        #region GetAllTotalCount
            public Int64 GetAllTotalCount()
            {
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }

                dbConnection dcon = null;
                SqlCommand cmd = null;
                DataSet ds = null;
                SqlDataAdapter sda = null;
                SqlParameter outtotalrows =null;

                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetTotalRowsCountForProducts]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    outtotalrows = cmd.Parameters.Add("@Maxrownumber", SqlDbType.BigInt);
                    outtotalrows.Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
                }


                catch (Exception ex)
                {
                    throw ex;
                }

                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
                return TotalRows= Int64.Parse(outtotalrows.Value.ToString());
             
            }
        #endregion GetAllTotalCount

            #region GetAllProductMainImagesDetails
            public DataSet GetAllProductMainImagesDetails()
            {

                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }

                dbConnection dcon = null;
                SqlCommand cmd = null;
                DataSet ds = null;
                SqlDataAdapter sda = null;

                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetAllProductImageMainDetailsByBoutiqueid]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    cmd.Parameters.Add("@Paginationvalue", SqlDbType.BigInt).Value = Paginationvalue;
                  
                    sda = new SqlDataAdapter();
                    sda.SelectCommand = cmd;
                    ds = new DataSet();
                    sda.Fill(ds);
                   
                        
                }


                catch (Exception ex)
                {
                    throw ex;
                }

                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
                return ds;
            }
            #endregion GetAllProductMainImagesDetails

        #region GetAllOutOfStockProductMainImagesDetails
            public DataSet GetAllOutOfStockProductMainImagesDetails()
            {

                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }

                dbConnection dcon = null;
                SqlCommand cmd = null;
                DataSet ds = null;
                SqlDataAdapter sda = null;

                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetAllOutOfStockProductImageMainDetailsByBoutiqueid]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    cmd.Parameters.Add("@Paginationvalue", SqlDbType.BigInt).Value = Paginationvalue;
                    sda = new SqlDataAdapter();
                    sda.SelectCommand = cmd;
                    ds = new DataSet();
                    sda.Fill(ds);
                }


                catch (Exception ex)
                {
                    throw ex;
                }

                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
                return ds;
            }
            #endregion GetAllProductMainImagesDetails

        #region GetAllTrendingProductsMainImagesDetails
             public DataSet GetAllTrendingProductsMainImagesDetails()
             {
                 if (BoutiqueID == "")
                 {
                     throw new Exception("BoutiqueID is Empty!!");
                 }
                 dbConnection dcon = null;
                 SqlCommand cmd = null;
                 DataSet ds = null;
                 SqlDataAdapter sda = null;
                 try
                 {
                     dcon = new dbConnection();
                     dcon.GetDBConnection();
                     cmd = new SqlCommand();
                     cmd.Connection = dcon.SQLCon;
                     cmd.CommandType = CommandType.StoredProcedure;
                     cmd.CommandText = "[GetAllTrendingProductImageMainDetailsByBoutiqueid]";
                     cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                     cmd.Parameters.Add("@Paginationvalue", SqlDbType.BigInt).Value = Paginationvalue;
                     sda = new SqlDataAdapter();
                     sda.SelectCommand = cmd;
                     ds = new DataSet();
                     sda.Fill(ds);
                 }


                 catch (Exception ex)
                 {
                     throw ex;
                 }

                 finally
                 {
                     if (dcon.SQLCon != null)
                     {
                         dcon.DisconectDB();
                     }
                 }
                 return ds;
             }
            #endregion GetAllTrendingProductsMainImagesDetails

        #region Get Product Images for mobile
            /// <summary>
        /// Product images with varbinary files
        /// </summary>
        /// <returns></returns>
            public DataTable GetProductImagesForMobile()
            {
                if (BoutiqueID == "")
                {
                    throw new Exception("BoutiqueID is Empty!!");
                }
                if (ProductID == "")
                {
                    throw new Exception("ProductID is Empty!!");
                }
                dbConnection dcon = null;
                SqlCommand cmd = null;
                DataTable dt = null;
                SqlDataAdapter sda = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetProductImagesForMobile]";
                    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                    sda = new SqlDataAdapter();
                    sda.SelectCommand = cmd;
                    dt = new DataTable();
                    sda.Fill(dt);
                }
                catch (Exception ex)
                {
                    throw ex;
                }

                finally
                {
                    if (dcon.SQLCon != null)
                    {
                        dcon.DisconectDB();
                    }
                }
                return dt;
            }
            #endregion


        #region GetProductImage

         public byte[] GetProductImage()
         {
             if (ImageID == "")
             {
                 throw new Exception("ImageID is Empty!!");
             }

             dbConnection dcon = null;
             SqlCommand cmd = null;
             SqlDataReader rd = null;
             byte[] imageproduct=null;
             try
             {
                 dcon = new dbConnection();
                 dcon.GetDBConnection();
                 cmd = new SqlCommand();
                 cmd.Connection = dcon.SQLCon;
                 cmd.CommandType = CommandType.StoredProcedure;
                 cmd.CommandText = "[GetProductImage]";
                 cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ImageID);
                 rd = cmd.ExecuteReader();
                 if ((rd.Read()) && (rd.HasRows) && (rd["Image"] != DBNull.Value))
                 {
                     imageproduct = (byte[])rd["Image"];
                 }
             }
             catch (Exception ex)
             {
                 throw ex;
             }

             finally
             {
                 if (dcon.SQLCon != null)
                 {
                     rd.Close();
                     dcon.DisconectDB();
                 }
             }
             return imageproduct;
            
         }
        #endregion GetProductImage

        #region GraphData
         public DataSet GetProductDetails()
         {


             dbConnection dcon = null;
             SqlCommand cmd = null;
             DataSet ds = null;
             SqlDataAdapter sda = null;

             try
             {
                 dcon = new dbConnection();
                 dcon.GetDBConnection();
                 cmd = new SqlCommand();
                 cmd.Connection = dcon.SQLCon;
                 cmd.CommandType = CommandType.StoredProcedure;
                 cmd.CommandText = "[GetProductDetails]";
                 cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                 sda = new SqlDataAdapter();
                 sda.SelectCommand = cmd;
                 ds = new DataSet();
                 sda.Fill(ds);
             }


             catch (Exception ex)
             {
                 throw ex;
             }

             finally
             {
                 if (dcon.SQLCon != null)
                 {
                     dcon.DisconectDB();
                 }
             }
             return ds;
         }
        #endregion GraphData


        #region DeleteProudctImage

         public Int16 DeleteProudctImage()
         {
             if (ImageID == "")
             {
                 throw new Exception("ImageID is Empty!!");
             }
             if (BoutiqueID == "")
             {
                 throw new Exception("BoutiqueID is Empty!!");
             }
             dbConnection dcon = null;
             SqlCommand cmd = null;
             SqlDataAdapter sda = null;
             SqlParameter outParameter = null;
             try
             {
                 dcon = new dbConnection();
                 dcon.GetDBConnection();
                 cmd = new SqlCommand();
                 sda = new SqlDataAdapter();
                 cmd.Connection = dcon.SQLCon;
                 cmd.CommandType = CommandType.StoredProcedure;
                 cmd.CommandText = "[DeleteProductImage]";
                 cmd.Parameters.Add("@ProductImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ImageID);
                 cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                 outParameter = cmd.Parameters.Add("@DeleteStatus", SqlDbType.SmallInt);
                 outParameter.Direction = ParameterDirection.Output;
                 cmd.ExecuteNonQuery();
             }
             catch (Exception ex)
             {
                 throw ex;
             }
             finally
             {
                 if (dcon.SQLCon != null)
                 {
                     dcon.DisconectDB();
                 }
             }
             //delete success or failure
             return Int16.Parse(outParameter.Value.ToString());

         }
         #endregion DeleteProudctImage

        #region GetAllProductReviews
         public DataSet GetAllProductsReviews()
         {
             dbConnection dcon = null;
             SqlCommand cmd = null;
             DataSet ds = null;
             SqlDataAdapter sda = null;
             Guid _boutiqueid = Guid.Empty;
             try
             {
                 _boutiqueid = Guid.Parse(BoutiqueID);
                 if (_boutiqueid != Guid.Empty)
                 {
                     dcon = new dbConnection();
                     dcon.GetDBConnection();
                     cmd = new SqlCommand();
                     cmd.Connection = dcon.SQLCon;
                     cmd.CommandType = CommandType.StoredProcedure;
                     cmd.CommandText = "[SelectAllProductReviews]";
                     cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
                     sda = new SqlDataAdapter();
                     sda.SelectCommand = cmd;
                     ds = new DataSet();

                     sda.Fill(ds);
                 }
             }

             catch (Exception ex)
             {
                 throw ex;
             }

             finally
             {
                 if (dcon.SQLCon != null)
                 {
                     dcon.DisconectDB();

                 }
             }
             return ds;
         }
         #endregion GetAllProductReviews

        #region GetReviewById
        public DataSet GetReviewDetailsWithID()
         {
             dbConnection dcon = null;
             SqlCommand cmd = null;
             DataSet ds = null;
             SqlDataAdapter sda = null;
             
            try 
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectProductReviewsUsingID]";
                cmd.Parameters.Add("@ReviewID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ReviewID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);

             }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();

                }
            }
            return ds;
         }
        #endregion GetReviewById

        #region Get reviews of a product for app
        /// <summary>
        /// to get product reviews including the user's review
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public DataTable GetProductReviewsForMobile(string userID)
        {
             if (ProductID == "")
            {
                throw new Exception("ProductID is Empty!!");
            }

            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;
            try
            {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    sda = new SqlDataAdapter();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetProductReviewsForMobile]";
                    if (userID != "") cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(userID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                    sda.SelectCommand = cmd;
                    dt = new DataTable();
                    sda.Fill(dt);
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();

                }
            }
            return dt;
        }           
        #endregion

        #region Insert review from app
        /// <summary>
        /// to insert product review
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public Int16 InsertProductReview(string userID)
        {
            if (ProductID == "")
            {
                throw new Exception("ProductID is Empty!!");
            }
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            if (userID == "")
            {
                throw new Exception("userID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertProductReview]";
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(userID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                cmd.Parameters.Add("@ReviewDescription", SqlDbType.NVarChar,-1).Value = ReviewDescription;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return Int16.Parse(outParameter.Value.ToString());
        }
        #endregion
        
        #region Delete a product review
        /// <summary>
        /// to delete product review
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public Int16 DeleteProductReview()
        {
            if (ReviewID == "")
            {
                throw new Exception("ReviewID is Empty!!");
            }
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteProductReview]";
                cmd.Parameters.Add("@ReviewID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ReviewID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                outParameter = cmd.Parameters.Add("@DeleteStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return Int16.Parse(outParameter.Value.ToString());
        }
        #endregion

        #region UpdateReviewTable
        
        #region UpdateReviewCancelled
        public void UpdateReviewCancelled()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateCancel]";
                cmd.Parameters.Add("@ReviewID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ReviewID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@CreatedBY", SqlDbType.NVarChar, 255).Value = CreatedBy;
                cmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();

                }
            }
        }
        #endregion UpdateReviewCancelled
      
        #region UpdateReviewIsModarate
        public void UpdateReviewIsModarate()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateApprove]";
                cmd.Parameters.Add("@ReviewID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ReviewID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = CreatedBy;
                cmd.Parameters.Add("@ApprovedDate", SqlDbType.DateTime).Value = DateTime.Now;
                cmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();

                }
            }
        }
        #endregion UpdateReviewIsModarate
        #endregion UpdateReviewTable

        #region Get ImageID By ProductID
        public string GetImageIDByProductID()
        {
            string ImageID = string.Empty;

            dbConnection dcon = null;
            SqlCommand cmd = null;

            Guid _boutiqueid = Guid.Empty;
            try
            {
                _boutiqueid = Guid.Parse(BoutiqueID);
                if (_boutiqueid != Guid.Empty)
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetProductImageIDByProductID]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
                    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);

                    object ImgIdObj = cmd.ExecuteScalar();
                    if (ImgIdObj != null)
                    {
                        ImageID = ImgIdObj.ToString();

                    }

                }
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();

                }
            }
            return ImageID;
        }
        #endregion Get ImageID By ProductID

        #region GetNewTrendingDetailsBySearch
        public DataSet GetNewTrendingDetailsBySearch()
        {

            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetTrendingDetailsBySearch]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@text", SqlDbType.NVarChar, 50).Value = SearchText;
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }


            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetNewTrendingDetailsBySearch

        #region GetNewOutOfStockDetailBySearch
        public DataSet GetNewOutOfStockDetailBySearch()
        {

            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetOutOfStockDetailBySearch]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@text", SqlDbType.NVarChar, 50).Value = SearchText;
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }


            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetNewOutOfStockDetailBySearch

        #region GetNewProductDetailBySearch
        public DataSet GetNewProductDetailBySearch()
        {

            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetProductDetailBySearch]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@text", SqlDbType.NVarChar, 50).Value = SearchText;
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }


            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetNewProductDetailBySearch

        #region Get related products of a product for app
        /// <summary>
        /// To get the related products including image for app
        /// </summary>
        /// <returns></returns>
        public DataTable GetRelatedProductsForApp(int countLimit = 0)
        {
            if (ProductID == "")
            {
                throw new Exception("ProductID is Empty!!");
            }
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataAdapter sda = null;
            DataTable dt = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                sda = new SqlDataAdapter();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetRelatedProductsForApp]";
                cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.ProductID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                if (countLimit > 0) cmd.Parameters.Add("@CountLimit", SqlDbType.Int).Value = countLimit;
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
        }
        #endregion

        #region GetAllProductIDandName
         public DataSet GetAllProductIDandName()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
          
            try
            {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetAllProductsIDandName]";
                    cmd.Parameters.Add("@BoutiqueID",SqlDbType.UniqueIdentifier).Value=Guid.Parse(BoutiqueID);
                    sda = new SqlDataAdapter();
                    sda.SelectCommand = cmd;
                    ds = new DataSet();
                    sda.Fill(ds);
                
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
      
        #endregion GetAllProductIDandName

         #region GetImageIdForNewsLetter
         public DataSet GetImageIdForNewsLetter()
         {
             if (BoutiqueID == "")
             {
                 throw new Exception("BoutiqueID is Empty!!");
             }
             dbConnection dcon = null;
             SqlCommand cmd = null;
             SqlDataAdapter sda = null;
             DataSet ds = null;
             try
             {
                 dcon = new dbConnection();
                 dcon.GetDBConnection();
                 cmd = new SqlCommand();
                 sda = new SqlDataAdapter();
                 cmd.Connection = dcon.SQLCon;
                 cmd.CommandType = CommandType.StoredProcedure;
                 cmd.CommandText = "[GetImageIdForNewsLetter]";
                 cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                 cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                 sda.SelectCommand = cmd;
                 ds = new DataSet();
                 sda.Fill(ds);
                 if (ds.Tables[0].Rows.Count == 0) { throw new Exception("No item"); }
                 return ds;
             }
             catch (Exception ex)
             {
                 throw ex;
             }
             finally
             {
                 if (dcon.SQLCon != null)
                 {
                     dcon.DisconectDB();
                 }
             }

         }
         #endregion GetImageIdForNewsLetter


         #region GetAllProductIDAndNameForNewsLetter
         public DataSet GetAllProductIDAndNameForNewsLetter()
         {
             if (BoutiqueID == "")
             {
                 throw new Exception("BoutiqueID is Empty!!");
             }
             dbConnection dcon = null;
             SqlCommand cmd = null;
             DataSet ds = null;
             SqlDataAdapter sda = null;

             try
             {


                 dcon = new dbConnection();
                 dcon.GetDBConnection();
                 cmd = new SqlCommand();
                 cmd.Connection = dcon.SQLCon;
                 cmd.CommandType = CommandType.StoredProcedure;
                 cmd.CommandText = "[GetAllProductIDAndNameForNewsLetter]";
                 cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                 sda = new SqlDataAdapter();
                 sda.SelectCommand = cmd;
                 ds = new DataSet();
                 sda.Fill(ds);

             }

             catch (Exception ex)
             {
                 throw ex;
             }

             finally
             {
                 if (dcon.SQLCon != null)
                 {
                     dcon.DisconectDB();

                 }
             }
             return ds;
         }

         #endregion GetAllProductIDAndNameForNewsLetter
    }
}