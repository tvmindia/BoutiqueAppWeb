using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class ExceptionTrack
    {
        #region properties
        public string ErrorID
        {
            get;
            set;
        }
        public string BoutiqueID
        {
            get;
            set;
        }
        public string UserID
        {
            get;
            set;
        }
        public string Description
        {
            get;
            set;
        }
        public string Date
        {
            get;
            set;
        }
        public string Module
        {
            get;
            set;
        }
        public string Method
        {
            get;
            set;
        }
        public Boolean IsFixed
        {
            get;
            set;
        }
        public string BugFixDate
        {
            get;
            set;
        }
        public string ErrorSource
        {
            get;
            set;
        }
        public Boolean IsMobile
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
        public string Version
        {
            get;
            set;
        }
        public string status
        {
            get;
            set;
        }
        #endregion properties

        #region JqueryDataTable properties

        public int draw
        {
            get;
            set;
        }
        public int recordsTotal
        {
            get;
            set;
        }
        public int recordsFiltered
        {
            get;
            set;
        }
       
        #endregion JqueryDataTable properties
        #region Methods
        #region InsertErrorDetails
        public Int16 InsertErrorDetails()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter, outParameter2 = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertErrorLog]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = BoutiqueID;
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = UserID;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description;
                cmd.Parameters.Add("@Date", SqlDbType.DateTime).Value = Date;
                cmd.Parameters.Add("@Module", SqlDbType.NVarChar, 50).Value = Module;
                cmd.Parameters.Add("@Method", SqlDbType.NVarChar, 50).Value = Method;
                cmd.Parameters.Add("@IsFixed", SqlDbType.Bit, -1).Value = IsFixed;
                cmd.Parameters.Add("@BugFixDate", SqlDbType.DateTime).Value = BugFixDate;
                cmd.Parameters.Add("@ErrorSource", SqlDbType.NVarChar, 25).Value = ErrorSource;
                cmd.Parameters.Add("@IsMobile", SqlDbType.Bit).Value = IsMobile;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 200).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                cmd.Parameters.Add("@Version", SqlDbType.NVarChar, 50).Value = Version;
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParameter2 = cmd.Parameters.Add("@OutErrorID", SqlDbType.NVarChar, 50);
                outParameter2.Direction = ParameterDirection.Output;
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
            ErrorID = outParameter2.Value.ToString();
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion  InsertErrorDetails
        #region UpdateErrorDetails
        public string UpdateErrorDetails()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            if (ErrorID == string.Empty)
            {
                throw new Exception("ErrorID IS NULL");
            }
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateErrorDetails]";
                cmd.Parameters.Add("@ErrorID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ErrorID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = BoutiqueID;
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = UserID;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description;
                cmd.Parameters.Add("@Date", SqlDbType.DateTime).Value = Date;
                cmd.Parameters.Add("@Module", SqlDbType.NVarChar, 50).Value = Module;
                cmd.Parameters.Add("@Method", SqlDbType.NVarChar, 50).Value = Method;
                cmd.Parameters.Add("@IsFixed", SqlDbType.Bit, -1).Value = IsFixed;
                cmd.Parameters.Add("@BugFixDate", SqlDbType.DateTime).Value = BugFixDate;
                cmd.Parameters.Add("@ErrorSource", SqlDbType.NVarChar, 25).Value = ErrorSource;
                cmd.Parameters.Add("@IsMobile", SqlDbType.Bit).Value = IsMobile;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 200).Value = UpdatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                cmd.Parameters.Add("@Version", SqlDbType.NVarChar, 50).Value = Version;
                outParameter = cmd.Parameters.Add("@UpdateStatus", SqlDbType.TinyInt);
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
         
            return outParameter.Value.ToString();

        }
        #endregion UpdateErrorDetails

        #region GetAllErrorDetails
        public DataSet GetAllErrorDetails()
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
                    cmd.CommandText = "[GetAllErrorDetails]";
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
        #endregion GetAllErrorDetails

        #region GetErrorDetailByErrorID
        public DataSet GetErrorDetailByErrorID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            if (ErrorID == string.Empty)
            {
                throw new Exception("ErrorID IS NULL");
            }
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetErrorDetailByErrorID]";
                cmd.Parameters.Add("@ErrorID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ErrorID);
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
        #endregion GetErrorDetailByErrorID


        #endregion Methods







    }
}