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

        public string DOB
        {
            get;
            set;
        }

        public string Anniversary
        {
            get;
            set;
        }

        public Int64 LoyaltyCardNo
        {
            get;
            set;
        }
        public string Gender
        {
            get;
            set;
        }
        public string CreatedBy
        {
            get;
            set;
        }

        public DateTime? CreatedDate
        {
            get;
            set;
        }

        public string UpdatedBy
        {
            get;
            set;
        }

        public DateTime? UpdatedDate
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
        #endregion SelectAllUsers

        #region SelectUser
        public DataSet SelectUserByUserID()
        {
            if (UserID == "")
            {
                throw new Exception("UserID is Empty!!");
            }
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    sda = new SqlDataAdapter();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[SelectUserByUserID]";
                    cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    sda.SelectCommand = cmd;
                    ds = new DataSet();
                    sda.Fill(ds);
                    if (ds.Tables[0].Rows.Count == 0) { throw new Exception("No such ID"); }
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
        /// <summary>
        /// Create a new user
        /// </summary>
        /// <returns>status</returns>
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
            SqlParameter outParameter3 = null;
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
                    if (DOB != "") cmd.Parameters.Add("@DOB", SqlDbType.DateTime).Value =DateTime.Parse(DOB);
                    if (Anniversary != "") cmd.Parameters.Add("@Anniversary", SqlDbType.DateTime).Value = DateTime.Parse(Anniversary);
                   
                   
                   
                    cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 200).Value = CreatedBy;
                    cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime, 200).Value = CreatedDate;
                    cmd.Parameters.Add("@Administrator", SqlDbType.Bit).Value = IsAdmin;
                    cmd.Parameters.Add("@Gender", SqlDbType.NVarChar,6).Value = Gender;
                    outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                    outParameter2 = cmd.Parameters.Add("@LoyalyCardNumber", SqlDbType.BigInt);
                    outParameter3 = cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier);
                    outParameter.Direction = ParameterDirection.Output;
                    outParameter2.Direction = ParameterDirection.Output; 
                    outParameter3.Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
                }
            }

            catch (SqlException ex)
            {   //------------------Mobile number already exist exception
                if (ex.Number == 2627) throw new Exception("This Mobile number is already registered!! Please login"); //Unique Constraint violation
                throw ex;
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
            UserID = outParameter3.Value.ToString();
            return Int16.Parse(outParameter.Value.ToString());

        }
        /// <summary>
        /// Adding new user with a referral.
        /// </summary>
        /// <param name="referral">referral loyalty card number</param>
        /// <returns></returns>
        public Int16 AddNewUser(string referral)
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            if (Mobile == "")
            {
                throw new Exception("Mobile is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            SqlParameter outParameter2 = null;
            SqlParameter outParameter3 = null;
            Guid _boutiqued = Guid.Empty;
            try
            {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[AddingNewUser]";
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                    cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 20).Value = Mobile;
                    cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = Email;
                    cmd.Parameters.Add("@Active", SqlDbType.Bit).Value = IsActive;
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqued;
                    if (DOB != "") cmd.Parameters.Add("@DOB", SqlDbType.DateTime).Value = DateTime.Parse(DOB);
                    if (Anniversary != "") cmd.Parameters.Add("@Anniversary", SqlDbType.DateTime).Value = DateTime.Parse(Anniversary);
                    cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 200).Value = CreatedBy;
                    cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime, 200).Value = CreatedDate;
                    cmd.Parameters.Add("@Administrator", SqlDbType.Bit).Value = IsAdmin;
                    cmd.Parameters.Add("@Gender", SqlDbType.NVarChar, 6).Value = Gender;
                    cmd.Parameters.Add("@Referral", SqlDbType.BigInt).Value = Int64.Parse(referral);
                    outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                    outParameter2 = cmd.Parameters.Add("@LoyalyCardNumber", SqlDbType.BigInt);
                    outParameter3 = cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier);
                    outParameter.Direction = ParameterDirection.Output;
                    outParameter2.Direction = ParameterDirection.Output;
                    outParameter3.Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
              
            }

            catch (SqlException ex)
            {   //------------------Mobile number already exist exception
                if (ex.Number == 2627) throw new Exception("This Mobile number is already registered!! Please login"); //Unique Constraint violation
                throw ex;
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
            UserID = outParameter3.Value.ToString();
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion AddNewUser

        #region User Activation
        /// <summary>
        /// To activate a user by userID
        /// </summary>
        /// <returns>status</returns>
        public Int16 UserActivation()
        {
            if (UserID == "")
            {
                throw new Exception("UserID is Empty!!");
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
                cmd.CommandText = "[UserActivation]";
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID); 
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 200).Value = UpdatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;

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
        #endregion User Activation

        #region User Login
        /// <summary>
        /// To Login a user by Mobile
        /// </summary>
        /// <returns>Datatable wit UserID and isActive</returns>
        public DataTable UserLogin()
        {
            if (Mobile == "")
            {
                throw new Exception("Mobile number is Empty!!");
            }
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataAdapter sda = null;
            DataTable dt=null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                sda = new SqlDataAdapter();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UserLogin]";
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar,20).Value = Mobile;
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count == 0) { throw new Exception("No such account"); }
                DataRow row = dt.NewRow();
                row = dt.Rows[0];
                UserID = row["UserID"].ToString();
                IsActive = Boolean.Parse(row["Active"].ToString());
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
        #endregion User Login

        #region EditUser
        public Int16 EditUser(string userID)
        {
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
                cmd.CommandText = "[UpdateUserDetails]";
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(userID);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 20).Value = Mobile;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = Email;
                cmd.Parameters.Add("@Active", SqlDbType.Bit).Value = IsActive;
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@DOB", SqlDbType.DateTime).Value = DateTime.Parse(DOB);
                cmd.Parameters.Add("@Anniversary", SqlDbType.DateTime).Value = DateTime.Parse(Anniversary); 
                cmd.Parameters.Add("@LoyaltyCardNo", SqlDbType.BigInt).Value = LoyaltyCardNo;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 200).Value = "Albert";
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
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

        #region DeleteUser
        /// <summary>
        /// Delete user
        /// </summary>
        /// <param name=userObj></param>
        /// <returns></returns>
        public Int16 DeleteUser()
        {
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
                cmd.CommandText = "[DeleteUser]";
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                outParameter = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
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
        #endregion DeleteBoutique
        #endregion Methods
    }
}