using System;
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
                    cmd.CommandText = "[DeleteAppInstallation]";
                    cmd.Parameters.Add("@AppID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.AppID);
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


        #region All App installations
        /// <summary>
        /// Get list of app installation log
        /// </summary>
        /// <returns>datatable</returns>
        public DataTable GetAllAppInstallation()
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
                cmd.CommandText = "[SelectAllAppInstallationsUnderBoutique]";
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