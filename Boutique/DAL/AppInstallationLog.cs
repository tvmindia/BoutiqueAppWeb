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

        #region AllDesigners
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

        #endregion 

         #endregion Methods

    }
}