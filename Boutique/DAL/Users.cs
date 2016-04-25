using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class Users
    {

        #region properties
        public string UserID
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public string Mobile
        {
            get;
            set;
        }

        public string Email
        {
            get;
            set;
        }

        public bool IsActive
        {
            get;
            set;
        }


        public string BoutiqueID
        {
            get;
            set;
        }

        public DateTime? DOB
        {
            get;
            set;
        }

        public DateTime? Anniversary
        {
            get;
            set;
        }

        public Int64 LoyaltyCardNo
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

        public bool IsAdmin
        {
            get;
            set;
        }
        #endregion properties

        #region Methods
        #region SelectAllUsers
        public DataSet SelectAllUsers(string boutiqueID)
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            Guid _boutiqueid = Guid.Empty;
            try
            {
                _boutiqueid = Guid.Parse(boutiqueID);
                if (_boutiqueid != Guid.Empty)
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[SelectAllUsersByBoutiqueiD]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
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
        #endregion SelectAllUsers

        #region SelectUser
        public DataSet SelectUserByUserID(string userID,string boutiqueID)
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            Guid _userid = Guid.Empty;
            Guid _boutiqueid = Guid.Empty;
            try
            {
                _userid = Guid.Parse(userID);
                _boutiqueid = Guid.Parse(boutiqueID);
                if ((_userid != Guid.Empty) && (_boutiqueid != Guid.Empty))
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[SelectUserByUserID]";
                    cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = _userid;
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
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
        #endregion SelectUser


        #region AddNewUser
        public Int16 AddNewUser()
        {
            if (Mobile == "")
            {
                throw new Exception("Mobile is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            SqlParameter outParameter2 = null;
            Guid _boutiqued = Guid.Empty;
            try
            {
                _boutiqued = Guid.Parse(BoutiqueID);
                if (_boutiqued != Guid.Empty)
                {


                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[AddNewUser]";
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                    cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 20).Value = Mobile;
                    cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = Email;
                    cmd.Parameters.Add("@Active", SqlDbType.Bit).Value = IsActive;
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqued;
                    cmd.Parameters.Add("@DOB", SqlDbType.DateTime).Value = DOB;
                    cmd.Parameters.Add("@Anniversary", SqlDbType.DateTime).Value = Anniversary;
                   //cmd.Parameters.Add("@LoyaltyCardNo", SqlDbType.BigInt).Value = LoyaltyCardNo;
                    cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 200).Value = CreatedBy;
                    cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime, 200).Value = CreatedDate;
                    cmd.Parameters.Add("@Administrator", SqlDbType.Bit).Value = IsAdmin;
                    outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                    outParameter2 = cmd.Parameters.Add("@LoyalyCardNumber", SqlDbType.BigInt);
                    outParameter.Direction = ParameterDirection.Output;
                    outParameter2.Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
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
            //insert success or failure
            LoyaltyCardNo = Int64.Parse(outParameter2.Value.ToString());
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion AddNewUser

        #region EditUser
        public Int16 EditUser(string userID)
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
          
            Guid _userid = Guid.Empty;
            try
            {
                _userid = Guid.Parse(userID);
               
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateUserDetails]";
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = _userid;
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 20).Value = Mobile;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = Email;
                cmd.Parameters.Add("@Active", SqlDbType.Bit).Value = IsActive;
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = BoutiqueID;
                cmd.Parameters.Add("@DOB", SqlDbType.DateTime).Value = DOB;
                cmd.Parameters.Add("@Anniversary", SqlDbType.DateTime).Value = Anniversary;
                cmd.Parameters.Add("@LoyaltyCardNo", SqlDbType.BigInt).Value = LoyaltyCardNo;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 200).Value = "Albert";
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.NVarChar, 200).Value = DateTime.Now;
                cmd.Parameters.Add("@Administrator", SqlDbType.Bit).Value = IsAdmin;

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
            //insert success or failure
            return Int16.Parse(outParameter.Value.ToString());


           
        }
        #endregion EditUser
        #endregion Methods
    }
}