using System;
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
            SqlParameter outParameter, outMessageID = null;
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
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, -1).Value = Message;
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
            if (UserID == "")
            {
                throw new Exception("UserID is Empty!!");
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
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                if(ReplyPersonID!="") cmd.Parameters.Add("@ReplyPersonID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ReplyPersonID);
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

    }
}