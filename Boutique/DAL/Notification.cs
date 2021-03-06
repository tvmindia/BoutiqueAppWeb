﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class Notification
    {

        #region properties
        public string NotificationID
        {
            get;
            set;
        }
        public string BoutiqueID
        {
            get;
            set;
        }
        public string Title
        {
            get;
            set;
        }
        public string Description
        {
            get;
            set;
        }
        public string StartDate
        {
            get;
            set;
        }
        public string EndDate
        {
            get;
            set;
        }
        public string ProductID
        {
            get;
            set;
        }
        public string CategoryCode
        {
            get;
            set;
        }
        public string UserID
        {
            get;
            set;
        }
        public string OrderID
        {
            get;
            set;
        }
        public string[] ImageIDs
        {
            get;
            set;
        }
        public string[] productIDs
        {
            get;
            set;
        }
        public string[] audienceMailIDs
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
        public Guid TemplateID
        {
            get;
            set;
        }
        public string audienceMailType
        {
            get;
            set;
        }
        public string NewsLetterID
        {
            get;
            set;
        }
        public int imageCount
        {
            get;
            set;
        }
        public string templateFile
        {
            get;
            set;
        }
        public string status
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
        #endregion properties

        #region Methods

        #region GetPersonalisedNotifications
        /// <summary>
        /// get all the notifications having userID
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <returns></returns>
        public DataSet GetPersonalisedNotifications()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            Guid boutiqueid = Guid.Parse(BoutiqueID);
            try
            {
                if (boutiqueid != Guid.Empty)
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetPersonalisedNotifications]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = boutiqueid;
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
                ETObj.Module = "Notification";
                ETObj.Method = "GetPersonalisedNotifications";
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
        #endregion GetPersonalisedNotifications


        #region New Notification
        /// <summary>
        /// to insert a new notification into database
        /// </summary>
        /// <returns>status</returns>
        public Int16 InsertNotification()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            //if (Title == "")
            //{
            //    throw new Exception("Title is Empty!!");
            //}
            if (StartDate == "")
            {
                throw new Exception("StartDate is Empty!!");
            }
            if (EndDate == "")
            {
                throw new Exception("EndDate is Empty!!");
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
                cmd.CommandText = "[InsertNotification]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@Title", SqlDbType.NVarChar, 50).Value = Title;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description;
                cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = StartDate;
                cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = EndDate;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                if (ProductID != "" && ProductID != null) cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                if (CategoryCode != "" && CategoryCode != null) cmd.Parameters.Add("@CategoryCode", SqlDbType.NVarChar, 50).Value = CategoryCode;
                if (UserID != "" && UserID != null) cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                if (OrderID != "" && OrderID != null) cmd.Parameters.Add("@OrderID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(OrderID);
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
                ETObj.Module = "Notification";
                ETObj.Method = "InsertNotification";
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
        #endregion

        #region Edit notification
        /// <summary>
        /// to edit the Notification details
        /// </summary>
        /// <returns>status</returns>
        public Int16 UpdateNotification()
        {
            if (NotificationID == "")
            {
                throw new Exception("NotificationID is Empty!!");
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
                cmd.CommandText = "[UpdateNotification]";
                cmd.Parameters.Add("@NotificationID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(NotificationID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@Title", SqlDbType.NVarChar, 50).Value = Title;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description;
                cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = StartDate;
                cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = EndDate;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 255).Value = UpdatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                if (ProductID != "") cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                if (CategoryCode != "") cmd.Parameters.Add("@CategoryCode", SqlDbType.NVarChar, 50).Value = CategoryCode;
                if (UserID != "" && UserID != null) cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
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
                ETObj.Module = "Notification";
                ETObj.Method = "UpdateNotification";
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
            //update success or failure
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion

        #region SelectAllNotifications ByBoutiqueID
        /// <summary>
        /// get all the notifications
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <returns></returns>
        public DataSet SelectAllNotificationsBoutiqueID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            Guid boutiqueid = Guid.Parse(BoutiqueID);
            try
            {
                if (boutiqueid != Guid.Empty)
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[SelectAllNotificationsByBoutiqueID]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = boutiqueid;
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
                ETObj.Module = "Notification";
                ETObj.Method = "SelectAllNotificationsBoutiqueID";
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
        #endregion

        #region Get all the notifications
        /// <summary>
        /// get all the notifications
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <returns></returns>
        public DataSet SelectAllNotifications()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            Guid boutiqueid = Guid.Parse(BoutiqueID);
            try
            {
                if (boutiqueid != Guid.Empty)
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetCountForTiles]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = boutiqueid;
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
                ETObj.Module = "Notification";
                ETObj.Method = "SelectAllNotifications";
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
        #endregion

        #region Get a notification details
        /// <summary>
        /// To get details of a specific notification
        /// </summary>
        /// <returns></returns>
        public DataSet GetNotification()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            if (NotificationID == "")
            {
                throw new Exception("NotificationID is Empty!!");
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
                cmd.CommandText = "[SelectNotificationByNotificationID]";
                cmd.Parameters.Add("@NotificationID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.NotificationID);
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
                ETObj.Module = "Notification";
                ETObj.Method = "GetNotification";
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
        #endregion

        #region Delete Notification
        /// <summary>
        /// To delete a notification by notification id
        /// </summary>
        /// <returns>status</returns>
        public Int16 DeleteNotification()
        {
            if (NotificationID == "")
            {
                throw new Exception("NotificationID is Empty!!");
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
                cmd.CommandText = "[DeleteNotification]";
                cmd.Parameters.Add("@NotificationID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.NotificationID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
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
                ETObj.Module = "Notification";
                ETObj.Method = "DeleteNotification";
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
        #endregion

        #region Notifications for App
        public DataTable GetNotificationsForApp(string notificationsIDs)
        {
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
                cmd.CommandText = "[GetNotificationsForApp]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                cmd.Parameters.Add("@Notification_IDs", SqlDbType.NVarChar, -1).Value = notificationsIDs;
                if (UserID != "") cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.UserID);
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
                ETObj.Module = "Notification";
                ETObj.Method = "GetNotificationsForApp";
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

        #endregion Methods
    }
}