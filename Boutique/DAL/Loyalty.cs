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
        public int Amount
        {
            get;
            set;
        }
        public int DebitPoints
        {
            get;
            set;
        }
        public int CreditPoints
        {
            get;
            set;
        }
        public int MoneyValuePercentage
        {
            get;
            set;
        }
        public int MinAmountForRedeem
        {
            get;
            set;
        }
        public int MaxDiscountPercentage
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
        /// to edit the loyalty points table details and inseting loyalty change log
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
            if (UserID == "")
            {
                throw new Exception("UserID is Empty!!");
            }
            if (Points == 0)
            {
                throw new Exception("Points is Empty!!");
            }
            if (MoneyValuePercentage == 0)
            {
                throw new Exception("MoneyValuePercentage is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlCommand cmd2 = null;
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
                //cmd.Parameters.Add("@ValidityDate", SqlDbType.DateTime).Value = ValidityDate;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 255).Value = UpdatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;

                outParameter = cmd.Parameters.Add("@UpdateStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();

                cmd2 = new SqlCommand();
                cmd2.Connection = dcon.SQLCon;
                cmd2.CommandType = CommandType.StoredProcedure;
                cmd2.CommandText = "[InsertLoyaltyLog]";
                cmd2.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                cmd2.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd2.Parameters.Add("@AmountPaid", SqlDbType.BigInt).Value = Amount;
                cmd2.Parameters.Add("@DebitPoints", SqlDbType.Int).Value = DebitPoints;
                cmd2.Parameters.Add("@CreditPoints", SqlDbType.Int).Value = CreditPoints;
                cmd2.Parameters.Add("@LoyaltyPoints", SqlDbType.Int).Value = Points;
                cmd2.Parameters.Add("@MoneyValuePercentage", SqlDbType.Int).Value = MoneyValuePercentage;
                cmd2.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = UpdatedBy;           //Updating person creates log
                cmd2.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                cmd2.ExecuteNonQuery();
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

        #region Update Loyalty Settings
        /// <summary>
        /// to edit the loyalty settings table
        /// </summary>
        /// <returns>status</returns>
        public Int16 UpdateLoyaltySettings()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            if (MoneyValuePercentage <= 0 || MoneyValuePercentage >100)
            {
                throw new Exception("MoneyValuePercentage is invalid!!");
            }
            if (MinAmountForRedeem < 0)
            {
                throw new Exception("MinAmountForRedeem is invalid!!");
            }
            if (MaxDiscountPercentage <= 0 || MaxDiscountPercentage>100)
            {
                throw new Exception("MaxDiscountPercentage is invalid!!");
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
                cmd.CommandText = "[UpdateLoyaltySettings]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@MoneyToPoint", SqlDbType.Int).Value = MoneyValuePercentage;
                cmd.Parameters.Add("@MinAmountForRedeem", SqlDbType.Int).Value = MinAmountForRedeem;
                cmd.Parameters.Add("@MaxDiscountPercentage", SqlDbType.Int).Value = MaxDiscountPercentage;
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

        //============Loyalty Related Calculations from Loyalty Log=============
        //*    
        //*    Credit points x Money point value = Actual Purchase Amount
        //*    AmountPaid + Debit Ponit          = Actual Purchase Amount
        //*
        //*    Old Loyalty Point = Loyalty Point + Debit Ponits - Credit Points 
        //*
        //======================================================================

    }
}