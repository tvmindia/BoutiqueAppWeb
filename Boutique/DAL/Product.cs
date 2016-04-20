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


        #endregion Methods
    }
}