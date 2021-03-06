﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class AppInstallationLog
    {   
        #region Properties
        public string AppID
        {
            get;
            set;
        }
        public string BoutiqueID
        {
            get;
            set;
        }
        public string Version
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
	    #endregion
        
        
        #region Methods

            #region New App installation
        /// <summary>
        /// to insert a new Appinstallation into database
        /// </summary>
        /// <returns>status</returns>
            public Int16 InsertAppInstallation()
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
                    cmd.CommandText = "[InsertAppInstallation]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    cmd.Parameters.Add("@Version", SqlDbType.NVarChar, 50).Value = Version;
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
                    ETObj.Module = "AppInstallationLog";
                    ETObj.Method = "InsertAppInstallation";
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

            #region Edit AppInstallation
        /// <summary>
        /// to edit the app installation details
        /// </summary>
        /// <returns>status</returns>
            public Int16 UpdateAppInstallation()
            {
                if (AppID == "")
                {
                    throw new Exception("AppID is Empty!!");
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
                    cmd.CommandText = "[UpdateAppInstallation]";
                    cmd.Parameters.Add("@AppID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(AppID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    cmd.Parameters.Add("@Version", SqlDbType.NVarChar, 50).Value = Version;
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
                    ETObj.Module = "AppInstallationLog";
                    ETObj.Method = "UpdateAppInstallation";
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

            #region Delete a app installation
        /// <summary>
        /// To delete a app installation log by id
        /// </summary>
        /// <returns>status</returns>
            public Int16 DeleteAppInstallation()
            {
                if (AppID == "")
                {
                    throw new Exception("AppID is Empty!!");
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
                    cmd.CommandText = "[DeleteAppInstallation]";
                    cmd.Parameters.Add("@AppID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.AppID);
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
                    ETObj.Module = "AppInstallationLog";
                    ETObj.Method = "DeleteAppInstallation";
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


        #region All App installations
        /// <summary>
        /// Get list of app installation log
        /// </summary>
        /// <returns>datatable</returns>
        public DataSet GetAllAppInstallation()
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
                cmd.CommandText = "[SelectAllAppInstallationsUnderBoutique]";
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
                ETObj.Module = "AppInstallationLog";
                ETObj.Method = "GetAllAppInstallation";
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

         #endregion Methods

    }
}