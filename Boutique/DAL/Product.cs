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
        #endregion properties

        #region Methods
          
            #region Constructors
            public Product()
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
                SqlParameter outParameter = null;
                try
                {
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
                    cmd.Parameters.Add("@IsOutOfStock", SqlDbType.Bit).Value = IsOutOfStock;
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = IsActive;
                    cmd.Parameters.Add("@Categories", SqlDbType.NVarChar, 200).Value = Categories;
                    cmd.Parameters.Add("@DesignerID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(DesignerID);
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
                try
                {
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
                    cmd.Parameters.Add("@IsOutOfStock", SqlDbType.Bit).Value = IsOutOfStock;
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = IsActive;
                    cmd.Parameters.Add("@Categories", SqlDbType.NVarChar, 200).Value = Categories;
                    cmd.Parameters.Add("@DesignerID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(DesignerID);
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
                SqlDataAdapter sda = null;
                DataTable dt = null;
                SqlParameter outParameter = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    sda = new SqlDataAdapter();
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
                // TODO: add product view information to that table too: in the case of mobile app
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
                    cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(userID);
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
        #endregion Favorite informations: Count and isFavorite

            #region GetAllProducts
            public DataSet GetAllProducts(string boutiqueID)
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

        #endregion Methods
    }
}