using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class Boutiques
    {
        #region properties
        public string BoutiqueID
        {
            get;
            set;
        }

        public string AppVersion
        {
            get;
            set;
        }

        public string Name
        {
            get;
            set;
        }
        public string StartedYear
        {
            get;
            set;
        }
        public string AboutUs
        {
            get;
            set;
        }
        public string Caption
        {
            get;
            set;
        }

        public string Location
        {
            get;
            set;
        }
        public string Address
        {
            get;
            set;
        }
        public string Phone
        {
            get;
            set;
        }
        public string Timing
        {
            get;
            set;
        }
        public string WorkingDays
        {
            get;
            set;
        }
        public string FbLink
        {
            get;
            set;
        }
        public string InstagramLink
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


        #endregion properties

        #region Methods

        #region GetAllBoutiques
        /// <summary>
        /// Selects all boutiques
        /// </summary>
        /// <returns>All boutiques</returns>
        public DataSet GetAllBoutiques()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {

                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectAllBoutiques]";
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
        #endregion GetAllBoutiques

        #region GetBoutique
        /// <summary>
        /// Get one boutique Details based on boutiqueID
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <returns>"One boutique details"</returns>
        public DataSet GetBoutique(string boutiqueID)
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            Guid _boutiqueid = Guid.Empty;
            try
            {
                _boutiqueid = Guid.Parse(boutiqueID);
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                sda = new SqlDataAdapter();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectBoutiqueByBoutiqueID]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
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
        #endregion GetBoutique

        #region NewBoutique
        public Int16 NewBoutique()
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
                cmd.CommandText = "[AddNewBoutique]";
                cmd.Parameters.Add("@AppVersion", SqlDbType.NVarChar, 50).Value = AppVersion;
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                cmd.Parameters.Add("@StartedYear", SqlDbType.NVarChar, 5).Value = StartedYear;
                cmd.Parameters.Add("@AboutUs", SqlDbType.NVarChar, -1).Value = AboutUs;
                cmd.Parameters.Add("@Caption", SqlDbType.NVarChar, 255).Value = Caption;
                cmd.Parameters.Add("@Location", SqlDbType.NVarChar, 255).Value = Location;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = Address;
                cmd.Parameters.Add("@Phone", SqlDbType.NVarChar, 50).Value = Phone;
                cmd.Parameters.Add("@Timing", SqlDbType.NVarChar, 50).Value = Timing;
                cmd.Parameters.Add("@WorkingDays", SqlDbType.NVarChar, 10).Value = WorkingDays;
                cmd.Parameters.Add("@FBLink", SqlDbType.NVarChar, 200).Value = FbLink;
                cmd.Parameters.Add("@InstagramLink", SqlDbType.NVarChar, 200).Value = InstagramLink;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 200).Value = "Albert";
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;


                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
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

        #endregion NewBoutique

        #region EditBoutique
        public Int16 EditBoutique(string boutiqueID)
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            Guid _boutiqueid = Guid.Empty;
            try
            {
                _boutiqueid = Guid.Parse(boutiqueID);
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateBoutiqueDetails]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
                cmd.Parameters.Add("@AppVersion", SqlDbType.NVarChar, 50).Value = AppVersion;
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                cmd.Parameters.Add("@StartedYear", SqlDbType.NVarChar, 5).Value = StartedYear;
                cmd.Parameters.Add("@AboutUs", SqlDbType.NVarChar, -1).Value = AboutUs;
                cmd.Parameters.Add("@Caption", SqlDbType.NVarChar, 255).Value = Caption;
                cmd.Parameters.Add("@Location", SqlDbType.NVarChar, 255).Value = Location;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = Address;
                cmd.Parameters.Add("@Phone", SqlDbType.NVarChar, 50).Value = Phone;
                cmd.Parameters.Add("@Timing", SqlDbType.NVarChar, 50).Value = Timing;
                cmd.Parameters.Add("@WorkingDays", SqlDbType.NVarChar, 10).Value = WorkingDays;
                cmd.Parameters.Add("@FBLink", SqlDbType.NVarChar, 200).Value = FbLink;
                cmd.Parameters.Add("@InstagramLink", SqlDbType.NVarChar, 200).Value = InstagramLink;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 200).Value = "Albert";
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
        #endregion EditBoutique


        #region DeleteBoutique
        /// <summary>
        /// Delete boutique
        /// </summary>
        /// <param name="BoutiqueID"></param>
        /// <returns></returns>
        public Int16 DeleteBoutique(string boutiqueID)
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            Guid _boutiqueid = Guid.Empty;
            try
            {
                _boutiqueid = Guid.Parse(boutiqueID);
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteBoutique]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = _boutiqueid;
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

        #region GetAllBoutiqueIDAndName
        public DataSet GetAllBoutiqueIDAndName()
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
                    cmd.CommandText = "[GetAllBoutiqueIDAndName]";
                   
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
        #endregion GetAllBoutiqueIDAndName

        #region GetBoutiqueImage

        public byte[] GetBoutiqueImage()
        {
         

            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataReader rd = null;
            byte[] imageproduct = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectBoutiqueByBoutiqueID]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                rd = cmd.ExecuteReader();
                if ((rd.Read()) && (rd.HasRows) && (rd["Image"] != DBNull.Value))
                {
                    imageproduct = (byte[])rd["Image"];
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
                    rd.Close();
                    dcon.DisconectDB();
                }
            }
            return imageproduct;

        }
        #endregion GetBoutiqueImage


        #endregion Methods

    }
}