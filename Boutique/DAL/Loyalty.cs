using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class Loyalty
    {
        #region Properties
        public string LoyaltyCardNo
        {
            get;
            set;
        }
        public string BoutiqueID
        {
            get;
            set;
        }
        public int Points
        {
            get;
            set;
        }
        public string ValidityDate
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
        //Loyalty Admin panel parameters
        public int purchaseAmount
        {
            get;
            set;
        }
        public Boolean Redeem
        {
            get;
            set;
        }
        public string UserID
        {
            get;
            set;
        }
        #endregion

        #region Methods

        #region Get Loyalty settings
        public DataTable GetLoyaltySettings()
        {
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
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetLoyaltySettings]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
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


        #region Update Loyalty points
        /// <summary>
        /// to edit the loyalty points table details
        /// </summary>
        /// <returns>status</returns>
        public Int16 UpdateLoyaltyPoints()
        {
            if (LoyaltyCardNo == "")
            {
                throw new Exception("LoyaltyCardNo is Empty!!");
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
                cmd.CommandText = "[UpdateLoyaltyPoints]";
                cmd.Parameters.Add("@LoyaltyCardNO", SqlDbType.BigInt).Value = Int64.Parse(LoyaltyCardNo);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@Points", SqlDbType.Int).Value = Points;
                cmd.Parameters.Add("@ValidityDate", SqlDbType.DateTime).Value = ValidityDate;
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

        #endregion

    }
}