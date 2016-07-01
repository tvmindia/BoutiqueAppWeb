using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class NewsLetters
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
        {
            get;
            set;
        }
        public string[] ImageIDs
        {
            get;
            set;
        }
        public string[] productIDs
        {
            get;
            set;
        }
        public string[] audienceMailIDs
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
        public string TemplateID
        {
            get;
            set;
        }
        public string audienceMailType
        {
            get;
            set;
        }
        public string NewsLetterID
        {
            get;
            set;
        }
        public int imageCount
        {
            get;
            set;
        }
        public string templateFile
        {
            get;
            set;
        }
        public string status
        {
            get;
            set;
        }
        public string imageID
        {
            get;
            set;
        }
          
        #endregion properties

        MailSending mailObj = new MailSending();
        #region Methods
        #region GetAllTemplateIDandName
        public DataSet GetAllTemplateIDandName()
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
                cmd.CommandText = "[GetAllTemplateIDAndName]";
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

        #endregion GetAllTemplateIDandName

        #region GetAllEmailIdsToSendNewsLetterEmail
        public DataSet GetAllEmailIdsToSendNewsLetterEmail()
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
                cmd.CommandText = "[GetAllMailID'sBasedOnBoutique]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
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
        #endregion GetAllEmailIdsToSendNewsLetterEmail

        #region GetAllTemplateDetails
        public DataSet GetAllTemplateDetails()
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
                cmd.CommandText = "[GetAllTemplateDetailsByID]";
                cmd.Parameters.Add("@templateID", SqlDbType.UniqueIdentifier).Value =Guid.Parse(TemplateID);
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
        #endregion GetAllTemplateDetails

        #region GetAllTemplateDetailsForDrafts
        public DataSet GetAllTemplateDetailsForDrafts()
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
                cmd.CommandText = "[GetAllDraftsTemplateDetails]";
                cmd.Parameters.Add("@NewsLetterID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(NewsLetterID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
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
        #endregion GetAllTemplateDetailsForDrafts

        #region PopulateBody
        public string PopulateBody(string userName, string title, string url, string description, string MainimageUrl)
        {
           if(imageID!=null)
            {
                List<string> names = imageID.Split(',').ToList<string>();
                ImageIDs = names.ToArray();
            //    List<string> strDetailIDList = new List<string>();
            //        strDetailIDList.Add(imageID);               
            //    ImageIDs = strDetailIDList.ToArray();              
            }
            // string imageUrl = "https://ci5.googleusercontent.com/proxy/cBgbcNE45Ik_XJgwpDGopRq1XIqU_HQLp3HgHLwVKh4-Yfap2wX1fSUTXvPNJaLttIsN1H8XvofjmLPIXqc122yl8_nO7wnuVrtDTNJ-5zZlHsD9CBNxpzFM1Utj570VnbbFgkNCwKi6kAjCKkEchyP1kGxJoVmdVIAcfwY=s0-d-e1-ft#http://i1.sdlcdn.com/static/img/marketing-mailers/mailer/2016/UserGrowth/manfashion25april/images/";
            DataSet ds = null;
            ds = GetAllTemplateDetails();
            string Url = "";
            string imageUrl = null;

            string altImage = "http://www.simasa.co.uk/WebRoot/SIMASA/Shops/SIMA/5060/8140/8742/83EE/1AB2/0A00/0063/0C54/SpecialOffer_SIMA-1_m.jpg";
            //Url = "BoutiqueTemplates/EmailTemplate.htm";
            Url = ds.Tables[0].Rows[0]["TemplateFile"].ToString();
            int imageCount = Convert.ToInt32(ds.Tables[0].Rows[0]["ImageCount"]);
            imageCount = imageCount - 1;
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
            body = body.Replace("{Description}", Description);
            body = body.Replace("{Mainimage}", MainimageUrl);
            body = body.Replace("{Images0}", altImage);
            for (int i = 0; i <= imageCount; i++)
            {
                    //  string[] ids = { "5ff4eb3b-4f63-418d-94a8-e05b33a03008","5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124", "5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124", "5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124", "5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124" };
                    imageUrl = "../ImageHandler/ImageServiceHandler.ashx?ImageID=" + ImageIDs[i];
               
                // body = body.Replace("{image" + i + "}", imageUrl + i + ".jpeg");
                body = body.Replace("{image" + i + "}", imageUrl);
            }
            return body;
        }
        #endregion PopulateBody

        #region InsertNewsLetterTrackingDetails
        public Int16 InsertNewsLetterTrackingDetails()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null, outnotificationid = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertNewsLetterTrackingDetails]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@TemplateID", SqlDbType.UniqueIdentifier).Value =Guid.Parse(TemplateID);
                cmd.Parameters.Add("@ImageID", SqlDbType.VarChar, -1).Value = string.Join(",", ImageIDs);
                cmd.Parameters.Add("@ProductID", SqlDbType.VarChar, -1).Value = string.Join(",", productIDs);
                cmd.Parameters.Add("@AudienceMailID", SqlDbType.VarChar, -1).Value = string.Join(",", audienceMailType);
                cmd.Parameters.Add("@Description", SqlDbType.VarChar, -1).Value = Description;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                cmd.Parameters.Add("@IsMAilSend", SqlDbType.Bit).Value = false;
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
                outnotificationid = cmd.Parameters.Add("@NewsLetterID", SqlDbType.UniqueIdentifier);
                outnotificationid.Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();
                NewsLetterID = outnotificationid.Value.ToString();

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
            status = outParameter.Value.ToString();
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion InsertNewsLetterTrackingDetails

        #region GetAllNewsLetterDetails
        public DataSet GetAllNewsLetterDetails()
        {

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds,dsEmail = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllNewsLetterDetails]";
                cmd.Parameters.Add("@NewsLetterID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(NewsLetterID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                dsEmail = new DataSet();
                sda.Fill(ds);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    imageCount = Convert.ToInt32(ds.Tables[0].Rows[0]["ImageCount"]);
                    String[] images = new String[] { ds.Tables[0].Rows[0]["ImageID"].ToString() };
                    ImageIDs = images;
                    templateFile = ds.Tables[0].Rows[0]["TemplateFile"].ToString();
                    Description = ds.Tables[0].Rows[0]["Description"].ToString();
                    audienceMailType = ds.Tables[0].Rows[0]["AudienceMailID"].ToString();
                    if (audienceMailType == "All")
                    {
                        dsEmail = GetAllEmailIdsToSendNewsLetterEmail();
                        List<string> strDetailIDList = new List<string>();

                        foreach (DataRow row in dsEmail.Tables[0].Rows)
                        {
                            strDetailIDList.Add(row["Email"].ToString());
                        }
                        audienceMailIDs = strDetailIDList.ToArray();
                    }
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
        #endregion GetAllNewsLetterDetails

        #region InsertNewsLetterTrackingDetails
        public void UpdateNewsLetterIsmailSend()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateIsMailSendFlag]";
                cmd.Parameters.Add("@IsMAilSend", SqlDbType.Bit).Value = true;
                cmd.Parameters.Add("@NewsLetterID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(NewsLetterID);
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


        }
        #endregion UpdateNewsLetterIsmailSend

        #region GetAllNewsLetterMailNotSendDetails
        public DataSet GetAllNewsLetterMailNotSendDetails()
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
                cmd.CommandText = "[GetMailNotSendNewsLetters]";
               // cmd.Parameters.Add("@NewsLetterID", SqlDbType.UniqueIdentifier).Value = NewsLetterID;
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value =Guid.Parse(BoutiqueID);
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
        #endregion GetAllNewsLetterMailNotSendDetails
        #endregion Methods
    }
}