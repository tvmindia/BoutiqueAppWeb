
#region CopyRight

//SHAMILA TP

#endregion CopyRight

#region Included Namespaces

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Linq;
using System.Web;

#endregion Included Namespaces

namespace Boutique.DAL
{
    public class Order
    {
        #region Global Variables

        #endregion Global Variables

        #region Public Properties

        public string BoutiqueID
        {
            get;
            set;
        }

        public string OrderID
        {
            get;
            set;
        }

        public int OrderNo
        {
            get;
            set;
        }

        public string OrderDescription
        {
            get;
            set;
        }

        public string OrderDate
        {
            get;
            set;
        }

        public string PlannedDeliveryDate
        {
            get;
            set;
        }

        public string ForecastDeliveryDate
        {
            get;
            set;
        }

        public string OrderReadyDate
        {
            get;
            set;
        }

        public string ActualDeliveryDate
        {
            get;
            set;
        }

        public int TotalOrderAmount
        {
            get;
            set;
        }

        public string CreatedBy
        {
            get;
            set;
        }

        public string CreatedDate
        {
            get;
            set;
        }

        public string UpdatedBy
        {
            get;
            set;
        }

        public string UpdatedDate
        {
            get;
            set;
        }

        #endregion Public Properties

        #region Methods

        #region Select All Orders
        public DataSet SelectAllOrders()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            ;
            try
            {
                Guid _boutiqueid = Guid.Parse(BoutiqueID);
                if (_boutiqueid != Guid.Empty)
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[SelectAllOrders]";
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
        #endregion Select All Orders

        #region Get Order Details By OrderID
        /// <summary>
        /// To get details of a specific notification
        /// </summary>
        /// <returns></returns>
        public DataSet GetOrderDetailsByOrderID()
        {
            if (BoutiqueID == string.Empty)
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            if (OrderID == string.Empty)
            {
                throw new Exception("OrderID is Empty!!");
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
                cmd.CommandText = "[SelectOrderDetailsByOrderID]";
                cmd.Parameters.Add("@OrderID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.OrderID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
                if (ds.Tables[0].Rows.Count == 0) { throw new Exception("No such item"); }
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
        #endregion Get Order Details By OrderID

        #region Edit Order Details
        /// <summary>
        /// to edit the Notification details
        /// </summary>
        /// <returns>status</returns>
        public Int16 UpdateOrderDetailsByOrderID()
        {
            if (OrderID == string.Empty)
            {
                throw new Exception("NotificationID is Empty!!");
            }
            if (BoutiqueID == string.Empty)
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
                cmd.CommandText = "[UpdateOrderByOrderID]";
                cmd.Parameters.Add("@OrderID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(OrderID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@OrderDescription", SqlDbType.NVarChar,-1).Value = OrderDescription;
               
                cmd.Parameters.Add("@ForecastDeliveryDate", SqlDbType.DateTime).Value = ForecastDeliveryDate;

                
                cmd.Parameters.Add("@OrderReadyDate", SqlDbType.DateTime).Value = OrderReadyDate;
                cmd.Parameters.Add("@ActualDeliveryDate", SqlDbType.DateTime).Value = ActualDeliveryDate;
                //cmd.Parameters.AddWithValue("@ActualDeliveryDate", ActualDeliveryDate ?? SqlString.Null);


                cmd.Parameters.Add("@TotalOrderAmount", SqlDbType.Money).Value = TotalOrderAmount;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 255).Value = UpdatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                //cmd.Parameters.Add("@OrderNo", SqlDbType.Int).Value = OrderNo;

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
        #endregion Edit Order Details

        #region New Order
        /// <summary>
        /// to insert a new notification into database
        /// </summary>
        /// <returns>status</returns>
        public Int16 InsertOrder()
        {
            if (BoutiqueID == string.Empty)
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            if (OrderDate == "")
            {
                throw new Exception("OrderDate is Empty!!");
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
                cmd.CommandText = "[InsertOrder]";

                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@OrderDescription", SqlDbType.NVarChar, -1).Value = OrderDescription;
                cmd.Parameters.Add("@OrderDate", SqlDbType.DateTime).Value = OrderDate;

                cmd.Parameters.Add("@PlannedDeliveryDate", SqlDbType.DateTime).Value = PlannedDeliveryDate;
                cmd.Parameters.Add("@ForecastDeliveryDate", SqlDbType.DateTime).Value = ForecastDeliveryDate;

                //cmd.Parameters.Add("@ActualDeliveryDate", SqlDbType.DateTime).Value = ActualDeliveryDate;
                //cmd.Parameters.Add("@OrderReadyDate", SqlDbType.DateTime).Value = OrderReadyDate;

                cmd.Parameters.Add("@TotalOrderAmount", SqlDbType.Money).Value = TotalOrderAmount;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                //cmd.Parameters.Add("@OrderNo", SqlDbType.Int).Value = OrderNo;

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
        #endregion New Order

        #endregion Methods

    }
}