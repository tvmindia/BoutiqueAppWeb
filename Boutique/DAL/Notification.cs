using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
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
        public string StartDate
        {
            get;
            set;
        }
        public string EndDate
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
        public string UserID
        {
            get;
            set;
        }
        public string OrderID
        { get; 
          set;
        }
        public string[] ImageIDs
        {
            get;
            set;
        }
        #endregion properties

        #region Methods
        
        #region New Notification
        /// <summary>
        /// to insert a new notification into database
        /// </summary>
        /// <returns>status</returns>
        public Int16 InsertNotification()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            if (Title == "")
            {
                throw new Exception("Title is Empty!!");
            } 
            if (StartDate == "")
            {
                throw new Exception("StartDate is Empty!!");
            }
            if (EndDate == "")
            {
                throw new Exception("EndDate is Empty!!");
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
                cmd.CommandText = "[InsertNotification]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@Title", SqlDbType.NVarChar, 50).Value = Title;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description;
                cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = StartDate;
                cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = EndDate;
                if (ProductID != "" && ProductID != null ) cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                if (CategoryCode != "" && CategoryCode != null) cmd.Parameters.Add("@CategoryCode", SqlDbType.NVarChar, 50).Value = CategoryCode;
                if (UserID != "" && UserID != null) cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                if (OrderID != "" && OrderID !=null) cmd.Parameters.Add("@OrderID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(OrderID);
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
        #endregion

        #region Edit notification
        /// <summary>
        /// to edit the Notification details
        /// </summary>
        /// <returns>status</returns>
        public Int16 UpdateNotification()
            {
                if (NotificationID == "")
                {
                    throw new Exception("NotificationID is Empty!!");
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
                    cmd.CommandText = "[UpdateNotification]";
                    cmd.Parameters.Add("@NotificationID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(NotificationID);
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                    cmd.Parameters.Add("@Title", SqlDbType.NVarChar, 50).Value = Title;
                    cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description;
                    cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = StartDate;
                    cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = EndDate;
                    if (ProductID != "") cmd.Parameters.Add("@ProductID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ProductID);
                    if (CategoryCode != "") cmd.Parameters.Add("@CategoryCode", SqlDbType.NVarChar, 50).Value = CategoryCode;

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

        #region SelectAllNotifications ByBoutiqueID
        /// <summary>
        /// get all the notifications
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <returns></returns>
        public DataSet SelectAllNotificationsBoutiqueID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            Guid boutiqueid = Guid.Parse(BoutiqueID);
            try
            {
                if (boutiqueid != Guid.Empty)
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[SelectAllNotificationsByBoutiqueID]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = boutiqueid;
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
        #endregion

        #region Get all the notifications
        /// <summary>
        /// get all the notifications
        /// </summary>
        /// <param name="boutiqueID"></param>
        /// <returns></returns>
        public DataSet SelectAllNotifications()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            Guid boutiqueid = Guid.Parse(BoutiqueID);
            try
            {              
                if (boutiqueid != Guid.Empty)
                {
                    dcon = new dbConnection();
                    dcon.GetDBConnection();
                    cmd = new SqlCommand();
                    cmd.Connection = dcon.SQLCon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[GetCountForTiles]";
                    cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = boutiqueid;
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
        #endregion

        #region Get a notification details
        /// <summary>
        /// To get details of a specific notification
        /// </summary>
        /// <returns></returns>
        public DataSet GetNotification()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            if (NotificationID == "")
            {
                throw new Exception("NotificationID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataAdapter sda = null;
            DataSet ds = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                sda = new SqlDataAdapter();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectNotificationByNotificationID]";
                cmd.Parameters.Add("@NotificationID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.NotificationID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.BoutiqueID);
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
                if (ds.Tables[0].Rows.Count == 0) { throw new Exception("No such item"); }
                return ds;
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

        #region Delete Notification
        /// <summary>
        /// To delete a notification by notification id
        /// </summary>
        /// <returns>status</returns>
        public Int16 DeleteNotification()
        {
            if (NotificationID == "")
            {
                throw new Exception("NotificationID is Empty!!");
            }
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataAdapter sda = null;

            SqlParameter outParameter = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                sda = new SqlDataAdapter();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteNotification]";
                cmd.Parameters.Add("@NotificationID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.NotificationID);
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
                if (UserID != "") cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(this.UserID);
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

        public string PopulateBody(string userName, string title, string url, string description, string MainimageUrl)
        {
           // string imageUrl = "https://ci5.googleusercontent.com/proxy/cBgbcNE45Ik_XJgwpDGopRq1XIqU_HQLp3HgHLwVKh4-Yfap2wX1fSUTXvPNJaLttIsN1H8XvofjmLPIXqc122yl8_nO7wnuVrtDTNJ-5zZlHsD9CBNxpzFM1Utj570VnbbFgkNCwKi6kAjCKkEchyP1kGxJoVmdVIAcfwY=s0-d-e1-ft#http://i1.sdlcdn.com/static/img/marketing-mailers/mailer/2016/UserGrowth/manfashion25april/images/";
            string Url = "";
            string imageUrl=null;
            Url = "BoutiqueTemplates/EmailTemplate.htm";

            int imageCount = Convert.ToInt32(6);
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/" + Url)))
            {
                body = reader.ReadToEnd();
            }
            //string fileName = HttpContext.Current.Server.MapPath("~/" + Url);
            //body = fileName;
            body = body.Replace("{UserName}", userName);
            body = body.Replace("{Title}", title);
            body = body.Replace("{Url}", url);
            body = body.Replace("{Description}", description);
            body = body.Replace("{Mainimage}", MainimageUrl);
          
            for (int i = 0; i <= imageCount; i++)
            {
              //  string[] ids = { "5ff4eb3b-4f63-418d-94a8-e05b33a03008","5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124", "5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124", "5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124", "5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124" };
                imageUrl = "../ImageHandler/ImageServiceHandler.ashx?ImageID="+ImageIDs[i];
               // body = body.Replace("{image" + i + "}", imageUrl + i + ".jpeg");
                body = body.Replace("{image" + i + "}", imageUrl);
            }
            return body;
        }

        #endregion Methods


    }
}