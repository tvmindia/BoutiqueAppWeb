﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class Designers
    {
        #region Properties
        public string DesignerID
        {
            get;
            set;
        }
        public string BoutiqueID
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public string Profile
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

        #endregion Properties

        #region Methods

        
            #region Constructors
            public Designers()
            {
            }
            public Designers(string DesignerID,string BoutiqueID)
            {
                this.DesignerID = DesignerID;
                this.BoutiqueID = BoutiqueID;
                dbConnection dcon = null;
                SqlCommand cmd = null;
                SqlDataAdapter sda = null;
                DataTable dt = null;
                try
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[SelectDesignerByDesignerID]";
                    cmd.Parameters.Add("@DesignerID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.DesignerID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);                    
                    sda.SelectCommand = cmd;
                    dt = new DataTable();
                    sda.Fill(dt);
                    if (dt.Rows.Count == 0) { throw new Exception("No such ID"); }
                    DataRow row = dt.NewRow();
                    row = dt.Rows[0];
                    Name = row["Name"].ToString();
                    Profile = row["Profile"].ToString();
                    CreatedBy = row["CreatedBy"].ToString();
                    CreatedDate = DateTime.Parse(row["CreatedDate"].ToString());
                    UpdatedBy = row["UpdatedBy"].ToString();
                    UpdatedDate = DateTime.Parse(row["UpdatedDate"].ToString());
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
            #endregion Constructors

            #region New Designer
        /// <summary>
        /// to insert a new Designer into database
        /// </summary>
        /// <returns>status</returns>
            public Int16 InsertDesigner()
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
                    cmd.CommandText = "[InsertDesigner]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                    cmd.Parameters.Add("@Profile", SqlDbType.NVarChar, -1).Value = Profile;
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
            #endregion New Designer

            #region Edit Designer
        /// <summary>
        /// to edit the designer details
        /// </summary>
        /// <returns>status</returns>
            public Int16 UpdateDesigner()
            {
                if (DesignerID == "")
                {
                    throw new Exception("DesignerID is Empty!!");
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
                    cmd.CommandText = "[UpdateDesigner]";
                    cmd.Parameters.Add("@DesignerID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(DesignerID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                    cmd.Parameters.Add("@Profile", SqlDbType.NVarChar, -1).Value = Profile;
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
            #endregion Edit Designer

            #region Delete a Designer
        /// <summary>
        /// To delete a designer by designer id
        /// </summary>
        /// <returns>status</returns>
            public Int16 DeleteDesigner()
            {
                if (DesignerID == "")
                {
                    throw new Exception("DesignerID is Empty!!");
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
                    cmd.CommandText = "[DeleteDesigner]";
                    cmd.Parameters.Add("@DesignerID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.DesignerID);
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

        #region AllDesigners
            public DataTable GetAllDesigners()
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
                    cmd.CommandText = "[SelectAllDesigners]";
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

        #endregion AllDesigners

        #endregion Methods

    }
}