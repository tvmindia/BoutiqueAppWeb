﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class Chat
    {
        #region Properties
        public string MessageID
        {
            get;
            set;
        }
        public string UserID
        {
            get;
            set;
        }
        public string ReplyPersonID
        {
            get;
            set;
        }
        public string BoutiqueID
        {
            get;
            set;
        }
        public string Direction
        {
            get;
            set;
        }
        public string Message
        {
            get;
            set;
        }
        public string ProductID
        {
            get;
            set;
        }
        public Boolean isDelivered
        {
            get;
            set;
        }
        public string MessageTime
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
        #endregion



        #region New Chat Message
        /// <summary>
        /// to insert a new Designer into database
        /// </summary>
        /// <returns>status</returns>
        public Int16 InsertChatMessage()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outMessageID = null;
            SqlParameter outParameter = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertChatMessage]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                if(ReplyPersonID!="") cmd.Parameters.Add("@ReplyPersonID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ReplyPersonID);
                cmd.Parameters.Add("@Direction", SqlDbType.NVarChar, 10).Value = Direction;
                if (Message != "") cmd.Parameters.Add("@Message", SqlDbType.NVarChar, -1).Value = Message; //Message empty means it is about a produt
                if(ProductID!="") cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                cmd.Parameters.Add("@MessageTime", SqlDbType.DateTime).Value = DateTime.Now;
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
                outMessageID = cmd.Parameters.Add("@MessageID", SqlDbType.UniqueIdentifier);
                outMessageID.Direction = ParameterDirection.Output;
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
                ETObj.Module = "Chat";
                ETObj.Method = "InsertChatMessage";
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
            MessageID = outMessageID.Value.ToString();
            return Int16.Parse(outParameter.Value.ToString());
        }
        #endregion New Designer

        #region Get chats
        /// <summary>
        /// to get messages
        /// give Reply personID when querry is a reply.
        /// leave it null when querry is from customer.
        /// </summary>
        /// <returns></returns>
        public DataTable GetChats()
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
                cmd.CommandText = "[GetMessagesForMobile]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                if (UserID != "") cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                if(ReplyPersonID!="") cmd.Parameters.Add("@ReplyPersonID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ReplyPersonID);
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
                ETObj.Module = "Chat";
                ETObj.Method = "GetChats";
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

        
        #region Update Delivary status
        /// <summary>
        /// To update status to avoid re delivering the same message
        /// </summary>
        /// <param name="MessageIDs">comma seperated message ids that are seperated</param>
        /// <param name="person">"Customer" or "Reply"</param>
        /// <returns></returns>
        public Int16 UpdateDeliveryStatus(string MessageIDs,string person)
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
                cmd.CommandText = "[UpdateChatDeliveryStatus]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@MessageIDs", SqlDbType.NVarChar, -1).Value = MessageIDs;
                cmd.Parameters.Add("@Person", SqlDbType.NVarChar, 10).Value = person;
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
                ETObj.Module = "Chat";
                ETObj.Method = "UpdateDeliveryStatus";
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
            return Int16.Parse(outParameter.Value.ToString());
        }
        #endregion

        #region Product detail for Chat
        public DataTable GetProductDetailForChat()
        {
            if (ProductID == "")
            {
                throw new Exception("ProductID is Empty!!");
            }
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
                cmd.CommandText = "[GetProductDetailsForChat]";
                cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
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
                ETObj.Module = "Chat";
                ETObj.Method = "GetProductDetailForChat";
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

    }
}