using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class Notification
    {

        #region properties
        public string NotificationID
        {
            get;
            set;
        }
        public string BoutiqueID
        {
            get;
            set;
        }
        public string Title
        {
            get;
            set;
        }
        public string Description
        {
            get;
            set;
        }
        public DateTime StartDate
        {
            get;
            set;
        }
        public DateTime EndDate
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
        #endregion properties

        #region Methods

        public DataSet SelectAllNotifications(string boutiqueID)
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
                    cmd.CommandText = "[SelectAllNotificationsByBoutiqueID]";
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



        #region Notifications for App
        public DataTable GetNotificationsForApp(string notificationsIDs)
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
                cmd.CommandText = "[GetNotificationsForApp]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                cmd.Parameters.Add("@Notification_IDs", SqlDbType.NVarChar,-1).Value = notificationsIDs;
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count == 0) { throw new Exception("No item"); }
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
        #endregion

        #endregion Methods


    }
}