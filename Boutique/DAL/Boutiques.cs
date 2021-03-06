﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class Boutiques
    {
        #region Global Variables

        DAL.Security.UserAuthendication UA;
        UIClasses.Const Const = new UIClasses.Const();

        #endregion Global variables

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
        public string status
        {
            get;
            set;
        }
        public byte[] boutiqueLogo
        {
            get;
            set;
        }
        public byte[] boutiqueImage
        {
            get;
            set;
        }
        public string Latitude
        {
            get;
            set;
        }
        public string Longitude
        {
            get;
            set;
        }
        public string CurrencyCode
        {
            get;
            set;
        }

        //--- Banner properties

        public string ImageID
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
        public byte[] ImageFile//of images
        {
            get;
            set;
        }
        public string FileType
        {
            get;
            set;
        }
        public string[] ImageInfo //Array stores imageids
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
        //Branch Properties
        public string branchID
        {
            get;
            set;
        }
        public string branchCode
        {
            get;
            set;
        }
        public string branchName
        {
            get;
            set;
        }
        public string branchLocation
        {
            get;
            set;
        }
        public string branchAddress
        {
            get;
            set;
        }
        public string branchPhone
        {
            get;
            set;
        }
        public string branchEmail
        {
            get;
            set;
        }
        public string branchCoordinate
        {
            get;
            set;
        }
        public string branchIsActive
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
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Boutiques";
                ETObj.Method = "GetAllBoutiques";
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
        #endregion GetAllBoutiques

        #region GetBoutique
        /// <summary>
        /// Get one boutique Details based on boutiqueID
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <returns>"One boutique details"</returns>
        public DataSet GetBoutique()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            Guid _boutiqueid = Guid.Empty;
            try
            {
                _boutiqueid = Guid.Parse(BoutiqueID);
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

                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Boutiques";
                ETObj.Method = "GetBoutique";
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
        #endregion GetBoutique

        #region Get Boutique for app
        /// <summary>
        /// Get one boutique Details based on boutiqueID with boutique image
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <returns>"One boutique details"</returns>
        public DataTable GetBoutiqueByBoutiqueIDForMobile()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;
            try{
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                sda = new SqlDataAdapter();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetBoutiqueByBoutiqueIDForMobile]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
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
                ETObj.Module = "Boutiques";
                ETObj.Method = "GetBoutiqueByBoutiqueIDForMobile";
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

        #region NewBoutique
        public string NewBoutique()
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
                cmd.Parameters.Add("@WorkingDays", SqlDbType.NVarChar, 30).Value = WorkingDays;
                cmd.Parameters.Add("@FBLink", SqlDbType.NVarChar, 200).Value = FbLink;
                cmd.Parameters.Add("@InstagramLink", SqlDbType.NVarChar, 200).Value = InstagramLink;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 200).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                cmd.Parameters.Add("@CurrencyCode", SqlDbType.NVarChar, 255).Value = CurrencyCode;

                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParameter2 = cmd.Parameters.Add("@BoutiqueID", SqlDbType.NVarChar,255);
               
                
                outParameter2.Direction = ParameterDirection.Output;
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
                ETObj.Module = "Boutiques";
                ETObj.Method = "NewBoutique";
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
            return outParameter2.Value.ToString();

        }

        #endregion NewBoutique

        #region EditBoutique
        public Int16 EditBoutique()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            Guid _boutiqueid = Guid.Empty;
            string[] coordinates = {Latitude,Longitude };
            try
            {
                _boutiqueid = Guid.Parse(BoutiqueID);
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
                cmd.Parameters.Add("@WorkingDays", SqlDbType.NVarChar, 30).Value = WorkingDays;
                cmd.Parameters.Add("@FBLink", SqlDbType.NVarChar, 200).Value = FbLink;
                cmd.Parameters.Add("@InstagramLink", SqlDbType.NVarChar, 200).Value = InstagramLink;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 200).Value = UpdatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                cmd.Parameters.Add("@latlong", SqlDbType.VarChar, 100).Value = string.Join(",", coordinates);
                cmd.Parameters.Add("@Logo", SqlDbType.VarBinary).Value = boutiqueLogo;
                cmd.Parameters.Add("@Image", SqlDbType.VarBinary).Value = boutiqueImage;

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
                ETObj.Module = "Boutiques";
                ETObj.Method = "EditBoutique";
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
        #endregion EditBoutique

        #region DeleteBoutique
        /// <summary>
        /// Delete boutique
        /// </summary>
        /// <param name="BoutiqueID"></param>
        /// <returns></returns>
        public Int16 DeleteBoutique()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            Guid _boutiqueid = Guid.Empty;
            try
            {
                _boutiqueid = Guid.Parse(BoutiqueID);
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
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Boutiques";
                ETObj.Method = "DeleteBoutique";
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
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Boutiques";
                ETObj.Method = "GetAllBoutiqueIDAndName";
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
                cmd.CommandText = "[SelectImageByBoutiqueID]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                rd = cmd.ExecuteReader();
                if ((rd.Read()) && (rd.HasRows) && (rd["Image"] != DBNull.Value))
                {
                    imageproduct = (byte[])rd["Image"];
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
                ETObj.Module = "Boutiques";
                ETObj.Method = "GetBoutiqueImage";
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
                    rd.Close();
                    dcon.DisconectDB();
                }
            }
            return imageproduct;

        }
        #endregion GetBoutiqueImage

        #region GetBoutiqueLogo

        public byte[] GetBoutiqueLogo()
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
                cmd.CommandText = "[SelectLogoByBoutiqueID]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                rd = cmd.ExecuteReader();
                if ((rd.Read()) && (rd.HasRows) && (rd["Logo"] != DBNull.Value))
                {
                    imageproduct = (byte[])rd["Logo"];
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
                ETObj.Module = "Boutiques";
                ETObj.Method = "GetBoutiqueLogo";
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
                    rd.Close();
                    dcon.DisconectDB();
                }
            }
            return imageproduct;

        }
        #endregion GetBoutiqueLogo

        //----------------  * BRANCH METHODS *------------//
        #region NewBranch
        public string AddBranch()
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
                cmd.CommandText = "[AddNewBranch]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@BranchCode", SqlDbType.NVarChar, 30).Value = branchCode;
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = branchName;
                cmd.Parameters.Add("@Location", SqlDbType.NVarChar, 255).Value = branchLocation;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = branchAddress;
                cmd.Parameters.Add("@Phone", SqlDbType.NVarChar, 50).Value = branchPhone;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = branchEmail;
                cmd.Parameters.Add("@Coordinate", SqlDbType.VarChar, 100).Value = branchCoordinate;
                cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = Convert.ToBoolean(branchIsActive);
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParameter.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch(Exception ex)
            {
                BugTrackerstatus = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = BoutiqueID;
                ETObj.UserID = BugTrackerUserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "Boutiques";
                ETObj.Method = "AddBranch";
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
            return outParameter.Value.ToString();
        }
        #endregion NewBranch

        #region GetAllBranches
        /// <summary>
        /// Selects all boutiques
        /// </summary>
        /// <returns>All boutiques</returns>
        public DataSet GetAllBranches()
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
                cmd.CommandText = "[GetAllBranches]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value =Guid.Parse(BoutiqueID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
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
                ETObj.Module = "Boutiques";
                ETObj.Method = "GetAllBranches";
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
        #endregion GetAllBoutiques

        #region EditBranch
        public string EditBranch()
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
                cmd.CommandText = "[UpdateBranches]";
                cmd.Parameters.Add("@BranchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(branchID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@BranchCode", SqlDbType.NVarChar, 30).Value = branchCode;
                cmd.Parameters.Add("@Name",SqlDbType.NVarChar,255).Value=branchName;
                cmd.Parameters.Add("@Location", SqlDbType.NVarChar, 255).Value = branchLocation;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = branchAddress;
                cmd.Parameters.Add("@Phone", SqlDbType.NVarChar, 50).Value = branchPhone;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = branchEmail;
                cmd.Parameters.Add("@Coordinate", SqlDbType.VarChar, 100).Value = branchCoordinate;
                cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = Convert.ToBoolean(branchIsActive);
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
                ETObj.Module = "Boutiques";
                ETObj.Method = "EditBranch";
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
            return outParameter.Value.ToString();



        }
        #endregion EditBranch

        #region SelectBranch
        /// <summary>
        /// Selects all boutiques
        /// </summary>
        /// <returns>All boutiques</returns>
        public DataSet SelectBranch()
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
                cmd.CommandText = "[SelectBranch]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@BranchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(branchID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
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
                ETObj.Module = "Boutiques";
                ETObj.Method = "SelectBranch";
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
        #endregion SelectBranch

        #region DeleteBranch
        /// <summary>
        /// Delete boutique
        /// </summary>
        /// <param name="BoutiqueID"></param>
        /// <returns></returns>
        public Int16 DeleteBranch()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            Guid _boutiqueid = Guid.Empty;
            try
            {
                _boutiqueid = Guid.Parse(BoutiqueID);
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteBranch]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value =Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@BranchID", SqlDbType.UniqueIdentifier).Value =Guid.Parse(branchID);
                outParameter = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
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
                ETObj.Module = "Boutiques";
                ETObj.Method = "DeleteBoutique";
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
        #endregion DeleteBranch

        #region GetAllBranchIDAndName
        public DataSet GetAllBranchIDAndName()
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
                cmd.CommandText = "[GetBranchIdAndName]";
                
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);

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
                ETObj.Module = "Boutiques";
                ETObj.Method = "GetAllBranchIDAndName";
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
        #endregion GetAllBranchIDAndName

        //-------------  * BANNER METHODS * ---------- //

         #region Get banner images for mobile
        /// <summary>
        /// Getting Banner images batatable for mobile app (including varbinary images)
        /// </summary>
        /// <returns></returns>
         public DataTable GetBannerImagesForMobile()
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
                    cmd.CommandText = "[GetBannersForMobile]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                    sda = new SqlDataAdapter();
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
                    ETObj.Module = "Boutiques";
                    ETObj.Method = "GetBannerImagesForMobile";
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

         #region Get All Banner Images
         /// <summary>
         /// Getting all Banner images 
         /// </summary>
         /// <returns></returns>
         public DataSet GetBannerImages()
         {
             if (BoutiqueID == "")
             {
                 throw new Exception("BoutiqueID is Empty!!");
             }
             dbConnection dcon = null;
             SqlCommand cmd = null;
             DataSet  ds = null;
             SqlDataAdapter sda = null;
             try
             {
                 dcon = new dbConnection();
                 dcon.GetDBConnection();
                 cmd = new SqlCommand();
                 cmd.Connection = dcon.SQLCon;
                 cmd.CommandType = CommandType.StoredProcedure;
                 cmd.CommandText = "[SelectAllBanners]";
                 cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                 sda = new SqlDataAdapter();
                 sda.SelectCommand = cmd;
                 ds = new DataSet();
                 sda.Fill(ds);
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
                 ETObj.Module = "Boutiques";
                 ETObj.Method = "GetBannerImages";
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
         #endregion Get All Banner Images

         #region Get BannerImage By ImageID

        /// <summary>
        /// Returns banner image bytes by imgID 
        /// It is mainly called by Image Handlers ,inorder to get image by its id ( as json can't handle imagebytes which is more than json's capacity)
        /// </summary>
        /// <returns></returns>
         public byte[] GetBannerImageByImageID()
         {
             if (ImageID == "")
             {
                 throw new Exception("ImageID is Empty!!");
             }

             dbConnection dcon = null;
             SqlCommand cmd = null;
             SqlDataReader rd = null;
             byte[] BannerImage = null;
             try
             {
                 dcon = new dbConnection();
                 dcon.GetDBConnection();
                 cmd = new SqlCommand();
                 cmd.Connection = dcon.SQLCon;
                 cmd.CommandType = CommandType.StoredProcedure;
                 cmd.CommandText = "[GetBannerImageByImageID]";
                 cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ImageID);
                 rd = cmd.ExecuteReader();
                 if ((rd.Read()) && (rd.HasRows) && (rd["Image"] != DBNull.Value))
                 {
                     BannerImage = (byte[])rd["Image"];
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
                 ETObj.Module = "Boutiques";
                 ETObj.Method = "GetBannerImageByImageID";
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
                     rd.Close();
                     dcon.DisconectDB();
                 }
             }
             return BannerImage;

         }
         #endregion GetBannerImageByImageID

         #region Insert Banner Image
         public Int16 InsertBannerImage()
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
                 cmd.CommandText = "InsertBannerImage";
                
                 cmd.Parameters.Add("@Image", SqlDbType.VarBinary).Value = ImageFile;
                 cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                 cmd.Parameters.Add("@FileType", SqlDbType.VarChar, 5).Value = FileType;
                 if (ProductID != "" && ProductID != null) cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                 if (CategoryCode != "" && CategoryCode != null) cmd.Parameters.Add("@CategoryCode", SqlDbType.NVarChar, 50).Value = CategoryCode;
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
                 ETObj.Module = "Boutiques";
                 ETObj.Method = "InsertBannerImage";
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
         #endregion Insert Banner Image

         #region Update orderNo
         /// <summary>
         /// to update order no on reordering
         /// comma seperated string of ImageInfo array items will be created
         /// That string will be passed to update stored procedure 
         /// update will be done by splitting string by comma and then use that imageid for update
         /// </summary>
         /// <returns>status</returns>
         public Int16 UpdateorderNo()
         {
             if (BoutiqueID == "")
             {
                 throw new Exception("BoutiqueID is Empty!!");
             }
             
             dbConnection dcon = null;
             SqlCommand cmd = null;
             SqlParameter outParameter = null;
             string imaginfo = "";
             string com = "";
            
             try
             {
                 if (ImageInfo != null) //converting imageids array into a comma seperated string
                 {
                     for (int i = 0; i < ImageInfo.Length; i++)
                     {
                         //imaginfo = imaginfo + ImageInfo[i].ToString();
                         imaginfo = imaginfo + com + ImageInfo[i].ToString();
                         com = ",";
                     }
                     imaginfo = imaginfo + ",";
                 }
               
                 dcon = new dbConnection();
                 dcon.GetDBConnection();
                 cmd = new SqlCommand();
                 cmd.Connection = dcon.SQLCon;
                 cmd.CommandType = CommandType.StoredProcedure;
                 cmd.CommandText = "[UpdateorderNoOfBannerImage]";
                
                 cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                 cmd.Parameters.Add("@ImageInfo", SqlDbType.VarChar, -1).Value = imaginfo;
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
                 ETObj.Module = "Boutiques";
                 ETObj.Method = "UpdateorderNo";
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
         #endregion Update orderNo

         #region Update Banner Details
         /// <summary>
         /// to Update Banner Details (product,category) by image ID
         /// </summary>
         /// <returns>status</returns>
         public Int16 UpdateBannerDetailsByImgID()
         {

             if (BoutiqueID == "" || BoutiqueID == null)
             {
                 throw new Exception("BoutiqueID is Empty!!");
             }

             if (ImageID == "" || ImageID == null)
             {
                 throw new Exception("ImageID is Empty!!");
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
                 cmd.CommandText = "[UpdateBannerDetailsByImageID]";

                 cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                 cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ImageID);
                 if (ProductID != "" && ProductID != null) cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                 if (CategoryCode != "" && CategoryCode != null) cmd.Parameters.Add("@CategoryCode", SqlDbType.NVarChar, 50).Value = CategoryCode;

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
                 ETObj.Module = "Boutiques";
                 ETObj.Method = "UpdateBannerDetailsByImgID";
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
         #endregion Update orderNo

         #region DeleteBannerByImageID
         /// <summary>
        /// Delete boutique
        /// </summary>
        /// <param name="ImageID"></param>
        /// <returns></returns>
         public Int16 DeleteBannerByImageID()
         {
            if (BoutiqueID == "" || BoutiqueID == null)
            {
                throw new Exception("BoutiqueID is Empty!!");
            }

            if (ImageID == "" || ImageID == null)
            {
                throw new Exception("ImageID is Empty!!");
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
                cmd.CommandText = "[DeleteBannerByImageID]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ImageID);

                outParameter = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
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
                ETObj.Module = "Boutiques";
                ETObj.Method = "DeleteBannerByImageID";
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
         #endregion DeleteBannerByImageID

        #endregion Methods

    }
}