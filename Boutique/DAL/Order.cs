
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

        public string OrderItemID
        {
            get;
            set;
        }

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
        public string UserID
        {
            get;
            set;
        }

        public string OrderNo
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

        public string PlannedDeliveryTime
        {
            get;
            set;
        }

        public string CustomerName
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

        public string DeliveryAddress
        {
            get;
            set;
        }

        public String MobileNo
        {
            get; 
            set; 
        }
        public string BranchID
        {
            get;
            set;
        }

        public string StatusCode
        {
            get;
            set;
        }

        public string Quantity
        {
            get;
            set;
        }

        public string Unit
        {
            get;
            set;
        }
        public string TypeCode
        {
            get;
            set;
        }

//----- * Order Item properties *---------//

        public string CustomerRemarks
        {
            get;
            set;
        }

        public string ProductID
        {
            get;
            set;
        }
        public string BugTrackerstatus
        {
            get;
            set;
        }
        public string BugTrackerVersion
        {
            get;
            set;
        }
        public string BugTrackerUserID
        {
            get;
            set;
        }
        public string BugTrackerCreatedBy
        {
            get;
            set;
        }

        public string ItemPrice
        {
            get;
            set;
        }
        #endregion Public Properties

        #region Methods

        #region Select All Order Status
        /// <summary>
        /// To select all orders
        /// </summary>
        /// <returns>Dataset</returns>
        public DataSet GetBranchIdAndName()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            
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
                     cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
                     cmd.CommandText = "[GetBranchIdAndName]";
                     sda = new SqlDataAdapter();
                     sda.SelectCommand = cmd;
                     ds = new DataSet();

                     sda.Fill(ds);
                 }
            }

            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "GetBranchIdAndName";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
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
        #endregion Select All Order Status

        #region Select All Order Status
        /// <summary>
        /// To select all orders
        /// </summary>
        /// <returns>Dataset</returns>
        public DataSet SelectAllOrderStatusCodeAndStatus()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            ;
            try
            {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                   
                    cmd.CommandText = "[SelectAllOrderStatusCodeAndStatus]";
                    sda = new SqlDataAdapter();
                    sda.SelectCommand = cmd;
                    ds = new DataSet();

                    sda.Fill(ds);
            
            }

            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "SelectAllOrderStatusCodeAndStatus";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
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
        #endregion Select All Order Status

        //----------* Closed Orders * ------------//

        #region Select All Closed Orders
        /// <summary>
        /// To select all orders
        /// </summary>
        /// <returns>Dataset</returns>
        public DataSet SelectAllClosedOrders()
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
                    cmd.CommandText = "[SelectAllClosedOrders]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
                    sda = new SqlDataAdapter();
                    sda.SelectCommand = cmd;
                    ds = new DataSet();

                    sda.Fill(ds);
                }
            }

            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "SelectAllClosedOrders";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
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
        #endregion Select All Closed Orders

        //--END

        #region Select Orders By Status
        /// <summary>
        /// To filter order by status 
        /// </summary>
        /// <returns>Dataset</returns>
        public DataSet SelectOrdersByStatus()
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
                    cmd.CommandText = "[SelectOrdersByStatusCode]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
                    cmd.Parameters.Add("@StatusCode", SqlDbType.Int).Value = Convert.ToInt32(StatusCode);
                    sda = new SqlDataAdapter();
                    sda.SelectCommand = cmd;
                    ds = new DataSet();

                    sda.Fill(ds);
                }
            }

            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "SelectOrdersByStatus";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
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
        #endregion Select Orders By Status


        #region Select All Orders
        /// <summary>
        /// To select all orders
        /// </summary>
        /// <returns>Dataset</returns>
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
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "SelectAllOrders";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
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
        /// To get details of order details by orderid
        /// </summary>
        /// <returns>Dataset</returns>
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
               
            }
            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "GetOrderDetailsByOrderID";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
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
        #endregion Get Order Details By OrderID

        #region Get Order Details By userID
        /// <summary>
        /// To get details of order details of a customer
        /// </summary>
        /// <returns>Datatable</returns>
        public DataTable GetOrderDetailsByUserID()
        {
            if (BoutiqueID == string.Empty)
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            if (UserID == string.Empty)
            {
                throw new Exception("UserID is Empty!!");
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
                cmd.CommandText = "[GetOrdersByUserID]";
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.UserID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
             
            }
            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "GetOrderDetailsByUserID";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
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

        #region Update Order TotalAmount
        public Int16 UpdateOrderTotalAmount()
        {
            if (OrderID == string.Empty)
            {
                throw new Exception("OrderID is Empty!!");
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
                cmd.CommandText = "[UpdateOrderTotalPrice]";
                cmd.Parameters.Add("@OrderID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(OrderID);
                cmd.Parameters.Add("@TotalOrderAmount", SqlDbType.Money).Value = TotalOrderAmount;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 255).Value = UpdatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
               
                outParameter = cmd.Parameters.Add("@UpdateStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "UpdateOrderTotalAmount";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
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
        #endregion Update Order TotalAmount

        #region Edit Order Details
        /// <summary>
        /// to edit the order details by orderid
        /// </summary>
        /// <returns>status</returns>
        public Int16 UpdateOrderDetailsByOrderID()
        {
            if (OrderID == string.Empty)
            {
                throw new Exception("OrderID is Empty!!");
            }
            if (BoutiqueID == string.Empty)
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            SqlParameter ordrNo = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateOrderByOrderID]";

                if (UserID != string.Empty && UserID != null)
                {
                    cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                }
                cmd.Parameters.Add("@OrderID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(OrderID);
              
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@OrderDescription", SqlDbType.NVarChar,-1).Value = OrderDescription;

                //if (ForecastDeliveryDate != string.Empty && ForecastDeliveryDate != null)
                //{
                //    cmd.Parameters.Add("@ForecastDeliveryDate", SqlDbType.DateTime).Value = DateTime.Parse(ForecastDeliveryDate); 
                //}

                //if (OrderReadyDate != string.Empty && OrderReadyDate != null)
                //{
                //    cmd.Parameters.Add("@OrderReadyDate", SqlDbType.DateTime).Value =  DateTime.Parse(OrderReadyDate); 
                //}

                //if (ActualDeliveryDate != string.Empty &&  ActualDeliveryDate != null)
                //{
                //    cmd.Parameters.Add("@ActualDeliveryDate", SqlDbType.DateTime).Value =  DateTime.Parse(ActualDeliveryDate);
                //}

                if (PlannedDeliveryTime != null && PlannedDeliveryTime != string.Empty)
                {
                    cmd.Parameters.Add("@PlannedDeliveryTime", SqlDbType.NVarChar, 30).Value = PlannedDeliveryTime;
                }
                cmd.Parameters.Add("@DeliveryAddress", SqlDbType.NVarChar, -1).Value = DeliveryAddress;
                cmd.Parameters.Add("@MobileNo", SqlDbType.NVarChar, 20).Value = MobileNo;

                if (BranchID != null && BranchID != string.Empty)
                {
                    cmd.Parameters.Add("@BranchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BranchID);
                }

                cmd.Parameters.Add("@StatusCode", SqlDbType.Int).Value = Convert.ToInt32(StatusCode);

                if (CustomerName != null)
                {
                    cmd.Parameters.Add("@CustomerName", SqlDbType.NVarChar, 255).Value = CustomerName;
                } 

                cmd.Parameters.Add("@TotalOrderAmount", SqlDbType.Money).Value = TotalOrderAmount;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 255).Value = UpdatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
               
                outParameter = cmd.Parameters.Add("@UpdateStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;

                ordrNo = cmd.Parameters.Add("@OrderNo", SqlDbType.SmallInt);
                ordrNo.Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "UpdateOrderDetailsByOrderID";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }

            OrderNo = ordrNo.Value.ToString();

            //update success or failure
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion Edit Order Details

        #region New Order
        /// <summary>
        /// to insert a new order into database
        /// </summary>
        /// <returns>status</returns>
        public Int16 InsertOrder()
        {
            if (BoutiqueID == string.Empty)
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            //if (OrderDate == "")
            //{
            //    throw new Exception("OrderDate is Empty!!");
            //}
          
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            SqlParameter ID = null;
            SqlParameter ordrNo = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertOrder]";

                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);

                if (UserID!= null && UserID != string.Empty)
                {
                    cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID); 
                }
               
                cmd.Parameters.Add("@OrderDescription", SqlDbType.NVarChar, -1).Value = OrderDescription;
                cmd.Parameters.Add("@OrderDate", SqlDbType.DateTime).Value = DateTime.Now; //OrderDate

                if (PlannedDeliveryDate != string.Empty && PlannedDeliveryDate != null )
                {
                    cmd.Parameters.Add("@PlannedDeliveryDate", SqlDbType.DateTime).Value = DateTime.Parse(PlannedDeliveryDate);
                    cmd.Parameters.Add("@ForecastDeliveryDate", SqlDbType.DateTime).Value = DateTime.Parse(PlannedDeliveryDate);
                }
                if (PlannedDeliveryTime != null && PlannedDeliveryTime != string.Empty)
                {
                    cmd.Parameters.Add("@PlannedDeliveryTime", SqlDbType.NVarChar, 30).Value = PlannedDeliveryTime;
                }

                if (CustomerName!= null)
	              {
                      cmd.Parameters.Add("@CustomerName", SqlDbType.NVarChar, 255).Value = CustomerName;
	              } 
                //cmd.Parameters.Add("@ActualDeliveryDate", SqlDbType.DateTime).Value = ActualDeliveryDate;
                //cmd.Parameters.Add("@OrderReadyDate", SqlDbType.DateTime).Value = OrderReadyDate;

                cmd.Parameters.Add("@TotalOrderAmount", SqlDbType.Money).Value = TotalOrderAmount;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                //cmd.Parameters.Add("@OrderNo", SqlDbType.Int).Value = OrderNo;

                cmd.Parameters.Add("@DeliveryAddress", SqlDbType.NVarChar, -1).Value = DeliveryAddress;
                cmd.Parameters.Add("@MobileNo", SqlDbType.NVarChar, 20).Value = MobileNo;

                if (BranchID != null && BranchID != string.Empty)
                {
                    cmd.Parameters.Add("@BranchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BranchID); 
                }

                cmd.Parameters.Add("@StatusCode", SqlDbType.Int).Value = Convert.ToInt32(StatusCode);
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;

                ID = cmd.Parameters.Add("@OrderID", SqlDbType.UniqueIdentifier);
                ID.Direction = ParameterDirection.Output;

                ordrNo = cmd.Parameters.Add("@OrderNo", SqlDbType.NVarChar,-1);
                ordrNo.Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "InsertOrder";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }

            //insert success or failure
            OrderID = ID.Value != null ? ID.Value.ToString() : "";
            OrderNo = ordrNo.Value.ToString();
            return Int16.Parse(outParameter.Value.ToString());
            //return Guid.Parse(ID.Value.ToString());

        }
        #endregion New Order


//----------Order Item Metods -------------//


        #region New Order Item
        /// <summary>
        /// to insert a new notification into database
        /// </summary>
        /// <returns>status</returns>
        public Int16 InsertOrderItem()
        {
            if (OrderID == string.Empty || OrderID == null)
            {
                throw new Exception("OrderID is Empty!!");
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
                cmd.CommandText = "[InsertOrderItem]";

                cmd.Parameters.Add("@OrderID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(OrderID);
                cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                cmd.Parameters.Add("@CustomerRemarks", SqlDbType.NVarChar, -1).Value = CustomerRemarks;
                
                if (Unit != null && Unit != string.Empty)
                {
                    cmd.Parameters.Add("@Unit", SqlDbType.NVarChar, 50).Value = Unit;  
                }
                if (Quantity != null && Quantity != string.Empty)
                {
                    cmd.Parameters.Add("@Quantity", SqlDbType.Int).Value = Convert.ToInt32(Quantity);
                }

                if (TypeCode != null && TypeCode != string.Empty)
                {
                    cmd.Parameters.Add("@TypeCode", SqlDbType.NVarChar, 50).Value = TypeCode;  
                }

                if (ItemPrice != null && ItemPrice != string.Empty)
                {
                    cmd.Parameters.Add("@ItemPrice", SqlDbType.Money).Value = Convert.ToDecimal(ItemPrice);
                }

                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;

                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "InsertOrderItem";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
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
        #endregion New Order Item

        #region Get Order Item Details By OrderID
        /// <summary>
        /// To get details of order details by orderid
        /// </summary>
        /// <returns>Dataset</returns>
        public DataSet GetOrderItemsByOrderID()
        {
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
                cmd.CommandText = "[SelectOrderItemsByOrderID]";
                cmd.Parameters.Add("@OrderID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.OrderID);
                //if (this.ProductID != null && this.ProductID != string.Empty)
                //{
                //    cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.ProductID);
                //}
                
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
                //if (ds.Tables[0].Rows.Count == 0) { throw new Exception("No such item"); }
              
            }
            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "GetOrderItemsByOrderID";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
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
        #endregion Get Order Item Details By OrderID

        #region Delete An OrderItem
        /// <summary>
        /// To delete a orderitem by product id
        /// </summary>
        /// <returns>status</returns>
        public Int16 DeleteOrderItem()
        {
            if (OrderItemID == "")
            {
                throw new Exception("ProductID is Empty!!");
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
                cmd.CommandText = "[DeleteOrderItem]";
                //cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.ProductID);
                cmd.Parameters.Add("@OrderItemID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.OrderItemID);

                outParameter = cmd.Parameters.Add("@DeleteStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Order";
                ETObj.Method = "DeleteOrderItem";
                ETObj.ErrorSource = "DAL";
                ETObj.IsMobile = false;
                ETObj.Version = BugTrackerVersion;
                ETObj.CreatedBy = BugTrackerCreatedBy;
                ETObj.InsertErrorDetails();
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
        #endregion Delete An OrderItem

        #endregion Methods

    }

    
}